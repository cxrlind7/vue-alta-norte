<template>
  <div class="an-root">

    <!-- ══ ACTIVIDADES ══ -->
    <section id="actividades" class="an-section an-cream">
      <div class="an-texture"
           style="background-image:url('/images/tour/palapa/Panorama5.webp');">
      </div>
      <div class="an-z">

        <div class="an-act-header">
          <div class="an-reveal">
            <p class="an-tag-dark">Lo que puedes hacer</p>
            <h2 class="an-heading-dark">
              Aventura, naturaleza<br>y <em>descanso total.</em>
            </h2>
            <p class="an-lead-dark">
              16 actividades diseñadas para el disfrute en cada estación del año.
            </p>
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


    <!-- ══ CÓMO LLEGAR ══ -->
    <section id="llegar" class="an-section an-dark">
      <div class="an-texture"
           style="background-image:url('/images/tour/ski/Panorama7_000.webp'); opacity:.09;">
      </div>
      <div class="an-z">

        <div class="an-llegar-layout">

          <div class="an-llegar-left an-reveal">
            <p class="an-tag-light">Ubicación</p>
            <h2 class="an-heading-light">
              Llegar es<br><em>más fácil</em><br>de lo que crees.
            </h2>
            <p class="an-lead-light">
              Sierra Madre Occidental, Durango. A horas de las principales ciudades
              — y a un vuelo de EE.UU.
            </p>

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
              <p class="an-accordion-label">Paso a paso</p>
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

          <!-- Map -->
          <div class="an-llegar-right an-reveal">
            <div class="an-map-wrap">
              <svg viewBox="0 0 400 500" width="100%" style="display:block; max-height:460px;">
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#aebc82" stop-opacity=".18"/>
                    <stop offset="100%" stop-color="transparent"/>
                  </radialGradient>
                </defs>
                <rect width="400" height="500" fill="#0e1a15" rx="12"/>
                <ellipse cx="200" cy="260" rx="175" ry="175" fill="url(#mapGlow)"/>
                <polygon points="0,370 80,230 160,310 240,190 320,270 400,210 400,500 0,500" fill="#1a2e28" opacity=".9"/>
                <polygon points="0,400 60,290 130,345 200,235 280,305 360,258 400,285 400,500 0,500" fill="#122518" opacity=".95"/>
                <!-- Route path -->
                <path
                  d="M200,458 C200,418 180,378 160,338 C140,298 130,258 150,218 C170,178 190,160 200,122"
                  fill="none" stroke="#aebc82" stroke-width="2.5" stroke-dasharray="10 5"
                  class="an-route-line" :class="{ draw: routeDrawn }" opacity=".85"
                />
                <!-- Durango -->
                <g>
                  <circle cx="200" cy="458" r="9" fill="#aebc82"/>
                  <circle cx="200" cy="458" r="18" fill="#aebc82" opacity=".12" class="an-pin-pulse"/>
                  <text x="218" y="463" fill="#aebc82" font-size="11" font-family="sans-serif" font-weight="700">DURANGO</text>
                </g>
                <!-- Mazatlán -->
                <g>
                  <circle cx="48" cy="308" r="5" fill="rgba(255,255,255,.5)"/>
                  <text x="58" y="312" fill="rgba(255,255,255,.5)" font-size="9" font-family="sans-serif">MAZATLÁN</text>
                </g>
                <!-- Monterrey -->
                <g>
                  <circle cx="356" cy="188" r="5" fill="rgba(255,255,255,.4)"/>
                  <text x="304" y="176" fill="rgba(255,255,255,.4)" font-size="9" font-family="sans-serif">MONTERREY</text>
                </g>
                <!-- Alta Norte -->
                <g>
                  <circle cx="200" cy="122" r="18" fill="#153f35"/>
                  <circle cx="200" cy="122" r="26" fill="#aebc82" opacity=".15" class="an-pin-pulse"/>
                  <circle cx="200" cy="122" r="8"  fill="#aebc82"/>
                  <text x="200" y="96"  fill="white" font-size="11" font-family="sans-serif" font-weight="700" text-anchor="middle">ALTA NORTE</text>
                  <text x="200" y="108" fill="rgba(255,255,255,.6)" font-size="8.5" font-family="sans-serif" text-anchor="middle">2,400 msnm</text>
                </g>
                <text x="200" y="32" fill="rgba(255,255,255,.28)" font-size="9" font-family="sans-serif" text-anchor="middle">✈ Houston · Dallas · Phoenix → DGO</text>
              </svg>
            </div>
            <div class="an-map-actions">
              <a
                href="https://maps.google.com/maps?q=Durango+Mexico"
                target="_blank" rel="noopener noreferrer"
                class="an-btn-gold"
              >Google Maps →</a>
              <button class="an-btn-ghost" @click="scrollTo('#recorrido-nuevo')">
                Agendar visita
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ══ CLIMA ══ -->
    <section id="clima" class="an-section an-cream" style="padding:100px 0;">
      <div class="an-texture"
           style="background-image:url('/images/bg_sierra.jpg'); opacity:.06; mix-blend-mode:luminosity;">
      </div>
      <div class="an-z an-inner">

        <div class="an-reveal">
          <p class="an-tag-dark">Antes de venir</p>
          <h2 class="an-heading-dark">Clima y lo que<br>debes <em>traer.</em></h2>
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


    <!-- ══ EVENTOS ══ -->
    <section id="eventos" class="an-section an-dark">
      <div class="an-z">

        <div class="an-inner" style="padding-top:100px; padding-bottom:56px;">
          <div class="an-reveal">
            <p class="an-tag-light">Eventos sociales</p>
            <h2 class="an-heading-light">
              El escenario perfecto<br>para lo que <em>importa.</em>
            </h2>
            <p class="an-lead-light">
              La Casa Club y el entorno natural de Alta Norte son el marco único
              para los eventos más especiales.
            </p>
          </div>
        </div>

        <div class="an-eventos-strip">
          <div v-for="ev in events" :key="ev.tag" class="an-ev-card an-reveal">
            <!-- Photo layer -->
            <div class="an-ev-photo" :style="{ backgroundImage: `url('${ev.image}')` }"></div>
            <!-- Gradient overlay -->
            <div class="an-ev-overlay"></div>
            <!-- Text content -->
            <div class="an-ev-content">
              <div class="an-ev-tag-label">{{ ev.tag }}</div>
              <h3 class="an-ev-title">{{ ev.title }}</h3>
              <p class="an-ev-desc">{{ ev.desc }}</p>
              <ul class="an-ev-features">
                <li v-for="f in ev.features" :key="f">{{ f }}</li>
              </ul>
              <button class="an-ev-cta" @click="scrollTo('#recorrido-nuevo')">
                {{ ev.cta }} →
              </button>
            </div>
            <div class="an-ev-line"></div>
          </div>
        </div>

        <div class="an-inner" style="padding-top:32px; padding-bottom:100px;">
          <div class="an-eventos-banner an-reveal">
            <div style="flex:1; min-width:260px;">
              <p class="an-tag-light" style="margin-bottom:8px;">Empresas y universidades</p>
              <h3 class="an-eventos-banner-title">
                ¿Buscas el escenario ideal para tu reunión de alto nivel?
              </h3>
              <p class="an-eventos-banner-sub">
                La Sierra Madre como fondo de tus decisiones más importantes.
              </p>
            </div>
            <button class="an-btn-gold" @click="scrollTo('#recorrido-nuevo')">
              Hablar con un asesor →
            </button>
          </div>
        </div>

      </div>
    </section>


    <!-- ══ RECORRIDO ══ -->
    <section id="recorrido-nuevo" class="an-section an-cream" style="padding:100px 0;">
      <div class="an-texture"
           style="background-image:url('/images/tour/hostal/Panorama1.webp'); opacity:.06; mix-blend-mode:luminosity;">
      </div>
      <div class="an-z an-inner">

        <div class="an-rec-layout">

          <!-- Timeline -->
          <div class="an-reveal">
            <p class="an-tag-dark">Sin costo · Sin compromiso</p>
            <h2 class="an-heading-dark">
              Agenda tu recorrido<br>y llévate un<br><em>regalo sorpresa.</em>
            </h2>
            <p class="an-lead-dark">
              Visita Alta Norte sin costo. Comida incluida + regalo sorpresa al finalizar.
            </p>

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
                <h3 class="an-gift-h">¿Qué es el regalo sorpresa?</h3>
              </div>
              <div class="an-gift-items">
                <div class="an-gift-item">Productos artesanales de la Sierra Madre</div>
                <div class="an-gift-item">Una experiencia gastronómica exclusiva</div>
                <div class="an-gift-item">Un recuerdo que no encontrarás en otro lugar</div>
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
                <span class="an-step-count">Paso {{ currentFormStep }} de 3</span>
              </div>

              <!-- Paso 1: intención -->
              <div v-if="currentFormStep === 1" class="an-form-page">
                <div class="an-form-title">¿Para qué te interesa?</div>
                <p class="an-form-sub">Cuéntanos qué te trajo aquí.</p>
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

              <!-- Paso 2: contacto -->
              <div v-if="currentFormStep === 2" class="an-form-page">
                <div class="an-form-title">Tus datos de contacto</div>
                <p class="an-form-sub">Tu asesor confirma en menos de 24 hrs.</p>
                <div class="an-fg2">
                  <div class="an-fgroup">
                    <label>Nombre</label>
                    <input v-model="formData.nombre" type="text" placeholder="Tu nombre"/>
                  </div>
                  <div class="an-fgroup">
                    <label>Apellido</label>
                    <input v-model="formData.apellido" type="text" placeholder="Tu apellido"/>
                  </div>
                </div>
                <div class="an-fgroup">
                  <label>WhatsApp</label>
                  <input v-model="formData.whatsapp" type="tel" placeholder="+52 (618) 000-0000"/>
                </div>
                <div class="an-fgroup">
                  <label>Ciudad actual</label>
                  <input v-model="formData.ciudad" type="text" placeholder="Ej: Houston TX / Monterrey NL"/>
                </div>
              </div>

              <!-- Paso 3: fecha -->
              <div v-if="currentFormStep === 3" class="an-form-page">
                <div class="an-form-title">Elige fecha y grupo</div>
                <p class="an-form-sub">¿Cuándo y cuántos van?</p>
                <div class="an-fg2">
                  <div class="an-fgroup">
                    <label>Fecha preferida</label>
                    <input v-model="formData.fecha" type="date"/>
                  </div>
                  <div class="an-fgroup">
                    <label>¿Cuántos van?</label>
                    <select v-model="formData.grupo">
                      <option>Solo yo</option>
                      <option>Yo + 1 acompañante</option>
                      <option>Familia (3–4)</option>
                      <option>Grupo (5+)</option>
                    </select>
                  </div>
                </div>
                <div class="an-gift-reminder">
                  🎁 <strong>Recuerda:</strong> Regalo sorpresa + comida incluida al finalizar.
                </div>
              </div>

              <div class="an-form-nav">
                <button v-if="currentFormStep > 1" class="an-btn-prev" @click="prevStep">
                  ← Atrás
                </button>
                <button class="an-btn-next" @click="nextStep">
                  {{ currentFormStep === 3 ? 'Confirmar recorrido →' : 'Siguiente →' }}
                </button>
              </div>
              <p class="an-form-trust">Sin spam · Sin compromiso · Respuesta en menos de 24 hrs</p>

            </template>
            <div v-else class="an-form-success">
              <span class="an-success-icon">🌲</span>
              <div class="an-success-title">¡Recorrido agendado!</div>
              <p class="an-success-sub">
                Tu asesor te contacta en menos de 24 hrs. ¡Te espera tu regalo sorpresa!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ══ INFO PRÁCTICA ══ -->
    <section id="info-practica" class="an-section an-dark" style="padding:100px 0;">
      <div class="an-texture"
           style="background-image:url('/images/tour/stand%20de%20tiro/Panorama8_000.webp'); opacity:.09;">
      </div>
      <div class="an-z an-inner">

        <div class="an-reveal">
          <p class="an-tag-light">Info práctica</p>
          <h2 class="an-heading-light">Lo que necesitas saber<br><em>antes de llegar.</em></h2>
          <p class="an-lead-light" style="margin-bottom:52px;">
            Pasa el cursor sobre cada tarjeta para ver el detalle.
          </p>
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

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

