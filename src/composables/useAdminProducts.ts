import { ref } from 'vue'
import { productService } from '@/services/product.service'
import { useCatalog } from '@/composables/useCatalog'
import { useToastStore } from '@/stores/toast'
import type { AdminProduct, ApiError } from '@/types'

/** Lista del panel: publicar, ordenar y eliminar sin entrar a cada ficha. */
export function useAdminProducts() {
  const items = ref<AdminProduct[]>([])
  const loading = ref(true)
  const busy = ref<string | null>(null)
  const toast = useToastStore()
  const catalog = useCatalog()

  function fail(error: unknown) {
    toast.error((error as ApiError).message)
  }

  async function fetch() {
    loading.value = true
    try {
      items.value = await productService.listAll()
    } catch (error) {
      fail(error)
    } finally {
      loading.value = false
    }
  }

  // Tras cada cambio, la web pública que está abierta en esta pestaña se refresca.
  function refreshSite() {
    catalog.load(true)
  }

  async function togglePublished(item: AdminProduct) {
    busy.value = item._id
    try {
      const updated = await productService.update(item._id, { isPublished: !item.isPublished })
      item.isPublished = updated.isPublished
      toast.success(updated.isPublished ? 'Publicado en la web' : 'Pasó a borrador')
      refreshSite()
    } catch (error) {
      fail(error)
    } finally {
      busy.value = null
    }
  }

  async function move(index: number, step: -1 | 1) {
    const a = items.value[index]
    const b = items.value[index + step]
    if (!a || !b) return
    busy.value = a._id
    try {
      // Se reescribe el orden de los dos con su posición en la lista: así se
      // corrigen también órdenes repetidos que vengan de antes.
      await Promise.all([
        productService.update(a._id, { order: index + step }),
        productService.update(b._id, { order: index }),
      ])
      items.value.splice(index + step, 1, a)
      items.value.splice(index, 1, b)
      refreshSite()
    } catch (error) {
      fail(error)
    } finally {
      busy.value = null
    }
  }

  async function remove(item: AdminProduct, confirmText: string) {
    if (!window.confirm(confirmText)) return
    busy.value = item._id
    try {
      await productService.remove(item._id)
      items.value = items.value.filter((p) => p._id !== item._id)
      toast.success('Producto eliminado')
      refreshSite()
    } catch (error) {
      fail(error)
    } finally {
      busy.value = null
    }
  }

  return { items, loading, busy, fetch, togglePublished, move, remove }
}
