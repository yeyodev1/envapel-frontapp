<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { site } from '@/config/site'
import { faqs } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const open = ref<number | null>(0)

// GSAP anima hasta height: 'auto' midiendo el contenido real; al terminar
// limpia el inline y manda la clase --open. Así no hay alturas mágicas.
watch(open, (next, prev) => {
  const panel = (i: number) => root.value?.querySelector<HTMLElement>(`#faq-a-${i}`)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const duration = reduce ? 0 : 0.45

  const closing = prev != null ? panel(prev) : null
  if (closing) {
    gsap.fromTo(
      closing,
      { height: closing.scrollHeight },
      { height: 0, duration, ease: 'power3.inOut', clearProps: 'height', overwrite: true },
    )
  }

  const opening = next != null ? panel(next) : null
  if (opening) {
    gsap.fromTo(
      opening,
      { height: 0 },
      { height: 'auto', duration, ease: 'power3.inOut', clearProps: 'height', overwrite: true },
    )
    gsap.from(opening.querySelector('p'), {
      y: 10,
      autoAlpha: 0,
      duration,
      delay: duration * 0.3,
      overwrite: true,
      clearProps: 'all',
    })
  }
})

// FAQPage en JSON-LD: es lo que más leen Google y los asistentes de IA para
// responder "¿quién fabrica sacos de papel en Ecuador?".
let script: HTMLScriptElement | null = null
onMounted(() => {
  script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })
  document.head.appendChild(script)
})
onBeforeUnmount(() => script?.remove())
</script>

<template>
  <section id="preguntas" ref="root" class="faq">
    <div class="faq__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.faq.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.faq.title }}</h2>
      </header>

      <div class="faq__list">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          class="qa"
          :class="{ 'qa--open': open === i }"
          data-reveal
        >
          <h3>
            <button
              :id="`faq-q-${i}`"
              class="qa__q"
              :aria-expanded="open === i"
              :aria-controls="`faq-a-${i}`"
              @click="open = open === i ? null : i"
            >
              <span>{{ item.q }}</span>
              <BaseIcon name="plus" class="qa__icon" />
            </button>
          </h3>
          <div :id="`faq-a-${i}`" class="qa__a" role="region" :aria-labelledby="`faq-q-${i}`">
            <div class="qa__clip">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  padding-block: $space-section;

  &__inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 0);

    @include from('lg') {
      flex-direction: row;
      gap: 5rem;

      .section-head {
        flex: 0 0 34%;
        position: sticky;
        top: 6rem;
        align-self: flex-start;
      }
    }
  }

  &__list {
    flex: 1;
    border-top: 1px solid $line-strong;
  }
}

.qa {
  border-bottom: 1px solid $line-strong;

  &__q {
    width: 100%;
    min-height: 3.5rem;
    @include flex(row, center, space-between, 1.25rem);
    padding: 1.3rem 0;
    text-align: left;
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: 500;
    color: $ink;
    @include transition(color);

    &:hover {
      color: $forest;
    }
  }

  &__icon {
    flex-shrink: 0;
    color: $kraft-deep;
    @include transition(transform);
  }

  // Estado en reposo; la animación de apertura y cierre la hace GSAP (ver watch).
  &__a {
    overflow: hidden;
    height: 0;
  }

  &__clip p {
    padding: 0 2.5rem 1.4rem 0;
    color: $ink-soft;
  }

  &--open &__a {
    height: auto;
  }

  &--open &__icon {
    transform: rotate(45deg);
  }
}
</style>
