/**
 * useGSAP.js
 * GSAP + ScrollTrigger helpers
 */

import { onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function useGSAP() {
  const contexts = []

  /**
   * Create a GSAP context tied to an element
   * Automatically reverts on component unmount
   */
  function createContext(el, fn) {
    const ctx = gsap.context(fn, el)
    contexts.push(ctx)
    return ctx
  }

  /**
   * Scroll-triggered text reveal using SplitType
   */
  function textReveal(el, options = {}) {
    if (!el) return

    const split = new SplitType(el, { types: 'lines,words,chars' })
    const chars = split.chars

    gsap.set(chars, { y: '110%', opacity: 0 })

    const tween = gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: options.duration || 0.8,
      stagger: options.stagger || 0.025,
      ease: options.ease || 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none'
      },
      ...options.tweenProps
    })

    return { split, tween }
  }

  /**
   * Scroll-triggered reveal for a group of elements
   */
  function scrollReveal(elements, options = {}) {
    if (!elements?.length) return

    return gsap.fromTo(
      elements,
      {
        y: options.fromY ?? 60,
        opacity: 0,
        scale: options.fromScale ?? 1
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: options.duration || 0.9,
        stagger: options.stagger || 0.12,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: elements[0],
          start: options.start || 'top 85%',
          toggleActions: 'play none none none',
          ...options.scrollTriggerProps
        }
      }
    )
  }

  /**
   * Pin + horizontal scroll for sections
   */
  function horizontalPin(container, inner, options = {}) {
    return ScrollTrigger.create({
      trigger: container,
      pin: true,
      start: 'top top',
      end: () => `+=${inner.scrollWidth - window.innerWidth}`,
      scrub: options.scrub ?? 1,
      onUpdate: (self) => {
        gsap.set(inner, { x: -(inner.scrollWidth - window.innerWidth) * self.progress })
      },
      ...options.props
    })
  }

  /**
   * Counter animation
   */
  function countUp(el, target, options = {}) {
    const obj = { val: 0 }
    return gsap.to(obj, {
      val: target,
      duration: options.duration || 2,
      ease: options.ease || 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + (options.suffix || '')
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
  }

  // Cleanup on component unmount
  onUnmounted(() => {
    contexts.forEach((ctx) => ctx.revert())
  })

  return {
    gsap,
    ScrollTrigger,
    createContext,
    textReveal,
    scrollReveal,
    horizontalPin,
    countUp
  }
}
