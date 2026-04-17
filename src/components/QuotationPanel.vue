<script setup>
import { ref, computed, watch } from 'vue'
import { useLotes, refreshReservations } from '../composables/useLotes.js'
import CotizacionModal from './CotizacionModal.vue'
import { useAdminState } from '../composables/useAdminState'

const { isAdmin } = useAdminState()

const props = defineProps({
  manzanaId: { type: String, default: null },
  loteIndex: { type: Number, default: null }
})

const emit = defineEmits(['close', 'select-lot', 'cotizar'])

const { lotes, loading } = useLotes()
const selectedLote = ref(null)
const showCotizacion = ref(false)
let lastManzana = null

const manzanaKey = computed(() => {
  if (!props.manzanaId) return null
  return props.manzanaId.replace(/^_?MANZANA_/, '')
})

const manzanaLotes = computed(() => {
  if (!manzanaKey.value) return []
  return lotes.value[manzanaKey.value] || []
})

const disponibles = computed(() =>
  manzanaLotes.value.filter(l => l.estatus === 'DISPONIBLE').length
)

watch(
  [() => props.manzanaId, () => props.loteIndex, manzanaLotes],
  ([newManzana, newIdx, lots]) => {
    const manzanaChanged = newManzana !== lastManzana
    lastManzana = newManzana

    if (manzanaChanged) {
      selectedLote.value = null
    }

    if (newIdx !== null && lots.length > 0) {
      const byNum = lots.find(l => l.lote === newIdx)
      const candidate = byNum ?? lots[Math.min(newIdx - 1, lots.length - 1)]
      if (candidate?.estatus === 'DISPONIBLE') {
        selectedLote.value = candidate
      } else if (manzanaChanged) {
        selectedLote.value = null
      }
    }
  },
  { immediate: false }
)

function onCotizacionConfirm() {
  refreshReservations()
  showCotizacion.value = false
  selectedLote.value = null
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
}

function formatArea(value) {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(value)
}

const STATUS_STYLE = {
  DISPONIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  APARTADO: 'bg-amber-100  text-amber-700  border-amber-200',
  RESERVADO: 'bg-slate-100  text-slate-500  border-slate-200',
  VENDIDO: 'bg-red-100    text-red-600    border-red-200',
}

function statusStyle(estatus) {
  return STATUS_STYLE[estatus] || 'bg-gray-100 text-gray-500 border-gray-200'
}

function selectLote(lote) {
  if (lote.estatus !== 'DISPONIBLE') return
  const toggled = selectedLote.value?.lote === lote.lote ? null : lote
  selectedLote.value = toggled
  emit('select-lot', toggled
    ? { manzana: props.manzanaId, loteIndex: toggled.lote }
    : { manzana: props.manzanaId, loteIndex: null }
  )
}

const totalPrice = computed(() => {
  if (!selectedLote.value) return 0
  return selectedLote.value.superficie * selectedLote.value.precio
})
</script>

<template>
  <div class="h-full w-full bg-white flex flex-col text-gray-800">

    <!-- Empty state -->
    <div v-if="!manzanaId" class="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
      <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-gray-900">Selecciona una Sección</h2>
      <p class="text-gray-500 text-sm max-w-[200px]">Da clic sobre el plano interactivo para ver los lotes disponibles.</p>
    </div>

    <!-- Section selected -->
    <div v-else class="flex flex-col h-full">

      <!-- Header -->
      <div class="px-5 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between">
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Sección</p>
          <h2 class="text-3xl font-extrabold text-blue-950">{{ manzanaKey }}</h2>
          <p class="text-sm text-gray-500 mt-1">
            <span class="font-semibold text-emerald-600">{{ disponibles }}</span>
            lote{{ disponibles !== 1 ? 's' : '' }} disponible{{ disponibles !== 1 ? 's' : '' }}
            de {{ manzanaLotes.length }} en total
          </p>
        </div>
        <button @click="emit('close')" title="Cerrar panel"
          class="mt-1 w-7 h-7 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Lot list -->
      <div class="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
        <p v-if="loading" class="text-gray-400 text-sm text-center py-4">Cargando lotes…</p>
        <p v-else-if="manzanaLotes.length === 0" class="text-gray-400 text-sm text-center py-4">Sin lotes registrados para esta sección.</p>

        <button v-for="lote in manzanaLotes" :key="lote.lote" @click="selectLote(lote)"
          :disabled="lote.estatus !== 'DISPONIBLE'" :class="[
            'w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all',
            lote.estatus === 'DISPONIBLE'
              ? selectedLote?.lote === lote.lote
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'hover:bg-slate-50 cursor-pointer border-slate-200'
              : 'opacity-50 cursor-not-allowed border-transparent',
            lote.estatus !== 'DISPONIBLE' && selectedLote?.lote !== lote.lote ? statusStyle(lote.estatus) : ''
          ]">
          <span class="font-semibold">Lote {{ lote.lote }}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs opacity-75">{{ formatArea(lote.superficie) }} m²</span>
            <span :class="[
              'text-[10px] font-bold px-1.5 py-0.5 rounded border',
              selectedLote?.lote === lote.lote && lote.estatus === 'DISPONIBLE'
                ? 'bg-white/20 border-white/30 text-white'
                : statusStyle(lote.estatus)
            ]">
              {{ lote.estatus }}
            </span>
          </div>
        </button>
      </div>

      <!-- Cotización CTA -->
      <div class="border-t border-slate-100 px-5 py-4 space-y-3">
        <div v-if="!selectedLote" class="text-center text-sm text-gray-400 py-2">
          Selecciona un lote disponible para cotizar
        </div>

        <template v-else>
          <div class="flex justify-between text-sm text-slate-600">
            <span>Superficie</span>
            <span class="font-semibold">{{ formatArea(selectedLote.superficie) }} m²</span>
          </div>
          <div class="flex justify-between text-sm text-slate-600">
            <span>Precio / m²</span>
            <span class="font-semibold">{{ formatCurrency(selectedLote.precio) }}</span>
          </div>
          <div v-if="selectedLote.categoria" class="flex justify-between text-sm text-slate-600">
            <span>Categoría</span>
            <span class="font-semibold">{{ selectedLote.categoria }}</span>
          </div>

          <div class="bg-gradient-to-r from-blue-900 to-slate-900 p-4 rounded-xl shadow-md">
            <p class="text-blue-200 text-xs font-medium mb-1">Precio Total Estimado</p>
            <p class="text-2xl font-black text-white">{{ formatCurrency(totalPrice) }}</p>
          </div>

          <button @click="showCotizacion = true; emit('cotizar')"
            class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2">
            <svg v-if="isAdmin" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ isAdmin ? 'Apartar Lote' : 'Generar Cotización' }}
          </button>
        </template>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <CotizacionModal v-if="showCotizacion && selectedLote" :lote="selectedLote" :manzana="manzanaKey"
      @close="showCotizacion = false" @confirm="onCotizacionConfirm" />
  </Teleport>
</template>
