<template>
  <div class="hero-content" ref="contentEl">
    <!-- Badge -->
    <div class="eyebrow" ref="eyebrowEl">
      <span class="eyebrow__dot"></span>
      <span class="eyebrow__text">AI &bull; SOFTWARE &bull; AUTOMATION</span>
    </div>

    <!-- Heading -->
    <h1 class="hero-heading" ref="headingEl">
      <span class="line">Engineering</span>
      <span class="line">Digital</span>
      <span class="line gradient-text">Experiences.</span>
    </h1>

    <!-- Description -->
    <p class="hero-desc" ref="descEl">
      We build AI products, SaaS platforms, automation systems<br />
      and modern web experiences that move at the speed of ambition.
    </p>

    <!-- Buttons -->
    <div class="hero-btns" ref="btnsEl">
      <button class="btn-primary" ref="btn1" data-magnetic>
        <span>Start Project</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button class="btn-ghost" ref="btn2" data-magnetic>
        <span>View Work</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import SplitType from 'split-type'

const contentEl = ref(null)
const eyebrowEl = ref(null)
const headingEl = ref(null)
const descEl = ref(null)
const btnsEl = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.1 })

  // Split heading into lines
  const split = new SplitType(headingEl.value, { types: 'lines' })

  // Initial states
  gsap.set(eyebrowEl.value, { opacity: 0, y: 30 })
  gsap.set(split.lines, { y: '110%', opacity: 0 })
  gsap.set(descEl.value, { opacity: 0, y: 40 })
  gsap.set(btnsEl.value, { opacity: 0, y: 30 })

  tl
    .to(eyebrowEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to(
      split.lines,
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out' },
      '-=0.5'
    )
    .to(descEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to(btnsEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
})
</script>

<style lang="scss" scoped>
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 780px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: $radius-round;
  border: 1px solid $glass-border;
  background: $glass-bg;
  margin-bottom: clamp(20px, 3vw, 32px);

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $accent;
    box-shadow: 0 0 14px $accent;
    animation: pulse-dot 2s infinite;
    flex-shrink: 0;
  }

  &__text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: $text-muted;
    font-family: 'Inter', sans-serif;
  }
}

.hero-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 8vw, 8rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: $white;
  margin: 0 0 clamp(20px, 3vw, 36px) 0;
  overflow: hidden;

  .line {
    display: block;
    overflow: hidden;
  }
}

.hero-desc {
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.75;
  color: $text-muted;
  margin: 0 0 clamp(36px, 5vw, 52px) 0;
  max-width: 580px;
}

.hero-btns {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  border-radius: $radius-round;
  background: $white;
  color: #050505;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow $normal $ease, color $normal $ease;
  font-family: 'Inter', sans-serif;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: $gradient-primary;
    opacity: 0;
    transition: opacity $normal $ease;
    border-radius: inherit;
  }

  span, svg {
    position: relative;
    z-index: 1;
  }

  &:hover {
    color: $white;
    box-shadow: 0 0 50px rgba($primary, 0.45);

    &::before { opacity: 1; }
  }
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  border-radius: $radius-round;
  background: transparent;
  color: $white;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid $glass-border;
  cursor: pointer;
  transition: all $normal $ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: $glass-bg;
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 30px rgba($primary, 0.15);
  }
}
</style>
