<template>
  <section class="contact section" id="contact" ref="sectionEl">
    <!-- Animated background -->
    <div class="contact__bg" aria-hidden="true">
      <div class="contact__blob contact__blob--1"></div>
      <div class="contact__blob contact__blob--2"></div>
      <div class="contact__blob contact__blob--3"></div>
    </div>

    <div class="container">
      <div class="contact__grid">

        <!-- Left -->
        <div class="contact__left" ref="leftEl">
          <span class="label mb-6">Start a Project</span>
          <h2 class="contact__title">
            Let's build<br />
            something<br />
            <span class="gradient-text">remarkable.</span>
          </h2>
          <p class="contact__sub">
            Tell us what you're building. We'll respond within 24 hours with a free consultation.
          </p>

          <div class="contact__info">
            <a href="mailto:hello@mayx.tech" class="contact__info-item">
              <span class="contact__info-icon">✉</span>
              hello@mayx.tech
            </a>
            <div class="contact__info-item">
              <span class="contact__info-icon">📍</span>
              Remote-first · Worldwide
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact__right" ref="rightEl">
          <form class="contact__form glass-card" @submit.prevent="onSubmit" novalidate>
            <div class="contact__form-row">
              <div class="contact__field">
                <label for="contact-name">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  autocomplete="name"
                />
              </div>
              <div class="contact__field">
                <label for="contact-email">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  placeholder="john@company.com"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="contact__field">
              <label for="contact-project">Project Type</label>
              <select id="contact-project" v-model="form.type">
                <option value="">Select a service...</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="saas">SaaS Platform</option>
                <option value="web">Web Experience</option>
                <option value="mobile">Mobile App</option>
                <option value="automation">Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="contact__field">
              <label for="contact-budget">Budget Range</label>
              <select id="contact-budget" v-model="form.budget">
                <option value="">Select a budget...</option>
                <option value="5-15k">$5k – $15k</option>
                <option value="15-50k">$15k – $50k</option>
                <option value="50-100k">$50k – $100k</option>
                <option value="100k+">$100k+</option>
              </select>
            </div>

            <div class="contact__field">
              <label for="contact-message">Tell us about your project</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                placeholder="Describe your idea, goals, or challenges..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="contact__submit"
              ref="submitBtn"
              @mousemove="onBtnMove"
              @mouseleave="onBtnLeave"
              :disabled="submitted"
            >
              <span v-if="!submitted">Send Message →</span>
              <span v-else>✓ Message Sent!</span>
            </button>
          </form>
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
const submitBtn = ref(null)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  type: '',
  budget: '',
  message: ''
})

function onSubmit() {
  // Simulate success
  submitted.value = true
  gsap.from(submitBtn.value, { scale: 0.95, duration: 0.3, ease: 'back.out(2)' })
}

function onBtnMove(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.3
  const y = (e.clientY - rect.top - rect.height / 2) * 0.3
  gsap.to(btn, { x, y, duration: 0.35, ease: 'power3.out' })
}

function onBtnLeave(e) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
}

onMounted(() => {
  gsap.set([leftEl.value, rightEl.value], { opacity: 0, y: 60 })
  gsap.to([leftEl.value, rightEl.value], {
    opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: sectionEl.value, start: 'top 75%' }
  })
})
</script>

<style lang="scss" scoped>
.contact {
  background: $background-light;
  overflow: hidden;
  position: relative;
  padding-bottom: clamp(40px, 6vw, 80px);

  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.12;
    animation: blob 12s infinite;

    &--1 {
      width: 500px;
      height: 500px;
      background: $primary;
      top: -100px;
      left: -100px;
      animation-delay: 0s;
    }

    &--2 {
      width: 400px;
      height: 400px;
      background: $secondary;
      bottom: -80px;
      right: -80px;
      animation-delay: -4s;
    }

    &--3 {
      width: 300px;
      height: 300px;
      background: $accent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -8s;
    }
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: clamp(48px, 8vw, 100px);
    align-items: start;

    @media (max-width: $laptop) {
      grid-template-columns: 1fr;
    }
  }

  &__left {
    padding-top: 8px;
  }

  &__title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    color: $white;
    margin: 20px 0 24px 0;
    line-height: 1.0;
  }

  &__sub {
    font-size: 16px;
    color: $text-muted;
    line-height: 1.7;
    margin: 0 0 40px 0;
    max-width: 380px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__info-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    color: $text-muted;
    text-decoration: none;
    transition: color $normal $ease;
    font-family: 'Inter', sans-serif;

    &:hover {
      color: $white;
    }
  }

  &__info-icon {
    width: 36px;
    height: 36px;
    border-radius: $radius-md;
    background: rgba($primary, 0.08);
    border: 1px solid rgba($primary, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 13px;
      font-weight: 600;
      color: $text-muted;
      letter-spacing: 0.02em;
      font-family: 'Inter', sans-serif;
    }

    input,
    textarea,
    select {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid $glass-border;
      border-radius: $radius-sm;
      padding: 14px 16px;
      color: $white;
      font-size: 15px;
      font-family: 'Inter', sans-serif;
      transition: border-color $normal $ease, box-shadow $normal $ease;
      width: 100%;

      option {
        background: #1a1a1f;
        color: $white;
      }

      &:focus {
        border-color: rgba($primary, 0.4);
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
        outline: none;
      }
    }

    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238B8B95' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      cursor: pointer;
    }

    textarea {
      resize: none;
      line-height: 1.6;
    }
  }

  &__submit {
    padding: 18px;
    border-radius: $radius-round;
    background: $gradient-primary;
    color: $white;
    font-size: 16px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: box-shadow $normal $ease, opacity $normal $ease;
    font-family: 'Inter', sans-serif;
    width: 100%;

    &:hover:not(:disabled) {
      box-shadow: 0 0 50px rgba($primary, 0.4);
    }

    &:disabled {
      background: linear-gradient(135deg, #22c55e, #16a34a);
      cursor: default;
    }
  }
}
</style>
