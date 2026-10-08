<script setup lang="ts">
import { ref } from 'vue'
import { site, whatsappLink } from '@/config/site'
import { industries } from '@/config/catalog'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<template>
  <section id="industrias" ref="root" class="industries">
    <div class="industries__inner">
      <header class="section-head" data-reveal>
        <p class="section-head__eyebrow">{{ site.industries.eyebrow }}</p>
        <h2 class="section-head__title">{{ site.industries.title }}</h2>
      </header>

      <ul class="industries__list">
        <li v-for="item in industries" :key="item.name" data-reveal>
          <a
            class="industry"
            :href="whatsappLink(`Hola Envapel, necesito sacos para ${item.name.toLowerCase()}.`)"
            target="_blank"
            rel="noopener"
          >
            <span class="industry__icon"><i :class="item.icon"></i></span>
            <span class="industry__body">
              <span class="industry__name">{{ item.name }}</span>
              <span class="industry__text">{{ item.text }}</span>
            </span>
            <i class="fa-solid fa-arrow-up-right industry__arrow"></i>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.industries {
  padding-block: $space-section;

  &__inner {
    @include container(1240px);
  }

  &__list {
    list-style: none;
    @include flex-cards(340px, 0);
    border-top: 1px solid $line-strong;

    > li {
      border-bottom: 1px solid $line-strong;
    }
  }
}

.industry {
  @include flex(row, flex-start, flex-start, 1.1rem);
  padding: 1.6rem 1rem 1.6rem 0;
  height: 100%;
  @include transition(background-color, padding);

  &:hover {
    background: $surface;
    padding-left: 1rem;
  }

  &__icon {
    @include flex(row, center, center);
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: $accent-soft;
    color: $forest;
    font-size: 1.15rem;
  }

  &__body {
    @include flex(column, flex-start, flex-start, 0.3rem);
    flex: 1;
  }

  &__name {
    @include display($text-xl, 500);
  }

  &__text {
    font-size: $text-sm;
    color: $ink-soft;
  }

  &__arrow {
    color: $kraft;
    margin-top: 0.4rem;
    @include transition(transform, color);
  }

  &:hover &__arrow {
    color: $forest;
    transform: translate(3px, -3px);
  }
}
</style>
