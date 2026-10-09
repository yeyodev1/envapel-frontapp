<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, whatsappLink } from '@/config/site'
import { useBodyScroll } from '@/composables/useBodyScroll'
import BrandLogo from '@/components/BrandLogo.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { useMenuTimeline } from '@/composables/useMenuTimeline'

const route = useRoute()
const root = ref<HTMLElement | null>(null)
const mobileOpen = ref(false)
const scrolled = ref(false)

useBodyScroll(mobileOpen)
useMenuTimeline(root, mobileOpen)

// Al abrir, el foco pasa al primer enlace para quien navega con teclado. Espera
// un frame de GSAP: un elemento con visibility: hidden no recibe foco.
watch(mobileOpen, (isOpen) => {
  if (!isOpen) return
  setTimeout(() => {
    root.value?.querySelector<HTMLElement>('.header__link')?.focus({ preventScroll: true })
  }, 120)
})

// Al navegar se cierra el menú móvil.
watch(
  () => route.fullPath,
  () => (mobileOpen.value = false),
)

// Barra de avance de lectura bajo el header: scaleX directo, sin re-render de Vue.
const progress = ref<HTMLElement | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 12
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (progress.value) progress.value.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header ref="root" class="header" :class="{ 'header--scrolled': scrolled || mobileOpen }">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo" aria-label="Envapel, ir al inicio">
        <BrandLogo />
      </RouterLink>

      <nav id="menu-principal" class="header__nav" aria-label="Principal">
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
        aria-controls="menu-principal"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="burger" aria-hidden="true">
          <span class="burger__line burger__line--top"></span>
          <span class="burger__line burger__line--mid"></span>
          <span class="burger__line burger__line--bot"></span>
        </span>
      </button>
    </div>
    <span ref="progress" class="header__progress" aria-hidden="true"></span>
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

  // En móvil el panel siempre existe pero arranca oculto: lo muestra la línea
  // de tiempo de useMenuTimeline (autoAlpha + clip-path).
  &__nav {
    @include flex(column, stretch, flex-start, 0.25rem);
    position: fixed;
    inset: 4.25rem 0 0;
    background: $paper;
    padding: 1.5rem 1.25rem;
    z-index: 90;
    visibility: hidden;

    @include from('lg') {
      @include flex(row, center, flex-end, 1.6rem);
      position: static;
      background: none;
      padding: 0;
      visibility: visible;
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

    // En el menú móvil lo anima GSAP; la transición CSS de .btn lo frenaría.
    @include until('lg') {
      margin-top: 1.25rem;
      padding: 1rem;
      transition: none;
    }
  }

  &__progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: $accent;
    transform: scaleX(0);
    transform-origin: left;
  }

  &__burger {
    color: $ink;
    width: 2.75rem;
    height: 2.75rem;
    @include flex(row, center, center);

    @include from('lg') {
      display: none;
    }
  }
}

.burger {
  position: relative;
  width: 1.4rem;
  height: 14px;
  @include flex(column, stretch, space-between);

  &__line {
    height: 2px;
    border-radius: 2px;
    background: currentColor;
    transform-origin: center;
  }
}
</style>
