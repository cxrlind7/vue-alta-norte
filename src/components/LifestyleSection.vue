<template>
  <section id="lifestyle" class="py-32 bg-gradient-to-br from-surface via-surface-800 to-primary-950 relative overflow-hidden" data-animate>
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" class="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="lifestyle-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lifestyle-pattern)" />
        </svg>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-surface/20 via-transparent to-primary-900/30"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-20 items-center">
        <!-- Left Content -->
        <div class="lg:col-span-6 space-y-12" data-animate-delay="100">
          <div class="space-y-8">
            <h2 class="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span class="text-white">LIFESTYLE</span><br />
              <span class="bg-gradient-to-r from-primary-200 via-primary-100 to-secondary-200 bg-clip-text text-transparent">&amp; AMENITIES</span>
            </h2>
            <p class="text-xl lg:text-2xl text-neutral-300 leading-relaxed font-light max-w-2xl">
              Experimenta un lujo incomparable con nuestras amenidades exclusivas, incluyendo un resort de esquí de última generación, senderos serenos para caminatas y instalaciones de camping de primer nivel. Abraza un estilo de vida en medio de paisajes impresionantes.
            </p>
          </div>

          <!-- Amenity Categories -->
          <div class="flex flex-wrap gap-4" data-animate-delay="200">
            <span
              v-for="(cat, i) in categories"
              :key="cat"
              class="px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20
                     text-primary-200 rounded-full text-sm font-medium
                     border border-primary/30 backdrop-blur-sm
                     hover:from-primary/30 hover:to-secondary/30 hover:border-primary/50
                     transition-all duration-300 hover:scale-105 cursor-pointer"
              :style="{ animationDelay: `${i*100}ms` }"
            >
              {{ cat }}
            </span>
          </div>

          <!-- Amenity Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-animate-delay="300">
            <div
              v-for="(amenity, i) in amenities"
              :key="amenity.label"
              class="group cursor-pointer transform hover:scale-105 transition-all duration-500"
              :style="{ animationDelay: `${i*150}ms` }"
            >
              <div class="relative overflow-hidden rounded-2xl h-32 mb-4 shadow-elegant hover:shadow-elegant-lg transition-all duration-500">
                <div class="absolute inset-0">
                  <img v-if="amenity.img" :src="amenity.img" :alt="amenity.label" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div v-if="amenity.img" class="absolute inset-0 opacity-70 group-hover:opacity-60 transition-opacity duration-300" :class="amenity.overlay"></div>
                  <div v-else class="absolute inset-0 bg-gradient-to-br from-primary to-secondary group-hover:from-primary-600 group-hover:to-secondary-600 transition-all duration-500"></div>
                </div>
                <div class="relative h-full flex items-center justify-center">
                  <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30">
                    <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="amenity.icon" />
                    </svg>
                  </div>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p class="text-white text-sm font-medium text-center group-hover:text-primary-200 transition-colors duration-300">{{ amenity.label }}</p>
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="lg:col-span-6 relative" data-animate-delay="200">
          <div class="relative group">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-elegant-lg transition-all duration-700">
              <div class="aspect-[4/5] relative">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800"></div>
                <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="/images/padel.png" alt="Lifestyle - Alta Norte Premium Experience" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 group-hover:to-black/10 transition-all duration-700"></div>
                <!-- Badge -->
                <div class="absolute top-8 right-8 bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-elegant transform group-hover:scale-105 transition-all duration-500 hover:shadow-elegant-lg">
                  <div class="flex items-center space-x-3">
                    <img src="/isologo_dark.svg" alt="Alta Norte" loading="eager" width="20" height="25" />
                    <div class="text-left">
                      <div class="text-xs font-bold text-primary tracking-wider">Experiencia Premium</div>
                      <div class="text-sm font-bold text-surface">ALTA NORTE</div>
                    </div>
                  </div>
                </div>
                <!-- Hover Panel -->
                <div class="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-elegant border border-white/30 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                  <div class="text-center space-y-3">
                    <div class="text-lg font-bold text-primary">Experiencia Premium</div>
                    <div class="text-sm text-neutral-600 leading-relaxed">Vive la combinación perfecta entre lujo, naturaleza y aventura en la Sierra Madre</div>
                    <div class="flex justify-center space-x-2">
                      <div class="w-2 h-2 bg-primary rounded-full"></div>
                      <div class="w-2 h-2 bg-secondary rounded-full"></div>
                      <div class="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -top-8 -right-8 w-32 h-32 bg-gradient-radial from-primary/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-radial from-secondary/25 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = ['SKI RESORT', 'HIKING TRAILS', 'CAMPING']

const amenities = [
  {
    label: 'SKI RESORT',
    img: '/images/ski.jpg',
    overlay: 'bg-gradient-to-br from-blue-500/80 to-blue-700/80',
    icon: 'M5 3l14 9-14 9V3z',
  },
  {
    label: 'HIKING',
    img: '/images/hike.jpg',
    overlay: 'bg-gradient-to-br from-green-500/80 to-green-700/80',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    label: 'CAMPING',
    img: '/images/camping.webp',
    overlay: 'bg-gradient-to-br from-orange-500/80 to-orange-700/80',
    icon: 'M3 7l3-3 9.5 9.5a2.5 2.5 0 01-3.5 3.5L2.5 7z',
  },
  {
    label: 'AND MORE',
    img: null,
    overlay: '',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  },
]
</script>
