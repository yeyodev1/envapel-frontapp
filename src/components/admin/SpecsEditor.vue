<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue'

type Spec = { label: string; value: string }

// Filas de la ficha técnica: "Hojas → 2 a 4 hojas de papel kraft".
const specs = defineModel<Spec[]>({ required: true })

function add() {
  specs.value = [...specs.value, { label: '', value: '' }]
}

function update(index: number, key: keyof Spec, value: string) {
  specs.value = specs.value.map((s, i) => (i === index ? { ...s, [key]: value } : s))
}

function removeAt(index: number) {
  specs.value = specs.value.filter((_, i) => i !== index)
}
</script>

<template>
  <fieldset class="specs-editor">
    <legend>Ficha técnica</legend>
    <div v-for="(s, i) in specs" :key="i" class="specs-editor__row">
      <input
        :value="s.label"
        placeholder="Dato (ej: Capacidad)"
        :aria-label="`Dato ${i + 1}`"
        class="specs-editor__label"
        @input="update(i, 'label', ($event.target as HTMLInputElement).value)"
      />
      <input
        :value="s.value"
        placeholder="Valor (ej: Hasta 50 kg)"
        :aria-label="`Valor ${i + 1}`"
        @input="update(i, 'value', ($event.target as HTMLInputElement).value)"
      />
      <button type="button" class="specs-editor__remove" aria-label="Quitar" @click="removeAt(i)">
        <BaseIcon name="trash" />
      </button>
    </div>
    <button type="button" class="specs-editor__add" @click="add">
      <BaseIcon name="plus" /> Agregar dato
    </button>
  </fieldset>
</template>

<style scoped lang="scss">
.specs-editor {
  border: none;
  @include flex(column, stretch, flex-start, 0.6rem);

  legend {
    font-size: 0.82rem;
    font-weight: 500;
    color: $ink-soft;
    margin-bottom: 0.35rem;
  }

  &__row {
    @include flex(row, center, flex-start, 0.4rem);
    flex-wrap: wrap;
    padding-bottom: 0.6rem;
    border-bottom: 1px dashed $line;

    @include from('sm') {
      flex-wrap: nowrap;
      padding-bottom: 0;
      border-bottom: none;
    }

    input {
      flex: 1 1 10rem;
    }
  }

  &__label {
    @include from('sm') {
      flex: 0 0 11rem !important;
    }
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
