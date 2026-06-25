<template>
  <section class="process section" id="process" ref="sectionEl">
    <div class="container">
      <div class="process__header section-header">
        <span class="label" ref="labelEl">How We Work</span>
        <h2 class="process__title" ref="titleEl">
          Our proven<br />
          <span class="gradient-text">5-step process</span>
        </h2>
      </div>
    </div>

    <!-- Pinned horizontal scroll -->
    <div class="process__outer" ref="outerEl">
      <div class="process__inner" ref="innerEl">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="process__step"
          :class="{ 'process__step--active': activeStep === i }"
          :ref="el => stepEls[i] = el"
        >
          <div class="process__step-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="process__step-icon">{{ step.icon }}</div>
          <h3 class="process__step-title">{{ step.title }}</h3>
          <p class="process__step-desc">{{ step.description }}</p>

          <div class="process__step-connector" v-if="i < steps.length - 1">
            <div class="process__step-line"></div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 10h8M11 7l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const sectionEl = ref(null)
const outerEl = ref(null)
const innerEl = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const stepEls = reactive([])
const activeStep = ref(0)

const steps = [
  {
    icon: '🔍',
    title: 'Discover',
    description: 'Deep-dive into your business goals, user needs, competitive landscape, and technical constraints. We leave no stone unturned.'
  },
  {
    icon: '🎨',
    title: 'Design',
    description: 'High-fidelity UI/UX design in Figma. Prototypes, design systems, and user testing before a single line of code is written.'
  },
  {
    icon: '⚙️',
    title: 'Develop',
    description: 'Agile sprints with weekly demos. Clean, documented code. Continuous integration and automated testing from day one.'
  },
  {
    icon: '🚀',
    title: 'Launch',
    description: 'Production deployment with zero downtime. Performance optimization, SEO, analytics, and stakeholder walkthroughs.'
  },
  {
    icon: '📈',
    title: 'Scale',
    description: 'Post-launch monitoring, feature iterations based on real user data, and infrastructure scaling as you grow.'
  }
]

let trigger

onMounted(() => {
  // Header
  gsap.set([labelEl.value, titleEl.value], { opacity: 0, y: 40 })
  gsap.to([labelEl.value, titleEl.value], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })

  // Horizontal pin
  const totalScroll = innerEl.value.scrollWidth - window.innerWidth

  trigger = ScrollTrigger.create({
    trigger: outerEl.value,
    pin: true,
    start: 'top 120px',
    end: `+=${totalScroll}`,
    scrub: 1.2,
    anticipatePin: 1,
    onUpdate(self) {
      gsap.set(innerEl.value, { x: -totalScroll * self.progress })

      const idx = Math.floor(self.progress * steps.length)
      activeStep.value = Math.min(idx, steps.length - 1)
    }
  })

  // Initial card states
  gsap.set(stepEls, { opacity: 0, y: 30 })
  gsap.to(stepEls, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: outerEl.value, start: 'top 80%' }
  })
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<style lang="scss" scoped>
.process {
  background: $background-light;
  overflow: hidden;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: clamp(36px, 5vw, 60px);
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.25rem, 5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: $white;
    margin: 0;
    line-height: 1.05;
  }

  &__outer {
    overflow: hidden;
    padding-bottom: 60px;
  }

  &__inner {
    display: flex;
    gap: 0;
    will-change: transform;
    align-items: stretch;
    padding-inline: calc((100% - min(1440px, 100% - 12vw)) / 2);
  }

  &__step {
    flex-shrink: 0;
    width: min(480px, 80vw);
    padding: clamp(32px, 4vw, 48px);
    background: $surface;
    border: 1px solid $glass-border;
    border-radius: $radius-lg;
    margin-right: 24px;
    position: relative;
    transition: border-color $normal $ease, box-shadow $normal $ease;

    &:last-child {
      margin-right: 0;
    }

    &--active {
      border-color: rgba($primary, 0.3);
      box-shadow: 0 0 60px rgba($primary, 0.08);
    }

    &-number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 4rem;
      font-weight: 700;
      letter-spacing: -0.04em;
      color: rgba(255, 255, 255, 0.04);
      line-height: 1;
      margin-bottom: 16px;
    }

    &-icon {
      font-size: 2.5rem;
      margin-bottom: 20px;
      display: block;
    }

    &-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: $white;
      margin: 0 0 16px 0;
    }

    &-desc {
      font-size: 15px;
      line-height: 1.7;
      color: $text-muted;
      margin: 0;
    }

    &-connector {
      position: absolute;
      right: -37px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 4px;
      color: $text-muted;
      z-index: 2;
    }

    &-line {
      width: 16px;
      height: 1px;
      background: rgba(255, 255, 255, 0.15);
    }
  }
}
</style>
