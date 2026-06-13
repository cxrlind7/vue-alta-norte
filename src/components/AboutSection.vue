<template>
  <section id="nosotros" class="relative overflow-hidden" style="background:#0e1a15;">

    <div class="flex flex-col lg:flex-row" style="min-height:100vh;">

      <!-- ── LEFT: full-bleed carousel ── -->
      <div class="relative overflow-hidden lg:w-[56%] lg:self-stretch" style="min-height:55vw;">

        <!-- Slides -->
        <div
          v-for="(slide, idx) in carouselSlides"
          :key="idx"
          class="absolute inset-0 transition-opacity duration-1000 bg-cover"
          :class="currentSlide === idx ? 'opacity-100' : 'opacity-0'"
          :style="{ backgroundImage:`url('${slide.src}')`, backgroundPosition: slide.pos }"
        ></div>

        <!-- Right-edge fade into dark panel -->
        <div class="absolute inset-y-0 right-0 w-40 hidden lg:block pointer-events-none"
             style="background:linear-gradient(to right,transparent,#0e1a15);"></div>
        <!-- Top vignette -->
        <div class="absolute top-0 left-0 right-0 h-32 pointer-events-none"
             style="background:linear-gradient(to bottom,rgba(5,14,10,.6),transparent);"></div>
        <!-- Bottom gradient for stat readability -->
        <div class="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
             style="background:linear-gradient(to top,rgba(5,14,10,.95),rgba(5,14,10,.4),transparent);"></div>

        <!-- Stats overlay -->
        <div class="absolute bottom-0 left-0 right-0 px-10 pb-10 flex items-end gap-8" data-animate>
          <div
            v-for="stat in t.about.stats"
            :key="stat.label"
            class="flex flex-col gap-1"
          >
            <span class="font-bold text-3xl lg:text-4xl leading-none" style="color:#aebc82; letter-spacing:-.03em;">{{ stat.value }}</span>
            <span class="text-[.65rem] font-bold tracking-[.28em] uppercase" style="color:rgba(255,255,255,.5);">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="absolute top-6 left-10 flex items-center gap-2">
          <button
            v-for="(_, idx) in carouselSlides"
            :key="idx"
            @click="goTo(idx)"
            class="rounded-full transition-all duration-300"
            :style="{
              background: 'white',
              opacity: currentSlide === idx ? '1' : '0.3',
              width: currentSlide === idx ? '1.25rem' : '0.35rem',
              height: '0.35rem',
            }"
          ></button>
        </div>

        <!-- Badge top-right -->
        <div class="absolute top-6 right-10 hidden lg:flex items-center gap-3 rounded-2xl px-4 py-3"
             style="background:rgba(14,26,21,.9); backdrop-filter:blur(12px); border:1px solid rgba(174,188,130,.2);">
          <img src="/isologo_dark.svg" class="w-5 h-6 shrink-0" alt="" />
          <div>
            <div class="text-[.5rem] font-bold tracking-[.3em] uppercase" style="color:#aebc82;">
              {{ t.about.showcase.badge.label }}
            </div>
            <div class="text-sm font-bold tracking-[.05em]" style="color:#ffffff;">
              {{ t.about.showcase.badge.title }}
            </div>
          </div>
        </div>
      </div>

      <!-- ── RIGHT: text panel ── -->
      <div class="relative flex flex-col justify-center px-10 lg:px-14 py-16 lg:py-24 lg:w-[44%]"
           style="background:#0e1a15;">

        <!-- Subtle texture -->
        <div class="absolute inset-0 pointer-events-none opacity-[0.025]">
          <svg width="60" height="60" viewBox="0 0 60 60" class="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="ab-dot" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ab-dot)" />
          </svg>
        </div>
        <!-- Bg photo watermark -->
        <div class="absolute inset-0 bg-cover bg-center pointer-events-none"
             style="background-image:url('/images/bg_sierra.jpg'); opacity:0.04; mix-blend-mode:luminosity;"></div>

        <div class="relative z-10" data-animate>
          <p class="text-[.65rem] font-bold tracking-[.42em] uppercase mb-5" style="color:#aebc82;">
            {{ t.about.badge }}
          </p>
          <h2 class="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5" style="color:#ffffff;">
            {{ t.about.title }}
          </h2>
          <div class="w-14 h-0.5 mb-7" style="background:#aebc82;"></div>
          <p class="text-base font-light leading-relaxed mb-8" style="color:rgba(255,255,255,.58);">
            {{ t.about.description }}
          </p>

          <!-- Divider -->
          <div class="mb-8 border-t" style="border-color:rgba(174,188,130,.12);"></div>

          <!-- Showcase copy -->
          <p class="text-[.65rem] font-bold tracking-[.42em] uppercase mb-4" style="color:#aebc82;">
            Sierra Madre
          </p>
          <h3 class="text-2xl lg:text-3xl font-bold leading-tight mb-5" style="color:#ffffff;">
            {{ t.about.showcase.title1 }}<br>
            <span style="color:#aebc82;">{{ t.about.showcase.title2 }}</span>
          </h3>
          <p class="text-sm font-light leading-relaxed mb-7" style="color:rgba(255,255,255,.55);">
            {{ t.about.showcase.description }}
          </p>

          <!-- Feature list -->
          <ul class="space-y-2.5 mb-10">
            <li
              v-for="item in t.about.showcase.items"
              :key="item"
              class="flex items-center gap-3 text-sm"
              style="color:rgba(255,255,255,.65);"
            >
              <span class="w-1.5 h-1.5 rounded-full shrink-0" style="background:#aebc82;"></span>
              {{ item }}
            </li>
          </ul>

          <button
            class="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs
                   tracking-[.18em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style="background:#aebc82; color:#153f35;"
            @click="scrollTo('#contacto')"
          >
            {{ t.about.cta }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

const carouselSlides = [
  { src: '/images/tour/casa club/Panorama5_000.webp',     pos: 'center 38%' },
  { src: '/images/tour/ski/Panorama7_000.webp',           pos: 'center 50%' },
  { src: '/images/tour/stand de tiro/Panorama8_000.webp', pos: 'center 42%' },
  { src: '/images/tour/palapa/Panorama5.webp',            pos: 'center 38%' },
  { src: '/images/tour/hostal/Panorama1.webp',            pos: 'center 40%' },
]

const currentSlide = ref(0)
let timer = null

function goTo(idx) {
  currentSlide.value = idx
  clearInterval(timer)
  timer = setInterval(advance, 4000)
}
function advance() {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

onMounted(() => { timer = setInterval(advance, 4000) })
onUnmounted(() => clearInterval(timer))
</script>
