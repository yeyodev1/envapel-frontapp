/**
 * Catálogo, detalle técnico por construcción, sectores, capas, proceso y FAQ.
 * Es copy estructurado: los productos se reemplazan por los del API cuando el
 * panel responde; el detalle por tipo de saco se cruza por slug.
 *
 * El nivel de detalle (tablas de especificación, usos por sector) sigue la
 * referencia que envió Lenin el 20 oct 2026, adaptada a lo que Envapel
 * fabrica: fondo pegado, papel extensible 100 % virgen y FSSC 22000 v6.
 */

import type { IconName } from './icons'

export type SackKind = 'valve' | 'open'

export interface Product {
  slug: string
  name: string
  short: string
  kind: SackKind
  // Fondo cuadrado: el saco se para solo
  square?: boolean
  description: string
  idealFor: string[]
  specs: { label: string; value: string }[]
  options: string[]
  // Foto real subida desde el panel; sin ella se dibuja el saco en SVG
  image?: { url: string }
}

export const products: Product[] = [
  {
    slug: 'saco-valvulado',
    name: 'Saco valvulado',
    short: 'Llenado rápido por válvula, cierre automático por presión del producto.',
    kind: 'valve',
    description:
      'Se construye con los extremos cerrados y una válvula en la esquina superior que recibe la boquilla de la ensacadora. Al terminar el llenado, el propio producto presiona la válvula y la sella: no necesita costura ni cosedora. Es la construcción preferida para polvos y granulados finos, y la que usan los proyectos de azúcar y cacao en polvo para exportación.',
    idealFor: [
      'Harinas y premezclas',
      'Azúcar y leche en polvo',
      'Cemento y morteros',
      'Polvos químicos',
      'Fertilizantes granulados',
    ],
    specs: [
      { label: 'Construcción', value: 'Tubo con fondos pegados y válvula' },
      { label: 'Apertura', value: 'Válvula para boquilla de llenado' },
      { label: 'Hojas', value: '2 a 4 de papel extensible 100 % virgen' },
      { label: 'Capa exterior', value: 'Kraft blanco o natural, con impresión' },
      { label: 'Capacidad', value: 'De 10 a 50 kg según densidad' },
      { label: 'Llenado', value: 'Ensacadoras por válvula, manuales o automáticas' },
    ],
    options: [
      'Válvula interna o externa, a la medida de tu boquilla',
      'Válvula con manga termosellable',
      'Lámina de polietileno como barrera de humedad',
      'Microperforado para desaireo en llenado rápido',
      'Impresión flexográfica hasta 4 colores',
    ],
  },
  {
    slug: 'saco-boca-abierta-cosido',
    name: 'Saco boca abierta cosido',
    short: 'Fondo cosido o pegado y cierre con cosedora en tu línea.',
    kind: 'open',
    description:
      'Llega a tu planta con el fondo cerrado y la boca abierta: se llena por el extremo superior, por gravedad o con tolva, y se cierra con cosedora, con o sin cinta crepé. Es el formato más versátil para granos, semillas, balanceados y productos troceados, y el más sencillo de integrar en líneas manuales o semiautomáticas.',
    idealFor: [
      'Granos, cereales y semillas',
      'Fertilizantes',
      'Balanceados y sales minerales',
      'Carbón vegetal',
      'Productos troceados',
    ],
    specs: [
      { label: 'Construcción', value: 'Tubo con fondo cosido o pegado' },
      { label: 'Apertura', value: 'Boca abierta, llenado superior' },
      { label: 'Hojas', value: '2 a 5 de papel extensible 100 % virgen' },
      { label: 'Capa exterior', value: 'Kraft blanco o natural, con impresión' },
      { label: 'Capacidad', value: 'De 5 a 50 kg según densidad' },
      { label: 'Cierre', value: 'Costura con o sin cinta crepé, en tu línea' },
    ],
    options: [
      'Fuelles laterales para mejor estiba y volumen',
      'Lámina de polietileno como barrera de humedad',
      'Papel extensible de alta resistencia para cargas exigentes',
      'Asas para presentaciones pequeñas',
      'Impresión flexográfica hasta 4 colores',
    ],
  },
  {
    slug: 'saco-boca-abierta-pegado',
    name: 'Saco boca abierta de fondo cuadrado',
    short: 'Se para solo en percha. Ideal para marcas que venden al consumidor.',
    kind: 'open',
    square: true,
    description:
      'Fondo pegado en escuadra que permite que el saco quede de pie en la percha y se apile limpio en el pallet. Pensado para presentaciones de retail donde la impresión de la marca vende tanto como el producto: arena para gatos, carbón para parrilla, alimento para mascotas y harinas al detal.',
    idealFor: [
      'Arena para gatos',
      'Carbón para parrilla',
      'Alimento para mascotas',
      'Harinas al detal',
    ],
    specs: [
      { label: 'Construcción', value: 'Fondo cuadrado pegado' },
      { label: 'Apertura', value: 'Boca abierta, llenado superior' },
      { label: 'Hojas', value: '2 a 3 de papel extensible 100 % virgen' },
      { label: 'Capa exterior', value: 'Kraft natural o blanco para alta cobertura' },
      { label: 'Capacidad', value: 'Presentaciones de 2 a 25 kg' },
      { label: 'Cierre', value: 'Pegado, cosido o doblado' },
    ],
    options: [
      'Impresión de alta cobertura para percha',
      'Ventana o asa troquelada',
      'Barrera contra grasa o humedad',
      'Papel blanco o kraft natural',
    ],
  },
]

