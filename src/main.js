import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Global Styles
import './styles/main.scss'

// GSAP + ScrollTrigger registration
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mount
const app = createApp(App)
app.use(router)
app.mount('#app')