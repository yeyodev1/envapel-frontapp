<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/config/site'
import { processSteps } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="planta" ref="root" class="plant">
    <div class="plant__inner">
      <div class="plant__top">
        <header class="section-head" data-reveal>
          <p class="section-head__eyebrow">{{ site.plant.eyebrow }}</p>
          <h2 class="section-head__title">{{ site.plant.title }}</h2>
          <p class="section-head__text">{{ site.plant.text }}</p>
          <ul class="plant__points">
            <li v-for="point in site.plant.points" :key="point">
              <i class="fa-solid fa-check"></i> {{ point }}
            </li>
          </ul>
        </header>

        <aside class="cert" data-reveal>
          <div class="cert__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="seal-path" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <circle cx="60" cy="60" r="56" class="cert__ring" />
              <circle cx="60" cy="60" r="34" class="cert__core" />
              <text class="cert__around">
                <textPath href="#seal-path">
                  INOCUIDAD ALIMENTARIA · GFSI · INOCUIDAD ALIMENTARIA · GFSI ·
                </textPath>
              </text>
              <text x="60" y="58" text-anchor="middle" class="cert__big">FSSC</text>
              <text x="60" y="74" text-anchor="middle" class="cert__small">22000</text>
            </svg>
          </div>
          <h3 class="cert__title">{{ site.plant.certTitle }}</h3>
          <p class="cert__text">{{ site.plant.certText }}</p>
        </aside>
      </div>

      <div id="proceso" class="process">
        <p class="section-head__eyebrow" data-reveal>{{ site.process.eyebrow }}</p>
        <h3 class="process__title" data-reveal>{{ site.process.title }}</h3>
        <ol class="process__list">
          <li v-for="step in processSteps" :key="step.n" class="step" data-reveal>
            <span class="step__n">{{ step.n }}</span>
            <h4 class="step__title">{{ step.title }}</h4>
            <p class="step__text">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.plant {
  padding-block: $space-section;
  background: $forest;
  color: $paper;

  .section-head__title {
    color: $paper;
  }

  .section-head__text {
    color: rgba($paper, 0.75);
  }

  .section-head__eyebrow {
    color: $kraft-soft;
  }

  &__inner {
    @include container(1240px);
  }

  &__top {
    @include flex(column, stretch, flex-start, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 5rem;
    }

    .section-head {
      flex: 1 1 60%;
      margin-bottom: 0;
    }
  }

  &__points {
    list-style: none;
    @include flex-cards(220px, 0.6rem 1.5rem);
    width: 100%;
    margin-top: 0.75rem;

    li {
      font-size: $text-sm;
      color: rgba($paper, 0.85);
    }

    i {
      color: $kraft;
      margin-right: 0.5rem;
    }
  }
}

.cert {
  flex: 1 1 40%;
  padding: 2rem;
  border-radius: $radius-lg;
  background: rgba($paper, 0.06);
  border: 1px solid rgba($paper, 0.14);

  &__seal {
    width: 7.5rem;
    margin-bottom: 1.25rem;

    svg {
      animation: spin 40s linear infinite;
    }
  }

  &__ring {
    fill: none;
    stroke: rgba($kraft, 0.6);
  }

  &__core {
    fill: $kraft;
  }

  &__around {
    font-family: $font-mono;
    font-size: 8.4px;
    letter-spacing: 1.6px;
    fill: $kraft-soft;
  }

  &__big {
    font-family: $font-display;
    font-size: 17px;
    font-weight: 700;
    fill: $forest-deep;
  }

  &__small {
    font-family: $font-mono;
    font-size: 11px;
    fill: $forest-deep;
  }

  &__title {
    @include display($text-xl, 500);
    margin-bottom: 0.6rem;
  }

  &__text {
    font-size: $text-sm;
    color: rgba($paper, 0.75);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.process {
  margin-top: $space-xl;
  padding-top: $space-lg;
  border-top: 1px solid rgba($paper, 0.14);

  &__title {
    @include display($display-sm);
    margin: 0.8rem 0 2rem;
  }

  &__list {
    list-style: none;
    @include flex-cards(230px, 1.5rem);
  }
}

.step {
  @include flex(column, flex-start, flex-start, 0.6rem);
  padding-top: 1.1rem;
  border-top: 2px solid $kraft;

  &__n {
    font-family: $font-mono;
    font-size: $text-sm;
    color: $kraft-soft;
  }

  &__title {
    @include display($text-lg, 500);
  }

  &__text {
    font-size: $text-sm;
    color: rgba($paper, 0.7);
  }
}
</style>
