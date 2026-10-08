import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import gsap from 'gsap'

/**
 * Menú móvil con una sola línea de tiempo en pausa: abrir = play(), cerrar =
 * reverse(). reverse() parte desde donde esté el cabezal, así que un toque a
 * mitad de animación la devuelve sin saltos. Solo existe por debajo de lg:
 * matchMedia la revierte (y limpia los estilos en línea) al pasar a desktop.
 */
export function useMenuTimeline(root: Ref<HTMLElement | null>, open: Ref<boolean>) {
  let mm: gsap.MatchMedia | null = null
  let tl: gsap.core.Timeline | null = null
  // Con movimiento reducido el menú aparece casi al instante.
  let speed = 1

  onMounted(() => {
    if (!root.value) return
    mm = gsap.matchMedia(root.value)

    mm.add({ mobile: '(max-width: 1023px)', reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { mobile, reduce } = ctx.conditions as { mobile: boolean; reduce: boolean }
      if (!mobile) return

      tl = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .set('.header__nav', { autoAlpha: 1 })
        .fromTo(
          '.header__nav',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.inOut' },
        )
        // fromTo con valores finales explícitos: from() lee el estado final del DOM
        // al crearse, y la transición CSS de .btn le hacía leer opacity 0.
        .fromTo(
          '.header__link',
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.04 },
          '-=0.25',
        )
        .fromTo(
          '.header__cta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          '-=0.3',
        )
        // Hamburguesa → X en paralelo con el panel
        .to('.burger__line--top', { y: 6, rotate: 45, duration: 0.35 }, 0)
        .to('.burger__line--mid', { scaleX: 0, autoAlpha: 0, duration: 0.2 }, 0)
        .to('.burger__line--bot', { y: -6, rotate: -45, duration: 0.35 }, 0)

      speed = reduce ? 20 : 1
      if (open.value) tl.progress(1)

      return () => {
        tl = null
      }
    })
  })

  watch(open, (isOpen) => {
    if (!tl) return
    if (isOpen) tl.timeScale(speed).play()
    // Al cerrar va un poco más rápido: salir no debería hacer esperar.
    else tl.timeScale(speed * 1.6).reverse()
  })

  onBeforeUnmount(() => mm?.revert())
}
