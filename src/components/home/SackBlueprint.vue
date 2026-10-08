<script setup lang="ts">
// Lámina técnica: vista frontal + vista lateral con cotas A, L, F y V.
// Las cotas son letras, no números: cada cliente define sus medidas.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'

defineProps<{ variant: 'valve' | 'open' | 'square'; code: string; name: string }>()

const svg = ref<SVGSVGElement | null>(null)
let ctx: gsap.Context | null = null
let observer: IntersectionObserver | null = null

// Cada lámina se "dibuja" cuando entra en pantalla (cambiar de pestaña la vuelve
// a montar): los trazos corren con stroke-dashoffset y luego entran cotas y textos.
onMounted(() => {
  if (!svg.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx = gsap.context(() => {
    const strokes = gsap.utils
      .toArray<SVGGeometryElement>('.bp__line, .bp__thin')
      .filter((el) => typeof el.getTotalLength === 'function')
    strokes.forEach((el) => {
      const len = el.getTotalLength()
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
    })
    const tl = gsap
      .timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .to(strokes, {
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.03,
        clearProps: 'strokeDasharray,strokeDashoffset',
      })
      .from(
        '.bp__dim, .bp__fill, .bp__print, .bp__dash, .bp__stitch',
        { autoAlpha: 0, duration: 0.4, stagger: 0.02 },
        '-=0.5',
      )
      .from('text', { autoAlpha: 0, y: 4, duration: 0.35, stagger: 0.015 }, '-=0.3')

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        tl.play()
        observer?.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(svg.value!)
  }, svg.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  ctx?.revert()
})
</script>

<template>
  <svg
    ref="svg"
    class="bp"
    viewBox="0 0 640 440"
    role="img"
    :aria-label="`Plano técnico de ${name}`"
  >
    <!-- marco de la lámina -->
    <rect x="8" y="8" width="624" height="424" class="bp__frame" />

    <!-- vista frontal -->
    <g transform="translate(70 60)">
      <path d="M0 0 L220 0 L220 280 L0 280 Z" class="bp__line" />
      <!-- fondos -->
      <line x1="0" y1="34" x2="220" y2="34" class="bp__thin" />
      <line x1="0" y1="246" x2="220" y2="246" class="bp__thin" />
      <template v-if="variant === 'valve'">
        <rect x="0" y="0" width="52" height="34" class="bp__fill" />
        <text x="26" y="22" text-anchor="middle" class="bp__tag">V</text>
      </template>
      <template v-if="variant === 'open'">
        <line x1="0" y1="10" x2="220" y2="10" class="bp__dash" />
        <line x1="0" y1="262" x2="220" y2="262" class="bp__stitch" />
      </template>
      <template v-if="variant === 'square'">
        <path d="M0 280 L-26 300 L246 300 L220 280" class="bp__thin" />
        <line x1="0" y1="10" x2="220" y2="10" class="bp__dash" />
      </template>
      <!-- área de impresión -->
      <rect x="24" y="90" width="172" height="110" class="bp__print" />
      <text x="110" y="150" text-anchor="middle" class="bp__label">ÁREA DE IMPRESIÓN</text>

      <!-- cota A (ancho) -->
      <line
        x1="0"
        y1="-24"
        x2="220"
        y2="-24"
        class="bp__dim"
        marker-start="url(#arw)"
        marker-end="url(#arw)"
      />
      <line x1="0" y1="-32" x2="0" y2="-4" class="bp__thin" />
      <line x1="220" y1="-32" x2="220" y2="-4" class="bp__thin" />
      <text x="110" y="-30" text-anchor="middle" class="bp__tag">A</text>

      <!-- cota L (largo) -->
      <line
        x1="-28"
        y1="0"
        x2="-28"
        y2="280"
        class="bp__dim"
        marker-start="url(#arw)"
        marker-end="url(#arw)"
      />
      <line x1="-36" y1="0" x2="-4" y2="0" class="bp__thin" />
      <line x1="-36" y1="280" x2="-4" y2="280" class="bp__thin" />
      <text x="-40" y="144" text-anchor="middle" class="bp__tag">L</text>
    </g>

    <!-- vista lateral (fuelle) -->
    <g transform="translate(360 60)">
      <path d="M0 0 L70 0 L70 280 L0 280 Z" class="bp__line" />
      <path d="M35 34 L0 0 M35 34 L70 0 M35 246 L0 280 M35 246 L70 280" class="bp__thin" />
      <line x1="35" y1="34" x2="35" y2="246" class="bp__dash" />
      <line
        x1="0"
        y1="-24"
        x2="70"
        y2="-24"
        class="bp__dim"
        marker-start="url(#arw)"
        marker-end="url(#arw)"
      />
      <line x1="0" y1="-32" x2="0" y2="-4" class="bp__thin" />
      <line x1="70" y1="-32" x2="70" y2="-4" class="bp__thin" />
      <text x="35" y="-30" text-anchor="middle" class="bp__tag">F</text>
      <text x="35" y="306" text-anchor="middle" class="bp__label">VISTA LATERAL</text>
    </g>
    <text x="180" y="396" text-anchor="middle" class="bp__label">VISTA FRONTAL</text>

    <!-- cajetín -->
    <g transform="translate(468 300)">
      <rect x="0" y="0" width="156" height="124" class="bp__line" />
      <line x1="0" y1="34" x2="156" y2="34" class="bp__thin" />
      <line x1="0" y1="78" x2="156" y2="78" class="bp__thin" />
      <text x="10" y="22" class="bp__brand">ENVAPEL</text>
      <text x="10" y="52" class="bp__small">PLANO</text>
      <text x="10" y="68" class="bp__value">{{ code }}</text>
      <text x="10" y="96" class="bp__small">CONSTRUCCIÓN</text>
      <text x="10" y="112" class="bp__value">{{ name.toUpperCase().slice(0, 22) }}</text>
    </g>

    <defs>
      <marker
        id="arw"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 2 L8 5 L0 8 Z" class="bp__arrow" />
      </marker>
    </defs>
  </svg>
</template>

<style scoped lang="scss">
.bp {
  width: 100%;
  height: auto;

  &__frame {
    fill: none;
    stroke: rgba($forest, 0.35);
    stroke-width: 1;
  }

  &__line {
    fill: rgba($forest, 0.04);
    stroke: $forest;
    stroke-width: 1.6;
  }

  &__thin {
    fill: none;
    stroke: rgba($forest, 0.6);
    stroke-width: 0.9;
  }

  &__dash {
    stroke: rgba($forest, 0.6);
    stroke-width: 0.9;
    stroke-dasharray: 5 4;
  }

  &__stitch {
    stroke: $kraft-deep;
    stroke-width: 1.4;
    stroke-dasharray: 2 3;
  }

  &__dim {
    stroke: $kraft-deep;
    stroke-width: 1;
  }

  &__arrow {
    fill: $kraft-deep;
  }

  &__fill {
    fill: rgba($kraft, 0.35);
    stroke: $forest;
    stroke-width: 1.2;
  }

  &__print {
    fill: none;
    stroke: rgba($kraft-deep, 0.6);
    stroke-dasharray: 2 4;
  }

  &__tag {
    font-family: $font-mono;
    font-size: 15px;
    font-weight: 500;
    fill: $kraft-deep;
  }

  &__label,
  &__small {
    font-family: $font-mono;
    font-size: 9.5px;
    letter-spacing: 1.5px;
    fill: rgba($forest, 0.7);
  }

  &__brand {
    font-family: $font-display;
    font-size: 15px;
    font-weight: 600;
    fill: $forest;
    letter-spacing: 1px;
  }

  &__value {
    font-family: $font-mono;
    font-size: 10.5px;
    fill: $ink;
  }
}
</style>
