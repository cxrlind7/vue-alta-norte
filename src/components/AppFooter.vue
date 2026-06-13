<template>
  <footer
    class="relative overflow-hidden border-t-2"
    style="background-color:#0e1a15; border-color:#aebc82; box-shadow: 0 -24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(174,188,130,0.15);"
  >
    <!-- Texture removed -->
    <!-- Dot texture -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
      <svg width="60" height="60" viewBox="0 0 60 60" class="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="ft-dot" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ft-dot)" />
      </svg>
    </div>

    <!-- Watermark symbol (bottom-right) -->
    <img
      src="/isologo.svg"
      class="absolute pointer-events-none select-none"
      style="bottom:10px;right:10px;width:320px;height:auto;filter:brightness(0) invert(1);opacity:.045;"
      aria-hidden="true"
      alt=""
    />

    <!-- Background photo watermark -->
    <div class="absolute inset-0 bg-cover bg-bottom pointer-events-none"
         style="background-image:url('/images/bg_sierra.jpg'); opacity:0.05; mix-blend-mode:luminosity;"></div>
    <!-- Gradient glow top-left -->
    <div class="absolute top-0 left-0 w-80 h-80 pointer-events-none"
         style="background:radial-gradient(ellipse at top left,rgba(174,188,130,0.07),transparent 70%);"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

      <!-- Top grid -->
      <div class="grid md:grid-cols-12 gap-12 lg:gap-16 mb-14">

        <!-- Brand column -->
        <div class="md:col-span-5 space-y-7">
          <div class="flex items-center gap-4 group">
            <img src="/isologo.svg" width="52" height="65" alt="Alta Norte"
                 class="group-hover:scale-110 transition-transform duration-500 shrink-0"
                 style="filter:brightness(0) invert(1);opacity:.85;" />
            <div class="leading-tight">
              <p class="text-white/50 text-xs font-bold tracking-[0.35em] uppercase mb-0.5" style="color:#aebc82;">
                RESERVA
              </p>
              <p class="text-white font-bold text-2xl tracking-wide">ALTA NORTE</p>
              <p class="text-white/40 text-xs tracking-widest uppercase font-light mt-0.5">
                {{ t.loading.subtitle }}
              </p>
            </div>
          </div>

          <p class="text-white/55 text-sm leading-relaxed font-light max-w-sm">
            {{ t.footer.tagline }}
          </p>

          <!-- Social links -->
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener noreferrer' : undefined"
              :aria-label="social.label"
              class="w-10 h-10 rounded-xl flex items-center justify-center
                     border border-white/10 hover:border-secondary/50
                     transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(174,188,130,0.2)] group"
              style="background:rgba(255,255,255,0.06);"
            >
              <svg class="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" v-html="social.path"></svg>
            </a>
          </div>
        </div>

        <!-- Navigation column -->
        <div class="md:col-span-3">
          <h4 class="text-xs font-bold tracking-[0.35em] uppercase mb-7" style="color:#aebc82;">
            {{ t.footer.nav }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in t.footer.links" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="group inline-flex items-center gap-2 text-sm text-white/50
                       hover:text-white transition-all duration-300 font-medium tracking-wide"
                @click.prevent="scrollTo(`#${link.id}`)"
              >
                <span class="w-0 h-px group-hover:w-4 transition-all duration-300 rounded-full shrink-0"
                      style="background-color:#aebc82;"></span>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div class="md:col-span-4">
          <h4 class="text-xs font-bold tracking-[0.35em] uppercase mb-7" style="color:#aebc82;">
            {{ t.footer.contact }}
          </h4>
          <ul class="space-y-5">

            <!-- Address -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.office }}
                </p>
                <p class="text-white/80 text-sm leading-relaxed">{{ t.footer.addressLine1 }}</p>
                <p class="text-white/80 text-sm">{{ t.footer.addressLine2 }}</p>
              </div>
            </li>

            <!-- Phone -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.phone }}
                </p>
                <a href="tel:+526181090020"
                   class="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 link-luxury">
                  +52 (618) 109-0020
                </a>
              </div>
            </li>

            <!-- Email -->
            <li class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                   style="background:rgba(174,188,130,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:#aebc82;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-1">
                  {{ t.footer.email }}
                </p>
                <a href="mailto:info@altanorte.mx"
                   class="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 link-luxury">
                  info@altanorte.mx
                </a>
              </div>
            </li>

            <!-- WhatsApp -->
            <li>
              <a
                :href="whatsappHref"
                target="_blank" rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       border text-sm font-bold tracking-wide transition-all duration-300
                       hover:scale-105 hover:shadow-lg"
                style="border-color:rgba(174,188,130,0.35); color:#aebc82; background:rgba(174,188,130,0.07);"
                @mouseenter="e => e.currentTarget.style.background='rgba(174,188,130,0.14)'"
                @mouseleave="e => e.currentTarget.style.background='rgba(174,188,130,0.07)'"
              >
                <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687" />
                </svg>
                {{ t.contact.writeUs }}
              </a>
            </li>

          </ul>
        </div>
      </div>

      <!-- Payment methods -->
      <div class="border-t py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
           style="border-color:rgba(174,188,130,0.12);">
        <span class="text-[9px] tracking-[0.3em] uppercase font-bold shrink-0"
              style="color:rgba(255,255,255,0.22);">ACEPTAMOS</span>
        <div class="flex items-center gap-2 flex-wrap">
          <div class="inline-flex items-center justify-center rounded-md transition-all duration-300 hover:border-white/30"
               style="border:1px solid rgba(255,255,255,0.15); width:48px; height:32px;">
            <svg viewBox="0 0 576 512" class="w-8 h-8" style="color:rgba(255,255,255,0.42); fill:currentColor;">
              <path d="M470.1 231.3s7.6 37.2 9.3 45l-33.4 0c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80l0 352c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48L0 80C0 53.5 21.5 32 48 32l480 0c26.5 0 48 21.5 48 48zM152.5 331.2l63.2-155.2-42.5 0-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1l-64.7 0-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135 42.5 0zm94.4 .2l25.2-155.4-40.2 0-25.1 155.4 40.1 0zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4l-32.4-155.4-31.1 0c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5 42.2 0s6.9-19.2 8.4-23.3l51.6 0c1.2 5.5 4.8 23.3 4.8 23.3l37.2 0z"/>
            </svg>
          </div>
          <div class="inline-flex items-center justify-center rounded-md transition-all duration-300 hover:border-white/30"
               style="border:1px solid rgba(255,255,255,0.15); width:48px; height:32px;">
            <svg viewBox="0 0 576 512" class="w-8 h-8" style="color:rgba(255,255,255,0.42); fill:currentColor;">
              <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7s4.4-11.7 11.2-11.7c6.6 0 11.2 5.2 11.2 11.7zM172.1 398.6c-7.1 0-11.2 5.2-11.2 11.7S165 422 172.1 422c6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7l19.1 0c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7s4.1 11.7 10.9 11.7 11.2-4.9 11.2-11.7c0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8s0-.5-.3-.8c-.3 0-.5-.3-1.1-.3l-1.6 0 0 3.5 .8 0 0-1.4 .3 0 1.1 1.4 .8 0-1.1-1.3zM576 81l0 352c0 26.5-21.5 48-48 48L48 481c-26.5 0-48-21.5-48-48L0 81C0 54.5 21.5 33 48 33l480 0c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zM288 329.4c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zM145.7 405.7c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4l0-4.4-8.2 0 0 36.7 8.2 0c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2l7.9 0c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2l8.2 0 0-23-.2 0zM190.6 392l-7.9 0 0 4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4l0 4.6 7.9 0 0-36.8zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1l0-16.6 13.1 0 0-7.4-13.1 0 0-11.2-8.2 0 0 11.2-7.6 0 0 7.3 7.6 0 0 16.7c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4l27.5 0c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zM338.9 392c-4.6-2-11.6-1.8-15.2 4.4l0-4.4-8.2 0 0 36.7 8.2 0 0-20.7c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zM416.2 392l-8.2 0 0 4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9l0 4.6 8.2 0 0-36.8zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4l0-4.4-7.9 0 0 36.7 7.9 0 0-20.7c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9l-7.9 0 0 19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9l0 4.6 7.9 0 0-51.7zm7.6-75.1l0 4.6 .8 0 0-4.6 1.9 0 0-.8-4.6 0 0 .8 1.9 0zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1s-.8-.5-1.1-.8c-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8s.5-.8 .8-1.1c.3-.6 .3-1.1 .3-1.4zm3.2-124.7l-1.4 0-1.6 3.5-1.6-3.5-1.4 0 0 5.4 .8 0 0-4.1 1.6 3.5 1.1 0 1.4-3.5 0 4.1 1.1 0 0-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"/>
            </svg>
          </div>
          <div class="inline-flex items-center justify-center rounded-md transition-all duration-300 hover:border-white/30"
               style="border:1px solid rgba(255,255,255,0.15); width:48px; height:32px;">
            <svg viewBox="0 0 576 512" class="w-8 h-8" style="color:rgba(255,255,255,0.42); fill:currentColor;">
              <path d="M0 432c0 26.5 21.5 48 48 48l480 0c26.5 0 48-21.5 48-48l0-1.1-61.7 0-31.9-35.1-31.9 35.1-203.7 0 0-163.8-65.8 0 81.7-184.7 78.6 0 28.1 63.2 0-63.2 97.2 0 16.9 47.6 17-47.6 75.5 0 0-2.4c0-26.5-21.5-48-48-48L48 32C21.5 32 0 53.5 0 80L0 432zm440.4-21.7l42.2-46.3 42 46.3 51.4 0-68-72.1 68-72.1-50.6 0-42 46.7-41.5-46.7-51.4 0 67.5 72.5-67.4 71.6 0-33.1-83 0 0-22.2 80.9 0 0-32.3-80.9 0 0-22.4 83 0 0-33.1-122 0 0 143.2 171.8 0zm96.3-72l39.3 41.9 0-83.3-39.3 41.4zm-36.3-92l36.9-100.6 0 100.6 38.7 0 0-143.3-60.2 0-32.2 89.3-31.9-89.3-61.2 0 0 143.1-63.2-143.1-51.2 0-62.4 143.3 43 0 11.9-28.7 65.9 0 12 28.7 82.7 0 0-100.3 36.8 100.3 34.4 0zM282 185.4l19.5-46.9 19.4 46.9-38.9 0z"/>
            </svg>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 rounded-md h-8 transition-all duration-300 hover:border-white/30"
               style="border:1px solid rgba(255,255,255,0.15);">
            <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style="color:rgba(255,255,255,0.38);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span style="color:rgba(255,255,255,0.38); font-size:8px; font-weight:700; letter-spacing:0.1em;">PAGO SEGURO</span>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t pt-6 pb-2 flex flex-col sm:flex-row justify-between items-center gap-4"
           style="border-color:rgba(174,188,130,0.12);">
        <p class="text-white/30 text-xs tracking-wide">{{ t.footer.rights }}</p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
            {{ t.footer.terms }}
          </a>
          <a href="#" class="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
            {{ t.footer.privacy }}
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t, lang } = useI18n()

const whatsappHref = computed(() => {
  const msg = lang.value === 'en'
    ? 'Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20Alta%20Norte'
    : 'Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Alta%20Norte'
  return `https://wa.me/526181090020?text=${msg}`
})

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' })
}

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/Alta-Norte-61573212684928/',
    external: true,
    path: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  },
  {
    label: 'Instagram',
    href: '#',
    external: false,
    path: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
  },
  {
    label: 'WhatsApp',
    get href() { return whatsappHref.value },
    external: true,
    path: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>',
  },
]
</script>
