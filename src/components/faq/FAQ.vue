<template>
  <section class="faq section" id="faq" ref="sectionEl">
    <div class="container">
      <div class="faq__inner">

        <!-- Header -->
        <div class="faq__header">
          <span class="label" ref="labelEl">FAQ</span>
          <h2 class="faq__title" ref="titleEl">
            Common<br />
            <span class="gradient-text">questions</span>
          </h2>
          <p class="faq__subtitle" ref="subtitleEl">
            Everything you need to know before we start building together.
          </p>
        </div>

        <!-- Items -->
        <div class="faq__list" ref="listEl">
          <div v-for="(item, i) in faqs" :key="i" class="faq__item" :class="{ 'faq__item--open': openIndex === i }"
            :ref="el => itemEls[i] = el">
            <button class="faq__question" @click="toggle(i)" :id="`faq-btn-${i}`">
              <span>{{ item.question }}</span>
              <div class="faq__icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
            </button>

            <div class="faq__answer" :ref="el => answerEls[i] = el">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'

const sectionEl = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const subtitleEl = ref(null)
const listEl = ref(null)
const itemEls = reactive([])
const answerEls = reactive([])
const openIndex = ref(null)

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'It depends on scope. A landing site takes 2–4 weeks; a full SaaS MVP typically takes 8–16 weeks. After our discovery call, we\'ll give you a precise timeline with weekly milestones.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer fixed-scope projects and monthly retainers. Fixed projects start at $5k for single-page sites, and SaaS/AI platforms typically range from $15k–$80k depending on complexity.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely. Our team is fully remote and we work with clients across North America, Europe, the Middle East, and Southeast Asia. We adapt to your timezone.'
  },
  {
    question: 'Can I see the code and own it after delivery?',
    answer: 'Yes. You receive full source code ownership, all repository access, and complete IP transfer upon project completion. No vendor lock-in.'
  },
  {
    question: 'Do you offer post-launch support?',
    answer: 'Yes. We offer 30-day bug-fix warranty on all projects, and optional monthly retainers for ongoing development, monitoring, and feature iterations.'
  },
  {
    question: 'What information do you need to get started?',
    answer: 'A brief description of your product idea or problem, your target users, any design inspiration or competitors, rough timeline, and budget range. That\'s enough to schedule a discovery call.'
  }
]

function toggle(i) {
  const answer = answerEls[i]
  if (!answer) return

  if (openIndex.value === i) {
    // Close
    gsap.to(answer, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' })
    openIndex.value = null
  } else {
    // Close previous
    if (openIndex.value !== null && answerEls[openIndex.value]) {
      gsap.to(answerEls[openIndex.value], { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }

    // Open new
    openIndex.value = i
    gsap.fromTo(
      answer,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' }
    )
  }
}

onMounted(() => {
  // Set all answers to height 0
  gsap.set(answerEls, { height: 0, opacity: 0, overflow: 'hidden' })

  // Reveal header
  gsap.set([labelEl.value, titleEl.value, subtitleEl.value], { opacity: 0, y: 40 })
  gsap.to([labelEl.value, titleEl.value, subtitleEl.value], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })

  // Reveal items
  gsap.set(itemEls, { opacity: 0, y: 30 })
  gsap.to(itemEls, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: listEl.value, start: 'top 80%' }
  })
})
</script>

<style lang="scss" scoped>
.faq {
  background: $background;

  &__inner {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: clamp(48px, 8vw, 120px);
    align-items: start;

    @media (max-width: $laptop) {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }

  &__header {
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: $laptop) {
      position: static;
    }
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.25rem, 4vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: $white;
    margin: 0;
    line-height: 1.05;
  }

  &__subtitle {
    font-size: 15px;
    color: $text-muted;
    margin: 0;
    line-height: 1.7;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    // &:first-child {
    //   border-top: 1px solid rgba(255, 255, 255, 0.06);
    // }

    &--open .faq__icon {
      transform: rotate(45deg);
      background: #FFDE17;
      border-color: #FFDE17;
      color: #000000;
    }

    &--open .faq__question {
      color: $white;
    }
  }

  &__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
    font-weight: 600;
    color: $text-light;
    text-align: left;
    transition: color $normal $ease;
    font-family: 'Space Grotesk', sans-serif;

    &:hover {
      color: $white;
    }
  }

  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $glass-border;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all $normal $ease;
    color: $text-muted;

    svg {
      color: inherit;
    }
  }

  &__answer {
    overflow: hidden;

    p {
      padding-bottom: 24px;
      font-size: 15px;
      line-height: 1.7;
      color: $text-muted;
      margin: 0;
    }
  }
}
</style>
