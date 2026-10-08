<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName } from '@/config/icons'

// Ícono decorativo en SVG: hereda color y tamaño del texto como hacía <i class="fa-…">.
const props = defineProps<{ name: IconName }>()
const icon = computed(() => icons[props.name])
</script>

<template>
  <svg class="icon" :viewBox="`0 0 ${icon.w} ${icon.h}`" aria-hidden="true" focusable="false">
    <path :d="icon.d" fill="currentColor" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  flex-shrink: 0;
  overflow: visible;
}
</style>
