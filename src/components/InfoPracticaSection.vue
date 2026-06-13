<template>
  <section id="info-practica" ref="sectionRef" class="an-section an-dark" style="padding:100px 0;">
    <div class="an-texture"
         style="background-image:url('/images/tour/stand%20de%20tiro/Panorama8_000.webp'); opacity:.09;">
    </div>
    <div class="an-z an-inner">

      <div class="an-reveal">
        <p class="an-tag-light">{{ t.infoPractica.tag }}</p>
        <h2 class="an-heading-light">{{ t.infoPractica.heading1 }}<br><em>{{ t.infoPractica.heading2 }}</em></h2>
        <p class="an-lead-light" style="margin-bottom:52px;">{{ t.infoPractica.lead }}</p>
      </div>

      <div class="an-info-grid an-reveal">
        <div v-for="card in infoCards" :key="card.title" class="an-flip-card">
          <div class="an-flip-inner">
            <div class="an-flip-front">
              <div class="an-flip-icon">{{ card.icon }}</div>
              <div class="an-flip-title">{{ card.title }}</div>
              <div class="an-flip-hint">Hover →</div>
            </div>
            <div class="an-flip-back">
              <div class="an-flip-back-title">{{ card.backTitle }}</div>
              <p class="an-flip-back-text">{{ card.backText }}</p>
              <div class="an-flip-chips">
                <span v-for="chip in card.chips" :key="chip" class="an-flip-chip">{{ chip }}</span>
              </div>
            </div>
          </div>
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

const infoCards = computed(() => t.value.infoPractica.cards)

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
.an-info-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }

.an-flip-card  { height: 260px; perspective: 1000px; }
.an-flip-inner {
  width: 100%; height: 100%; position: relative;
  transition: transform .7s cubic-bezier(.4,0,.2,1);
  transform-style: preserve-3d;
}
.an-flip-card:hover .an-flip-inner { transform: rotateY(180deg); }

.an-flip-front,
.an-flip-back {
  position: absolute; inset: 0; border-radius: 16px;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;
}
.an-flip-front { background: var(--p3); border: 1px solid rgba(255,255,255,.09); }
.an-flip-back  { background: var(--acc); transform: rotateY(180deg); justify-content: center; align-items: flex-start; }

.an-flip-icon  { font-size: 32px; margin-bottom: auto; padding-bottom: 14px; }
.an-flip-title { font-family: var(--f); font-size: 17px; font-weight: 700; color: #fff; }
.an-flip-hint  { font-family: var(--f); font-size: 11px; color: var(--mu2); margin-top: 4px; }
.an-flip-back-title { font-family: var(--f); font-size: 15px; font-weight: 900; color: var(--p); margin-bottom: 10px; }
.an-flip-back-text  { font-family: var(--f); font-size: 13px; color: rgba(21,63,53,.75); line-height: 1.6; }
.an-flip-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
.an-flip-chip  {
  padding: 3px 10px; border-radius: 99px;
  background: rgba(21,63,53,.14);
  font-family: var(--f); font-size: 10px; font-weight: 700; color: var(--p);
}

@media (max-width: 1024px) {
  .an-info-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 640px) {
  .an-info-grid { grid-template-columns: repeat(2,1fr); }
}
</style>
