<template>
  <section
    id="amenidades"
    ref="sectionRef"
    class="py-24 relative overflow-hidden"
    style="background-color: #153f35;"
  >
    <!-- Subtle texture -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="80" height="80" viewBox="0 0 80 80" class="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="amenity-dot" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#amenity-dot)" />
      </svg>
    </div>
    <!-- Top accent line -->
    <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,#aebc82 30%,#aebc82 70%,transparent);"></div>
    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,#aebc82 30%,#aebc82 70%,transparent);"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Section Header -->
      <div
        class="text-center mb-16 transition-all duration-700"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <p class="text-xs font-bold tracking-[0.45em] uppercase mb-4" style="color:#aebc82;">
          {{ t.amenities.badge }}
        </p>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {{ t.amenities.title }}
        </h2>
        <div class="w-14 h-0.5 mx-auto mb-6" style="background-color:#aebc82;"></div>
        <p class="text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed" style="color:rgba(255,255,255,0.6);">
          {{ t.amenities.subtitle }}
        </p>
      </div>

      <!-- 8-Card Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <div
          v-for="(item, index) in t.amenities.items"
          :key="item.icon + index"
          class="amenity-card group relative flex flex-col gap-5 p-6 lg:p-7 rounded-2xl cursor-default overflow-hidden
                 transition-all duration-500"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          :style="{ transitionDelay: visible ? `${index * 70}ms` : '0ms' }"
        >
          <!-- Radial glow on hover -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
               style="background:radial-gradient(ellipse at 20% 20%,rgba(174,188,130,0.09),transparent 65%);"></div>

          <!-- Icon -->
          <div
            class="relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                   transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg"
            style="background:rgba(174,188,130,0.13);"
          >
            <svg
              class="w-7 h-7 transition-colors duration-300"
              fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              viewBox="0 0 24 24"
              style="color:#aebc82;"
            >
              <path v-if="item.icon === 'lotes'"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              <path v-else-if="item.icon === 'star'"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              <path v-else-if="item.icon === 'mountain'"
                d="M3 17l5-8 4 5 3-4 6 7H3z M8 11l1-2" />
              <path v-else-if="item.icon === 'courts'"
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              <path v-else-if="item.icon === 'flag'"
                d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7" />
              <path v-else-if="item.icon === 'trails'"
                d="M12 3c-4.418 0-8 3.582-8 8 0 5.25 8 13 8 13s8-7.75 8-13c0-4.418-3.582-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
              <path v-else-if="item.icon === 'camping'"
                d="M4 20L12 6l8 14H4z M9 20v-5h6v5" />
              <path v-else-if="item.icon === 'house'"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          <!-- Text content -->
          <div class="relative flex flex-col gap-2 flex-1 min-w-0">
            <h3 class="text-white font-bold text-sm lg:text-base leading-snug">
              {{ item.title }}
            </h3>
            <p class="text-sm leading-relaxed font-light" style="color:rgba(255,255,255,0.55);">
              {{ item.desc }}
            </p>
          </div>

          <!-- Bottom accent bar — slides in on hover -->
          <div
            class="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b"
            style="background-color:#aebc82;"
          ></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
const sectionRef = ref(null)
const visible    = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { visible.value = true; observer.disconnect() } },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.amenity-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(174,188,130,.12);
  transition: transform .4s cubic-bezier(.25,.46,.45,.94), box-shadow .4s, background .3s, border-color .3s;
}
.amenity-card:hover {
  transform: translateY(-6px);
  background: rgba(255,255,255,.07);
  border-color: rgba(174,188,130,.45);
  box-shadow: 0 24px 52px rgba(0,0,0,.4), 0 0 28px rgba(174,188,130,.07);
}
</style>