/**
 * Detalle extendido de cada construcción para la página de productos: lo que
 * la ficha corta no alcanza a contar. Se cruza por slug, así sigue funcionando
 * aunque el catálogo venga del panel.
 */
export interface ProductDetail {
  slug: string
  tagline: string
  paragraphs: string[]
  featureTags: string[]
  sectors: string[]
  image?: string
  imageAlt?: string
}

export const productDetails: ProductDetail[] = [
  {
    slug: 'saco-valvulado',
    tagline: 'Llenado por válvula',
    paragraphs: [
      'El valvulado es el saco de las líneas que no pueden parar. La boquilla de la ensacadora entra por la válvula, el producto baja a presión y, al retirarla, el mismo peso del contenido sella el acceso. Sin costura, sin cinta, sin un segundo proceso.',
      'Cada combinación de producto, válvula y llenadora se revisa antes de fabricar: el diámetro de tu boquilla, la finura del polvo y el desaireo que necesita el llenado definen la válvula y la estructura. El formato por sí solo no da hermeticidad; si tu producto la exige, se resuelve con barrera y se valida con muestras.',
    ],
    featureTags: ['Válvula a medida', 'Polvos y granulados', 'Alta velocidad de llenado'],
    sectors: [
      'Azúcar y cacao en polvo para exportación',
      'Harinas, premezclas y leche en polvo',
      'Cemento, morteros y adhesivos cerámicos',
      'Fertilizantes y químicos en polvo',
    ],
    image: '/images/saco-valvulado.webp',
    imageAlt: 'Saco industrial de papel con extremos cerrados y válvula de llenado',
  },
  {
    slug: 'saco-boca-abierta-cosido',
    tagline: 'Llenado superior',
    paragraphs: [
      'El boca abierta es el formato más directo: el fondo llega cerrado de fábrica, tu línea llena por arriba y la cosedora remata. Funciona igual de bien con una tolva manual que con una línea automática, por eso es el punto de partida de la mayoría de operaciones.',
      'Los fuelles laterales aprovechan mejor el volumen y dejan el pallet más estable; la cinta crepé refuerza la costura cuando el producto es fino. El número de hojas se define por el peso y el maltrato del camino, no por costumbre: más capas no sustituyen una especificación bien hecha.',
    ],
    featureTags: ['Fondo cosido o pegado', 'Fuelles opcionales', 'Cierre en tu línea'],
    sectors: [
      'Granos, cereales y semillas',
      'Balanceados, premezclas y sales minerales',
      'Fertilizantes y sustratos',
      'Carbón vegetal y troceados',
    ],
    image: '/images/saco-boca-abierta.webp',
    imageAlt: 'Saco industrial de papel multicapa con boca superior abierta',
  },
  {
    slug: 'saco-boca-abierta-pegado',
    tagline: 'Fondo cuadrado',
    paragraphs: [
      'Cuando el saco va a una percha y no a una bodega, la presentación manda. El fondo pegado en escuadra hace que el empaque se pare solo, la cara frontal quede plana para la impresión y la estiba en punto de venta se vea ordenada.',
      'Es la construcción de las marcas: arena para gatos, carbón para parrilla, alimento para mascotas. Admite ventana troquelada, asa y barreras contra grasa o humedad según lo que el producto pida.',
    ],
    featureTags: ['Se para solo', 'Impresión de alta cobertura', 'Pensado para retail'],
    sectors: [
      'Arena para gatos y alimento para mascotas',
      'Carbón para parrilla',
      'Harinas y alimentos al detal',
      'Presentaciones de consumo de 2 a 25 kg',
    ],
    imageAlt: 'Saco de papel de fondo cuadrado parado en percha',
  },
]

