<script setup lang="ts">
import { site } from '@/config/site'
import { processSteps } from '@/config/catalog'
import PageBanner from '@/components/shared/PageBanner.vue'
import PlantSection from '@/components/home/PlantSection.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
</script>

<template>
  <div class="about">
    <PageBanner
      :eyebrow="site.pages.nosotros.eyebrow"
      :title="site.pages.nosotros.title"
      :text="site.pages.nosotros.text"
    />

    <section class="about__story">
      <div class="about__story-inner">
        <div class="about__copy">
          <p class="about__lead">{{ site.about.lead }}</p>
          <p class="about__body">{{ site.about.body }}</p>
          <div class="about__facts">
            <div v-for="fact in site.about.facts" :key="fact.value">
              <strong>{{ fact.value }}</strong>
              <span>{{ fact.label }}</span>
            </div>
          </div>
        </div>
        <figure class="about__photo">
          <img
            src="/images/sacos-paletizados.png"
            alt="Sacos de papel kraft apilados sobre pallets"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section class="about__process">
      <div class="about__process-inner">
        <header class="section-head">
          <p class="section-head__eyebrow">{{ site.process.eyebrow }}</p>
          <h2 class="section-head__title">{{ site.process.title }}</h2>
        </header>
        <div class="about__steps">
          <article v-for="step in processSteps" :key="step.n">
            <span>{{ step.n }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <PlantSection />

    <CtaBand
      eyebrow="Hablemos"
      title="Atención directa de fábrica, sin intermediarios."
      text="Coordina con nuestro equipo comercial la revisión de tu requerimiento o una visita a la planta."
      label="Contactar a Envapel"
    />
  </div>
</template>

<style scoped lang="scss">
.about {
  &__story {
    padding-block: 3.5rem 1rem;
  }

  &__story-inner {
    @include container(1240px);
    @include flex(column, stretch, flex-start, 2.5rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;
    }
  }

  &__copy {
    flex: 1 1 55%;
    @include flex(column, flex-start, flex-start, 1.25rem);
  }

  &__lead {
    font-size: $text-lg;
    font-weight: 500;
    max-width: 58ch;
  }

  &__body {
    color: $ink-soft;
    max-width: 62ch;
  }

  &__facts {
    @include flex-cards(160px, 0);
    width: 100%;
    margin-top: 0.75rem;

    > div {
      @include flex(column, flex-start, flex-start, 0.25rem);
      border-top: 1px solid $line-strong;
      padding: 1rem 1rem 0 0;
    }

    strong {
      font-family: $font-display;
      font-size: $display-sm;
      font-weight: 500;
      line-height: 1;
      color: $forest;
    }

    span {
      font-family: $font-mono;
      font-size: $text-xs;
      color: $ink-muted;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
  }

  &__photo {
    flex: 1 1 45%;

    img {
      width: 100%;
      border-radius: $radius-lg;
      border: 1px solid $line;
    }
  }

  &__process {
    padding-block: $space-section 2rem;
  }

  &__process-inner {
    @include container(1240px);
  }

  &__steps {
    @include flex-cards(240px, 1.25rem);

    article {
      @include card;
      padding: 1.5rem;

      span {
        font-family: $font-mono;
        font-size: $text-xs;
        color: $kraft-deep;
      }

      h3 {
        @include display($text-lg, 600);
        margin-block: 0.6rem 0.45rem;
      }

      p {
        font-size: $text-sm;
        color: $ink-soft;
      }
    }
  }
}
</style>
