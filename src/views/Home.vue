<template>
  <div class="page">
    <Navbar />
    <Hero />
    <TrustedBy />
    <Services />
    <Portfolio />
    <Process />
    <WhyUs />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Layout
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

// Hero
import Hero from '@/components/hero/Hero.vue'

// Sections
import TrustedBy from '@/components/trusted/TrustedBy.vue'
import Services from '@/components/services/Services.vue'
import Portfolio from '@/components/portfolio/Portfolio.vue'
import Process from '@/components/process/Process.vue'
import WhyUs from '@/components/whyus/WhyUs.vue'
import Testimonials from '@/components/testimonials/Testimonials.vue'
import FAQ from '@/components/faq/FAQ.vue'
import Contact from '@/components/contact/Contact.vue'

onMounted(() => {
  // Refresh ScrollTrigger after all sections mount
  ScrollTrigger.refresh()
})
</script>

<style lang="scss" scoped>
.page {
  background: $background;
  color: $white;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>