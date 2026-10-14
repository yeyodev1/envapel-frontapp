<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/config/site'
import SackGlyph from '@/components/home/SackGlyph.vue'

const props = defineProps<{
  url: string
  kind: 'valve' | 'open'
  square: boolean
  disabled?: boolean
  busy?: boolean
}>()
const emit = defineEmits<{ upload: [file: File]; clear: [] }>()

const input = ref<HTMLInputElement | null>(null)

function pick(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) emit('upload', file)
  // Permite volver a elegir el mismo archivo después de un error.
  if (input.value) input.value.value = ''
}
</script>

<template>
  <div class="image-field">
    <div class="image-field__preview" :class="{ 'image-field__preview--busy': busy }">
      <img v-if="props.url" :src="props.url" alt="Foto del producto" />
      <SackGlyph v-else :kind="kind" :square="square" />
    </div>
    <p class="image-field__help">
      {{
        disabled ? 'Guarda el producto primero para poder subirle una foto.' : site.admin.imageHelp
      }}
    </p>
    <div class="image-field__actions">
      <label class="btn btn--dark image-field__btn" :class="{ 'is-disabled': disabled || busy }">
        {{ busy ? 'Subiendo…' : props.url ? 'Cambiar foto' : 'Subir foto' }}
        <input
          ref="input"
          type="file"
          accept="image/*"
          class="visually-hidden"
          :disabled="disabled || busy"
          @change="pick"
        />
      </label>
      <button
        v-if="props.url"
        type="button"
        class="btn btn--ghost"
        :disabled="busy"
        @click="emit('clear')"
      >
        Quitar
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.image-field {
  @include flex(column, stretch, flex-start, 0.75rem);

  &__preview {
    @include flex(row, center, center);
    aspect-ratio: 4 / 3;
    padding: 1.5rem;
    background: $sand;
    border-radius: $radius-md;
    overflow: hidden;
    @include transition(opacity);

    &--busy {
      opacity: 0.5;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    svg {
      max-width: 8rem;
    }
  }

  &__help {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.5rem);
    flex-wrap: wrap;
  }

  &__btn {
    margin: 0;
    cursor: pointer;

    &.is-disabled {
      opacity: 0.45;
      pointer-events: none;
    }
  }
}
</style>
