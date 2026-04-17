<template>
  <section id="contacto" class="py-32 bg-gradient-to-br from-surface via-surface-800 to-primary-950 relative overflow-hidden" data-animate>
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 opacity-10">
        <svg width="80" height="80" viewBox="0 0 80 80" class="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="contact-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="currentColor" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/30"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-20">
        <!-- Left Info -->
        <div class="lg:col-span-5 space-y-16" data-animate-delay="100">
          <div class="space-y-8">
            <h2 class="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span class="text-white">PONTE EN CONTACTO</span>
            </h2>
            <p class="text-xl lg:text-2xl text-neutral-300 leading-relaxed font-light max-w-lg">
              Conéctate con nuestro equipo de ventas para conocer más sobre la comunidad y descubrir las oportunidades que te esperan.
            </p>
          </div>

          <div class="space-y-8">
            <h3 class="text-2xl font-bold text-white mb-8 tracking-wide">CONTACTO</h3>
            <div class="space-y-6">
              <!-- Phone -->
              <div class="group flex items-center space-x-6 p-6 rounded-2xl
                          bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
                          hover:border-primary/30 transition-all duration-500 hover:shadow-elegant cursor-pointer"
                   data-animate-delay="200"
              >
                <div class="w-16 h-16 bg-gradient-elegant from-primary/30 to-secondary/30 rounded-2xl flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-all duration-300 shadow-elegant">
                  <svg class="w-8 h-8 text-primary-200 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-neutral-400 text-sm font-medium tracking-wide mb-1">Teléfono</p>
                  <p class="text-white text-lg font-semibold group-hover:text-primary-200 transition-colors duration-300">+52 (444) 123-4567</p>
                </div>
              </div>

              <!-- Email -->
              <div class="group flex items-center space-x-6 p-6 rounded-2xl
                          bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
                          hover:border-secondary/30 transition-all duration-500 hover:shadow-elegant cursor-pointer"
                   data-animate-delay="300"
              >
                <div class="w-16 h-16 bg-gradient-elegant from-secondary/30 to-primary/30 rounded-2xl flex items-center justify-center border border-secondary/40 group-hover:scale-110 transition-all duration-300 shadow-elegant">
                  <svg class="w-8 h-8 text-secondary-200 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-neutral-400 text-sm font-medium tracking-wide mb-1">Email</p>
                  <p class="text-white text-lg font-semibold group-hover:text-secondary-200 transition-colors duration-300">info@altanorte.mx</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form -->
        <div class="lg:col-span-7 space-y-8" data-animate-delay="200">
          <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-white/20 transition-all duration-500 shadow-elegant-lg">
            <form class="space-y-8" @submit.prevent="handleSubmit">
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Name -->
                <div class="space-y-3">
                  <label for="name" class="block text-sm font-semibold text-white tracking-wide">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    class="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl
                           text-white placeholder-neutral-400
                           focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                           transition-all duration-300 hover:bg-white/15 hover:border-white/30
                           backdrop-blur-sm"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <!-- Email -->
                <div class="space-y-3">
                  <label for="email" class="block text-sm font-semibold text-white tracking-wide">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    class="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl
                           text-white placeholder-neutral-400
                           focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                           transition-all duration-300 hover:bg-white/15 hover:border-white/30
                           backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div class="space-y-3">
                <label for="phone" class="block text-sm font-semibold text-white tracking-wide">Teléfono * (10 dígitos)</label>
                <input
                  id="phone"
                  :value="form.phone"
                  @keydown="!/^\d$/.test($event.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].includes($event.key) && $event.preventDefault()"
                  @input="form.phone = $event.target.value = $event.target.value.replace(/\D/g, '').slice(0, 10)"
                  inputmode="numeric"
                  maxlength="10"
                  required
                  class="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                         transition-all duration-300 hover:bg-white/15 hover:border-white/30
                         backdrop-blur-sm"
                  placeholder="10 dígitos"
                />
              </div>

              <!-- Message -->
              <div class="space-y-3">
                <label for="message" class="block text-sm font-semibold text-white tracking-wide">Mensaje</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-neutral-400
                         focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                         transition-all duration-300 hover:bg-white/15 hover:border-white/30
                         backdrop-blur-sm resize-none"
                  placeholder="Cuéntanos sobre tu interés en Alta Norte..."
                ></textarea>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                id="btn-enviar-mensaje"
                :disabled="submitting"
                class="group relative w-full bg-gradient-elegant from-primary via-primary-700 to-secondary
                       hover:from-primary-600 hover:via-primary-600 hover:to-secondary-600
                       text-white font-bold py-5 px-8 rounded-xl
                       transition-all duration-500 ease-elegant
                       hover:scale-[1.02] hover:shadow-elegant-lg
                       focus:outline-none focus:ring-4 focus:ring-primary/40
                       overflow-hidden border border-primary/30
                       disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div class="absolute inset-0 bg-gradient-elegant from-secondary to-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-elegant"></div>
                <span v-if="!submitting" class="relative z-10 text-lg tracking-wide">ENVIAR MENSAJE</span>
                <span v-else class="relative z-10 flex items-center justify-center space-x-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Logo -->
      <div class="text-center mt-24" data-animate-delay="400">
        <div class="inline-flex items-center space-x-6 p-8 rounded-3xl
                    bg-white/5 backdrop-blur-md border border-white/10
                    hover:border-white/20 transition-all duration-500
                    hover:shadow-elegant-lg group">
          <img src="/isologo.svg" class="filter brightness-0 invert group-hover:scale-110 transition-transform duration-500" alt="Alta Norte" loading="eager" width="80" height="100" />
          <div class="text-left">
            <p class="text-primary-200 font-bold text-lg tracking-wider">RESERVA</p>
            <p class="text-white text-4xl font-bold tracking-wide">ALTA NORTE</p>
            <p class="text-neutral-400 text-sm mt-1">Sierra Madre Experience</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <Teleport to="body">
      <div
        v-if="notification.show"
        class="fixed top-24 right-6 z-50 p-6 rounded-xl shadow-elegant-lg transition-all duration-500"
        :class="[
          notification.type === 'success' ? 'bg-green-600 text-white border border-green-500/30' : 'bg-red-600 text-white border border-red-500/30',
          notification.visible ? 'translate-x-0' : 'translate-x-full'
        ]"
      >
        {{ notification.message }}
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const submitting = ref(false)
const form = reactive({ name: '', email: '', phone: '', message: '' })
const notification = reactive({ show: false, visible: false, type: 'success', message: '' })

function showNotification(message, type) {
  notification.show = true
  notification.type = type
  notification.message = message
  notification.visible = false
  setTimeout(() => { notification.visible = true }, 50)
  setTimeout(() => {
    notification.visible = false
    setTimeout(() => { notification.show = false }, 500)
  }, 4000)
}

function handleSubmit() {
  if (!form.name || !form.email || !form.message || form.phone.length !== 10) {
    showNotification('Por favor completa todos los campos requeridos (teléfono: 10 dígitos)', 'error')
    return
  }
  submitting.value = true

  const subject = encodeURIComponent('Contacto desde página web - Alta Norte')
  const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone || ''}\n\nMensaje:\n${form.message}`)
  const link = document.createElement('a')
  link.href = `mailto:nortealta@gmail.com?subject=${subject}&body=${body}`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => {
    showNotification('Aplicación de correo abierta.', 'success')
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
    submitting.value = false
  }, 500)
}
</script>
