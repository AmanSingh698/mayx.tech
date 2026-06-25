<template>
  <Transition name="loader-wipe" @after-leave="onLoaderDone">
    <div v-if="visible" class="loader" ref="loaderEl">
      <div class="loader__bg"></div>

      <div class="loader__content">
        <div class="loader__logo" ref="logoEl">
          <span v-for="(char, i) in 'MAYX'" :key="i" class="loader__char" :ref="el => chars[i] = el">
            {{ char }}
          </span>
        </div>
        <p class="loader__tagline" ref="taglineEl">Engineering Digital Experiences</p>
      </div>

      <div class="loader__bottom">
        <div class="loader__bar-track">
          <div class="loader__bar" ref="barEl"></div>
        </div>
        <span class="loader__count" ref="countEl">0</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['done'])

const visible = ref(true)
const loaderEl = ref(null)
const logoEl = ref(null)
const taglineEl = ref(null)
const barEl = ref(null)
const countEl = ref(null)
const chars = reactive([])

function onLoaderDone() {
  emit('done')
}

onMounted(() => {
  const tl = gsap.timeline()

  // Set initial states
  gsap.set(chars, { y: '120%', opacity: 0 })
  gsap.set(taglineEl.value, { opacity: 0, y: 20 })
  gsap.set(barEl.value, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set(countEl.value, { opacity: 0 })

  tl
    // Chars stagger in
    .to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power4.out',
      delay: 0.2
    })
    // Tagline
    .to(taglineEl.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    // Counter and bar
    .to(countEl.value, { opacity: 1, duration: 0.3 }, '-=0.3')
    .to(
      barEl.value,
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: function () {
          const progress = Math.round(this.progress() * 100)
          if (countEl.value) countEl.value.textContent = progress
        }
      },
      '-=0.2'
    )
    // Chars exit
    .to(chars, {
      y: '-120%',
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.in'
    }, '+=0.2')
    .to(taglineEl.value, { opacity: 0, duration: 0.3 }, '<')
    .to(countEl.value, { opacity: 0, duration: 0.3 }, '<')
    // Wipe out
    .to(loaderEl.value, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        visible.value = false
      }
    })
})
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: $z-loader;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $background;
  clip-path: inset(0 0 0% 0);
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba($primary, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  &__content {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  &__logo {
    display: flex;
    gap: 0.08em;
    overflow: hidden;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(4rem, 12vw, 9rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: $white;
    line-height: 1;
    margin-bottom: 16px;
  }

  &__char {
    display: inline-block;
    will-change: transform, opacity;
  }

  &__tagline {
    font-size: clamp(0.7rem, 1.5vw, 0.875rem);
    letter-spacing: 4px;
    text-transform: uppercase;
    color: $text-muted;
    font-weight: 500;
    margin: 0;
  }

  &__bottom {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: min(400px, 60vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__bar-track {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 999px;
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    background: $gradient-primary;
    border-radius: 999px;
    will-change: transform;
  }

  &__count {
    font-size: 11px;
    letter-spacing: 2px;
    color: $text-muted;
    font-variant-numeric: tabular-nums;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
  }
}

.loader-wipe-leave-active {
  transition: none;
}
</style>
