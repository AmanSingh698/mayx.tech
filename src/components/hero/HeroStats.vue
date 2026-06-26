<template>
  <div class="hero-stats" ref="statsEl">
    <div v-for="(stat, i) in stats" :key="stat.label" class="stat" :ref="el => statEls[i] = el">
      <div class="stat__number">
        <span class="stat__value" :ref="el => valueEls[i] = el">{{ stat.display }}</span>
        <span class="stat__suffix">{{ stat.suffix }}</span>
      </div>
      <p class="stat__label">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const statsEl = ref(null)
const statEls = reactive([])
const valueEls = reactive([])

const stats = [
  { display: '40', suffix: '+', label: 'Projects Delivered', target: 40 },
  { display: '98', suffix: '%', label: 'Client Satisfaction', target: 98 },
  { display: '5', suffix: '★', label: 'Average Rating', target: 5 }
]

onMounted(() => {
  gsap.set(statEls, { opacity: 0, y: 40 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: statsEl.value,
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  })

  tl.to(statEls, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out'
  })

  // Count-up animations
  stats.forEach((stat, i) => {
    const obj = { val: 0 }
    tl.to(
      obj,
      {
        val: stat.target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() {
          if (valueEls[i]) {
            valueEls[i].textContent = Math.round(obj.val)
          }
        }
      },
      '<+0.2'
    )
  })
})
</script>

<style lang="scss" scoped>
.hero-stats {
  display: flex;
  gap: clamp(32px, 6vw, 72px);
  position: relative;
  z-index: 2;
  margin-top: clamp(40px, 6vw, 64px);
  padding-top: clamp(28px, 4vw, 40px);
  // border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.stat {
  &__number {
    display: flex;
    align-items: baseline;
    gap: 3px;
    line-height: 1;
    margin-bottom: 8px;
  }

  &__value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: $white;
    font-variant-numeric: tabular-nums;
  }

  &__suffix {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 700;
    color: #FFDE17;
  }

  &__label {
    font-size: 13px;
    color: $text-muted;
    margin: 0;
    letter-spacing: 0.02em;
    line-height: 1.4;
  }
}
</style>
