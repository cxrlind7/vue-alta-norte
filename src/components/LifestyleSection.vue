<template>
  <section id="lifestyle" class="py-24 bg-white" data-animate>

    <!-- Section Header -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16" data-animate-delay="100">
      <p class="text-xs font-bold tracking-[0.4em] uppercase mb-4" style="color:#aebc82;">
        {{ t.lifestyle.badge }}
      </p>
      <h2 class="text-5xl lg:text-6xl font-bold text-primary leading-tight">
        {{ t.lifestyle.title }}
      </h2>
      <div class="w-14 h-0.5 mx-auto mt-6 mb-6" style="background-color:#aebc82;"></div>
      <p class="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
        {{ t.lifestyle.subtitle }}
      </p>
    </div>

    <!-- Three Pillar Cards -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8" data-animate-delay="200">
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(pillar, i) in t.lifestyle.pillars"
          :key="pillar.title"
          class="group relative overflow-hidden rounded-2xl cursor-pointer"
          :style="{ aspectRatio: '3/4', marginTop: i === 1 ? '3rem' : '0', willChange: 'transform', transform: 'translateZ(0)' }"
        >
          <!-- Background image — always visible, zoom on hover -->
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              :style="{
                backgroundImage: `url('${configs[i].tourImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: configs[i].bgPosition,
                backgroundRepeat: 'no-repeat',
                willChange: 'transform',
              }"
            ></div>
          </div>

          <!-- Persistent gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>

          <!-- Top sage accent -->
          <div class="absolute top-0 left-0 right-0 h-1" style="background-color:#aebc82;"></div>

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-150">
              <span class="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                    style="background-color:#aebc82; color:#153f35;">
                {{ pillar.tag }}
              </span>
            </div>
            <h3 class="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">{{ pillar.title }}</h3>
            <p class="text-sm text-white/80 leading-relaxed font-light pt-2
                      opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                      transition-[opacity,transform] duration-150 ease-out">
              {{ pillar.desc }}
            </p>
            <div class="mt-5 h-0.5 rounded-full origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-300"
                 style="background-color:#aebc82; width:4rem;"></div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const configs = [
  {
    tourImage: '/images/tour/ski/Panorama7_000.jpg',
    bgPosition: 'center 50%',
  },
  {
    tourImage: '/images/tour/palapa/Panorama5.jpg',
    bgPosition: 'center 45%',
  },
  {
    tourImage: '/images/tour/casa club/Panorama5_000.png',
    bgPosition: 'center 38%',
  },
]

// Pre-decode images on mount so first hover has no decode lag
onMounted(() => {
  configs.forEach(c => {
    const img = new Image()
    img.decoding = 'async'
    img.src = c.tourImage
  })
})
</script>
