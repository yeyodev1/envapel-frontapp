<script setup lang="ts">
import { formatComparison } from '@/config/catalog'
</script>

<template>
  <section id="comparativa" class="compare">
    <header class="section-head">
      <p class="section-head__eyebrow">Selección del formato</p>
      <h2 class="section-head__title">{{ formatComparison.title }}</h2>
      <p class="section-head__text">{{ formatComparison.text }}</p>
    </header>

    <div class="compare__scroll" role="region" aria-label="Comparación de formatos de saco" tabindex="0">
      <table>
        <caption class="visually-hidden">Comparativa de sacos de papel multicapa</caption>
        <thead>
          <tr>
            <th scope="col">Criterio</th>
            <th scope="col">Boca abierta</th>
            <th scope="col">Valvulado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in formatComparison.criteria" :key="row.label">
            <th scope="row">{{ row.label }}</th>
            <td>{{ row.open }}</td>
            <td>{{ row.valve }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped lang="scss">
.compare {
  padding-block: 3.5rem 1rem;
  scroll-margin-top: 5.5rem;

  &__scroll {
    overflow-x: auto;
    border: 1px solid $line-strong;
    border-radius: $radius-lg;
    background: $surface;
  }

  table {
    width: 100%;
    min-width: 38rem;
    border-collapse: collapse;
    font-size: $text-sm;
  }

  th,
  td {
    text-align: left;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid $line;
  }

  thead th {
    @include eyebrow;
    background: $sand;
  }

  tbody th {
    font-family: $font-mono;
    font-size: $text-xs;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $ink-muted;
    font-weight: 500;
  }

  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: none;
  }

  td {
    color: $ink-soft;
  }
}
</style>
