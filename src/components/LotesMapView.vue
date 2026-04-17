<script setup>
import { ref, computed, watch } from 'vue'
import { useLotes } from '../composables/useLotes.js'

const props = defineProps({
    selectedManzana: { type: String, default: null },
    selectedLoteIndex: { type: Number, default: null },
    cotizarOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['select-lot'])

const { lotes, loading } = useLotes()

const hoveredLote = ref(null)

const manzanas = computed(() => Object.keys(lotes.value).sort())

const STATUS_COLOR = {
    DISPONIBLE: { fill: '#22c55e', stroke: '#16a34a', text: '#14532d' },
    APARTADO: { fill: '#f59e0b', stroke: '#d97706', text: '#78350f' },
    RESERVADO: { fill: '#94a3b8', stroke: '#64748b', text: '#1e293b' },
    VENDIDO: { fill: '#ef4444', stroke: '#dc2626', text: '#7f1d1d' },
}

function statusColor(estatus) {
    return STATUS_COLOR[estatus] || STATUS_COLOR.RESERVADO
}

const selectedKey = computed(() => {
    if (!props.selectedManzana) return null
    return props.selectedManzana.replace(/^_?MANZANA_/, '')
})

const COL_W = 32
const COL_H = 24
const COL_GAP = 2
const MZ_PAD = 10
const MZ_LABEL = 20
const LOTS_PER_ROW = 10

function lotRect(index) {
    const col = index % LOTS_PER_ROW
    const row = Math.floor(index / LOTS_PER_ROW)
    return {
        x: MZ_PAD + col * (COL_W + COL_GAP),
        y: MZ_PAD + MZ_LABEL + row * (COL_H + COL_GAP),
    }
}

const layout = computed(() => {
    const groups = []
    for (const mz of manzanas.value) {
        const lots = lotes.value[mz] || []
        const rows = Math.ceil(lots.length / LOTS_PER_ROW)
        const groupH = MZ_PAD + MZ_LABEL + rows * (COL_H + COL_GAP) + MZ_PAD
        const groupW = MZ_PAD + LOTS_PER_ROW * (COL_W + COL_GAP) - COL_GAP + MZ_PAD
        groups.push({ mz, lots, groupH, groupW })
    }
    return groups
})

const grid = computed(() => {
    const rows = []
    const cols = 3
    for (let i = 0; i < layout.value.length; i += cols) {
        rows.push(layout.value.slice(i, i + cols))
    }
    return rows
})

function selectLot(mz, lote) {
    hoveredLote.value = { manzana: mz, lote }
    emit('select-lot', { manzana: `MANZANA_${mz}`, loteIndex: lote.lote })
}

function clearHover() {
    hoveredLote.value = null
}

watch(
    [() => props.selectedManzana, () => props.selectedLoteIndex, lotes],
    ([manzana, loteIndex]) => {
        if (!manzana || loteIndex === null) {
            hoveredLote.value = null
            return
        }
        const key = manzana.replace(/^_?MANZANA_/, '')
        const lots = lotes.value[key] || []
        const found = lots.find(l => l.lote === loteIndex)
        if (found) {
            hoveredLote.value = { manzana: key, lote: found }
        }
    },
    { immediate: false }
)

watch(() => props.cotizarOpen, (open) => {
    if (open) hoveredLote.value = null
})

const GROUP_W = MZ_PAD + LOTS_PER_ROW * (COL_W + COL_GAP) - COL_GAP + MZ_PAD

function fmt(v) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v)
}
function fmtArea(v) {
    return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
}
</script>

<template>
    <div class="w-full h-full overflow-auto bg-slate-900 p-4 relative" @click.self="clearHover">
        <!-- Legend -->
        <div class="flex flex-wrap gap-4 mb-4 px-2">
            <div v-for="(colors, status) in STATUS_COLOR" :key="status" class="flex items-center gap-1.5">
                <div class="w-4 h-3 rounded-sm border"
                    :style="`background:${colors.fill};border-color:${colors.stroke}`"></div>
                <span class="text-xs text-slate-300 font-semibold">{{ status }}</span>
            </div>
        </div>

        <p v-if="loading" class="text-slate-400 text-sm text-center py-20">Cargando lotes…</p>

        <div v-else class="flex flex-col gap-4">
            <div v-for="(row, ri) in grid" :key="ri" class="flex gap-4 flex-wrap">
                <div v-for="group in row" :key="group.mz" class="relative">
                    <svg :width="GROUP_W" :height="group.groupH" :viewBox="`0 0 ${GROUP_W} ${group.groupH}`"
                        class="overflow-visible rounded-lg"
                        :class="selectedKey === group.mz ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900' : ''">
                        <rect x="0" y="0" :width="GROUP_W" :height="group.groupH"
                            :fill="selectedKey === group.mz ? '#1e293b' : '#0f172a'" rx="8" />
                        <rect x="0" y="0" :width="GROUP_W" :height="MZ_LABEL + MZ_PAD" fill="#1e40af" rx="8" />
                        <rect x="0" :y="MZ_LABEL + MZ_PAD - 4" :width="GROUP_W" height="8" fill="#1e40af" />
                        <text :x="GROUP_W / 2" :y="MZ_LABEL - 2" text-anchor="middle" font-size="11" font-weight="bold"
                            fill="white" font-family="Inter, sans-serif">SEC {{ group.mz }}</text>
                        <text :x="GROUP_W - MZ_PAD" :y="MZ_LABEL - 2" text-anchor="end" font-size="9" fill="#93c5fd"
                            font-family="Inter, sans-serif">
                            {{group.lots.filter(l => l.estatus === 'DISPONIBLE').length}}/{{ group.lots.length }}
                        </text>

                        <g v-for="(lot, idx) in group.lots" :key="lot.lote">
                            <rect :x="lotRect(idx).x" :y="lotRect(idx).y" :width="COL_W" :height="COL_H"
                                :fill="statusColor(lot.estatus).fill" :stroke="statusColor(lot.estatus).stroke"
                                stroke-width="1" rx="3" class="cursor-pointer transition-opacity hover:opacity-80"
                                :opacity="hoveredLote?.manzana === group.mz && hoveredLote?.lote?.lote === lot.lote ? 1 : 0.92"
                                @click.stop="selectLot(group.mz, lot)" />
                            <text :x="lotRect(idx).x + COL_W / 2" :y="lotRect(idx).y + COL_H / 2 + 4"
                                text-anchor="middle" font-size="8" font-weight="bold"
                                :fill="statusColor(lot.estatus).text" font-family="Inter, sans-serif"
                                pointer-events="none">{{ lot.lote }}</text>
                        </g>

                        <g v-if="hoveredLote?.manzana === group.mz">
                            <rect v-for="(lot, idx) in group.lots" :key="`hl-${lot.lote}`"
                                v-show="hoveredLote?.lote?.lote === lot.lote" :x="lotRect(idx).x - 2"
                                :y="lotRect(idx).y - 2" :width="COL_W + 4" :height="COL_H + 4" fill="none"
                                stroke="#60a5fa" stroke-width="2" rx="5" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
