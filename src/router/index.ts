import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/config/site'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'

const homeTitle = `${site.name} | ${site.tagline}`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // Eager: es la página de entrada y su h1 es el LCP; lazy sumaba un viaje de red.
    component: HomeView,
    meta: { title: homeTitle },
  },
  {
    path: '/productos/:slug',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    meta: { title: 'Productos' },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/AdminLoginView.vue'),
    meta: { title: 'Entrar al panel', admin: true },
  },
  {
    path: '/admin',
    name: 'AdminProducts',
    component: () => import('@/views/admin/AdminProductsView.vue'),
    meta: { title: 'Panel', admin: true, requiresAuth: true },
  },
  {
    path: '/admin/productos/:id',
    name: 'AdminProductEdit',
    component: () => import('@/views/admin/AdminProductEditView.vue'),
    meta: { title: 'Editar producto', admin: true, requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
]

// Espera a que la vista lazy pinte la sección antes de bajar a ella.
function waitFor(selector: string, tries = 20): Promise<Element | null> {
  return new Promise((resolve) => {
    const tick = (left: number) => {
      const el = document.querySelector(selector)
      if (el || left === 0) return resolve(el)
      setTimeout(() => tick(left - 1), 50)
    }
    tick(tries)
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Con "atrás" el navegador devuelve la posición guardada; con un hash se
  // baja a la sección dejando libre el alto del header; si no, arriba.
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      const el = await waitFor(to.hash)
      if (el) return { el: to.hash, top: 72, behavior: from.name === to.name ? 'smooth' : 'auto' }
    }
    return { left: 0, top: 0 }
  },
})

// El panel solo abre con una sesión de administrador verificada contra el API.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const user = useUserStore()
  await user.restore()
  if (user.isAdmin) return true
  return { name: 'AdminLogin', query: { redirect: to.fullPath } }
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (!title || title === homeTitle) document.title = homeTitle
  else document.title = `${title} | ${site.name}`
})

export default router
