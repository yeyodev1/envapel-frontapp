<script setup lang="ts">
import type { SackKind } from '@/config/catalog'

// Silueta técnica de cada construcción, en trazo, para tarjetas y fichas.
defineProps<{ kind: SackKind; square?: boolean }>()
</script>

<template>
  <svg class="glyph" viewBox="0 0 120 150" aria-hidden="true">
    <template v-if="kind === 'valve'">
      <path d="M22 18 L98 18 L101 132 L19 132 Z" class="glyph__body" />
      <path d="M22 18 L98 18 L97 32 L23 32 Z" class="glyph__fold" />
      <path d="M19 120 L101 120 L101 132 L19 132 Z" class="glyph__fold" />
      <rect x="23" y="18" width="18" height="14" class="glyph__accent" />
      <path d="M41 25 L56 25" class="glyph__dash" />
    </template>
    <template v-else-if="square">
      <path d="M26 14 L94 14 L96 122 L24 122 Z" class="glyph__body" />
      <path d="M24 122 L96 122 L106 136 L14 136 Z" class="glyph__fold" />
      <path d="M26 14 L60 8 L94 14" class="glyph__dash" />
      <rect x="44" y="28" width="32" height="10" rx="5" class="glyph__accent" />
    </template>
    <template v-else>
      <path d="M22 14 L98 14 L101 132 L19 132 Z" class="glyph__body" />
      <path d="M19 120 L101 120 L101 132 L19 132 Z" class="glyph__fold" />
      <path d="M22 14 Q60 22 98 14" class="glyph__dash" />
      <path d="M22 126 L101 126" class="glyph__stitch" />
    </template>
  </svg>
</template>

<style scoped lang="scss">
.glyph {
  width: 100%;
  height: 100%;

  &__body {
    fill: rgba($kraft, 0.22);
    stroke: $kraft-deep;
    stroke-width: 1.5;
    stroke-linejoin: round;
  }

  &__fold {
    fill: rgba($kraft, 0.35);
    stroke: $kraft-deep;
    stroke-width: 1.2;
  }

  &__accent {
    fill: $forest;
  }

  &__dash {
    fill: none;
    stroke: $forest;
    stroke-width: 1.2;
    stroke-dasharray: 3 3;
  }

  &__stitch {
    fill: none;
    stroke: $ink;
    stroke-width: 1.4;
    stroke-dasharray: 2 2.5;
  }
}
</style>
