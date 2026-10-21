<script setup lang="ts">
// Encabezado común de las páginas interiores: mismo aire en todas para que el
// sitio se sienta un solo lugar y no una colección de pantallas.
defineProps<{
  eyebrow: string
  title: string
  text?: string
}>()
</script>

<template>
  <section class="banner">
    <div class="banner__inner">
      <p class="banner__eyebrow">{{ eyebrow }}</p>
      <h1 class="banner__title">{{ title }}</h1>
      <p v-if="text" class="banner__text">{{ text }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  // misma cuadrícula de plano técnico del hero, para dar continuidad
  background-color: $paper;
  background-image:
    linear-gradient(rgba($kraft, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba($kraft, 0.09) 1px, transparent 1px);
  background-size: 32px 32px;
  border-bottom: 1px solid $line;

  &__inner {
    @include container(1240px);
    @include flex(column, flex-start, flex-start, 0.9rem);
    padding-block: 3rem 2.75rem;

    @include from('lg') {
      padding-block: 4.5rem 4rem;
    }
  }

  &__eyebrow {
    @include eyebrow;
    @include flex(row, center, flex-start, 0.6rem);

    &::before {
      content: '';
      width: 1.6rem;
      height: 1px;
      background: currentColor;
    }
  }

  &__title {
    @include display(clamp(2.2rem, 1.5rem + 3vw, 3.6rem));
    max-width: 20ch;
  }

  &__text {
    font-size: $text-lg;
    color: $ink-soft;
    max-width: 58ch;
  }
}
</style>
