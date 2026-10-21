<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { whatsappLink } from '@/config/site'
import { detailFor, type Product } from '@/config/catalog'
import { useQuote } from '@/composables/useQuote'
import SackGlyph from '@/components/home/SackGlyph.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const props = defineProps<{
  product: Product
  index: number
  reverse?: boolean
}>()

const router = useRouter()
const { preselect } = useQuote()

// El detalle editorial vive en el config y se cruza por slug: si el producto
// viene del panel sin detalle, la fila igual se pinta con su ficha corta.
const detail = computed(() => detailFor(props.product.slug))
const image = computed(() => props.product.image?.url || detail.value?.image)

function quote() {
  preselect(props.product.name)
  router.push('/contacto#cotizar')
}
</script>

<template>
  <article :id="product.slug" class="row" :class="{ 'row--reverse': reverse }">
    <div class="row__visual">
      <img
        v-if="image"
        :src="image"
        :alt="detail?.imageAlt || product.name"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="row__glyph">
        <SackGlyph :kind="product.kind" :square="product.square" />
      </div>
      <span class="row__badge">0{{ index + 1 }} / {{ detail?.tagline || product.name }}</span>
    </div>

    <div class="row__copy">
      <p class="section-head__eyebrow">Sacos multicapa</p>
      <h2 class="row__title">{{ product.name }}</h2>

      <template v-if="detail">
        <p v-for="(paragraph, i) in detail.paragraphs" :key="i" class="row__text">
          {{ paragraph }}
        </p>
        <ul class="row__tags">
          <li v-for="tag in detail.featureTags" :key="tag">{{ tag }}</li>
        </ul>
      </template>
      <p v-else class="row__text">{{ product.description }}</p>

      <dl class="row__specs">
        <div v-for="spec in product.specs" :key="spec.label">
          <dt>{{ spec.label }}</dt>
          <dd>{{ spec.value }}</dd>
        </div>
      </dl>

      <div v-if="detail" class="row__sectors">
        <h3>Lo fabricamos para</h3>
        <ul>
          <li v-for="sector in detail.sectors" :key="sector">
            <BaseIcon name="check" /> {{ sector }}
          </li>
        </ul>
      </div>

      <div class="row__actions">
        <button class="btn btn--primary" @click="quote">
          Cotizar este saco <BaseIcon name="arrow-right" />
        </button>
        <RouterLink :to="`/productos/${product.slug}`" class="row__link">
          Ver ficha completa
        </RouterLink>
        <a
          :href="whatsappLink(`Hola Envapel, quiero información del ${product.name.toLowerCase()}.`)"
          class="row__link row__link--wa"
          target="_blank"
          rel="noopener"
        >
          <BaseIcon name="whatsapp" /> WhatsApp
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.row {
  @include flex(column, stretch, flex-start, 2rem);
  padding-block: 3rem;
  border-top: 1px solid $line;
  scroll-margin-top: 5.5rem;

  @include from('lg') {
    flex-direction: row;
    gap: 4rem;

    &--reverse {
      flex-direction: row-reverse;
    }
  }

  &__visual {
    position: relative;
    flex: 1 1 42%;
    @include flex(row, center, center);
    align-self: flex-start;
    width: 100%;
    min-height: 18rem;
    border-radius: $radius-lg;
    overflow: hidden;
    background-color: $sand;
    background-image:
      linear-gradient(rgba($kraft, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba($kraft, 0.12) 1px, transparent 1px);
    background-size: 24px 24px;

    img {
      width: 100%;
      height: 100%;
      max-height: 30rem;
      object-fit: cover;
    }

    @include from('lg') {
      position: sticky;
      top: 5.5rem;
    }
  }

  &__glyph {
    width: 11rem;
    padding-block: 3rem;
  }

  &__badge {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    font-family: $font-mono;
    font-size: $text-xs;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.4rem 0.75rem;
    border-radius: $radius-pill;
    background: rgba($ink, 0.75);
    color: $paper;
  }

  &__copy {
    flex: 1 1 58%;
    @include flex(column, flex-start, flex-start, 1.1rem);
  }

  &__title {
    @include display(clamp(1.7rem, 1.3rem + 1.8vw, 2.5rem));
  }

  &__text {
    color: $ink-soft;
    max-width: 62ch;
  }

  &__tags {
    @include flex(row, center, flex-start, 0.45rem);
    flex-wrap: wrap;
    list-style: none;

    li {
      font-family: $font-mono;
      font-size: 0.72rem;
      padding: 0.3rem 0.7rem;
      border: 1px solid $line-strong;
      border-radius: $radius-pill;
      color: $ink-soft;
    }
  }

  &__specs {
    width: 100%;
    border-top: 1px solid $line-strong;

    > div {
      @include flex(row, baseline, space-between, 1rem);
      padding: 0.7rem 0;
      border-bottom: 1px solid $line;
    }

    dt {
      font-family: $font-mono;
      font-size: $text-xs;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: $ink-muted;
      flex-shrink: 0;
    }

    dd {
      font-weight: 500;
      text-align: right;
    }
  }

  &__sectors {
    width: 100%;

    h3 {
      @include eyebrow;
      margin-bottom: 0.75rem;
    }

    ul {
      @include flex-cards(230px, 0.5rem);
      list-style: none;
    }

    li {
      font-size: $text-sm;
      color: $ink-soft;

      .icon {
        width: 0.85rem;
        color: $forest;
        margin-right: 0.45rem;
      }
    }
  }

  &__actions {
    @include flex(row, center, flex-start, 1.25rem);
    flex-wrap: wrap;
    margin-top: 0.4rem;
  }

  &__link {
    font-size: $text-sm;
    font-weight: 600;
    color: $forest;
    @include flex(row, center, flex-start, 0.45rem);

    &:hover {
      color: $accent-deep;
    }

    &--wa {
      color: $whatsapp-deep;
    }
  }
}
</style>
