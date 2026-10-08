import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'

/**
 * Hace entrar con scroll a los hijos marcados con `data-reveal` dentro de `root`.
 * IntersectionObserver en vez de ScrollTrigger: no depende de medir posiciones
 * al montar (que fallan si las fuentes o la transición de página aún no
 * terminan), así ningún bloque se queda invisible.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  function show(el: Element, delay = 0) {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay })
  }

  onMounted(() => {
    if (!root.value) return
    const items = Array.from(root.value.querySelectorAll('[data-reveal]'))
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        // Los que entran juntos se escalonan.
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            show(e.target, i * 0.08)
            observer?.unobserve(e.target)
          })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    items.forEach((el) => observer!.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
