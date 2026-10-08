<script setup lang="ts">
import { computed, ref } from 'vue'
import { site } from '@/config/site'
import { products } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'
import SackBlueprint from './SackBlueprint.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const tabs = products.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  code: `EV-${String(i + 1).padStart(2, '0')}-${p.kind === 'valve' ? 'VAL' : p.square ? 'FCU' : 'BAC'}`,
  variant: (p.kind === 'valve' ? 'valve' : p.square ? 'square' : 'open') as
    'valve' | 'open' | 'square',
}))

const current = ref(tabs[0]!.slug)
const tab = computed(() => tabs.find((t) => t.slug === current.value) ?? tabs[0]!)

const legend = [
  { key: 'A', name: 'Ancho', text: 'Medida frontal del saco lleno. Define el área de impresión.' },
  { key: 'L', name: 'Largo', text: 'De fondo a fondo. Junto al ancho fija la capacidad.' },
  { key: 'F', name: 'Fuelle', text: 'Profundidad lateral: da volumen y estabilidad al apilar.' },
  { key: 'V', name: 'Válvula', text: 'Boca de llenado para ensacadoras. Solo en valvulados.' },
]
</script>

<template>
  <section id="planos" ref="root" class="blueprint">
    <div class="blueprint__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.blueprint.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.blueprint.title }}</h2>
        <p class="section-head__text">{{ site.blueprint.text }}</p>
      </header>

      <div class="blueprint__tabs" role="tablist" aria-label="Tipo de saco" data-reveal>
        <button
          v-for="t in tabs"
          :key="t.slug"
          role="tab"
          class="blueprint__tab"
          :class="{ 'blueprint__tab--active': t.slug === current }"
          :aria-selected="t.slug === current"
          @click="current = t.slug"
        >
          {{ t.name }}
        </button>
      </div>

      <div class="blueprint__body">
        <div class="blueprint__sheet" data-reveal>
          <Transition name="fade" mode="out-in">
            <SackBlueprint
              :key="tab.slug"
              :variant="tab.variant"
              :code="tab.code"
              :name="tab.name"
            />
          </Transition>
        </div>

        <aside class="blueprint__legend" data-reveal>
          <dl>
            <div
              v-for="item in legend"
              :key="item.key"
              class="blueprint__item"
              :class="{ 'blueprint__item--off': item.key === 'V' && tab.variant !== 'valve' }"
            >
              <dt>
                <span>{{ item.key }}</span> {{ item.name }}
              </dt>
              <dd>{{ item.text }}</dd>
            </div>
          </dl>
          <RouterLink to="/#cotizar" class="btn btn--primary">
            <i class="fa-solid fa-ruler-combined"></i> {{ site.blueprint.cta }}
          </RouterLink>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.blueprint {
  padding-block: $space-section;
  background: $sand;

  &__inner {
    @include container(1240px);
  }

  &__tabs {
    @include flex(row, center, flex-start, 0.4rem);
    overflow-x: auto;
    padding-bottom: 0.25rem;
    margin-bottom: 1.25rem;
    scrollbar-width: none;
  }

  &__tab {
    flex-shrink: 0;
    min-height: 2.75rem;
    padding: 0.6rem 1.1rem;
    border-radius: $radius-pill;
    border: 1px solid $line-strong;
    font-size: $text-sm;
    font-weight: 500;
    color: $ink-soft;
    @include transition(background-color, color, border-color);

    &:hover {
      border-color: $forest;
      color: $forest;
    }

    &--active {
      background: $forest;
      border-color: $forest;
      color: $paper;

      &:hover {
        color: $paper;
      }
    }
  }

  &__body {
    @include flex(column, stretch, flex-start, 1.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: stretch;
    }
  }

  &__sheet {
    flex: 1 1 65%;
    padding: 1rem;
    border-radius: $radius-md;
    background-color: $surface;
    background-image:
      linear-gradient(rgba($forest, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba($forest, 0.05) 1px, transparent 1px);
    background-size: 16px 16px;
    border: 1px solid $line;
    box-shadow: $shadow-sm;
  }

  &__legend {
    flex: 1 1 35%;
    @include flex(column, stretch, space-between, 1.5rem);

    dl {
      @include flex(column, stretch, flex-start, 0);
    }
  }

  &__item {
    padding: 1rem 0;
    border-bottom: 1px solid $line-strong;
    @include transition(opacity);

    &--off {
      opacity: 0.35;
    }

    dt {
      @include flex(row, center, flex-start, 0.7rem);
      font-weight: 600;

      span {
        @include flex(row, center, center);
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 6px;
        background: $surface;
        border: 1px solid $kraft;
        font-family: $font-mono;
        font-size: $text-sm;
        color: $kraft-deep;
      }
    }

    dd {
      font-size: $text-sm;
      color: $ink-soft;
      margin: 0.35rem 0 0 2.5rem;
    }
  }
}
</style>
