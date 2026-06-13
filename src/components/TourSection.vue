<template>
  <!-- ══ TOUR COVER — full-bleed ══ -->
  <section
    id="tour"
    class="relative overflow-hidden cursor-pointer group"
    style="min-height: 72vh;"
    data-animate
    @click="openAndStartTour"
  >
    <!-- Full-bleed panoramic photo -->
    <div
      class="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
      style="background-image: url('/images/tour/hostal/Panorama1.webp');"
    ></div>

    <!-- Dark gradient overlay -->
    <div class="absolute inset-0"
         style="background: linear-gradient(
           to bottom,
           rgba(5,14,10,.55) 0%,
           rgba(5,14,10,.30) 40%,
           rgba(5,14,10,.65) 100%
         );"></div>

    <!-- Sage accent line top -->
    <div class="absolute top-0 left-0 right-0 h-px"
         style="background: linear-gradient(90deg, transparent, rgba(174,188,130,.5) 30%, rgba(174,188,130,.5) 70%, transparent);"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-6"
         style="min-height: 72vh; padding-top: 80px; padding-bottom: 80px;">

      <!-- Badge -->
      <p class="text-xs font-bold tracking-[.35em] uppercase mb-6"
         style="color: rgba(174,188,130,.85);" data-animate-delay="100">
        {{ t.tour.badge }}
      </p>

      <!-- Title -->
      <h2 class="font-bold leading-none mb-6"
          style="font-family:'Amble',sans-serif; font-size: clamp(52px,9vw,110px);
                 color:#fff; letter-spacing:-.03em;" data-animate-delay="100">
        360°
        <span style="color:#aebc82;">TOUR</span>
      </h2>

      <!-- Subtitle -->
      <p class="max-w-lg text-lg leading-relaxed mb-10"
         style="color: rgba(255,255,255,.65); font-family:'Amble',sans-serif;" data-animate-delay="200">
        {{ t.tour.subtitle }}
      </p>

      <!-- Play button -->
      <button
        class="relative flex items-center justify-center transition-all duration-500
               group-hover:scale-110"
        style="width:88px; height:88px; border-radius:50%;
               background: rgba(174,188,130,.15);
               border: 2px solid rgba(174,188,130,.55);
               backdrop-filter: blur(12px);"
        @click.stop="openAndStartTour"
        aria-label="Iniciar tour virtual"
      >
        <!-- Pulse ring -->
        <span class="absolute inset-0 rounded-full animate-ping"
              style="background: rgba(174,188,130,.18); animation-duration:2s;"></span>
        <!-- Play icon -->
        <svg class="w-9 h-9 ml-1.5" fill="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>

      <!-- CTA label -->
      <p class="mt-5 text-xs font-bold tracking-[.22em] uppercase transition-opacity duration-300"
         style="color: rgba(255,255,255,.45); font-family:'Amble',sans-serif;">
        {{ t.tour.cta }}
      </p>

    </div>

    <!-- Sage accent line bottom -->
    <div class="absolute bottom-0 left-0 right-0 h-px"
         style="background: linear-gradient(90deg, transparent, rgba(174,188,130,.3) 30%, rgba(174,188,130,.3) 70%, transparent);"></div>
  </section>

    <!-- Tour Modal/Fullscreen -->
    <Teleport to="body">
      <div v-if="tourOpen" class="fixed inset-0 z-[100] bg-black">
        <div class="h-screen relative overflow-hidden">

          <!-- Loading indicator while panorama loads -->
          <div
            v-if="tourStarted && isLoading"
            class="absolute inset-0 flex items-center justify-center bg-black/60 z-30"
          >
            <div class="flex flex-col items-center gap-4 text-white">
              <svg class="w-12 h-12 animate-spin opacity-80" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p class="text-lg font-medium tracking-wide">Cargando panorama…</p>
            </div>
          </div>

          <!-- 360° Canvas Viewer -->
          <canvas
            v-show="tourStarted"
            ref="tourCanvas"
            class="w-full h-full block"
            style="cursor: grab;"
          />

          <!-- Controls overlay -->
          <div v-if="tourStarted" class="absolute inset-0 pointer-events-none z-20">

            <!-- Current room label (top-left) -->
            <div class="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-2.5 text-white font-semibold text-sm shadow-lg tracking-wide">
              {{ currentRoom.area }}
              <span v-if="areaRooms.length > 1" class="font-normal opacity-60 ml-1.5 text-xs">
                · {{ currentRoom.name }}
              </span>
            </div>

            <!-- ── Hotspot area navigation ── -->
            <div class="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2.5 pointer-events-auto flex-wrap justify-center max-w-3xl px-4">
              <!-- One pill per unique area -->
              <template v-for="group in menuGroups" :key="group.category">
                <button
                  v-for="item in group.areas"
                  :key="item.area"
                  class="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase
                         transition-all duration-300 focus:outline-none shadow-lg"
                  :class="currentRoom.area === item.area
                    ? 'text-[#153f35] scale-105 shadow-[0_4px_24px_rgba(174,188,130,0.45)]'
                    : 'text-white/80 hover:text-white hover:scale-105'"
                  :style="currentRoom.area === item.area
                    ? 'background-color:#aebc82; border:1.5px solid rgba(174,188,130,0.5);'
                    : 'background:rgba(15,30,24,0.55); border:1.5px solid rgba(255,255,255,0.18); backdrop-filter:blur(12px);'"
                  @click="switchRoom(item.index)"
                >
                  <!-- Active dot indicator -->
                  <span
                    class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300"
                    :style="currentRoom.area === item.area ? 'background:#153f35;' : 'background:rgba(174,188,130,0.5);'"
                  />
                  {{ item.area }}
                </button>
              </template>
            </div>

            <!-- Sub-view dots (when current area has multiple panoramas) -->
            <div
              v-if="areaRooms.length > 1"
              class="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto"
            >
              <button
                v-for="(room, i) in areaRooms"
                :key="room.image"
                class="transition-all duration-300 focus:outline-none rounded-full"
                :style="i === areaRoomIndex
                  ? 'width:22px; height:7px; background:#aebc82; border-radius:4px;'
                  : 'width:7px; height:7px; background:rgba(255,255,255,0.35); border-radius:50%;'"
                :title="room.name"
                @click="switchRoom(rooms.indexOf(room))"
              />
            </div>

            <!-- Top-right: drag hint + mute button -->
            <div class="absolute top-6 right-20 flex items-center gap-2 pointer-events-auto">
              <!-- Drag hint -->
              <div class="flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/12 rounded-2xl px-4 py-2.5 text-white/60 text-xs select-none">
                <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
                {{ t.tour.dragHint }}
              </div>
              <!-- Sound toggle -->
              <button
                class="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-semibold border transition-all duration-300 hover:scale-105 focus:outline-none"
                :style="soundMuted
                  ? 'background:rgba(10,22,18,0.72); border-color:rgba(255,255,255,0.18); color:rgba(255,255,255,0.5); backdrop-filter:blur(16px);'
                  : 'background-color:#aebc82; border-color:rgba(174,188,130,0.5); color:#153f35;'"
                @click="toggleMute"
                title="Sonido ambiental"
              >
                <!-- Speaker icon -->
                <svg v-if="!soundMuted" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4H5a1 1 0 01-1-1V11a1 1 0 011-1h3l4-4z"/>
                </svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                </svg>
                {{ t.tour.soundLabel }}
              </button>
            </div>

          </div>

          <!-- Close Button — always on top -->
          <button
            class="absolute top-6 z-[60] pointer-events-auto text-white bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300"
            :class="tourStarted ? 'right-6' : 'right-6'"
            @click="closeTour"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Teleport>
