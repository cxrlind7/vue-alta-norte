import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const lotes   = ref({})
const loading = ref(true)
let rawText = ''

function parseLotes(text) {
  const lines = text.split('\n')
  const data  = {}
  let currentManzana = ''

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split('\t')
    if (parts.length < 4) continue

    const manzana    = parts[0].trim()
    const lote       = parts[1].trim()
    const superficie = parseFloat(parts[2].replace(/,/g, '').trim()) || 0
    const estatus    = parts[3].trim()
    const categoria  = parts[4]?.trim().replace(/\s+/g, ' ') || ''
    const precio     = parseFloat(parts[5]?.trim()) || 0

    if (manzana) currentManzana = manzana
    if (!lote || !currentManzana) continue

    if (!data[currentManzana]) data[currentManzana] = []
    data[currentManzana].push({ lote: parseInt(lote), superficie, estatus, categoria, precio })
  }

  return data
}

function applyLocalReservations(data) {
  const now = Date.now()
  const toDelete = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith('override_')) continue
    const raw = localStorage.getItem(key)
    if (!raw) continue
    try {
      const { estatus, expiry } = JSON.parse(raw)
      if (expiry && now > expiry) { toDelete.push(key); continue }
      const withoutPrefix  = key.slice('override_'.length)
      const lastUnderscore = withoutPrefix.lastIndexOf('_')
      if (lastUnderscore < 0) continue
      const manzana = withoutPrefix.slice(0, lastUnderscore)
      const loteNum = parseInt(withoutPrefix.slice(lastUnderscore + 1))
      if (!manzana || isNaN(loteNum)) continue
      const found = data[manzana]?.find(l => l.lote === loteNum)
      if (found) found.estatus = estatus
    } catch (_) {}
  }
  toDelete.forEach(k => localStorage.removeItem(k))
}

async function applySupabaseStatuses(data) {
  try {
    const { data: rows, error } = await supabase
      .from('lot_statuses')
      .select('manzana, lote_num, estatus')
    if (error) throw error
    rows.forEach(({ manzana, lote_num, estatus }) => {
      const found = data[manzana]?.find(l => l.lote === lote_num)
      if (found) found.estatus = estatus
    })
  } catch (e) {
    console.warn('Supabase unavailable, falling back to localStorage', e)
    applyLocalReservations(data)
  }
}

async function applyCategoryPrices(data) {
  try {
    const { data: rows, error } = await supabase
      .from('precios')
      .select('categoria, precio')
    if (error) throw error
    const priceByCategoria = {}
    rows.forEach(({ categoria, precio }) => { priceByCategoria[categoria] = precio })
    Object.values(data).forEach(lista => {
      lista.forEach(l => {
        if (l.categoria && priceByCategoria[l.categoria] !== undefined) {
          l.precio = priceByCategoria[l.categoria]
        }
      })
    })
  } catch (e) {
    console.warn('No se pudieron cargar precios por categoría, usando lotes.txt', e)
  }
}

async function loadLotes() {
  try {
    const r    = await fetch('/lotes.txt')
    rawText    = await r.text()
    const data = parseLotes(rawText)

    if (supabase) {
      await applySupabaseStatuses(data)
      await applyCategoryPrices(data)
    } else {
      applyLocalReservations(data)
    }

    lotes.value   = data
    loading.value = false
  } catch (err) {
    console.error('Error loading lotes.txt:', err)
    loading.value = false
  }
}

export async function setLoteEstatus(manzana, loteNum, estatus) {
  if (supabase) {
    const { error } = await supabase
      .from('lot_statuses')
      .upsert({ manzana, lote_num: loteNum, estatus }, { onConflict: 'manzana,lote_num' })
    if (error) throw error
  } else {
    const key     = `override_${manzana}_${loteNum}`
    const expiry  = estatus === 'APARTADO' ? Date.now() + 2 * 24 * 60 * 60 * 1000 : null
    localStorage.setItem(key, JSON.stringify({ estatus, expiry }))
  }
}

export async function refreshReservations() {
  if (!rawText) return
  const data = parseLotes(rawText)
  if (supabase) {
    await applySupabaseStatuses(data)
    await applyCategoryPrices(data)
  } else {
    applyLocalReservations(data)
  }
  lotes.value = data
}

export async function setCategoriaPrecio(categoria, precio) {
  if (!supabase) throw new Error('Supabase no configurado')
  const { data: existing, error: selError } = await supabase
    .from('precios')
    .select('id')
    .eq('categoria', categoria)
    .maybeSingle()
  if (selError) throw selError

  if (existing) {
    const { error } = await supabase.from('precios').update({ precio }).eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('precios').insert({ categoria, precio })
    if (error) throw error
  }
}

export function useLotes() {
  loadLotes()
  return { lotes, loading }
}
