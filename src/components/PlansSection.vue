<template>
  <section id="planos" class="py-16 relative overflow-hidden" style="background:#0d0d0f;" data-animate>
    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
         style="background:linear-gradient(90deg,transparent,rgba(174,188,130,0.5) 30%,rgba(174,188,130,0.5) 70%,transparent);"></div>
    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
         style="background:linear-gradient(90deg,transparent,rgba(174,188,130,0.3) 30%,rgba(174,188,130,0.3) 70%,transparent);"></div>
    <!-- Subtle radial glow -->
    <div class="absolute inset-0 pointer-events-none"
         style="background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(21,63,53,0.35),transparent);"></div>
    <!-- Background photo watermark -->
    <div class="absolute inset-0 bg-cover bg-center pointer-events-none"
         style="background-image:url('/images/bg_sierra.jpg'); opacity:0.05; mix-blend-mode:luminosity;"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-8 space-y-4" data-animate-delay="100">
        <p class="text-xs font-bold tracking-[0.4em] uppercase" style="color:#aebc82;">Mapa de Lotes</p>
        <h2 class="text-4xl lg:text-5xl font-bold leading-tight" style="color:#ffffff;">PLANO INTERACTIVO</h2>
        <div class="w-14 h-0.5" style="background-color:#aebc82;"></div>
        <p class="text-lg max-w-2xl font-light" style="color:rgba(255,255,255,0.5);">
          Explora los lotes disponibles. Da clic sobre cualquier lote para ver su información y generar una cotización.
        </p>
      </div>

      <!-- Main area: map + sidebar -->
      <div class="flex gap-4" style="height: 680px;" data-animate-delay="200">

        <!-- Map column -->
        <div class="flex-1 flex flex-col rounded-2xl overflow-hidden min-w-0 relative"
             style="border:1px solid rgba(255,255,255,0.08); box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(174,188,130,0.07);">

          <!-- ── PREVIEW STATE (before reveal) ── -->
          <Transition name="map-reveal">
            <div
              v-if="!mapRevealed"
              class="absolute inset-0 z-20 flex flex-col items-center justify-center"
            >
              <!-- Blurry lotification image -->
              <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image:url('/svg/lotificacionsvg.svg');
                       filter:blur(6px) brightness(0.55) saturate(0.7);
                       transform:scale(1.04);"
              ></div>
              <!-- Dark overlay for contrast -->
              <div class="absolute inset-0" style="background:rgba(5,12,9,0.45);"></div>

              <!-- CTA content -->
              <div class="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
                <!-- Map icon -->
                <div class="w-20 h-20 rounded-2xl flex items-center justify-center"
                     style="background:rgba(174,188,130,0.12); border:1px solid rgba(174,188,130,0.3);">
                  <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>

                <div>
                  <p class="text-xs font-bold tracking-[0.35em] uppercase mb-2" style="color:rgba(174,188,130,0.7);">
                    50+ lotes disponibles
                  </p>
                  <h3 class="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    Explora el plano<br>de lotificación
                  </h3>
                </div>

                <button
                  class="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold
                         text-sm tracking-widest uppercase transition-all duration-300
                         hover:scale-105 hover:shadow-2xl"
                  style="background:#aebc82; color:#153f35;"
                  @click="mapRevealed = true"
                >
                  <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Ver mapa interactivo
                </button>
              </div>
            </div>
          </Transition>

          <!-- ── MAP STATE (after reveal) ── -->
          <template v-if="mapRevealed">
            <!-- Toggle bar -->
            <div class="flex items-center gap-2 px-4 py-3 shrink-0" style="background-color:#153f35;">
              <button
                @click="view = 'plano'"
                :class="[
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all tracking-wide',
                  view === 'plano' ? 'text-primary shadow' : 'text-white/50 hover:text-white'
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
                  view === 'lotes' ? 'text-primary shadow' : 'text-white/50 hover:text-white'
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
          </template>

        </div>

        <!-- Right sidebar — only after map is revealed -->
        <div v-if="mapRevealed" class="w-80 shrink-0 rounded-2xl overflow-hidden" style="border:1px solid rgba(255,255,255,0.08); box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(174,188,130,0.07);">
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

const mapRevealed = ref(false)
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

<style scoped>
.map-reveal-leave-active {
  transition: opacity 0.5s ease, filter 0.5s ease;
}
.map-reveal-leave-to {
  opacity: 0;
  filter: blur(4px);
}
</style>
