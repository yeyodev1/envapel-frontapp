<script setup lang="ts">
import { site } from '@/config/site'
import PageBanner from '@/components/shared/PageBanner.vue'
import AnatomySection from '@/components/home/AnatomySection.vue'
import BlueprintSection from '@/components/home/BlueprintSection.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
</script>

<template>
  <div class="features">
    <PageBanner
      :eyebrow="site.pages.caracteristicas.eyebrow"
      :title="site.pages.caracteristicas.title"
      :text="site.pages.caracteristicas.text"
    />

    <AnatomySection />
    <BlueprintSection />
    <FaqSection />

    <CtaBand
      eyebrow="De la necesidad a la especificación"
      title="Comparte producto, peso y sistema de llenado: nosotros hacemos el resto."
      text="Con esa información revisamos formato, dimensiones, capas y requisitos de protección, y te devolvemos un plano claro."
      label="Definir mi saco industrial"
    />
  </div>
</template>
