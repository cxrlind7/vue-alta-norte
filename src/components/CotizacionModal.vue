<script setup>
import { ref, computed, watch } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useAdminState } from '../composables/useAdminState'
import { setLoteEstatus } from '../composables/useLotes'
import { supabase } from '../lib/supabase'
import { useI18n } from '../composables/useI18n.js'

const { isAdmin } = useAdminState()
const { t } = useI18n()

const props = defineProps({
    lote:    { type: Object, default: null },
    manzana: { type: String, default: '' }
})
const emit = defineEmits(['close', 'confirm'])

const clienteNombre    = ref('')
const clienteApellido  = ref('')
const clienteTelefono  = ref('')
const clienteEmail     = ref('')
const enganchePct      = ref(20)
const plazoMeses       = ref(48)

const guardando        = ref(false)
const duplicadoError   = ref('')   // mensaje de error de duplicado

// Financiamiento hasta 48 meses, enganche desde 20 %
const PLAZO_OPCIONES    = [48]
const ENGANCHE_OPCIONES = [20, 25, 30, 40, 50]

const emailValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clienteEmail.value))

const nombreCompleto = computed(() =>
    `${clienteNombre.value.trim()} ${clienteApellido.value.trim()}`.trim()
)

const formularioInvalido = computed(() =>
    !clienteNombre.value.trim() ||
    !clienteApellido.value.trim() ||
    clienteTelefono.value.length !== 10 ||
    !emailValido.value
)

const precioTotal = computed(() => props.lote ? props.lote.superficie * props.lote.precio : 0)
const engancheAmt = computed(() => precioTotal.value * (enganchePct.value / 100))
const saldo       = computed(() => precioTotal.value - engancheAmt.value)
const montoPago   = computed(() => plazoMeses.value > 0 ? saldo.value / plazoMeses.value : 0)

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
        manzana: props.manzana, lote: props.lote,
        cliente: clienteNombre.value, plazo: plazoMeses.value,
        enganchePct: enganchePct.value, precioTotal: precioTotal.value,
        engancheAmt: engancheAmt.value, saldo: saldo.value, montoPago: montoPago.value
    })
}

// ── PDF ──────────────────────────────────────────────────────────────────────
// Brand colours as RGB arrays for jsPDF
const C_GREEN = [21, 63, 53]   // #153f35
const C_SAGE  = [174, 188, 130] // #aebc82
const C_WHITE = [255, 255, 255]
const C_TEXT  = [26, 26, 24]
const C_MUTED = [107, 107, 96]

