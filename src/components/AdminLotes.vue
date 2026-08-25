<template>
  <div class="p-6 max-w-5xl mx-auto">

    <!-- Header + stats -->
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 class="text-xl font-bold" style="color:#153f35;">Inventario de Lotes</h2>
          <p class="text-sm mt-0.5" style="color:#6b6b60;">
            {{ loading ? 'Cargando...' : `${filasFiltradas.length} de ${totalLotes} lotes` }}
          </p>
        </div>
        <button
          @click="exportarCSV"
          :disabled="filasFiltradas.length === 0"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all self-start"
          style="background:#153f35; color:#fff;"
          :style="filasFiltradas.length === 0 ? 'opacity:.4; cursor:not-allowed;' : ''"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Exportar CSV
        </button>
      </div>

      <!-- Stats pills -->
      <div class="flex flex-wrap gap-2 mb-5">
        <button
          v-for="s in estatusList" :key="s.key"
          @click="filtroEstatus = filtroEstatus === s.key ? '' : s.key"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
          :style="filtroEstatus === s.key
            ? `background:${s.bg}; color:${s.color}; border-color:${s.color};`
            : `background:#fff; color:#6b6b60; border-color:rgba(21,63,53,.15);`"
        >
          <span class="w-2 h-2 rounded-full" :style="`background:${s.dot};`"></span>
          {{ s.label }}
          <span class="font-mono ml-0.5">{{ conteos[s.key] ?? 0 }}</span>
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color:#6b6b60;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Manzana o lote…"
            class="pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-2"
            style="border-color:rgba(21,63,53,.2); color:#153f35; focus:ring-color:#aebc82; width:160px;"
          />
        </div>
        <!-- Categoría -->
        <select
          v-model="filtroCategoria"
          class="px-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-2"
          style="border-color:rgba(21,63,53,.2); color:#153f35;"
        >
          <option value="">Todas las categorías</option>
          <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
        </select>
        <!-- Sort -->
        <select
          v-model="orden"
          class="px-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-2"
          style="border-color:rgba(21,63,53,.2); color:#153f35;"
        >
          <option value="manzana">Ordenar: Manzana</option>
          <option value="superficie_asc">m² menor → mayor</option>
          <option value="superficie_desc">m² mayor → menor</option>
          <option value="precio_asc">Precio menor → mayor</option>
          <option value="precio_desc">Precio mayor → menor</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="space-y-2">
      <div v-for="n in 8" :key="n" class="h-10 rounded-xl animate-pulse" style="background:rgba(21,63,53,.06);"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="filasFiltradas.length === 0"
         class="flex flex-col items-center justify-center py-16 rounded-2xl"
         style="border:1.5px dashed rgba(21,63,53,.18); background:rgba(21,63,53,.02);">
      <p class="font-bold text-sm" style="color:rgba(21,63,53,.4);">Sin lotes con ese filtro</p>
    </div>

    <!-- Table -->
    <div v-else class="rounded-2xl overflow-hidden"
         style="border:1px solid rgba(21,63,53,.1); box-shadow:0 2px 16px rgba(21,63,53,.07);">
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr style="background:#153f35;">
              <th class="px-3 py-2 text-left text-white font-bold tracking-wide whitespace-nowrap">Manzana</th>
              <th class="px-3 py-2 text-center text-white font-bold tracking-wide whitespace-nowrap">Lote</th>
              <th class="px-3 py-2 text-right text-white font-bold tracking-wide whitespace-nowrap">m²</th>
              <th class="px-3 py-2 text-left font-bold tracking-wide whitespace-nowrap" style="color:#aebc82;">Categoría</th>
              <th class="px-3 py-2 text-right text-white font-bold tracking-wide whitespace-nowrap">$/m²</th>
              <th class="px-3 py-2 text-right text-white font-bold tracking-wide whitespace-nowrap">Precio Total</th>
              <th class="px-3 py-2 text-center text-white font-bold tracking-wide whitespace-nowrap">Estatus</th>
              <th class="px-3 py-2 text-center text-white font-bold tracking-wide whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(l, i) in filasPaginadas" :key="`${l.manzana}-${l.lote}`"
              :style="i % 2 === 0 ? 'background:#fff;' : 'background:#f6f6f4;'"
              class="border-b"
              style="border-color:rgba(21,63,53,.06);"
            >
              <td class="px-3 py-1.5 font-bold" style="color:#153f35;">{{ l.manzana }}</td>
              <td class="px-3 py-1.5 text-center font-mono" style="color:#153f35;">{{ l.lote }}</td>
              <td class="px-3 py-1.5 text-right font-mono" style="color:#6b6b60;">
                {{ fmtNum(l.superficie) }}
              </td>
              <td class="px-3 py-1.5" style="color:#6b6b60;">{{ l.categoria || '—' }}</td>
              <td class="px-3 py-1.5 text-right font-mono" style="color:#6b6b60;">
                {{ l.precio ? fmtPeso(l.precio) : '—' }}
              </td>
              <td class="px-3 py-1.5 text-right font-mono font-bold" style="color:#153f35;">
                {{ l.precio && l.superficie ? fmtPeso(l.precio * l.superficie) : '—' }}
              </td>
              <td class="px-3 py-1.5 text-center">
                <span
                  class="inline-block px-2 py-0.5 rounded-full font-bold"
                  :style="badgeStyle(l.estatus)"
                >{{ l.estatus }}</span>
              </td>
              <td class="px-3 py-1.5 text-center">
                <select
                  :value="l.estatus"
                  :disabled="cambiando === `${l.manzana}-${l.lote}`"
                  @change="cambiarEstatus(l, $event.target.value)"
                  class="text-xs font-bold rounded-lg border px-1.5 py-1 focus:outline-none focus:ring-2"
                  style="border-color:rgba(21,63,53,.2); color:#153f35;"
                  :style="cambiando === `${l.manzana}-${l.lote}` ? 'opacity:.5; cursor:wait;' : ''"
                >
                  <option v-for="s in estatusList" :key="s.key" :value="s.key">{{ s.label }}</option>
                </select>
              </td>
            </tr>
          </tbody>
          <!-- Totals row -->
          <tfoot>
            <tr style="background:rgba(21,63,53,.06); border-top:2px solid rgba(21,63,53,.15);">
              <td colspan="2" class="px-3 py-1.5 font-bold" style="color:#153f35;">
                {{ filasFiltradas.length }} lotes
              </td>
              <td class="px-3 py-1.5 text-right font-mono font-bold" style="color:#153f35;">
                {{ fmtNum(totalSuperficie) }} m²
              </td>
              <td colspan="2"></td>
              <td class="px-3 py-1.5 text-right font-mono font-bold" style="color:#153f35;">
                {{ fmtPeso(totalPrecio) }}
              </td>
              <td colspan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between gap-3 px-4 py-2.5 flex-wrap"
           style="border-top:1px solid rgba(21,63,53,.1); background:#fff;">
        <p class="text-xs" style="color:#6b6b60;">
          Página {{ paginaActual }} de {{ totalPaginas }}
        </p>
        <div class="flex items-center gap-1">
          <button
            @click="paginaActual = 1"
            :disabled="paginaActual === 1"
            class="px-2 py-1 rounded-lg text-xs font-bold"
            style="border:1px solid rgba(21,63,53,.15); color:#153f35;"
            :style="paginaActual === 1 ? 'opacity:.35; cursor:not-allowed;' : ''"
          >«</button>
          <button
            @click="paginaActual--"
            :disabled="paginaActual === 1"
            class="px-2 py-1 rounded-lg text-xs font-bold"
            style="border:1px solid rgba(21,63,53,.15); color:#153f35;"
            :style="paginaActual === 1 ? 'opacity:.35; cursor:not-allowed;' : ''"
          >‹</button>
          <span class="px-2 text-xs font-bold" style="color:#153f35;">{{ paginaActual }}</span>
          <button
            @click="paginaActual++"
            :disabled="paginaActual === totalPaginas"
            class="px-2 py-1 rounded-lg text-xs font-bold"
            style="border:1px solid rgba(21,63,53,.15); color:#153f35;"
            :style="paginaActual === totalPaginas ? 'opacity:.35; cursor:not-allowed;' : ''"
          >›</button>
          <button
            @click="paginaActual = totalPaginas"
            :disabled="paginaActual === totalPaginas"
            class="px-2 py-1 rounded-lg text-xs font-bold"
            style="border:1px solid rgba(21,63,53,.15); color:#153f35;"
            :style="paginaActual === totalPaginas ? 'opacity:.35; cursor:not-allowed;' : ''"
          >»</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLotes, setLoteEstatus, refreshReservations } from '../composables/useLotes'

