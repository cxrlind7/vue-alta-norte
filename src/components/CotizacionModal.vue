<script setup>
import { ref, computed, watch } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAdminState } from '../composables/useAdminState'
import { setLoteEstatus, refreshReservations } from '../composables/useLotes'

const { isAdmin } = useAdminState()

const props = defineProps({
    lote: { type: Object, default: null },
    manzana: { type: String, default: '' }
})

const emit = defineEmits(['close', 'confirm'])

const clienteNombre = ref('PÚBLICO GENERAL')
const enganchePct = ref(20)
const plazoMeses = ref(24)

const PLAZO_OPCIONES = [6, 12, 18, 24, 36, 48, 60]

const precioTotal = computed(() =>
    props.lote ? props.lote.superficie * props.lote.precio : 0
)

const engancheAmt = computed(() =>
    precioTotal.value * (enganchePct.value / 100)
)

const saldo = computed(() =>
    precioTotal.value - engancheAmt.value
)

const montoPago = computed(() =>
    plazoMeses.value > 0 ? saldo.value / plazoMeses.value : 0
)

const tablaDePageos = computed(() => {
    const rows = []
    let saldoActual = saldo.value
    const now = new Date()

    for (let i = 1; i <= plazoMeses.value; i++) {
        const fecha = new Date(now.getFullYear(), now.getMonth() + i, now.getDate())
        const monto = montoPago.value
        const saldoFinal = saldoActual - monto
        rows.push({
            no: i,
            fecha: fecha.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            saldoInicial: saldoActual,
            monto,
            saldoFinal: Math.max(0, saldoFinal)
        })
        saldoActual = Math.max(0, saldoFinal)
    }
    return rows
})

function fmt(v) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(v)
}

function fmtArea(v) {
    return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
}

async function reservarLote() {
    if (!props.lote || !props.manzana) return
    await setLoteEstatus(props.manzana, props.lote.lote, 'APARTADO')
    emit('confirm', {
        manzana: props.manzana,
        lote: props.lote,
        cliente: clienteNombre.value,
        plazo: plazoMeses.value,
        enganchePct: enganchePct.value,
        precioTotal: precioTotal.value,
        engancheAmt: engancheAmt.value,
        saldo: saldo.value,
        montoPago: montoPago.value
    })
}

function imprimirCotizacion() {
    const printContent = document.getElementById('cotizacion-print-area')
    if (!printContent) return
    const w = window.open('', '_blank', 'width=900,height=1200')
    w.document.write(`
    <html><head><title>Cotización Alta Norte</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; font-family: Inter, sans-serif; }
      body { background: white; color: #1a1a2e; padding: 40px; }
      .header { text-align: center; margin-bottom: 32px; }
      .brand { font-size: 28px; font-weight: 900; color: #1a1a2e; letter-spacing: -1px; }
      .sub { font-size: 12px; color: #666; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
      table.info { border-collapse: collapse; width: 60%; margin: 0 auto 24px; }
      table.info td { border: 1px solid #ccc; padding: 6px 12px; font-size: 13px; }
      table.info td:first-child { background: #4a7c59; color: white; font-weight: 700; width: 40%; }
      table.payments { border-collapse: collapse; width: 100%; margin-top: 24px; font-size: 12px; }
      table.payments th { background: #1a1a2e; color: white; padding: 8px 4px; text-align: right; }
      table.payments th:first-child { text-align: center; }
      table.payments td { padding: 6px 4px; text-align: right; border-bottom: 1px solid #eee; }
      table.payments td:first-child { text-align: center; }
      table.payments tr:nth-child(even) { background: #f8f8f8; }
      .note { margin-top: 32px; font-size: 11px; font-weight: 700; text-align: center; color: #333; }
      .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 10px; color: #999; }
      .footer-center { text-align: center; color: #4a7c59; font-weight: 700; }
    </style></head><body>
    ${printContent.innerHTML}
    </body></html>
  `)
    w.document.close()
    w.focus()
    setTimeout(() => { w.print(); w.close() }, 500)
}

const enviandoCorreo = ref(false)

