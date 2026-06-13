<template>
  <section id="clima" ref="sectionRef" class="an-section an-cream" style="padding:100px 0;">
    <div class="an-texture"
         style="background-image:url('/images/bg_sierra.jpg'); opacity:.06; mix-blend-mode:luminosity;">
    </div>
    <div class="an-z an-inner">

      <div class="an-reveal">
        <p class="an-tag-dark">{{ t.clima.tag }}</p>
        <h2 class="an-heading-dark">{{ t.clima.heading1 }}<br><em>{{ t.clima.heading2 }}</em></h2>
      </div>

      <div class="an-season-tabs an-reveal">
        <button
          v-for="s in seasonList" :key="s.key"
          class="an-season-tab"
          :class="{ active: activeSeason === s.key }"
          @click="activeSeason = s.key"
        >{{ s.emoji }} {{ s.label }}</button>
      </div>

      <Transition name="season-fade" mode="out-in">
        <div :key="activeSeason" class="an-season-panel">
          <div>
            <div class="an-temp-big">{{ currentSeason.temp }}</div>
            <div class="an-temp-range">{{ currentSeason.range }}</div>
            <p class="an-clima-desc">{{ currentSeason.desc }}</p>
            <div class="an-clima-tags">
              <span v-for="tag in currentSeason.tags" :key="tag" class="an-clima-tag">{{ tag }}</span>
            </div>
          </div>
          <div class="an-vest-grid">
            <div v-for="item in currentSeason.gear" :key="item.title" class="an-vest-card">
              <span class="an-vest-emoji">{{ item.emoji }}</span>
              <div>
                <div class="an-vest-title">{{ item.title }}</div>
                <div class="an-vest-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const sectionRef = ref(null)
const { t } = useI18n()

const seasonList    = computed(() => t.value.clima.seasons)
const activeSeason  = ref('primavera')
const currentSeason = computed(() => t.value.clima.data[activeSeason.value])

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
.an-season-tabs {
  display: flex; gap: 4px; margin: 28px 0 44px;
  background: rgba(21,63,53,.1); border-radius: 999px;
  padding: 4px; width: fit-content;
}
.an-season-tab {
  padding: 10px 22px; border-radius: 999px;
  font-family: var(--f); font-size: 13px; font-weight: 700;
  border: none; background: transparent; color: rgba(21,63,53,.5);
  cursor: pointer; transition: all .3s;
}
.an-season-tab.active { background: var(--p); color: #fff; }

.an-season-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }

.an-temp-big {
  font-family: var(--f); font-size: 84px; font-weight: 700;
  color: var(--p); line-height: 1; letter-spacing: -.04em; margin-bottom: 8px;
}
.an-temp-range { font-family: var(--f); font-size: 15px; color: rgba(21,63,53,.5); margin-bottom: 18px; }
.an-clima-desc { font-family: var(--f); font-size: 15px; color: rgba(21,63,53,.7); line-height: 1.75; margin-bottom: 24px; }
.an-clima-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.an-clima-tag  {
  padding: 6px 14px; border-radius: 999px;
  font-family: var(--f); font-size: 12px; font-weight: 700;
  background: rgba(21,63,53,.09); color: var(--p);
}
.an-vest-grid { display: flex; flex-direction: column; gap: 12px; }
.an-vest-card {
  background: #fff; border-radius: 10px; padding: 18px 20px;
  display: flex; gap: 14px; align-items: flex-start;
  border: 1px solid rgba(21,63,53,.08);
  transition: border-color .25s, transform .25s;
}
.an-vest-card:hover { border-color: var(--acc); transform: translateX(4px); }
.an-vest-emoji { font-size: 22px; flex-shrink: 0; }
.an-vest-title { font-family: var(--f); font-size: 14px; font-weight: 700; color: var(--p); margin-bottom: 3px; }
.an-vest-desc  { font-family: var(--f); font-size: 13px; color: rgba(21,63,53,.55); line-height: 1.5; }

.season-fade-enter-active, .season-fade-leave-active { transition: opacity .3s ease, transform .3s ease; }
.season-fade-enter-from, .season-fade-leave-to { opacity: 0; transform: translateY(10px); }

@media (max-width: 1024px) {
  .an-season-panel { grid-template-columns: 1fr; gap: 28px; }
}
@media (max-width: 640px) {
  .an-temp-big    { font-size: 60px; }
  .an-season-tabs { flex-wrap: wrap; width: 100%; border-radius: 12px; }
}
</style>
