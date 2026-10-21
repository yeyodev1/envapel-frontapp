<script setup lang="ts">
import { site } from '@/config/site'
import PageBanner from '@/components/shared/PageBanner.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
</script>

<template>
  <div class="green">
    <PageBanner
      :eyebrow="site.pages.sostenibilidad.eyebrow"
      :title="site.pages.sostenibilidad.title"
      :text="site.pages.sostenibilidad.text"
    />

    <section class="green__hero">
      <div class="green__hero-inner">
        <div class="green__icon" aria-hidden="true"><BaseIcon name="leaf" /></div>
        <h2 class="green__slogan">{{ site.slogan }}</h2>
        <p class="green__lead">{{ site.sustainability.lead }}</p>
      </div>
    </section>

    <section class="green__detail">
      <div class="green__detail-inner">
        <div class="green__copy">
          <p class="section-head__eyebrow">Decisiones responsables</p>
          <h2 class="green__title">El material adecuado, en la cantidad justa.</h2>
          <p v-for="(paragraph, i) in site.sustainability.body" :key="i">{{ paragraph }}</p>
          <RouterLink to="/contacto" class="btn btn--ghost green__btn">
            {{ site.sustainability.cta }} <BaseIcon name="arrow-right" />
          </RouterLink>
        </div>
        <figure class="green__photo">
          <img
            src="/images/bosque.webp"
            alt="Bosque tropical verde"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.green {
  &__hero {
    background: $forest-deep;
    color: $paper;
  }

  &__hero-inner {
    @include container(900px);
    @include flex(column, center, center, 1.25rem);
    text-align: center;
    padding-block: 4.5rem;
  }

  &__icon {
    @include flex(row, center, center);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgba($paper, 0.1);
    color: $kraft-soft;
    font-size: 1.4rem;
  }

  &__slogan {
    @include display(clamp(1.8rem, 1.3rem + 2.2vw, 2.8rem));
  }

  &__lead {
    color: rgba($paper, 0.78);
    max-width: 56ch;
  }

  &__detail {
    padding-block: $space-section;
  }

  &__detail-inner {
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
    @include flex(column, flex-start, flex-start, 1.1rem);

    p:not(.section-head__eyebrow) {
      color: $ink-soft;
      max-width: 60ch;
    }
  }

  &__title {
    @include display(clamp(1.7rem, 1.3rem + 1.8vw, 2.5rem));
  }

  &__btn {
    margin-top: 0.6rem;
  }

  &__photo {
    flex: 1 1 45%;

    img {
      width: 100%;
      border-radius: $radius-lg;
    }
  }
}
</style>