function buildPdfBlob() {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W   = doc.internal.pageSize.getWidth()

    // Header
    doc.setFillColor(26, 26, 46)
    doc.rect(0, 0, W, 28, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('RESERVA ALTA NORTE', W / 2, 13, { align: 'center' })
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Ski, Camping & Resort', W / 2, 20, { align: 'center' })

    // Info table
    autoTable(doc, {
        startY: 34,
        margin: { left: 30, right: 30 },
        head: [],
        body: [
            ['CLIENTE',       clienteNombre.value],
            ['SECCIÓN',       `SECCIÓN ${props.manzana}`],
            ['LOTE',          `LOTE ${props.lote.lote}`],
            ['SUPERFICIE',    `${fmtArea(props.lote.superficie)} m²`],
            ['PRECIO M²',     fmt(props.lote.precio)],
            ['PRECIO TOTAL',  fmt(precioTotal.value)],
            ['ENGANCHE',      fmt(engancheAmt.value)],
            ['SALDO',         fmt(saldo.value)],
            ['PLAZOS',        `${plazoMeses.value} meses`],
        ],
        columnStyles: {
            0: { fillColor: [74, 124, 89], textColor: 255, fontStyle: 'bold', cellWidth: 50 },
            1: { textColor: [26, 26, 46] },
        },
        styles: { fontSize: 10, cellPadding: 3 },
        theme: 'grid',
    })

    // Payment schedule
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 8,
        margin: { left: 10, right: 10 },
        head: [['No.', 'Fecha', 'Saldo Inicial', 'Monto Pago', 'Saldo Final']],
        body: tablaDePageos.value.map(r => [
            r.no, r.fecha, fmt(r.saldoInicial), fmt(r.monto), fmt(r.saldoFinal)
        ]),
        headStyles: { fillColor: [26, 26, 46], textColor: 255, fontStyle: 'bold', fontSize: 9 },
        styles: { fontSize: 8, halign: 'right' },
        columnStyles: { 0: { halign: 'center' }, 1: { halign: 'center' } },
        alternateRowStyles: { fillColor: [248, 248, 248] },
        theme: 'grid',
    })

    // Note + footer
    const footerY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(8)
    doc.setTextColor(100)
    doc.setFont('helvetica', 'bold')
    doc.text('NOTA: LOS PRECIOS PUEDEN CAMBIAR EN CUALQUIER MOMENTO SIN PREVIO AVISO.', W / 2, footerY, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(150)
    doc.text('© 2026 – Alta Norte', 10, footerY + 8)
    doc.setTextColor(74, 124, 89)
    doc.setFont('helvetica', 'bold')
    doc.text('RESERVA ALTA NORTE', W / 2, footerY + 8, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150)
    doc.text('Página 1 de 1', W - 10, footerY + 8, { align: 'right' })

    return doc.output('blob')
}

async function enviarPorCorreo() {
    if (!props.lote) return
    enviandoCorreo.value = true

    try {
        const blob     = buildPdfBlob()
        const filename = `cotizacion-alta-norte-${props.manzana}-lote${props.lote.lote}.pdf`
        const file     = new File([blob], filename, { type: 'application/pdf' })
        const subject  = `Cotización Alta Norte – Sección ${props.manzana} Lote ${props.lote.lote} – ${clienteNombre.value}`
        const body     = `Estimado/a ${clienteNombre.value},\n\nAdjunto encontrará la cotización para el lote solicitado:\n\n• Sección: ${props.manzana}\n• Lote: ${props.lote.lote}\n• Superficie: ${fmtArea(props.lote.superficie)} m²\n• Precio total: ${fmt(precioTotal.value)}\n• Enganche (${enganchePct.value}%): ${fmt(engancheAmt.value)}\n• Plazo: ${plazoMeses.value} meses\n• Pago mensual: ${fmt(montoPago.value)}\n\nQuedo en espera de su confirmación.\n\nSaludos,\nEquipo Alta Norte`

        const to = import.meta.env.VITE_CONTACT_EMAIL || ''

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: subject, text: body })
        } else {
            const url = URL.createObjectURL(blob)
            const a   = document.createElement('a')
            a.href = url; a.download = filename; a.click()
            URL.revokeObjectURL(url)
            setTimeout(() => {
                window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            }, 600)
        }
    } finally {
        enviandoCorreo.value = false
    }
}

