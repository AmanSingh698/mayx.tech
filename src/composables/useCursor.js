/**
 * useCursor.js
 * Custom cursor state management
 */

import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorX = ref(0)
const cursorY = ref(0)
const cursorMode = ref('default') // 'default' | 'hover' | 'drag' | 'view' | 'open'
const isVisible = ref(false)

export function useCursor() {
  function setCursorMode(mode) {
    cursorMode.value = mode
  }

  function resetCursorMode() {
    cursorMode.value = 'default'
  }

  // Expose to template for data-cursor elements
  function initCursorTargets() {
    const targets = document.querySelectorAll('[data-cursor]')
    targets.forEach((el) => {
      const mode = el.dataset.cursor
      el.addEventListener('mouseenter', () => setCursorMode(mode))
      el.addEventListener('mouseleave', resetCursorMode)
    })
  }

  return {
    cursorX,
    cursorY,
    cursorMode,
    isVisible,
    setCursorMode,
    resetCursorMode,
    initCursorTargets
  }
}
