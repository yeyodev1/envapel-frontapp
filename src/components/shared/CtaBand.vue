<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue'

// Cierre de página: una invitación concreta a seguir la conversación.
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    text?: string
    label: string
    to?: string
  }>(),
  { to: '/contacto' },
)
</script>

<template>
  <section class="cta">
    <div class="cta__inner">
      <div class="cta__copy">
        <p v-if="eyebrow" class="cta__eyebrow">{{ eyebrow }}</p>
        <h2 class="cta__title">{{ title }}</h2>
        <p v-if="text" class="cta__text">{{ text }}</p>
      </div>
      <RouterLink :to="to" class="btn btn--light cta__btn">
        {{ label }} <BaseIcon name="arrow-right" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cta {
  background: $forest;
  color: $paper;

  &__inner {
    @include container(1240px);
    @include flex(column, flex-start, space-between, 1.75rem);
    padding-block: 3.5rem;

    @include from('md') {
      flex-direction: row;
      align-items: center;
    }
  }

  &__copy {
    @include flex(column, flex-start, flex-start, 0.7rem);
    max-width: 42rem;
  }

  &__eyebrow {
    @include eyebrow;
    color: $kraft-soft;
  }

  &__title {
    @include display(clamp(1.6rem, 1.2rem + 1.8vw, 2.4rem));
  }

  &__text {
    color: rgba($paper, 0.78);
  }

  &__btn {
    flex-shrink: 0;
    padding: 0.95rem 1.7rem;
  }
}
</style>
