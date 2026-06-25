<template>
  <div
    class="cursor"
    :class="[`cursor--${cursorMode}`, { 'cursor--visible': isVisible }]"
    ref="cursorEl"
    aria-hidden="true"
  >
    <div class="cursor__ring" ref="ringEl"></div>
    <div class="cursor__dot" ref="dotEl"></div>
    <div class="cursor__label" ref="labelEl">{{ cursorLabel }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'
import { useCursor } from '@/composables/useCursor'

const { cursorMode, isVisible } = useCursor()

const cursorEl = ref(null)
const ringEl = ref(null)
const dotEl = ref(null)
const labelEl = ref(null)

const pos = { x: 0, y: 0 }
const ringPos = { x: 0, y: 0 }

const cursorLabel = computed(() => {
  const labels = { view: 'View', open: 'Open', drag: 'Drag' }
  return labels[cursorMode.value] || ''
})

let rafId = null

function onMouseMove(e) {
  pos.x = e.clientX
  pos.y = e.clientY

  // Dot follows cursor instantly
  gsap.set(dotEl.value, {
    x: pos.x,
    y: pos.y
  })

  isVisible.value = true
}

function onMouseLeave() {
  isVisible.value = false
}

function animate() {
  // Ring lerps toward cursor
  ringPos.x += (pos.x - ringPos.x) * 0.1
  ringPos.y += (pos.y - ringPos.y) * 0.1

  gsap.set(ringEl.value, {
    x: ringPos.x,
    y: ringPos.y
  })

  if (labelEl.value) {
    gsap.set(labelEl.value, {
      x: pos.x + 20,
      y: pos.y - 10
    })
  }

  rafId = requestAnimationFrame(animate)
}

// Scale ring on hover mode
watch(cursorMode, (mode) => {
  const ring = ringEl.value
  if (!ring) return

  if (mode === 'hover') {
    gsap.to(ring, { scale: 2.2, duration: 0.3, ease: 'power2.out' })
  } else if (mode === 'drag') {
    gsap.to(ring, { scale: 3, duration: 0.3, ease: 'power2.out' })
  } else {
    gsap.to(ring, { scale: 1, duration: 0.4, ease: 'power3.out' })
  }
})

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseleave', onMouseLeave)
  animate()

  // Apply hover cursor mode to all interactive elements
  const interactives = document.querySelectorAll('a, button, [data-cursor]')
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!el.dataset.cursor) cursorMode.value = 'hover'
      else cursorMode.value = el.dataset.cursor
    })
    el.addEventListener('mouseleave', () => {
      cursorMode.value = 'default'
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
  cancelAnimationFrame(rafId)
})
</script>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: $z-cursor;
  opacity: 0;
  transition: opacity 0.3s;

  @media (hover: none) {
    display: none;
  }

  &--visible {
    opacity: 1;
  }

  &__ring {
    position: fixed;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    will-change: transform;
    mix-blend-mode: difference;
    transition: border-color 0.3s;
  }

  &__dot {
    position: fixed;
    top: -4px;
    left: -4px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    will-change: transform;
    mix-blend-mode: difference;
  }

  &__label {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: white;
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
    pointer-events: none;
    font-family: 'Inter', sans-serif;
  }

  // Hover state
  &--hover &__ring {
    border-color: rgba($primary, 0.6);
  }

  // Drag state
  &--drag &__ring {
    border-color: rgba($accent, 0.6);
    background: rgba($accent, 0.05);
  }

  // View / Open state
  &--view &__label,
  &--open &__label,
  &--drag &__label {
    opacity: 1;
  }

  &--view &__ring,
  &--open &__ring {
    border-color: rgba($secondary, 0.6);
    background: rgba($secondary, 0.05);
  }
}
</style>
