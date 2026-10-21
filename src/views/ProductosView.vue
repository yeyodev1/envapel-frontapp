<script setup lang="ts">
import { site } from '@/config/site'
import { useCatalog } from '@/composables/useCatalog'
import PageBanner from '@/components/shared/PageBanner.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
import ProductDetailRow from '@/components/products/ProductDetailRow.vue'
import FormatComparison from '@/components/products/FormatComparison.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { products, load } = useCatalog()
load()
</script>

<template>
  <div class="catalog">
    <PageBanner
      :eyebrow="site.pages.productos.eyebrow"
      :title="site.pages.productos.title"
      :text="site.pages.productos.text"
    />

    <nav class="catalog__subnav" aria-label="Más información sobre los sacos">
      <div class="catalog__subnav-inner">
        <RouterLink v-for="link in site.productSubnav" :key="link.to" :to="link.to">
          {{ link.label }} <BaseIcon name="arrow-right" />
        </RouterLink>
      </div>
    </nav>

    <div class="catalog__inner">
      <ProductDetailRow
        v-for="(product, i) in products"
        :key="product.slug"
        :product="product"
        :index="i"
        :reverse="i % 2 === 1"
      />

      <FormatComparison />

      <p class="catalog__note">
        Las imágenes son representaciones referenciales. Las características de cada saco quedan
        definidas en la especificación y la muestra que aprobamos contigo antes de fabricar.
      </p>
    </div>

    <CtaBand
      eyebrow="Desarrollo a medida"
      title="¿Tu producto no calza en ningún formato de catálogo?"
      text="Dimensiones, capas, gramajes, válvula y arte se definen según tu proyecto. Cuéntanos qué empacas y lo resolvemos juntos."
      label="Solicitar desarrollo a medida"
      to="/contacto"
    />
  </div>
</template>

<style scoped lang="scss">
.catalog {
  &__subnav {
    border-bottom: 1px solid $line;
    background: $surface;
  }

  &__subnav-inner {
    @include container(1240px);
    @include flex(row, center, flex-start, 1.75rem);
    flex-wrap: wrap;
    padding-block: 0.9rem;

    a {
      @include flex(row, center, flex-start, 0.4rem);
      font-size: $text-sm;
      font-weight: 500;
      color: $ink-soft;
      @include transition(color);

      .icon {
        font-size: 0.65rem;
        @include transition(transform);
      }

      &:hover {
        color: $forest;

        .icon {
          transform: translateX(3px);
        }
      }
    }
  }

  &__inner {
    @include container(1240px);
    padding-block: 1rem $space-section;
  }

  &__note {
    font-size: $text-sm;
    color: $ink-muted;
    max-width: 68ch;
    padding-block: 2rem 0;
  }
}
</style>
