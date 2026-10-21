<script setup lang="ts">
import { site } from '@/config/site'
import { sectors } from '@/config/catalog'
import { useCatalog } from '@/composables/useCatalog'
import PageBanner from '@/components/shared/PageBanner.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { load } = useCatalog()
load()
</script>

<template>
  <div class="apps">
    <PageBanner
      :eyebrow="site.pages.aplicaciones.eyebrow"
      :title="site.pages.aplicaciones.title"
      :text="site.pages.aplicaciones.text"
    />

    <div class="apps__inner">
      <p class="apps__intro">
        El mismo papel no resuelve todos los productos. Un fertilizante higroscópico, una harina
        que toca alimento y un carbón de puntas duras piden estructuras distintas: por eso cada
        sector tiene su punto de partida.
      </p>

      <div class="apps__grid">
        <article v-for="sector in sectors" :key="sector.id" class="sector">
          <div v-if="sector.image" class="sector__photo">
            <img :src="sector.image" :alt="sector.imageAlt || sector.name" loading="lazy" decoding="async" />
          </div>
          <div class="sector__body">
            <h2 class="sector__name">{{ sector.name }}</h2>
            <p class="sector__intro">{{ sector.intro }}</p>
            <ul class="sector__items">
              <li v-for="item in sector.items" :key="item">
                <BaseIcon name="check" /> {{ item }}
              </li>
            </ul>
            <RouterLink :to="`/productos#${sector.formatSlug}`" class="sector__format">
              {{ sector.format }} <BaseIcon name="arrow-right" />
            </RouterLink>
          </div>
        </article>
      </div>

      <p class="apps__note">
        Fotografías referenciales de aplicaciones. La compatibilidad de cada saco se valida con tu
        producto y su uso previsto antes de fabricar.
      </p>
    </div>

    <CtaBand
      eyebrow="¿No ves tu producto?"
      title="Si pesa, se derrama o se come, probablemente lo podemos empacar."
      text="Cuéntanos qué envasas y te decimos con franqueza si el papel multicapa es la solución o no."
      label="Consultar mi caso"
    />
  </div>
</template>

<style scoped lang="scss">
.apps {
  &__inner {
    @include container(1240px);
    padding-block: 3rem $space-section;
  }

  &__intro {
    font-size: $text-lg;
    color: $ink-soft;
    max-width: 62ch;
    margin-bottom: 2.5rem;
  }

  &__grid {
    @include flex-cards(320px, 1.5rem);
  }

  &__note {
    font-size: $text-sm;
    color: $ink-muted;
    margin-top: 2.25rem;
  }
}

.sector {
  @include card;
  @include flex(column, stretch, flex-start);
  overflow: hidden;
  @include transition(transform, box-shadow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-md;
  }

  &__photo {
    height: 13rem;
    border-bottom: 1px solid $line;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__body {
    @include flex(column, flex-start, flex-start, 0.8rem);
    padding: 1.5rem;
    flex: 1;
  }

  &__name {
    @include display($text-xl, 600);
  }

  &__intro {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__items {
    @include flex(column, flex-start, flex-start, 0.45rem);
    list-style: none;
    font-size: $text-sm;
    color: $ink-soft;

    .icon {
      width: 0.8rem;
      color: $forest;
      margin-right: 0.45rem;
    }
  }

  &__format {
    @include flex(row, center, flex-start, 0.45rem);
    margin-top: auto;
    padding-top: 0.75rem;
    font-size: $text-sm;
    font-weight: 600;
    color: $forest;

    .icon {
      font-size: 0.7rem;
      @include transition(transform);
    }

    &:hover .icon {
      transform: translateX(4px);
    }
  }
}
</style>