export function detailFor(slug: string): ProductDetail | undefined {
  return productDetails.find((d) => d.slug === slug)
}

/** Comparativa de los dos accesos de llenado, para decidir rápido. */
export const formatComparison = {
  title: '¿Boca abierta o valvulado?',
  text: 'El punto de partida es tu sistema de llenado. La especificación final se confirma con el producto, el peso y las condiciones de uso.',
  criteria: [
    { label: 'Acceso de llenado', open: 'Abertura superior', valve: 'Válvula integrada' },
    { label: 'Cierre', open: 'Costura o pegado después de llenar', valve: 'La presión del producto sella la válvula' },
    { label: 'Equipo requerido', open: 'Tolva o línea con cosedora', valve: 'Ensacadora con boquilla' },
    { label: 'Productos típicos', open: 'Granos, troceados, balanceados', valve: 'Polvos y granulados finos' },
    { label: 'Personalización', open: 'Medidas, fuelle e impresión', valve: 'Medidas, válvula e impresión' },
  ],
}

/** Sectores que atendemos, con los productos que de verdad se empacan acá. */
export interface Sector {
  id: string
  name: string
  intro: string
  items: string[]
  format: string
  formatSlug: string
  image?: string
  imageAlt?: string
}

export const sectors: Sector[] = [
  {
    id: 'agricola',
    name: 'Agrícola',
    intro: 'Del campo al saco: productos que respiran y pesan.',
    items: ['Maíz, arroz y cereales', 'Semillas certificadas', 'Café y cacao', 'Fertilizantes y sustratos'],
    format: 'Boca abierta con fuelles',
    formatSlug: 'saco-boca-abierta-cosido',
    image: '/images/sector-granos.webp',
    imageAlt: 'Granos de maíz y cereales',
  },
  {
    id: 'pecuario',
    name: 'Pecuario y mascotas',
    intro: 'Nutrición animal con marca propia en la percha.',
    items: ['Balanceados y concentrados', 'Premezclas y sales minerales', 'Alimento para mascotas', 'Arena para gatos'],
    format: 'Boca abierta o fondo cuadrado',
    formatSlug: 'saco-boca-abierta-pegado',
    image: '/images/sector-semillas.webp',
    imageAlt: 'Plántulas y productos del agro',
  },
  {
    id: 'alimentario',
    name: 'Alimentario',
    intro: 'Contacto con alimento bajo procesos FSSC 22000 v6.',
    items: ['Harinas y premezclas de panificación', 'Azúcar y sal', 'Leche en polvo', 'Especias y deshidratados'],
    format: 'Valvulado o boca abierta',
    formatSlug: 'saco-valvulado',
    image: '/images/sector-harina.webp',
    imageAlt: 'Harina junto a un saco kraft',
  },
  {
    id: 'quimico',
    name: 'Químico e industrial',
    intro: 'Polvos finos que no pueden terminar en el piso de la bodega.',
    items: ['Carbonato de calcio', 'Pigmentos y aditivos', 'Resinas en polvo', 'Granulados industriales'],
    format: 'Valvulado con desaireo',
    formatSlug: 'saco-valvulado',
    image: '/images/sector-granulados.webp',
    imageAlt: 'Materia prima granulada industrial',
  },
  {
    id: 'construccion',
    name: 'Construcción y minerales',
    intro: 'Cargas pesadas, llenado rápido y estiba firme.',
    items: ['Cemento y morteros especiales', 'Adhesivos cerámicos', 'Yeso y cal', 'Minerales en polvo'],
    format: 'Valvulado multicapa',
    formatSlug: 'saco-valvulado',
    image: '/images/sector-minerales.webp',
    imageAlt: 'Polvo mineral y piedra caliza',
  },
  {
    id: 'biomasa',
    name: 'Carbón y biomasa',
    intro: 'Papel que resiste puntas, polvo y parrillas exigentes.',
    items: ['Carbón vegetal', 'Briquetas', 'Pellets', 'Astillas y troceados'],
    format: 'Boca abierta reforzado',
    formatSlug: 'saco-boca-abierta-cosido',
  },
]

export interface Layer {
  id: string
  name: string
  role: string
  detail: string
  tone: string
}

