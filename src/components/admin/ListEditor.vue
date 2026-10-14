<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue'

// Lista de textos cortos (usos ideales, opciones): una fila por elemento.
const items = defineModel<string[]>({ required: true })
defineProps<{ label: string; placeholder?: string; addLabel: string }>()

function add() {
  items.value = [...items.value, '']
}

function update(index: number, value: string) {
  items.value = items.value.map((v, i) => (i === index ? value : v))
}

function removeAt(index: number) {
  items.value = items.value.filter((_, i) => i !== index)
}
</script>

<template>
  <fieldset class="list-editor">
    <legend>{{ label }}</legend>
    <div v-for="(item, i) in items" :key="i" class="list-editor__row">
      <input
        :value="item"
        :placeholder="placeholder"
        :aria-label="`${label} ${i + 1}`"
        @input="update(i, ($event.target as HTMLInputElement).value)"
      />
      <button type="button" class="list-editor__remove" aria-label="Quitar" @click="removeAt(i)">
        <BaseIcon name="trash" />
      </button>
    </div>
    <button type="button" class="list-editor__add" @click="add">
      <BaseIcon name="plus" /> {{ addLabel }}
    </button>
  </fieldset>
</template>

<style scoped lang="scss">
.list-editor {
  border: none;
  @include flex(column, stretch, flex-start, 0.5rem);

  legend {
    font-size: 0.82rem;
    font-weight: 500;
    color: $ink-soft;
    margin-bottom: 0.35rem;
  }

  &__row {
    @include flex(row, center, flex-start, 0.4rem);
  }

  &__remove {
    @include flex(row, center, center);
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: $radius-sm;
    color: $ink-muted;

    &:hover {
      background: $danger-bg;
      color: $danger;
    }
  }

  &__add {
    @include flex(row, center, flex-start, 0.4rem);
    align-self: flex-start;
    min-height: 2.5rem;
    font-size: $text-sm;
    font-weight: 500;
    color: $forest;
  }
}
</style>
