<template>
  <div class="p-6">

    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold" style="color:#153f35;">Cotizaciones recibidas</h2>
        <p class="text-sm mt-0.5" style="color:#6b6b60;">
          {{ loading ? 'Cargando...' : `${cotizaciones.length} cotización${cotizaciones.length !== 1 ? 'es' : ''}` }}
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Toggle inactivos -->
        <button
          @click="toggleMostrarInactivos"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          :style="mostrarInactivos
            ? 'border:1.5px solid #aebc82; color:#153f35; background:rgba(174,188,130,.15);'
            : 'border:1.5px solid rgba(21,63,53,.2); color:#6b6b60; background:#fff;'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
          </svg>
          {{ mostrarInactivos ? 'Ocultar inactivos' : 'Ver inactivos' }}
        </button>

        <button
          @click="recargar"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style="border:1.5px solid rgba(21,63,53,.2); color:#153f35; background:#fff;"
          @mouseenter="e => e.currentTarget.style.background='rgba(21,63,53,.05)'"
          @mouseleave="e => e.currentTarget.style.background='#fff'"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Recargar
        </button>
        <button
          @click="exportarCSV"
          :disabled="cotizaciones.length === 0"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style="background:#153f35; color:#fff;"
          :style="cotizaciones.length === 0 ? 'opacity:.4; cursor:not-allowed;' : ''"
          @mouseenter="e => cotizaciones.length > 0 && (e.currentTarget.style.background='#0e2b25')"
          @mouseleave="e => e.currentTarget.style.background='#153f35'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Exportar CSV
        </button>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="flex items-center gap-3 rounded-xl px-5 py-4 mb-6 text-sm font-semibold"
         style="background:#fff1f0; border:1px solid #fca5a5; color:#b91c1c;">
      <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      {{ error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="!loading && cotizaciones.length === 0"
         class="flex flex-col items-center justify-center py-20 rounded-2xl"
         style="border:1.5px dashed rgba(21,63,53,.18); background:rgba(21,63,53,.02);">
      <svg class="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color:rgba(21,63,53,.2);">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p class="font-bold" style="color:rgba(21,63,53,.4);">Sin cotizaciones aún</p>
    </div>

    <!-- Table -->
    <div v-else-if="cotizaciones.length > 0" class="rounded-2xl overflow-hidden"
         style="border:1px solid rgba(21,63,53,.1); box-shadow:0 2px 16px rgba(21,63,53,.07);">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr style="background:#153f35;">
              <th class="px-4 py-3 text-left text-white font-bold tracking-wide whitespace-nowrap">Fecha</th>
              <th class="px-4 py-3 text-left text-white font-bold tracking-wide whitespace-nowrap">Nombre</th>
              <th class="px-4 py-3 text-left text-white font-bold tracking-wide whitespace-nowrap">Apellido</th>
              <th class="px-4 py-3 text-left text-white font-bold tracking-wide whitespace-nowrap">Teléfono</th>
              <th class="px-4 py-3 text-left text-white font-bold tracking-wide whitespace-nowrap">Correo</th>
              <th class="px-4 py-3 text-center font-bold tracking-wide whitespace-nowrap" style="color:#aebc82;">Sección</th>
              <th class="px-4 py-3 text-center font-bold tracking-wide whitespace-nowrap" style="color:#aebc82;">Lote</th>
              <th class="px-4 py-3 text-right text-white font-bold tracking-wide whitespace-nowrap">m²</th>
              <th class="px-4 py-3 text-right text-white font-bold tracking-wide whitespace-nowrap">Precio Total</th>
              <th class="px-4 py-3 text-center text-white font-bold tracking-wide whitespace-nowrap">Enganche</th>
              <th class="px-4 py-3 text-right text-white font-bold tracking-wide whitespace-nowrap">Pago Mensual</th>
              <th class="px-4 py-3 text-center text-white font-bold tracking-wide whitespace-nowrap">Plazo</th>
              <th class="px-4 py-3 text-center text-white font-bold tracking-wide whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(c, i) in cotizaciones" :key="c.id"
              :style="[
                i % 2 === 0 ? 'background:#fff;' : 'background:#f6f6f4;',
                !c.activo ? 'opacity:.45;' : ''
              ].join('')"
              class="border-b transition-colors"
              style="border-color:rgba(21,63,53,.06);"
            >
              <td class="px-4 py-3 whitespace-nowrap" style="color:#6b6b60;">{{ fmtFecha(c.created_at) }}</td>
              <td class="px-4 py-3 font-semibold whitespace-nowrap" style="color:#153f35;">
                {{ c.cliente_nombre }}
                <span v-if="!c.activo"
                      class="ml-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      style="background:#fca5a5; color:#7f1d1d;">inactivo</span>
              </td>
              <td class="px-4 py-3 font-semibold whitespace-nowrap" style="color:#153f35;">{{ c.cliente_apellido || '—' }}</td>
              <td class="px-4 py-3 whitespace-nowrap" style="color:#6b6b60;">{{ c.cliente_telefono }}</td>
              <td class="px-4 py-3 whitespace-nowrap" style="color:#6b6b60;">{{ c.cliente_email || '—' }}</td>
              <td class="px-4 py-3 text-center font-bold" style="color:#aebc82;">{{ c.seccion }}</td>
              <td class="px-4 py-3 text-center font-bold" style="color:#153f35;">{{ c.lote_num }}</td>
              <td class="px-4 py-3 text-right font-mono" style="color:#6b6b60;">{{ fmtArea(c.superficie) }}</td>
              <td class="px-4 py-3 text-right font-mono font-bold" style="color:#153f35;">{{ fmt(c.precio_total) }}</td>
              <td class="px-4 py-3 text-center" style="color:#6b6b60;">{{ c.enganche_pct }}%</td>
              <td class="px-4 py-3 text-right font-mono font-bold" style="color:#153f35;">{{ fmt(c.pago_mensual) }}</td>
              <td class="px-4 py-3 text-center" style="color:#6b6b60;">{{ c.plazo_meses }} m</td>
              <td class="px-4 py-3 text-center whitespace-nowrap">
                <button
                  v-if="c.activo"
                  @click="desactivar(c)"
                  :disabled="accionando === c.id"
                  title="Desactivar (borrado lógico)"
                  class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style="background:#fff1f0; color:#b91c1c; border:1px solid #fca5a5;"
                  @mouseenter="e => e.currentTarget.style.background='#fee2e2'"
                  @mouseleave="e => e.currentTarget.style.background='#fff1f0'"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                  Ocultar
                </button>
                <button
                  v-else
                  @click="reactivar(c)"
                  :disabled="accionando === c.id"
                  title="Reactivar registro"
                  class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style="background:rgba(174,188,130,.15); color:#153f35; border:1px solid rgba(174,188,130,.4);"
                  @mouseenter="e => e.currentTarget.style.background='rgba(174,188,130,.3)'"
                  @mouseleave="e => e.currentTarget.style.background='rgba(174,188,130,.15)'"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Mostrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading skeleton -->
    <div v-else-if="loading" class="space-y-2">
      <div v-for="n in 6" :key="n" class="h-12 rounded-xl animate-pulse" style="background:rgba(21,63,53,.06);"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const cotizaciones     = ref([])
const loading          = ref(true)
const error            = ref('')
const accionando       = ref(null)
const mostrarInactivos = ref(false)

function fmt(v) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v ?? 0)
}
function fmtArea(v) {
  return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v ?? 0)
}
function fmtFecha(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

async function recargar() {
  if (!supabase) { error.value = 'Supabase no está configurado.'; loading.value = false; return }
  loading.value = true
  error.value   = ''
  let query = supabase
    .from('cotizaciones')
    .select('*')
    .order('created_at', { ascending: false })

  if (!mostrarInactivos.value) {
    query = query.eq('activo', true)
  }

  const { data, error: err } = await query
  loading.value = false
  if (err) { error.value = `Error al cargar: ${err.message}`; return }
  cotizaciones.value = data ?? []
}

function toggleMostrarInactivos() {
  mostrarInactivos.value = !mostrarInactivos.value
  recargar()
}

async function desactivar(c) {
  if (!supabase || !confirm(`¿Ocultar la cotización de ${c.cliente_nombre} ${c.cliente_apellido || ''}?`)) return
  accionando.value = c.id
  const { error: err } = await supabase
    .from('cotizaciones')
    .update({ activo: false })
    .eq('id', c.id)
  accionando.value = null
  if (err) { error.value = `Error: ${err.message}`; return }
  if (!mostrarInactivos.value) {
    cotizaciones.value = cotizaciones.value.filter(x => x.id !== c.id)
  } else {
    c.activo = false
  }
}

async function reactivar(c) {
  if (!supabase) return
  accionando.value = c.id
  const { error: err } = await supabase
    .from('cotizaciones')
    .update({ activo: true })
    .eq('id', c.id)
  accionando.value = null
  if (err) { error.value = `Error: ${err.message}`; return }
  c.activo = true
}

function exportarCSV() {
  const headers = ['Fecha','Nombre','Apellido','Teléfono','Correo','Sección','Lote','m²','Precio Total','Enganche%','Saldo','Plazo','Pago Mensual','Activo']
  const rows = cotizaciones.value.map(c => [
    fmtFecha(c.created_at),
    c.cliente_nombre,
    c.cliente_apellido ?? '',
    c.cliente_telefono,
    c.cliente_email ?? '',
    c.seccion,
    c.lote_num,
    c.superficie ?? '',
    c.precio_total ?? '',
    c.enganche_pct ?? '',
    c.saldo ?? '',
    c.plazo_meses ?? '',
    c.pago_mensual ?? '',
    c.activo ? 'Sí' : 'No',
  ])
  const csv  = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `cotizaciones_altanorte_${new Date().toISOString().slice(0,10)}.csv`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

onMounted(recargar)
</script>
