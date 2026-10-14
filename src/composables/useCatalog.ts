import { ref } from 'vue'
import { products as bundled, type Product } from '@/config/catalog'
import { productService } from '@/services/product.service'

/**
 * Catálogo vivo. Arranca con el que viene en el bundle para que la home pinte
 * al instante (y Google lo lea sin esperar al API), y lo reemplaza por el del
 * panel en cuanto llega. Si el API falla, la web sigue con el incluido.
 */
const products = ref<Product[]>(bundled)
let request: Promise<void> | null = null

function load(force = false): Promise<void> {
  if (request && !force) return request
  request = productService
    .listPublished()
    .then((items) => {
      if (Array.isArray(items)) products.value = items
    })
    .catch(() => undefined)
  return request
}

export function useCatalog() {
  return { products, load }
}
