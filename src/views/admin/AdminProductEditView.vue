<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductEditor } from '@/composables/useProductEditor'
import AdminBar from '@/components/admin/AdminBar.vue'
import ListEditor from '@/components/admin/ListEditor.vue'
import SpecsEditor from '@/components/admin/SpecsEditor.vue'
import ImageField from '@/components/admin/ImageField.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const route = useRoute()
const { isNew, form, image, loading, saving, uploading, canSave, load, save, upload, clearImage } =
  useProductEditor(String(route.params.id))

onMounted(load)
</script>

<template>
  <div class="editor">
    <AdminBar />
    <section class="editor__inner">
      <RouterLink :to="{ name: 'AdminProducts' }" class="editor__back">
        <BaseIcon name="arrow-left" /> Todos los productos
      </RouterLink>
      <h1 class="editor__title">{{ isNew ? 'Nuevo producto' : form.name || 'Producto' }}</h1>

      <p v-if="loading" class="editor__state">Cargando…</p>

      <form v-else class="editor__body" @submit.prevent="save">
        <div class="editor__main">
          <div class="box">
            <div>
              <label for="p-name">Nombre *</label>
              <input id="p-name" v-model="form.name" required minlength="3" />
            </div>
            <div>
              <label for="p-short">Descripción corta (se ve en la tarjeta)</label>
              <input id="p-short" v-model="form.short" maxlength="140" />
            </div>
            <div>
              <label for="p-desc">Descripción completa (se ve en la ficha)</label>
              <textarea id="p-desc" v-model="form.description" rows="5" />
            </div>
            <div class="box__row">
              <div>
                <label for="p-kind">Forma de llenado</label>
                <select id="p-kind" v-model="form.kind">
                  <option value="valve">Por válvula (ensacadora)</option>
                  <option value="open">Boca abierta</option>
                </select>
              </div>
              <label class="check">
                <input v-model="form.square" type="checkbox" />
                Fondo cuadrado (se para solo)
              </label>
            </div>
          </div>

          <div class="box">
            <SpecsEditor v-model="form.specs" />
          </div>

          <div class="box">
            <ListEditor
              v-model="form.idealFor"
              label="Ideal para"
              placeholder="Ej: Fertilizantes"
              add-label="Agregar uso"
            />
            <ListEditor
              v-model="form.options"
              label="Opciones"
              placeholder="Ej: Lámina de polietileno"
              add-label="Agregar opción"
            />
          </div>
        </div>

        <aside class="editor__side">
          <div class="box">
            <ImageField
              :url="image.url"
              :kind="form.kind"
              :square="form.square"
              :disabled="isNew"
              :busy="uploading"
              @upload="upload"
              @clear="clearImage"
            />
          </div>

          <div class="box">
            <label class="check">
              <input v-model="form.isPublished" type="checkbox" />
              Publicado en la web
            </label>
            <div>
              <label for="p-slug">Dirección en la web</label>
              <input id="p-slug" v-model="form.slug" placeholder="se genera del nombre" />
              <p class="hint">envapel.com/productos/{{ form.slug || '…' }}</p>
            </div>
            <button class="btn btn--primary editor__save" :disabled="!canSave">
              {{ saving ? 'Guardando…' : isNew ? 'Crear producto' : 'Guardar cambios' }}
            </button>
          </div>
        </aside>
      </form>
    </section>
  </div>
</template>

<style scoped lang="scss">
.editor {
  min-height: 100vh;
  background: $paper;

  &__inner {
    @include container(1100px);
    padding-block: 1.5rem 4rem;
  }

  &__back {
    @include flex(row, center, flex-start, 0.5rem);
    min-height: 2.75rem;
    font-size: $text-sm;
    color: $ink-muted;

    &:hover {
      color: $forest;
    }
  }

  &__title {
    @include display($display-sm, 500);
    margin: 0.5rem 0 1.5rem;
  }

  &__state {
    color: $ink-muted;
    padding: 3rem 0;
  }

  &__body {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__main {
    @include flex(column, stretch, flex-start, 1rem);
    flex: 1 1 auto;
    min-width: 0;
  }

  &__side {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('lg') {
      flex: 0 0 20rem;
      position: sticky;
      top: 5rem;
    }
  }

  &__save {
    width: 100%;
    justify-content: center;
  }
}

.box {
  @include card;
  @include flex(column, stretch, flex-start, 1.1rem);
  padding: 1.25rem;

  &__row {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('sm') {
      flex-direction: row;
      align-items: flex-end;

      > * {
        flex: 1;
      }
    }
  }
}

.check {
  @include flex(row, center, flex-start, 0.6rem);
  min-height: 2.75rem;
  margin: 0;
  font-size: 0.95rem;
  color: $ink;
  cursor: pointer;

  input {
    width: 1.15rem;
    height: 1.15rem;
    padding: 0;
    accent-color: $forest;
  }
}

.hint {
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: $ink-muted;
  word-break: break-all;
}
</style>
