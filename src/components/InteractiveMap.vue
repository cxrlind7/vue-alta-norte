<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import Panzoom from '@panzoom/panzoom'
import { useLotes, refreshReservations } from '../composables/useLotes.js'
import { useAdminState } from '../composables/useAdminState.js'
import CotizacionModal from './CotizacionModal.vue'

const MAP_W = 1123
const MAP_H = 793

const alignX = ref(0)
const alignY = ref(-30.4)

const props = defineProps({
  selectedManzana: { type: String, default: null },
  selectedLoteIndex: { type: Number, default: null }
})

const emit = defineEmits(['select-lot'])

const { lotes, loading } = useLotes()
const { isAdmin } = useAdminState()

const containerRef    = ref(null)
const panzoomRef      = ref(null)
const svgContainerRef = ref(null)
const svgContent      = ref('')
let panzoomInstance   = null

let fitScale = 1
let fitPanX  = 0
let fitPanY  = 0

const hoveredLote  = ref(null)
const calloutStyle = ref({ left: '50%', top: '45%' })

let _dragOffset = { x: 0, y: 0 }

function startDrag(e) {
  e.preventDefault()
  const left = parseInt(calloutStyle.value.left)
  const top  = parseInt(calloutStyle.value.top)
  _dragOffset = { x: e.clientX - left, y: e.clientY - top }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  calloutStyle.value = {
    left: (e.clientX - _dragOffset.x) + 'px',
    top : (e.clientY - _dragOffset.y) + 'px',
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const showCotizacion    = ref(false)
const cotizacionLote    = ref(null)
const cotizacionManzana = ref('')

// ─── Custom cursor ────────────────────────────────────────────────────────────
// mousemove  → ONLY position (3 writes, zero DOM queries, zero reactive access)
// mouseenter/mouseleave on shapes → type switch (fires once per shape crossing)
const cursorRef    = ref(null)
const cursorPanRef = ref(null)
const cursorOkRef  = ref(null)
const cursorNoRef  = ref(null)

let _lotesCache = {}
let _cursorType = 'pan'

function _setCursorType(type) {
  if (_cursorType === type || !cursorPanRef.value) return
  _cursorType = type
  cursorPanRef.value.style.display = type === 'pan'         ? 'flex' : 'none'
  cursorOkRef.value.style.display  = type === 'available'   ? 'flex' : 'none'
  cursorNoRef.value.style.display  = type === 'unavailable' ? 'flex' : 'none'
}

function onMouseMove(e) {
  const c = cursorRef.value
  if (!c) return
  const rect = containerRef.value.getBoundingClientRect()
  // transform instead of left/top — GPU compositing, zero layout reflow
  c.style.transform = `translate(${e.clientX - rect.left}px,${e.clientY - rect.top}px) translate(-50%,-50%)`
  c.style.display = 'block'
}

function onMouseLeave() {
  if (cursorRef.value) cursorRef.value.style.display = 'none'
  _setCursorType('pan')
}

function onShapeEnter(e) {
  const el      = e.currentTarget
  const mzKey   = el.getAttribute('data-manzana')
  const loteIdx = parseInt(el.getAttribute('data-lote-index') || '1')
  const lotData = (_lotesCache[mzKey] || [])[loteIdx - 1]
  _setCursorType(!lotData ? 'pan' : lotData.estatus === 'DISPONIBLE' ? 'available' : 'unavailable')
}

function onShapeLeave() { _setCursorType('pan') }
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_COLOR = {
  DISPONIBLE: { fill: '#22c55e', stroke: '#16a34a', opacity: '1', text: '#14532d' },
  APARTADO:   { fill: '#f59e0b', stroke: '#d97706', opacity: '1', text: '#78350f' },
  RESERVADO:  { fill: '#94a3b8', stroke: '#64748b', opacity: '1', text: '#1e293b' },
  VENDIDO:    { fill: '#ef4444', stroke: '#dc2626', opacity: '1', text: '#7f1d1d' },
}

function statusColor(estatus) {
  return STATUS_COLOR[estatus] || STATUS_COLOR.RESERVADO
}

function applyStatusColors() {
  if (!svgContainerRef.value) return
  const lotesData = lotes.value
  svgContainerRef.value.querySelectorAll('[id^="lotes"]').forEach(shape => {
    const m = shape.id.match(/^lotes([A-ZÑa-z]+)-(\d+)$/i)
    if (!m) return
    const manzanaKey = m[1].toUpperCase()
    const loteNum    = parseInt(m[2], 10)
    const lotData    = (lotesData[manzanaKey] || [])[loteNum - 1]
    if (!lotData) return
    const col = statusColor(lotData.estatus)
    shape.style.fill        = col.fill
    shape.style.stroke      = col.stroke
    shape.style.strokeWidth = '1.5'
    shape.style.fillOpacity = col.opacity
  })
}

function tagShapes() {
  if (!svgContainerRef.value) return
  svgContainerRef.value.querySelectorAll('[id^="lotes"]').forEach(shape => {
    const m = shape.id.match(/^lotes([A-ZÑa-z]+)-(\d+)$/i)
    if (!m) return
    shape.setAttribute('data-manzana', m[1].toUpperCase())
    shape.setAttribute('data-lote-index', m[2])
    shape.addEventListener('mouseenter', onShapeEnter)
    shape.addEventListener('mouseleave', onShapeLeave)
  })
}

onMounted(async () => {
  try {
    const res = await fetch('/svg/lotificacionCapaTagged.svg')
    if (res.ok) svgContent.value = await res.text()
  } catch (err) {
    console.error('Error loading lotificacionCapaTagged.svg:', err)
  }

  await nextTick()
  tagShapes()
  applyStatusColors()

  if (!panzoomRef.value) return

  const containerW = containerRef.value?.clientWidth  || window.innerWidth
  const containerH = containerRef.value?.clientHeight || window.innerHeight

  fitScale = Math.min(containerW / MAP_W, containerH / MAP_H)
  fitPanX  = (containerW - MAP_W * fitScale) / 2
  fitPanY  = (containerH - MAP_H * fitScale) / 2

  panzoomInstance = Panzoom(panzoomRef.value, {
    maxScale  : 8,
    minScale  : fitScale * 0.8,
    startScale: fitScale,
    startX    : fitPanX,
    startY    : fitPanY,
  })

  containerRef.value.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  if (containerRef.value && panzoomInstance) {
    containerRef.value.removeEventListener('wheel', handleWheel)
    panzoomInstance.destroy()
    panzoomInstance = null
  }
})

watch(lotes, (v) => {
  _lotesCache = v          // update plain cache — no reactive access in mousemove
  nextTick(applyStatusColors)
}, { immediate: true, deep: true })

let _clickPending = false
function handleClick(e) {
  if (_clickPending) return
  _clickPending = true
  requestAnimationFrame(() => { _clickPending = false })

  const el = e.target.closest('[data-manzana]')
  if (!el) { hoveredLote.value = null; return }
  if (isAdmin.value) {
    const mzKey     = el.getAttribute('data-manzana')
    const loteIndex = parseInt(el.getAttribute('data-lote-index') || '1')
    const lotData   = (lotes.value[mzKey] || [])[loteIndex - 1]
    if (lotData) emit('select-lot', { manzana: `MANZANA_${mzKey}`, loteIndex: lotData.lote })
    return
  }

  const mzKey     = el.getAttribute('data-manzana')
  const loteIndex = parseInt(el.getAttribute('data-lote-index') || '1')
  const lotData   = (lotes.value[mzKey] || [])[loteIndex - 1]
  if (!lotData) return

  const rect = containerRef.value.getBoundingClientRect()
  const x    = e.clientX - rect.left
  const y    = e.clientY - rect.top
  const cw   = 288
  const ch   = 260
  calloutStyle.value = {
    left: Math.min(Math.max(x - cw / 2, 8), rect.width  - cw - 8) + 'px',
    top : Math.min(Math.max(y + 16,     8), rect.height - ch - 8) + 'px',
  }

  hoveredLote.value = { manzana: mzKey, lote: lotData }
  emit('select-lot', { manzana: `MANZANA_${mzKey}`, loteIndex: lotData.lote })
}

function clearHover() { hoveredLote.value = null }


function handleContainerClick(e) {
  if (e.target === containerRef.value || e.target === panzoomRef.value) clearHover()
}

function openCotizacion() {
  if (!hoveredLote.value || hoveredLote.value.lote.estatus !== 'DISPONIBLE') return
  cotizacionLote.value    = hoveredLote.value.lote
  cotizacionManzana.value = hoveredLote.value.manzana
  showCotizacion.value    = true
}

function onCotizacionConfirm() {
  refreshReservations()
  showCotizacion.value = false
  hoveredLote.value    = null
}

function handleWheel(e) {
  e.preventDefault()
  e.stopPropagation()
  panzoomInstance?.zoomWithWheel(e)
}

function zoomIn()  { panzoomInstance?.zoomIn() }
function zoomOut() { panzoomInstance?.zoomOut() }
function resetZoom() {
  if (!panzoomInstance) return
  panzoomInstance.zoom(fitScale, { animate: true })
  panzoomInstance.pan(fitPanX, fitPanY, { animate: true })
}

function fmt(v) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v)
}
function fmtArea(v) {
  return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
}
</script>

