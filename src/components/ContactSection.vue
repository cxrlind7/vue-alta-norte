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

    <div class="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">

      <!-- Header -->
      <div class="space-y-6 mb-16" data-animate-delay="100">
        <h2 class="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
          PONTE EN CONTACTO
        </h2>
        <p class="text-xl lg:text-2xl text-neutral-300 leading-relaxed font-light max-w-2xl mx-auto">
          Conéctate con nuestro equipo de ventas para conocer más sobre la comunidad y descubrir las oportunidades que te esperan.
        </p>
      </div>

      <!-- Contact cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-20" data-animate-delay="200">

        <!-- Phone -->
        <a href="tel:+526181090020"
          class="group flex items-center space-x-6 p-8 rounded-2xl
                 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
                 hover:border-primary/40 transition-all duration-500 hover:shadow-elegant
                 hover:-translate-y-1 text-left">
          <div class="w-16 h-16 bg-gradient-elegant from-primary/30 to-secondary/30 rounded-2xl flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-all duration-300 shadow-elegant shrink-0">
            <svg class="w-8 h-8 text-primary-200 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p class="text-neutral-400 text-sm font-medium tracking-wide mb-1">Teléfono</p>
            <p class="text-white text-xl font-bold group-hover:text-primary-200 transition-colors duration-300">+52 618 109 0020</p>
          </div>
        </a>

        <!-- Email -->
        <a href="mailto:nortealta@gmail.com"
          class="group flex items-center space-x-6 p-8 rounded-2xl
                 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
                 hover:border-secondary/40 transition-all duration-500 hover:shadow-elegant
                 hover:-translate-y-1 text-left">
          <div class="w-16 h-16 bg-gradient-elegant from-secondary/30 to-primary/30 rounded-2xl flex items-center justify-center border border-secondary/40 group-hover:scale-110 transition-all duration-300 shadow-elegant shrink-0">
            <svg class="w-8 h-8 text-secondary-200 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-neutral-400 text-sm font-medium tracking-wide mb-1">Email</p>
            <p class="text-white text-xl font-bold group-hover:text-secondary-200 transition-colors duration-300">nortealta@gmail.com</p>
          </div>
        </a>

      </div>

      <!-- Bottom Logo -->
      <div data-animate-delay="300">
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
  </section>
</template>

<script setup>
</script>
