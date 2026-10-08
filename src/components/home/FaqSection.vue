<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { site } from '@/config/site'
import { faqs } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const open = ref<number | null>(0)

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
              <i class="fa-solid fa-plus qa__icon"></i>
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

  // Altura animable sin JS y sin CSS Grid (regla del proyecto): se
  // anima max-height sobre un contenedor que recorta.
  &__a {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.45s $ease;
  }

  &__clip p {
    padding: 0 2.5rem 1.4rem 0;
    color: $ink-soft;
  }

  &--open &__a {
    max-height: 20rem;
  }

  &--open &__icon {
    transform: rotate(45deg);
  }
}
</style>
