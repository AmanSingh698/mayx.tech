/**
 * useMagnetic.js
 * Magnetic button effect composable
 * Pass an element ref and it will apply the magnetic attraction on mousemove
 */

import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useMagnetic(elRef, options = {}) {
  const {
    strength = 0.4,
    ease = 'power3.out',
    duration = 0.4,
    returnDuration = 0.7,
    returnEase = 'elastic.out(1, 0.4)'
  } = options

  function onMouseMove(e) {
    const el = elRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength

    gsap.to(el, {
      x: distX,
      y: distY,
      duration,
      ease
    })
  }

  function onMouseLeave() {
    const el = elRef.value
    if (!el) return

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: returnDuration,
      ease: returnEase
    })
  }

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    const el = elRef.value
    if (!el) return
    el.removeEventListener('mousemove', onMouseMove)
    el.removeEventListener('mouseleave', onMouseLeave)
  })
}
