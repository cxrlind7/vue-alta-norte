<template>
  <section id="llegar" ref="sectionRef" class="an-section an-dark">
    <div class="an-texture"
         style="background-image:url('/images/tour/ski/Panorama7_000.webp'); opacity:.09;">
    </div>
    <div class="an-z">

      <div class="an-llegar-layout">

        <div class="an-llegar-left an-reveal">
          <p class="an-tag-light">{{ t.llegar.tag }}</p>
          <h2 class="an-heading-light">
            {{ t.llegar.heading1 }}<br><em>{{ t.llegar.heading2 }}</em><br>{{ t.llegar.heading3 }}
          </h2>
          <p class="an-lead-light">{{ t.llegar.lead }}</p>

          <div class="an-routes">
            <button
              v-for="r in routes" :key="r.key"
              class="an-route"
              :class="{ active: activeRoute === r.key }"
              @click="setRoute(r.key)"
            >
              <span class="an-route-emoji">{{ r.emoji }}</span>
              <div class="an-route-info">
                <div class="an-route-from">{{ r.from }}</div>
                <div class="an-route-time">{{ r.time }}</div>
                <div class="an-route-detail">{{ r.detail }}</div>
              </div>
              <span class="an-route-chevron">›</span>
            </button>
          </div>

          <div class="an-accordion">
            <p class="an-accordion-label">{{ t.llegar.stepsLabel }}</p>
            <div
              v-for="(step, i) in steps" :key="i"
              class="an-step-item"
              :class="{ open: openStep === i }"
            >
              <button class="an-step-trigger" @click="toggleStep(i)">
                <span class="an-step-num">{{ i + 1 }}</span>
                <span class="an-step-text">{{ step.title }}</span>
                <span class="an-step-icon">{{ openStep === i ? '−' : '+' }}</span>
              </button>
              <div class="an-step-body">
                <p v-html="step.body"></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const sectionRef = ref(null)
const { t } = useI18n()

const routes = computed(() => t.value.llegar.routes)
const steps  = computed(() => t.value.llegar.steps)

const activeRoute = ref('durango')
const openStep    = ref(0)
const routeDrawn  = ref(false)

function setRoute(key) { activeRoute.value = key }
function toggleStep(i) { openStep.value = openStep.value === i ? -1 : i }
function scrollToSection(target) {
  const el = document.querySelector(target)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

watch(activeRoute, () => {
  routeDrawn.value = false
  nextTick(() => { routeDrawn.value = true })
})

onMounted(async () => {
  await nextTick()
  setTimeout(() => { routeDrawn.value = true }, 700)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('an-in'); observer.unobserve(e.target) }
    })
  }, { threshold: 0.06 })
  sectionRef.value?.querySelectorAll('.an-reveal').forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('an-in')
    else observer.observe(el)
  })
})
</script>

<style scoped>
.an-llegar-layout {
  display: grid; grid-template-columns: 1fr; align-items: stretch;
}
.an-llegar-left  { padding: 80px 8%; max-width: 1100px; width: 100%; margin: 0 auto; box-sizing: border-box; }

.an-route-line { stroke-dasharray: 620; stroke-dashoffset: 620; transition: stroke-dashoffset 1.5s ease; }
.an-route-line.draw { stroke-dashoffset: 0; }
.an-pin-pulse { animation: pinPulse 2.2s ease-in-out infinite; }
@keyframes pinPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.4;transform:scale(1.6);} }

.an-routes { display: flex; flex-direction: column; gap: 4px; margin-top: 32px; }
.an-route  {
  padding: 14px 16px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,.08);
  display: flex; gap: 14px; align-items: center;
  background: transparent; width: 100%; text-align: left; cursor: pointer;
  font-family: var(--f); transition: all .3s;
}
.an-route:hover,
.an-route.active { background: rgba(255,255,255,.06); border-color: rgba(174,188,130,.38); }
.an-route-emoji  { font-size: 20px; flex-shrink: 0; }
.an-route-info   { flex: 1; }
.an-route-from   { font-family: var(--f); font-size: 13px; font-weight: 700; color: #fff; }
.an-route-time   { font-family: var(--f); font-size: 21px; font-weight: 900; color: var(--acc); line-height: 1; }
.an-route-detail { font-family: var(--f); font-size: 12px; color: var(--mu); margin-top: 3px; }
.an-route-chevron { font-size: 18px; color: var(--mu2); transition: color .2s, transform .2s; }
.an-route:hover .an-route-chevron,
.an-route.active .an-route-chevron { color: var(--acc); transform: translateX(4px); }

.an-accordion       { margin-top: 28px; }
.an-accordion-label {
  font-family: var(--f); font-size: 10px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--mu2); margin-bottom: 10px;
}
.an-step-item   { border-bottom: 1px solid rgba(255,255,255,.08); overflow: hidden; }
.an-step-trigger {
  width: 100%; display: flex; align-items: center; gap: 14px;
  padding: 13px 0; background: none; border: none;
  font-family: var(--f); text-align: left; cursor: pointer;
}
.an-step-num {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  background: rgba(174,188,130,.12); border: 1px solid rgba(174,188,130,.3);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--f); font-size: 11px; font-weight: 700; color: var(--acc);
}
.an-step-text { font-family: var(--f); font-size: 14px; font-weight: 600; color: #fff; flex: 1; }
.an-step-icon { font-size: 18px; color: var(--mu2); transition: transform .3s; }
.an-step-item.open .an-step-icon { transform: rotate(45deg); }
.an-step-body { max-height: 0; overflow: hidden; transition: max-height .4s; padding: 0 0 0 40px; }
.an-step-item.open .an-step-body { max-height: 120px; padding-bottom: 12px; }
.an-step-body p { font-family: var(--f); font-size: 13px; color: var(--mu); line-height: 1.6; }
.an-step-body :deep(strong) { color: #fff; }

@media (max-width: 1024px) {
  .an-llegar-left { padding: 60px 24px; }
}
</style>
