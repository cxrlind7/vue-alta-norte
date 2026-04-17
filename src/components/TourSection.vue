<template>
  <section id="tour" class="py-24 bg-surface relative overflow-hidden" data-animate>
    <!-- Background mountain silhouettes -->
    <div class="absolute inset-0">
      <svg viewBox="0 0 1200 600" class="absolute bottom-0 w-full h-auto opacity-20">
        <path d="M0,600 L0,300 L200,200 L400,280 L600,150 L800,220 L1000,180 L1200,240 L1200,600 Z" fill="currentColor" class="text-primary-800" />
      </svg>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-8" data-animate-delay="100">
          <div class="space-y-6">
            <h2 class="text-4xl lg:text-6xl font-bold text-white leading-tight">
              360° VIRTUAL<br />
              <span class="text-primary-300">TOUR</span>
            </h2>
            <p class="text-xl text-gray-300 leading-relaxed">
              Realiza un recorrido virtual inmersivo de nuestra comunidad residencial y explora los impresionantes alrededores desde la comodidad de tu hogar
            </p>
          </div>
          <div data-animate-delay="200">
            <button
              class="inline-flex items-center bg-primary hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg group"
              @click="openTour"
            >
              <span>INICIAR TOUR</span>
              <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Preview -->
        <div class="relative" data-animate-delay="200">
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-800 rounded-2xl relative overflow-hidden shadow-2xl">
              <div class="h-full w-full bg-cover bg-center bg-no-repeat opacity-70" style="background-image: url('/images/tour.jpg')"></div>
            </div>
            <div class="absolute inset-0 bg-black/30 rounded-2xl"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center text-white space-y-6">
                <div class="relative">
                  <div class="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="absolute inset-0 border-2 border-white/30 rounded-full animate-spin" style="animation-duration:8s"></div>
                </div>
                <div class="space-y-2">
                  <p class="text-2xl font-bold">Tour Virtual 360°</p>
                  <p class="text-lg opacity-80">Arrastra para explorar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tour Modal/Fullscreen -->
    <Teleport to="body">
      <div v-if="tourOpen" class="fixed inset-0 z-[100] bg-black">
        <div class="h-screen relative overflow-hidden">

          <!-- Loading screen before tour starts -->
          <div
            v-if="!tourStarted"
            class="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-surface via-surface/90 to-surface/60 z-50"
          >
            <div class="text-center space-y-8 p-8">
              <div class="space-y-4">
                <h2 class="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Tour Virtual<span class="block text-primary-300">360°</span>
                </h2>
                <p class="text-xl text-gray-300 max-w-md mx-auto">Explora Alta Norte desde la comodidad de tu hogar</p>
              </div>
              <button
                class="inline-flex items-center bg-primary hover:bg-primary-700 text-white font-bold text-xl px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl group"
                @click="startTour"
              >
                <svg class="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Iniciar Tour
              </button>
            </div>
          </div>

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
            <!-- Current room label -->
            <div class="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm border border-primary-300/30 rounded-xl px-6 py-3 text-white font-bold shadow-lg">
              {{ currentRoom.area }}<span v-if="areaRooms.length > 1" class="font-normal opacity-70 ml-2 text-sm">{{ currentRoom.name }}</span>
            </div>

            <!-- Menu Button -->
            <button
              class="absolute top-6 right-20 bg-surface/80 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-white select-none pointer-events-auto hover:bg-surface hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              @click="menuOpen = !menuOpen"
            >
              Menú
            </button>

            <!-- Area view switcher -->
            <div
              v-if="areaRooms.length > 1"
              class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto bg-black/40 backdrop-blur-sm rounded-2xl px-3 py-2"
            >
              <button
                v-for="(room, i) in areaRooms"
                :key="room.image"
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none"
                :class="i === areaRoomIndex
                  ? 'text-white bg-white/25 shadow-inner'
                  : 'text-white/60 hover:text-white hover:bg-white/15'"
                @click="switchRoom(rooms.indexOf(room))"
              >
                {{ room.name }}
              </button>
            </div>

            <!-- Drag hint -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-5 py-2 text-white/70 text-sm select-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
              Arrastra para explorar · Scroll para zoom
            </div>

            <!-- Room Menu Drawer -->
            <div
              class="absolute bottom-0 left-0 right-0 w-full bg-white/97 backdrop-blur-lg text-surface transition-all duration-500 rounded-t-3xl shadow-2xl overflow-hidden pointer-events-auto border-t border-gray-100"
              :class="menuOpen ? 'translate-y-0' : 'translate-y-full'"
            >
              <!-- Handle bar -->
              <div class="flex justify-center pt-3 pb-1">
                <div class="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div class="px-6 pb-8 pt-2 max-h-[60vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-5">
                  <h3 class="text-xl font-bold text-surface">Explorar áreas</h3>
                  <button class="text-gray-400 hover:text-gray-600 transition-colors" @click="menuOpen = false">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div v-for="group in menuGroups" :key="group.category" class="mb-6 last:mb-0">
                  <!-- Category header -->
                  <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                    <span class="flex-1 border-t border-gray-200" />
                    {{ group.category }}
                    <span class="flex-1 border-t border-gray-200" />
                  </p>

                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                      v-for="item in group.areas"
                      :key="item.area"
                      class="relative p-4 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.03] active:scale-100 group"
                      :class="currentRoom.area === item.area
                        ? 'border-primary bg-primary/30 shadow-md'
                        : 'border-gray-100 bg-gray-50 hover:border-primary/40 hover:bg-primary/5'"
                      @click="switchRoom(item.index)"
                    >
                      <div
                        class="font-semibold text-sm"
                        :class="currentRoom.area === item.area ? 'text-gray-500' : 'text-surface'"
                      >{{ item.area }}</div>
                      <div class="text-xs mt-0.5" :class="currentRoom.area === item.area ? 'text-gray-400' : 'text-gray-500'">
                        {{ rooms.filter(r => r.area === item.area).length }} vista{{ rooms.filter(r => r.area === item.area).length > 1 ? 's' : '' }}
                      </div>
                      <div
                        v-if="currentRoom.area === item.area"
                        class="absolute top-3 right-3 w-2 h-2 rounded-full bg-gray-400"
                      />
                    </button>
                  </div>
                </div>
              </div>
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
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { useTourState } from '../composables/useTourState'

const { tourOpen } = useTourState()
const tourStarted = ref(false)
const menuOpen    = ref(false)
const isLoading   = ref(false)
const tourCanvas  = ref(null)
const currentRoomIndex = ref(0)

const rooms = [
  { name: 'Salón Principal', area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama5.jpg' },
  { name: 'Vista 2',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama4.png' },
  { name: 'Vista 3',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama6.png' },
  { name: 'Vista 4',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama6_001.png' },
  { name: 'Vista 5',         area: 'Casa Club',      category: 'Áreas Sociales',        image: '/images/tour/casa club/Panorama7.jpg' },
  { name: 'Vista 1',         area: 'Salón',          category: 'Áreas Sociales',        image: '/images/tour/salon/Panorama4.png' },
  { name: 'Vista 2',         area: 'Salón',          category: 'Áreas Sociales',        image: '/images/tour/salon/Panorama5.png' },
  { name: 'Vista 1',         area: 'Palapa',         category: 'Áreas Sociales',        image: '/images/tour/palapa/Panorama5.jpg' },
  { name: 'Vista 1',         area: 'Hostal',         category: 'Áreas Sociales',        image: '/images/tour/hostal/Panorama1.jpg' },
  { name: 'Vista 2',         area: 'Hostal',         category: 'Áreas Sociales',        image: '/images/tour/hostal/Panorama2.jpg' },
  { name: 'Vista 1',         area: 'Área de Esquí',  category: 'Instalaciones',         image: '/images/tour/ski/Panorama6.jpg' },
  { name: 'Vista 2',         area: 'Área de Esquí',  category: 'Instalaciones',         image: '/images/tour/ski/Panorama7_000.jpg' },
  { name: 'Vista 1',         area: 'Stand de Tiro',  category: 'Instalaciones',         image: '/images/tour/stand de tiro/Panorama7.jpg' },
  { name: 'Vista 2',         area: 'Stand de Tiro',  category: 'Instalaciones',         image: '/images/tour/stand de tiro/Panorama8_000.jpg' },
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

function openTour() {
  tourOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.cursor = 'auto'
}


function closeTour() {
  tourOpen.value    = false
  tourStarted.value = false
  menuOpen.value    = false
  document.body.style.overflow = ''
  document.body.style.cursor = ''
  destroyThree()
}

function startTour() {
  tourStarted.value = true
  nextTick(() => initThree())
}

function switchRoom(i) {
  currentRoomIndex.value = i
  currentRoom.value      = rooms[i]
  menuOpen.value         = false
  loadPanorama(rooms[i].image)
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
  document.body.style.overflow = ''
})
</script>
