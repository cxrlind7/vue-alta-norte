<template>
  <section id="eventos" ref="sectionRef" class="an-section an-dark">
    <div class="an-z">

      <div class="an-inner" style="padding-top:100px; padding-bottom:56px;">
        <div class="an-reveal">
          <p class="an-tag-light">{{ t.eventos.tag }}</p>
          <h2 class="an-heading-light">
            {{ t.eventos.heading1 }}<br><em>{{ t.eventos.heading2 }}</em>
          </h2>
          <p class="an-lead-light">{{ t.eventos.lead }}</p>
        </div>
      </div>

      <div class="an-eventos-strip">
        <div v-for="ev in events" :key="ev.tag" class="an-ev-card an-reveal">
          <div class="an-ev-photo" :style="{ backgroundImage: `url('${ev.image}')` }"></div>
          <div class="an-ev-overlay"></div>
          <div class="an-ev-content">
            <div class="an-ev-tag-label">{{ ev.tag }}</div>
            <h3 class="an-ev-title">{{ ev.title }}</h3>
            <p class="an-ev-desc">{{ ev.desc }}</p>
            <ul class="an-ev-features">
              <li v-for="f in ev.features" :key="f">{{ f }}</li>
            </ul>
            <button class="an-ev-cta" @click="scrollToSection('#recorrido-nuevo')">
              {{ ev.cta }} →
            </button>
          </div>
          <div class="an-ev-line"></div>
        </div>
      </div>



    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const sectionRef = ref(null)
const { t } = useI18n()

const events = computed(() => t.value.eventos.items)

function scrollToSection(target) {
  const el = document.querySelector(target)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()
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
.an-eventos-strip { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }

.an-ev-card {
  position: relative; overflow: hidden; min-height: 500px; cursor: pointer;
}
.an-ev-photo {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform .7s ease;
}
.an-ev-card:hover .an-ev-photo { transform: scale(1.06); }
.an-ev-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(10,22,16,.28) 0%, rgba(10,22,16,.62) 45%, rgba(10,22,16,.90) 100%);
  transition: background .4s;
}
.an-ev-card:hover .an-ev-overlay {
  background: linear-gradient(to bottom, rgba(10,22,16,.35) 0%, rgba(10,22,16,.72) 45%, rgba(10,22,16,.95) 100%);
}
.an-ev-content {
  position: relative; z-index: 2; padding: 44px 36px;
  height: 100%; display: flex; flex-direction: column;
}
.an-ev-tag-label {
  font-family: var(--f); font-size: 10px; font-weight: 700;
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 14px;
}
.an-ev-title {
  font-family: var(--f); font-size: clamp(20px,2vw,26px);
  font-weight: 700; color: #fff; line-height: 1.2;
  letter-spacing: -.02em; margin-bottom: 14px;
}
.an-ev-desc {
  font-family: var(--f); font-size: 14px; color: var(--mu);
  line-height: 1.75; margin-bottom: 20px; flex: 1;
}
.an-ev-features { list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.an-ev-features li {
  font-family: var(--f); font-size: 13px; color: var(--mu);
  display: flex; gap: 10px; align-items: center;
  transform: translateX(-10px); opacity: 0;
  transition: transform .4s, opacity .4s;
}
.an-ev-features li::before { content: '✓'; color: var(--acc); font-weight: 700; flex-shrink: 0; }
.an-ev-card:hover .an-ev-features li { transform: translateX(0); opacity: 1; }
.an-ev-card:hover .an-ev-features li:nth-child(1){ transition-delay: .05s; }
.an-ev-card:hover .an-ev-features li:nth-child(2){ transition-delay: .10s; }
.an-ev-card:hover .an-ev-features li:nth-child(3){ transition-delay: .15s; }
.an-ev-card:hover .an-ev-features li:nth-child(4){ transition-delay: .20s; }
.an-ev-cta {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--f); font-size: 12px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--acc); background: none; border: none; cursor: pointer;
  transition: gap .2s; position: relative; z-index: 2;
}
.an-ev-cta:hover { gap: 14px; }
.an-ev-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 2.5px;
  background: var(--acc); transform: scaleX(0); transform-origin: left;
  transition: transform .4s; z-index: 3;
}
.an-ev-card:hover .an-ev-line { transform: scaleX(1); }

.an-eventos-banner {
  background: var(--p3); border-radius: 16px; padding: 36px 40px;
  display: flex; gap: 32px; align-items: center; flex-wrap: wrap;
  border: 1px solid rgba(255,255,255,.08);
}
.an-eventos-banner-title {
  font-family: var(--f); font-size: 20px; font-weight: 700;
  color: #fff; margin-bottom: 8px; letter-spacing: -.02em;
}
.an-eventos-banner-sub {
  font-family: var(--f); font-size: 14px; color: var(--mu); line-height: 1.7;
}

@media (max-width: 1024px) {
  .an-eventos-strip { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .an-ev-card { min-height: 400px; }
}
</style>
