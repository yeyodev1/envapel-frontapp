import { computed, reactive } from 'vue'
import { whatsappLink } from '@/config/site'
import { products } from '@/config/catalog'

// Estado de módulo: la ficha de producto puede precargar el tipo de saco antes
// de bajar al formulario.
const form = reactive({
  name: '',
  company: '',
  city: '',
  product: '',
  sack: products[0]!.name,
  weight: '',
  monthly: '',
  printed: 'Sí, con mi marca',
  notes: '',
})

export const monthlyOptions = [
  'Menos de 5.000',
  '5.000 a 20.000',
  '20.000 a 100.000',
  'Más de 100.000',
  'Aún no sé',
]
export const printOptions = ['Sí, con mi marca', 'Sin impresión', 'Necesito ayuda con el arte']

export function useQuote() {
  const canSend = computed(() => form.name.trim().length > 1 && form.product.trim().length > 1)

  // El mensaje sale ya ordenado para que el asesor no tenga que repreguntar.
  const message = computed(() => {
    const lines = [
      'Hola Envapel, quiero cotizar sacos.',
      '',
      `*Nombre:* ${form.name}`,
      form.company ? `*Empresa:* ${form.company}` : null,
      form.city ? `*Ciudad:* ${form.city}` : null,
      `*Producto a envasar:* ${form.product}`,
      `*Tipo de saco:* ${form.sack}`,
      form.weight ? `*Peso por saco:* ${form.weight} kg` : null,
      form.monthly ? `*Consumo mensual:* ${form.monthly} sacos` : null,
      `*Impresión:* ${form.printed}`,
      form.notes ? `*Detalles:* ${form.notes}` : null,
    ]
    return lines.filter((l) => l !== null).join('\n')
  })

  // Vista previa como la pinta WhatsApp: *texto* en negrita. Se escapa primero
  // porque todo viene de lo que escribe el visitante.
  const previewHtml = computed(() =>
    message.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>'),
  )

  function send() {
    if (!canSend.value) return
    window.open(whatsappLink(message.value), '_blank', 'noopener')
  }

  function preselect(sackName: string) {
    form.sack = sackName
  }

  return { form, canSend, message, previewHtml, send, preselect }
}
