<template>
  <div class="testimonial-card" ref="cardEl" @mousemove="onMove" @mouseleave="onLeave">
    <!-- Rating -->
    <div class="testimonial-card__rating">
      <span v-for="n in 5" :key="n" class="testimonial-card__star">★</span>
    </div>

    <!-- Quote -->
    <blockquote class="testimonial-card__quote">
      "{{ testimonial.quote }}"
    </blockquote>

    <!-- Author -->
    <div class="testimonial-card__author">
      <div class="testimonial-card__avatar">
        {{ testimonial.name[0] }}
      </div>
      <div class="testimonial-card__info">
        <div class="testimonial-card__name">{{ testimonial.name }}</div>
        <div class="testimonial-card__role">{{ testimonial.role }}, {{ testimonial.company }}</div>
      </div>
    </div>

    <!-- Glow -->
    <div class="testimonial-card__glow"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

defineProps({ testimonial: { type: Object, required: true } })

const cardEl = ref(null)

function onMove(e) {
  const rect = cardEl.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  gsap.to(cardEl.value, {
    rotateY: x * 10,
    rotateX: -y * 7,
    duration: 0.4,
    ease: 'power2.out',
    transformPerspective: 1000
  })
}

function onLeave() {
  gsap.to(cardEl.value, {
    rotateY: 0,
    rotateX: 0,
    duration: 0.7,
    ease: 'power3.out'
  })
}
</script>

<style lang="scss" scoped>
.testimonial-card {
  background: $surface;
  border: 1px solid $glass-border;
  border-radius: $radius-lg;
  padding: clamp(28px, 3.5vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: border-color $normal $ease, box-shadow $normal $ease;

  &:hover {
    border-color: rgba($primary, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  &__rating {
    display: flex;
    gap: 4px;
    font-size: 16px;
    color: #FFDE17;
    letter-spacing: 2px;
  }

  &__quote {
    font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
    line-height: 1.7;
    color: $text-light;
    margin: 0;
    font-style: normal;
    font-family: 'Inter', sans-serif;

    &::before {
      content: '';
      display: block;
      width: 32px;
      height: 2px;
      background: $gradient-primary;
      border-radius: 999px;
      margin-bottom: 16px;
    }
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: auto;
  }

  &__avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7d722e 0%, #FFDE17 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    color: #000000;
    flex-shrink: 0;
    font-family: 'Space Grotesk', sans-serif;
  }

  &__name {
    font-size: 15px;
    font-weight: 700;
    color: $white;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.01em;
  }

  &__role {
    font-size: 13px;
    color: $text-muted;
    font-family: 'Inter', sans-serif;
  }

  &__glow {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary, 0.08) 0%, transparent 70%);
    pointer-events: none;
    animation: float-sm 5s ease-in-out infinite;
  }
}
</style>
