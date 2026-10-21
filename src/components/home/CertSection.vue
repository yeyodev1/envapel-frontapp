<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/config/site'
import { useReveal } from '@/composables/useReveal'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section ref="root" class="cert">
    <div class="cert__inner" data-reveal>
      <div class="cert__mark" aria-hidden="true">
        <BaseIcon name="shield" />
        <BaseIcon name="check" class="cert__check" />
      </div>
      <div class="cert__copy">
        <p class="section-head__eyebrow">{{ site.cert.eyebrow }}</p>
        <h2 class="cert__title">{{ site.cert.title }}</h2>
        <p class="cert__text">{{ site.cert.text }}</p>
      </div>
      <RouterLink to="/inocuidad" class="btn btn--ghost cert__btn">
        {{ site.cert.cta }} <BaseIcon name="arrow-right" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cert {
  padding-block: 0 $space-section;

  &__inner {
    @include container(1240px);
    @include flex(column, flex-start, flex-start, 1.5rem);
    position: relative;
    border: 1px solid $line-strong;
    border-radius: $radius-lg;
    background: $surface;
    padding: 2.25rem 2rem;

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 2.5rem;
      padding: 2.75rem 3rem;
    }
  }

  &__mark {
    position: relative;
    @include flex(row, center, center);
    flex-shrink: 0;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: rgba($forest, 0.08);
    color: $forest;
    font-size: 2rem;
  }

  &__check {
    position: absolute;
    font-size: 0.95rem;
    color: $paper;
    transform: translateY(-1px);
  }

  &__copy {
    @include flex(column, flex-start, flex-start, 0.6rem);
    flex: 1;
  }

  &__title {
    @include display(clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem));
  }

  &__text {
    color: $ink-soft;
    max-width: 62ch;
  }

  &__btn {
    flex-shrink: 0;
  }
}
</style>
