<script setup lang="ts">
import { computed, ref } from 'vue'
import { site } from '@/config/site'
import { layers } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const activeId = ref(layers[0]!.id)
const active = computed(() => layers.find((l) => l.id === activeId.value) ?? layers[0]!)

// SVG pinta en orden: la hoja exterior va al final para quedar encima.
const drawOrder = layers.map((layer, i) => ({ layer, i })).reverse()

// Cada hoja es un rombo isométrico; la activa se separa del resto.
function sheetY(index: number) {
  const base = 24 + index * 56
  const activeIndex = layers.findIndex((l) => l.id === activeId.value)
  if (index < activeIndex) return base - 18
  if (index > activeIndex) return base + 18
  return base
}
</script>

<template>
  <section id="anatomia" ref="root" class="anatomy">
    <div class="anatomy__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.anatomy.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.anatomy.title }}</h2>
        <p class="section-head__text">{{ site.anatomy.text }}</p>
      </header>

      <div class="anatomy__stage">
        <svg
          class="anatomy__svg"
          viewBox="0 0 420 380"
          role="img"
          aria-label="Capas de un saco multicapa"
          data-reveal
        >
          <g
            v-for="{ layer, i } in drawOrder"
            :key="layer.id"
            class="sheet"
            :class="{ 'sheet--active': layer.id === activeId }"
            :style="{ transform: `translateY(${sheetY(i)}px)` }"
            @click="activeId = layer.id"
          >
            <path d="M210 0 L400 70 L210 140 L20 70 Z" :fill="layer.tone" class="sheet__face" />
            <path d="M20 70 L210 140 L210 148 L20 78 Z" fill="#000" opacity="0.12" />
            <path d="M210 140 L400 70 L400 78 L210 148 Z" fill="#000" opacity="0.2" />
            <text x="40" y="74" class="sheet__num">{{ String(i + 1).padStart(2, '0') }}</text>
          </g>
        </svg>

        <div class="anatomy__panel" data-reveal>
          <ol class="anatomy__list">
            <li v-for="(layer, i) in layers" :key="layer.id">
              <button
                class="layer-btn"
                :class="{ 'layer-btn--active': layer.id === activeId }"
                :aria-pressed="layer.id === activeId"
                @click="activeId = layer.id"
              >
                <span class="layer-btn__swatch" :style="{ background: layer.tone }"></span>
                <span class="layer-btn__num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="layer-btn__name">{{ layer.name }}</span>
              </button>
            </li>
          </ol>

          <Transition name="rise" mode="out-in">
            <div :key="active.id" class="anatomy__detail">
              <p class="anatomy__role">{{ active.role }}</p>
              <p class="anatomy__text">{{ active.detail }}</p>
            </div>
          </Transition>
          <p class="anatomy__note">
            <i class="fa-solid fa-circle-info"></i> El número de hojas y la barrera se definen según
            el peso y el producto.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.anatomy {
  padding-block: $space-section;
  background: $ink;
  color: $paper;

  .section-head__title {
    color: $paper;
  }

  .section-head__text {
    color: rgba($paper, 0.7);
  }

  .section-head__eyebrow {
    color: $kraft;
  }

  &__inner {
    @include container(1240px);
  }

  &__stage {
    @include flex(column, stretch, flex-start, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;
    }
  }

  &__svg {
    flex: 1 1 50%;
    width: 100%;
    max-width: 34rem;
    margin-inline: auto;
    overflow: visible;
  }

  &__panel {
    flex: 1 1 50%;
    @include flex(column, stretch, flex-start, 1.5rem);
  }

  &__list {
    list-style: none;
    @include flex(column, stretch, flex-start, 0.4rem);
  }

  &__detail {
    padding: 1.5rem;
    border-radius: $radius-md;
    background: rgba($paper, 0.05);
    border: 1px solid rgba($paper, 0.1);
    min-height: 9rem;
  }

  &__role {
    @include display($text-xl, 500);
    color: $kraft-soft;
    margin-bottom: 0.6rem;
  }

  &__text {
    color: rgba($paper, 0.75);
  }

  &__note {
    font-size: $text-sm;
    color: rgba($paper, 0.5);

    i {
      color: $kraft;
      margin-right: 0.3rem;
    }
  }
}

.sheet {
  cursor: pointer;
  transition: transform 0.6s $ease;

  &__face {
    stroke: rgba(#000, 0.15);
    transition:
      filter 0.4s ease,
      opacity 0.4s ease;
  }

  &__num {
    font-family: $font-mono;
    font-size: 13px;
    fill: rgba(#000, 0.45);
  }

  &:not(&--active) &__face {
    filter: saturate(0.6) brightness(0.85);
  }

  &--active &__face {
    filter: drop-shadow(0 10px 18px rgba(#000, 0.4));
  }
}

.layer-btn {
  width: 100%;
  min-height: 3.25rem;
  @include flex(row, center, flex-start, 0.9rem);
  padding: 0.7rem 1rem;
  border-radius: $radius-sm;
  border: 1px solid transparent;
  text-align: left;
  color: rgba($paper, 0.65);
  @include transition(background-color, border-color, color);

  &:hover {
    color: $paper;
    background: rgba($paper, 0.04);
  }

  &--active {
    color: $paper;
    border-color: rgba($kraft, 0.6);
    background: rgba($kraft, 0.12);
  }

  &__swatch {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 3px;
    flex-shrink: 0;
  }

  &__num {
    font-family: $font-mono;
    font-size: $text-xs;
    color: $kraft;
  }

  &__name {
    font-weight: 500;
  }
}
</style>