const { lotes, loading } = useLotes()
const cambiando = ref('')

const filtroEstatus  = ref('')
const filtroCategoria = ref('')
const busqueda       = ref('')
const orden          = ref('manzana')

const paginaActual = ref(1)
const porPagina     = 10

const estatusList = [
  { key: 'DISPONIBLE', label: 'Disponible', dot: '#22c55e', bg: '#f0fdf4', color: '#15803d' },
  { key: 'APARTADO',   label: 'Apartado',   dot: '#f59e0b', bg: '#fffbeb', color: '#b45309' },
  { key: 'RESERVADO',  label: 'Reservado',  dot: '#3b82f6', bg: '#eff6ff', color: '#1d4ed8' },
  { key: 'VENDIDO',    label: 'Vendido',    dot: '#6b7280', bg: '#f9fafb', color: '#374151' },
]

const todasFilas = computed(() => {
  const rows = []
  for (const [manzana, lista] of Object.entries(lotes.value)) {
    for (const l of lista) {
      rows.push({ manzana, ...l })
    }
  }
  return rows
})

const totalLotes = computed(() => todasFilas.value.length)

const conteos = computed(() => {
  const c = {}
  for (const l of todasFilas.value) {
    c[l.estatus] = (c[l.estatus] ?? 0) + 1
  }
  return c
})