// ─── Scroll util ──────────────────────────────────────────────────────────────
function scrollTo(target) {
  const el = document.querySelector(target)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

// ─── Actividades ──────────────────────────────────────────────────────────────
const activities = [
  { icon: '⛷️',  cat: ['invierno','aventura'],   catLabel:'Invierno',    name:'Ski & Snowboard' },
  { icon: '🏔️', cat: ['aventura','naturaleza'], catLabel:'Aventura',    name:'Senderismo de montaña' },
  { icon: '🎣',  cat: ['naturaleza','relax'],    catLabel:'Naturaleza',  name:'Pesca deportiva' },
  { icon: '🚴',  cat: ['aventura'],              catLabel:'Aventura',    name:'Ciclismo de montaña' },
  { icon: '🏕️', cat: ['naturaleza','relax'],    catLabel:'Naturaleza',  name:'Glamping & Camping' },
  { icon: '🔭',  cat: ['naturaleza','relax'],    catLabel:'Naturaleza',  name:'Observatorio astronómico' },
  { icon: '🐦',  cat: ['naturaleza'],            catLabel:'Naturaleza',  name:'Observación de aves' },
  { icon: '🎯',  cat: ['aventura'],              catLabel:'Aventura',    name:'Campo de tiro' },
  { icon: '🏓',  cat: ['aventura','relax'],      catLabel:'Deporte',     name:'Canchas deportivas' },
  { icon: '🔥',  cat: ['relax','naturaleza'],    catLabel:'Relax',       name:'Fogatero nocturno' },
  { icon: '🧘',  cat: ['relax'],                 catLabel:'Relax',       name:'Yoga en la naturaleza' },
  { icon: '🍽️', cat: ['relax'],                 catLabel:'Relax',       name:'Restaurante sierra' },
  { icon: '🏊',  cat: ['relax'],                 catLabel:'Relax',       name:'Alberca panorámica' },
  { icon: '🌿',  cat: ['naturaleza','relax'],    catLabel:'Naturaleza',  name:'Trail running' },
  { icon: '🎿',  cat: ['invierno','aventura'],   catLabel:'Invierno',    name:'Clases de esquí' },
  { icon: '🎪',  cat: ['aventura','naturaleza'], catLabel:'Familia',     name:'Áreas familiares' },
]
const filters = [
  { key:'all',         label:'Todas' },
  { key:'aventura',    label:'Aventura' },
  { key:'naturaleza',  label:'Naturaleza' },
  { key:'relax',       label:'Relax' },
  { key:'invierno',    label:'Invierno' },
]
const activeFilter = ref('all')
const filteredActivities = computed(() =>
  activeFilter.value === 'all'
    ? activities
    : activities.filter(a => a.cat.includes(activeFilter.value))
)

// ─── Llegar ───────────────────────────────────────────────────────────────────
const routes = [
  { key:'durango',   emoji:'🚗', from:'Desde Durango',   time:'50 min',        detail:'MEX-40 · Acceso pavimentado' },
  { key:'mazatlan',  emoji:'🚗', from:'Desde Mazatlán',  time:'2:45 hrs',      detail:'Autopista del Sol · Ruta escénica' },
  { key:'usa',       emoji:'✈️', from:'Desde EE.UU.',    time:'Vuelo + 2 hrs', detail:'Houston · Dallas · Phoenix → DGO' },
  { key:'monterrey', emoji:'🚗', from:'Desde Monterrey', time:'5 hrs',         detail:'Carretera federal' },
]
const steps = [
  { title:'Sal de Durango rumbo al sur',    body:'Toma MEX-40. Son solo <strong>50 minutos</strong> con acceso pavimentado.' },
  { title:'Toma la desviación señalizada',  body:'Señalética de <strong>Alta Norte</strong> visible desde la carretera a la derecha.' },
  { title:'Llega a la caseta principal',    body:'8 km más. <strong>Avísanos antes de salir</strong> por WhatsApp para que el guardia te espere.' },
]
const activeRoute = ref('durango')
const openStep    = ref(0)
const routeDrawn  = ref(false)

function setRoute(key) { activeRoute.value = key }
function toggleStep(i) { openStep.value = openStep.value === i ? -1 : i }

watch(activeRoute, () => {
  routeDrawn.value = false
  nextTick(() => { routeDrawn.value = true })
})

// ─── Clima ────────────────────────────────────────────────────────────────────
const seasonList = [
  { key:'primavera', emoji:'🌸', label:'Primavera' },
  { key:'verano',    emoji:'🌿', label:'Verano' },
  { key:'otono',     emoji:'🍂', label:'Otoño' },
  { key:'invierno',  emoji:'❄️', label:'Invierno' },
]
const seasonData = {
  primavera: {
    temp:'16°C', range:'5°C — 20°C · Mar – May',
    desc:'Días templados perfectos para senderismo. El bosque en su momento más verde.',
    tags:['🌸 Floración','🚴 Ciclismo','☀️ Soleado'],
    gear:[
      { emoji:'🧥', title:'Chamarra ligera',   desc:'Noches a 5°C. Impermeable ligera recomendada.' },
      { emoji:'🧴', title:'Protector SPF 50+', desc:'A 2,400 msnm la radiación es muy intensa.' },
    ],
  },
  verano: {
    temp:'18°C', range:'8°C — 22°C · Jun – Ago',
    desc:'Lluvias vespertinas. El verde de la sierra en su máximo esplendor.',
    tags:['🌧️ Lluvias','🌿 Verde máximo','🌈 Atardeceres'],
    gear:[
      { emoji:'☂️', title:'Impermeable o poncho', desc:'Lluvias cortas pero intensas por las tardes.' },
      { emoji:'👟', title:'Botas impermeables',   desc:'Los senderos se mojan rápido.' },
    ],
  },
  otono: {
    temp:'12°C', range:'2°C — 18°C · Sep – Nov',
    desc:'Colores espectaculares en el bosque. Noches con cielos estrellados únicos.',
    tags:['🍂 Colores','⭐ Estrellas','🔥 Fogatas'],
    gear:[
      { emoji:'🧣', title:'Capas de abrigo',    desc:'Térmica base + suéter + chamarra exterior.' },
      { emoji:'📷', title:'Cámara fotográfica', desc:'La mejor temporada para fotografía en la sierra.' },
    ],
  },
  invierno: {
    temp:'-2°C', range:'-8°C — 10°C · Dic – Feb',
    desc:'Temporada de ski. La única pista de la región se activa con nieve real.',
    tags:['❄️ Nieve','⛷️ Pistas activas','🏔️ Vista nevada'],
    gear:[
      { emoji:'🧥', title:'Ropa térmica completa', desc:'Camiseta, pantalón y calcetines térmicos.' },
      { emoji:'🎿', title:'Equipo de ski',         desc:'Trae el tuyo o renta en las instalaciones.' },
    ],
  },
}
const activeSeason  = ref('primavera')
const currentSeason = computed(() => seasonData[activeSeason.value])

// ─── Eventos ──────────────────────────────────────────────────────────────────
const events = [
  {
    tag:'Bodas',
    image:'/images/tour/salon/Panorama4.webp',
    title:'Bodas y celebraciones privadas',
    desc:'El bosque como fondo de tu boda. Sin salones genéricos.',
    features:['Cualquier capacidad','Coordinación completa','Gastronomía de montaña','Alojamiento incluido'],
    cta:'Consultar disponibilidad',
  },
  {
    tag:'Social',
    image:'/images/tour/palapa/Panorama5.webp',
    title:'XV años y reuniones familiares',
    desc:'La sierra y las estrellas como decoración incomparable.',
    features:['Palapas y espacios techados','Área de fogata privada','Actividades para todas las edades','Seguridad privada'],
    cta:'Solicitar información',
  },
  {
    tag:'Empresarial',
    image:'/images/tour/hostal/Panorama2.webp',
    title:'Retiros y team building',
    desc:'Sin distracciones urbanas. Máxima creatividad.',
    features:['Sala de reuniones equipada','Team building a la medida','Hospedaje para el equipo','Cero distracciones'],
    cta:'Planear mi retiro',
  },
]

// ─── Recorrido timeline ───────────────────────────────────────────────────────
const tourTimeline = [
  { dot:'1',  title:'Bienvenida en caseta principal', desc:'Tu asesor te recibe y entrega kit de bienvenida.',      time:'~15 min' },
  { dot:'2',  title:'Tour de lotes en 4×4',           desc:'Recorre los lotes disponibles con sus vistas.',         time:'~45 min' },
  { dot:'3',  title:'Recorrido de amenidades',         desc:'Ski resort, lago, Casa Club, senderos y observatorio.', time:'~30 min' },
  { dot:'4',  title:'Comida en Casa Club',             desc:'Almuerzo incluido para ti y tu acompañante.',          time:'~60 min · Gratis' },
  { dot:'🎁', title:'Tu regalo sorpresa',             desc:'Algo especial de la Sierra Madre. Vale el viaje.',     time:'Al concluir' },
]

// ─── Form wizard ──────────────────────────────────────────────────────────────
const intentOptions = [
  { icon:'🏡', label:'Comprar un lote', sub:'Para construir' },
  { icon:'🏖️', label:'Casa de descanso', sub:'Fin de semana' },
  { icon:'📈', label:'Inversión',         sub:'Plusvalía' },
  { icon:'👀', label:'Solo conocer',      sub:'Sin compromiso' },
]
const currentFormStep = ref(1)
const selectedOption  = ref(null)
const formData = ref({ nombre:'', apellido:'', whatsapp:'', ciudad:'', fecha:'', grupo:'Solo yo' })
const formSubmitted = ref(false)

function nextStep() {
  if (currentFormStep.value < 3) currentFormStep.value++
  else formSubmitted.value = true
}
function prevStep() {
  if (currentFormStep.value > 1) currentFormStep.value--
}

// ─── Info flip cards ─────────────────────────────────────────────────────────
const infoCards = [
  { icon:'📡', title:'Conectividad', backTitle:'Sin señal, con WiFi',
    backText:'WiFi de alta velocidad en todas las áreas. WhatsApp y videollamadas sin problema.',
    chips:['WiFi ✓','Sin 4G'] },
  { icon:'💳', title:'Pagos', backTitle:'Efectivo + tarjeta',
    backText:'Visa, Mastercard, Amex. USD y MXN en efectivo. Transferencia para lotes.',
    chips:['Visa ✓','USD/MXN'] },
  { icon:'🌡️', title:'Altitud', backTitle:'2,400 msnm',
    backText:'Posible mareo el 1er día. Hidratarse bien y descansar las primeras horas.',
    chips:['Hidrátate','Descanso'] },
  { icon:'🏥', title:'Emergencias', backTitle:'24/7',
    backText:'Primeros auxilios en sitio. Hospital a 30 min. Durango a 50 min.',
    chips:['30 min hosp.','24/7'] },
]

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await nextTick()

  // Draw map route after mount
  setTimeout(() => { routeDrawn.value = true }, 700)

  // Animate .an-reveal elements (independent of App.vue's observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('an-in')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.06 })

  document.querySelectorAll('.an-root .an-reveal').forEach(el => {
    const rect = el.getBoundingClientRect()
    // Already (partially) visible → show immediately
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('an-in')
    } else {
      observer.observe(el)
    }
  })
})
</script>

