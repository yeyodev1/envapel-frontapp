<script setup lang="ts">
import { ref } from 'vue'
import { site, whatsappLink } from '@/config/site'
import { products } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'
import SackGlyph from './SackGlyph.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="productos" ref="root" class="products">
    <div class="products__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.products.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.products.title }}</h2>
        <p class="section-head__text">{{ site.products.text }}</p>
      </header>

      <div class="products__list">
        <article v-for="(p, i) in products" :key="p.slug" class="card" data-reveal>
          <div class="card__visual">
            <span class="card__index">0{{ i + 1 }}</span>
            <div class="card__glyph">
              <SackGlyph :kind="p.kind" :square="p.square" />
            </div>
          </div>
          <div class="card__body">
            <h3 class="card__title">{{ p.name }}</h3>
            <p class="card__short">{{ p.short }}</p>
            <ul class="card__tags">
              <li v-for="tag in p.idealFor.slice(0, 3)" :key="tag">{{ tag }}</li>
            </ul>
            <div class="card__actions">
              <RouterLink :to="`/productos/${p.slug}`" class="card__link">
                Ver ficha técnica <BaseIcon name="arrow-right" />
              </RouterLink>
              <a
                :href="whatsappLink(`Hola Envapel, quiero cotizar un ${p.name.toLowerCase()}.`)"
                class="card__wa"
                target="_blank"
                rel="noopener"
                :aria-label="`Cotizar ${p.name} por WhatsApp`"
              >
                <BaseIcon name="whatsapp" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.products {
  padding-block: $space-section;

  &__inner {
    @include container(1240px);
  }

  &__list {
    @include flex-cards(300px, 1.25rem);
  }
}

.card {
  @include card;
  @include flex(column, stretch, flex-start);
  overflow: hidden;
  @include transition(transform, box-shadow, border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
    border-color: $line-strong;
  }

  &__visual {
    position: relative;
    @include flex(row, center, center);
    height: 15rem;
    background-color: $sand;
    background-image:
      linear-gradient(rgba($kraft, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba($kraft, 0.12) 1px, transparent 1px);
    background-size: 20px 20px;
    border-bottom: 1px solid $line;
  }

  &__index {
    position: absolute;
    top: 1rem;
    left: 1.1rem;
    font-family: $font-mono;
    font-size: $text-xs;
    color: $kraft-deep;
  }

  &__glyph {
    width: 7.5rem;
    height: 9.5rem;
    @include transition(transform);
  }

  &:hover &__glyph {
    transform: translateY(-6px) rotate(-2deg);
  }

  &__body {
    @include flex(column, flex-start, flex-start, 0.75rem);
    padding: 1.5rem 1.5rem 1.35rem;
    flex: 1;
  }

  &__title {
    @include display($text-xl, 600);
  }

  &__short {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__tags {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
    list-style: none;

    li {
      font-family: $font-mono;
      font-size: 0.7rem;
      padding: 0.25rem 0.6rem;
      border: 1px solid $line;
      border-radius: $radius-pill;
      color: $ink-soft;
    }
  }

  &__actions {
    @include flex(row, center, space-between, 1rem);
    width: 100%;
    margin-top: auto;
    padding-top: 0.75rem;
  }

  &__link {
    font-size: $text-sm;
    font-weight: 600;
    color: $forest;
    @include flex(row, center, flex-start, 0.45rem);

    .icon {
      @include transition(transform);
    }

    &:hover .icon {
      transform: translateX(4px);
    }
  }

  &__wa {
    @include flex(row, center, center);
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background: rgba($whatsapp, 0.1);
    color: $whatsapp-deep;
    font-size: 1.2rem;
    @include transition(background-color, color);

    &:hover {
      background: $whatsapp;
      color: #fff;
    }
  }
}
</style>
