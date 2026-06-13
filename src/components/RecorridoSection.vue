<template>
  <section id="recorrido-nuevo" ref="sectionRef" class="an-section an-cream" style="padding:100px 0;">
    <div class="an-texture"
         style="background-image:url('/images/tour/hostal/Panorama1.webp'); opacity:.06; mix-blend-mode:luminosity;">
    </div>
    <div class="an-z an-inner">

      <div class="an-rec-layout">

        <!-- Timeline -->
        <div class="an-reveal">
          <p class="an-tag-dark">{{ t.recorrido.tag }}</p>
          <h2 class="an-heading-dark">
            {{ t.recorrido.heading1 }}<br>{{ t.recorrido.heading2 }}<br><em>{{ t.recorrido.heading3 }}</em>
          </h2>
          <p class="an-lead-dark">{{ t.recorrido.lead }}</p>

          <div class="an-timeline">
            <div v-for="(step, i) in tourTimeline" :key="i" class="an-tl-item">
              <div class="an-tl-left">
                <div class="an-tl-dot">{{ step.dot }}</div>
                <div v-if="i < tourTimeline.length - 1" class="an-tl-line"></div>
              </div>
              <div class="an-tl-body">
                <div class="an-tl-title">{{ step.title }}</div>
                <div class="an-tl-desc">{{ step.desc }}</div>
                <div class="an-tl-time">{{ step.time }}</div>
              </div>
            </div>
          </div>

          <div class="an-gift-box">
            <div class="an-gift-header">
              <span class="an-gift-spin">🎁</span>
              <h3 class="an-gift-h">{{ t.recorrido.gift.title }}</h3>
            </div>
            <div class="an-gift-items">
              <div v-for="item in t.recorrido.gift.items" :key="item" class="an-gift-item">{{ item }}</div>
            </div>
          </div>
        </div>

        <!-- Form wizard -->
        <div class="an-form-wizard an-reveal">
          <template v-if="!formSubmitted">

            <div class="an-form-top">
              <div class="an-step-indicators">
                <div
                  v-for="n in 3" :key="n"
                  class="an-step-ind"
                  :class="{ done: n < currentFormStep, active: n === currentFormStep }"
                ></div>
              </div>
              <span class="an-step-count">{{ t.recorrido.form.stepPre }} {{ currentFormStep }} {{ t.recorrido.form.stepSuf }}</span>
            </div>

            <!-- Paso 1 -->
            <div v-if="currentFormStep === 1" class="an-form-page">
              <div class="an-form-title">{{ t.recorrido.form.step1.title }}</div>
              <p class="an-form-sub">{{ t.recorrido.form.step1.sub }}</p>
              <div class="an-opt-grid">
                <button
                  v-for="opt in intentOptions" :key="opt.label"
                  class="an-opt-btn"
                  :class="{ selected: selectedOption === opt.label }"
                  @click="selectedOption = opt.label"
                >
                  <span class="an-opt-icon">{{ opt.icon }}</span>
                  <div class="an-opt-label">{{ opt.label }}</div>
                  <div class="an-opt-sub">{{ opt.sub }}</div>
                </button>
              </div>
            </div>

            <!-- Paso 2 -->
            <div v-if="currentFormStep === 2" class="an-form-page">
              <div class="an-form-title">{{ t.recorrido.form.step2.title }}</div>
              <p class="an-form-sub">{{ t.recorrido.form.step2.sub }}</p>
              <div class="an-fg2">
                <div class="an-fgroup">
                  <label>{{ t.recorrido.form.fields.nombre }}</label>
                  <input v-model="formData.nombre" type="text" :placeholder="t.recorrido.form.fields.nombre"/>
                </div>
                <div class="an-fgroup">
                  <label>{{ t.recorrido.form.fields.apellido }}</label>
                  <input v-model="formData.apellido" type="text" :placeholder="t.recorrido.form.fields.apellido"/>
                </div>
              </div>
              <div class="an-fgroup">
                <label>{{ t.recorrido.form.fields.whatsapp }}</label>
                <input v-model="formData.whatsapp" type="tel" placeholder="+52 (618) 000-0000"/>
              </div>
              <div class="an-fgroup">
                <label>{{ t.recorrido.form.fields.ciudad }}</label>
                <input v-model="formData.ciudad" type="text" :placeholder="t.recorrido.form.fields.ciudadPh"/>
              </div>
            </div>

            <!-- Paso 3 -->
            <div v-if="currentFormStep === 3" class="an-form-page">
              <div class="an-form-title">{{ t.recorrido.form.step3.title }}</div>
              <p class="an-form-sub">{{ t.recorrido.form.step3.sub }}</p>
              <div class="an-fg2">
                <div class="an-fgroup">
                  <label>{{ t.recorrido.form.fields.fecha }}</label>
                  <input v-model="formData.fecha" type="date"/>
                </div>
                <div class="an-fgroup">
                  <label>{{ t.recorrido.form.fields.grupo }}</label>
                  <select v-model="formData.grupo">
                    <option v-for="opt in t.recorrido.form.grupoOptions" :key="opt">{{ opt }}</option>
                  </select>
                </div>
              </div>
              <div class="an-gift-reminder">{{ t.recorrido.form.step3.reminder }}</div>
            </div>

            <div class="an-form-nav">
              <button v-if="currentFormStep > 1" class="an-btn-prev" @click="prevStep">
                {{ t.recorrido.form.prevBtn }}
              </button>
              <button class="an-btn-next" @click="nextStep">
                {{ currentFormStep === 3 ? t.recorrido.form.confirmBtn : t.recorrido.form.nextBtn }}
              </button>
            </div>
            <p class="an-form-trust">{{ t.recorrido.form.trust }}</p>

          </template>
          <div v-else class="an-form-success">
            <span class="an-success-icon">🌲</span>
            <div class="an-success-title">{{ t.recorrido.success.title }}</div>
            <p class="an-success-sub">{{ t.recorrido.success.sub }}</p>
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

