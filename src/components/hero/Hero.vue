<template>
  <section class="hero" ref="heroEl" id="hero">

    <!-- Three.js Background -->
    <HeroCanvas />

    <!-- Overlay for readability -->
    <div class="hero__overlay"></div>
    <div class="hero__fade-bottom"></div>

    <!-- Content -->
    <div class="hero__inner">
      <div class="hero__grid">

        <!-- Left: copy -->
        <div class="hero__content" ref="contentEl">
          <div class="hero__tag">
            <span class="hero__tag-dot"></span>
            AI &amp; Automation
          </div>
          <h1 class="hero__title">
            Build <em>AI-Powered</em><br />
            Products at Warp Speed
          </h1>
          <p class="hero__sub">
            From LLM integrations to autonomous agents — we design, train, and ship
            AI systems that actually work in production.
          </p>
          <div class="hero__actions">
            <button class="hero-btn-primary" @mousemove="magnetMove" @mouseleave="magnetLeave">
              Start a Project
            </button>
            <button class="hero-btn-ghost" @mousemove="magnetMove" @mouseleave="magnetLeave">
              See Our Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <HeroStats />
        </div>

        <!-- Right: typewriter code card -->
        <div class="hero__visual">
          <TypewriterCode :active="true" />
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <ScrollIndicator />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import HeroCanvas from './HeroCanvas.vue'
import HeroStats from './HeroStats.vue'
import ScrollIndicator from './ScrollIndicator.vue'
import TypewriterCode from './TypewriterCode.vue'

const heroEl = ref(null)
const contentEl = ref(null)

function magnetMove(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.3
  const y = (e.clientY - rect.top - rect.height / 2) * 0.3
  gsap.to(btn, { x, y, duration: 0.35, ease: 'power3.out' })
}

function magnetLeave(e) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1,0.4)' })
}

onMounted(() => {
  // Entrance animation
  const els = contentEl.value?.children
  if (els) {
    gsap.from(els, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    })
  }
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 680px;
  overflow: hidden;
  background: $background;
}

// Overlays
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse 80% 70% at 50% 50%,
      rgba(5, 5, 5, 0.2) 0%,
      rgba(5, 5, 5, 0.58) 60%,
      rgba(5, 5, 5, 0.92) 100%);
  pointer-events: none;
}

.hero__fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: 2;
  background: linear-gradient(to bottom, transparent 0%, $background 100%);
  pointer-events: none;
}

// Main inner
.hero__inner {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 80px;
}

// 55 / 45 grid
.hero__grid {
  width: min(1440px, 100% - 8vw);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;

  @media (max-width: $laptop) {
    grid-template-columns: 1fr;
  }
}

// Left: content
.hero__content {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-right: clamp(0px, 2vw, 32px);
}

.hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-round;
  padding: 6px 14px;
  margin-bottom: clamp(16px, 2vw, 24px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  width: fit-content;
}

.hero__tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #FFDE17;
  flex-shrink: 0;
}

.hero__title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.035em;
  color: #FFDE17;
  margin: 0 0 clamp(14px, 2vw, 20px) 0;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #ffffff, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.hero__sub {
  font-size: clamp(0.9rem, 1.4vw, 1.0625rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.38);
  margin: 0 0 clamp(28px, 3.5vw, 40px) 0;
  max-width: 480px;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: clamp(28px, 4vw, 44px);
}

.hero-btn-primary {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: #FFDE17;
  color: $background;
  border: none;
  border-radius: $radius-sm;
  padding: 14px 28px;
  cursor: pointer;
  transition: box-shadow $normal $ease;

  &:hover {
    box-shadow: 0 0 40px rgba($primary, 0.4);
  }
}

.hero-btn-ghost {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-sm;
  padding: 14px 22px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color $normal $ease, border-color $normal $ease;

  &:hover {
    color: $white;
    border-color: rgba(255, 255, 255, 0.2);
  }
}

// Right: visual
.hero__visual {
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: $laptop) {
    display: none;
  }

  >* {
    width: 100%;
  }
}

@media (max-width: $tablet) {
  .hero {
    min-height: 100svh;
  }

  .hero__inner {
    padding-top: 130px;
    padding-bottom: 80px;
  }
}

@media (max-width: $mobile) {
  .hero__title {
    font-size: clamp(2rem, 10vw, 3rem);
  }
}
</style>
