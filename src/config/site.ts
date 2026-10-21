/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 *
 * Datos verificados (reunión del 6 oct 2026, comprobantes del SRI y paquete
 * de contenido que Lenin entregó el 20 oct 2026): razón social, RUC, planta
 * en el km 7,5 vía Durán–Tambo, correo ventas@, WhatsApp comercial, 8 años,
 * papel extensible 100 % virgen y FSSC 22000 v6 emitida por SGS.
 */
export const site = {
  name: 'Envapel',
  legalName: 'Envases Flexibles del Ecuador Envapel S.A.',
  group: 'Grupo Fernández',
  ruc: '0993186414001',
  tagline: 'Sacos de papel multicapa fabricados en Ecuador',
  slogan: 'Ser responsables es nuestro papel.',
  description:
    'Fabricamos sacos industriales de papel multicapa para granos, polvos y granulados: fertilizantes, harinas, balanceados, carbón y arena para mascotas. Planta en Durán y certificación FSSC 22000 v6.',
  // POR CONFIRMAR: dominio definitivo (envapel.com hoy redirige a un sitio ajeno)
  url: 'https://envapel.com',
  email: 'ventas@envapel.com',
  phoneDisplay: '+593 96 260 3441',
  // Solo dígitos con código de país
  whatsapp: '593962603441',
  address: {
    plant: 'Km 7,5 vía Durán–Tambo, Durán, Guayas',
    office: 'Bodegas Zatirón, Mz. 112 y Solar 4, Guayaquil',
    mapsQuery: 'Km 7.5 via Duran Tambo, Duran, Ecuador',
  },
  sisterBrand: {
    name: 'KAPA by Envapel',
    text: 'Empaques para food service',
    url: 'https://kapa.com.ec',
  },
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },

  // Navegación principal: una página por sección, como pidió el cliente.
  nav: [
    { label: 'Productos', to: '/productos' },
    { label: 'Aplicaciones', to: '/aplicaciones' },
    { label: 'Quiénes somos', to: '/nosotros' },
    { label: 'Sostenibilidad', to: '/sostenibilidad' },
    { label: 'Contacto', to: '/contacto' },
  ],

  // Páginas secundarias que viven bajo el paraguas de productos.
  productSubnav: [
    { label: 'Sectores de aplicación', to: '/aplicaciones' },
    { label: 'Características y planos', to: '/caracteristicas' },
    { label: 'Inocuidad FSSC 22000 v6', to: '/inocuidad' },
  ],

  hero: {
    eyebrow: 'Fabricamos en Durán, Ecuador',
    title: 'Sacos de papel multicapa que aguantan lo que tu producto pesa.',
    text: 'Diseñamos y fabricamos sacos industriales de papel extensible 100 % virgen para la agroindustria, los alimentos, la construcción y las marcas que están creciendo: desde fertilizantes y harinas hasta carbón y arena para gatos.',
    primary: 'Cotizar mi saco',
    secondary: 'Ver nuestros sacos',
    stats: [
      { value: '8', unit: 'años', label: 'fabricando en Ecuador' },
      { value: 'FSSC', unit: '22000 v6', label: 'certificados por SGS' },
      { value: '100 %', unit: 'virgen', label: 'papel extensible' },
      { value: 'Todo', unit: 'el país', label: 'cobertura de despacho' },
    ],
  },

  products: {
    eyebrow: 'Catálogo',
    title: 'Un saco para cada forma de llenar',
    text: 'Elegimos la construcción según cómo envasas: por válvula con máquina, o por boca abierta para cerrar con costura o pegado. Todo se fabrica a la medida de tu producto.',
  },

  cert: {
    eyebrow: 'Inocuidad alimentaria',
    title: 'Certificación FSSC 22000 v6',
    text: 'Nuestro sistema de gestión de inocuidad alimentaria está certificado por SGS. Procesos estandarizados, materias primas homologadas y trazabilidad por lote respaldan cada saco que sale de la planta.',
    cta: 'Conocer la certificación',
  },

  anatomy: {
    eyebrow: 'Anatomía de un saco multicapa',
    title: 'Cada hoja cumple una función',
    text: 'Un saco multicapa no es papel grueso: es una estructura. Toca cada capa para ver qué aporta.',
  },

  blueprint: {
    eyebrow: 'Planos técnicos',
    title: 'Medidas que tu línea de envasado entiende',
    text: 'Trabajamos con tus planos o te ayudamos a definir ancho, largo, fuelle y válvula según el peso y la densidad de tu producto.',
    cta: 'Enviar mis medidas',
  },

  industries: {
    eyebrow: 'Industrias',
    title: 'Hecho para lo que pesa, lo que se derrama y lo que se come',
  },

  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'De tu idea al saco en tu bodega',
  },

  plant: {
    eyebrow: 'Nuestra planta',
    title: 'Fabricamos en Durán, despachamos a todo el país',
    text: 'Somos fabricantes, no intermediarios. Controlamos el proceso desde la bobina de papel hasta el pallet que llega a tu bodega, con estándares de inocuidad para productos de consumo.',
    certTitle: 'Certificación FSSC 22000 v6',
    certText:
      'Esquema de inocuidad alimentaria reconocido por la GFSI y certificado por SGS. Significa que nuestros sacos pueden estar en contacto con harinas, azúcar, balanceados y otros alimentos con procesos auditados.',
    points: [
      'Planta en el km 7,5 vía Durán–Tambo',
      'Trazabilidad por lote de producción',
      'Impresión flexográfica de tu marca',
      'Atención directa con el área comercial',
    ],
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que nos preguntan antes de cotizar',
  },

  quote: {
    eyebrow: 'Cotización',
    title: 'Cuéntanos qué envasas y te armamos el saco',
    text: 'Llena lo que sepas. Al enviar se abre WhatsApp con tu solicitud lista y un asesor te responde.',
    submit: 'Enviar por WhatsApp',
  },

  // Encabezados de cada página interior. El título manda en el <title> y el h1.
  pages: {
    productos: {
      title: 'Sacos industriales multicapa',
      eyebrow: 'Envapel · Fabricación ecuatoriana',
      text: 'Valvulados y de boca abierta con papel extensible 100 % virgen, desarrollados según el producto y su proceso de envasado.',
    },
    aplicaciones: {
      title: 'Sectores de aplicación',
      eyebrow: 'Especialización industrial',
      text: 'Agroindustria, alimentos, química y construcción: cada contenido pide una especificación propia.',
    },
    caracteristicas: {
      title: 'Características y planos técnicos',
      eyebrow: 'Documentación técnica',
      text: 'Cómo se define la estructura, el formato, el llenado y la protección de un saco multicapa.',
    },
    inocuidad: {
      title: 'Inocuidad y FSSC 22000 v6',
      eyebrow: 'Inocuidad alimentaria',
      text: 'Procesos estandarizados, trazabilidad y control de materias primas para la cadena agroalimentaria.',
    },
    nosotros: {
      title: 'Quiénes somos',
      eyebrow: 'Desde Ecuador, para tu industria',
      text: 'Fabricación ecuatoriana y atención directa de fábrica para las necesidades de empaque de tu empresa.',
    },
    sostenibilidad: {
      title: 'Sostenibilidad',
      eyebrow: 'Nuestro compromiso',
      text: 'Diseñamos empaques de papel pensando en su función, el uso de materiales y el final de su vida útil.',
    },
    contacto: {
      title: 'Ubicación y contacto',
      eyebrow: 'Contacto comercial',
      text: 'Planta en Durán, atención nacional y asesoría técnica para tu próximo proyecto.',
    },
  },

  about: {
    lead: 'Con 8 años de experiencia, Envapel se especializa en la fabricación de sacos industriales de papel multicapa para granos y polvos, con atención a empresas alimentarias, agroindustriales e industriales de todo el Ecuador.',
    body: 'Desde la planta en Durán acompañamos cada proyecto con atención directa de fábrica. Trabajamos con papel extensible 100 % virgen y un sistema de gestión de inocuidad certificado FSSC 22000 v6 por SGS. El formato, las capas, los gramajes y la impresión de cada saco se definen con tu producto y tu línea de envasado sobre la mesa.',
    facts: [
      { value: '8 años', label: 'de experiencia en empaques industriales' },
      { value: 'A medida', label: 'formato, estructura e identidad de tu marca' },
      { value: 'Nacional', label: 'atención y despacho en todo el Ecuador' },
    ],
  },

  sustainability: {
    lead: 'Elegir bien la estructura ayuda a proteger el producto y a usar los materiales de forma eficiente. Nada sobra y nada falta: ese es el criterio.',
    body: [
      'Trabajamos con papel extensible 100 % virgen y definimos capas y gramajes según lo que el producto de verdad necesita. El objetivo es equilibrar protección y uso de materiales, sin añadir componentes que la aplicación no pide.',
      'La posibilidad de reciclaje depende de la composición final del saco, del contenido residual y de los sistemas de recolección disponibles. Cuando el producto exige materiales de barrera, esa necesidad se evalúa como parte del desarrollo técnico, no después.',
    ],
    cta: 'Diseñemos una solución para tu empresa',
  },

  foodSafety: {
    lead: 'Envapel cuenta con certificación FSSC 22000 v6, emitida por SGS, para su sistema de gestión de inocuidad alimentaria.',
    controls: [
      {
        title: 'Control de procesos',
        text: 'Procedimientos estandarizados y controles de higiene orientados a prevenir peligros de inocuidad durante la fabricación.',
      },
      {
        title: 'Materias primas y trazabilidad',
        text: 'Materias primas homologadas y trazabilidad por lote para respaldar el seguimiento de cada empaque.',
      },
      {
        title: 'Evaluación de la aplicación',
        text: 'El empaque se define según el alimento, las condiciones de uso y los requisitos de tu empresa.',
      },
    ],
    note: 'FSSC 22000 v6 es un esquema de certificación del sistema de gestión de inocuidad alimentaria. Su aplicación se limita al alcance certificado; la aptitud del saco para un alimento específico se revisa según su composición y uso previsto.',
  },

  whatsappDefault: 'Hola Envapel, quiero información sobre sus sacos de papel multicapa.',

  // Panel donde Envapel administra su catálogo sin tocar código
  admin: {
    title: 'Panel Envapel',
    loginTitle: 'Entrar al panel',
    loginText: 'Administra los sacos que se muestran en la web.',
    productsTitle: 'Productos',
    productsText:
      'Lo que publiques aquí aparece en la web al instante. Los borradores solo los ves tú.',
    empty: 'Todavía no hay productos. Crea el primero.',
    newProduct: 'Nuevo producto',
    imageHelp:
      'Foto del saco en JPG o PNG, de hasta 10 MB. Sin foto, la web muestra el dibujo del saco.',
    deleteConfirm: '¿Eliminar este producto? Esta acción no se puede deshacer.',
  },
} as const

export function whatsappLink(message: string = site.whatsappDefault): string {
  if (!site.whatsapp) return '#'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}
