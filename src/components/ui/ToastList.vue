<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import type { IconName } from '@/config/icons'

const toastStore = useToastStore()

const icons: Record<string, IconName> = {
  success: 'circle-check',
  error: 'circle-exclamation',
  info: 'circle-info',
}
</script>

<template>
  <Teleport to="body">
    <div class="toasts" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="toasts__item"
          :class="`toasts__item--${toast.type}`"
          @click="toastStore.dismiss(toast.id)"
        >
          <BaseIcon :name="icons[toast.type] ?? 'circle-info'" />
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.toasts {
  position: fixed;
  bottom: 1.4rem;
  right: 1.4rem;
  @include flex(column, stretch, flex-start, 0.6rem);
  z-index: 300;
  max-width: min(360px, calc(100vw - 2.8rem));

  &__item {
    @include flex(row, center, flex-start, 0.7rem);
    background: $ink;
    color: $paper;
    font-size: $text-sm;
    padding: 0.85rem 1.1rem;
    border-radius: $radius-sm;
    box-shadow: $shadow-md;
    cursor: pointer;

    .icon {
      color: $accent-soft;
    }

    &--success .icon {
      color: $success;
    }

    &--error {
      background: $danger;

      .icon {
        color: $paper;
      }
    }
  }
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s $ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
