<template>
  <div class="service-card" ref="cardEl" @mousemove="onMove" @mouseleave="onLeave">
    <div class="service-card__inner" ref="innerEl">
      <!-- Icon -->
      <div class="service-card__icon">
        <span v-html="service.icon"></span>
      </div>

      <!-- Content -->
      <div class="service-card__content">
        <h3 class="service-card__title">{{ service.title }}</h3>
        <p class="service-card__desc">{{ service.description }}</p>
      </div>

      <!-- Footer -->
      <div class="service-card__footer">
        <div class="service-card__tags">
          <span v-for="tag in service.tags" :key="tag" class="service-card__tag">{{ tag }}</span>
        </div>
        <div class="service-card__arrow">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Glow -->
      <div class="service-card__glow" ref="glowEl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  service: { type: Object, required: true }
})

const cardEl = ref(null)
const innerEl = ref(null)
const glowEl = ref(null)

function onMove(e) {
  const card = cardEl.value
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotY = ((x - centerX) / centerX) * 12
  const rotX = -((y - centerY) / centerY) * 8

  gsap.to(innerEl.value, {
    rotateY: rotY,
    rotateX: rotX,
    duration: 0.4,
    ease: 'power2.out',
    transformPerspective: 800
  })

  // Move glow to cursor position
  gsap.to(glowEl.value, {
    left: x,
    top: y,
    opacity: 1,
    duration: 0.3,
    ease: 'none'
  })
}

function onLeave() {
  gsap.to(innerEl.value, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.6,
    ease: 'power3.out'
  })
  gsap.to(glowEl.value, {
    opacity: 0,
    duration: 0.4
  })
}
</script>

<style lang="scss" scoped>
.service-card {
  perspective: 1200px;
  height: 100%;
  cursor: default;

  &__inner {
    position: relative;
    background: $surface;
    border: 1px solid $glass-border;
    border-radius: $radius-lg;
    padding: clamp(28px, 4vw, 40px);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
    transition: border-color $normal $ease, box-shadow $normal $ease;
    transform-style: preserve-3d;
    will-change: transform;

    &:hover {
      border-color: rgba($primary, 0.25);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba($primary, 0.1);
    }
  }

  &__glow {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary, 0.2) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    will-change: left, top, opacity;
  }

  &__icon {
    width: 52px;
    height: 52px;
    border-radius: $radius-md;
    background: rgba($primary, 0.1);
    border: 1px solid rgba($primary, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  &__content {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.125rem, 2vw, 1.375rem);
    font-weight: 700;
    color: $white;
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.7;
    color: $text-muted;
    margin: 0;
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__tag {
    padding: 4px 10px;
    border-radius: $radius-round;
    background: rgba($primary, 0.08);
    border: 1px solid rgba($primary, 0.12);
    font-size: 11px;
    font-weight: 600;
    color: rgba($primary-light, 0.8);
    letter-spacing: 0.5px;
    font-family: 'Inter', sans-serif;
  }

  &__arrow {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $glass-border;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    flex-shrink: 0;
    transition: all $normal $ease;
  }

  &__inner:hover &__arrow {
    background: $primary;
    border-color: $primary;
    color: $white;
    transform: rotate(-45deg);
  }
}
</style>
