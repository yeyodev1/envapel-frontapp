<script setup lang="ts">
// El inicio presenta y deriva: el detalle vive en las páginas de cada sección
// (productos, aplicaciones, características, inocuidad, nosotros, contacto).
import HeroSection from '@/components/home/HeroSection.vue'
import ProductsSection from '@/components/home/ProductsSection.vue'
import CertSection from '@/components/home/CertSection.vue'
import IndustriesSection from '@/components/home/IndustriesSection.vue'
import CtaBand from '@/components/shared/CtaBand.vue'
</script>

<template>
  <div class="home">
    <HeroSection />
    <ProductsSection />
    <CertSection />
    <IndustriesSection />
    <CtaBand
      eyebrow="Hablemos de tu próximo empaque"
      title="Tu producto, nuestra especialidad."
      text="Comparte los requisitos de tu operación y te ayudamos a definir la estructura y presentación del saco."
      label="Solicitar cotización"
    />
  </div>
</template>
