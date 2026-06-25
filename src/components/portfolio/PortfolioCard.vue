<template>
  <div
    class="portfolio-card"
    :style="{ '--card-color': project.color }"
    ref="cardEl"
    @mousemove="onMove"
    @mouseleave="onLeave"
    data-cursor="view"
  >
    <!-- Background Image / Gradient -->
    <div class="portfolio-card__bg" :style="{ backgroundImage: `url(${project.image})` }">
      <div class="portfolio-card__gradient"></div>
    </div>

    <!-- Content -->
    <div class="portfolio-card__content">
      <div class="portfolio-card__meta">
        <span class="portfolio-card__category">{{ project.category }}</span>
        <span class="portfolio-card__year">{{ project.year }}</span>
      </div>

      <h3 class="portfolio-card__title">{{ project.title }}</h3>
      <p class="portfolio-card__desc">{{ project.description }}</p>

      <div class="portfolio-card__stack">
        <span v-for="tech in project.stack" :key="tech" class="portfolio-card__tech">{{ tech }}</span>
      </div>

      <button class="portfolio-card__cta">
        <span>View Project</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Number -->
    <div class="portfolio-card__number">{{ String(index + 1).padStart(2, '0') }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 }
})

const cardEl = ref(null)

function onMove(e) {
  const rect = cardEl.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(cardEl.value, {
    rotateY: x * 6,
    rotateX: -y * 4,
    duration: 0.5,
    ease: 'power2.out',
    transformPerspective: 1200
  })
}

function onLeave() {
  gsap.to(cardEl.value, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
}
</script>

<style lang="scss" scoped>
.portfolio-card {
  position: absolute;
  inset: 0;
  border-radius: $radius-xl;
  overflow: hidden;
  background: $surface-light;
  border: 1px solid $glass-border;
  display: flex;
  align-items: flex-end;
  padding: clamp(28px, 4vw, 48px);
  will-change: transform;
  transform-style: preserve-3d;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);

  &__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.12;
    mix-blend-mode: luminosity;
    transition: opacity $normal $ease, transform $normal $ease;
  }

  &:hover &__bg {
    opacity: 0.22;
    transform: scale(1.04);
  }

  &__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: linear-gradient(to top, rgba(8, 8, 12, 0.95) 0%, transparent 100%);
  }

  &__content {
    position: relative;
    z-index: 2;
    max-width: 560px;
    width: 100%;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  &__category {
    padding: 6px 14px;
    border-radius: $radius-round;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: $text-muted;
    font-family: 'Inter', sans-serif;
  }

  &__year {
    font-size: 13px;
    color: $text-muted;
    font-family: 'Inter', sans-serif;
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: $white;
    margin: 0 0 12px 0;
    line-height: 1.1;
  }

  &__desc {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 24px 0;
    max-width: 420px;
  }

  &__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  &__tech {
    padding: 5px 12px;
    border-radius: $radius-round;
    background: rgba($primary, 0.1);
    border: 1px solid rgba($primary, 0.15);
    font-size: 12px;
    font-weight: 600;
    color: $primary-light;
    font-family: 'Inter', sans-serif;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: $radius-round;
    background: $white;
    color: #050505;
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all $normal $ease;
    font-family: 'Inter', sans-serif;

    &:hover {
      box-shadow: 0 0 30px rgba($primary, 0.4);
    }
  }

  &__number {
    position: absolute;
    top: clamp(24px, 3vw, 40px);
    right: clamp(24px, 3vw, 40px);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: rgba(255, 255, 255, 0.06);
    line-height: 1.1;
    z-index: 1;
    pointer-events: none;
  }
}
</style>
