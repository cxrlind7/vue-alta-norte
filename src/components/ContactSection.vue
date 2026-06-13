<template>
  <section id="contacto" class="relative overflow-hidden" style="background:#0a0f0d;" data-animate>

    <!-- Background photo -->
    <div class="absolute inset-0 bg-cover bg-center pointer-events-none"
         style="background-image:url('/images/bg_sierra.jpg'); opacity:0.08; mix-blend-mode:luminosity;"></div>
    <!-- Dot texture -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.025]">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="ct-dot" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ct-dot)" />
      </svg>
    </div>
    <!-- Glow center -->
    <div class="absolute inset-0 pointer-events-none"
         style="background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(21,63,53,0.3),transparent);"></div>
    <!-- Top accent -->
    <div class="absolute top-0 left-0 right-0 h-px pointer-events-none"
         style="background:linear-gradient(90deg,transparent,rgba(174,188,130,0.5) 30%,rgba(174,188,130,0.5) 70%,transparent);"></div>

    <div class="relative z-10">

      <!-- Display heading -->
      <div class="text-center px-6 pt-20 pb-14" data-animate-delay="100">
        <p class="text-xs font-bold tracking-[0.45em] uppercase mb-5" style="color:#aebc82;">
          {{ t.contact.badge }}
        </p>
        <h2 class="font-bold leading-none tracking-tight text-white"
            style="font-size:clamp(3rem,8vw,7rem); letter-spacing:-0.03em;">
          {{ t.contact.title }}
        </h2>
        <div class="w-20 h-0.5 mx-auto mt-7" style="background-color:#aebc82;"></div>
      </div>

      <!-- 3-column contact grid -->
      <div class="grid sm:grid-cols-3 border-t border-b" style="border-color:rgba(174,188,130,0.12);" data-animate-delay="200">

        <!-- Phone -->
        <a href="tel:+526181090020"
           class="group flex flex-col items-center justify-center gap-5 py-16 px-8
                  border-r transition-all duration-300 hover:bg-white/[0.03]"
           style="border-color:rgba(174,188,130,0.12);">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                      group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(174,188,130,0.25)]"
               style="background:rgba(174,188,130,0.1); border:1px solid rgba(174,188,130,0.18);">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-[9px] font-bold tracking-[0.35em] uppercase mb-3" style="color:rgba(174,188,130,0.6);">
              {{ t.contact.phone }}
            </p>
            <p class="text-xl font-bold text-white group-hover:text-[#aebc82] transition-colors duration-300">
              +52 618 109 0020
            </p>
          </div>
          <div class="w-0 h-0.5 group-hover:w-12 transition-all duration-500 rounded-full" style="background:#aebc82;"></div>
        </a>

        <!-- Email -->
        <a href="mailto:info@altanorte.mx"
           class="group flex flex-col items-center justify-center gap-5 py-16 px-8
                  border-r transition-all duration-300 hover:bg-white/[0.03]"
           style="border-color:rgba(174,188,130,0.12);">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                      group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(174,188,130,0.25)]"
               style="background:rgba(174,188,130,0.1); border:1px solid rgba(174,188,130,0.18);">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-[9px] font-bold tracking-[0.35em] uppercase mb-3" style="color:rgba(174,188,130,0.6);">
              {{ t.contact.email }}
            </p>
            <p class="text-xl font-bold text-white group-hover:text-[#aebc82] transition-colors duration-300">
              info@altanorte.mx
            </p>
          </div>
          <div class="w-0 h-0.5 group-hover:w-12 transition-all duration-500 rounded-full" style="background:#aebc82;"></div>
        </a>

        <!-- WhatsApp -->
        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer"
           class="group flex flex-col items-center justify-center gap-5 py-16 px-8
                  transition-all duration-300 hover:bg-white/[0.03]">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                      group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(174,188,130,0.25)]"
               style="background:rgba(174,188,130,0.1); border:1px solid rgba(174,188,130,0.18);">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
            </svg>
          </div>
          <div class="text-center">
            <p class="text-[9px] font-bold tracking-[0.35em] uppercase mb-3" style="color:rgba(174,188,130,0.6);">
              {{ t.contact.whatsapp }}
            </p>
            <p class="text-xl font-bold text-white group-hover:text-[#aebc82] transition-colors duration-300">
              {{ t.contact.writeUs }}
            </p>
          </div>
          <div class="w-0 h-0.5 group-hover:w-12 transition-all duration-500 rounded-full" style="background:#aebc82;"></div>
        </a>
      </div>

      <!-- Address strip -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 px-8 py-8 border-b"
           style="border-color:rgba(174,188,130,0.1);" data-animate-delay="300">
        <div class="flex items-center gap-2.5">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-sm font-light" style="color:rgba(255,255,255,.45);">{{ t.contact.addressLine1 }}</span>
        </div>
        <span class="hidden sm:block w-px h-4" style="background:rgba(174,188,130,.2);"></span>
        <span class="text-sm font-light" style="color:rgba(255,255,255,.35);">{{ t.contact.addressLine2 }}</span>
      </div>

      <!-- Subtitle under heading -->
      <p class="text-center text-base font-light px-6 py-10" style="color:rgba(255,255,255,.4);">
        {{ t.contact.subtitle }}
      </p>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t, lang } = useI18n()

const whatsappHref = computed(() => {
  const msg = lang.value === 'en'
    ? 'Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20Alta%20Norte'
    : 'Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Alta%20Norte'
  return `https://wa.me/526181090020?text=${msg}`
})
</script>
