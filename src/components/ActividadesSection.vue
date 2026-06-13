<template>
  <section id="actividades" ref="sectionRef" class="an-section an-cream">
    <div class="an-texture"
         style="background-image:url('/images/tour/palapa/Panorama5.webp');">
    </div>
    <div class="an-z">

      <div class="an-act-header">
        <div class="an-reveal">
          <p class="an-tag-dark">{{ t.actividades.tag }}</p>
          <h2 class="an-heading-dark">
            {{ t.actividades.heading1 }}<br><em>{{ t.actividades.heading2 }}</em>
          </h2>
          <p class="an-lead-dark">{{ t.actividades.lead }}</p>
        </div>
        <div class="an-filter-row an-reveal">
          <button
            v-for="f in filters" :key="f.key"
            class="an-filter-btn"
            :class="{ active: activeFilter === f.key }"
            @click="activeFilter = f.key"
          >{{ f.label }}</button>
        </div>
      </div>

      <div class="an-act-grid-wrap an-reveal">
        <TransitionGroup name="act" tag="div" class="an-act-grid">
          <div v-for="act in filteredActivities" :key="act.name" class="an-act-card">
            <div class="an-act-icon">{{ act.icon }}</div>
            <div class="an-act-cat">{{ act.catLabel }}</div>
            <div class="an-act-name">{{ act.name }}</div>
          </div>
        </TransitionGroup>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const sectionRef = ref(null)
const { t } = useI18n()

const activities = computed(() => t.value.actividades.items)
const filters    = computed(() => t.value.actividades.filters)

const activeFilter = ref('all')
const filteredActivities = computed(() =>
  activeFilter.value === 'all'
    ? activities.value
    : activities.value.filter(a => a.cat.includes(activeFilter.value))
)

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
.an-act-header {
  max-width: 1200px; margin: 0 auto 52px; padding: 100px 48px 0;
  display: flex; justify-content: space-between; align-items: flex-end;
  flex-wrap: wrap; gap: 24px;
}
.an-filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.an-filter-btn {
  padding: 8px 18px; border-radius: 999px;
  font-family: var(--f); font-size: 11px; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  border: 1.5px solid rgba(21,63,53,.18); background: transparent;
  color: rgba(21,63,53,.5); cursor: pointer; transition: all .25s;
}
.an-filter-btn.active,
.an-filter-btn:hover { background: var(--p); color: #fff; border-color: var(--p); }

.an-act-grid-wrap { max-width: 1200px; margin: 0 auto; padding: 0 48px 100px; }
.an-act-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 3px; }

.an-act-card {
  background: #fff; padding: 28px 22px; position: relative; overflow: hidden;
  transition: background .35s, transform .35s;
}
.an-act-card::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  height: 3px; width: 0; background: var(--acc); transition: width .3s;
}
.an-act-card:hover::after { width: 100%; }
.an-act-card:hover { background: var(--p); transform: translateY(-2px); z-index: 2; }
.an-act-card:hover .an-act-name { color: #fff; }
.an-act-card:hover .an-act-cat  { color: var(--acc); }
.an-act-icon { font-size: 22px; margin-bottom: 14px; }
.an-act-cat {
  font-family: var(--f); font-size: 10px; font-weight: 700;
  letter-spacing: .15em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 6px; transition: color .3s;
}
.an-act-name {
  font-family: var(--f); font-size: 14px; font-weight: 700;
  color: var(--p); line-height: 1.3; transition: color .3s;
}

.act-enter-active, .act-leave-active { transition: opacity .3s, transform .3s; }
.act-enter-from, .act-leave-to       { opacity: 0; transform: scale(.92); }
.act-move                            { transition: transform .3s; }

@media (max-width: 1024px) {
  .an-act-grid      { grid-template-columns: repeat(2,1fr); }
  .an-act-header    { padding-left: 24px; padding-right: 24px; padding-top: 60px; }
  .an-act-grid-wrap { padding-left: 24px; padding-right: 24px; }
}
@media (max-width: 640px) {
  .an-act-grid { grid-template-columns: repeat(2,1fr); }
}
</style>
