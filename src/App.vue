<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheHeader from '@/layout/TheHeader.vue'
import TheFooter from '@/layout/TheFooter.vue'
import ToastList from '@/components/ui/ToastList.vue'
import WhatsAppFloat from '@/components/WhatsAppFloat.vue'
import { usePageTransition } from '@/composables/usePageTransition'
import { useCatalog } from '@/composables/useCatalog'
import { useUserStore } from '@/stores/user'

const { onLeave, onEnter } = usePageTransition()
const route = useRoute()
const router = useRouter()
const user = useUserStore()

// El panel tiene su propia barra: sin header, footer ni botón de WhatsApp del sitio.
const isAdmin = computed(() => Boolean(route.meta.admin))

useCatalog().load()

function onExpired() {
  user.clear()
  if (route.meta.requiresAuth) {
    router.push({ name: 'AdminLogin', query: { redirect: route.fullPath } })
  }
}

onMounted(() => window.addEventListener('auth:token-expired', onExpired))
onBeforeUnmount(() => window.removeEventListener('auth:token-expired', onExpired))
</script>

<template>
  <div class="app">
    <TheHeader v-if="!isAdmin" />
    <main class="app__main">
      <RouterView v-slot="{ Component, route: r }">
        <Transition mode="out-in" :css="false" @leave="onLeave" @enter="onEnter">
          <component :is="Component" :key="r.path" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter v-if="!isAdmin" />
    <WhatsAppFloat v-if="!isAdmin" />
    <ToastList />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