function buildPdfBlob() {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W   = doc.internal.pageSize.getWidth()

    // ── Header band ──────────────────────────────────────────────────────────
    doc.setFillColor(...C_GREEN)
    doc.rect(0, 0, W, 30, 'F')

    // Sage accent line at bottom of header
    doc.setFillColor(...C_SAGE)
    doc.rect(0, 30, W, 1.2, 'F')

    doc.setTextColor(...C_WHITE)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('RESERVA ALTA NORTE', W / 2, 12, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(174, 188, 130)
    doc.text('Ski, Camping & Resort · Sierra Madre', W / 2, 19, { align: 'center' })

    doc.setTextColor(...C_WHITE)
    doc.setFontSize(7)
    const today = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })
    doc.text(`Cotización — ${today}`, W / 2, 25, { align: 'center' })

    // ── Info table ───────────────────────────────────────────────────────────
    autoTable(doc, {
        startY: 37,
        margin: { left: 25, right: 25 },
        head: [],
        body: [
            ['CLIENTE',      nombreCompleto.value],
            ['TELÉFONO',     clienteTelefono.value],
            ['CORREO',       clienteEmail.value],
            ['SECCIÓN',      `SECCIÓN ${props.manzana}`],
            ['LOTE',         `LOTE ${props.lote.lote}`],
            ['SUPERFICIE',   `${fmtArea(props.lote.superficie)} m²`],
            ['PRECIO / m²',  fmt(props.lote.precio)],
            ['PRECIO TOTAL', fmt(precioTotal.value)],
            ['ENGANCHE ' + enganchePct.value + '%', fmt(engancheAmt.value)],
            ['SALDO',        fmt(saldo.value)],
            ['PLAZO',        `${plazoMeses.value} meses`],
            ['PAGO MENSUAL', fmt(montoPago.value)],
        ],
        columnStyles: {
            0: { fillColor: C_GREEN, textColor: C_SAGE, fontStyle: 'bold', cellWidth: 48 },
            1: { textColor: C_TEXT, fontStyle: 'bold' },
        },
        styles: { fontSize: 10, cellPadding: 3.5 },
        theme: 'grid',
    })

    // ── Payment schedule ─────────────────────────────────────────────────────
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        margin: { left: 10, right: 10 },
        head: [['No.', 'Fecha de Pago', 'Saldo Inicial', 'Monto Pago', 'Saldo Final']],
        body: tablaDePageos.value.map(r => [
            r.no, r.fecha, fmt(r.saldoInicial), fmt(r.monto), fmt(r.saldoFinal)
        ]),
        headStyles: {
            fillColor: C_GREEN, textColor: C_WHITE, fontStyle: 'bold', fontSize: 9,
            halign: 'center',
        },
        styles: { fontSize: 8, halign: 'right' },
        columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'center' },
            3: { textColor: C_GREEN, fontStyle: 'bold' },
        },
        alternateRowStyles: { fillColor: [246, 246, 244] },
        theme: 'grid',
    })

    // ── Footer ───────────────────────────────────────────────────────────────
    const footerY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...C_MUTED)
    doc.text('NOTA: LOS PRECIOS PUEDEN CAMBIAR EN CUALQUIER MOMENTO SIN PREVIO AVISO.', W / 2, footerY, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    const usdLines = doc.splitTextToSize(t.value.cotizador.usdNote, W - 40)
    doc.text(usdLines, W / 2, footerY + 6, { align: 'center' })

    doc.setFillColor(...C_SAGE)
    doc.rect(10, footerY + 14, W - 20, 0.6, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...C_MUTED)
    doc.text('© 2026 – Reserva Alta Norte', 10, footerY + 21)

    doc.setTextColor(...C_GREEN)
    doc.setFont('helvetica', 'bold')
    doc.text('altanorte.mx', W / 2, footerY + 21, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...C_MUTED)
    doc.text(`Página 1 de 1`, W - 10, footerY + 21, { align: 'right' })

    return doc.output('blob')
}

// Guarda en Supabase; retorna true si OK, false si duplicado, null si sin Supabase
async function saveCotizacion() {
    if (!supabase || !props.lote) return null
    const { error } = await supabase.from('cotizaciones').insert({
        cliente_nombre:   clienteNombre.value.trim(),
        cliente_apellido: clienteApellido.value.trim(),
        cliente_telefono: clienteTelefono.value,
        cliente_email:    clienteEmail.value,
        seccion:          props.manzana,
        lote_num:         props.lote.lote,
        superficie:       props.lote.superficie,
        precio_por_m2:    props.lote.precio,
        precio_total:     precioTotal.value,
        enganche_pct:     enganchePct.value,
        enganche_amt:     engancheAmt.value,
        saldo:            saldo.value,
        plazo_meses:      plazoMeses.value,
        pago_mensual:     montoPago.value,
    })
    if (error) {
        if (error.code === '23505') {
            if (error.message?.includes('telefono') || error.details?.includes('telefono')) {
                duplicadoError.value = 'Este número de teléfono ya tiene una cotización registrada.'
            } else if (error.message?.includes('email') || error.details?.includes('email')) {
                duplicadoError.value = 'Este correo electrónico ya tiene una cotización registrada.'
            } else {
                duplicadoError.value = 'Ya existe una cotización con estos datos.'
            }
            return false
        }
        console.warn('Error al guardar cotización:', error)
        return null
    }
    return true
}

