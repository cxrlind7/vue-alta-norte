<template>
  <!-- Loading Overlay -->
  <div class="loading-overlay" v-if="loading" :style="{ opacity: loadingFadeOut ? 0 : 1, pointerEvents: loadingFadeOut ? 'none' : 'auto' }">
    <div class="loading-content">
      <div class="loading-logo">
        <img src="/isologo.svg" class="loading-logo-img" alt="Alta Norte" />
      </div>
      <div class="loading-text">
        <span class="loading-brand">ALTA NORTE</span>
        <span class="loading-subtitle">Desarrollo Campestre</span>
      </div>
      <div class="loading-progress">
        <div class="loading-progress-bar" :style="{ width: loadingProgress + '%' }"></div>
      </div>
    </div>
  </div>

  <!-- Custom Cursor (desktop only) -->
  <div class="custom-cursor" ref="cursor" style="display:none" :style="tourOpen ? { opacity: 0, pointerEvents: 'none' } : {}"></div>
  <div class="custom-cursor-dot" ref="cursorDot" style="display:none" :style="tourOpen ? { opacity: 0, pointerEvents: 'none' } : {}"></div>

  <!-- Admin Login -->
  <AdminLogin v-if="showAdminLogin" @success="showAdminLogin = false" />

  <!-- Admin view: cotizador only -->
  <div v-else-if="isAdmin" class="min-h-screen bg-gray-50">
    <!-- Admin top bar -->
    <div class="w-full bg-slate-900 px-6 py-3 flex items-center justify-between">
      <span class="text-white text-sm font-semibold tracking-wide">Alta Norte — Admin</span>
      <button
        class="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        @click="handleLogout"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Cerrar sesión
      </button>
    </div>
    <PlansSection />
  </div>

  <!-- Main App -->
  <div v-else :class="{ 'opacity-0': loading && !loadingFadeOut }">
    <NavBar />
    <main class="relative bg-surface">
      <HeroSection />
      <AboutSection />
      <LifestyleSection />
      <PlansSection />
      <TourSection />
      <ContactSection />
    </main>
    <AppFooter />

    <!-- WhatsApp Floating Button -->
    <a
      id="whatsapp-float"
      class="whatsapp-float"
      href="https://wa.me/526181090020?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Alta%20Norte"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      :style="whatsappStyle"
    >
      <!-- Gradient border wrapper -->
      <span class="whatsapp-border">
        <span class="whatsapp-inner">
          <!-- WhatsApp icon -->
          <span class="whatsapp-icon-wrap">
            <span class="whatsapp-pulse-ring"></span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687" />
            </svg>
          </span>
          <!-- Divider -->
          <span class="whatsapp-divider"></span>
          <!-- Label -->
          <span class="whatsapp-label">¡Escríbenos!</span>
        </span>
      </span>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTourState } from './composables/useTourState'
import { useAdminState } from './composables/useAdminState'
import AdminLogin from './components/AdminLogin.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import LifestyleSection from './components/LifestyleSection.vue'
import PlansSection from './components/PlansSection.vue'
import TourSection from './components/TourSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'

const { tourOpen } = useTourState()
const { isAdmin, logout } = useAdminState()

function handleLogout() {
  logout()
  window.location.href = '/'
}

const isAdminRoute   = window.location.pathname === '/admin'
const showAdminLogin = ref(isAdminRoute && !isAdmin.value)

const loading = ref(true)
const loadingFadeOut = ref(false)
const loadingProgress = ref(0)
const whatsappVisible = ref(false)
const cursor = ref(null)
const cursorDot = ref(null)

const whatsappStyle = computed(() => ({
  position: 'fixed',
  bottom: '32px',
  left: '32px',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  opacity: whatsappVisible.value && !tourOpen.value ? 1 : 0,
  pointerEvents: whatsappVisible.value && !tourOpen.value ? 'auto' : 'none',
  transform: whatsappVisible.value && !tourOpen.value ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease',
}))

onMounted(() => {
  // Loading progress animation
  const interval = setInterval(() => {
    loadingProgress.value += Math.random() * 20
    if (loadingProgress.value >= 100) {
      loadingProgress.value = 100
      clearInterval(interval)
      setTimeout(() => {
        loadingFadeOut.value = true
        setTimeout(() => {
          loading.value = false
          // Show WhatsApp
          setTimeout(() => { whatsappVisible.value = true }, 1000)
          // Initialize scroll animations
          initScrollAnimations()
          // Initialize custom cursor
          initCursor()
        }, 800)
      }, 300)
    }
  }, 150)
})

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        // Also animate children with data-animate-delay
        const delayedChildren = entry.target.querySelectorAll('[data-animate-delay]')
        delayedChildren.forEach(child => {
          child.classList.add('animate-in')
        })
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
}

function initCursor() {
  // Only on desktop (hover capable)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  const cur = cursor.value
  const dot = cursorDot.value
  if (!cur || !dot) return

  cur.style.display = 'block'
  dot.style.display = 'block'

  document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px'
    cur.style.top = e.clientY + 'px'
    dot.style.left = e.clientX + 'px'
    dot.style.top = e.clientY + 'px'
  })

  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('cursor-hover')
      dot.classList.add('cursor-hover')
    })
    el.addEventListener('mouseleave', () => {
      cur.classList.remove('cursor-hover')
      dot.classList.remove('cursor-hover')
    })
  })
}
</script>

<style>
/* ---- WhatsApp Floating Button — Premium Redesign ---- */

.whatsapp-float {
  text-decoration: none;
}

/* Gradient border via background trick */
.whatsapp-border {
  display: inline-flex;
  padding: 1.5px;
  border-radius: 50px;
  background: linear-gradient(135deg, #25D366 0%, #265143 50%, #2a3729 100%);
  box-shadow:
    0 4px 24px rgba(37, 211, 102, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.35s ease, transform 0.35s ease;
}

.whatsapp-float:hover .whatsapp-border {
  box-shadow:
    0 8px 36px rgba(37, 211, 102, 0.32),
    0 4px 16px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

/* Inner glass pill */
.whatsapp-inner {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(6, 23, 23, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 50px;
  overflow: hidden;
  height: 48px;
}

/* Icon area — green badge */
.whatsapp-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #22c55e, #128C7E);
  flex-shrink: 0;
}

/* Pulse ring inside icon area */
.whatsapp-pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.35);
  animation: waPulse 2.2s ease-in-out infinite;
}

@keyframes waPulse {
  0%, 100% { transform: scale(1);   opacity: 0.55; }
  50%       { transform: scale(1.5); opacity: 0; }
}

/* Thin divider */
.whatsapp-divider {
  width: 1px;
  height: 28px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
  flex-shrink: 0;
}

/* Label */
.whatsapp-label {
  padding: 0 18px 0 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  text-transform: uppercase;
  font-family: 'Amble', sans-serif;
}

.whatsapp-float:hover .whatsapp-label {
  color: #fff;
}

@media (hover: none) and (pointer: coarse) {
  /* Touch devices — keep it compact */
  .whatsapp-label {
    font-size: 12px;
    padding: 0 14px 0 12px;
  }
}
</style>