<style scoped>
/* ══ Tokens ══ */
.an-root {
  --p:   #153f35;
  --p2:  #0e1a15;
  --p3:  #1a2e28;
  --acc: #aebc82;
  --acc2:#c4cba0;
  --cr:  #f0ede6;
  --mu:  rgba(255,255,255,.56);
  --mu2: rgba(255,255,255,.26);
  --f:   'Amble', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ══ Section shell ══ */
.an-section { position: relative; overflow: hidden; }
.an-cream   { background: var(--cr); }
.an-dark    { background: var(--p2); }

/* Background texture — always behind .an-z */
.an-texture {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  opacity: 0.08;
  pointer-events: none;
  /* z-index is implicitly 0 for position:static, but we keep texture
     behind the stacking context created by .an-z (position:relative) */
}

/* Content wrapper — creates stacking context above .an-texture */
.an-z {
  position: relative;
  z-index: 1;
}

/* ══ Scroll-reveal ══ */
.an-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .75s cubic-bezier(.25,.46,.45,.94),
              transform .75s cubic-bezier(.25,.46,.45,.94);
}
.an-reveal.an-in {
  opacity: 1;
  transform: translateY(0);
}

/* ══ Typography ══ */
.an-tag-dark {
  font-family: var(--f); font-size: 10px; font-weight: 700;
  letter-spacing: .28em; text-transform: uppercase;
  color: var(--p); margin-bottom: 14px; display: block;
}
.an-tag-light {
  font-family: var(--f); font-size: 10px; font-weight: 700;
  letter-spacing: .28em; text-transform: uppercase;
  color: var(--acc); margin-bottom: 14px; display: block;
}
.an-heading-dark {
  font-family: var(--f); font-size: clamp(36px,5vw,60px); font-weight: 700;
  color: var(--p); line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 16px;
}
.an-heading-dark em { color: var(--acc); font-style: italic; }
.an-heading-light {
  font-family: var(--f); font-size: clamp(36px,5vw,60px); font-weight: 700;
  color: #fff; line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 16px;
}
.an-heading-light em { color: var(--acc); font-style: italic; }
.an-lead-dark  { font-family:var(--f); font-size:16px; color:rgba(21,63,53,.65); line-height:1.75; max-width:520px; }
.an-lead-light { font-family:var(--f); font-size:16px; color:var(--mu); line-height:1.75; max-width:520px; }

