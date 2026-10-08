/**
 * Catálogo, capas, industrias, proceso y FAQ. Es copy estructurado: cuando
 * exista el portal de administración, esto se reemplaza por datos del API con
 * la misma forma.
 *
 * POR CONFIRMAR con el cliente: construcciones que fabrica hoy, rangos de
 * capacidad, número de hojas y colores de impresión.
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
}

export const products: Product[] = [
  {
    slug: 'saco-valvulado',
    name: 'Saco valvulado',
    short: 'Llenado rápido por válvula, cierre automático por presión del producto.',
    kind: 'valve',
    description:
      'Se llena por una válvula en la esquina superior con ensacadoras de alta velocidad. Al terminar, el propio producto presiona la válvula y la sella: no necesita costura ni cosedora. Es la construcción preferida para polvos y granulados finos.',
    idealFor: ['Harinas', 'Cemento y morteros', 'Polvos químicos', 'Fertilizantes granulados'],
    specs: [
      { label: 'Construcción', value: 'Tubo con fondos pegados y válvula' },
      { label: 'Hojas', value: '2 a 4 hojas de papel kraft' },
      { label: 'Capacidad', value: 'Hasta 50 kg' },
      { label: 'Llenado', value: 'Ensacadora por válvula' },
    ],
    options: [
      'Válvula interna o externa',
      'Válvula con manga termosellable',
      'Lámina de polietileno',
      'Microperforado para desaireo',
    ],
  },
  {
    slug: 'saco-boca-abierta-cosido',
    name: 'Saco boca abierta cosido',
    short: 'Fondo cosido o pegado y cierre con cosedora en tu línea.',
    kind: 'open',
    description:
      'Llega a tu planta con el fondo cerrado y la boca abierta. Se llena por gravedad o con tolva y se cierra con cosedora, con o sin cinta crepé. Versátil y económico para productos granulados, troceados y de mayor tamaño.',
    idealFor: ['Fertilizantes', 'Carbón vegetal', 'Balanceados', 'Productos troceados'],
    specs: [
      { label: 'Construcción', value: 'Tubo con fondo cosido o pegado' },
      { label: 'Hojas', value: '2 a 5 hojas de papel kraft' },
      { label: 'Capacidad', value: 'Hasta 50 kg' },
      { label: 'Cierre', value: 'Costura con o sin cinta crepé' },
    ],
    options: [
      'Fuelles laterales',
      'Lámina de polietileno',
      'Papel extensible de alta resistencia',
      'Asas para presentaciones pequeñas',
    ],
  },
  {
    slug: 'saco-boca-abierta-pegado',
    name: 'Saco boca abierta de fondo cuadrado',
    short: 'Se para solo en percha. Ideal para marcas que venden al consumidor.',
    kind: 'open',
    square: true,
    description:
      'Fondo pegado en escuadra que permite que el saco quede de pie en la percha y se apile limpio. Pensado para presentaciones de retail donde la impresión de la marca vende tanto como el producto.',
    idealFor: [
      'Arena para gatos',
      'Carbón para parrilla',
      'Alimento para mascotas',
      'Harinas al detal',
    ],
    specs: [
      { label: 'Construcción', value: 'Fondo cuadrado pegado' },
      { label: 'Hojas', value: '2 a 3 hojas de papel kraft' },
      { label: 'Capacidad', value: 'Presentaciones de 2 a 25 kg' },
      { label: 'Cierre', value: 'Pegado, cosido o doblado' },
    ],
    options: [
      'Impresión de alta cobertura',
      'Ventana o asa troquelada',
      'Barrera contra grasa',
      'Papel blanco o kraft natural',
    ],
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
      'Papel kraft extensible que absorbe impactos en el llenado, el apilado y el transporte. Se suman hojas según el peso.',
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
    detail: 'Bajo procesos FSSC 22000 para que el contacto con harinas y alimentos sea seguro.',
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
    a: 'Es un saco formado por varias hojas de papel kraft superpuestas, y en algunos casos una lámina de barrera. Cada hoja suma resistencia, así el saco aguanta pesos de hasta 50 kg con menos material que otras alternativas.',
  },
  {
    q: '¿Fabrican sacos con mi marca impresa?',
    a: 'Sí. Imprimimos en flexografía directamente sobre la hoja exterior. Te ayudamos a adaptar tu arte y te enviamos una prueba antes de producir.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: 'Depende de la construcción y de la impresión. Escríbenos con el producto, el peso por saco y el consumo mensual y te damos el mínimo exacto para tu caso.',
  },
  {
    q: '¿Sus sacos sirven para alimentos?',
    a: 'Sí. Contamos con certificación FSSC 22000, un esquema de inocuidad alimentaria reconocido por la GFSI, para sacos en contacto con harinas, azúcar, balanceados y otros alimentos.',
  },
  {
    q: '¿Qué saco necesito para arena para gatos o carbón?',
    a: 'Normalmente un saco de fondo cuadrado de 2 a 3 hojas, que se para solo en percha. Para arena recomendamos además una barrera contra la humedad.',
  },
  {
    q: '¿Hacen envíos fuera de Guayaquil?',
    a: 'Sí. Fabricamos en nuestra planta de Durán y despachamos a clientes en todo el Ecuador.',
  },
  {
    q: '¿El papel es reciclable?',
    a: 'El papel kraft es una fibra natural, reciclable y de origen renovable. En sacos sin lámina plástica, todo el empaque puede ir al reciclaje de papel.',
  },
]
