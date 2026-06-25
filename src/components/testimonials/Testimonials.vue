<template>
  <section class="testimonials section" id="testimonials" ref="sectionEl">
    <div class="container">
      <div class="testimonials__header section-header">
        <span class="label" ref="labelEl">Client Voices</span>
        <h2 class="testimonials__title" ref="titleEl">
          What clients<br />
          <span class="gradient-text">say about us</span>
        </h2>
      </div>

      <div class="testimonials__grid" ref="gridEl">
        <TestimonialCard
          v-for="(t, i) in testimonials"
          :key="t.name"
          :testimonial="t"
          :ref="el => cardEls[i] = el"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import TestimonialCard from './TestimonialCard.vue'

const sectionEl = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const gridEl = ref(null)
const cardEls = reactive([])

const testimonials = [
  {
    quote: 'MAYX transformed our idea into a production-ready AI platform in 8 weeks. The code quality and communication were exceptional — far above any agency we\'ve worked with.',
    name: 'Alex Morrison',
    role: 'CEO',
    company: 'NeuralFlow Inc.'
  },
  {
    quote: 'They didn\'t just build what we asked for — they challenged our assumptions and improved our product in ways we hadn\'t imagined. Truly a strategic partner.',
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Syncra'
  },
  {
    quote: 'Our website went from 2/10 to winning an Awwwards site of the day. MAYX has a rare combination of technical depth and design sensibility.',
    name: 'Lucas Beaumont',
    role: 'Founder',
    company: 'Luminary Studio'
  }
]

onMounted(() => {
  gsap.set([labelEl.value, titleEl.value], { opacity: 0, y: 40 })
  gsap.to([labelEl.value, titleEl.value], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })

  const cards = gridEl.value?.children
  if (cards) {
    gsap.set(cards, { opacity: 0, y: 60 })
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: gridEl.value, start: 'top 80%' }
    })
  }
})
</script>

<style lang="scss" scoped>
.testimonials {
  background: $background-light;

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

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(16px, 2.5vw, 28px);
    align-items: start;

    @media (max-width: $laptop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
