/**
 * El copy es configuración: todos los textos y datos de la marca viven acá.
 * Los componentes solo consumen y pintan.
 *
 * Datos verificados (reunión del 6 oct 2026 y comprobantes del SRI):
 * razón social, RUC, matriz, teléfono, planta en Durán, 8 años, FSSC 22000.
 * Lo marcado "POR CONFIRMAR" se valida con Lenin Fernández antes de publicar.
 */
export const site = {
  name: 'Envapel',
  legalName: 'Envases Flexibles del Ecuador Envapel S.A.',
  group: 'Grupo Fernández',
  ruc: '0993186414001',
  tagline: 'Sacos de papel multicapa fabricados en Ecuador',
  description:
    'Fabricamos sacos industriales de papel kraft multicapa para fertilizantes, harinas, polvos, carbón y arena para mascotas. Planta propia en Durán y certificación FSSC 22000.',
  // POR CONFIRMAR: dominio definitivo (envapel.com hoy redirige a un sitio ajeno)
  url: 'https://envapel.com',
  email: '',
  phoneDisplay: '+593 98 562 1889',
  // Solo dígitos con código de país
  whatsapp: '593985621889',
  address: {
    plant: 'Planta industrial en Durán, Guayas',
    office: 'Bodegas Zatirón, Mz. 112 y Solar 4, Guayaquil',
    mapsQuery: 'Durán, Guayas, Ecuador',
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
  nav: [
    { label: 'Productos', to: '/#productos' },
    { label: 'Anatomía', to: '/#anatomia' },
    { label: 'Planos', to: '/#planos' },
    { label: 'Industrias', to: '/#industrias' },
    { label: 'Planta', to: '/#planta' },
    { label: 'Preguntas', to: '/#preguntas' },
  ],

  hero: {
    eyebrow: 'Fabricante nacional · Durán, Ecuador',
    title: 'Sacos de papel multicapa que aguantan lo que tu producto pesa.',
    text: 'Diseñamos y fabricamos sacos industriales de papel kraft para la agroindustria y para marcas que están creciendo: desde fertilizantes y harinas hasta carbón y arena para gatos.',
    primary: 'Cotizar mi saco',
    secondary: 'Ver planos técnicos',
    stats: [
      { value: '8', unit: 'años', label: 'fabricando en Ecuador' },
      { value: 'FSSC', unit: '22000', label: 'inocuidad alimentaria' },
      { value: 'Durán', unit: '', label: 'planta industrial propia' },
      { value: 'Todo', unit: 'el país', label: 'cobertura de despacho' },
    ],
  },

  products: {
    eyebrow: 'Catálogo',
    title: 'Un saco para cada forma de llenar',
    text: 'Elegimos la construcción según cómo envasas: por válvula con máquina, o por boca abierta para cerrar con costura o pegado. Todo se fabrica a la medida de tu producto.',
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
    text: 'Somos fabricantes, no intermediarios. Controlamos el proceso desde la bobina de papel kraft hasta el pallet que llega a tu bodega, con estándares de inocuidad para productos de consumo.',
    certTitle: 'Certificación FSSC 22000',
    certText:
      'Esquema de inocuidad alimentaria reconocido por la GFSI. Significa que nuestros sacos pueden estar en contacto con harinas, azúcar, balanceados y otros alimentos con procesos auditados.',
    points: [
      'Planta industrial propia en Durán',
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

  whatsappDefault: 'Hola Envapel, quiero información sobre sus sacos de papel multicapa.',
} as const

export function whatsappLink(message: string = site.whatsappDefault): string {
  if (!site.whatsapp) return '#'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}
