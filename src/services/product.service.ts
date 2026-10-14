import APIBase from './httpBase'
import type { AdminProduct, ProductInput } from '@/types'
import type { Product } from '@/config/catalog'

class ProductService extends APIBase {
  async listPublished(): Promise<Product[]> {
    // Corto: si el API no responde rápido, la web sigue con el catálogo incluido.
    const { data } = await this.get<Product[]>('products', undefined, { timeout: 6000 })
    return data
  }

  async listAll(): Promise<AdminProduct[]> {
    const { data } = await this.get<AdminProduct[]>('admin/products')
    return data
  }

  async create(input: ProductInput): Promise<AdminProduct> {
    const { data } = await this.post<AdminProduct>('admin/products', input)
    return data
  }

  async update(id: string, input: Partial<ProductInput>): Promise<AdminProduct> {
    const { data } = await this.put<AdminProduct>(`admin/products/${id}`, input)
    return data
  }

  async remove(id: string): Promise<void> {
    await this.delete(`admin/products/${id}`)
  }

  async uploadImage(id: string, file: File): Promise<AdminProduct> {
    const body = new FormData()
    body.append('image', file)
    const { data } = await this.post<AdminProduct>(`admin/products/${id}/image`, body, undefined, {
      timeout: 60000,
    })
    return data
  }

  async clearImage(id: string): Promise<AdminProduct> {
    const { data } = await this.delete<AdminProduct>(`admin/products/${id}/image`)
    return data
  }
}

export const productService = new ProductService()
