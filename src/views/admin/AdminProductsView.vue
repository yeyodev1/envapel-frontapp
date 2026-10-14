<script setup lang="ts">
import { onMounted } from 'vue'
import { site } from '@/config/site'
import { useAdminProducts } from '@/composables/useAdminProducts'
import AdminBar from '@/components/admin/AdminBar.vue'
import SackGlyph from '@/components/home/SackGlyph.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const { items, loading, busy, fetch, togglePublished, move, remove } = useAdminProducts()

onMounted(fetch)
</script>

<template>
  <div class="admin">
    <AdminBar />
    <section class="admin__inner">
      <header class="admin__head">
        <div>
          <h1 class="admin__title">{{ site.admin.productsTitle }}</h1>
          <p class="admin__text">{{ site.admin.productsText }}</p>
        </div>
        <RouterLink
          :to="{ name: 'AdminProductEdit', params: { id: 'nuevo' } }"
          class="btn btn--primary"
        >
          <BaseIcon name="plus" /> {{ site.admin.newProduct }}
        </RouterLink>
      </header>

      <p v-if="loading" class="admin__state">Cargando productos…</p>
      <p v-else-if="!items.length" class="admin__state">{{ site.admin.empty }}</p>

      <ul v-else class="list">
        <li
          v-for="(p, i) in items"
          :key="p._id"
          class="row"
          :class="{ 'row--busy': busy === p._id }"
        >
          <div class="row__thumb">
            <img v-if="p.image?.url" :src="p.image.url" :alt="p.name" />
            <SackGlyph v-else :kind="p.kind" :square="p.square" />
          </div>

          <div class="row__info">
            <RouterLink :to="{ name: 'AdminProductEdit', params: { id: p._id } }" class="row__name">
              {{ p.name }}
            </RouterLink>
            <p class="row__short">{{ p.short || 'Sin descripción corta' }}</p>
            <span class="badge" :class="p.isPublished ? 'badge--on' : 'badge--off'">
              {{ p.isPublished ? 'Publicado' : 'Borrador' }}
            </span>
          </div>

          <div class="row__actions">
            <button
              class="row__btn"
              :disabled="i === 0 || !!busy"
              aria-label="Subir"
              @click="move(i, -1)"
            >
              <BaseIcon name="chevron-right" class="row__up" />
            </button>
            <button
              class="row__btn"
              :disabled="i === items.length - 1 || !!busy"
              aria-label="Bajar"
              @click="move(i, 1)"
            >
              <BaseIcon name="chevron-right" class="row__down" />
            </button>
            <button class="row__btn row__btn--text" :disabled="!!busy" @click="togglePublished(p)">
              {{ p.isPublished ? 'Ocultar' : 'Publicar' }}
            </button>
            <RouterLink
              :to="{ name: 'AdminProductEdit', params: { id: p._id } }"
              class="row__btn"
              aria-label="Editar"
            >
              <BaseIcon name="pen" />
            </RouterLink>
            <button
              class="row__btn row__btn--danger"
              :disabled="!!busy"
              aria-label="Eliminar"
              @click="remove(p, site.admin.deleteConfirm)"
            >
              <BaseIcon name="trash" />
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.admin {
  min-height: 100vh;
  background: $paper;

  &__inner {
    @include container(1100px);
    padding-block: 2rem 4rem;
  }

  &__head {
    @include flex(column, flex-start, flex-start, 1.25rem);
    margin-bottom: 2rem;

    @include from('md') {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  &__title {
    @include display($display-sm, 500);
  }

  &__text {
    color: $ink-muted;
    max-width: 36rem;
    margin-top: 0.35rem;
  }

  &__state {
    color: $ink-muted;
    padding: 3rem 0;
    text-align: center;
  }
}

.list {
  list-style: none;
  @include flex(column, stretch, flex-start, 0.75rem);
}

.row {
  @include card;
  @include flex(row, center, flex-start, 1rem);
  flex-wrap: wrap;
  padding: 1rem;
  @include transition(opacity);

  &--busy {
    opacity: 0.55;
  }

  &__thumb {
    @include flex(row, center, center);
    width: 4rem;
    height: 4.5rem;
    flex-shrink: 0;
    background: $sand;
    border-radius: $radius-sm;
    overflow: hidden;
    padding: 0.4rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    @include flex(column, flex-start, flex-start, 0.3rem);
    flex: 1 1 12rem;
    min-width: 0;
  }

  &__name {
    font-weight: 600;
    color: $ink;

    &:hover {
      color: $forest;
    }
  }

  &__short {
    font-size: $text-sm;
    color: $ink-muted;
  }

  &__actions {
    @include flex(row, center, flex-end, 0.25rem);
    flex: 1 1 100%;
    border-top: 1px solid $line;
    padding-top: 0.75rem;

    @include from('md') {
      flex: 0 0 auto;
      border-top: none;
      padding-top: 0;
    }
  }

  &__btn {
    @include flex(row, center, center);
    min-width: 2.75rem;
    height: 2.75rem;
    border-radius: $radius-sm;
    color: $ink-soft;
    @include transition(background-color, color);

    &:hover:not(:disabled) {
      background: $sand;
      color: $ink;
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &--text {
      padding: 0 0.85rem;
      font-size: $text-sm;
      font-weight: 500;
    }

    &--danger:hover:not(:disabled) {
      background: $danger-bg;
      color: $danger;
    }
  }

  &__up {
    transform: rotate(-90deg);
  }

  &__down {
    transform: rotate(90deg);
  }
}

.badge {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;

  &--on {
    background: $success-bg;
    color: $forest;
  }

  &--off {
    background: $warning-bg;
    color: $kraft-deep;
  }
}
</style>
