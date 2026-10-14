<script setup lang="ts">
import { useRouter } from 'vue-router'
import { site } from '@/config/site'
import { useUserStore } from '@/stores/user'
import BrandLogo from '@/components/BrandLogo.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const user = useUserStore()
const router = useRouter()

function logout() {
  user.clear()
  router.push({ name: 'AdminLogin' })
}
</script>

<template>
  <header class="bar">
    <div class="bar__inner">
      <RouterLink :to="{ name: 'AdminProducts' }" class="bar__brand">
        <BrandLogo />
        <span class="bar__tag">{{ site.admin.title }}</span>
      </RouterLink>
      <nav class="bar__actions">
        <a href="/" target="_blank" rel="noopener" class="bar__link">
          Ver web <BaseIcon name="arrow-up-right-from-square" />
        </a>
        <button v-if="user.isAuthenticated" class="bar__link" @click="logout">
          Salir <BaseIcon name="right-from-bracket" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.bar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba($surface, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $line;

  &__inner {
    @include container(1100px);
    @include flex(row, center, space-between, 1rem);
    min-height: 4rem;
  }

  &__brand {
    @include flex(row, center, flex-start, 0.75rem);
  }

  &__tag {
    display: none;
    font-size: $text-sm;
    color: $ink-muted;
    padding-left: 0.75rem;
    border-left: 1px solid $line;

    @include from('sm') {
      display: inline;
    }
  }

  &__actions {
    @include flex(row, center, flex-end, 0.25rem);
  }

  &__link {
    @include flex(row, center, center, 0.4rem);
    min-height: 2.75rem;
    padding: 0 0.75rem;
    font-size: $text-sm;
    color: $ink-soft;
    border-radius: $radius-sm;
    @include transition(background-color, color);

    &:hover {
      background: $sand;
      color: $ink;
    }
  }
}
</style>
