/** Forma con la que httpBase rechaza cualquier error del API. */
export interface ApiError {
  status: number
  message: string
  data?: unknown
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pages: number
}

/** Lo que devuelve el backapp en /auth/login y /auth/me. */
export interface SessionUser {
  id: string
  email: string
  name: string
  phone: string
  accountType: 'customer' | 'admin' | string
}

/** Producto tal como lo guarda el backapp; el panel ve también los borradores. */
export interface AdminProduct {
  _id: string
  slug: string
  name: string
  short: string
  kind: 'valve' | 'open'
  square: boolean
  description: string
  idealFor: string[]
  specs: { label: string; value: string }[]
  options: string[]
  image: { url: string; publicId: string }
  order: number
  isPublished: boolean
  updatedAt?: string
}

/** Lo que el panel envía al crear o editar. */
export type ProductInput = Omit<AdminProduct, '_id' | 'image' | 'updatedAt'>
