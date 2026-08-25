<template>
  <div class="p-6 max-w-2xl mx-auto">

    <div class="mb-6">
      <h2 class="text-xl font-bold" style="color:#153f35;">Precios por Categoría</h2>
      <p class="text-sm mt-0.5" style="color:#6b6b60;">
        Cambia el precio por m² de cada categoría de lote. Se aplica a todos los lotes de esa categoría.
      </p>
    </div>

    <div v-if="loading" class="space-y-2">
      <div v-for="n in 3" :key="n" class="h-14 rounded-xl animate-pulse" style="background:rgba(21,63,53,.06);"></div>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="c in categorias" :key="c"
        class="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
        style="border:1px solid rgba(21,63,53,.1); background:#fff;"
      >
        <div>
          <p class="font-bold text-sm" style="color:#153f35;">{{ c }}</p>
          <p class="text-xs" style="color:#6b6b60;">{{ conteos[c] ?? 0 }} lotes</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-mono" style="color:#6b6b60;">$</span>
          <input
            v-model.number="precios[c]"
            type="number"
            min="0"
            step="1"
            class="w-28 px-3 py-2 text-sm text-right rounded-lg border focus:outline-none focus:ring-2"
            style="border-color:rgba(21,63,53,.2); color:#153f35;"
          />
          <span class="text-xs" style="color:#6b6b60;">/m²</span>
          <button
            @click="guardar(c)"
            :disabled="guardando === c || precios[c] === original[c]"
            class="px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap"
            style="background:#153f35; color:#fff;"
            :style="guardando === c || precios[c] === original[c] ? 'opacity:.4; cursor:not-allowed;' : ''"
          >
            {{ guardando === c ? 'Guardando…' : 'Guardar' }}
          </button>
        </div>
      </div>

      <p v-if="categorias.length === 0" class="text-sm text-center py-8" style="color:rgba(21,63,53,.4);">
        No hay categorías registradas todavía.
      </p>

      <p v-if="mensaje" class="text-sm font-bold text-center pt-2" :style="mensajeError ? 'color:#dc2626;' : 'color:#15803d;'">
        {{ mensaje }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLotes, setCategoriaPrecio } from '../composables/useLotes'

const { lotes, loading } = useLotes()
const precios   = ref({})
const original  = ref({})
const guardando = ref('')
const mensaje      = ref('')
const mensajeError = ref(false)

const todasFilas = computed(() => {
  const rows = []
  for (const lista of Object.values(lotes.value)) rows.push(...lista)
  return rows
})

const categorias = computed(() => {
  const set = new Set()
  for (const l of todasFilas.value) {
    if (l.categoria) set.add(l.categoria.trim())
  }
  return [...set].sort()
})

const conteos = computed(() => {
  const c = {}
  for (const l of todasFilas.value) {
    if (!l.categoria) continue
    c[l.categoria] = (c[l.categoria] ?? 0) + 1
  }
  return c
})

watch(categorias, (list) => {
  for (const c of list) {
    if (precios.value[c] === undefined) {
      const sample = todasFilas.value.find(l => l.categoria === c)
      precios.value[c]  = sample?.precio ?? 0
      original.value[c] = sample?.precio ?? 0
    }
  }
}, { immediate: true })

async function guardar(categoria) {
  guardando.value = categoria
  mensaje.value   = ''
  try {
    await setCategoriaPrecio(categoria, precios.value[categoria])
    original.value[categoria] = precios.value[categoria]
    mensaje.value      = `Precio de "${categoria}" actualizado.`
    mensajeError.value = false
  } catch (e) {
    console.error('Error guardando precio:', e)
    mensaje.value      = 'No se pudo guardar el precio. Intenta de nuevo.'
    mensajeError.value = true
  } finally {
    guardando.value = ''
  }
}
</script>
