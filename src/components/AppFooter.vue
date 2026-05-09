<template>
  <footer
    class="relative overflow-hidden border-t-2"
    style="background-color:#153f35; border-color:#aebc82;"
  >
    <!-- Dot texture -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="ft-dot" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ft-dot)" />
      </svg>
    </div>

    <!-- Watermark symbol (bottom-right) -->
    <img
      src="/isologo.svg"
      class="absolute pointer-events-none select-none"
      style="bottom:10px;right:10px;width:320px;height:auto;filter:brightness(0) invert(1);opacity:.045;"
      aria-hidden="true"
      alt=""
    />

    <!-- Gradient glow top-left -->
    <div class="absolute top-0 left-0 w-80 h-80 pointer-events-none"
         style="background:radial-gradient(ellipse at top left,rgba(174,188,130,0.07),transparent 70%);"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

      <!-- Top grid -->
      <div class="grid md:grid-cols-12 gap-12 lg:gap-16 mb-14">

        <!-- Brand column -->
        <div class="md:col-span-5 space-y-7">
          <div class="flex items-center gap-4 group">
            <img src="/isologo.svg" width="52" height="65" alt="Alta Norte"
                 class="group-hover:scale-110 transition-transform duration-500 shrink-0"
                 style="filter:brightness(0) invert(1);opacity:.85;" />
            <div class="leading-tight">
              <p class="text-white/50 text-xs font-bold tracking-[0.35em] uppercase mb-0.5" style="color:#aebc82;">
                RESERVA
              </p>
              <p class="text-white font-bold text-2xl tracking-wide">ALTA NORTE</p>
              <p class="text-white/40 text-xs tracking-widest uppercase font-light mt-0.5">
                {{ t.loading.subtitle }}
              </p>
            </div>
          </div>

          <p class="text-white/55 text-sm leading-relaxed font-light max-w-sm">
            {{ t.footer.tagline }}
          </p>

          <!-- Social links -->
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener noreferrer' : undefined"
              :aria-label="social.label"
              class="w-10 h-10 rounded-xl flex items-center justify-center
                     border border-white/10 hover:border-secondary/50
                     transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              style="background:rgba(255,255,255,0.06);"
            >
              <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" v-html="social.path"></svg>
            </a>
          </div>
        </div>

        <!-- Navigation column -->
        <div class="md:col-span-3">
          <h4 class="text-xs font-bold tracking-[0.35em] uppercase mb-7" style="color:#aebc82;">
            {{ t.footer.nav }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in t.footer.links" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="group inline-flex items-center gap-2 text-sm text-white/50
                       hover:text-white transition-all duration-300 font-medium tracking-wide"
                @click.prevent="scrollTo(`#${link.id}`)"
              >
                <span class="w-0 h-px group-hover:w-4 transition-all duration-300 rounded-full shrink-0"
                      style="background-color:#aebc82;"></span>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div class="md:col-span-4">
          <h4 class="text-xs font-bold tracking-[0.35em] uppercase mb-7" style="color:#aebc82;">
            {{ t.footer.contact }}
          </h4>
          <ul class="space-y-5">

            <!-- Address -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.office }}
                </p>
                <p class="text-white/80 text-sm leading-relaxed">{{ t.footer.addressLine1 }}</p>
                <p class="text-white/80 text-sm">{{ t.footer.addressLine2 }}</p>
              </div>
            </li>

            <!-- Phone -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.phone }}
                </p>
                <a href="tel:+526181090020"
                   class="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 link-luxury">
                  +52 (618) 109-0020
                </a>
              </div>
            </li>

            <!-- Email -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.email }}
                </p>
                <a href="mailto:info@altanorte.mx"
                   class="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 link-luxury">
                  info@altanorte.mx
                </a>
              </div>
            </li>

            <!-- WhatsApp -->
            <li>
              <a
                :href="whatsappHref"
                target="_blank" rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       border text-sm font-bold tracking-wide transition-all duration-300
                       hover:scale-105 hover:shadow-lg"
                style="border-color:rgba(174,188,130,0.35); color:#aebc82; background:rgba(174,188,130,0.07);"
                @mouseenter="e => e.currentTarget.style.background='rgba(174,188,130,0.14)'"
                @mouseleave="e => e.currentTarget.style.background='rgba(174,188,130,0.07)'"
              >
                <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687" />
                </svg>
                {{ t.contact.writeUs }}
              </a>
            </li>

          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
           style="border-color:rgba(174,188,130,0.18);">
        <p class="text-white/30 text-xs tracking-wide">{{ t.footer.rights }}</p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
            {{ t.footer.terms }}
          </a>
          <a href="#" class="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
            {{ t.footer.privacy }}
          </a>
        </div>
      </div>

    </div>
  </footer>
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

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/Alta-Norte-61573212684928/',
    external: true,
    path: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  },
  {
    label: 'Instagram',
    href: '#',
    external: false,
    path: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
  },
  {
    label: 'WhatsApp',
    get href() { return whatsappHref.value },
    external: true,
    path: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>',
  },
]
</script>