const tourTimeline  = computed(() => t.value.recorrido.timeline)
const intentOptions = computed(() => t.value.recorrido.form.intentOptions)

const currentFormStep = ref(1)
const selectedOption  = ref(null)
const formData        = ref({ nombre: '', apellido: '', whatsapp: '', ciudad: '', fecha: '', grupo: '' })
const formSubmitted   = ref(false)

function nextStep() {
  if (currentFormStep.value < 3) currentFormStep.value++
  else formSubmitted.value = true
}
function prevStep() {
  if (currentFormStep.value > 1) currentFormStep.value--
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
.an-rec-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

/* Timeline */
.an-timeline { display: flex; flex-direction: column; margin-top: 36px; }
.an-tl-item  { display: flex; gap: 20px; padding-bottom: 28px; }
.an-tl-left  { display: flex; flex-direction: column; align-items: center; width: 44px; flex-shrink: 0; }
.an-tl-dot {
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--f); font-size: 15px; font-weight: 700;
  background: var(--p); color: var(--acc);
  border: 2px solid rgba(174,188,130,.28); flex-shrink: 0;
  transition: border-color .3s, box-shadow .3s;
}
.an-tl-item:hover .an-tl-dot { border-color: var(--acc); box-shadow: 0 0 0 6px rgba(174,188,130,.1); }
.an-tl-line  { flex: 1; width: 1px; background: linear-gradient(var(--p),rgba(21,63,53,.12)); margin-top: 4px; }
.an-tl-body  { padding-top: 8px; }
.an-tl-title { font-family: var(--f); font-size: 15px; font-weight: 700; color: var(--p); margin-bottom: 4px; }
.an-tl-desc  { font-family: var(--f); font-size: 13px; color: rgba(21,63,53,.6); line-height: 1.6; }
.an-tl-time  {
  font-family: var(--f); font-size: 11px; font-weight: 700;
  color: var(--acc); margin-top: 4px; letter-spacing: .06em; text-transform: uppercase;
}