<template>
  <div
    ref="containerRef"
    class="map-container relative w-full h-full overflow-hidden bg-[#0f172a]"
    @click="handleContainerClick"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >

    <!-- ─── Custom cursor ───────────────────────────────────────────────────── -->
    <div ref="cursorRef" class="pointer-events-none absolute top-0 left-0 z-40"
      style="display:none; will-change:transform;">
      <!-- pan -->
      <div ref="cursorPanRef"
        class="w-8 h-8 rounded-full border-2 border-white/50 bg-white/10 items-center justify-center"
        style="display:flex;">
        <svg class="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3" />
        </svg>
      </div>
      <!-- available -->
      <div ref="cursorOkRef"
        class="w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-500/30 items-center justify-center"
        style="display:none;">
        <svg class="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <!-- unavailable -->
      <div ref="cursorNoRef"
        class="w-8 h-8 rounded-full border-2 border-red-400 bg-red-500/30 items-center justify-center"
        style="display:none;">
        <svg class="w-3.5 h-3.5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <!-- ─── Legend ────────────────────────────────────────────────────────── -->
    <div class="absolute top-3 left-3 z-20 flex flex-col gap-1.5 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2.5 text-xs">
      <div v-for="(col, status) in STATUS_COLOR" :key="status" class="flex items-center gap-1.5">
        <div class="w-3.5 h-3 rounded-sm border"
          :style="`background:${col.fill};border-color:${col.stroke};opacity:${col.opacity}`"></div>
        <span class="text-white/80 font-medium">{{ status }}</span>
      </div>
    </div>

    <!-- ─── Drag hint ─────────────────────────────────────────────────────── -->
    <div class="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/60 select-none">
      <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M12 12h.01" />
      </svg>
      Arrastra para mover · Rueda para zoom
    </div>

    <!-- ─── Zoom controls ─────────────────────────────────────────────────── -->
    <div class="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
      <button @click.stop="zoomIn"
        class="w-9 h-9 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 transition-all">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <button @click.stop="zoomOut"
        class="w-9 h-9 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 transition-all">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button @click.stop="resetZoom"
        class="w-9 h-9 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center text-gray-500 transition-all"
        title="Encuadrar mapa">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- ─── Panzoom element ───────────────────────────────────────────────── -->
    <div
      ref="panzoomRef"
      class="absolute top-0 left-0"
      style="width:1123px;height:793px;transform-origin:0 0;will-change:transform;"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="relative" style="width:793px;height:1123px;transform:rotate(-90deg);">
          <img
            src="/svg/lotificacionFondo.webp"
            class="absolute inset-0 w-full h-full pointer-events-none"
            alt="Plano Lotificación"
          />
          <div
            ref="svgContainerRef"
            class="interactive-svg-container absolute inset-0 w-full h-full z-10"
            :style="{ transform: `translate(${alignX}px, ${alignY}px)` }"
            v-html="svgContent"
            @click="handleClick"
          ></div>
        </div>
      </div>
    </div>

    <!-- ─── Floating lot callout ──────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="pop">
        <div
          v-if="hoveredLote"
          class="fixed z-50 w-72 pointer-events-auto"
          :style="{ left: calloutStyle.left, top: calloutStyle.top }"
        >
          <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-900 to-slate-900 px-4 py-3 flex items-start justify-between select-none"
              style="cursor:grab;" @mousedown.stop="startDrag">
              <div>
                <p class="text-blue-300 text-[10px] font-bold uppercase tracking-widest">Lote Seleccionado</p>
                <p class="text-white text-lg font-extrabold leading-tight">
                  SEC {{ hoveredLote.manzana }} · Lote {{ hoveredLote.lote.lote }}
                </p>
                <p class="text-white/50 text-[10px] mt-0.5">{{ hoveredLote.lote.categoria || 'Sin categoría' }}</p>
              </div>
              <button @click.stop="clearHover" class="text-white/50 hover:text-white transition-colors ml-3 mt-0.5 shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="px-4 py-3 space-y-1.5 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-500">Superficie</span>
                <span class="font-bold">{{ fmtArea(hoveredLote.lote.superficie) }} m²</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Precio / m²</span>
                <span class="font-bold">{{ fmt(hoveredLote.lote.precio) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Total estimado</span>
                <span class="font-black text-blue-900">{{ fmt(hoveredLote.lote.superficie * hoveredLote.lote.precio) }}</span>
              </div>
              <div class="flex justify-between items-center pt-0.5">
                <span class="text-slate-500">Estatus</span>
                <span class="text-[11px] font-black px-2 py-0.5 rounded-full"
                  :style="`background:${statusColor(hoveredLote.lote.estatus).fill}25;color:${statusColor(hoveredLote.lote.estatus).stroke}`">
                  {{ hoveredLote.lote.estatus }}
                </span>
              </div>
            </div>
            <div class="px-4 pb-4">
              <button
                v-if="hoveredLote.lote.estatus === 'DISPONIBLE'"
                @click.stop="openCotizacion"
                class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Generar Cotización
              </button>
              <div v-else class="rounded-xl px-3 py-2.5 text-[11px] font-bold text-center"
                :style="`background:${statusColor(hoveredLote.lote.estatus).fill}15;color:${statusColor(hoveredLote.lote.estatus).stroke}`">
                Este lote no está disponible
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ─── Cotización modal ──────────────────────────────────────────────── -->
    <Teleport to="body">
      <CotizacionModal
        v-if="showCotizacion && cotizacionLote"
        :lote="cotizacionLote"
        :manzana="cotizacionManzana"
        @close="showCotizacion = false"
        @confirm="onCotizacionConfirm"
      />
    </Teleport>

  </div>
</template>

<style>
.map-container, .map-container * {
  cursor: none !important;
}

.interactive-svg-container {
  contain: layout style;
}
.interactive-svg-container svg {
  display: block;
  width: 100%;
  height: 100%;
}
.interactive-svg-container [data-manzana] {
  stroke-width: 1px;
  transition: fill 0.15s ease, fill-opacity 0.15s ease, filter 0.15s ease;
}
.interactive-svg-container [data-manzana]:hover {
  fill-opacity: 0.95 !important;
  stroke-width: 2px !important;
}
</style>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.88) translateY(6px);
}

.cursor-fade-enter-active,
.cursor-fade-leave-active {
  transition: opacity 0.1s ease;
}
.cursor-fade-enter-from,
.cursor-fade-leave-to {
  opacity: 0;
}
</style>
