<template>
  <section class="portfolio section" id="portfolio" ref="sectionEl">
    <div class="container">
      <div class="portfolio__header section-header">
        <span class="label" ref="labelEl">Featured Work</span>
        <h2 class="portfolio__title" ref="titleEl">
          Projects that<br />
          <span class="gradient-text">move the needle</span>
        </h2>
      </div>
    </div>

    <!-- Pinned scroll container -->
    <div class="portfolio__pin-wrap" ref="pinWrap">
      <div class="portfolio__stack" ref="stackEl">
        <div v-for="(project, i) in projects" :key="project.title" class="portfolio__slide"
          :ref="el => slideEls[i] = el" :style="{ zIndex: i }">
          <PortfolioCard :project="project" :index="i" />
        </div>
      </div>

      <!-- Progress -->
      <div class="portfolio__progress">
        <span class="portfolio__progress-current">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <div class="portfolio__progress-track">
          <div class="portfolio__progress-bar" ref="progressBar"></div>
        </div>
        <span class="portfolio__progress-total">{{ String(projects.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import PortfolioCard from './PortfolioCard.vue'

const sectionEl = ref(null)
const pinWrap = ref(null)
const stackEl = ref(null)
const progressBar = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const slideEls = reactive([])
const activeIndex = ref(0)

const projects = [
  {
    title: 'NeuralFlow AI',
    category: 'AI Platform',
    year: '2024',
    description: 'An enterprise AI workflow automation platform processing 2M+ tasks daily with real-time analytics and LLM orchestration.',
    stack: ['Python', 'FastAPI', 'Vue 3', 'PostgreSQL'],
    color: '#4f6ef7',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Syncra SaaS',
    category: 'SaaS Product',
    year: '2024',
    description: 'Full-stack B2B SaaS platform with multi-tenant architecture, Stripe billing, onboarding flows, and role-based access.',
    stack: ['Vue', 'Node.js', 'Prisma', 'Stripe'],
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Luminary Studio',
    category: 'Creative Website',
    year: '2023',
    description: 'Award-winning creative agency website with WebGL canvas, parallax storytelling, and immersive micro-interactions.',
    stack: ['Three.js', 'GSAP', 'Nuxt', 'GLSL'],
    color: '#00d4ff',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'TradeOS Mobile',
    category: 'Mobile App',
    year: '2023',
    description: 'Real-time trading mobile application with live charts, order execution, portfolio tracking and push notifications.',
    stack: ['React Native', 'WebSockets', 'Redux', 'Firebase'],
    color: '#22c55e',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Automate Pro',
    category: 'Automation',
    year: '2023',
    description: 'No-code automation platform connecting 200+ business tools, with visual workflow builder and enterprise SSO.',
    stack: ['n8n', 'Docker', 'PostgreSQL', 'Next.js'],
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200&auto=format&fit=crop'
  }
]

let trigger

onMounted(() => {
  // Header reveal
  gsap.set([labelEl.value, titleEl.value], { opacity: 0, y: 40 })
  gsap.to([labelEl.value, titleEl.value], {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })

  // Set initial states: first card centered and active, others off-screen to bottom
  gsap.set(slideEls, { yPercent: 0, scale: 1, opacity: 1, y: 0 })
  if (slideEls.length > 1) {
    gsap.set(slideEls.slice(1), { yPercent: 110 })
  }

  // Create a timeline that scales previous cards down and slides subsequent cards up
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinWrap.value,
      pin: true,
      start: 'top 100px',
      end: `+=${(projects.length - 1) * 100}%`,
      scrub: 1,
      onUpdate(self) {
        const progress = self.progress
        // Progress bar
        if (progressBar.value) {
          gsap.set(progressBar.value, { scaleX: progress })
        }

        // Active index mapping
        const idx = Math.min(
          Math.round(progress * (projects.length - 1)),
          projects.length - 1
        )
        activeIndex.value = idx
      }
    }
  })

  trigger = tl.scrollTrigger

  // Build the stacking steps
  projects.forEach((project, i) => {
    if (i === 0) return

    const label = `step-${i}`

    // Animate older cards in the stack (scale down, translate slightly up, fade slightly)
    for (let j = 0; j < i; j++) {
      const depth = i - j
      const targetScale = 1 - depth * 0.04
      const targetY = -depth * 25
      const targetOpacity = 1 - depth * 0.15

      tl.to(slideEls[j], {
        scale: targetScale,
        y: targetY,
        opacity: targetOpacity,
        duration: 1,
        ease: 'none'
      }, label)
    }

    // Animate the next card coming up from off-screen bottom to standard stack position
    tl.fromTo(slideEls[i], {
      yPercent: 110,
      scale: 1,
      opacity: 1,
      y: 0
    }, {
      yPercent: 0,
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'none'
    }, label)
  })
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<style lang="scss" scoped>
.portfolio {
  background: $background;
  padding-top: clamp(20px, 3vw, 40px);

  &__header {
    display: flex;
    flex-direction: column;
    gap: 20px;
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

  &__pin-wrap {
    height: calc(100vh - 140px);
    position: relative;
    overflow: hidden;
    margin-top: 24px;
    border-radius: $radius-xl;
  }

  &__stack {
    position: relative;
    height: 100%;
  }

  &__slide {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: clamp(24px, 6vw, 80px);
    right: clamp(24px, 6vw, 80px);
    will-change: transform, opacity;
  }

  &__progress {
    position: absolute;
    bottom: clamp(10px, 1.5vh, 20px);
    right: clamp(24px, 6vw, 80px);
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 10;
  }

  &__progress-current,
  &__progress-total {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: $text-muted;
    font-variant-numeric: tabular-nums;
  }

  &__progress-current {
    color: $white;
  }

  &__progress-track {
    width: 100px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  &__progress-bar {
    height: 100%;
    background: linear-gradient(135deg, #797246 0%, #FFDE17 100%);
    transform-origin: left;
    will-change: transform;
    border-radius: 999px;
  }
}
</style>
