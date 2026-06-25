<template>
  <div class="scroll-indicator" ref="el">
    <span class="scroll-indicator__text">Scroll</span>
    <div class="scroll-indicator__track">
      <div class="scroll-indicator__line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const el = ref(null)

onMounted(() => {
  gsap.from(el.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 2.5,
    ease: 'power2.out'
  })
})
</script>

<style lang="scss" scoped>
.scroll-indicator {
  position: absolute;
  bottom: clamp(24px, 4vw, 40px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 5;

  &__text {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: $text-muted;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }

  &__track {
    width: 1.5px;
    height: 64px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(180deg, $primary, $accent);
    border-radius: 999px;
    animation: scroll-line 2s ease-in-out infinite;
  }
}
</style>
