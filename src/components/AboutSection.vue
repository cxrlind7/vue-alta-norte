<template>
  <section id="nosotros" class="relative py-32 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 overflow-hidden" data-animate>
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 opacity-5">
        <svg width="60" height="60" viewBox="0 0 60 60" class="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      <svg viewBox="0 0 1200 300" class="absolute bottom-0 w-full h-auto opacity-5">
        <path d="M0,300 L0,200 L200,150 L400,180 L600,120 L800,160 L1000,100 L1200,140 L1200,300 Z" fill="url(#mountainGradient)" />
        <defs>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2a3729;stop-opacity:0.05" />
            <stop offset="100%" style="stop-color:#2a3729;stop-opacity:0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Hero Content -->
      <div class="text-center mb-24" data-animate-delay="100">
        <div class="flex flex-col items-center space-y-8">
          <div class="relative group">
            <img src="/isologo_dark.svg" class="opacity-90 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" alt="Alta Norte" loading="eager" width="100" height="125" />
            <div class="absolute inset-0 rounded-full border border-primary/10 scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
          <h1 class="text-6xl lg:text-8xl font-bold text-primary leading-tight tracking-tight
                     bg-gradient-to-b from-primary-800 via-primary to-primary-700 bg-clip-text text-transparent">
            ALTA NORTE
          </h1>
        </div>
        <div class="mt-12">
          <button
            id="btn-cotizar-planos"
            class="group relative inline-flex items-center
                   bg-gradient-elegant from-primary via-primary-700 to-secondary
                   hover:from-primary-600 hover:via-primary-600 hover:to-secondary-600
                   text-white font-semibold px-10 py-4 rounded-full
                   transition-all duration-500 ease-elegant
                   hover:scale-105 hover:shadow-elegant-lg
                   focus:outline-none focus:ring-4 focus:ring-primary/30
                   overflow-hidden"
            @click="scrollTo('#contacto')"
          >
            <div class="absolute inset-0 bg-gradient-elegant from-secondary to-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-elegant"></div>
            <span class="relative z-10">COTIZA Y APARTA TU LOTE</span>
            <svg class="relative z-10 ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-12 gap-20 items-start mb-24">
        <!-- Left Content -->
        <div class="lg:col-span-6 space-y-10" data-animate-delay="200">
          <div class="space-y-8">
            <h2 class="text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight">
              Alta Norte. Único en su tipo
            </h2>
            <p class="text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light">
              Para un estilo de vida rodeado de naturaleza, paz y lujo. Con extensos lotes campestres y amenidades de primer nivel, te invitamos a descubrir un nuevo norte para vivir.
            </p>
          </div>
          <!-- Stats -->
          <div class="grid grid-cols-2 gap-8">
            <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5
                        border border-primary/10 hover:border-primary/20
                        transition-all duration-300 hover:shadow-elegant">
              <div class="text-3xl font-bold text-primary mb-2">50+</div>
              <div class="text-sm text-neutral-600 font-medium">Lotes Disponibles</div>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5
                        border border-secondary/10 hover:border-secondary/20
                        transition-all duration-300 hover:shadow-elegant">
              <div class="text-3xl font-bold text-secondary mb-2">100%</div>
              <div class="text-sm text-neutral-600 font-medium">Entorno Natural</div>
            </div>
          </div>
        </div>

        <!-- Right Feature Grid -->
        <div class="lg:col-span-6" data-animate-delay="300">
          <div class="grid grid-cols-2 gap-6">
            <div
              v-for="(feature, i) in features"
              :key="feature.title"
              class="group relative p-8 rounded-2xl border border-neutral-200/50 hover:border-primary/20
                     transition-all duration-500 hover:shadow-elegant hover:-translate-y-2 cursor-pointer overflow-hidden"
              :class="i % 2 === 0 ? 'bg-gradient-to-br from-primary/10 to-primary/5' : 'bg-gradient-to-br from-secondary/10 to-secondary/5'"
              :style="{ animationDelay: `${(i+1)*100}ms` }"
            >
              <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
              <div class="relative w-16 h-16 mx-auto mb-6 bg-white rounded-2xl shadow-elegant flex items-center justify-center group-hover:scale-110 group-hover:shadow-elegant-lg transition-all duration-300">
                <svg class="w-8 h-8 text-primary group-hover:text-primary-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
                </svg>
              </div>
              <div class="relative text-center space-y-3">
                <h3 class="font-bold text-primary text-lg group-hover:text-primary-700 transition-colors duration-300">{{ feature.title }}</h3>
                <p class="text-sm text-neutral-600 leading-relaxed">{{ feature.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lifestyle Showcase -->
      <div class="relative" data-animate-delay="400">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <!-- Left Tagline -->
          <div class="space-y-8">
            <h2 class="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span class="text-primary">Diseñado para quienes buscan</span><br />
              <span class="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">vivir lo extraordinario</span>
            </h2>
            <p class="text-xl text-neutral-600 leading-relaxed font-light max-w-lg">
              Una experiencia única donde la naturaleza y el lujo se encuentran en perfecta armonía.
            </p>
            <div class="space-y-4">
              <div v-for="item in listItems" :key="item" class="flex items-center space-x-4 group">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-125 transition-transform duration-300"></div>
                <span class="text-neutral-700 group-hover:text-primary transition-colors duration-300">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative group">
            <div class="relative overflow-hidden rounded-3xl shadow-elegant-lg group-hover:shadow-2xl transition-all duration-500">
              <div class="aspect-[5/6] bg-gradient-to-br from-primary-200 via-secondary-200 to-primary-300 relative overflow-hidden">
                <img src="/images/ski.jpg" alt="Lifestyle scene - Alta Norte" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <!-- Badge -->
                <div class="absolute top-8 right-8 bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 shadow-elegant transform group-hover:scale-105 transition-all duration-300">
                  <div class="flex items-center space-x-3">
                    <img src="/isologo_dark.svg" alt="Alta Norte" loading="eager" width="24" height="30" />
                    <div class="text-left">
                      <div class="text-xs font-semibold text-primary tracking-wide">RESERVA</div>
                      <div class="text-sm font-bold text-surface">ALTA NORTE</div>
                    </div>
                  </div>
                </div>
                <!-- Hover Card -->
                <div class="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <div class="text-center">
                    <div class="text-lg font-bold text-primary mb-2">Sierra Madre</div>
                    <div class="text-sm text-neutral-600">Experiencia de vida incomparable en las montañas</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { title: 'Extensos', subtitle: 'Lotes Campestres', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1' },
  { title: 'Amenidades', subtitle: 'de lujo', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { title: 'Pista', subtitle: 'de esquí única en la región', icon: 'M5 3l14 9-14 9V3z' },
  { title: 'Canchas', subtitle: 'Deportivas y Recreativas', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const listItems = [
  'Vistas panorámicas de la Sierra Madre',
  'Acceso exclusivo a pistas de esquí',
  'Senderos naturales y áreas de camping',
  'Amenidades de clase mundial',
]

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
}
</script>
