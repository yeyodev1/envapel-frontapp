import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '@/services/product.service'
import { useCatalog } from '@/composables/useCatalog'
import { useToastStore } from '@/stores/toast'
import type { AdminProduct, ApiError, ProductInput } from '@/types'

function blank(): ProductInput {
  return {
    slug: '',
    name: '',
    short: '',
    kind: 'open',
    square: false,
    description: '',
    idealFor: [],
    specs: [],
    options: [],
    order: 0,
    isPublished: true,
  }
}

/** Ficha de un producto en el panel: carga, guarda e imagen. */
export function useProductEditor(id: string) {
  const isNew = id === 'nuevo'
  const form = reactive<ProductInput>(blank())
  const image = ref<AdminProduct['image']>({ url: '', publicId: '' })
  const loading = ref(!isNew)
  const saving = ref(false)
  const uploading = ref(false)
  const router = useRouter()
  const toast = useToastStore()
  const catalog = useCatalog()

  const canSave = computed(() => form.name.trim().length >= 3 && !saving.value)

  function fill(p: AdminProduct) {
    Object.assign(form, {
      slug: p.slug,
      name: p.name,
      short: p.short,
      kind: p.kind,
      square: p.square,
      description: p.description,
      idealFor: [...p.idealFor],
      specs: p.specs.map((s) => ({ ...s })),
      options: [...p.options],
      order: p.order,
      isPublished: p.isPublished,
    })
    image.value = p.image
  }

  async function load() {
    if (isNew) return
    try {
      // El API del panel no tiene GET por id: con pocos productos, la lista basta.
      const found = (await productService.listAll()).find((p) => p._id === id)
      if (!found) {
        toast.error('Ese producto ya no existe')
        router.replace({ name: 'AdminProducts' })
        return
      }
      fill(found)
    } catch (error) {
      toast.error((error as ApiError).message)
    } finally {
      loading.value = false
    }
  }

  // Filas vacías que quedan al editar no se guardan.
  function payload(): ProductInput {
    return {
      ...form,
      idealFor: form.idealFor.map((t) => t.trim()).filter(Boolean),
      options: form.options.map((t) => t.trim()).filter(Boolean),
      specs: form.specs
        .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
        .filter((s) => s.label && s.value),
    }
  }

  async function save() {
    if (!canSave.value) return
    saving.value = true
    try {
      if (isNew) {
        const { order: _order, ...rest } = payload()
        const created = await productService.create(rest as ProductInput)
        toast.success('Producto creado. Ya puedes subirle una foto.')
        router.replace({ name: 'AdminProductEdit', params: { id: created._id } })
      } else {
        fill(await productService.update(id, payload()))
        toast.success('Cambios guardados')
      }
      catalog.load(true)
    } catch (error) {
      toast.error((error as ApiError).message)
    } finally {
      saving.value = false
    }
  }

  async function upload(file: File) {
    if (isNew) return
    uploading.value = true
    try {
      image.value = (await productService.uploadImage(id, file)).image
      toast.success('Foto actualizada')
      catalog.load(true)
    } catch (error) {
      toast.error((error as ApiError).message)
    } finally {
      uploading.value = false
    }
  }

  async function clearImage() {
    uploading.value = true
    try {
      image.value = (await productService.clearImage(id)).image
      catalog.load(true)
    } catch (error) {
      toast.error((error as ApiError).message)
    } finally {
      uploading.value = false
    }
  }

  return { isNew, form, image, loading, saving, uploading, canSave, load, save, upload, clearImage }
}
