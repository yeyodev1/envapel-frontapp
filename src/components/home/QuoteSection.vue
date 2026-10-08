<script setup lang="ts">
import { ref } from 'vue'
import { site, whatsappLink } from '@/config/site'
import { products } from '@/config/catalog'
import { monthlyOptions, printOptions, useQuote } from '@/composables/useQuote'
import { useReveal } from '@/composables/useReveal'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const root = ref<HTMLElement | null>(null)
useReveal(root)

const { form, canSend, previewHtml, send } = useQuote()
</script>

<template>
  <section id="cotizar" ref="root" class="quote">
    <div class="quote__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.quote.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.quote.title }}</h2>
        <p class="section-head__text">{{ site.quote.text }}</p>
      </header>

      <div class="quote__body">
        <form class="quote__form" data-reveal @submit.prevent="send">
          <div class="quote__row">
            <div class="field">
              <label for="q-name">Nombre *</label>
              <input id="q-name" v-model="form.name" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="q-company">Empresa</label>
              <input id="q-company" v-model="form.company" autocomplete="organization" />
            </div>
          </div>
          <div class="quote__row">
            <div class="field">
              <label for="q-product">¿Qué vas a envasar? *</label>
              <input
                id="q-product"
                v-model="form.product"
                placeholder="Ej: fertilizante granulado"
                required
              />
            </div>
            <div class="field">
              <label for="q-city">Ciudad</label>
              <input id="q-city" v-model="form.city" autocomplete="address-level2" />
            </div>
          </div>
          <div class="quote__row">
            <div class="field">
              <label for="q-sack">Tipo de saco</label>
              <select id="q-sack" v-model="form.sack">
                <option v-for="p in products" :key="p.slug">{{ p.name }}</option>
                <option>No estoy seguro, necesito asesoría</option>
              </select>
            </div>
            <div class="field field--short">
              <label for="q-weight">Peso por saco (kg)</label>
              <input id="q-weight" v-model="form.weight" inputmode="decimal" placeholder="25" />
            </div>
          </div>
          <div class="quote__row">
            <div class="field">
              <label for="q-monthly">Sacos al mes</label>
              <select id="q-monthly" v-model="form.monthly">
                <option value="">Selecciona</option>
                <option v-for="o in monthlyOptions" :key="o">{{ o }}</option>
              </select>
            </div>
            <div class="field">
              <label for="q-print">¿Impreso?</label>
              <select id="q-print" v-model="form.printed">
                <option v-for="o in printOptions" :key="o">{{ o }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="q-notes">Medidas o detalles</label>
            <textarea
              id="q-notes"
              v-model="form.notes"
              rows="3"
              placeholder="Ancho x largo x fuelle, barrera, colores…"
            ></textarea>
          </div>
          <button type="submit" class="btn btn--whatsapp quote__submit" :disabled="!canSend">
            <BaseIcon name="whatsapp" /> {{ site.quote.submit }}
          </button>
        </form>

        <aside class="quote__side" data-reveal>
          <div class="chat">
            <div class="chat__head">
              <img src="/favicon.svg" alt="" width="36" height="24" />
              <div>
                <strong>Envapel · Ventas</strong>
                <span>Vista previa de tu mensaje</span>
              </div>
            </div>
            <div class="chat__wall">
              <p class="chat__bubble" v-html="previewHtml"></p>
            </div>
          </div>
          <ul class="quote__contact">
            <li>
              <BaseIcon name="whatsapp" />
              <a :href="whatsappLink()" target="_blank" rel="noopener">{{ site.phoneDisplay }}</a>
            </li>
            <li><BaseIcon name="industry" /> {{ site.address.plant }}</li>
            <li><BaseIcon name="building" /> {{ site.address.office }}</li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.quote {
  padding-block: $space-section;
  background: $sand;

  &__inner {
    @include container(1240px);
  }

  &__body {
    @include flex(column, stretch, flex-start, 2rem);

    @include from('lg') {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
    }
  }

  &__form {
    flex: 1 1 58%;
    @include flex(column, stretch, flex-start, 1rem);
    padding: 1.5rem;
    background: $surface;
    border-radius: $radius-lg;
    border: 1px solid $line;
    box-shadow: $shadow-sm;

    @include from('md') {
      padding: 2.25rem;
    }
  }

  &__row {
    @include flex(column, stretch, flex-start, 1rem);

    @include from('sm') {
      flex-direction: row;
    }
  }

  &__submit {
    margin-top: 0.5rem;
    padding: 1rem;
    font-size: $text-base;
  }

  &__side {
    flex: 1 1 42%;
    @include flex(column, stretch, flex-start, 1.5rem);

    @include from('lg') {
      position: sticky;
      top: 6rem;
    }
  }

  &__contact {
    list-style: none;
    @include flex(column, flex-start, flex-start, 0.7rem);
    font-size: $text-sm;
    color: $ink-soft;

    .icon {
      width: 1.4rem;
      color: $forest;
    }

    a {
      font-weight: 600;
      color: $ink;
    }
  }
}

.field {
  flex: 1;
  min-width: 0;

  &--short {
    @include from('sm') {
      flex: 0 0 9.5rem;
    }
  }

  textarea {
    resize: vertical;
  }
}

.chat {
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-md;
  border: 1px solid $line;

  &__head {
    @include flex(row, center, flex-start, 0.75rem);
    padding: 0.9rem 1.1rem;
    background: $forest;
    color: $paper;

    img {
      width: 2.25rem;
      padding: 0.25rem;
      background: $paper;
      border-radius: 50%;
      height: 2.25rem;
      object-fit: contain;
    }

    strong {
      display: block;
      font-size: $text-sm;
    }

    span {
      font-size: $text-xs;
      opacity: 0.7;
    }
  }

  &__wall {
    padding: 1.25rem;
    min-height: 14rem;
    background-color: #ece3d6;
    background-image: radial-gradient(rgba($kraft-deep, 0.12) 1px, transparent 1px);
    background-size: 14px 14px;
    @include flex(column, flex-end, flex-end);
  }

  &__bubble {
    max-width: 92%;
    padding: 0.8rem 0.95rem;
    border-radius: 12px 12px 2px 12px;
    background: #d9f6c9;
    font-size: $text-sm;
    line-height: 1.5;
    white-space: pre-line;
    box-shadow: 0 1px 1px rgba(#000, 0.08);
    color: $ink;
  }
}
</style>