</template>

<script setup>
import { ref, computed, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { useTourState } from '../composables/useTourState'
import { useI18n } from '../composables/useI18n.js'

const { tourOpen } = useTourState()
const { t } = useI18n()
const tourStarted = ref(false)
const menuOpen    = ref(false)
const isLoading   = ref(false)
const tourCanvas  = ref(null)
const currentRoomIndex = ref(0)
const soundMuted  = ref(false)

const rooms = [
  { name: 'Salón Principal', area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama5.webp' },
  { name: 'Vista 2',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama4.webp' },
  { name: 'Vista 3',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama6.webp' },
  { name: 'Vista 4',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama6_001.webp' },
  { name: 'Vista 5',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama7.webp' },
  { name: 'Vista 1',         area: 'Salón',          category: 'Áreas Sociales',        image: '/images/tour/salon/Panorama4.webp' },
  { name: 'Vista 2',         area: 'Salón',          category: 'Áreas Sociales',        image: '/images/tour/salon/Panorama5.webp' },
  { name: 'Vista 1',         area: 'Palapa',         category: 'Áreas Sociales',        image: '/images/tour/palapa/Panorama5.webp' },
  { name: 'Vista 1',         area: 'Hostal',         category: 'Áreas Sociales',        image: '/images/tour/hostal/Panorama1.webp' },
  { name: 'Vista 2',         area: 'Hostal',         category: 'Áreas Sociales',        image: '/images/tour/hostal/Panorama2.webp' },
  { name: 'Vista 1',         area: 'Área de Esquí',  category: 'Instalaciones',         image: '/images/tour/ski/Panorama6.webp' },
  { name: 'Vista 2',         area: 'Área de Esquí',  category: 'Instalaciones',         image: '/images/tour/ski/Panorama7_000.webp' },
  { name: 'Vista 1',         area: 'Stand de Tiro',  category: 'Instalaciones',         image: '/images/tour/stand de tiro/Panorama7.webp' },
  { name: 'Vista 2',         area: 'Stand de Tiro',  category: 'Instalaciones',         image: '/images/tour/stand de tiro/Panorama8_000.webp' },
]

const currentRoom = ref(rooms[0])

const areaRooms    = computed(() => rooms.filter(r => r.area === currentRoom.value.area))
const areaRoomIndex = computed(() => areaRooms.value.findIndex(r => r.image === currentRoom.value.image))

// Menu: unique areas grouped by category, each pointing to the index of its first room
const menuGroups = computed(() => {
  const catMap = new Map()
  rooms.forEach((room, i) => {
    if (!catMap.has(room.category)) catMap.set(room.category, [])
    const areas = catMap.get(room.category)
    if (!areas.find(a => a.area === room.area)) areas.push({ area: room.area, index: i })
  })
  return Array.from(catMap.entries()).map(([category, areas]) => ({ category, areas }))
})

// Three.js state
let renderer    = null
let scene       = null
let camera      = null
let sphere      = null
let animFrameId = null
let isDragging  = false
let prevMouse   = { x: 0, y: 0 }
let prevTouch   = { x: 0, y: 0 }
let lon = 0, lat = 0
const _lookTarget = new THREE.Vector3()  // reused every frame — no GC allocation

// ─────────────────────────────────────────
// AMBIENT SOUND ENGINE (Web Audio API)
// ─────────────────────────────────────────
let audioCtx   = null
let masterGain = null
let activeNodes = []

// Sound profile per area — unique type per space
const SOUND_PROFILES = {
  'Casa Club':     { type: 'social_club' },   // Warm indoor social ambiance
  'Salón':         { type: 'event_hall' },    // Large hall, subtle reverb
  'Palapa':        { type: 'palapa_outdoor'}, // Nature + breeze + birds
  'Hostal':        { type: 'pine_forest' },   // Sierra Madre pine forest
  'Área de Esquí': { type: 'mountain_wind' }, // Strong gusting wind + cold
  'Stand de Tiro': { type: 'open_field' },    // Quiet outdoor field
}

function initAudio() {
  if (audioCtx) return
  audioCtx   = new (window.AudioContext || window.webkitAudioContext)()
  masterGain = audioCtx.createGain()
  masterGain.gain.value = soundMuted.value ? 0 : 0.6
  masterGain.connect(audioCtx.destination)
}

function makeNoise(type = 'brown') {
  const bufSize = audioCtx.sampleRate * 4
  const buf     = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate)
  const data    = buf.getChannelData(0)
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
  for (let i = 0; i < bufSize; i++) {
    const w = Math.random() * 2 - 1
    if (type === 'brown') {
      b0 = (b0 + 0.02 * w) / 1.02; data[i] = b0 * 3.5
    } else if (type === 'pink') {
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759
      b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856
      b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980
      data[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926
    } else {
      data[i] = w
    }
  }
  const src = audioCtx.createBufferSource()
  src.buffer = buf
  src.loop   = true
  return src
}

function makeOsc(freq, type = 'sine') {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.value = freq
  return osc
}

// LFO that gently modulates a gain node between lo and hi at lfoHz rate
function attachLFO(gainNode, lo, hi, lfoHz = 0.1) {
  const lfo   = audioCtx.createOscillator()
  const lfoG  = audioCtx.createGain()
  const mid   = (lo + hi) / 2
  const range = (hi - lo) / 2
  lfo.frequency.value = lfoHz
  lfoG.gain.value = range
  gainNode.gain.value = mid
  lfo.connect(lfoG)
  lfoG.connect(gainNode.gain)
  lfo.start()
  return lfo
}

function buildSoundscape(profile) {
  const nodes = []
  const t = profile?.type || 'palapa_outdoor'

  if (t === 'social_club') {
    // ── Casa Club: warm luxury clubhouse ──
    // Subtle HVAC hum
    const hum = makeOsc(55, 'sine'); const gHum = audioCtx.createGain(); gHum.gain.value = 0.016
    hum.connect(gHum); gHum.connect(masterGain); hum.start(); nodes.push(hum)

    // Crowd babble: pink noise split across 5 speech-band BPFs.
    // Each band has RANDOM amplitude scheduling (talk/pause) — irregular bursts ≠ water.
    const murmurCC = makeNoise('pink'); murmurCC.start(); nodes.push(murmurCC)
    ;[220, 310, 430, 560, 710].forEach((freq, i) => {
      const bpf = audioCtx.createBiquadFilter(); bpf.type='bandpass'; bpf.frequency.value=freq; bpf.Q.value=3.5
      const g = audioCtx.createGain(); g.gain.value = 0
      murmurCC.connect(bpf); bpf.connect(g); g.connect(masterGain)
      function talk() {
        if (!audioCtx) return
        const now = audioCtx.currentTime
        const speaking = Math.random() < 0.55
        const vol     = speaking ? 0.022 + Math.random() * 0.026 : 0
        const attack  = 0.05 + Math.random() * 0.07
        const hold    = speaking ? 0.18 + Math.random() * 0.55 : 0.05 + Math.random() * 0.18
        g.gain.cancelScheduledValues(now)
        g.gain.setValueAtTime(g.gain.value, now)
        g.gain.linearRampToValueAtTime(vol, now + attack)
        g.gain.setValueAtTime(vol, now + attack + hold)
        g.gain.linearRampToValueAtTime(0, now + attack + hold + 0.07)
        setTimeout(talk, (attack + hold + 0.08 + Math.random() * 0.25) * 1000)
      }
      setTimeout(talk, i * 130 + Math.random() * 180)
    })

    // Occasional glass clink
    const clink = audioCtx.createOscillator(); clink.type = 'sine'; clink.frequency.value = 2400
    const clinkEnv = audioCtx.createGain(); clinkEnv.gain.value = 0
    const clinkBpf = audioCtx.createBiquadFilter(); clinkBpf.type='bandpass'; clinkBpf.frequency.value=2400; clinkBpf.Q.value=18
    clink.connect(clinkBpf); clinkBpf.connect(clinkEnv); clinkEnv.connect(masterGain); clink.start()
    let nextClink = audioCtx.currentTime + 6
    function schedClink() {
      if (!audioCtx) return
      clink.frequency.setValueAtTime(1900 + Math.random() * 900, nextClink)
      clinkEnv.gain.setValueAtTime(0, nextClink)
      clinkEnv.gain.linearRampToValueAtTime(0.014 + Math.random() * 0.007, nextClink + 0.007)
      clinkEnv.gain.exponentialRampToValueAtTime(0.0001, nextClink + 0.5)
      nextClink += 9 + Math.random() * 16
      setTimeout(schedClink, (nextClink - audioCtx.currentTime) * 1000 - 200)
    }
    setTimeout(schedClink, (nextClink - audioCtx.currentTime) * 1000 - 200)
    nodes.push(clink)

  } else if (t === 'event_hall') {
    // ── Salón: event hall with people ──
    // Room resonance (low oscillator — not noise)
    const deep = makeOsc(42, 'sine'); const gD = audioCtx.createGain(); gD.gain.value = 0.010
    deep.connect(gD); gD.connect(masterGain); deep.start(); nodes.push(deep)

    // Crowd babble: 4 speech bands, random talk/pause scheduling
    const murmurEH = makeNoise('pink'); murmurEH.start(); nodes.push(murmurEH)
    ;[230, 340, 480, 640].forEach((freq, i) => {
      const bpf = audioCtx.createBiquadFilter(); bpf.type='bandpass'; bpf.frequency.value=freq; bpf.Q.value=3.5
      const g = audioCtx.createGain(); g.gain.value = 0
      murmurEH.connect(bpf); bpf.connect(g); g.connect(masterGain)
      function talk() {
        if (!audioCtx) return
        const now = audioCtx.currentTime
        const speaking = Math.random() < 0.55
        const vol     = speaking ? 0.025 + Math.random() * 0.030 : 0
        const attack  = 0.05 + Math.random() * 0.07
        const hold    = speaking ? 0.20 + Math.random() * 0.60 : 0.06 + Math.random() * 0.20
        g.gain.cancelScheduledValues(now)
        g.gain.setValueAtTime(g.gain.value, now)
        g.gain.linearRampToValueAtTime(vol, now + attack)
        g.gain.setValueAtTime(vol, now + attack + hold)
        g.gain.linearRampToValueAtTime(0, now + attack + hold + 0.07)
        setTimeout(talk, (attack + hold + 0.08 + Math.random() * 0.25) * 1000)
      }
      setTimeout(talk, i * 150 + Math.random() * 200)
    })

    // Occasional glass clink
    const clink = audioCtx.createOscillator(); clink.type = 'sine'; clink.frequency.value = 2200
    const clinkEnv = audioCtx.createGain(); clinkEnv.gain.value = 0
    const clinkBpf = audioCtx.createBiquadFilter(); clinkBpf.type='bandpass'; clinkBpf.frequency.value=2200; clinkBpf.Q.value=16
    clink.connect(clinkBpf); clinkBpf.connect(clinkEnv); clinkEnv.connect(masterGain); clink.start()
    let nextClink = audioCtx.currentTime + 5
    function schedClink() {
      if (!audioCtx) return
      clink.frequency.setValueAtTime(1800 + Math.random() * 800, nextClink)
      clinkEnv.gain.setValueAtTime(0, nextClink)
      clinkEnv.gain.linearRampToValueAtTime(0.013 + Math.random() * 0.006, nextClink + 0.007)
      clinkEnv.gain.exponentialRampToValueAtTime(0.0001, nextClink + 0.45)
      nextClink += 8 + Math.random() * 14
      setTimeout(schedClink, (nextClink - audioCtx.currentTime) * 1000 - 200)
    }
    setTimeout(schedClink, (nextClink - audioCtx.currentTime) * 1000 - 200)
    nodes.push(clink)

  } else if (t === 'palapa_outdoor') {
    // ── Palapa: covered outdoor area, mountain breeze + birds ──
    // Breeze through wood/thatch structure
    const breeze = makeNoise('pink')
    const bpfB = audioCtx.createBiquadFilter(); bpfB.type='bandpass'; bpfB.frequency.value=850; bpfB.Q.value=0.5
    const gB = audioCtx.createGain()
    const lfoB = attachLFO(gB, 0.032, 0.12, 0.07)
    breeze.connect(bpfB); bpfB.connect(gB); gB.connect(masterGain)
    breeze.start(); nodes.push(breeze, lfoB)

    // Leaf/frond rustle
    const rustle = makeNoise('white')
    const hpfR = audioCtx.createBiquadFilter(); hpfR.type='highpass'; hpfR.frequency.value=3000
    const lpfR = audioCtx.createBiquadFilter(); lpfR.type='lowpass'; lpfR.frequency.value=6000
    const gR = audioCtx.createGain(); gR.gain.value = 0.022
    rustle.connect(hpfR); hpfR.connect(lpfR); lpfR.connect(gR); gR.connect(masterGain)
    rustle.start(); nodes.push(rustle)

    // Distant low mountain ambiance
    const distant = makeNoise('brown')
    const lpfDist = audioCtx.createBiquadFilter(); lpfDist.type='lowpass'; lpfDist.frequency.value=140
    const gDist = audioCtx.createGain(); gDist.gain.value = 0.028
    distant.connect(lpfDist); lpfDist.connect(gDist); gDist.connect(masterGain)
    distant.start(); nodes.push(distant)

    // 5 bird types with frequency-swept chirps for realism
    const birdDefs = [
      { f: 3200, range: [3,6],   dur: 0.08, vol: 0.022, sweep:  400 },
      { f: 2600, range: [4,9],   dur: 0.12, vol: 0.018, sweep: -300 },
      { f: 4100, range: [6,12],  dur: 0.06, vol: 0.014, sweep:  600 },
      { f: 2900, range: [5,10],  dur: 0.10, vol: 0.020, sweep:  200 },
      { f: 3500, range: [7,14],  dur: 0.07, vol: 0.012, sweep: -500 },
    ]
    birdDefs.forEach((def, idx) => {
      const bird = audioCtx.createOscillator(); bird.type = 'sine'; bird.frequency.value = def.f
      const bEnv = audioCtx.createGain(); bEnv.gain.value = 0
      bird.connect(bEnv); bEnv.connect(masterGain); bird.start()
      let next = audioCtx.currentTime + 1.5 + idx * 0.7
      function sched() {
        if (!audioCtx) return
        const startF = def.f + Math.random() * 300 - 150
        bird.frequency.setValueAtTime(startF, next)
        bird.frequency.linearRampToValueAtTime(startF + def.sweep * (0.7 + Math.random() * 0.6), next + def.dur)
        bEnv.gain.setValueAtTime(0, next)
        bEnv.gain.linearRampToValueAtTime(def.vol, next + def.dur * 0.3)
        bEnv.gain.linearRampToValueAtTime(0, next + def.dur)
        next += def.range[0] + Math.random() * (def.range[1] - def.range[0])
        setTimeout(sched, (next - audioCtx.currentTime) * 1000 - 200)
      }
      setTimeout(sched, (next - audioCtx.currentTime) * 1000 - 200)
      nodes.push(bird)
    })

  } else if (t === 'pine_forest') {
    // ── Hostal: cozy mountain inn ──
    // Subtle indoor hum
    const hum = makeOsc(52, 'sine'); const gHum = audioCtx.createGain(); gHum.gain.value = 0.014
    hum.connect(gHum); gHum.connect(masterGain); hum.start(); nodes.push(hum)

    // Fireplace: low-frequency brown noise (<80 Hz) = rumble, not water
    const fire = makeNoise('brown')
    const lpfFire = audioCtx.createBiquadFilter(); lpfFire.type='lowpass'; lpfFire.frequency.value=75
    const gFire = audioCtx.createGain()
    const lfoFire = attachLFO(gFire, 0.018, 0.045, 1.6)
    fire.connect(lpfFire); lpfFire.connect(gFire); gFire.connect(masterGain)
    fire.start(); nodes.push(fire, lfoFire)

    // Soft crowd babble: 3 bands, quieter (fewer guests)
    const murmurH = makeNoise('pink'); murmurH.start(); nodes.push(murmurH)
    ;[250, 380, 550].forEach((freq, i) => {
      const bpf = audioCtx.createBiquadFilter(); bpf.type='bandpass'; bpf.frequency.value=freq; bpf.Q.value=3.5
      const g = audioCtx.createGain(); g.gain.value = 0
      murmurH.connect(bpf); bpf.connect(g); g.connect(masterGain)
      function talk() {
        if (!audioCtx) return
        const now = audioCtx.currentTime
        const speaking = Math.random() < 0.45
        const vol     = speaking ? 0.014 + Math.random() * 0.016 : 0
        const attack  = 0.06 + Math.random() * 0.08
        const hold    = speaking ? 0.22 + Math.random() * 0.65 : 0.08 + Math.random() * 0.30
        g.gain.cancelScheduledValues(now)
        g.gain.setValueAtTime(g.gain.value, now)
        g.gain.linearRampToValueAtTime(vol, now + attack)
        g.gain.setValueAtTime(vol, now + attack + hold)
        g.gain.linearRampToValueAtTime(0, now + attack + hold + 0.08)
        setTimeout(talk, (attack + hold + 0.1 + Math.random() * 0.35) * 1000)
      }
      setTimeout(talk, i * 200 + Math.random() * 250)
    })

    // Very faint pine wind outside (high-shelf only, above water range)
    const pines = makeNoise('white')
    const hpfPine = audioCtx.createBiquadFilter(); hpfPine.type='highpass'; hpfPine.frequency.value=4500
    const gP = audioCtx.createGain(); gP.gain.value = 0.010
    pines.connect(hpfPine); hpfPine.connect(gP); gP.connect(masterGain)
    pines.start(); nodes.push(pines)

    // Occasional distant bird through window
    const bird = audioCtx.createOscillator(); bird.type = 'sine'; bird.frequency.value = 3200
    const bEnv = audioCtx.createGain(); bEnv.gain.value = 0
    bird.connect(bEnv); bEnv.connect(masterGain); bird.start()
    let nextB = audioCtx.currentTime + 4
    function schedB() {
      if (!audioCtx) return
      const startF = 3000 + Math.random() * 400
      bird.frequency.setValueAtTime(startF, nextB)
      bird.frequency.linearRampToValueAtTime(startF - 350, nextB + 0.14)
      bEnv.gain.setValueAtTime(0, nextB)
      bEnv.gain.linearRampToValueAtTime(0.006, nextB + 0.05)
      bEnv.gain.linearRampToValueAtTime(0, nextB + 0.16)
      nextB += 10 + Math.random() * 18
      setTimeout(schedB, (nextB - audioCtx.currentTime) * 1000 - 200)
    }
    setTimeout(schedB, (nextB - audioCtx.currentTime) * 1000 - 200)
    nodes.push(bird)

  } else if (t === 'mountain_wind') {
    // ── Área de Esquí: alpine wind — oscillators only, zero mid-band noise ──
    // Primary wind moan: low sawtooth + lowpass + amplitude LFO + frequency LFO
    const moan = makeOsc(58, 'sawtooth')
    const lpfMoan = audioCtx.createBiquadFilter(); lpfMoan.type='lowpass'; lpfMoan.frequency.value=130
    const gMoan = audioCtx.createGain()
    const lfoMoan = attachLFO(gMoan, 0.015, 0.065, 0.062)
    const lfoMoanF = audioCtx.createOscillator(); lfoMoanF.frequency.value = 0.035
    const lfoMoanFG = audioCtx.createGain(); lfoMoanFG.gain.value = 22
    lfoMoanF.connect(lfoMoanFG); lfoMoanFG.connect(moan.frequency)
    moan.connect(lpfMoan); lpfMoan.connect(gMoan); gMoan.connect(masterGain)
    moan.start(); lfoMoanF.start(); nodes.push(moan, lfoMoan, lfoMoanF)

    // Sub-bass wind pressure (very low, felt more than heard)
    const sub = makeOsc(38, 'triangle')
    const lpfSub = audioCtx.createBiquadFilter(); lpfSub.type='lowpass'; lpfSub.frequency.value=70
    const gSub = audioCtx.createGain()
    const lfoSub = attachLFO(gSub, 0.006, 0.030, 0.048)
    sub.connect(lpfSub); lpfSub.connect(gSub); gSub.connect(masterGain)
    sub.start(); nodes.push(sub, lfoSub)

    // Wind whistle through obstacles: oscillator only, frequency-swept
    const whistle = makeOsc(780, 'sine')
    const gWh = audioCtx.createGain()
    const lfoWh = attachLFO(gWh, 0, 0.016, 0.11)
    const lfoWhF = audioCtx.createOscillator(); lfoWhF.frequency.value = 0.07
    const lfoWhFG = audioCtx.createGain(); lfoWhFG.gain.value = 110
    lfoWhF.connect(lfoWhFG); lfoWhFG.connect(whistle.frequency)
    whistle.connect(gWh); gWh.connect(masterGain)
    whistle.start(); lfoWhF.start(); nodes.push(whistle, lfoWh, lfoWhF)

    // Thin high-freq air: white noise only above 5.5 kHz (well above water range)
    const air = makeNoise('white')
    const hpfAir = audioCtx.createBiquadFilter(); hpfAir.type='highpass'; hpfAir.frequency.value=5500
    const gAir = audioCtx.createGain()
    const lfoAir = attachLFO(gAir, 0.004, 0.018, 0.09)
    air.connect(hpfAir); hpfAir.connect(gAir); gAir.connect(masterGain)
    air.start(); nodes.push(air, lfoAir)

    // Distant mountain birds (sparse, open-air feel)
    const skibirds = [
      { f: 3400, range: [8,16],  dur: 0.09, vol: 0.010, sweep:  450 },
      { f: 2800, range: [12,22], dur: 0.12, vol: 0.008, sweep: -300 },
    ]
    skibirds.forEach((def, idx) => {
      const bird = audioCtx.createOscillator(); bird.type = 'sine'; bird.frequency.value = def.f
      const bEnv = audioCtx.createGain(); bEnv.gain.value = 0
      bird.connect(bEnv); bEnv.connect(masterGain); bird.start()
      let next = audioCtx.currentTime + 3 + idx * 2
      function sched() {
        if (!audioCtx) return
        const startF = def.f + Math.random() * 250 - 125
        bird.frequency.setValueAtTime(startF, next)
        bird.frequency.linearRampToValueAtTime(startF + def.sweep, next + def.dur)
        bEnv.gain.setValueAtTime(0, next)
        bEnv.gain.linearRampToValueAtTime(def.vol, next + def.dur * 0.3)
        bEnv.gain.linearRampToValueAtTime(0, next + def.dur)
        next += def.range[0] + Math.random() * (def.range[1] - def.range[0])
        setTimeout(sched, (next - audioCtx.currentTime) * 1000 - 200)
      }
      setTimeout(sched, (next - audioCtx.currentTime) * 1000 - 200)
      nodes.push(bird)
    })

  } else {
    // ── Stand de Tiro: open outdoor field — no mid-range noise ──
    // Open-air wind: oscillator moan (low), not noise
    const fieldMoan = makeOsc(48, 'sine')
    const lpfFM = audioCtx.createBiquadFilter(); lpfFM.type='lowpass'; lpfFM.frequency.value=90
    const gFM = audioCtx.createGain()
    const lfoFM = attachLFO(gFM, 0.008, 0.030, 0.055)
    fieldMoan.connect(lpfFM); lpfFM.connect(gFM); gFM.connect(masterGain)
    fieldMoan.start(); nodes.push(fieldMoan, lfoFM)

    // High-freq air only (>5 kHz — above water range)
    const air = makeNoise('white')
    const hpfAir = audioCtx.createBiquadFilter(); hpfAir.type='highpass'; hpfAir.frequency.value=5000
    const gAir = audioCtx.createGain()
    const lfoAir = attachLFO(gAir, 0.005, 0.018, 0.09)
    air.connect(hpfAir); hpfAir.connect(gAir); gAir.connect(masterGain)
    air.start(); nodes.push(air, lfoAir)

    // Insect chorus: BPF at 4500 Hz (well above water range)
    const insects = makeNoise('white')
    const bpfI = audioCtx.createBiquadFilter(); bpfI.type='bandpass'; bpfI.frequency.value=4500; bpfI.Q.value=2
    const gI = audioCtx.createGain()
    const lfoI = attachLFO(gI, 0.006, 0.022, 0.28)
    insects.connect(bpfI); bpfI.connect(gI); gI.connect(masterGain)
    insects.start(); nodes.push(insects, lfoI)

    // Sparse far-off bird
    const bd = audioCtx.createOscillator(); bd.type = 'sine'; bd.frequency.value = 2700
    const bdEnv = audioCtx.createGain(); bdEnv.gain.value = 0
    bd.connect(bdEnv); bdEnv.connect(masterGain); bd.start()
    let nextBd = audioCtx.currentTime + 4
    function schedBd() {
      if (!audioCtx) return
      const startF = 2400 + Math.random() * 700
      bd.frequency.setValueAtTime(startF, nextBd)
      bd.frequency.linearRampToValueAtTime(startF + (Math.random() > 0.5 ? 350 : -350), nextBd + 0.13)
      bdEnv.gain.setValueAtTime(0, nextBd)
      bdEnv.gain.linearRampToValueAtTime(0.011, nextBd + 0.04)
      bdEnv.gain.linearRampToValueAtTime(0, nextBd + 0.15)
      nextBd += 8 + Math.random() * 16
      setTimeout(schedBd, (nextBd - audioCtx.currentTime) * 1000 - 200)
    }
    setTimeout(schedBd, (nextBd - audioCtx.currentTime) * 1000 - 200)
    nodes.push(bd)
  }
  return nodes
}

function playAmbientForArea(area) {
  if (!audioCtx) return
  // Fade out old sounds
  const now = audioCtx.currentTime
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(masterGain.gain.value, now)
  masterGain.gain.linearRampToValueAtTime(0, now + 0.8)
  setTimeout(() => {
    activeNodes.forEach(n => { try { n.stop() } catch {} })
    activeNodes = []
    activeNodes = buildSoundscape(SOUND_PROFILES[area])
    if (!soundMuted.value) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime)
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 1.5)
    }
  }, 850)
}

function stopAllAudio() {
  if (!audioCtx) return
  masterGain.gain.cancelScheduledValues(audioCtx.currentTime)
  masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime)
  masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6)
  setTimeout(() => {
    activeNodes.forEach(n => { try { n.stop() } catch {} })
    activeNodes = []
    if (audioCtx) { audioCtx.close(); audioCtx = null; masterGain = null }
  }, 700)
}

function toggleMute() {
  soundMuted.value = !soundMuted.value
  if (!masterGain) return
  const now = audioCtx.currentTime
  masterGain.gain.cancelScheduledValues(now)
  masterGain.gain.setValueAtTime(masterGain.gain.value, now)
  masterGain.gain.linearRampToValueAtTime(soundMuted.value ? 0 : 0.6, now + 0.5)
}

// ─────────────────────────────────────────

function openTour() {
  tourOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.cursor = 'auto'
}

function openAndStartTour() {
  tourOpen.value    = true
  tourStarted.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.cursor = 'auto'
  nextTick(() => initThree())
  startAudio()
}

function closeTour() {
  tourOpen.value    = false
  tourStarted.value = false
  menuOpen.value    = false
  document.body.style.overflow = ''
  document.body.style.cursor = ''
  stopAllAudio()
  destroyThree()
}

function startAudio() {
  setTimeout(() => {
    initAudio()
    activeNodes = buildSoundscape(SOUND_PROFILES[currentRoom.value.area])
    if (!soundMuted.value) {
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 2)
    }
  }, 300)
}

