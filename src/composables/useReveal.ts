import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import gsap from 'gsap'

/**
 * Hace entrar con scroll a los hijos marcados con `data-reveal` dentro de `root`.
 * IntersectionObserver en vez de ScrollTrigger: no depende de medir posiciones
 * al montar (que fallan si las fuentes o la transición de página aún no
 * terminan), así ningún bloque se queda invisible.
 *
 * Variantes según el valor del atributo, pensadas para que se noten en móvil:
 * - `data-reveal` (vacío): sube y aparece.
 * - `data-reveal="card"`: sube, crece desde 0.92 y se endereza.
 * - `.section-head`: el encabezado se destapa de abajo hacia arriba, línea por línea.
 *
 * Con movimiento reducido no se desplaza nada, pero sí hay un fundido: apagarlo
 * todo dejaba el sitio sin ninguna animación en iPhones con esa opción activa.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null
  let mutations: MutationObserver | null = null
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function show(el: HTMLElement, delay = 0) {
    if (reduce) {
      gsap.to(el, { opacity: 1, duration: 0.6, ease: 'power1.out', delay })
      return
    }

    if (el.classList.contains('section-head')) {
      gsap.set(el, { opacity: 1, y: 0 })
      gsap.fromTo(
        el.children,
        { yPercent: 60, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
        {
          yPercent: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.12,
          delay,
          clearProps: 'clipPath',
        },
      )
      return
    }

    const card = el.dataset.reveal === 'card'
    gsap.fromTo(
      el,
      card ? { y: 70, scale: 0.92, rotate: 1.5, opacity: 0 } : { y: 48, opacity: 0 },
      {
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: card ? 1 : 0.9,
        ease: 'expo.out',
        delay,
        // Sin clearProps: el CSS de [data-reveal] lo devolvería a translateY(48px).
      },
    )
  }

  onMounted(() => {
    if (!root.value) return
    const items = Array.from(root.value.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        // Los que entran juntos se escalonan.
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            show(e.target as HTMLElement, i * 0.1)
            observer?.unobserve(e.target)
          })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    items.forEach((el) => observer!.observe(el))

    // El catálogo llega del API después de montar: sin esto, las tarjetas
    // nuevas nacen con opacity 0 y nadie las muestra.
    mutations = new MutationObserver((records) => {
      records.forEach((r) =>
        r.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          const found = node.matches('[data-reveal]')
            ? [node]
            : Array.from(node.querySelectorAll<HTMLElement>('[data-reveal]'))
          found.forEach((el) => observer?.observe(el))
        }),
      )
    })
    mutations.observe(root.value, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    mutations?.disconnect()
  })
}