/* ══ Layout helpers ══ */
.an-inner { max-width:1200px; margin:0 auto; padding:0 48px; }

/* ══ Buttons ══ */
.an-btn-gold {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 28px; border-radius:999px;
  background:var(--acc); color:var(--p);
  font-family:var(--f); font-size:12px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  border:none; text-decoration:none; cursor:pointer;
  transition:background .25s, transform .25s;
}
.an-btn-gold:hover { background:var(--acc2); transform:translateY(-2px); color:var(--p); }
.an-btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 28px; border-radius:999px;
  background:transparent; color:#fff;
  font-family:var(--f); font-size:12px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  border:1.5px solid rgba(255,255,255,.28); cursor:pointer;
  transition:border-color .25s, color .25s;
}
.an-btn-ghost:hover { border-color:var(--acc); color:var(--acc); }

/* ══ ACTIVIDADES ══ */
.an-act-header {
  max-width:1200px; margin:0 auto 52px; padding:0 48px;
  display:flex; justify-content:space-between; align-items:flex-end;
  flex-wrap:wrap; gap:24px;
  padding-top:100px;
}
.an-filter-row { display:flex; gap:8px; flex-wrap:wrap; }
.an-filter-btn {
  padding:8px 18px; border-radius:999px;
  font-family:var(--f); font-size:11px; font-weight:700;
  letter-spacing:.06em; text-transform:uppercase;
  border:1.5px solid rgba(21,63,53,.18); background:transparent;
  color:rgba(21,63,53,.5); cursor:pointer; transition:all .25s;
}
.an-filter-btn.active,
.an-filter-btn:hover { background:var(--p); color:#fff; border-color:var(--p); }

.an-act-grid-wrap {
  max-width:1200px; margin:0 auto; padding:0 48px 100px;
}
.an-act-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:3px; }

