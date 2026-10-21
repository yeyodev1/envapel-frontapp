<script setup lang="ts">
import { site, whatsappLink } from '@/config/site'
import PageBanner from '@/components/shared/PageBanner.vue'
import QuoteSection from '@/components/home/QuoteSection.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`
</script>

<template>
  <div class="contact">
    <PageBanner
      :eyebrow="site.pages.contacto.eyebrow"
      :title="site.pages.contacto.title"
      :text="site.pages.contacto.text"
    />

    <section class="contact__cards" id="ubicaciones">
      <div class="contact__cards-inner">
        <article class="contact__card">
          <h2><BaseIcon name="industry" /> Planta de producción</h2>
          <p class="contact__strong">{{ site.address.plant }}</p>
          <p>Fabricación y despachos a todo el Ecuador.</p>
          <a :href="mapsUrl" target="_blank" rel="noopener noreferrer">
            Abrir en Google Maps <BaseIcon name="arrow-up-right-from-square" />
          </a>
        </article>

        <article class="contact__card">
          <h2><BaseIcon name="building" /> Oficina comercial</h2>
          <p class="contact__strong">{{ site.address.office }}</p>
          <p>Atención directa del equipo comercial.</p>
        </article>

        <article class="contact__card contact__card--dark">
          <h2><BaseIcon name="envelope" /> Escríbenos</h2>
          <a class="contact__strong" :href="`mailto:${site.email}`">{{ site.email }}</a>
          <a
            class="contact__strong"
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
          >
            <BaseIcon name="whatsapp" /> {{ site.phoneDisplay }}
          </a>
          <p>Respondemos en horario laboral, de lunes a viernes.</p>
        </article>
      </div>
    </section>

    <QuoteSection />
  </div>
</template>

<style scoped lang="scss">
.contact {
  &__cards {
    padding-block: 3rem 0;
  }

  &__cards-inner {
    @include container(1240px);
    @include flex-cards(280px, 1.25rem);
  }

  &__card {
    @include card;
    @include flex(column, flex-start, flex-start, 0.65rem);
    padding: 1.75rem;

    h2 {
      @include eyebrow;
      @include flex(row, center, flex-start, 0.5rem);

      .icon {
        width: 1rem;
        color: $kraft-deep;
      }
    }

    p {
      font-size: $text-sm;
      color: $ink-soft;
    }

    > a:not(.contact__strong) {
      @include flex(row, center, flex-start, 0.4rem);
      font-size: $text-sm;
      font-weight: 600;
      color: $forest;

      .icon {
        font-size: 0.7rem;
      }
    }

    &--dark {
      background: $forest;
      border-color: $forest;
      color: $paper;

      h2 {
        color: $kraft-soft;

        .icon {
          color: $kraft-soft;
        }
      }

      p {
        color: rgba($paper, 0.7);
      }

      a.contact__strong {
        color: $paper;

        &:hover {
          color: $kraft-soft;
        }
      }
    }
  }

  &__strong {
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: 500;

    .icon {
      width: 1.1rem;
      margin-right: 0.3rem;
    }
  }
}
</style>
