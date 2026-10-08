<script setup lang="ts">
// Ilustración del saco valvulado con la esquina "pelada" para mostrar las hojas.
// Hace de foto de producto mientras llegan las fotos reales de planta.
</script>

<template>
  <svg class="sack" viewBox="0 0 440 540" role="img" aria-labelledby="sack-title">
    <title id="sack-title">
      Saco de papel multicapa Envapel con válvula y hojas de papel kraft
    </title>
    <defs>
      <linearGradient id="kraft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#9b7a60" />
        <stop offset="0.18" stop-color="#b9977b" />
        <stop offset="0.55" stop-color="#c4a386" />
        <stop offset="0.85" stop-color="#ad8b70" />
        <stop offset="1" stop-color="#8f6f56" />
      </linearGradient>
      <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#06301f" />
        <stop offset="0.5" stop-color="#0b4a33" />
        <stop offset="1" stop-color="#06301f" />
      </linearGradient>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <pattern id="fiber" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 6 L6 0" stroke="#000" stroke-opacity="0.035" stroke-width="1" />
      </pattern>
    </defs>

    <!-- sombra -->
    <ellipse cx="220" cy="505" rx="150" ry="18" fill="#3b2c1f" opacity="0.22" filter="url(#soft)" />

    <!-- cuerpo -->
    <g class="sack__body">
      <path
        d="M92 70 Q90 52 108 50 L332 50 Q350 52 348 70 L356 470 Q357 488 338 490 L102 490 Q83 488 84 470 Z"
        fill="url(#kraft)"
      />
      <path
        d="M92 70 Q90 52 108 50 L332 50 Q350 52 348 70 L356 470 Q357 488 338 490 L102 490 Q83 488 84 470 Z"
        fill="url(#fiber)"
      />
      <!-- fondos pegados (arriba y abajo) -->
      <path d="M96 58 L344 58 L340 92 L100 92 Z" fill="#000" opacity="0.07" />
      <path d="M88 452 L352 452 L355 484 L85 484 Z" fill="#000" opacity="0.08" />
      <line x1="100" y1="92" x2="340" y2="92" stroke="#6e5340" stroke-opacity="0.35" />
      <line x1="88" y1="452" x2="352" y2="452" stroke="#6e5340" stroke-opacity="0.35" />

      <!-- válvula -->
      <path d="M100 58 L150 58 L146 92 L100 92 Z" fill="#8a6a52" />
      <path d="M104 64 L144 64 L141 86 L104 86 Z" fill="#6e5340" />

      <!-- franja impresa -->
      <rect x="88" y="196" width="264" height="150" fill="url(#band)" />
      <image href="/favicon.svg" x="186" y="212" width="68" height="46" />
      <text x="220" y="292" text-anchor="middle" class="sack__brand">Envapel</text>
      <text x="220" y="318" text-anchor="middle" class="sack__meta">SACO MULTICAPA · 50 KG</text>
      <rect x="88" y="190" width="264" height="3" fill="#a6846b" />
      <rect x="88" y="349" width="264" height="3" fill="#a6846b" />

      <!-- lote y código -->
      <rect x="118" y="392" width="92" height="30" rx="3" fill="#fffdf9" opacity="0.8" />
      <g fill="#22201c" opacity="0.75">
        <rect x="124" y="397" width="2" height="20" />
        <rect x="129" y="397" width="1" height="20" />
        <rect x="132" y="397" width="3" height="20" />
        <rect x="138" y="397" width="1" height="20" />
        <rect x="141" y="397" width="2" height="20" />
        <rect x="146" y="397" width="3" height="20" />
        <rect x="151" y="397" width="1" height="20" />
        <rect x="154" y="397" width="2" height="20" />
        <rect x="159" y="397" width="1" height="20" />
        <rect x="162" y="397" width="3" height="20" />
        <rect x="168" y="397" width="2" height="20" />
        <rect x="173" y="397" width="1" height="20" />
        <rect x="176" y="397" width="3" height="20" />
        <rect x="182" y="397" width="1" height="20" />
        <rect x="185" y="397" width="2" height="20" />
        <rect x="190" y="397" width="1" height="20" />
        <rect x="193" y="397" width="3" height="20" />
        <rect x="199" y="397" width="2" height="20" />
      </g>
      <text x="232" y="412" class="sack__lot">LOTE 2610-A</text>
    </g>

    <!-- esquina pelada con las hojas -->
    <g class="sack__peel">
      <path d="M348 110 L348 70 Q350 52 332 50 L296 50 Z" fill="#e7d7c2" />
      <path d="M352 132 L349 92 L330 50 L290 50 Z" fill="#7a9c8a" opacity="0.9" />
      <path d="M356 156 L350 110 L322 50 L282 50 Z" fill="#a6846b" />
      <path d="M362 182 L352 128 L312 50 L272 50 Z" fill="#b9977b" />
      <path d="M368 206 L356 150 L300 50 L262 50 Q300 120 368 206 Z" fill="#d4b496" />
    </g>

    <!-- cotas -->
    <g class="sack__callouts">
      <line x1="372" y1="170" x2="404" y2="150" />
      <circle cx="372" cy="170" r="3" />
      <text x="410" y="146">4 hojas</text>
      <line x1="122" y1="74" x2="60" y2="30" />
      <circle cx="122" cy="74" r="3" />
      <text x="20" y="22">Válvula</text>
    </g>
  </svg>
</template>

<style scoped lang="scss">
.sack {
  width: 100%;
  height: auto;
  overflow: visible;

  &__brand {
    font-family: $font-display;
    font-size: 30px;
    font-weight: 600;
    fill: $paper;
    letter-spacing: -0.5px;
  }

  &__meta {
    font-family: $font-mono;
    font-size: 10.5px;
    letter-spacing: 2px;
    fill: $kraft-soft;
  }

  &__lot {
    font-family: $font-mono;
    font-size: 10px;
    fill: #4d3b2c;
    opacity: 0.8;
  }

  &__peel {
    filter: drop-shadow(-6px 6px 8px rgba(#3b2c1f, 0.25));
  }

  &__callouts {
    line {
      stroke: $ink;
      stroke-width: 1;
      stroke-dasharray: 3 3;
    }

    circle {
      fill: $forest;
    }

    text {
      font-family: $font-mono;
      font-size: 12px;
      fill: $ink;
    }
  }
}
</style>
