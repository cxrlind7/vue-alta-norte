import { ref, computed } from 'vue'

const _lang = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem('alta-norte-lang')) || 'es'
)

const translations = {
  // ── ESPAÑOL ──────────────────────────────────────────────────────────────────
  es: {
    loading: { brand: 'ALTA NORTE', subtitle: 'Desarrollo Campestre' },

    nav: {
      links: [
        { id: 'inicio',          label: 'Inicio' },
        { id: 'nosotros',        label: 'Nosotros' },
        { id: 'actividades',     label: 'Actividades' },
        { id: 'lifestyle',       label: 'Lifestyle' },
        { id: 'eventos',         label: 'Eventos' },
        { id: 'planos',          label: 'Planos' },
        { id: 'recorrido-nuevo', label: 'Agendar Visita' },
        { id: 'contacto',        label: 'Contacto' },
      ],
      cta: 'COTIZAR',
      ctaMobile: 'COTIZAR LOTE',
    },

    hero: {
      preTitle: 'Desarrollo Campestre · Sierra Madre',
      label: 'reserva',
      subtitle: 'Ski, Camping & Resort en la Sierra Madre',
      cta: 'Conoce el Proyecto',
      ctaLots: 'Ver Lotes',
    },

    about: {
      badge: 'Desarrollo Exclusivo',
      isologoAlt: 'Alta Norte',
      title: 'Alta Norte. Único en su tipo',
      description: 'Para un estilo de vida rodeado de naturaleza, paz y lujo. Con extensos lotes campestres y amenidades de primer nivel, te invitamos a descubrir un nuevo norte para vivir.',
      stats: [
        { value: '50+',  label: 'Lotes Disponibles' },
        { value: '100%', label: 'Entorno Natural' },
      ],
      features: [
        { title: 'Extensos',   subtitle: 'Lotes Campestres' },
        { title: 'Amenidades', subtitle: 'de Lujo' },
        { title: 'Pista',      subtitle: 'de Esquí única en la región' },
        { title: 'Canchas',    subtitle: 'Deportivas y Recreativas' },
      ],
      showcase: {
        title1: 'Diseñado para quienes buscan',
        title2: 'vivir lo extraordinario',
        description: 'Una experiencia única donde la naturaleza y el lujo se encuentran en perfecta armonía.',
        items: [
          'Vistas panorámicas de la Sierra Madre',
          'Acceso exclusivo a pistas de esquí',
          'Senderos naturales y áreas de camping',
          'Amenidades de clase mundial',
        ],
        badge: { label: 'RESERVA', title: 'ALTA NORTE' },
        card: { title: 'Sierra Madre', desc: 'Experiencia de vida incomparable en las montañas' },
      },
      cta: 'COTIZA Y APARTA TU LOTE',
    },

    amenities: {
      badge: 'Nuestras Amenidades',
      title: 'Vive la Experiencia Completa',
      subtitle: 'Cada rincón de Reserva Alta Norte está diseñado para ofrecerte lo mejor de la naturaleza, el deporte y el lujo.',
      items: [
        { title: 'Extensos Lotes Campestres',       desc: 'Amplios lotes para construir la vida de tus sueños en plena Sierra Madre.',   icon: 'lotes'   },
        { title: 'Amenidades de Lujo',               desc: 'Instalaciones exclusivas de primer nivel para un estilo de vida incomparable.', icon: 'star'    },
        { title: 'Pista de Esquí Única en la Región',desc: 'La única pista de esquí de la región, directamente en la Sierra Madre.',       icon: 'mountain'},
        { title: 'Canchas Deportivas',               desc: 'Pádel, tenis y más para mantenerte activo en un entorno natural.',             icon: 'courts'  },
        { title: 'Pista de Ski',                     desc: 'Desciende por laderas espectaculares con instalaciones modernas de ski.',       icon: 'flag'    },
        { title: 'Senderos Naturales',               desc: 'Kilómetros de senderos para caminatas, trail running y ciclismo en la sierra.', icon: 'trails'  },
        { title: 'Área de Camping',                  desc: 'Zonas exclusivas de glamping y camping bajo las estrellas de la montaña.',      icon: 'camping' },
        { title: 'Casa Club',                        desc: 'Centro social con restaurante, salón de eventos y área de descanso.',           icon: 'house'   },
      ],
    },

    lifestyle: {
      badge: 'Lifestyle',
      title: 'Ski, Camping & Resort',
      subtitle: 'Tres mundos únicos en un solo lugar. Lujo, aventura y naturaleza en perfecta armonía.',
      pillars: [
        { tag: 'Aventura',  title: 'Ski Resort', desc: 'La única pista de esquí de la región. Desciende por las laderas de la Sierra Madre con vistas incomparables.' },
        { tag: 'Naturaleza',title: 'Camping',    desc: 'Campamentos y senderos en medio del bosque. Desconéctate y reconéctate con la naturaleza más pura.' },
        { tag: 'Lujo',      title: 'Resort',     desc: 'Casa Club, palapa de descanso, salón de eventos y área de pádel. Amenidades de clase mundial.' },
      ],
      amenities: ['Pista de Ski', 'Senderos Naturales', 'Área de Camping', 'Casa Club'],
    },

    plans: {
      badge: 'Mapa de Lotes',
      title: 'PLANO INTERACTIVO',
      subtitle: 'Explora los lotes disponibles. Da clic sobre cualquier lote para ver su información y generar una cotización.',
      viewPlano: 'Plano',
      viewLotes: 'Vista Lotes',
    },

    actividades: {
      tag: 'Lo que puedes hacer',
      heading1: 'Aventura, naturaleza',
      heading2: 'y descanso total.',
      lead: '16 actividades diseñadas para el disfrute en cada estación del año.',
      filters: [
        { key: 'all',        label: 'Todas'     },
        { key: 'aventura',   label: 'Aventura'  },
        { key: 'naturaleza', label: 'Naturaleza'},
        { key: 'relax',      label: 'Relax'     },
        { key: 'invierno',   label: 'Invierno'  },
      ],
      items: [
        { icon: '⛷️',  cat: ['invierno','aventura'],   catLabel: 'Invierno',   name: 'Ski & Snowboard' },
        { icon: '🏔️', cat: ['aventura','naturaleza'], catLabel: 'Aventura',   name: 'Senderismo de montaña' },
        { icon: '🎣',  cat: ['naturaleza','relax'],    catLabel: 'Naturaleza', name: 'Pesca deportiva' },
        { icon: '🚴',  cat: ['aventura'],              catLabel: 'Aventura',   name: 'Ciclismo de montaña' },
        { icon: '🏕️', cat: ['naturaleza','relax'],    catLabel: 'Naturaleza', name: 'Glamping & Camping' },
        { icon: '🔭',  cat: ['naturaleza','relax'],    catLabel: 'Naturaleza', name: 'Observatorio astronómico' },
        { icon: '🐦',  cat: ['naturaleza'],            catLabel: 'Naturaleza', name: 'Observación de aves' },
        { icon: '🎯',  cat: ['aventura'],              catLabel: 'Aventura',   name: 'Campo de tiro' },
        { icon: '🏓',  cat: ['aventura','relax'],      catLabel: 'Deporte',    name: 'Canchas deportivas' },
        { icon: '🔥',  cat: ['relax','naturaleza'],    catLabel: 'Relax',      name: 'Fogatero nocturno' },
        { icon: '🧘',  cat: ['relax'],                 catLabel: 'Relax',      name: 'Yoga en la naturaleza' },
        { icon: '🍽️', cat: ['relax'],                 catLabel: 'Relax',      name: 'Restaurante sierra' },
        { icon: '🏊',  cat: ['relax'],                 catLabel: 'Relax',      name: 'Alberca panorámica' },
        { icon: '🌿',  cat: ['naturaleza','relax'],    catLabel: 'Naturaleza', name: 'Trail running' },
        { icon: '🎿',  cat: ['invierno','aventura'],   catLabel: 'Invierno',   name: 'Clases de esquí' },
        { icon: '🎪',  cat: ['aventura','naturaleza'], catLabel: 'Familia',    name: 'Áreas familiares' },
      ],
    },

    clima: {
      tag: 'Antes de venir',
      heading1: 'Clima y lo que',
      heading2: 'debes traer.',
      seasons: [
        { key: 'primavera', emoji: '🌸', label: 'Primavera' },
        { key: 'verano',    emoji: '🌿', label: 'Verano'    },
        { key: 'otono',     emoji: '🍂', label: 'Otoño'     },
        { key: 'invierno',  emoji: '❄️', label: 'Invierno'  },
      ],
      data: {
        primavera: {
          temp: '16°C', range: '5°C — 20°C · Mar – May',
          desc: 'Días templados perfectos para senderismo. El bosque en su momento más verde.',
          tags: ['🌸 Floración', '🚴 Ciclismo', '☀️ Soleado'],
          gear: [
            { emoji: '🧥', title: 'Chamarra ligera',   desc: 'Noches a 5°C. Impermeable ligera recomendada.' },
            { emoji: '🧴', title: 'Protector SPF 50+', desc: 'A 2,400 msnm la radiación es muy intensa.' },
          ],
        },
        verano: {
          temp: '18°C', range: '8°C — 22°C · Jun – Ago',
          desc: 'Lluvias vespertinas. El verde de la sierra en su máximo esplendor.',
          tags: ['🌧️ Lluvias', '🌿 Verde máximo', '🌈 Atardeceres'],
          gear: [
            { emoji: '☂️', title: 'Impermeable o poncho', desc: 'Lluvias cortas pero intensas por las tardes.' },
            { emoji: '👟', title: 'Botas impermeables',   desc: 'Los senderos se mojan rápido.' },
          ],
        },
        otono: {
          temp: '12°C', range: '2°C — 18°C · Sep – Nov',
          desc: 'Colores espectaculares en el bosque. Noches con cielos estrellados únicos.',
          tags: ['🍂 Colores', '⭐ Estrellas', '🔥 Fogatas'],
          gear: [
            { emoji: '🧣', title: 'Capas de abrigo',    desc: 'Térmica base + suéter + chamarra exterior.' },
            { emoji: '📷', title: 'Cámara fotográfica', desc: 'La mejor temporada para fotografía en la sierra.' },
          ],
        },
        invierno: {
          temp: '-2°C', range: '-8°C — 10°C · Dic – Feb',
          desc: 'Temporada de ski. La única pista de la región se activa con nieve real.',
          tags: ['❄️ Nieve', '⛷️ Pistas activas', '🏔️ Vista nevada'],
          gear: [
            { emoji: '🧥', title: 'Ropa térmica completa', desc: 'Camiseta, pantalón y calcetines térmicos.' },
            { emoji: '🎿', title: 'Equipo de ski',         desc: 'Trae el tuyo o renta en las instalaciones.' },
          ],
        },
      },
    },

    llegar: {
      tag: 'Ubicación',
      heading1: 'Llegar es',
      heading2: 'más fácil',
      heading3: 'de lo que crees.',
      lead: 'Sierra Madre Occidental, Durango. A horas de las principales ciudades — y a un vuelo de EE.UU.',
      stepsLabel: 'Paso a paso',
      routes: [
        { key: 'durango',   emoji: '🚗', from: 'Desde Durango',   time: '50 min',        detail: 'MEX-40 · Acceso pavimentado' },
        { key: 'mazatlan',  emoji: '🚗', from: 'Desde Mazatlán',  time: '2:45 hrs',      detail: 'Autopista del Sol · Ruta escénica' },
        { key: 'usa',       emoji: '✈️', from: 'Desde EE.UU.',    time: 'Vuelo + 2 hrs', detail: 'Houston · Dallas · Phoenix → DGO' },
        { key: 'monterrey', emoji: '🚗', from: 'Desde Monterrey', time: '5 hrs',         detail: 'Carretera federal' },
      ],
      steps: [
        { title: 'Sal de Durango rumbo al sur',   body: 'Toma MEX-40. Son solo <strong>50 minutos</strong> con acceso pavimentado.' },
        { title: 'Toma la desviación señalizada', body: 'Señalética de <strong>Alta Norte</strong> visible desde la carretera a la derecha.' },
        { title: 'Llega a la caseta principal',   body: '8 km más. <strong>Avísanos antes de salir</strong> por WhatsApp para que el guardia te espere.' },
      ],
      mapBtn: 'Google Maps →',
      visitBtn: 'Agendar visita',
    },

    eventos: {
      tag: 'Eventos sociales',
      heading1: 'El escenario perfecto',
      heading2: 'para lo que importa.',
      lead: 'La Casa Club y el entorno natural de Alta Norte son el marco único para los eventos más especiales.',
      items: [
        {
          tag: 'Bodas', image: '/images/tour/salon/Panorama4.webp',
          title: 'Bodas y celebraciones privadas',
          desc: 'El bosque como fondo de tu boda. Sin salones genéricos.',
          features: ['Cualquier capacidad', 'Coordinación completa', 'Gastronomía de montaña', 'Alojamiento incluido'],
          cta: 'Consultar disponibilidad',
        },
        {
          tag: 'Social', image: '/images/tour/palapa/Panorama5.webp',
          title: 'XV años y reuniones familiares',
          desc: 'La sierra y las estrellas como decoración incomparable.',
          features: ['Palapas y espacios techados', 'Área de fogata privada', 'Actividades para todas las edades', 'Seguridad privada'],
          cta: 'Solicitar información',
        },
        {
          tag: 'Empresarial', image: '/images/tour/hostal/Panorama2.webp',
          title: 'Retiros y team building',
          desc: 'Sin distracciones urbanas. Máxima creatividad.',
          features: ['Sala de reuniones equipada', 'Team building a la medida', 'Hospedaje para el equipo', 'Cero distracciones'],
          cta: 'Planear mi retiro',
        },
      ],
      bannerTag: 'Empresas y universidades',
      bannerTitle: '¿Buscas el escenario ideal para tu reunión de alto nivel?',
      bannerSub: 'La Sierra Madre como fondo de tus decisiones más importantes.',
      bannerBtn: 'Hablar con un asesor →',
    },

    recorrido: {
      tag: 'Sin costo · Sin compromiso',
      heading1: 'Agenda tu recorrido',
      heading2: 'y llévate un',
      heading3: 'regalo sorpresa.',
      lead: 'Visita Alta Norte sin costo. Comida incluida + regalo sorpresa al finalizar.',
      timeline: [
        { dot: '1',  title: 'Bienvenida en caseta principal', desc: 'Tu asesor te recibe y entrega kit de bienvenida.',      time: '~15 min' },
        { dot: '2',  title: 'Tour de lotes en 4×4',           desc: 'Recorre los lotes disponibles con sus vistas.',         time: '~45 min' },
        { dot: '3',  title: 'Recorrido de amenidades',         desc: 'Ski resort, lago, Casa Club, senderos y observatorio.', time: '~30 min' },
        { dot: '4',  title: 'Comida en Casa Club',             desc: 'Almuerzo incluido para ti y tu acompañante.',          time: '~60 min · Gratis' },
        { dot: '🎁', title: 'Tu regalo sorpresa',             desc: 'Algo especial de la Sierra Madre. Vale el viaje.',     time: 'Al concluir' },
      ],
      gift: {
        title: '¿Qué es el regalo sorpresa?',
        items: [
          'Productos artesanales de la Sierra Madre',
          'Una experiencia gastronómica exclusiva',
          'Un recuerdo que no encontrarás en otro lugar',
        ],
      },
      form: {
        stepPre: 'Paso', stepSuf: 'de 3',
        step1: { title: '¿Para qué te interesa?',  sub: 'Cuéntanos qué te trajo aquí.' },
        step2: { title: 'Tus datos de contacto',   sub: 'Tu asesor confirma en menos de 24 hrs.' },
        step3: { title: 'Elige fecha y grupo',      sub: '¿Cuándo y cuántos van?', reminder: '🎁 Recuerda: Regalo sorpresa + comida incluida al finalizar.' },
        intentOptions: [
          { icon: '🏡', label: 'Comprar un lote',  sub: 'Para construir' },
          { icon: '🏖️', label: 'Casa de descanso', sub: 'Fin de semana' },
          { icon: '📈', label: 'Inversión',          sub: 'Plusvalía' },
          { icon: '👀', label: 'Solo conocer',       sub: 'Sin compromiso' },
        ],
        fields: {
          nombre: 'Nombre', apellido: 'Apellido', whatsapp: 'WhatsApp',
          ciudad: 'Ciudad actual', ciudadPh: 'Ej: Houston TX / Monterrey NL',
          fecha: 'Fecha preferida', grupo: '¿Cuántos van?',
        },
        grupoOptions: ['Solo yo', 'Yo + 1 acompañante', 'Familia (3–4)', 'Grupo (5+)'],
        nextBtn: 'Siguiente →', confirmBtn: 'Confirmar recorrido →', prevBtn: '← Atrás',
        trust: 'Sin spam · Sin compromiso · Respuesta en menos de 24 hrs',
      },
      success: { title: '¡Recorrido agendado!', sub: 'Tu asesor te contacta en menos de 24 hrs. ¡Te espera tu regalo sorpresa!' },
    },

    infoPractica: {
      tag: 'Info práctica',
      heading1: 'Lo que necesitas saber',
      heading2: 'antes de llegar.',
      lead: 'Pasa el cursor sobre cada tarjeta para ver el detalle.',
      cards: [
        { icon: '📡', title: 'Conectividad', backTitle: 'Sin señal, con WiFi',
          backText: 'WiFi de alta velocidad en todas las áreas. WhatsApp y videollamadas sin problema.',
          chips: ['WiFi ✓', 'Sin 4G'] },
        { icon: '💳', title: 'Pagos', backTitle: 'Efectivo + tarjeta',
          backText: 'Visa, Mastercard, Amex. USD y MXN en efectivo. Transferencia para lotes.',
          chips: ['Visa ✓', 'USD/MXN'] },
        { icon: '🌡️', title: 'Altitud', backTitle: '2,400 msnm',
          backText: 'Posible mareo el 1er día. Hidratarse bien y descansar las primeras horas.',
          chips: ['Hidrátate', 'Descanso'] },
        { icon: '🏥', title: 'Emergencias', backTitle: '24/7',
          backText: 'Primeros auxilios en sitio. Hospital a 30 min. Durango a 50 min.',
          chips: ['30 min hosp.', '24/7'] },
      ],
    },

    tour: {
      badge: 'Recorrido inmersivo · 14 espacios',
      subtitle: 'Recorre Alta Norte desde donde estés. Casa Club, Hostal, Área de Esquí y más.',
      cta: 'Click para explorar',
      dragHint: 'Arrastra · Zoom',
      soundLabel: 'Sonido',
    },

    cotizador: {
      usdNote: 'Precios en MXN. Para clientes que paguen en USD, el tipo de cambio puede variar y los precios pueden cambiar sin previo aviso.',
    },

    contact: {
      badge: 'Contáctanos',
      title: 'PONTE EN CONTACTO',
      subtitle: 'Conéctate con nuestro equipo de ventas para conocer más sobre la comunidad.',
      phone: 'Teléfono', email: 'Email', whatsapp: 'WhatsApp', writeUs: 'Escríbenos',
      salesOffice: 'Oficina de Ventas',
      addressLine1: 'Av. 20 de Nov #403 Ote, Zona Centro',
      addressLine2: 'Durango, Dgo. México',
    },

    footer: {
      tagline: 'Un estilo de vida extraordinario en la Sierra Madre. Ski, Camping y Resort en un desarrollo inmobiliario único.',
      nav: 'Navegación', contact: 'Contacto', phone: 'Teléfono', email: 'Email',
      office: 'Oficina de Ventas',
      addressLine1: 'Av. 20 de Nov #403 Ote, Zona Centro',
      addressLine2: 'Durango, Dgo. México',
      rights: '© 2026 Reserva Alta Norte. Todos los derechos reservados.',
      terms: 'Términos', privacy: 'Privacidad',
      links: [
        { id: 'inicio',          label: 'Inicio' },
        { id: 'nosotros',        label: 'Nosotros' },
        { id: 'actividades',     label: 'Actividades' },
        { id: 'lifestyle',       label: 'Lifestyle' },
        { id: 'eventos',         label: 'Eventos' },
        { id: 'planos',          label: 'Planos' },
        { id: 'recorrido-nuevo', label: 'Agendar Visita' },
        { id: 'contacto',        label: 'Contacto' },
      ],
    },
  },

  // ── ENGLISH ──────────────────────────────────────────────────────────────────
  en: {
    loading: { brand: 'ALTA NORTE', subtitle: 'Country Development' },

    nav: {
      links: [
        { id: 'inicio',          label: 'Home' },
        { id: 'nosotros',        label: 'About' },
        { id: 'actividades',     label: 'Activities' },
        { id: 'lifestyle',       label: 'Lifestyle' },
        { id: 'eventos',         label: 'Events' },
        { id: 'planos',          label: 'Plans' },
        { id: 'recorrido-nuevo', label: 'Book a Visit' },
        { id: 'contacto',        label: 'Contact' },
      ],
      cta: 'QUOTE',
      ctaMobile: 'QUOTE LOT',
    },

    hero: {
      preTitle: 'Country Development · Sierra Madre',
      label: 'reserve',
      subtitle: 'Ski, Camping & Resort in the Sierra Madre',
      cta: 'Discover the Project',
      ctaLots: 'View Lots',
    },

    about: {
      badge: 'Exclusive Development',
      isologoAlt: 'Alta Norte',
      title: 'Alta Norte. One of a Kind',
      description: 'A lifestyle surrounded by nature, peace and luxury. With extensive country lots and world-class amenities, discover a new north to live in.',
      stats: [
        { value: '50+',  label: 'Available Lots'  },
        { value: '100%', label: 'Natural Setting'  },
      ],
      features: [
        { title: 'Extensive', subtitle: 'Country Lots' },
        { title: 'Luxury',    subtitle: 'Amenities' },
        { title: 'Unique',    subtitle: 'Ski Slope in the Region' },
        { title: 'Sports',    subtitle: 'Courts & Recreation' },
      ],
      showcase: {
        title1: 'Designed for those who seek',
        title2: 'the extraordinary',
        description: 'A unique experience where nature and luxury meet in perfect harmony.',
        items: [
          'Panoramic views of the Sierra Madre',
          'Exclusive access to ski slopes',
          'Nature trails and camping areas',
          'World-class amenities',
        ],
        badge: { label: 'RESERVE', title: 'ALTA NORTE' },
        card: { title: 'Sierra Madre', desc: 'An incomparable living experience in the mountains' },
      },
      cta: 'QUOTE & RESERVE YOUR LOT',
    },

    amenities: {
      badge: 'Our Amenities',
      title: 'Live the Full Experience',
      subtitle: 'Every corner of Reserva Alta Norte is designed to offer you the best of nature, sports and luxury.',
      items: [
        { title: 'Extensive Country Lots',        desc: 'Spacious lots to build your dream life in the heart of the Sierra Madre.',   icon: 'lotes'   },
        { title: 'Luxury Amenities',              desc: 'First-class exclusive facilities for an incomparable lifestyle.',             icon: 'star'    },
        { title: 'Unique Ski Slope in the Region',desc: 'The only ski slope in the region, right in the Sierra Madre mountains.',     icon: 'mountain'},
        { title: 'Sports Courts',                 desc: 'Padel, tennis and more to stay active in a world-class natural setting.',    icon: 'courts'  },
        { title: 'Ski Run',                       desc: 'Descend spectacular slopes with modern ski and snowboard facilities.',       icon: 'flag'    },
        { title: 'Nature Trails',                 desc: 'Kilometers of mountain trails for hiking, trail running and cycling.',       icon: 'trails'  },
        { title: 'Camping Area',                  desc: 'Exclusive glamping and camping zones under the mountain stars.',             icon: 'camping' },
        { title: 'Club House',                    desc: 'Social hub with restaurant, event hall and relaxation area.',                icon: 'house'   },
      ],
    },

    lifestyle: {
      badge: 'The Three Pillars',
      title: 'Ski, Camping & Resort',
      subtitle: 'Three unique worlds in one place. Luxury, adventure and nature in perfect harmony.',
      pillars: [
        { tag: 'Adventure', title: 'Ski Resort', desc: 'The only ski slope in the region. Descend the Sierra Madre slopes with breathtaking views.' },
        { tag: 'Nature',    title: 'Camping',    desc: 'Campsites and trails in the forest. Disconnect and reconnect with the purest nature.' },
        { tag: 'Luxury',    title: 'Resort',     desc: 'Club House, palapa, event hall and padel area. World-class amenities.' },
      ],
      amenities: ['Ski Run', 'Nature Trails', 'Camping Area', 'Club House'],
    },

    plans: {
      badge: 'Lot Map',
      title: 'INTERACTIVE PLAN',
      subtitle: 'Explore available lots. Click on any lot to view information and generate a quote.',
      viewPlano: 'Plan',
      viewLotes: 'Lot View',
    },

    actividades: {
      tag: 'What you can do',
      heading1: 'Adventure, nature',
      heading2: 'and total rest.',
      lead: '16 activities designed for enjoyment in every season of the year.',
      filters: [
        { key: 'all',        label: 'All'       },
        { key: 'aventura',   label: 'Adventure' },
        { key: 'naturaleza', label: 'Nature'    },
        { key: 'relax',      label: 'Relax'     },
        { key: 'invierno',   label: 'Winter'    },
      ],
      items: [
        { icon: '⛷️',  cat: ['invierno','aventura'],   catLabel: 'Winter',    name: 'Ski & Snowboard' },
        { icon: '🏔️', cat: ['aventura','naturaleza'], catLabel: 'Adventure', name: 'Mountain Hiking' },
        { icon: '🎣',  cat: ['naturaleza','relax'],    catLabel: 'Nature',    name: 'Sport Fishing' },
        { icon: '🚴',  cat: ['aventura'],              catLabel: 'Adventure', name: 'Mountain Biking' },
        { icon: '🏕️', cat: ['naturaleza','relax'],    catLabel: 'Nature',    name: 'Glamping & Camping' },
        { icon: '🔭',  cat: ['naturaleza','relax'],    catLabel: 'Nature',    name: 'Astronomical Observatory' },
        { icon: '🐦',  cat: ['naturaleza'],            catLabel: 'Nature',    name: 'Bird Watching' },
        { icon: '🎯',  cat: ['aventura'],              catLabel: 'Adventure', name: 'Shooting Range' },
        { icon: '🏓',  cat: ['aventura','relax'],      catLabel: 'Sports',    name: 'Sports Courts' },
        { icon: '🔥',  cat: ['relax','naturaleza'],    catLabel: 'Relax',     name: 'Nightly Bonfire' },
        { icon: '🧘',  cat: ['relax'],                 catLabel: 'Relax',     name: 'Nature Yoga' },
        { icon: '🍽️', cat: ['relax'],                 catLabel: 'Relax',     name: 'Mountain Restaurant' },
        { icon: '🏊',  cat: ['relax'],                 catLabel: 'Relax',     name: 'Panoramic Pool' },
        { icon: '🌿',  cat: ['naturaleza','relax'],    catLabel: 'Nature',    name: 'Trail Running' },
        { icon: '🎿',  cat: ['invierno','aventura'],   catLabel: 'Winter',    name: 'Ski Lessons' },
        { icon: '🎪',  cat: ['aventura','naturaleza'], catLabel: 'Family',    name: 'Family Areas' },
      ],
    },

    clima: {
      tag: 'Before you visit',
      heading1: 'Climate and what',
      heading2: 'you should bring.',
      seasons: [
        { key: 'primavera', emoji: '🌸', label: 'Spring' },
        { key: 'verano',    emoji: '🌿', label: 'Summer' },
        { key: 'otono',     emoji: '🍂', label: 'Fall'   },
        { key: 'invierno',  emoji: '❄️', label: 'Winter' },
      ],
      data: {
        primavera: {
          temp: '16°C', range: '5°C — 20°C · Mar – May',
          desc: 'Mild days perfect for hiking. The forest at its greenest moment.',
          tags: ['🌸 Blooming', '🚴 Cycling', '☀️ Sunny'],
          gear: [
            { emoji: '🧥', title: 'Light jacket',      desc: 'Nights at 5°C. A light waterproof jacket is recommended.' },
            { emoji: '🧴', title: 'SPF 50+ sunscreen', desc: 'At 2,400 m altitude, UV radiation is very intense.' },
          ],
        },
        verano: {
          temp: '18°C', range: '8°C — 22°C · Jun – Aug',
          desc: 'Afternoon showers. The sierra in its greenest splendor.',
          tags: ['🌧️ Rainfall', '🌿 Peak green', '🌈 Sunsets'],
          gear: [
            { emoji: '☂️', title: 'Rain jacket or poncho', desc: 'Short but intense afternoon showers.' },
            { emoji: '👟', title: 'Waterproof boots',       desc: 'Trails get wet quickly.' },
          ],
        },
        otono: {
          temp: '12°C', range: '2°C — 18°C · Sep – Nov',
          desc: 'Spectacular forest colors. Nights with unique starry skies.',
          tags: ['🍂 Fall colors', '⭐ Stargazing', '🔥 Bonfires'],
          gear: [
            { emoji: '🧣', title: 'Layered clothing', desc: 'Thermal base + sweater + outer jacket.' },
            { emoji: '📷', title: 'Camera',            desc: 'Best season for sierra photography.' },
          ],
        },
        invierno: {
          temp: '-2°C', range: '-8°C — 10°C · Dec – Feb',
          desc: 'Ski season. The only slope in the region activates with real snow.',
          tags: ['❄️ Snow', '⛷️ Active slopes', '🏔️ Snow views'],
          gear: [
            { emoji: '🧥', title: 'Full thermal gear', desc: 'Thermal shirt, pants and socks.' },
            { emoji: '🎿', title: 'Ski equipment',      desc: 'Bring your own or rent at the facilities.' },
          ],
        },
      },
    },

    llegar: {
      tag: 'Location',
      heading1: 'Getting here is',
      heading2: 'easier than',
      heading3: 'you think.',
      lead: 'Sierra Madre Occidental, Durango. A few hours from major cities — and one flight from the U.S.',
      stepsLabel: 'Step by step',
      routes: [
        { key: 'durango',   emoji: '🚗', from: 'From Durango',   time: '50 min',          detail: 'MEX-40 · Paved access' },
        { key: 'mazatlan',  emoji: '🚗', from: 'From Mazatlán',  time: '2:45 hrs',         detail: 'Sun Highway · Scenic route' },
        { key: 'usa',       emoji: '✈️', from: 'From the U.S.',  time: 'Flight + 2 hrs',   detail: 'Houston · Dallas · Phoenix → DGO' },
        { key: 'monterrey', emoji: '🚗', from: 'From Monterrey', time: '5 hrs',             detail: 'Federal highway' },
      ],
      steps: [
        { title: 'Leave Durango heading south', body: 'Take MEX-40. Only <strong>50 minutes</strong> on paved road.' },
        { title: 'Take the signposted turnoff', body: '<strong>Alta Norte</strong> signage visible from the highway on the right.' },
        { title: 'Arrive at the main gate',     body: '8 km further. <strong>Let us know before you leave</strong> via WhatsApp so the guard can expect you.' },
      ],
      mapBtn: 'Google Maps →',
      visitBtn: 'Schedule a visit',
    },

    eventos: {
      tag: 'Social Events',
      heading1: 'The perfect setting',
      heading2: 'for what matters.',
      lead: 'The Club House and the natural surroundings of Alta Norte are the unique backdrop for the most special events.',
      items: [
        {
          tag: 'Weddings', image: '/images/tour/salon/Panorama4.webp',
          title: 'Weddings & Private Celebrations',
          desc: 'The forest as your wedding backdrop. No generic venues.',
          features: ['Any capacity', 'Full coordination', 'Mountain gastronomy', 'Lodging included'],
          cta: 'Check availability',
        },
        {
          tag: 'Social', image: '/images/tour/palapa/Panorama5.webp',
          title: 'Quinceañeras & Family Gatherings',
          desc: 'The sierra and the stars as an unmatched decoration.',
          features: ['Covered palapas and spaces', 'Private bonfire area', 'Activities for all ages', 'Private security'],
          cta: 'Request information',
        },
        {
          tag: 'Corporate', image: '/images/tour/hostal/Panorama2.webp',
          title: 'Retreats & Team Building',
          desc: 'No urban distractions. Maximum creativity.',
          features: ['Equipped meeting room', 'Custom team building', 'Team lodging', 'Zero distractions'],
          cta: 'Plan my retreat',
        },
      ],
      bannerTag: 'Companies & universities',
      bannerTitle: 'Looking for the ideal setting for your high-level meeting?',
      bannerSub: 'The Sierra Madre as the backdrop for your most important decisions.',
      bannerBtn: 'Talk to an advisor →',
    },

    recorrido: {
      tag: 'Free · No commitment',
      heading1: 'Schedule your tour',
      heading2: 'and take home a',
      heading3: 'surprise gift.',
      lead: 'Visit Alta Norte for free. Lunch included + surprise gift at the end.',
      timeline: [
        { dot: '1',  title: 'Welcome at the main gate',  desc: 'Your advisor receives you and hands a welcome kit.',          time: '~15 min' },
        { dot: '2',  title: '4×4 lot tour',              desc: 'Explore available lots with their views.',                    time: '~45 min' },
        { dot: '3',  title: 'Amenities tour',            desc: 'Ski resort, lake, Club House, trails and observatory.',       time: '~30 min' },
        { dot: '4',  title: 'Lunch at the Club House',   desc: 'Included lunch for you and your companion.',                  time: '~60 min · Free' },
        { dot: '🎁', title: 'Your surprise gift',        desc: 'Something special from the Sierra Madre. Worth the trip.',   time: 'At the end' },
      ],
      gift: {
        title: 'What is the surprise gift?',
        items: [
          'Artisanal products from the Sierra Madre',
          'An exclusive gastronomic experience',
          "A keepsake you won't find anywhere else",
        ],
      },
      form: {
        stepPre: 'Step', stepSuf: 'of 3',
        step1: { title: 'What is your interest?', sub: 'Tell us what brought you here.' },
        step2: { title: 'Your contact details',   sub: 'Your advisor confirms in less than 24 hrs.' },
        step3: { title: 'Choose date & group',    sub: 'When and how many are going?', reminder: '🎁 Remember: Surprise gift + included lunch at the end.' },
        intentOptions: [
          { icon: '🏡', label: 'Buy a lot',     sub: 'To build'      },
          { icon: '🏖️', label: 'Vacation home', sub: 'Weekends'      },
          { icon: '📈', label: 'Investment',     sub: 'Appreciation'  },
          { icon: '👀', label: 'Just browsing',  sub: 'No commitment' },
        ],
        fields: {
          nombre: 'First Name', apellido: 'Last Name', whatsapp: 'WhatsApp',
          ciudad: 'Current City', ciudadPh: 'E.g.: Houston TX / Monterrey NL',
          fecha: 'Preferred Date', grupo: 'How many are going?',
        },
        grupoOptions: ['Just me', 'Me + 1 companion', 'Family (3–4)', 'Group (5+)'],
        nextBtn: 'Next →', confirmBtn: 'Confirm tour →', prevBtn: '← Back',
        trust: 'No spam · No commitment · Response in less than 24 hrs',
      },
      success: { title: 'Tour scheduled!', sub: 'Your advisor will contact you in less than 24 hrs. Your surprise gift awaits!' },
    },

    infoPractica: {
      tag: 'Practical info',
      heading1: 'What you need to know',
      heading2: 'before you arrive.',
      lead: 'Hover over each card to see the details.',
      cards: [
        { icon: '📡', title: 'Connectivity', backTitle: 'No signal, but WiFi',
          backText: 'High-speed WiFi in all areas. WhatsApp and video calls work fine.',
          chips: ['WiFi ✓', 'No 4G'] },
        { icon: '💳', title: 'Payments', backTitle: 'Cash + card',
          backText: 'Visa, Mastercard, Amex. USD and MXN in cash. Wire transfer for lots.',
          chips: ['Visa ✓', 'USD/MXN'] },
        { icon: '🌡️', title: 'Altitude', backTitle: '2,400 m asl',
          backText: 'Possible altitude sickness on the first day. Stay hydrated and rest during the first hours.',
          chips: ['Stay hydrated', 'Rest'] },
        { icon: '🏥', title: 'Emergencies', backTitle: '24/7',
          backText: 'On-site first aid. Hospital 30 min away. Durango 50 min away.',
          chips: ['30 min hosp.', '24/7'] },
      ],
    },

    tour: {
      badge: 'Immersive tour · 14 spaces',
      subtitle: 'Explore Alta Norte from wherever you are. Club House, Hostal, Ski Area and more.',
      cta: 'Click to explore',
      dragHint: 'Drag · Zoom',
      soundLabel: 'Sound',
    },

    cotizador: {
      usdNote: 'Prices in MXN. For clients paying in USD, the exchange rate may vary and prices are subject to change without notice.',
    },

    contact: {
      badge: 'Get in Touch',
      title: 'CONTACT US',
      subtitle: 'Connect with our sales team to learn more about the community.',
      phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', writeUs: 'Write to Us',
      salesOffice: 'Sales Office',
      addressLine1: 'Av. 20 de Nov #403 Ote, Downtown',
      addressLine2: 'Durango, Dgo. Mexico',
    },

    footer: {
      tagline: 'An extraordinary lifestyle in the Sierra Madre. Ski, Camping and Resort in a unique real estate development.',
      nav: 'Navigation', contact: 'Contact', phone: 'Phone', email: 'Email',
      office: 'Sales Office',
      addressLine1: 'Av. 20 de Nov #403 Ote, Downtown',
      addressLine2: 'Durango, Dgo. Mexico',
      rights: '© 2026 Reserva Alta Norte. All rights reserved.',
      terms: 'Terms', privacy: 'Privacy',
      links: [
        { id: 'inicio',          label: 'Home'        },
        { id: 'nosotros',        label: 'About'       },
        { id: 'actividades',     label: 'Activities'  },
        { id: 'lifestyle',       label: 'Lifestyle'   },
        { id: 'eventos',         label: 'Events'      },
        { id: 'planos',          label: 'Plans'       },
        { id: 'recorrido-nuevo', label: 'Book a Visit'},
        { id: 'contacto',        label: 'Contact'     },
      ],
    },
  },
}

export function useI18n() {
  const t = computed(() => translations[_lang.value])

  function setLang(lang) {
    if (!translations[lang]) return
    _lang.value = lang
    if (typeof localStorage !== 'undefined') localStorage.setItem('alta-norte-lang', lang)
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }

  return { lang: _lang, t, setLang }
}
