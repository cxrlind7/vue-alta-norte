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
// AMBIENT SOUND ENGINE (real recordings, one per zone type)
// ─────────────────────────────────────────
const TARGET_VOLUME = 0.55
const AUDIO_TALK  = '/audio/freesound_community-talking-people-6368.mp3'
const AUDIO_RIVER = '/audio/oxidvideos-river-307903.mp3'
const AUDIO_WIND  = '/audio/storegraphic-soft-wind-316392.mp3'

// Sound file per area — matched to what that panorama actually shows
const SOUND_PROFILES = {
  'Casa Club':     AUDIO_TALK,   // Indoor social club, guests chatting
  'Salón':         AUDIO_TALK,   // Event hall, guests chatting
  'Hostal':        AUDIO_TALK,   // Lobby/reception, guests at the counter
  'Palapa':        AUDIO_RIVER,  // Deck overlooking the river
  'Área de Esquí': AUDIO_WIND,   // Open-air mountain slope
  'Stand de Tiro': AUDIO_WIND,   // Open outdoor field
}

let ambientAudio = null
let fadeRAF      = null

function fadeTo(el, target, durationMs, onDone) {
  if (fadeRAF) cancelAnimationFrame(fadeRAF)
  const start = el.volume
  const t0 = performance.now()
  function step(now) {
    const p = Math.min(1, (now - t0) / durationMs)
    el.volume = start + (target - start) * p
    if (p < 1) {
      fadeRAF = requestAnimationFrame(step)
    } else {
      fadeRAF = null
      if (onDone) onDone()
    }
  }
  fadeRAF = requestAnimationFrame(step)
}

function initAudio() {
  if (ambientAudio) return
  ambientAudio = new Audio()
  ambientAudio.loop   = true
  ambientAudio.volume = 0
}

function playAmbientForArea(area) {
  if (!ambientAudio) return
  const src = SOUND_PROFILES[area] || AUDIO_WIND
  if (ambientAudio.src.endsWith(src)) return
  fadeTo(ambientAudio, 0, 500, () => {
    ambientAudio.src = src
    ambientAudio.currentTime = 0
    ambientAudio.play().catch(() => {})
    if (!soundMuted.value) fadeTo(ambientAudio, TARGET_VOLUME, 1200)
  })
}

function stopAllAudio() {
  if (!ambientAudio) return
  fadeTo(ambientAudio, 0, 500, () => {
    ambientAudio.pause()
    ambientAudio = null
  })
}

function toggleMute() {
  soundMuted.value = !soundMuted.value
  if (!ambientAudio) return
  fadeTo(ambientAudio, soundMuted.value ? 0 : TARGET_VOLUME, 400)
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
    const src = SOUND_PROFILES[currentRoom.value.area] || AUDIO_WIND
    ambientAudio.src = src
    ambientAudio.play().catch(() => {})
    if (!soundMuted.value) fadeTo(ambientAudio, TARGET_VOLUME, 2000)
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
