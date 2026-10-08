import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/config/site'

const homeTitle = `${site.name} | ${site.tagline}`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: homeTitle },
  },
  {
    path: '/productos/:slug',
    name: 'Product',
    component: () => import('@/views/ProductView.vue'),
    meta: { title: 'Productos' },
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

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (!title || title === homeTitle) document.title = homeTitle
  else document.title = `${title} | ${site.name}`
})

export default router