function startTour() {
  tourStarted.value = true
  nextTick(() => initThree())
  startAudio()
}

function switchRoom(i) {
  const prevArea         = currentRoom.value.area
  currentRoomIndex.value = i
  currentRoom.value      = rooms[i]
  menuOpen.value         = false
  loadPanorama(rooms[i].image)
  if (rooms[i].area !== prevArea) playAmbientForArea(rooms[i].area)
}

function initThree() {
  if (!tourCanvas.value) return

  const canvas = tourCanvas.value
  const width  = canvas.clientWidth  || window.innerWidth
  const height = canvas.clientHeight || window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
  renderer.setSize(width, height, false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 0)

  // Create sphere once — inside-out so the equirectangular wraps inside
  const geometry = new THREE.SphereGeometry(500, 60, 40)
  geometry.scale(-1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x061717 })
  sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  // Load panorama for the current room
  loadPanorama(currentRoom.value.image)

  // Mouse events
  canvas.addEventListener('mousedown',  onMouseDown)
  canvas.addEventListener('mousemove',  onMouseMove)
  canvas.addEventListener('mouseup',    onMouseUp)
  canvas.addEventListener('mouseleave', onMouseUp)
  // Touch events
  canvas.addEventListener('touchstart', onTouchStart, { passive: false })
  canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
  canvas.addEventListener('touchend',   onMouseUp)
  // Scroll-to-zoom
  canvas.addEventListener('wheel', onWheel, { passive: false })
  // Resize
  window.addEventListener('resize', onResize)

  animate()
}

