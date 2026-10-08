<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site, whatsappLink } from '@/config/site'
import { products } from '@/config/catalog'
import { useQuote } from '@/composables/useQuote'
import SackGlyph from '@/components/home/SackGlyph.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const route = useRoute()
const router = useRouter()
const { preselect } = useQuote()

const product = computed(() => products.find((p) => p.slug === route.params.slug))
const others = computed(() => products.filter((p) => p.slug !== route.params.slug))

watchEffect(() => {
  if (!product.value) return
  document.title = `${product.value.name} | ${site.name}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', product.value.short)
})

function quote() {
  if (!product.value) return
  preselect(product.value.name)
  router.push('/#cotizar')
}
</script>

<template>
  <article v-if="product" class="product">
    <div class="product__inner">
      <nav class="product__crumbs" aria-label="Ruta">
        <RouterLink to="/">Inicio</RouterLink>
        <BaseIcon name="chevron-right" />
        <RouterLink to="/#productos">Productos</RouterLink>
        <BaseIcon name="chevron-right" />
        <span>{{ product.name }}</span>
      </nav>

      <div class="product__main">
        <div class="product__visual">
          <SackGlyph :kind="product.kind" :square="product.square" />
        </div>

        <div class="product__info">
          <p class="section-head__eyebrow">Ficha técnica</p>
          <h1 class="product__title">{{ product.name }}</h1>
          <p class="product__desc">{{ product.description }}</p>

          <dl class="specs">
            <div v-for="s in product.specs" :key="s.label" class="specs__row">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.value }}</dd>
            </div>
          </dl>

          <div class="product__actions">
            <button class="btn btn--primary" @click="quote">
              Cotizar este saco <BaseIcon name="arrow-right" />
            </button>
            <a
              :href="
                whatsappLink(`Hola Envapel, quiero información del ${product.name.toLowerCase()}.`)
              "
              class="btn btn--whatsapp"
              target="_blank"
              rel="noopener"
            >
              <BaseIcon name="whatsapp" /> Escribir ahora
            </a>
          </div>
        </div>
      </div>

      <div class="product__extra">
        <section class="product__box">
          <h2>Ideal para</h2>
          <ul>
            <li v-for="tag in product.idealFor" :key="tag"><BaseIcon name="check" /> {{ tag }}</li>
          </ul>
        </section>
        <section class="product__box">
          <h2>Opciones</h2>
          <ul>
            <li v-for="opt in product.options" :key="opt"><BaseIcon name="plus" /> {{ opt }}</li>
          </ul>
        </section>
        <section class="product__box product__box--dark">
          <h2>Otras construcciones</h2>
          <RouterLink
            v-for="o in others"
            :key="o.slug"
            :to="`/productos/${o.slug}`"
            class="product__other"
          >
            {{ o.name }} <BaseIcon name="arrow-right" />
          </RouterLink>
        </section>
      </div>
    </div>
  </article>

  <section v-else class="product product--missing">
    <h1 class="product__title">No encontramos ese producto</h1>
    <RouterLink to="/#productos" class="btn btn--primary">Ver todos los sacos</RouterLink>
  </section>
</template>

<style scoped lang="scss">
.product {
  padding-block: 2rem $space-section;

  &--missing {
    @include flex(column, center, center, 1.5rem);
    min-height: 60vh;
  }

  &__inner {
    @include container(1240px);
  }

  &__crumbs {
    @include flex(row, center, flex-start, 0.6rem);
    flex-wrap: wrap;
    font-size: $text-sm;
    color: $ink-muted;
    margin-bottom: 2rem;

    .icon {
      font-size: 0.6rem;
    }

    a:hover {
      color: $forest;
    }
  }

  &__main {
    @include flex(column, stretch, flex-start, 2rem);

    @include from('lg') {
      flex-direction: row;
      gap: 4rem;
    }
  }

  &__visual {
    flex: 1 1 42%;
    @include flex(row, center, center);
    min-height: 22rem;
    padding: 3rem;
    border-radius: $radius-lg;
    background-color: $sand;
    background-image:
      linear-gradient(rgba($kraft, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba($kraft, 0.12) 1px, transparent 1px);
    background-size: 24px 24px;

    svg {
      max-width: 15rem;
    }
  }

  &__info {
    flex: 1 1 58%;
    @include flex(column, flex-start, flex-start, 1.1rem);
  }

  &__title {
    @include display($display-md);
  }

  &__desc {
    font-size: $text-lg;
    color: $ink-soft;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.75rem);
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  &__extra {
    @include flex-cards(260px, 1.25rem);
    margin-top: $space-xl;
  }

  &__box {
    @include card;
    padding: 1.6rem;

    h2 {
      @include eyebrow;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      @include flex(column, flex-start, flex-start, 0.6rem);
    }

    li .icon {
      color: $forest;
      margin-right: 0.5rem;
      width: 1rem;
    }

    &--dark {
      background: $forest;
      border-color: $forest;
      color: $paper;

      h2 {
        color: $kraft-soft;
      }
    }
  }

  &__other {
    @include flex(row, center, space-between, 1rem);
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba($paper, 0.15);
    font-family: $font-display;
    font-size: $text-lg;

    &:hover .icon {
      transform: translateX(4px);
    }

    .icon {
      font-size: 0.8rem;
      @include transition(transform);
    }
  }
}

.specs {
  width: 100%;
  border-top: 1px solid $line-strong;

  &__row {
    @include flex(row, baseline, space-between, 1rem);
    padding: 0.8rem 0;
    border-bottom: 1px solid $line;
  }

  dt {
    font-family: $font-mono;
    font-size: $text-xs;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $ink-muted;
  }

  dd {
    font-weight: 500;
    text-align: right;
  }
}
</style>
