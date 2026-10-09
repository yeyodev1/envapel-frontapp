import gsap from 'gsap'

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Hooks de <Transition> para cambiar de página con GSAP: la que sale sube y se
 * desvanece, la que entra sube desde abajo. `done` le avisa a Vue cuándo
 * terminó cada lado (mode="out-in" espera a la salida antes de montar).
 */
export function usePageTransition() {
  function onLeave(el: Element, done: () => void) {
    if (reduce()) return void gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done })
    gsap.to(el, { autoAlpha: 0, y: -24, duration: 0.28, ease: 'power2.in', onComplete: done })
  }

  function onEnter(el: Element, done: () => void) {
    if (reduce()) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, clearProps: 'opacity', onComplete: done })
      return
    }
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'expo.out',
        // Sin transform residual: un transform en el contenedor rompería los
        // position: sticky de las secciones.
        clearProps: 'transform,opacity,visibility',
        onComplete: done,
      },
    )
  }

  return { onLeave, onEnter }
}
