<template>
  <section id="lifestyle" class="texture-grain relative overflow-hidden" style="background-color:#f0ebe0;">

    <!-- Section-level background photo (visible in header area) -->
    <div class="absolute inset-0 bg-cover bg-center pointer-events-none"
         style="background-image:url('/images/bg_sierra.jpg'); opacity:0.07;"></div>

    <!-- Section Header -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-14 text-center" data-animate>
      <p class="text-xs font-bold tracking-[0.4em] uppercase mb-4" style="color:#aebc82;">
        {{ t.lifestyle.badge }}
      </p>
      <h2 class="text-5xl lg:text-6xl font-bold leading-tight" style="color:#153f35;">
        {{ t.lifestyle.title }}
      </h2>
      <div class="w-14 h-0.5 mx-auto mt-6 mb-6" style="background-color:#aebc82;"></div>
      <p class="text-lg max-w-2xl mx-auto font-light leading-relaxed" style="color:#6b6b60;">
        {{ t.lifestyle.subtitle }}
      </p>
    </div>

    <!-- Horizontal magazine strips -->
    <div class="relative z-10">
      <div
        v-for="(pillar, i) in t.lifestyle.pillars"
        :key="pillar.title"
        class="group flex flex-col lg:flex-row cursor-pointer border-t"
        :class="i === t.lifestyle.pillars.length - 1 ? 'border-b' : ''"
        style="border-color:rgba(21,63,53,0.1); min-height:380px;"
        @mouseenter="hoveredIndex = i"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Text panel -->
        <div
          class="lg:w-[42%] shrink-0 flex flex-col justify-center px-8 lg:px-16 py-12 relative overflow-hidden"
          :class="i % 2 === 0 ? 'lg:order-1 order-2' : 'lg:order-2 order-2'"
          :style="{
            backgroundColor: '#f0ebe0',
            boxShadow: i % 2 === 0
              ? 'inset -24px 0 48px rgba(0,0,0,0.08)'
              : 'inset 24px 0 48px rgba(0,0,0,0.08)'
          }"
        >
          <!-- Text panel background photo -->
          <div class="absolute inset-0 bg-cover bg-center pointer-events-none"
               :style="{
                 backgroundImage: `url('${configs[i].tourImage}')`,
                 opacity: 0.08,
               }"></div>
          <!-- Warm tint overlay so photo doesn't overpower text -->
          <div class="absolute inset-0 pointer-events-none" style="background-color:rgba(240,235,224,0.65);"></div>

          <!-- Index number watermark -->
          <span
            class="absolute top-6 right-8 font-bold select-none hidden lg:block"
            style="font-size:5rem; line-height:1; color:rgba(21,63,53,0.06); letter-spacing:-0.04em;"
          >0{{ i + 1 }}</span>

          <!-- Content above overlays -->
          <div class="relative z-10 flex flex-col">
            <div class="mb-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <span
                class="inline-block text-xs font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                style="background-color:#aebc82; color:#153f35;"
              >{{ pillar.tag }}</span>
            </div>

            <h3
              class="font-bold leading-tight mb-4"
              style="font-size: clamp(2rem, 3.5vw, 3rem); color:#153f35;"
            >{{ pillar.title }}</h3>

            <p class="text-base font-light leading-relaxed" style="color:#6b6b60; max-width:26rem;">
              {{ pillar.desc }}
            </p>

            <div
              class="mt-7 h-0.5 rounded-full origin-left scale-x-[0.4] group-hover:scale-x-100 transition-transform duration-500"
              style="background-color:#aebc82; width:4rem;"
            ></div>
          </div>
        </div>

        <!-- Image panel -->
        <div
          class="flex-1 relative overflow-hidden"
          :class="i % 2 === 0 ? 'lg:order-2 order-1' : 'lg:order-1 order-1'"
          style="min-height:260px; box-shadow: inset 0 -40px 60px rgba(0,0,0,0.22), inset 0 40px 60px rgba(0,0,0,0.18);"
        >
          <!-- Base image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
            :style="{
              backgroundImage: `url('${configs[i].tourImage}')`,
              backgroundPosition: configs[i].bgPosition,
              transform: hoveredIndex === i ? 'scale(1.06)' : 'scale(1)',
              opacity: hoveredIndex === i ? 0 : 1,
            }"
          ></div>
          <!-- Hover image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
            :style="{
              backgroundImage: `url('${configs[i].hoverImage}')`,
              backgroundPosition: configs[i].bgPosition,
              transform: hoveredIndex === i ? 'scale(1.04)' : 'scale(1.09)',
              opacity: hoveredIndex === i ? 1 : 0,
            }"
          ></div>
          <!-- Edge gradient blending into text panel -->
          <div
            class="absolute inset-0 pointer-events-none"
            :style="{
              background: i % 2 === 0
                ? 'linear-gradient(to right, rgba(240,235,224,0.3) 0%, transparent 20%)'
                : 'linear-gradient(to left, rgba(240,235,224,0.3) 0%, transparent 20%)'
            }"
          ></div>
          <!-- Top accent bar -->
          <div class="absolute top-0 left-0 right-0 h-0.5 opacity-60" style="background-color:#aebc82;"></div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const hoveredIndex = ref(null)

const configs = [
  {
    tourImage: '/images/tour/ski/Panorama7_000.webp',
    hoverImage: '/images/tour/ski/Panorama6.webp',
    bgPosition: 'center 50%',
  },
  {
    tourImage: '/images/tour/palapa/Panorama5.webp',
    hoverImage: '/images/tour/hostal/Panorama1.webp',
    bgPosition: 'center 45%',
  },
  {
    tourImage: '/images/tour/casa club/Panorama5_000.webp',
    hoverImage: '/images/tour/casa club/Panorama7.webp',
    bgPosition: 'center 38%',
  },
]

onMounted(() => {
  // Only preload base images; hover images load lazily on first hover
  configs.forEach(c => {
    const img = new Image()
    img.decoding = 'async'
    img.src = c.tourImage
  })
})
</script>