.an-act-card {
  background:#fff; padding:28px 22px; position:relative; overflow:hidden;
  transition:background .35s, transform .35s;
}
.an-act-card::after {
  content:''; position:absolute; bottom:0; left:0;
  height:3px; width:0; background:var(--acc); transition:width .3s;
}
.an-act-card:hover::after { width:100%; }
.an-act-card:hover { background:var(--p); transform:translateY(-2px); z-index:2; }
.an-act-card:hover .an-act-name { color:#fff; }
.an-act-card:hover .an-act-cat  { color:var(--acc); }
.an-act-icon { font-size:22px; margin-bottom:14px; }
.an-act-cat  {
  font-family:var(--f); font-size:10px; font-weight:700;
  letter-spacing:.15em; text-transform:uppercase;
  color:var(--acc); margin-bottom:6px; transition:color .3s;
}
.an-act-name {
  font-family:var(--f); font-size:14px; font-weight:700;
  color:var(--p); line-height:1.3; transition:color .3s;
}

/* Card TransitionGroup */
.act-enter-active, .act-leave-active { transition:opacity .3s, transform .3s; }
.act-enter-from, .act-leave-to       { opacity:0; transform:scale(.92); }
.act-move                            { transition:transform .3s; }

/* ══ LLEGAR ══ */
.an-llegar-layout {
  display:grid; grid-template-columns:1fr 1.15fr; align-items:stretch;
}
.an-llegar-left  { padding:80px 52px; }
.an-llegar-right {
  background:rgba(10,18,12,.55);
  border-left:1px solid rgba(255,255,255,.06);
  min-height:560px;
  display:flex; flex-direction:column;
}
.an-map-wrap     { flex:1; padding:40px 40px 16px; }
.an-map-actions  { padding:0 40px 40px; display:flex; gap:12px; flex-wrap:wrap; }

.an-route-line { stroke-dasharray:620; stroke-dashoffset:620; transition:stroke-dashoffset 1.5s ease; }
.an-route-line.draw { stroke-dashoffset:0; }
.an-pin-pulse { animation:pinPulse 2.2s ease-in-out infinite; }
@keyframes pinPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.4;transform:scale(1.6);} }