function loadPanorama(path) {
  if (!scene || !sphere) return
  isLoading.value = true

  const loader = new THREE.TextureLoader()
  loader.load(
    path,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      sphere.material = new THREE.MeshBasicMaterial({ map: texture })
      sphere.material.needsUpdate = true
      isLoading.value = false
    },
    undefined,
    () => {
      // Fallback gradient color on error
      sphere.material = new THREE.MeshBasicMaterial({ color: 0x061717 })
      isLoading.value = false
    }
  )
}

function animate() {
  animFrameId = requestAnimationFrame(animate)

  // Clamp vertical look
  lat = Math.max(-85, Math.min(85, lat))

  // Convert lon/lat to look-at target
  const phi   = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon)

  _lookTarget.set(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta)
  )
  camera.lookAt(_lookTarget)

  renderer.render(scene, camera)
}

// ---- Mouse handlers ----
function onMouseDown(e) {
  isDragging = true
  prevMouse  = { x: e.clientX, y: e.clientY }
  e.target.style.cursor = 'grabbing'
}

function onMouseMove(e) {
  if (!isDragging) return
  lon -= (e.clientX - prevMouse.x) * 0.15
  lat += (e.clientY - prevMouse.y) * 0.15
  prevMouse = { x: e.clientX, y: e.clientY }
}

