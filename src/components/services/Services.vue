<template>
  <section class="services section" id="services" ref="sectionEl">
    <div class="container">
      <!-- Header -->
      <div class="services__header section-header">
        <span class="label" ref="labelEl">What We Build</span>
        <h2 class="services__title" ref="titleEl">
          End-to-end<br />
          <span class="gradient-text">digital solutions</span>
        </h2>
        <p class="services__subtitle" ref="subtitleEl">
          From zero to launch and beyond — we handle every layer of your product.
        </p>
      </div>

      <!-- Grid -->
      <div class="services__grid" ref="gridEl">
        <ServiceCard
          v-for="(service, i) in services"
          :key="service.title"
          :service="service"
          :ref="el => cardEls[i] = el"
          :style="{ animationDelay: `${i * 0.15}s` }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ServiceCard from './ServiceCard.vue'

const sectionEl = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const subtitleEl = ref(null)
const gridEl = ref(null)
const cardEls = reactive([])

const services = [
  {
    title: 'AI & Machine Learning',
    description: 'Custom AI models, LLM integrations, computer vision, and intelligent automation pipelines built for scale.',
    icon: '🤖',
    tags: ['Python', 'LLMs', 'MLOps']
  },
  {
    title: 'SaaS Platforms',
    description: 'Full-stack SaaS applications with multi-tenancy, billing, onboarding flows, and analytics dashboards.',
    icon: '☁️',
    tags: ['Vue', 'Node', 'PostgreSQL']
  },
  {
    title: 'Web Experiences',
    description: 'Award-worthy marketing sites, portfolio sites, and landing pages engineered for performance and conversion.',
    icon: '✦',
    tags: ['Three.js', 'GSAP', 'WebGL']
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform React Native apps with native performance, offline support, and seamless app store delivery.',
    icon: '📱',
    tags: ['React Native', 'Expo', 'Firebase']
  },
  {
    title: 'Automation Systems',
    description: 'End-to-end workflow automation, API integrations, scraping pipelines, and business process optimization.',
    icon: '⚡',
    tags: ['n8n', 'Zapier', 'Python']
  },
  {
    title: 'Cloud & DevOps',
    description: 'Infrastructure design, CI/CD pipelines, containerization, and cloud architecture on AWS, GCP, or Azure.',
    icon: '🔧',
    tags: ['Docker', 'Kubernetes', 'Terraform']
  }
]

onMounted(() => {
  // Header reveal
  gsap.set([labelEl.value, titleEl.value, subtitleEl.value], { opacity: 0, y: 40 })

  gsap.to([labelEl.value, titleEl.value, subtitleEl.value], {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 75%'
    }
  })

  // Cards reveal
  const cards = gridEl.value?.children
  if (cards) {
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridEl.value,
        start: 'top 80%'
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.services {
  background: $background;
  padding-top: clamp(40px, 6vw, 80px);
  padding-bottom: clamp(40px, 6vw, 80px);

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

  &__subtitle {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    color: $text-muted;
    margin: 0;
    max-width: 480px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(16px, 2vw, 24px);

    @media (max-width: $laptop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
