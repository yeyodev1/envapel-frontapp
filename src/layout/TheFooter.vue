<script setup lang="ts">
import { site, whatsappLink } from '@/config/site'
import { products } from '@/config/catalog'
import BrandLogo from '@/components/BrandLogo.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <BrandLogo tone="light" />
        <p class="footer__tagline">{{ site.description }}</p>
        <a
          :href="whatsappLink()"
          class="btn btn--whatsapp footer__wa"
          target="_blank"
          rel="noopener"
        >
          <BaseIcon name="whatsapp" /> {{ site.phoneDisplay }}
        </a>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Productos</h2>
        <RouterLink v-for="p in products" :key="p.slug" :to="`/productos/${p.slug}`">
          {{ p.name }}
        </RouterLink>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Empresa</h2>
        <RouterLink v-for="link in site.nav.slice(1)" :key="link.to" :to="link.to">
          {{ link.label }}
        </RouterLink>
        <a :href="site.sisterBrand.url" target="_blank" rel="noopener">
          {{ site.sisterBrand.name }} <BaseIcon name="arrow-up-right-from-square" />
        </a>
      </div>

      <div class="footer__col">
        <h2 class="footer__heading">Dónde estamos</h2>
        <p><BaseIcon name="industry" /> {{ site.address.plant }}</p>
        <p><BaseIcon name="building" /> {{ site.address.office }}</p>
        <a v-if="site.email" :href="`mailto:${site.email}`">
          <BaseIcon name="envelope" /> {{ site.email }}
        </a>
      </div>
    </div>

    <div class="footer__bar">
      <span>© {{ year }} {{ site.legalName }} · RUC {{ site.ruc }}</span>
      <span class="footer__credit">
        Sitio por <a href="https://bakano.ec" target="_blank" rel="noopener">Bakano</a>
      </span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: $forest-deep;
  color: rgba($paper, 0.8);
  margin-top: auto;

  &__inner {
    @include container(1240px);
    @include flex-cards(200px, 2.5rem);
    padding-block: $space-xl 2.5rem;
  }

  &__brand {
    flex: 2 1 300px !important;
    @include flex(column, flex-start, flex-start, 1.1rem);
  }

  &__tagline {
    font-size: $text-sm;
    color: rgba($paper, 0.65);
    max-width: 40ch;
  }

  &__wa {
    padding: 0.7rem 1.3rem;
  }

  &__col {
    @include flex(column, flex-start, flex-start, 0.6rem);
    font-size: $text-sm;

    a,
    p {
      color: rgba($paper, 0.75);
      @include transition(color);
    }

    a:hover {
      color: $kraft-soft;
    }

    .icon {
      width: 1.1rem;
      color: $kraft;
    }
  }

  &__heading {
    @include eyebrow;
    color: $kraft;
    margin-bottom: 0.3rem;
  }

  &__bar {
    @include container(1240px);
    @include flex(row, center, space-between, 1rem);
    flex-wrap: wrap;
    padding-block: 1.3rem;
    border-top: 1px solid rgba($paper, 0.1);
    font-size: $text-xs;
    color: rgba($paper, 0.5);
  }

  &__credit a {
    color: rgba($paper, 0.8);
  }
}
</style>
