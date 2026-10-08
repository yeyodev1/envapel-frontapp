<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, whatsappLink } from '@/config/site'
import { useBodyScroll } from '@/composables/useBodyScroll'
import BrandLogo from '@/components/BrandLogo.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

useBodyScroll(mobileOpen)

// Al navegar se cierra el menú móvil.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled || mobileOpen }">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo" aria-label="Envapel, ir al inicio">
        <BrandLogo />
      </RouterLink>

      <nav class="header__nav" :class="{ 'header__nav--open': mobileOpen }" aria-label="Principal">
        <RouterLink v-for="link in site.nav" :key="link.to" :to="link.to" class="header__link">
          {{ link.label }}
        </RouterLink>
        <a
          :href="whatsappLink()"
          class="btn btn--primary header__cta"
          target="_blank"
          rel="noopener"
        >
          <BaseIcon name="whatsapp" /> Cotizar
        </a>
      </nav>

      <button
        class="header__burger"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="mobileOpen"
        @click="mobileOpen = !mobileOpen"
      >
        <BaseIcon :name="mobileOpen ? 'xmark' : 'bars'" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid transparent;
  @include transition(background-color, border-color);

  // El blur va en un pseudo-elemento: backdrop-filter en el header lo vuelve
  // el contenedor del menú móvil (position: fixed) y el menú queda recortado.
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba($paper, 0.9);
    backdrop-filter: blur(12px);
    opacity: 0;
    @include transition(opacity);
  }

  &--scrolled {
    border-color: $line;

    &::before {
      opacity: 1;
    }
  }

  &__inner {
    @include container(1240px);
    @include flex(row, center, space-between, 1rem);
    height: 4.25rem;
  }

  &__nav {
    display: none;

    @include from('lg') {
      @include flex(row, center, flex-end, 1.6rem);
    }

    &--open {
      @include until('lg') {
        @include flex(column, stretch, flex-start, 0.25rem);
        position: fixed;
        inset: 4.25rem 0 0;
        background: $paper;
        padding: 1.5rem 1.25rem;
        z-index: 90;
      }
    }
  }

  &__link {
    font-size: $text-sm;
    font-weight: 500;
    color: $ink-soft;
    padding: 0.5rem 0;
    @include transition(color);

    &:hover {
      color: $forest;
    }

    @include until('lg') {
      font-family: $font-display;
      font-size: $text-xl;
      color: $ink;
      padding: 0.75rem 0;
      border-bottom: 1px solid $line;
    }
  }

  &__cta {
    padding: 0.6rem 1.25rem;

    @include until('lg') {
      margin-top: 1.25rem;
      padding: 1rem;
    }
  }

  &__burger {
    font-size: 1.3rem;
    color: $ink;
    width: 2.75rem;
    height: 2.75rem;
    @include flex(row, center, center);

    @include from('lg') {
      display: none;
    }
  }
}
</style>