.an-routes { display:flex; flex-direction:column; gap:4px; margin-top:32px; }
.an-route  {
  padding:14px 16px; border-radius:10px;
  border:1px solid rgba(255,255,255,.08);
  display:flex; gap:14px; align-items:center;
  background:transparent; width:100%; text-align:left; cursor:pointer;
  font-family:var(--f); transition:all .3s;
}
.an-route:hover,
.an-route.active { background:rgba(255,255,255,.06); border-color:rgba(174,188,130,.38); }
.an-route-emoji  { font-size:20px; flex-shrink:0; }
.an-route-info   { flex:1; }
.an-route-from   { font-family:var(--f); font-size:13px; font-weight:700; color:#fff; }
.an-route-time   { font-family:var(--f); font-size:21px; font-weight:900; color:var(--acc); line-height:1; }
.an-route-detail { font-family:var(--f); font-size:12px; color:var(--mu); margin-top:3px; }
.an-route-chevron { font-size:18px; color:var(--mu2); transition:color .2s, transform .2s; }
.an-route:hover .an-route-chevron,
.an-route.active .an-route-chevron { color:var(--acc); transform:translateX(4px); }

.an-accordion       { margin-top:28px; }
.an-accordion-label {
  font-family:var(--f); font-size:10px; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase;
  color:var(--mu2); margin-bottom:10px;
}
.an-step-item   { border-bottom:1px solid rgba(255,255,255,.08); overflow:hidden; }
.an-step-trigger {
  width:100%; display:flex; align-items:center; gap:14px;
  padding:13px 0; background:none; border:none;
  font-family:var(--f); text-align:left; cursor:pointer;
}
.an-step-num {
  width:26px; height:26px; border-radius:50%; flex-shrink:0;
  background:rgba(174,188,130,.12); border:1px solid rgba(174,188,130,.3);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:11px; font-weight:700; color:var(--acc);
}
.an-step-text { font-family:var(--f); font-size:14px; font-weight:600; color:#fff; flex:1; }
.an-step-icon { font-size:18px; color:var(--mu2); transition:transform .3s; }
.an-step-item.open .an-step-icon { transform:rotate(45deg); }
.an-step-body { max-height:0; overflow:hidden; transition:max-height .4s; padding:0 0 0 40px; }
.an-step-item.open .an-step-body { max-height:120px; padding-bottom:12px; }
.an-step-body p { font-family:var(--f); font-size:13px; color:var(--mu); line-height:1.6; }
.an-step-body :deep(strong) { color:#fff; }

/* ══ CLIMA ══ */
.an-season-tabs {
  display:flex; gap:4px; margin:28px 0 44px;
  background:rgba(21,63,53,.1); border-radius:999px;
  padding:4px; width:fit-content;
}
.an-season-tab {
  padding:10px 22px; border-radius:999px;
  font-family:var(--f); font-size:13px; font-weight:700;
  border:none; background:transparent; color:rgba(21,63,53,.5);
  cursor:pointer; transition:all .3s;
}
.an-season-tab.active { background:var(--p); color:#fff; }
.an-season-panel { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
.an-temp-big {
  font-family:var(--f); font-size:84px; font-weight:700;
  color:var(--p); line-height:1; letter-spacing:-.04em; margin-bottom:8px;
}
.an-temp-range { font-family:var(--f); font-size:15px; color:rgba(21,63,53,.5); margin-bottom:18px; }
.an-clima-desc { font-family:var(--f); font-size:15px; color:rgba(21,63,53,.7); line-height:1.75; margin-bottom:24px; }
.an-clima-tags { display:flex; gap:8px; flex-wrap:wrap; }
.an-clima-tag  {
  padding:6px 14px; border-radius:999px;
  font-family:var(--f); font-size:12px; font-weight:700;
  background:rgba(21,63,53,.09); color:var(--p);
}
.an-vest-grid { display:flex; flex-direction:column; gap:12px; }
.an-vest-card {
  background:#fff; border-radius:10px; padding:18px 20px;
  display:flex; gap:14px; align-items:flex-start;
  border:1px solid rgba(21,63,53,.08);
  transition:border-color .25s, transform .25s;
}
.an-vest-card:hover { border-color:var(--acc); transform:translateX(4px); }
.an-vest-emoji { font-size:22px; flex-shrink:0; }
.an-vest-title { font-family:var(--f); font-size:14px; font-weight:700; color:var(--p); margin-bottom:3px; }
.an-vest-desc  { font-family:var(--f); font-size:13px; color:rgba(21,63,53,.55); line-height:1.5; }

.season-fade-enter-active, .season-fade-leave-active { transition:opacity .3s ease, transform .3s ease; }
.season-fade-enter-from, .season-fade-leave-to { opacity:0; transform:translateY(10px); }

/* ══ EVENTOS ══ */
.an-eventos-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
.an-ev-card {
  position:relative; overflow:hidden; min-height:500px; cursor:pointer;
}
/* Real photo layer */
.an-ev-photo {
  position:absolute; inset:0;
  background-size:cover; background-position:center;
  transition:transform .7s ease;
}
.an-ev-card:hover .an-ev-photo { transform:scale(1.06); }
/* Dark gradient on top of photo */
.an-ev-overlay {
  position:absolute; inset:0;
  background:linear-gradient(
    to bottom,
    rgba(10,22,16,.28) 0%,
    rgba(10,22,16,.62) 45%,
    rgba(10,22,16,.90) 100%
  );
  transition:background .4s;
}
.an-ev-card:hover .an-ev-overlay {
  background:linear-gradient(
    to bottom,
    rgba(10,22,16,.35) 0%,
    rgba(10,22,16,.72) 45%,
    rgba(10,22,16,.95) 100%
  );
}
/* Text content above photo + overlay */
.an-ev-content {
  position:relative; z-index:2; padding:44px 36px;
  height:100%; display:flex; flex-direction:column;
}
.an-ev-tag-label {
  font-family:var(--f); font-size:10px; font-weight:700;
  letter-spacing:.18em; text-transform:uppercase;
  color:var(--acc); margin-bottom:14px;
}
.an-ev-title {
  font-family:var(--f); font-size:clamp(20px,2vw,26px);
  font-weight:700; color:#fff; line-height:1.2;
  letter-spacing:-.02em; margin-bottom:14px;
}
.an-ev-desc  {
  font-family:var(--f); font-size:14px; color:var(--mu);
  line-height:1.75; margin-bottom:20px; flex:1;
}
.an-ev-features { list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:24px; }
.an-ev-features li {
  font-family:var(--f); font-size:13px; color:var(--mu);
  display:flex; gap:10px; align-items:center;
  transform:translateX(-10px); opacity:0;
  transition:transform .4s, opacity .4s;
}
.an-ev-features li::before { content:'✓'; color:var(--acc); font-weight:700; flex-shrink:0; }
.an-ev-card:hover .an-ev-features li { transform:translateX(0); opacity:1; }
.an-ev-card:hover .an-ev-features li:nth-child(1){transition-delay:.05s;}
.an-ev-card:hover .an-ev-features li:nth-child(2){transition-delay:.10s;}
.an-ev-card:hover .an-ev-features li:nth-child(3){transition-delay:.15s;}
.an-ev-card:hover .an-ev-features li:nth-child(4){transition-delay:.20s;}
.an-ev-cta {
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--f); font-size:12px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  color:var(--acc); background:none; border:none; cursor:pointer;
  transition:gap .2s; position:relative; z-index:2;
}
.an-ev-cta:hover { gap:14px; }
.an-ev-line {
  position:absolute; bottom:0; left:0; right:0; height:2.5px;
  background:var(--acc); transform:scaleX(0); transform-origin:left;
  transition:transform .4s; z-index:3;
}
.an-ev-card:hover .an-ev-line { transform:scaleX(1); }

.an-eventos-banner {
  background:var(--p3); border-radius:16px; padding:36px 40px;
  display:flex; gap:32px; align-items:center; flex-wrap:wrap;
  border:1px solid rgba(255,255,255,.08);
}
.an-eventos-banner-title {
  font-family:var(--f); font-size:20px; font-weight:700;
  color:#fff; margin-bottom:8px; letter-spacing:-.02em;
}
.an-eventos-banner-sub {
  font-family:var(--f); font-size:14px; color:var(--mu); line-height:1.7;
}

/* ══ RECORRIDO ══ */
.an-rec-layout { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }

.an-timeline { display:flex; flex-direction:column; margin-top:36px; }
.an-tl-item  { display:flex; gap:20px; padding-bottom:28px; }
.an-tl-left  { display:flex; flex-direction:column; align-items:center; width:44px; flex-shrink:0; }
.an-tl-dot {
  width:44px; height:44px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--f); font-size:15px; font-weight:700;
  background:var(--p); color:var(--acc);
  border:2px solid rgba(174,188,130,.28); flex-shrink:0;
  transition:border-color .3s, box-shadow .3s;
}
.an-tl-item:hover .an-tl-dot { border-color:var(--acc); box-shadow:0 0 0 6px rgba(174,188,130,.1); }
.an-tl-line { flex:1; width:1px; background:linear-gradient(var(--p),rgba(21,63,53,.12)); margin-top:4px; }
.an-tl-body  { padding-top:8px; }
.an-tl-title { font-family:var(--f); font-size:15px; font-weight:700; color:var(--p); margin-bottom:4px; }
.an-tl-desc  { font-family:var(--f); font-size:13px; color:rgba(21,63,53,.6); line-height:1.6; }
.an-tl-time  {
  font-family:var(--f); font-size:11px; font-weight:700;
  color:var(--acc); margin-top:4px; letter-spacing:.06em; text-transform:uppercase;
}

.an-gift-box    { margin-top:28px; background:var(--p); border-radius:14px; padding:24px; }
.an-gift-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
.an-gift-h      { font-family:var(--f); font-size:16px; font-weight:700; color:#fff; }
.an-gift-spin   { font-size:26px; animation:giftFloat 3s ease-in-out infinite; display:inline-block; }
@keyframes giftFloat { 0%,100%{transform:translateY(0) rotate(-5deg);} 50%{transform:translateY(-6px) rotate(5deg);} }
.an-gift-items  { display:flex; flex-direction:column; gap:10px; }
.an-gift-item   {
  display:flex; align-items:center; gap:12px; padding:10px 14px;
  border-radius:8px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08);
  font-family:var(--f); font-size:13px; color:rgba(255,255,255,.7);
  transition:all .25s;
}
.an-gift-item::before { content:'🎁'; font-size:14px; }
.an-gift-item:hover   { background:rgba(255,255,255,.1); color:#fff; }

/* Form wizard */
.an-form-wizard { background:var(--p); border-radius:20px; overflow:hidden; }
.an-form-top {
  padding:22px 28px; border-bottom:1px solid rgba(255,255,255,.08);
  display:flex; align-items:center; gap:12px;
}
.an-step-indicators { display:flex; gap:6px; flex:1; }
.an-step-ind { height:3px; flex:1; border-radius:999px; background:rgba(255,255,255,.12); transition:background .3s; }
.an-step-ind.done   { background:var(--acc); }
.an-step-ind.active { background:rgba(174,188,130,.55); }
.an-step-count { font-family:var(--f); font-size:12px; color:var(--mu); white-space:nowrap; }

.an-form-page  { padding:26px 28px 0; }
.an-form-title { font-family:var(--f); font-size:18px; font-weight:700; color:#fff; margin-bottom:5px; }
.an-form-sub   { font-family:var(--f); font-size:13px; color:var(--mu); margin-bottom:20px; }

.an-fgroup     { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
.an-fgroup label {
  font-family:var(--f); font-size:11px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.4);
}
.an-fgroup input,
.an-fgroup select {
  background:rgba(255,255,255,.07); border:1.5px solid rgba(255,255,255,.1);
  border-radius:8px; padding:12px 14px;
  font-family:var(--f); font-size:14px; color:#fff;
  outline:none; transition:border-color .2s, background .2s;
}
.an-fgroup input::placeholder { color:rgba(255,255,255,.3); }
.an-fgroup input:focus,
.an-fgroup select:focus { border-color:var(--acc); background:rgba(255,255,255,.1); }
.an-fgroup select option { background:#0e1a15; color:#fff; }

.an-fg2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

.an-opt-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
.an-opt-btn  {
  padding:14px 12px; border-radius:10px; text-align:center;
  border:1.5px solid rgba(255,255,255,.12); background:transparent; cursor:pointer;
  font-family:var(--f); transition:all .25s;
}
.an-opt-btn:hover    { border-color:rgba(174,188,130,.5); background:rgba(174,188,130,.08); }
.an-opt-btn.selected { border-color:var(--acc); background:rgba(174,188,130,.12); }
.an-opt-icon  { font-size:24px; display:block; margin-bottom:8px; }
.an-opt-label { font-family:var(--f); font-size:12px; font-weight:700; color:#fff; }
.an-opt-sub   { font-family:var(--f); font-size:11px; color:var(--mu); margin-top:3px; }

.an-gift-reminder {
  background:rgba(174,188,130,.1); border:1px solid rgba(174,188,130,.25);
  border-radius:8px; padding:14px; margin-top:4px;
  font-family:var(--f); font-size:12px; color:rgba(255,255,255,.7); line-height:1.6;
}
.an-gift-reminder :deep(strong) { color:var(--acc); }

.an-form-nav {
  display:flex; gap:12px; padding:20px 28px;
  justify-content:space-between; align-items:center;
}
.an-btn-prev {
  background:transparent; border:1px solid rgba(255,255,255,.15); color:var(--mu);
  padding:12px 22px; border-radius:999px;
  font-family:var(--f); font-size:12px; font-weight:700; cursor:pointer;
  transition:all .2s;
}
.an-btn-prev:hover { border-color:var(--acc); color:var(--acc); }
.an-btn-next {
  flex:1; background:var(--acc); color:var(--p);
  padding:14px; border-radius:999px; border:none;
  font-family:var(--f); font-size:12px; font-weight:700;
  letter-spacing:.08em; text-transform:uppercase; cursor:pointer;
  transition:background .2s;
}
.an-btn-next:hover { background:var(--acc2); }
.an-form-trust {
  font-family:var(--f); font-size:11px; color:rgba(255,255,255,.3);
  text-align:center; padding:0 28px 20px; line-height:1.6;
}

.an-form-success { padding:48px 28px; text-align:center; }
.an-success-icon  { font-size:52px; margin-bottom:14px; display:block; animation:bounceIn .6s; }
@keyframes bounceIn { from{transform:scale(0);} 60%{transform:scale(1.2);} to{transform:scale(1);} }
.an-success-title { font-family:var(--f); font-size:22px; font-weight:700; color:#fff; margin-bottom:8px; }
.an-success-sub   { font-family:var(--f); font-size:14px; color:var(--mu); line-height:1.7; }

/* ══ INFO FLIP ══ */
.an-info-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.an-flip-card { height:260px; perspective:1000px; }
.an-flip-inner {
  width:100%; height:100%; position:relative;
  transition:transform .7s cubic-bezier(.4,0,.2,1);
  transform-style:preserve-3d;
}
.an-flip-card:hover .an-flip-inner { transform:rotateY(180deg); }
.an-flip-front,
.an-flip-back {
  position:absolute; inset:0; border-radius:16px;
  backface-visibility:hidden; -webkit-backface-visibility:hidden;
  display:flex; flex-direction:column; justify-content:flex-end; padding:24px;
}
.an-flip-front { background:var(--p3); border:1px solid rgba(255,255,255,.09); }
.an-flip-back  { background:var(--acc); transform:rotateY(180deg); justify-content:center; align-items:flex-start; }
.an-flip-icon  { font-size:32px; margin-bottom:auto; padding-bottom:14px; }
.an-flip-title { font-family:var(--f); font-size:17px; font-weight:700; color:#fff; }
.an-flip-hint  { font-family:var(--f); font-size:11px; color:var(--mu2); margin-top:4px; }
.an-flip-back-title { font-family:var(--f); font-size:15px; font-weight:900; color:var(--p); margin-bottom:10px; }
.an-flip-back-text  { font-family:var(--f); font-size:13px; color:rgba(21,63,53,.75); line-height:1.6; }
.an-flip-chips { display:flex; gap:6px; flex-wrap:wrap; margin-top:12px; }
.an-flip-chip  {
  padding:3px 10px; border-radius:99px;
  background:rgba(21,63,53,.14);
  font-family:var(--f); font-size:10px; font-weight:700; color:var(--p);
}

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .an-act-grid          { grid-template-columns: repeat(2,1fr); }
  .an-info-grid         { grid-template-columns: repeat(2,1fr); }
  .an-llegar-layout     { grid-template-columns: 1fr; }
  .an-llegar-right      { min-height:300px; }
  .an-season-panel      { grid-template-columns: 1fr; gap:28px; }
  .an-eventos-strip     { grid-template-columns: 1fr; }
  .an-rec-layout        { grid-template-columns: 1fr; gap:32px; }
  .an-inner             { padding-left:24px; padding-right:24px; }
  .an-act-header        { padding-left:24px; padding-right:24px; padding-top:60px; }
  .an-act-grid-wrap     { padding-left:24px; padding-right:24px; }
  .an-llegar-left       { padding:60px 24px; }
  .an-map-wrap          { padding:24px 24px 12px; }
  .an-map-actions       { padding:0 24px 32px; }
}
@media (max-width: 640px) {
  .an-act-grid   { grid-template-columns: repeat(2,1fr); }
  .an-info-grid  { grid-template-columns: repeat(2,1fr); }
  .an-fg2        { grid-template-columns: 1fr; }
  .an-temp-big   { font-size:60px; }
  .an-season-tabs { flex-wrap:wrap; width:100%; border-radius:12px; }
  .an-ev-card    { min-height:400px; }
}
</style>
