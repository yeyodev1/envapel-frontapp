<script setup lang="ts">
import TheHeader from '@/layout/TheHeader.vue'
import TheFooter from '@/layout/TheFooter.vue'
import ToastList from '@/components/ui/ToastList.vue'
import WhatsAppFloat from '@/components/WhatsAppFloat.vue'
import { usePageTransition } from '@/composables/usePageTransition'

const { onLeave, onEnter } = usePageTransition()
</script>

<template>
  <div class="app">
    <TheHeader />
    <main class="app__main">
      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in" :css="false" @leave="onLeave" @enter="onEnter">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
    <WhatsAppFloat />
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