watch(() => props.lote, () => {
    enganchePct.value = 20
    plazoMeses.value = 24
    clienteNombre.value = 'PÚBLICO GENERAL'
})
</script>

<template>
    <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative min-h-screen flex items-start justify-center py-6 px-4">
            <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col">

                <div class="bg-gradient-to-r from-slate-900 to-blue-950 px-8 py-5 flex justify-between items-center">
                    <div>
                        <p class="text-blue-300 text-xs font-bold uppercase tracking-widest">Cotización</p>
                        <h2 class="text-white text-2xl font-extrabold mt-0.5">Reserva Alta Norte</h2>
                    </div>
                    <button @click="$emit('close')" class="text-white/50 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex flex-col lg:flex-row gap-0">

                    <div class="flex-1 px-8 py-6 space-y-6">

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Cliente</label>
                                <input v-model="clienteNombre"
                                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nombre del cliente" />
                            </div>
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Lote</label>
                                <div
                                    class="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50">
                                    Sección <span class="font-bold">{{ manzana }}</span> – Lote <span
                                        class="font-bold">{{ lote?.lote }}</span>
                                </div>
                            </div>
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Superficie</label>
                                <div
                                    class="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 font-semibold">
                                    {{ fmtArea(lote?.superficie) }} m²
                                </div>
                            </div>
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Precio
                                    m²</label>
                                <div
                                    class="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 font-semibold">
                                    {{ fmt(lote?.precio) }}
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Enganche
                                    (%)</label>
                                <select v-model="enganchePct"
                                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option v-for="p in [10, 15, 20, 25, 30, 40, 50]" :key="p" :value="p">{{ p }}%
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Plazo
                                    (meses)</label>
                                <select v-model="plazoMeses"
                                    class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option v-for="m in PLAZO_OPCIONES" :key="m" :value="m">{{ m }} meses</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Tabla de Pagos</h3>
                            <div class="overflow-auto max-h-64 rounded-lg border border-slate-100">
                                <table class="min-w-full text-xs">
                                    <thead class="sticky top-0 bg-slate-900 text-white">
                                        <tr>
                                            <th class="py-2 px-3 text-center">No.</th>
                                            <th class="py-2 px-3 text-right">Fecha</th>
                                            <th class="py-2 px-3 text-right">Saldo Inicial</th>
                                            <th class="py-2 px-3 text-right">Monto Pago</th>
                                            <th class="py-2 px-3 text-right">Saldo Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in tablaDePageos" :key="row.no"
                                            class="border-b border-slate-50 even:bg-slate-50">
                                            <td class="py-1.5 px-3 text-center font-semibold">{{ row.no }}</td>
                                            <td class="py-1.5 px-3 text-right text-slate-500">{{ row.fecha }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono">{{ fmt(row.saldoInicial) }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono text-blue-700 font-semibold">{{
                                                fmt(row.monto) }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono">{{ fmt(row.saldoFinal) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div class="lg:w-72 bg-slate-50 border-l border-slate-100 px-6 py-6 flex flex-col gap-4">
                        <h3 class="text-base font-extrabold text-gray-800">Resumen de Pago</h3>

                        <div class="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-500">Total:</span>
                                <span class="font-bold text-gray-800">{{ fmt(precioTotal) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-500">Pago Inicial {{ enganchePct }}%:</span>
                                <span class="font-bold text-emerald-700">{{ fmt(engancheAmt) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-500">Saldo:</span>
                                <span class="font-bold text-gray-800">{{ fmt(saldo) }}</span>
                            </div>
                            <div class="border-t border-slate-100 pt-3">
                                <div class="text-xs text-gray-500 mb-1 font-semibold">{{ plazoMeses }} Pagos de:</div>
                                <div class="text-2xl font-black text-blue-900">{{ fmt(montoPago) }}</div>
                                <div class="text-xs text-gray-400 mt-0.5">mensual</div>
                            </div>
                        </div>

                        <div
                            class="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 text-xs text-slate-600 shadow-sm">
                            <div class="flex justify-between gap-2">
                                <span class="text-gray-400 uppercase tracking-wide font-semibold">Sección</span>
                                <span class="font-bold">{{ manzana }}</span>
                            </div>
                            <div class="flex justify-between gap-2">
                                <span class="text-gray-400 uppercase tracking-wide font-semibold">Lote</span>
                                <span class="font-bold">{{ lote?.lote }}</span>
                            </div>
                            <div class="flex justify-between gap-2">
                                <span class="text-gray-400 uppercase tracking-wide font-semibold">m²</span>
                                <span class="font-bold">{{ fmtArea(lote?.superficie) }}</span>
                            </div>
                            <div class="flex justify-between gap-2">
                                <span class="text-gray-400 uppercase tracking-wide font-semibold">Categoría</span>
                                <span class="font-bold">{{ lote?.categoria || '—' }}</span>
                            </div>
                        </div>

                        <div class="space-y-2 mt-auto">
                            <button @click="enviarPorCorreo" :disabled="enviandoCorreo"
                                class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow">
                                <svg v-if="!enviandoCorreo" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                {{ enviandoCorreo ? 'Generando PDF…' : 'Enviar por Correo' }}
                            </button>
                            <button @click="imprimirCotizacion"
                                class="w-full py-2.5 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Imprimir Cotización
                            </button>
                            <button v-if="isAdmin" @click="reservarLote"
                                class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                                Apartar Lote (2 días)
                            </button>
                        </div>
                    </div>
                </div>

                <div id="cotizacion-print-area" class="hidden">
                    <div class="header">
                        <div class="brand">RESERVA ALTA NORTE</div>
                        <div class="sub">Ski, Camping &amp; Resort</div>
                    </div>
                    <table class="info">
                        <tbody>
                            <tr>
                                <td>CLIENTE:</td>
                                <td>{{ clienteNombre }}</td>
                            </tr>
                            <tr>
                                <td>SECCIÓN:</td>
                                <td>SECCIÓN {{ manzana }}</td>
                            </tr>
                            <tr>
                                <td>LOTE:</td>
                                <td>LOTE {{ lote?.lote }}</td>
                            </tr>
                            <tr>
                                <td>MTS2:</td>
                                <td>{{ fmtArea(lote?.superficie) }}</td>
                            </tr>
                            <tr>
                                <td>PRECIO MTS2:</td>
                                <td>{{ fmt(lote?.precio) }}</td>
                            </tr>
                            <tr>
                                <td>PRECIO TOTAL:</td>
                                <td>{{ fmt(precioTotal) }}</td>
                            </tr>
                            <tr>
                                <td>ENGANCHE:</td>
                                <td>{{ fmt(engancheAmt) }}</td>
                            </tr>
                            <tr>
                                <td>SALDO:</td>
                                <td>{{ fmt(saldo) }}</td>
                            </tr>
                            <tr>
                                <td>PLAZOS:</td>
                                <td>{{ plazoMeses }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="payments">
                        <thead>
                            <tr>
                                <th>NO. PAGOS</th>
                                <th>FECHA PAGO</th>
                                <th>SALDO INICIAL</th>
                                <th>MONTO PAGO</th>
                                <th>SALDO FINAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in tablaDePageos" :key="row.no">
                                <td>{{ row.no }}</td>
                                <td>{{ row.fecha }}</td>
                                <td>{{ fmt(row.saldoInicial) }}</td>
                                <td>{{ fmt(row.monto) }}</td>
                                <td>{{ fmt(row.saldoFinal) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="note">NOTA: LOS PRECIOS PUEDEN CAMBIAR EN CUALQUIER MOMENTO SIN PREVIO AVISO.</p>
                    <div class="footer">
                        <span>© 2026 – Alta Norte</span>
                        <span class="footer-center">RESERVA ALTA NORTE</span>
                        <span>Página 1 de 1</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
