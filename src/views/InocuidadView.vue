<script setup lang="ts">
import { site } from '@/config/site'
import PageBanner from '@/components/shared/PageBanner.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
</script>

<template>
  <div class="safety">
    <PageBanner
      :eyebrow="site.pages.inocuidad.eyebrow"
      :title="site.pages.inocuidad.title"
      :text="site.pages.inocuidad.text"
    />

    <div class="safety__inner">
      <div class="safety__lead">
        <div class="safety__mark" aria-hidden="true">
          <BaseIcon name="shield" />
          <BaseIcon name="check" class="safety__check" />
        </div>
        <div>
          <h2 class="safety__title">Certificación FSSC 22000 v6, emitida por SGS</h2>
          <p class="safety__text">{{ site.foodSafety.lead }}</p>
          <p class="safety__text">
            En la práctica significa que, cuando tu saco va a tocar harina, azúcar, leche en polvo
            o balanceado, detrás hay procesos auditados: no solo papel de buena calidad, sino una
            fábrica que trabaja con reglas de inocuidad verificadas por un tercero.
          </p>
        </div>
      </div>

      <div class="safety__controls">
        <article v-for="(control, i) in site.foodSafety.controls" :key="control.title">
          <span class="safety__n">0{{ i + 1 }}</span>
          <h3>{{ control.title }}</h3>
          <p>{{ control.text }}</p>
        </article>
      </div>

      <p class="safety__note">{{ site.foodSafety.note }}</p>
    </div>

    <CtaBand
      eyebrow="Documentación"
      title="¿Necesitas el alcance del certificado para tu auditoría?"
      text="Escríbenos y te compartimos el alcance y la documentación de respaldo para tu equipo de calidad."
      label="Consultar alcance y documentación"
    />
  </div>
</template>

<style scoped lang="scss">
.safety {
  &__inner {
    @include container(1240px);
    padding-block: 3.5rem $space-section;
  }

  &__lead {
    @include flex(column, flex-start, flex-start, 1.5rem);
    max-width: 52rem;
    margin-bottom: 3rem;

    @include from('md') {
      flex-direction: row;
      gap: 2rem;
    }
  }

  &__mark {
    position: relative;
    @include flex(row, center, center);
    flex-shrink: 0;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: rgba($forest, 0.08);
    color: $forest;
    font-size: 2rem;
  }

  &__check {
    position: absolute;
    font-size: 0.95rem;
    color: $paper;
    transform: translateY(-1px);
  }

  &__title {
    @include display(clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem));
    margin-bottom: 0.9rem;
  }

  &__text {
    color: $ink-soft;
    max-width: 62ch;

    + .safety__text {
      margin-top: 0.75rem;
    }
  }

  &__controls {
    @include flex-cards(280px, 1.25rem);

    article {
      @include card;
      padding: 1.6rem;

      h3 {
        @include display($text-lg, 600);
        margin-block: 0.6rem 0.5rem;
      }

      p {
        font-size: $text-sm;
        color: $ink-soft;
      }
    }
  }

  &__n {
    font-family: $font-mono;
    font-size: $text-xs;
    color: $kraft-deep;
  }

  &__note {
    font-size: $text-sm;
    color: $ink-muted;
    max-width: 72ch;
    margin-top: 2.25rem;
  }
}
</style>
