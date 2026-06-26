<template>
  <footer class="footer" ref="footerEl">
    <!-- Large MAYX text (parallax) -->
    <div class="footer__big-text" ref="bigTextEl" aria-hidden="true">MAYX</div>

    <div class="container">
      <div class="footer__top">

        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <span class="footer__logo-dot"></span>
            <span>MAYX</span>
          </div>
          <p class="footer__tagline">
            Engineering Digital Experiences<br />
            for the next generation of products.
          </p>
          <div class="footer__socials">
            <a v-for="social in socials" :key="social.name" :href="social.url" :aria-label="social.name"
              class="footer__social" target="_blank" rel="noopener noreferrer">
              <span v-html="social.icon"></span>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="footer__nav" v-for="group in navGroups" :key="group.title">
          <h5 class="footer__nav-title">{{ group.title }}</h5>
          <ul class="footer__nav-links">
            <li v-for="link in group.links" :key="link.label">
              <a :href="link.href" class="footer__nav-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer__divider"></div>

      <div class="footer__bottom">
        <p class="footer__copy">
          © {{ year }} MAYX Agency. All rights reserved.
        </p>
        <div class="footer__bottom-links">
          <a href="#" class="footer__bottom-link">Privacy Policy</a>
          <a href="#" class="footer__bottom-link">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const footerEl = ref(null)
const bigTextEl = ref(null)
const year = new Date().getFullYear()

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/mayxagency',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/mayx',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  },
  {
    name: 'GitHub',
    url: 'https://github.com/mayx-agency',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`
  }
]

const navGroups = [
  {
    title: 'Services',
    links: [
      { label: 'AI & Machine Learning', href: '#services' },
      { label: 'SaaS Development', href: '#services' },
      { label: 'Web Experiences', href: '#services' },
      { label: 'Mobile Apps', href: '#services' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Work', href: '#portfolio' },
      { label: 'Process', href: '#process' },
      { label: 'Why MAYX', href: '#whyus' },
      { label: 'Contact', href: '#contact' }
    ]
  }
]

onMounted(() => {
  // Big text parallax
  ScrollTrigger.create({
    trigger: footerEl.value,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: 1.5,
    onUpdate(self) {
      gsap.set(bigTextEl.value, { y: -80 * self.progress })
    }
  })

  // Reveal
  gsap.set('.footer__top > *', { opacity: 0, y: 40 })
  gsap.to('.footer__top > *', {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: footerEl.value, start: 'top 80%' }
  })
})
</script>

<style lang="scss" scoped>
.footer {
  background: $background-light;
  padding-top: clamp(40px, 6vw, 80px);
  padding-bottom: 0;
  position: relative;
  overflow: hidden;

  &__big-text {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(5rem, 18vw, 18rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.04);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    will-change: transform;
    line-height: 1;
  }

  &__top {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: clamp(40px, 6vw, 80px);
    padding-bottom: clamp(48px, 6vw, 80px);

    @media (max-width: $laptop) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: $white;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  &__logo-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #FFDE17;
    box-shadow: 0 0 16px $primary;
    animation: pulse-glow 2.5s infinite;
  }

  &__tagline {
    font-size: 14px;
    line-height: 1.75;
    color: $text-muted;
    margin: 0 0 28px 0;
    max-width: 280px;
  }

  &__socials {
    display: flex;
    gap: 12px;
  }

  &__social {
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid $glass-border;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-muted;
    text-decoration: none;
    transition: all $normal $ease;

    :deep(svg) {
      color: currentColor;
      fill: currentColor;
    }

    &:hover {
      background: #FFDE17;
      border-color: #FFDE17;
      color: #000000;
      transform: translateY(-3px);
    }
  }

  &__nav-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $text-muted;
    margin: 0 0 20px 0;
  }

  &__nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    margin: 0;
  }

  &__nav-link {
    font-size: 14px;
    color: $text-muted;
    text-decoration: none;
    transition: color $fast $ease;
    font-family: 'Inter', sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '→';
      opacity: 0;
      transform: translateX(-8px);
      transition: all $fast $ease;
      font-size: 12px;
      color: #FFDE17;
    }

    &:hover {
      color: $white;
      padding-left: 14px;

      &::before {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
    position: relative;
    z-index: 1;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 24px;
    position: relative;
    z-index: 1;

    @media (max-width: $mobile) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }

  &__copy {
    font-size: 13px;
    color: $text-muted;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  &__bottom-links {
    display: flex;
    gap: 24px;
  }

  &__bottom-link {
    font-size: 13px;
    color: $text-muted;
    text-decoration: none;
    transition: color $fast $ease;
    font-family: 'Inter', sans-serif;

    &:hover {
      color: $white;
    }
  }
}
</style>