/* Gift box */
.an-gift-box    { margin-top: 28px; background: var(--p); border-radius: 14px; padding: 24px; }
.an-gift-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.an-gift-h      { font-family: var(--f); font-size: 16px; font-weight: 700; color: #fff; }
.an-gift-spin   { font-size: 26px; animation: giftFloat 3s ease-in-out infinite; display: inline-block; }
@keyframes giftFloat { 0%,100%{transform:translateY(0) rotate(-5deg);} 50%{transform:translateY(-6px) rotate(5deg);} }
.an-gift-items  { display: flex; flex-direction: column; gap: 10px; }
.an-gift-item   {
  display: flex; align-items: center; gap: 12px; padding: 10px 14px;
  border-radius: 8px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08);
  font-family: var(--f); font-size: 13px; color: rgba(255,255,255,.7);
  transition: all .25s;
}
.an-gift-item::before { content: '🎁'; font-size: 14px; }
.an-gift-item:hover   { background: rgba(255,255,255,.1); color: #fff; }

/* Form wizard */
.an-form-wizard { background: var(--p); border-radius: 20px; overflow: hidden; }
.an-form-top {
  padding: 22px 28px; border-bottom: 1px solid rgba(255,255,255,.08);
  display: flex; align-items: center; gap: 12px;
}
.an-step-indicators { display: flex; gap: 6px; flex: 1; }
.an-step-ind { height: 3px; flex: 1; border-radius: 999px; background: rgba(255,255,255,.12); transition: background .3s; }
.an-step-ind.done   { background: var(--acc); }
.an-step-ind.active { background: rgba(174,188,130,.55); }
.an-step-count { font-family: var(--f); font-size: 12px; color: var(--mu); white-space: nowrap; }

.an-form-page  { padding: 26px 28px 0; }
.an-form-title { font-family: var(--f); font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 5px; }
.an-form-sub   { font-family: var(--f); font-size: 13px; color: var(--mu); margin-bottom: 20px; }

.an-fgroup { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.an-fgroup label {
  font-family: var(--f); font-size: 11px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4);
}
.an-fgroup input,
.an-fgroup select {
  background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.1);
  border-radius: 8px; padding: 12px 14px;
  font-family: var(--f); font-size: 14px; color: #fff;
  outline: none; transition: border-color .2s, background .2s;
}
.an-fgroup input::placeholder { color: rgba(255,255,255,.3); }
.an-fgroup input:focus,
.an-fgroup select:focus { border-color: var(--acc); background: rgba(255,255,255,.1); }
.an-fgroup select option { background: #0e1a15; color: #fff; }

.an-fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.an-opt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
.an-opt-btn  {
  padding: 14px 12px; border-radius: 10px; text-align: center;
  border: 1.5px solid rgba(255,255,255,.12); background: transparent; cursor: pointer;
  font-family: var(--f); transition: all .25s;
}
.an-opt-btn:hover    { border-color: rgba(174,188,130,.5); background: rgba(174,188,130,.08); }
.an-opt-btn.selected { border-color: var(--acc); background: rgba(174,188,130,.12); }
.an-opt-icon  { font-size: 24px; display: block; margin-bottom: 8px; }
.an-opt-label { font-family: var(--f); font-size: 12px; font-weight: 700; color: #fff; }
.an-opt-sub   { font-family: var(--f); font-size: 11px; color: var(--mu); margin-top: 3px; }

.an-gift-reminder {
  background: rgba(174,188,130,.1); border: 1px solid rgba(174,188,130,.25);
  border-radius: 8px; padding: 14px; margin-top: 4px;
  font-family: var(--f); font-size: 12px; color: rgba(255,255,255,.7); line-height: 1.6;
}
.an-gift-reminder :deep(strong) { color: var(--acc); }

.an-form-nav {
  display: flex; gap: 12px; padding: 20px 28px;
  justify-content: space-between; align-items: center;
}
.an-btn-prev {
  background: transparent; border: 1px solid rgba(255,255,255,.15); color: var(--mu);
  padding: 12px 22px; border-radius: 999px;
  font-family: var(--f); font-size: 12px; font-weight: 700; cursor: pointer;
  transition: all .2s;
}
.an-btn-prev:hover { border-color: var(--acc); color: var(--acc); }
.an-btn-next {
  flex: 1; background: var(--acc); color: var(--p);
  padding: 14px; border-radius: 999px; border: none;
  font-family: var(--f); font-size: 12px; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
  transition: background .2s;
}
.an-btn-next:hover { background: var(--acc2); }
.an-form-trust {
  font-family: var(--f); font-size: 11px; color: rgba(255,255,255,.3);
  text-align: center; padding: 0 28px 20px; line-height: 1.6;
}

.an-form-success { padding: 48px 28px; text-align: center; }
.an-success-icon  { font-size: 52px; margin-bottom: 14px; display: block; animation: bounceIn .6s; }
@keyframes bounceIn { from{transform:scale(0);} 60%{transform:scale(1.2);} to{transform:scale(1);} }
.an-success-title { font-family: var(--f); font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.an-success-sub   { font-family: var(--f); font-size: 14px; color: var(--mu); line-height: 1.7; }

@media (max-width: 1024px) {
  .an-rec-layout { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .an-fg2 { grid-template-columns: 1fr; }
}
</style>
