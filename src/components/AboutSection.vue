<template>
  <section id="nosotros" class="py-28 lg:py-36" style="background:#f6f6f4;" data-animate>
    <div class="max-w-screen-xl mx-auto px-6 lg:px-20">

      <!-- Single-column intro -->
      <div class="max-w-2xl mx-auto mb-28 text-center" data-animate-delay="100">
        <p class="text-[.65rem] font-bold tracking-[.42em] uppercase mb-5" style="color:#aebc82;">
          {{ t.about.badge }}
        </p>
        <h2 class="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6" style="color:#153f35;">
          {{ t.about.title }}
        </h2>
        <p class="text-lg font-light leading-relaxed mb-10" style="color:#6b6b60;">
          {{ t.about.description }}
        </p>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="stat in t.about.stats" :key="stat.label"
            class="stat-card bg-white rounded-2xl p-7 text-center cursor-default
                   transition-all duration-300 hover:-translate-y-1"
          >
            <div class="text-4xl font-bold mb-2" style="color:#153f35; letter-spacing:-.03em; line-height:1;">
              {{ stat.value }}
            </div>
            <div class="w-7 h-px mx-auto mb-2" style="background:#aebc82;"></div>
            <div class="text-[.72rem] font-bold tracking-[.08em] uppercase" style="color:#6b6b60;">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Showcase row -->
      <div class="grid lg:grid-cols-2 gap-20 items-center" data-animate-delay="200">

        <!-- Copy -->
        <div>
          <p class="text-[.65rem] font-bold tracking-[.42em] uppercase mb-5" style="color:#aebc82;">
            Sierra Madre
          </p>
          <h3 class="text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-6" style="color:#153f35;">
            {{ t.about.showcase.title1 }}<br>
            <span style="color:#aebc82;">{{ t.about.showcase.title2 }}</span>
          </h3>
          <p class="text-lg font-light leading-relaxed mb-8" style="color:#6b6b60;">
            {{ t.about.showcase.description }}
          </p>
          <ul class="space-y-3 mb-10">
            <li
              v-for="item in t.about.showcase.items" :key="item"
              class="flex items-center gap-4 text-sm cursor-default group transition-colors duration-200"
              style="color:#6b6b60;"
            >
              <span
                class="w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125"
                style="background:#aebc82;"
              ></span>
              {{ item }}
            </li>
          </ul>
          <button
            class="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-xs tracking-[.18em] uppercase
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style="background:#aebc82; color:#153f35;"
            @click="scrollTo('#planos')"
          >
            {{ t.about.cta }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Photo carousel -->
        <div class="relative overflow-hidden rounded-3xl shadow-2xl" style="aspect-ratio:5/6;">

          <!-- Slides -->
          <div
            v-for="(slide, idx) in carouselSlides"
            :key="idx"
            class="absolute inset-0 transition-opacity duration-700"
            :class="currentSlide === idx ? 'opacity-100' : 'opacity-0'"
            :style="{
              backgroundImage: `url('${slide.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: slide.pos,
              backgroundRepeat: 'no-repeat',
            }"
          ></div>

          <!-- Bottom gradient so dots are readable -->
          <div class="absolute inset-0 pointer-events-none"
               style="background:linear-gradient(to top,rgba(5,18,14,.65) 0%,rgba(5,18,14,.1) 40%,transparent 70%);"></div>

          <!-- Dot indicators -->
          <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <button
              v-for="(_, idx) in carouselSlides"
              :key="idx"
              @click="goTo(idx)"
              class="rounded-full transition-all duration-300"
              :style="{
                background: 'white',
                opacity: currentSlide === idx ? '1' : '0.35',
                width: currentSlide === idx ? '1.5rem' : '0.4rem',
                height: '0.4rem',
              }"
            ></button>
          </div>

          <!-- Badge -->
          <div class="absolute top-6 right-6 flex items-center gap-3 rounded-2xl px-4 py-3"
               style="background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.5);">
            <img src="/isologo_dark.svg" class="w-5 h-6 shrink-0" alt="" />
            <div>
              <div class="text-[.5rem] font-bold tracking-[.3em] uppercase" style="color:#aebc82;">
                {{ t.about.showcase.badge.label }}
              </div>
              <div class="text-sm font-bold tracking-[.05em]" style="color:#153f35;">
                {{ t.about.showcase.badge.title }}
              </div>
            </div>
          </div>

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

// Carousel slides — _000 files are rectilinear exports (look great at any crop)
// Full equirectangulars use background-position tuned to their undistorted horizon band
const carouselSlides = [
  { src: '/images/tour/casa club/Panorama5_000.png',      pos: 'center 38%' },
  { src: '/images/tour/ski/Panorama7_000.jpg',            pos: 'center 50%' },
  { src: '/images/tour/stand de tiro/Panorama8_000.jpg',  pos: 'center 42%' },
  { src: '/images/tour/palapa/Panorama5.jpg',             pos: 'center 38%' },
  { src: '/images/tour/hostal/Panorama1.jpg',             pos: 'center 40%' },
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

<style scoped>
.stat-card {
  border: 1px solid rgba(21,63,53,.08);
  box-shadow: none;
  transition: border-color .3s, box-shadow .3s, transform .3s;
}
.stat-card:hover {
  border-color: rgba(174,188,130,.4);
  box-shadow: 0 8px 28px rgba(21,63,53,.08);
}
</style>
