<template>
  <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden" data-animate>
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image:url('/images/IMG_0881.JPG.jpeg');"
        ref="parallaxBg"
      ></div>
      <!-- <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div> -->
    </div>

    <!-- CTAs -->
    <div class="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hero-element transition-all duration-700 flex flex-col sm:flex-row gap-4 justify-center w-full px-6"
         :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
         style="transition-delay:1050ms;">
      <button
        class="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold
               text-sm tracking-widest uppercase transition-all duration-300
               hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-secondary/40"
        style="background-color:#aebc82; color:#153f35;"
        @click="scrollTo('#nosotros')"
      >
        <span>{{ t.hero.cta }}</span>
        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
      <button
        class="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm
               tracking-widest uppercase border-2 border-white/35 text-white
               hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
        @click="scrollTo('#planos')"
      >
        {{ t.hero.ctaLots }}
      </button>
      <a
        href="https://altanorte.overclic.com"
        target="_blank"
        rel="noopener"
        class="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-sm
               tracking-widest uppercase border-2 border-white/35 text-white
               hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
      >
        {{ t.hero.ctaPortal }}
      </a>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hero-element transition-all duration-700 cursor-pointer"
         :class="heroVisible ? 'opacity-100' : 'opacity-0'"
         style="transition-delay:1500ms;"
         @click="scrollTo('#nosotros')">
      <div class="flex flex-col items-center gap-3 text-white/55 hover:text-white transition-colors duration-300">
        <span class="text-[9px] tracking-[0.4em] uppercase font-light">Scroll</span>
        <div class="w-5 h-9 border border-white/35 rounded-full flex justify-center pt-1.5">
          <div class="w-0.5 h-2.5 bg-white/55 rounded-full animate-bounce-subtle"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const heroVisible = ref(false)
const parallaxBg  = ref(null)

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

function handleParallax() {
  const y = window.pageYOffset
  if (parallaxBg.value) parallaxBg.value.style.transform = `translateY(${y * 0.35}px)`
}

onMounted(() => {
  setTimeout(() => { heroVisible.value = true }, 120)
  window.addEventListener('scroll', handleParallax, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleParallax))
</script>
