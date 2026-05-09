<template>
  <section id="planos" class="py-16 bg-white" data-animate>
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-8 space-y-4" data-animate-delay="100">
        <p class="text-xs font-bold tracking-[0.4em] uppercase" style="color:#aebc82;">Mapa de Lotes</p>
        <h2 class="text-4xl lg:text-5xl font-bold text-primary leading-tight">PLANO INTERACTIVO</h2>
        <div class="w-14 h-0.5" style="background-color:#aebc82;"></div>
        <p class="text-lg text-neutral-600 max-w-2xl font-light">
          Explora los lotes disponibles. Da clic sobre cualquier lote para ver su información y generar una cotización.
        </p>
      </div>

      <!-- Main area: map + sidebar -->
      <div class="flex gap-4" style="height: 680px;" data-animate-delay="200">

        <!-- Map column -->
        <div class="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl min-w-0 border border-primary/10">

          <!-- Toggle bar -->
          <div class="flex items-center gap-2 px-4 py-3 shrink-0" style="background-color:#153f35;">
            <button
              @click="view = 'plano'"
              :class="[
                'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all tracking-wide',
                view === 'plano'
                  ? 'text-primary shadow'
                  : 'text-white/50 hover:text-white'
              ]"
              :style="view === 'plano' ? { backgroundColor: '#aebc82' } : {}"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Plano
            </button>
            <button
              @click="view = 'lotes'"
              :class="[
                'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all tracking-wide',
                view === 'lotes'
                  ? 'text-primary shadow'
                  : 'text-white/50 hover:text-white'
              ]"
              :style="view === 'lotes' ? { backgroundColor: '#aebc82' } : {}"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Vista Lotes
            </button>
          </div>

          <!-- Map / grid view -->
          <div class="flex-1 overflow-hidden">
            <InteractiveMap
              v-if="view === 'plano'"
              :selected-manzana="selectedManzana"
              :selected-lote-index="selectedLoteIndex"
              @select-lot="onSelectLot"
            />
            <LotesMapView
              v-else
              :selected-manzana="selectedManzana"
              :selected-lote-index="selectedLoteIndex"
              :cotizar-open="false"
              @select-lot="onSelectLot"
            />
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="w-80 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-primary/10">
          <QuotationPanel
            :manzana-id="selectedManzana"
            :lote-index="selectedLoteIndex"
            @close="selectedManzana = null; selectedLoteIndex = null"
            @select-lot="onPanelSelectLot"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import InteractiveMap from './InteractiveMap.vue'
import LotesMapView from './LotesMapView.vue'
import QuotationPanel from './QuotationPanel.vue'

const view = ref('plano')
const selectedManzana = ref(null)
const selectedLoteIndex = ref(null)

function onSelectLot({ manzana, loteIndex }) {
  selectedManzana.value = manzana
  selectedLoteIndex.value = loteIndex ?? null
}

function onPanelSelectLot({ manzana, loteIndex }) {
  selectedManzana.value = manzana
  selectedLoteIndex.value = loteIndex ?? null
}
</script>