const categorias = computed(() => {
  const set = new Set()
  for (const l of todasFilas.value) {
    if (l.categoria) set.add(l.categoria.trim())
  }
  return [...set].sort()
})

const filasFiltradas = computed(() => {
  let rows = todasFilas.value

  if (filtroEstatus.value)
    rows = rows.filter(l => l.estatus === filtroEstatus.value)

  if (filtroCategoria.value)
    rows = rows.filter(l => l.categoria?.trim() === filtroCategoria.value)

  if (busqueda.value) {
    const q = busqueda.value.toLowerCase()
    rows = rows.filter(l =>
      l.manzana.toLowerCase().includes(q) ||
      String(l.lote).includes(q)
    )
  }

  const copy = [...rows]
  if (orden.value === 'manzana') {
    copy.sort((a, b) => a.manzana.localeCompare(b.manzana) || a.lote - b.lote)
  } else if (orden.value === 'superficie_asc') {
    copy.sort((a, b) => a.superficie - b.superficie)
  } else if (orden.value === 'superficie_desc') {
    copy.sort((a, b) => b.superficie - a.superficie)
  } else if (orden.value === 'precio_asc') {
    copy.sort((a, b) => (a.precio * a.superficie) - (b.precio * b.superficie))
  } else if (orden.value === 'precio_desc') {
    copy.sort((a, b) => (b.precio * b.superficie) - (a.precio * a.superficie))
  }
  return copy
})

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(filasFiltradas.value.length / porPagina))
)

const filasPaginadas = computed(() => {
  const start = (paginaActual.value - 1) * porPagina
  return filasFiltradas.value.slice(start, start + porPagina)
})

watch([filtroEstatus, filtroCategoria, busqueda, orden], () => {
  paginaActual.value = 1
})

watch(totalPaginas, (t) => {
  if (paginaActual.value > t) paginaActual.value = t
})

const totalSuperficie = computed(() =>
  filasFiltradas.value.reduce((s, l) => s + (l.superficie ?? 0), 0)
)
const totalPrecio = computed(() =>
  filasFiltradas.value.reduce((s, l) => s + (l.precio && l.superficie ? l.precio * l.superficie : 0), 0)
)

function badgeStyle(estatus) {
  const map = {
    DISPONIBLE: 'background:#dcfce7; color:#15803d;',
    APARTADO:   'background:#fef3c7; color:#b45309;',
    RESERVADO:  'background:#dbeafe; color:#1d4ed8;',
    VENDIDO:    'background:#f3f4f6; color:#374151;',
  }
  return map[estatus] ?? 'background:#f3f4f6; color:#374151;'
}

function fmtNum(v) {
  return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v ?? 0)
}
function fmtPeso(v) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v ?? 0)
}

async function cambiarEstatus(l, nuevoEstatus) {
  if (nuevoEstatus === l.estatus) return
  const key = `${l.manzana}-${l.lote}`
  cambiando.value = key
  try {
    await setLoteEstatus(l.manzana, l.lote, nuevoEstatus)
    await refreshReservations()
  } catch (e) {
    console.error('Error actualizando estatus:', e)
    alert('No se pudo actualizar el lote. Intenta de nuevo.')
  } finally {
    cambiando.value = ''
  }
}

function exportarCSV() {
  const headers = ['Manzana','Lote','m²','Categoría','$/m²','Precio Total','Estatus']
  const rows = filasFiltradas.value.map(l => [
    l.manzana, l.lote,
    l.superficie ?? '',
    l.categoria ?? '',
    l.precio ?? '',
    l.precio && l.superficie ? Math.round(l.precio * l.superficie) : '',
    l.estatus,
  ])
  const csv  = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `lotes_altanorte_${new Date().toISOString().slice(0,10)}.csv`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
