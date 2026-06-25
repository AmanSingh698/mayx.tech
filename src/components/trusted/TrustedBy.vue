<template>
  <section class="trusted" id="trusted">
    <div class="container">
      <p class="trusted__label">Trusted by teams at</p>
    </div>

    <div class="trusted__marquee-wrap">
      <!-- Edge blur fades -->
      <div class="trusted__fade trusted__fade--left"></div>
      <div class="trusted__fade trusted__fade--right"></div>

      <div class="trusted__track">
        <!-- Render brands list twice to make it seamless -->
        <div class="trusted__logos">
          <div v-for="(brand, i) in brands" :key="`${brand.name}-${i}`" class="trusted__logo">
            <img
              :src="brand.logo"
              :alt="brand.name"
              loading="lazy"
              width="120"
              height="40"
            />
          </div>
        </div>
        <div class="trusted__logos" aria-hidden="true">
          <div v-for="(brand, i) in brands" :key="`${brand.name}-clone-${i}`" class="trusted__logo">
            <img
              :src="brand.logo"
              :alt="brand.name"
              loading="lazy"
              width="120"
              height="40"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Real brand logos from Simple Icons CDN (white colored)
const brands = [
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google/ffffff' },
  { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft/ffffff' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/ffffff' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonaws/ffffff' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/ffffff' },
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/ffffff' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/ffffff' }
]
</script>

<style lang="scss" scoped>
.trusted {
  padding-block: clamp(24px, 4vw, 40px);
  overflow: hidden;
  position: relative;

  &__label {
    text-align: center;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $text-muted;
    margin: 0 0 clamp(16px, 2.5vw, 28px) 0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }

  &__marquee-wrap {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  &__fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 160px;
    z-index: 2;
    pointer-events: none;

    &--left {
      left: 0;
      background: linear-gradient(to right, $background 0%, transparent 100%);
    }

    &--right {
      right: 0;
      background: linear-gradient(to left, $background 0%, transparent 100%);
    }
  }

  &__track {
    display: flex;
    width: max-content;
    animation: marquee-scroll 32s linear infinite;

    &:hover {
      animation-play-state: paused;
    }
  }

  &__logos {
    display: flex;
    align-items: center;
    gap: 72px;
    padding-right: 72px; /* Matches the gap for perfect spacing between loops */
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    opacity: 0.35;
    transition: opacity $normal $ease, filter $normal $ease;
    filter: grayscale(1);

    &:hover {
      opacity: 0.75;
      filter: grayscale(0);
    }

    img {
      height: 28px;
      width: auto;
      object-fit: contain;
    }
  }
}

@keyframes marquee-scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