async function descargarPDF() {
    if (formularioInvalido.value) return
    duplicadoError.value = ''
    guardando.value = true
    const resultado = await saveCotizacion()
    guardando.value = false
    if (resultado === false) return   // duplicado — no descargar
    const blob = buildPdfBlob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `Cotizacion-AltaNorte-Sec${props.manzana}-Lote${props.lote?.lote}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

async function enviarPorCorreo() {
    if (!props.lote || formularioInvalido.value) return
    duplicadoError.value = ''
    guardando.value = true
    const resultado = await saveCotizacion()
    guardando.value = false
    if (resultado === false) return   // duplicado — no enviar
    const to      = import.meta.env.VITE_CONTACT_EMAIL || ''
    const subject = `Interés de compra – Sección ${props.manzana} Lote ${props.lote.lote} – ${nombreCompleto.value}`
    const body    = `Hola equipo de Alta Norte,\n\nMi nombre es ${nombreCompleto.value} y estoy interesado/a en adquirir el siguiente lote.\n\nTELÉFONO: ${clienteTelefono.value}\n\n• Sección: ${props.manzana}\n• Lote: ${props.lote.lote}\n• Superficie: ${fmtArea(props.lote.superficie)} m²\n• Precio total: ${fmt(precioTotal.value)}\n• Enganche (${enganchePct.value}%): ${fmt(engancheAmt.value)}\n• Plazo: ${plazoMeses.value} meses\n• Pago mensual: ${fmt(montoPago.value)}\n\nQuedo en espera de su contacto.\n\n${nombreCompleto.value}`
    const link = document.createElement('a')
    link.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

watch(() => props.lote, () => {
    enganchePct.value      = 20
    plazoMeses.value       = 24
    clienteNombre.value    = ''
    clienteApellido.value  = ''
    clienteTelefono.value  = ''
    clienteEmail.value     = ''
    duplicadoError.value   = ''
})
</script>

<template>
    <div class="fixed inset-0 z-50 overflow-y-auto" style="font-family:'Amble',sans-serif;">
        <div class="fixed inset-0 bg-black/65 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative min-h-screen flex items-start justify-center py-6 px-4">
            <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col">

                <!-- Header -->
                <div class="px-8 py-5 flex justify-between items-center"
                     style="background:#153f35;">
                    <!-- Sage accent line at bottom -->
                    <div class="absolute bottom-0 left-0 right-0 h-0.5" style="background:#aebc82;"></div>
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[.35em]" style="color:#aebc82;">
                            Cotización
                        </p>
                        <h2 class="text-white text-2xl font-bold mt-0.5 tracking-wide">Reserva Alta Norte</h2>
                    </div>
                    <!-- Lot badge -->
                    <div class="hidden sm:flex items-center gap-6 text-white/70 text-sm">
                        <div class="text-center">
                            <div class="text-[10px] uppercase tracking-widest font-bold" style="color:#aebc82;">Sección</div>
                            <div class="font-bold text-white text-base">{{ manzana }}</div>
                        </div>
                        <div class="w-px h-8 bg-white/15"></div>
                        <div class="text-center">
                            <div class="text-[10px] uppercase tracking-widest font-bold" style="color:#aebc82;">Lote</div>
                            <div class="font-bold text-white text-base">{{ lote?.lote }}</div>
                        </div>
                        <div class="w-px h-8 bg-white/15"></div>
                        <div class="text-center">
                            <div class="text-[10px] uppercase tracking-widest font-bold" style="color:#aebc82;">m²</div>
                            <div class="font-bold text-white text-base">{{ fmtArea(lote?.superficie) }}</div>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="text-white/40 hover:text-white transition-colors ml-4">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex flex-col lg:flex-row gap-0">

                    <!-- ── Left: form + table ────────────────────────────────── -->
                    <div class="flex-1 px-8 py-6 space-y-5">

                        <!-- Client fields -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                       style="color:#153f35;">Nombre *</label>
                                <input v-model="clienteNombre"
                                    class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                    style="border:1px solid rgba(21,63,53,.2); color:#153f35; background:#fff;
                                           --tw-ring-color:rgba(21,63,53,.3);"
                                    placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                       style="color:#153f35;">Apellido *</label>
                                <input v-model="clienteApellido"
                                    class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                    style="border:1px solid rgba(21,63,53,.2); color:#153f35; background:#fff;
                                           --tw-ring-color:rgba(21,63,53,.3);"
                                    placeholder="Tu apellido" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                       style="color:#153f35;">Teléfono * (10 dígitos)</label>
                                <input
                                    :value="clienteTelefono"
                                    @keydown="!/^\d$/.test($event.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].includes($event.key) && $event.preventDefault()"
                                    @input="clienteTelefono = $event.target.value = $event.target.value.replace(/\D/g,'').slice(0,10)"
                                    inputmode="numeric"
                                    maxlength="10"
                                    class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                    :style="{
                                        border: clienteTelefono.length > 0 && clienteTelefono.length !== 10
                                            ? '1px solid #e53e3e'
                                            : '1px solid rgba(21,63,53,.2)',
                                        color: '#153f35', background: '#fff'
                                    }"
                                    placeholder="10 dígitos" />
                            </div>
                            <div>
                                <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                       style="color:#153f35;">Correo Electrónico *</label>
                                <input v-model="clienteEmail" type="email"
                                    class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                    :style="{
                                        border: clienteEmail.length > 0 && !emailValido
                                            ? '1px solid #e53e3e'
                                            : '1px solid rgba(21,63,53,.2)',
                                        color: '#153f35', background: '#fff'
                                    }"
                                    placeholder="tu@correo.com" />
                            </div>
                        </div>

                        <!-- Error duplicado -->
                        <div v-if="duplicadoError"
                             class="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
                             style="background:#fff1f0; border:1px solid #fca5a5; color:#b91c1c;">
                            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                            </svg>
                            {{ duplicadoError }}
                        </div>

                        <!-- Enganche + Plazo — with badge info -->
                        <div>
                            <div class="flex items-center gap-3 mb-3">
                                <span class="text-[10px] font-bold uppercase tracking-[.3em]" style="color:#153f35;">
                                    Condiciones de Pago
                                </span>
                                <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                      style="background:rgba(174,188,130,.18); color:#153f35;">
                                    Enganche desde 20%
                                </span>
                                <!-- <span class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                      style="background:rgba(174,188,130,.18); color:#153f35;">
                                    Hasta 48 meses
                                </span> -->
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                           style="color:#6b6b60;">Enganche (%)</label>
                                    <select v-model="enganchePct"
                                        class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                        style="border:1px solid rgba(21,63,53,.2); color:#153f35; background:#fff;">
                                        <option v-for="p in ENGANCHE_OPCIONES" :key="p" :value="p">{{ p }}%</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-[10px] font-bold uppercase tracking-[.3em] block mb-1.5"
                                           style="color:#6b6b60;">Plazo (meses)</label>
                                    <select v-model="plazoMeses"
                                        class="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                                        style="border:1px solid rgba(21,63,53,.2); color:#153f35; background:#fff;">
                                        <option v-for="m in PLAZO_OPCIONES" :key="m" :value="m">{{ m }} meses</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Payment table -->
                        <div>
                            <h3 class="text-[10px] font-bold uppercase tracking-[.3em] mb-3"
                                style="color:#153f35;">Tabla de Pagos</h3>
                            <div class="overflow-auto max-h-64 rounded-xl" style="border:1px solid rgba(21,63,53,.1);">
                                <table class="min-w-full text-xs">
                                    <thead class="sticky top-0" style="background:#153f35;">
                                        <tr>
                                            <th class="py-2.5 px-3 text-center text-white font-bold tracking-wide">No.</th>
                                            <th class="py-2.5 px-3 text-right text-white font-bold tracking-wide">Fecha</th>
                                            <th class="py-2.5 px-3 text-right text-white font-bold tracking-wide">Saldo Inicial</th>
                                            <th class="py-2.5 px-3 text-right font-bold tracking-wide" style="color:#aebc82;">Monto Pago</th>
                                            <th class="py-2.5 px-3 text-right text-white font-bold tracking-wide">Saldo Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in tablaDePageos" :key="row.no"
                                            class="border-b transition-colors hover:bg-opacity-50"
                                            :style="row.no % 2 === 0
                                                ? 'border-color:rgba(21,63,53,.06); background:#f6f6f4;'
                                                : 'border-color:rgba(21,63,53,.06); background:#fff;'">
                                            <td class="py-1.5 px-3 text-center font-bold" style="color:#153f35;">{{ row.no }}</td>
                                            <td class="py-1.5 px-3 text-right" style="color:#6b6b60;">{{ row.fecha }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono" style="color:#6b6b60;">{{ fmt(row.saldoInicial) }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono font-bold" style="color:#153f35;">{{ fmt(row.monto) }}</td>
                                            <td class="py-1.5 px-3 text-right font-mono" style="color:#6b6b60;">{{ fmt(row.saldoFinal) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <!-- ── Right: summary + actions ──────────────────────────── -->
                    <div class="lg:w-72 flex flex-col gap-4 px-6 py-6"
                         style="background:#f6f6f4; border-left:1px solid rgba(21,63,53,.08);">

                        <h3 class="text-[10px] font-bold uppercase tracking-[.35em]" style="color:#153f35;">
                            Resumen de Pago
                        </h3>

                        <!-- Summary card -->
                        <div class="rounded-xl p-4 space-y-3"
                             style="background:#fff; border:1px solid rgba(21,63,53,.1); box-shadow:0 2px 12px rgba(21,63,53,.06);">
                            <div class="flex justify-between text-sm">
                                <span style="color:#6b6b60;">Total</span>
                                <span class="font-bold" style="color:#153f35;">{{ fmt(precioTotal) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span style="color:#6b6b60;">Enganche {{ enganchePct }}%</span>
                                <span class="font-bold" style="color:#aebc82;">{{ fmt(engancheAmt) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span style="color:#6b6b60;">Saldo a financiar</span>
                                <span class="font-bold" style="color:#153f35;">{{ fmt(saldo) }}</span>
                            </div>
                            <div class="pt-3" style="border-top:1px solid rgba(21,63,53,.08);">
                                <div class="text-[10px] font-bold uppercase tracking-widest mb-1" style="color:#aebc82;">
                                    {{ plazoMeses }} pagos mensuales de
                                </div>
                                <div class="text-3xl font-bold" style="color:#153f35;">{{ fmt(montoPago) }}</div>
                            </div>
                        </div>

                        <!-- USD disclaimer -->
                        <p class="text-[10px] leading-relaxed px-1 rounded-lg py-2 px-3"
                           style="background:rgba(174,188,130,.12); color:#153f35; border:1px solid rgba(174,188,130,.25);">
                          {{ t.cotizador.usdNote }}
                        </p>

                        <!-- Lot info card -->
                        <div class="rounded-xl p-4 space-y-2 text-xs"
                             style="background:#fff; border:1px solid rgba(21,63,53,.1);">
                            <div class="flex justify-between">
                                <span class="font-bold uppercase tracking-wide" style="color:#aebc82;">Sección</span>
                                <span class="font-bold" style="color:#153f35;">{{ manzana }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-bold uppercase tracking-wide" style="color:#aebc82;">Lote</span>
                                <span class="font-bold" style="color:#153f35;">{{ lote?.lote }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-bold uppercase tracking-wide" style="color:#aebc82;">Superficie</span>
                                <span class="font-bold" style="color:#153f35;">{{ fmtArea(lote?.superficie) }} m²</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-bold uppercase tracking-wide" style="color:#aebc82;">Categoría</span>
                                <span class="font-bold" style="color:#153f35;">{{ lote?.categoria || '—' }}</span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-2 mt-auto">
                            <button @click="enviarPorCorreo"
                                :disabled="formularioInvalido || guardando"
                                class="w-full py-2.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                                style="background:#153f35; color:#fff;"
                                :style="(formularioInvalido || guardando) ? 'opacity:.4; cursor:not-allowed;' : ''"
                                @mouseenter="e => !formularioInvalido && !guardando && (e.target.style.background='#0e2b25')"
                                @mouseleave="e => e.target.style.background='#153f35'">
                                <svg v-if="!guardando" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <svg v-else class="w-4 h-4 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                {{ guardando ? 'Verificando...' : 'Enviar por Correo' }}
                            </button>
                            <button @click="descargarPDF"
                                :disabled="formularioInvalido || guardando"
                                class="w-full py-2.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                                style="border:1.5px solid #153f35; color:#153f35; background:transparent;"
                                :style="(formularioInvalido || guardando) ? 'opacity:.4; cursor:not-allowed;' : ''"
                                @mouseenter="e => !formularioInvalido && !guardando && (e.currentTarget.style.background='rgba(21,63,53,.06)')"
                                @mouseleave="e => e.currentTarget.style.background='transparent'">
                                <svg v-if="!guardando" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3M3 10a9 9 0 1018 0" />
                                </svg>
                                <svg v-else class="w-4 h-4 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                {{ guardando ? 'Verificando...' : 'Descargar PDF' }}
                            </button>
                            <button v-if="isAdmin" @click="reservarLote"
                                class="w-full py-2.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                                style="background:#aebc82; color:#153f35;"
                                @mouseenter="e => e.currentTarget.style.background='#beca90'"
                                @mouseleave="e => e.currentTarget.style.background='#aebc82'">
                                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Apartar Lote (2 días)
                            </button>
                        </div>

                        <p class="text-[9px] text-center leading-relaxed" style="color:#6b6b60;">
                            Los precios pueden cambiar sin previo aviso.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
