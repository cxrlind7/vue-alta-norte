import { ref, computed } from 'vue'

// ── Module-level singleton: shared across all components ──────────────────────
const _lang = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem('alta-norte-lang')) || 'es'
)

const translations = {
  es: {
    loading: { brand: 'ALTA NORTE', subtitle: 'Desarrollo Campestre' },

    nav: {
      links: [
        { id: 'inicio',      label: 'Inicio' },
        { id: 'nosotros',    label: 'Nosotros' },
        { id: 'amenidades',  label: 'Amenidades' },
        { id: 'lifestyle',   label: 'Lifestyle' },
        { id: 'planos',      label: 'Planos' },
        { id: 'contacto',    label: 'Contacto' },
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
      description:
        'Para un estilo de vida rodeado de naturaleza, paz y lujo. Con extensos lotes campestres y amenidades de primer nivel, te invitamos a descubrir un nuevo norte para vivir.',
      stats: [
        { value: '50+', label: 'Lotes Disponibles' },
        { value: '100%', label: 'Entorno Natural' },
      ],
      features: [
        { title: 'Extensos',    subtitle: 'Lotes Campestres' },
        { title: 'Amenidades',  subtitle: 'de Lujo' },
        { title: 'Pista',       subtitle: 'de Esquí única en la región' },
        { title: 'Canchas',     subtitle: 'Deportivas y Recreativas' },
      ],
      showcase: {
        title1: 'Diseñado para quienes buscan',
        title2: 'vivir lo extraordinario',
        description:
          'Una experiencia única donde la naturaleza y el lujo se encuentran en perfecta armonía.',
        items: [
          'Vistas panorámicas de la Sierra Madre',
          'Acceso exclusivo a pistas de esquí',
          'Senderos naturales y áreas de camping',
          'Amenidades de clase mundial',
        ],
        badge: {
          label: 'RESERVA',
          title: 'ALTA NORTE',
        },
        card: {
          title: 'Sierra Madre',
          desc: 'Experiencia de vida incomparable en las montañas',
        },
      },
      cta: 'COTIZA Y APARTA TU LOTE',
    },

    amenities: {
      badge: 'Nuestras Amenidades',
      title: 'Vive la Experiencia Completa',
      subtitle:
        'Cada rincón de Reserva Alta Norte está diseñado para ofrecerte lo mejor de la naturaleza, el deporte y el lujo.',
      items: [
        {
          title: 'Extensos Lotes Campestres',
          desc: 'Amplios lotes para construir la vida de tus sueños en plena Sierra Madre.',
          icon: 'lotes',
        },
        {
          title: 'Amenidades de Lujo',
          desc: 'Instalaciones exclusivas de primer nivel para un estilo de vida incomparable.',
          icon: 'star',
        },
        {
          title: 'Pista de Esquí Única en la Región',
          desc: 'La única pista de esquí de la región, directamente en la Sierra Madre.',
          icon: 'mountain',
        },
        {
          title: 'Canchas Deportivas',
          desc: 'Pádel, tenis y más para mantenerte activo en un entorno natural.',
          icon: 'courts',
        },
        {
          title: 'Pista de Ski',
          desc: 'Desciende por laderas espectaculares con instalaciones modernas de ski y snowboard.',
          icon: 'flag',
        },
        {
          title: 'Senderos Naturales',
          desc: 'Kilómetros de senderos para caminatas, trail running y ciclismo en la sierra.',
          icon: 'trails',
        },
        {
          title: 'Área de Camping',
          desc: 'Zonas exclusivas de glamping y camping bajo las estrellas de la montaña.',
          icon: 'camping',
        },
        {
          title: 'Casa Club',
          desc: 'Centro social del desarrollo con restaurante, salón de eventos y área de descanso.',
          icon: 'house',
        },
      ],
    },

    lifestyle: {
      badge: 'Lifestyle',
      title: 'Ski, Camping & Resort',
      subtitle:
        'Tres mundos únicos en un solo lugar. Lujo, aventura y naturaleza en perfecta armonía.',
      pillars: [
        {
          tag: 'Aventura',
          title: 'Ski Resort',
          desc: 'La única pista de esquí de la región. Desciende por las laderas de la Sierra Madre con vistas incomparables.',
        },
        {
          tag: 'Naturaleza',
          title: 'Camping',
          desc: 'Campamentos y senderos en medio del bosque. Desconéctate y reconéctate con la naturaleza más pura.',
        },
        {
          tag: 'Lujo',
          title: 'Resort',
          desc: 'Casa Club, palapa de descanso, salón de eventos y área de pádel. Amenidades de clase mundial.',
        },
      ],
      amenities: ['Pista de Ski', 'Senderos Naturales', 'Área de Camping', 'Casa Club'],
    },

    plans: {
      badge: 'Mapa de Lotes',
      title: 'PLANO INTERACTIVO',
      subtitle:
        'Explora los lotes disponibles. Da clic sobre cualquier lote para ver su información y generar una cotización.',
      viewPlano: 'Plano',
      viewLotes: 'Vista Lotes',
    },

    contact: {
      badge: 'Contáctanos',
      title: 'PONTE EN CONTACTO',
      subtitle:
        'Conéctate con nuestro equipo de ventas para conocer más sobre la comunidad.',
      phone:       'Teléfono',
      email:       'Email',
      whatsapp:    'WhatsApp',
      writeUs:     'Escríbenos',
      salesOffice: 'Oficina de Ventas',
      addressLine1: 'Av. 20 de Nov #403 Ote, Zona Centro',
      addressLine2: 'Durango, Dgo. México',
    },

    footer: {
      tagline:
        'Un estilo de vida extraordinario en la Sierra Madre. Ski, Camping y Resort en un desarrollo inmobiliario único.',
      nav:      'Navegación',
      contact:  'Contacto',
      phone:    'Teléfono',
      email:    'Email',
      office:   'Oficina de Ventas',
      addressLine1: 'Av. 20 de Nov #403 Ote, Zona Centro',
      addressLine2: 'Durango, Dgo. México',
      rights:   '© 2026 Reserva Alta Norte. Todos los derechos reservados.',
      terms:    'Términos',
      privacy:  'Privacidad',
      links: [
        { id: 'inicio',      label: 'Inicio' },
        { id: 'nosotros',    label: 'Nosotros' },
        { id: 'amenidades',  label: 'Amenidades' },
        { id: 'lifestyle',   label: 'Lifestyle' },
        { id: 'planos',      label: 'Planos' },
        { id: 'contacto',    label: 'Contacto' },
      ],
    },
  },

  // ── ENGLISH ────────────────────────────────────────────────────────────────
  en: {
    loading: { brand: 'ALTA NORTE', subtitle: 'Country Development' },

    nav: {
      links: [
        { id: 'inicio',      label: 'Home' },
        { id: 'nosotros',    label: 'About' },
        { id: 'amenidades',  label: 'Amenities' },
        { id: 'lifestyle',   label: 'Lifestyle' },
        { id: 'planos',      label: 'Plans' },
        { id: 'contacto',    label: 'Contact' },
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
      description:
        'A lifestyle surrounded by nature, peace and luxury. With extensive country lots and world-class amenities, discover a new north to live in.',
      stats: [
        { value: '50+', label: 'Available Lots' },
        { value: '100%', label: 'Natural Setting' },
      ],
      features: [
        { title: 'Extensive',   subtitle: 'Country Lots' },
        { title: 'Luxury',      subtitle: 'Amenities' },
        { title: 'Unique',      subtitle: 'Ski Slope in the Region' },
        { title: 'Sports',      subtitle: 'Courts & Recreation' },
      ],
      showcase: {
        title1: 'Designed for those who seek',
        title2: 'the extraordinary',
        description:
          'A unique experience where nature and luxury meet in perfect harmony.',
        items: [
          'Panoramic views of the Sierra Madre',
          'Exclusive access to ski slopes',
          'Nature trails and camping areas',
          'World-class amenities',
        ],
        badge: {
          label: 'RESERVE',
          title: 'ALTA NORTE',
        },
        card: {
          title: 'Sierra Madre',
          desc: 'An incomparable living experience in the mountains',
        },
      },
      cta: 'QUOTE & RESERVE YOUR LOT',
    },

    amenities: {
      badge: 'Our Amenities',
      title: 'Live the Full Experience',
      subtitle:
        'Every corner of Reserva Alta Norte is designed to offer you the best of nature, sports and luxury.',
      items: [
        {
          title: 'Extensive Country Lots',
          desc: 'Spacious lots to build your dream life in the heart of the Sierra Madre.',
          icon: 'lotes',
        },
        {
          title: 'Luxury Amenities',
          desc: 'First-class exclusive facilities for an incomparable lifestyle.',
          icon: 'star',
        },
        {
          title: 'Unique Ski Slope in the Region',
          desc: 'The only ski slope in the region, right in the Sierra Madre mountains.',
          icon: 'mountain',
        },
        {
          title: 'Sports Courts',
          desc: 'Padel, tennis and more to stay active in a world-class natural setting.',
          icon: 'courts',
        },
        {
          title: 'Ski Run',
          desc: 'Descend spectacular slopes with modern ski and snowboard facilities.',
          icon: 'flag',
        },
        {
          title: 'Nature Trails',
          desc: 'Kilometers of mountain trails for hiking, trail running and cycling.',
          icon: 'trails',
        },
        {
          title: 'Camping Area',
          desc: 'Exclusive glamping and camping zones under the mountain stars.',
          icon: 'camping',
        },
        {
          title: 'Club House',
          desc: 'Social hub with restaurant, event hall and relaxation area.',
          icon: 'house',
        },
      ],
    },

    lifestyle: {
      badge: 'The Three Pillars',
      title: 'Ski, Camping & Resort',
      subtitle:
        'Three unique worlds in one place. Luxury, adventure and nature in perfect harmony.',
      pillars: [
        {
          tag: 'Adventure',
          title: 'Ski Resort',
          desc: 'The only ski slope in the region. Descend the Sierra Madre slopes with breathtaking views.',
        },
        {
          tag: 'Nature',
          title: 'Camping',
          desc: 'Campsites and trails in the forest. Disconnect and reconnect with the purest nature.',
        },
        {
          tag: 'Luxury',
          title: 'Resort',
          desc: 'Club House, palapa, event hall and padel area. World-class amenities.',
        },
      ],
      amenities: ['Ski Run', 'Nature Trails', 'Camping Area', 'Club House'],
    },

    plans: {
      badge: 'Lot Map',
      title: 'INTERACTIVE PLAN',
      subtitle:
        'Explore available lots. Click on any lot to view information and generate a quote.',
      viewPlano: 'Plan',
      viewLotes: 'Lot View',
    },

    contact: {
      badge: 'Get in Touch',
      title: 'CONTACT US',
      subtitle:
        'Connect with our sales team to learn more about the community.',
      phone:       'Phone',
      email:       'Email',
      whatsapp:    'WhatsApp',
      writeUs:     'Write to Us',
      salesOffice: 'Sales Office',
      addressLine1: 'Av. 20 de Nov #403 Ote, Downtown',
      addressLine2: 'Durango, Dgo. Mexico',
    },

    footer: {
      tagline:
        'An extraordinary lifestyle in the Sierra Madre. Ski, Camping and Resort in a unique real estate development.',
      nav:      'Navigation',
      contact:  'Contact',
      phone:    'Phone',
      email:    'Email',
      office:   'Sales Office',
      addressLine1: 'Av. 20 de Nov #403 Ote, Downtown',
      addressLine2: 'Durango, Dgo. Mexico',
      rights:   '© 2026 Reserva Alta Norte. All rights reserved.',
      terms:    'Terms',
      privacy:  'Privacy',
      links: [
        { id: 'inicio',      label: 'Home' },
        { id: 'nosotros',    label: 'About' },
        { id: 'amenidades',  label: 'Amenities' },
        { id: 'lifestyle',   label: 'Lifestyle' },
        { id: 'planos',      label: 'Plans' },
        { id: 'contacto',    label: 'Contact' },
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