// De afuera hacia adentro
export const layers: Layer[] = [
  {
    id: 'print',
    name: 'Hoja exterior impresa',
    role: 'Tu marca y la información legal',
    detail:
      'Papel kraft natural o blanco con impresión flexográfica. Lleva logo, tabla nutricional, lote y códigos.',
    tone: '#c9a98c',
  },
  {
    id: 'strength',
    name: 'Hojas de resistencia',
    role: 'Soportan el peso y las caídas',
    detail:
      'Papel extensible 100 % virgen que absorbe impactos en el llenado, el apilado y el transporte. Se suman hojas según el peso.',
    tone: '#a6846b',
  },
  {
    id: 'barrier',
    name: 'Barrera opcional',
    role: 'Humedad, grasa u oxígeno',
    detail:
      'Lámina de polietileno o papel tratado para productos higroscópicos como fertilizantes, azúcar o arena para gatos.',
    tone: '#7a9c8a',
  },
  {
    id: 'contact',
    name: 'Hoja de contacto',
    role: 'La que toca tu producto',
    detail: 'Bajo procesos FSSC 22000 v6 para que el contacto con harinas y alimentos sea seguro.',
    tone: '#e7d7c2',
  },
]

export const industries: { icon: IconName; name: string; text: string }[] = [
  {
    icon: 'seedling',
    name: 'Fertilizantes',
    text: 'Granulados y higroscópicos que exigen barrera contra humedad.',
  },
  {
    icon: 'wheat-awn',
    name: 'Harinas y molinería',
    text: 'Contacto con alimento bajo procesos de inocuidad.',
  },
  {
    icon: 'flask',
    name: 'Polvos industriales',
    text: 'Llenado por válvula, sin fugas ni polvo en la bodega.',
  },
  {
    icon: 'fire',
    name: 'Carbón vegetal',
    text: 'Papel resistente a puntas y presentaciones para percha.',
  },
  {
    icon: 'cat',
    name: 'Arena para gatos',
    text: 'Fondo cuadrado y barrera para una marca que se vea en percha.',
  },
  {
    icon: 'cubes',
    name: 'Troceados y balanceados',
    text: 'Boca abierta cosida para llenado por gravedad.',
  },
]

export const processSteps = [
  {
    n: '01',
    title: 'Nos cuentas qué envasas',
    text: 'Producto, peso por saco, cómo lo llenas y cuántos necesitas al mes.',
  },
  {
    n: '02',
    title: 'Diseñamos la estructura',
    text: 'Definimos construcción, número de hojas, barrera y medidas con plano técnico.',
  },
  {
    n: '03',
    title: 'Aprobamos tu arte',
    text: 'Adaptamos tu marca a impresión flexográfica y te enviamos la prueba.',
  },
  {
    n: '04',
    title: 'Fabricamos y despachamos',
    text: 'Producción en Durán con control de calidad por lote y entrega a tu bodega.',
  },
]

export const faqs = [
  {
    q: '¿Qué es un saco de papel multicapa?',
    a: 'Es un saco formado por varias hojas de papel superpuestas, y en algunos casos una lámina de barrera. Cada hoja suma resistencia, así el saco aguanta pesos de hasta 50 kg con menos material que otras alternativas.',
  },
  {
    q: '¿Qué papel usan?',
    a: 'Papel extensible de fibra 100 % virgen. Es un papel que estira antes de romperse, pensado justamente para absorber los golpes del llenado, la estiba y el transporte.',
  },
  {
    q: '¿Fabrican sacos con mi marca impresa?',
    a: 'Sí. Imprimimos en flexografía directamente sobre la hoja exterior, hasta 4 colores. Te ayudamos a adaptar tu arte y te enviamos una prueba antes de producir.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: 'Depende de la construcción y de la impresión. Escríbenos con el producto, el peso por saco y el consumo mensual y te damos el mínimo exacto para tu caso.',
  },
  {
    q: '¿Sus sacos sirven para alimentos?',
    a: 'Sí. Contamos con certificación FSSC 22000 v6 emitida por SGS, un esquema de inocuidad alimentaria reconocido por la GFSI, para sacos en contacto con harinas, azúcar, balanceados y otros alimentos.',
  },
  {
    q: '¿Qué saco necesito para arena para gatos o carbón?',
    a: 'Normalmente un saco de fondo cuadrado de 2 a 3 hojas, que se para solo en percha. Para arena recomendamos además una barrera contra la humedad.',
  },
  {
    q: '¿Hacen envíos fuera de Guayaquil?',
    a: 'Sí. Fabricamos en nuestra planta del km 7,5 vía Durán–Tambo y despachamos a clientes en todo el Ecuador.',
  },
  {
    q: '¿El papel es reciclable?',
    a: 'El papel kraft es una fibra natural, reciclable y de origen renovable. En sacos sin lámina plástica, todo el empaque puede ir al reciclaje de papel. Si el saco lleva barrera, la reciclabilidad depende de la composición final y de la gestión local de residuos.',
  },
]
