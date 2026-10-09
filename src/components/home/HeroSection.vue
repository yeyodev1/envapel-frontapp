<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { site } from '@/config/site'
import SackIllustration from './SackIllustration.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

// Entrada del hero en una sola línea de tiempo; el resto del sitio usa useReveal.
// El texto solo se desplaza, nunca parte de opacity 0: el h1 es el LCP y un
// elemento invisible no cuenta como pintado hasta que termina la animación.
// Al terminar, el saco queda flotando: en móvil no hay hover, y algo tiene que
// moverse en la primera pantalla.
onMounted(() => {
  if (!root.value) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = gsap.context(() => {
    if (reduce) {
      gsap.fromTo(['.hero__art', '.hero__stat'], { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.08 })
      return
    }
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero__line', { y: 40, duration: 1.1, stagger: 0.09 })
      .fromTo(
        '.hero__art',
        { y: 90, scale: 0.85, rotate: -6, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.4 },
        0.1,
      )
      .fromTo(
        '.hero__stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.45,
      )
      .add(() => {
        gsap.to('.hero__float', {
          y: -14,
          rotate: 1.5,
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow hero__line">
          <span class="hero__dot"></span>{{ site.hero.eyebrow }}
        </p>
        <h1 class="hero__title hero__line">{{ site.hero.title }}</h1>
        <p class="hero__text hero__line">{{ site.hero.text }}</p>
        <div class="hero__actions hero__line">
          <RouterLink to="/#cotizar" class="btn btn--primary">
            {{ site.hero.primary }} <BaseIcon name="arrow-right" />
          </RouterLink>
          <RouterLink to="/#planos" class="btn btn--ghost">
            <BaseIcon name="ruler-combined" /> {{ site.hero.secondary }}
          </RouterLink>
        </div>
      </div>

      <div class="hero__art">
        <div class="hero__float"><SackIllustration /></div>
      </div>
    </div>

    <ul class="hero__stats">
      <li v-for="stat in site.hero.stats" :key="stat.label" class="hero__stat">
        <span class="hero__value">
          {{ stat.value }}<small v-if="stat.unit"> {{ stat.unit }}</small>
        </span>
        <span class="hero__label">{{ stat.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  margin-top: -4.25rem;
  padding-top: 4.25rem;
  overflow: hidden;
  // cuadrícula de plano técnico, apenas visible
  background-color: $paper;
  background-image:
    linear-gradient(rgba($kraft, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba($kraft, 0.09) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: center top;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 40%;
    background: linear-gradient(to bottom, transparent, $paper);
    pointer-events: none;
  }

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.5rem);
    position: relative;
    z-index: 1;
    padding-block: 3rem 2rem;

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;
      padding-block: 5rem 3rem;
    }
  }

  &__copy {
    flex: 1 1 55%;
    @include flex(column, flex-start, flex-start, 1.4rem);
  }

  &__eyebrow {
    @include eyebrow;
    @include flex(row, center, flex-start, 0.6rem);
    padding: 0.45rem 0.9rem;
    background: $surface;
    border: 1px solid $line;
    border-radius: $radius-pill;
  }

  &__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: $forest-mid;
    box-shadow: 0 0 0 4px rgba($forest-mid, 0.18);
    animation: hero-pulse 2s ease-out infinite;
  }

  &__title {
    @include display(clamp(2.5rem, 1.6rem + 3.8vw, 4.4rem), 500);
    max-width: 16ch;
  }

  &__text {
    font-size: $text-lg;
    color: $ink-soft;
    max-width: 54ch;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.75rem);
    flex-wrap: wrap;
    margin-top: 0.4rem;

    .btn {
      padding: 0.95rem 1.6rem;
    }
  }

  &__art {
    flex: 1 1 45%;
    max-width: 30rem;
    width: 100%;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }

  &__stats {
    @include container(1240px);
    @include flex-cards(150px, 0);
    position: relative;
    z-index: 1;
    list-style: none;
    margin-bottom: $space-xl;

    > li {
      border-top: 1px solid $line-strong;
      padding: 1.1rem 1rem 0 0;
    }
  }

  &__stat {
    @include flex(column, flex-start, flex-start, 0.2rem);
  }

  &__value {
    font-family: $font-display;
    font-size: $display-sm;
    font-weight: 500;
    line-height: 1;
    color: $forest;

    small {
      font-size: 0.5em;
      color: $kraft-deep;
    }
  }

  &__label {
    font-family: $font-mono;
    font-size: $text-xs;
    color: $ink-muted;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}

// "Planta en operación": el punto late como un indicador encendido.
@keyframes hero-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($forest-mid, 0.45);
  }
  100% {
    box-shadow: 0 0 0 10px rgba($forest-mid, 0);
  }
}
</style>
