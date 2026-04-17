<template>
  <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden" data-animate>
    <!-- Background Layers -->
    <div class="absolute inset-0 z-0">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style="background-image: url('/images/bg_sierra.jpg')"
        ref="parallaxBg"
      ></div>
      <!-- Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-br from-surface via-primary-900/95 to-secondary-900/90"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent"></div>

      <!-- Mountain SVG -->
      <svg viewBox="0 0 1200 600" class="absolute bottom-0 w-full h-auto opacity-40 animate-float" style="animation-delay:2s;animation-duration:8s" ref="parallaxMountain">
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2a3729;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#265143;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#265143;stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:#2a3729;stop-opacity:0.95" />
          </linearGradient>
        </defs>
        <path d="M0,600 L0,350 L150,280 L300,320 L450,200 L600,260 L750,180 L900,240 L1050,160 L1200,200 L1200,600 Z" fill="url(#mountainGrad1)" />
        <path d="M0,600 L0,400 L120,350 L280,390 L420,300 L580,340 L720,280 L860,320 L1000,260 L1200,300 L1200,600 Z" fill="url(#mountainGrad2)" class="animate-float" style="animation-delay:1s;animation-duration:10s" />
      </svg>

      <!-- Particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="particle absolute top-1/4 left-10 w-1 h-1 bg-white/20 rounded-full animate-float" style="animation-delay:0s;animation-duration:6s"></div>
        <div class="particle absolute top-1/3 right-20 w-2 h-2 bg-primary-300/30 rounded-full animate-float" style="animation-delay:2s;animation-duration:8s"></div>
        <div class="particle absolute bottom-1/2 left-1/4 w-1.5 h-1.5 bg-white/15 rounded-full animate-float" style="animation-delay:4s;animation-duration:7s"></div>
        <div class="particle absolute top-2/3 right-1/3 w-1 h-1 bg-secondary-300/25 rounded-full animate-float" style="animation-delay:3s;animation-duration:9s"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
      <div class="space-y-12">
        <!-- Tagline -->
        <div
          class="hero-element transition-all duration-700"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 500ms"
        >
          <p class="text-lg md:text-xl lg:text-2xl text-neutral-300 font-light tracking-wider
                    bg-gradient-to-r from-neutral-200 via-white to-neutral-200 bg-clip-text text-transparent drop-shadow-sm">
            reserva
          </p>
        </div>

        <!-- Main Title with Logo -->
        <div
          class="hero-element transition-all duration-700"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 700ms"
        >
          <div class="flex flex-col items-center space-y-8">
            <div class="relative group">
              <img src="/isologo.svg" class="drop-shadow-2xl transition-all duration-500 group-hover:scale-105 filter brightness-110" alt="Alta Norte" loading="eager" width="140" height="175" />
              <div class="absolute inset-0 bg-gradient-radial from-primary-300/20 to-transparent rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold leading-none text-center
                       bg-gradient-to-b from-white via-neutral-100 to-neutral-300
                       bg-clip-text text-transparent drop-shadow-lg tracking-tight">
              <span class="block mb-4 transition-all duration-500 hover:tracking-wide">ALTA</span>
              <span class="block bg-gradient-to-r from-primary-200 via-primary-100 to-secondary-200
                           bg-clip-text text-transparent transition-all duration-500 hover:tracking-wide">NORTE</span>
            </h1>
          </div>
        </div>

        <!-- Subtitle -->
        <div
          class="hero-element transition-all duration-700"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 900ms"
        >
          <p class="text-xl md:text-2xl lg:text-3xl text-neutral-200 max-w-5xl mx-auto
                    leading-relaxed font-light tracking-wide
                    bg-gradient-to-r from-neutral-100 via-white to-neutral-100 bg-clip-text text-transparent drop-shadow-sm">
            Vive la experiencia
          </p>
        </div>

        <!-- CTA Button -->
        <div
          class="hero-element transition-all duration-700"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 1100ms"
        >
          <button
            class="group relative inline-flex items-center
                   bg-gradient-elegant from-primary via-primary-700 to-secondary
                   hover:from-primary-600 hover:via-primary-600 hover:to-secondary-600
                   text-white font-semibold text-lg lg:text-xl
                   px-12 py-5 lg:px-16 lg:py-6 rounded-full
                   transition-all duration-500 ease-elegant
                   hover:scale-110 hover:shadow-elegant-lg
                   focus:outline-none focus:ring-4 focus:ring-primary/40
                   overflow-hidden transform hover:-translate-y-1"
            @click="scrollToNosotros"
          >
            <div class="absolute inset-0 bg-gradient-elegant from-secondary via-secondary-600 to-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-elegant"></div>
            <span class="relative z-10 tracking-wide">CONOCE MÁS</span>
            <svg class="relative z-10 ml-3 w-6 h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-12 left-1/2 transform -translate-x-1/2 hero-element transition-all duration-700 cursor-pointer"
        :class="heroVisible ? 'opacity-100' : 'opacity-0'"
        style="transition-delay: 1300ms"
        @click="scrollToNosotros"
      >
        <div class="flex flex-col items-center space-y-4 text-white/80 group transition-all duration-300 hover:text-white hover:scale-110">
          <span class="text-sm font-medium tracking-widest uppercase">&nbsp;</span>
          <div class="relative">
            <div class="w-6 h-10 border-2 border-white/60 rounded-full group-hover:border-white transition-colors duration-300">
              <div class="w-1 h-3 bg-white/60 rounded-full mx-auto mt-2 group-hover:bg-white transition-colors duration-300 animate-bounce-subtle"></div>
            </div>
            <div class="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroVisible = ref(false)
const parallaxBg = ref(null)
const parallaxMountain = ref(null)

function scrollToNosotros() {
  const el = document.querySelector('#nosotros')
  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
}

function handleParallax() {
  const scrollY = window.pageYOffset
  if (parallaxBg.value) parallaxBg.value.style.transform = `translateY(${scrollY * 0.3}px)`
  if (parallaxMountain.value) parallaxMountain.value.style.transform = `translateY(${scrollY * 0.2}px)`
}

onMounted(() => {
  setTimeout(() => { heroVisible.value = true }, 100)
  window.addEventListener('scroll', handleParallax, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
})
</script>