function onMouseUp(e) {
  isDragging = false
  if (e.target) e.target.style.cursor = 'grab'
}

// ---- Touch handlers ----
function onTouchStart(e) {
  if (e.touches.length === 1) {
    isDragging = true
    prevTouch  = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
}

function onTouchMove(e) {
  if (!isDragging || e.touches.length !== 1) return
  e.preventDefault()
  lon -= (e.touches[0].clientX - prevTouch.x) * 0.15
  lat += (e.touches[0].clientY - prevTouch.y) * 0.15
  prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

// ---- Scroll-to-zoom ----
function onWheel(e) {
  e.preventDefault()
  if (!camera) return
  camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.05))
  camera.updateProjectionMatrix()
}

// ---- Resize ----
function onResize() {
  if (!tourCanvas.value || !renderer || !camera) return
  const w = tourCanvas.value.clientWidth  || window.innerWidth
  const h = tourCanvas.value.clientHeight || window.innerHeight
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

function destroyThree() {
  if (animFrameId) cancelAnimationFrame(animFrameId)
  if (renderer) {
    renderer.dispose()
    renderer = null
  }
  scene  = null
  camera = null
  sphere = null
  animFrameId = null
  lon = 0
  lat = 0
  window.removeEventListener('resize', onResize)
}

onUnmounted(() => {
  destroyThree()
  stopAllAudio()
  document.body.style.overflow = ''
})
</script>
