<template>
  <nav
    id="main-nav"
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :style="{
      transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
      background: navScrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: navScrolled ? 'blur(20px) saturate(150%)' : 'none',
      WebkitBackdropFilter: navScrolled ? 'blur(20px) saturate(150%)' : 'none',
      borderBottom: navScrolled ? '1px solid rgba(21,63,53,0.12)' : '1px solid transparent',
      boxShadow: navScrolled ? '0 2px 20px rgba(21,63,53,0.08)' : 'none',
    }"
  >
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <!-- Logo -->
        <div class="flex-shrink-0 group">
          <a href="#inicio" class="flex items-center transition-transform duration-300 hover:scale-105" @click.prevent="scrollTo('#inicio')">
            <img
              :src="navScrolled ? '/logo_horizontal.svg' : '/logo_horizontal_vl.svg'"
              class="transition-all duration-500"
              alt="Alta Norte — Reserva"
              loading="eager"
              height="40"
            />
          </a>
        </div>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:block">
          <div class="flex items-center space-x-1">
            <a
              v-for="link in t.nav.links"
              :key="link.id"
              :href="`#${link.id}`"
              class="nav-link relative px-5 py-2.5 text-sm font-bold
                     transition-all duration-300 ease-elegant
                     rounded-xl focus:outline-none
                     focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2 group tracking-wide"
              :class="[
                navScrolled
                  ? 'text-primary hover:text-primary-700 hover:bg-secondary/10'
                  : 'text-white/85 hover:text-white hover:bg-white/10',
                { active: activeSection === link.id },
                { 'nav-scrolled-active': navScrolled }
              ]"
              @click.prevent="scrollTo(`#${link.id}`)"
            >
              <span class="relative z-10">{{ link.label }}</span>
              <div class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-6"
                   style="background-color:#aebc82;"></div>
            </a>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">

          <!-- Language Toggle -->
          <div class="hidden sm:flex items-center p-0.5 rounded-full border transition-all duration-500"
               :style="navScrolled
                 ? 'border-color:rgba(21,63,53,0.2); background:rgba(21,63,53,0.05);'
                 : 'border-color:rgba(255,255,255,0.25); background:rgba(255,255,255,0.08);'">
            <button
              @click="setLang('es')"
              class="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200"
              :class="lang === 'es'
                ? 'text-white shadow-sm'
                : navScrolled ? 'text-primary/50 hover:text-primary' : 'text-white/50 hover:text-white'"
              :style="lang === 'es' ? { backgroundColor: '#153f35' } : {}"
            >ES</button>
            <button
              @click="setLang('en')"
              class="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200"
              :class="lang === 'en'
                ? 'text-white shadow-sm'
                : navScrolled ? 'text-primary/50 hover:text-primary' : 'text-white/50 hover:text-white'"
              :style="lang === 'en' ? { backgroundColor: '#153f35' } : {}"
            >EN</button>
          </div>

          <!-- CTA Button -->
          <button
            id="btn-cotizar-hero"
            class="hidden sm:inline-flex items-center gap-2 font-bold px-7 py-2.5 rounded-full
                   transition-all duration-300 hover:scale-105 hover:shadow-lg
                   focus:outline-none focus:ring-4 focus:ring-secondary/40
                   group relative overflow-hidden tracking-widest text-sm uppercase"
            style="background-color:#aebc82; color:#153f35;"
            @click="scrollTo('#planos')"
          >
            <span class="relative z-10">{{ t.nav.cta }}</span>
            <svg class="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="lg:hidden p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/30"
            :class="navScrolled
              ? 'text-primary hover:text-primary-700 hover:bg-secondary/10'
              : 'text-white hover:bg-white/10'"
            :aria-expanded="mobileMenuOpen.toString()"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <svg class="h-6 w-6 transition-transform duration-300" :style="{ transform: mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <div
          v-if="mobileMenuOpen"
          class="lg:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-xl
                 border-b border-primary/10 shadow-lg"
        >
          <div class="px-6 py-6 space-y-1">
            <a
              v-for="(link, index) in t.nav.links"
              :key="link.id"
              :href="`#${link.id}`"
              class="flex items-center px-5 py-3.5 text-sm font-bold text-primary hover:text-primary-700
                     rounded-xl transition-all duration-200 hover:bg-secondary/10
                     border border-transparent hover:border-secondary/20 tracking-wide"
              :style="{ animationDelay: `${index * 50}ms` }"
              @click.prevent="mobileNavClick(`#${link.id}`)"
            >
              {{ link.label }}
            </a>

            <div class="border-t border-primary/10 pt-5 mt-4 space-y-4">
              <div class="flex items-center gap-2 px-1">
                <span class="text-xs text-primary/40 font-bold tracking-widest uppercase">Lang:</span>
                <div class="flex items-center p-0.5 rounded-full border border-primary/20" style="background:rgba(21,63,53,0.05);">
                  <button @click="setLang('es')"
                    class="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200"
                    :class="lang === 'es' ? 'text-white' : 'text-primary/50 hover:text-primary'"
                    :style="lang === 'es' ? { backgroundColor: '#153f35' } : {}">ES</button>
                  <button @click="setLang('en')"
                    class="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200"
                    :class="lang === 'en' ? 'text-white' : 'text-primary/50 hover:text-primary'"
                    :style="lang === 'en' ? { backgroundColor: '#153f35' } : {}">EN</button>
                </div>
              </div>
              <button
                class="w-full font-bold px-8 py-4 rounded-full tracking-widest uppercase
                       transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                       focus:outline-none focus:ring-4 focus:ring-secondary/40 text-sm"
                style="background-color:#aebc82; color:#153f35;"
                @click="mobileNavClick('#planos')"
              >
                {{ t.nav.ctaMobile }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { lang, t, setLang } = useI18n()

const navHidden      = ref(false)
const navScrolled    = ref(false)
const mobileMenuOpen = ref(false)
const activeSection  = ref('inicio')
let   lastScrollY    = 0

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
  if (mobileMenuOpen.value) toggleMobileMenu()
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

function mobileNavClick(selector) {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => scrollTo(selector), 120)
}

function handleScroll() {
  const y   = window.scrollY
  const dir = y > lastScrollY ? 'down' : 'up'

  navHidden.value = dir === 'down' && y > 220 && !mobileMenuOpen.value
    ? true
    : dir === 'up' ? false : navHidden.value

  navScrolled.value = y > 80

  lastScrollY = y

  const sections  = document.querySelectorAll('section[id]')
  const scrollPos = y + 160
  sections.forEach(sec => {
    const top    = sec.offsetTop
    const height = sec.offsetHeight
    if (scrollPos >= top && scrollPos < top + height) {
      activeSection.value = sec.getAttribute('id')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenuOpen.value) toggleMobileMenu()
  })
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
