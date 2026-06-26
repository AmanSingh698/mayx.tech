<template>
  <section class="whyus section" id="whyus" ref="sectionEl">
    <div class="container">
      <div class="whyus__grid">

        <!-- Left: Stats -->
        <div class="whyus__left" ref="leftEl">
          <span class="label mb-6" ref="labelEl">Why MAYX</span>
          <h2 class="whyus__title" ref="titleEl">
            Built different,<br />
            <span class="gradient-text">by design.</span>
          </h2>

          <div class="whyus__big-stats" ref="statsEl">
            <div class="whyus__big-stat" v-for="(stat, i) in bigStats" :key="stat.label" :ref="el => statEls[i] = el">
              <div class="whyus__big-stat-value">
                <span :ref="el => numEls[i] = el">{{ stat.from }}</span>{{ stat.suffix }}
              </div>
              <p>{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Features -->
        <div class="whyus__right" ref="rightEl">
          <div class="whyus__feature" v-for="(feature, i) in features" :key="feature.title"
            :ref="el => featureEls[i] = el">
            <div class="whyus__feature-icon">{{ feature.icon }}</div>
            <div class="whyus__feature-text">
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.desc }}</p>
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
const leftEl = ref(null)
const rightEl = ref(null)
const labelEl = ref(null)
const titleEl = ref(null)
const statsEl = ref(null)
const statEls = reactive([])
const numEls = reactive([])
const featureEls = reactive([])

const bigStats = [
  { from: 0, to: 40, suffix: '+', label: 'Projects delivered on time' },
  { from: 0, to: 98, suffix: '%', label: 'Client satisfaction rate' },
  { from: 0, to: 3, suffix: 'x', label: 'Average ROI for clients' }
]

const features = [
  { icon: '⚡', title: 'Speed Without Compromise', desc: 'We ship fast using battle-tested processes, without cutting corners on quality or performance.' },
  { icon: '🔒', title: 'Security First', desc: 'Every product we build follows OWASP best practices, with secure-by-default architecture.' },
  { icon: '🌐', title: 'Full-Stack Ownership', desc: 'From design to DevOps — one team, full accountability, no handoff headaches.' },
  { icon: '📊', title: 'Data-Informed Decisions', desc: 'We embed analytics, A/B testing, and monitoring from day one so you can iterate with confidence.' }
]

onMounted(() => {
  // Left reveal
  gsap.set([labelEl.value, titleEl.value], { opacity: 0, y: 40 })
  gsap.to([labelEl.value, titleEl.value], {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })

  // Stats reveal + count-up
  gsap.set(statEls, { opacity: 0, y: 50 })
  const tl = gsap.timeline({
    scrollTrigger: { trigger: statsEl.value, start: 'top 80%' }
  })
  tl.to(statEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' })

  bigStats.forEach((stat, i) => {
    const obj = { val: 0 }
    tl.to(obj, {
      val: stat.to,
      duration: 2,
      ease: 'power2.out',
      onUpdate() {
        if (numEls[i]) numEls[i].textContent = Math.round(obj.val)
      }
    }, '<+0.1')
  })

  // Features reveal
  gsap.set(featureEls, { opacity: 0, x: 40 })
  gsap.to(featureEls, {
    opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: rightEl.value, start: 'top 75%' }
  })
})
</script>

<style lang="scss" scoped>
.whyus {
  background: $background;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(48px, 8vw, 120px);
    align-items: start;

    @media (max-width: $laptop) {
      grid-template-columns: 1fr;
    }
  }

  &__left {
    position: sticky;
    top: 120px;

    @media (max-width: $laptop) {
      position: static;
    }
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.25rem, 4.5vw, 3.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: $white;
    margin: 16px 0 48px 0;
    line-height: 1.05;
  }

  &__big-stats {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__big-stat {
    &-value {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(3rem, 5vw, 4.5rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      color: $white;
      line-height: 1;
      margin-bottom: 8px;
      background: $gradient-text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline-block;
    }

    p {
      font-size: 15px;
      color: $text-muted;
      margin: 0;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-top: 16px;
  }

  &__feature {
    display: flex;
    gap: 20px;
    padding: 28px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    // &:first-child { border-top: 1px solid rgba(255, 255, 255, 0.05); }

    &-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($primary, 0.08);
      border-radius: $radius-md;
      border: 1px solid rgba($primary, 0.12);
    }

    &-text {
      h4 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.125rem;
        font-weight: 700;
        color: $white;
        margin: 0 0 8px 0;
        letter-spacing: -0.01em;
      }

      p {
        font-size: 14px;
        color: $text-muted;
        margin: 0;
        line-height: 1.65;
      }
    }
  }
}
</style>
