<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { whatsappLink } from '@/config/site'

// Aparece después del hero para no tapar el primer llamado a la acción.
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > window.innerHeight * 0.6
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="rise">
    <a
      v-if="visible"
      :href="whatsappLink()"
      class="wa"
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
    >
      <i class="fa-brands fa-whatsapp"></i>
      <span class="wa__label">¿Cotizamos?</span>
    </a>
  </Transition>
</template>

<style scoped lang="scss">
.wa {
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  z-index: 80;
  @include flex(row, center, center, 0.55rem);
  height: 3.5rem;
  min-width: 3.5rem;
  padding: 0 1rem;
  border-radius: $radius-pill;
  background: $whatsapp;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba($whatsapp-deep, 0.4);
  @include transition(transform, background-color);

  i {
    font-size: 1.6rem;
  }

  &:hover {
    background: $whatsapp-deep;
    transform: translateY(-2px);
  }

  &__label {
    display: none;

    @include from('md') {
      display: inline;
    }
  }
}
</style>
