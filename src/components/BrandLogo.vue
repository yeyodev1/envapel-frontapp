<script setup lang="ts">
// Isotipo oficial (hoja + capas de papel) y wordmark en texto mientras llega
// el vector oficial del logotipo completo.
withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), { tone: 'dark' })
</script>

<template>
  <span class="logo" :class="`logo--${tone}`">
    <img class="logo__mark" src="/favicon.svg" alt="" width="44" height="30" />
    <span class="logo__word">Envapel</span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  @include flex(row, center, flex-start, 0.55rem);

  &__mark {
    width: 2.6rem;
    height: auto;
  }

  &__word {
    font-family: $font-display;
    font-size: 1.55rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1;
    color: $ink;
  }

  &--light &__word {
    color: $paper;
  }

  &--light &__mark {
    width: 3rem;
    padding: 0.3rem 0.35rem;
    background: $paper;
    border-radius: 10px;
  }
}
</style>
