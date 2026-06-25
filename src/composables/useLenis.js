/**
 * useLenis.js
 * Singleton Lenis smooth scroll instance
 * Integrates with GSAP ticker for ScrollTrigger compatibility
 */

import { ref, onUnmounted } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Singleton instance
let lenisInstance = null

export function useLenis() {
  const lenis = ref(null)

  function init() {
    if (lenisInstance) {
      lenis.value = lenisInstance
      return lenisInstance
    }

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    })

    // Integrate with GSAP ticker for ScrollTrigger compatibility
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    lenis.value = lenisInstance
    return lenisInstance
  }

  function destroy() {
    if (lenisInstance) {
      lenisInstance.destroy()
      lenisInstance = null
      lenis.value = null
    }
  }

  function scrollTo(target, options = {}) {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        offset: -100,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
      })
    }
  }

  function stop() {
    lenisInstance?.stop()
  }

  function start() {
    lenisInstance?.start()
  }

  return {
    lenis,
    init,
    destroy,
    scrollTo,
    stop,
    start
  }
}
