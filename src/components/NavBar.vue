<template>
  <nav
    id="main-nav"
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-elegant"
    :class="{ 'nav-scrolled': navScrolled }"
    :style="{ transform: navHidden ? 'translateY(-100%)' : 'translateY(0)' }"
  >
    <!-- Nav Background -->
    <div class="absolute inset-0 bg-white/80 dark:bg-surface/90 backdrop-blur-xl border-b border-neutral-200/20 dark:border-primary/20 transition-all duration-500" :class="{ 'opacity-0': navScrolled }"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 group">
          <a href="#inicio" class="flex items-center transition-transform duration-300 hover:scale-105" @click.prevent="scrollTo('#inicio')">
            <img src="/logo_horizontal.svg" class="transition-all duration-300 group-hover:brightness-110" alt="Alta Norte - Desarrollo Campestre de Lujo" loading="eager" height="42" />
          </a>
        </div>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:block">
          <div class="flex items-center space-x-2">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="nav-link relative px-6 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200
                     hover:text-primary-800 dark:hover:text-primary-300
                     transition-all duration-300 ease-elegant
                     rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                     group"
              :class="{ active: activeSection === link.id }"
              @click.prevent="scrollTo(`#${link.id}`)"
            >
              <span class="relative z-10">{{ link.label }}</span>
              <div class="absolute inset-0 bg-gradient-elegant from-primary/5 to-secondary/5 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-elegant from-primary to-secondary transition-all duration-300 group-hover:w-8"></div>
            </a>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="hidden md:block">
            <a href="/en" class="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300
                   hover:text-primary-800 dark:hover:text-primary-300
                   border border-neutral-200 dark:border-neutral-700
                   rounded-lg transition-all duration-300 hover:scale-105
                   hover:border-primary/30 shadow-elegant
                   focus:outline-none focus:ring-2 focus:ring-primary/20">
              EN
            </a>
          </div>

          <!-- CTA Button -->
          <button
            id="btn-cotizar-hero"
            class="hidden sm:inline-flex items-center
                   bg-gradient-elegant from-primary to-secondary
                   hover:from-primary-700 hover:to-secondary-700
                   text-white font-semibold px-8 py-3 rounded-full
                   transition-all duration-300 ease-elegant
                   hover:scale-105 hover:shadow-elegant-lg
                   focus:outline-none focus:ring-4 focus:ring-primary/30
                   group relative overflow-hidden"
            @click="scrollTo('#contacto')"
          >
            <div class="absolute inset-0 bg-gradient-elegant from-secondary to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <span class="relative z-10">COTIZAR</span>
            <svg class="relative z-10 ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="lg:hidden p-3 text-neutral-700 dark:text-neutral-200
                   hover:text-primary-800 dark:hover:text-primary-300
                   rounded-xl transition-all duration-300 hover:bg-primary/5
                   focus:outline-none focus:ring-2 focus:ring-primary/20"
            :aria-expanded="mobileMenuOpen.toString()"
            aria-label="Toggle menu"
            @click="toggleMobileMenu"
          >
            <svg class="h-6 w-6 transition-transform duration-300" :style="{ transform: mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        class="lg:hidden absolute top-full left-0 right-0
               bg-white/95 dark:bg-surface/95 backdrop-blur-xl
               border-b border-neutral-200/20 dark:border-primary/20
               transition-all duration-500 ease-elegant"
        :class="mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'"
      >
        <div class="px-6 py-8 space-y-6">
          <div class="space-y-4">
            <a
              v-for="(link, index) in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              class="mobile-nav-link block px-6 py-4 text-lg font-medium
                     text-neutral-700 dark:text-neutral-200
                     hover:text-primary-800 dark:hover:text-primary-300
                     rounded-xl transition-all duration-300
                     hover:bg-gradient-elegant hover:from-primary/5 hover:to-secondary/5
                     border border-transparent hover:border-primary/20"
              :style="{ animationDelay: `${index * 100}ms` }"
              @click.prevent="mobileNavClick(`#${link.id}`)"
            >
              {{ link.label }}
            </a>
          </div>
          <div class="border-t border-neutral-200/30 dark:border-primary/30 pt-6 space-y-4">
            <a href="/en" class="block px-6 py-4 text-lg font-medium text-neutral-700 dark:text-neutral-200
                   hover:text-primary-800 dark:hover:text-primary-300
                   rounded-xl transition-all duration-300 hover:bg-primary/5">
              English
            </a>
            <div class="px-6">
              <button
                id="btn-cotizar-nosotros"
                class="w-full bg-gradient-elegant from-primary to-secondary
                       hover:from-primary-700 hover:to-secondary-700
                       text-white font-semibold px-8 py-4 rounded-full
                       transition-all duration-300 hover:scale-[1.02] hover:shadow-elegant-lg
                       focus:outline-none focus:ring-4 focus:ring-primary/30"
                @click="mobileNavClick('#contacto')"
              >
                COTIZAR LOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navHidden = ref(false)
const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const activeSection = ref('inicio')
let lastScrollY = 0

const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'planos', label: 'Planos' },
  { id: 'contacto', label: 'Contacto' },
]

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) {
    const top = el.offsetTop - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
  if (mobileMenuOpen.value) toggleMobileMenu()
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

function mobileNavClick(selector) {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => scrollTo(selector), 100)
}

function handleScroll() {
  const currentScrollY = window.scrollY
  const direction = currentScrollY > lastScrollY ? 'down' : 'up'

  // Hide/show nav on scroll direction
  if (direction === 'down' && currentScrollY > 200 && !mobileMenuOpen.value) {
    navHidden.value = true
  } else {
    navHidden.value = false
  }

  // Nav scrolled glass effect
  navScrolled.value = currentScrollY > 80

  lastScrollY = currentScrollY

  // Active section detection
  const sections = document.querySelectorAll('section[id]')
  const scrollPos = window.scrollY + 150
  sections.forEach(section => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute('id')
    if (scrollPos >= top && scrollPos < top + height) {
      activeSection.value = id
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) toggleMobileMenu()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
