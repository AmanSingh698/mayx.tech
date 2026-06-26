<template>
    <header class="navbar" :class="{
        scrolled: isScrolled,
        open: mobileMenu,
    }">
        <!-- Mobile Menu Backdrop -->
        <Transition name="fade">
            <div v-if="mobileMenu" class="backdrop" @click="mobileMenu = false"></div>
        </Transition>

        <div class="container">
            <!-- Mobile Hamburger -->
            <button class="hamburger" @click="mobileMenu = !mobileMenu">
                <span></span>
                <span></span>
            </button>

            <!-- Logo -->
            <RouterLink to="/" class="logo">
                <span class="logo-icon"></span>
                U18
            </RouterLink>

            <!-- Desktop Menu -->
            <nav class="desktop-nav">
                <a v-for="item in menu" :key="item.name" :href="item.link" @click.prevent="navigate(item)"
                    class="nav-link">
                    {{ item.name }}
                </a>
            </nav>

            <!-- Right -->
            <div class="right">
                <!-- <div clss="status">
                    <span></span>
                    Available
                </div> -->
                <button class="project-btn" @click="navigate({ link: '#contact' })" @mousemove="magneticMove"
                    @mouseleave="resetButton">
                    Start Project
                    <i class="ri-arrow-right-up-line"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <Transition name="drawer">
            <div v-if="mobileMenu" class="mobile-nav">
                <a v-for="item in menu" :key="item.name" :href="item.link" @click.prevent="navigate(item)">
                    {{ item.name }}
                </a>
                <button class="mobile-btn" @click="navigate({ link: '#contact' })">Start Project</button>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'
import { useLenis } from '@/composables/useLenis'

const mobileMenu = ref(false)
const isScrolled = ref(false)
const { scrollTo } = useLenis()

watch(mobileMenu, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

const menu = [
    {
        name: 'Home',
        link: '#hero',
    },

    {
        name: 'Services',
        link: '#services',
    },

    {
        name: 'Work',
        link: '#portfolio',
    },

    {
        name: 'Process',
        link: '#process',
    },

    {
        name: 'Contact',
        link: '#contact',
    },
]

const navigate = (item) => {
    mobileMenu.value = false
    scrollTo(item.link)
}

const onScroll = () => {
    isScrolled.value = window.scrollY > 30
}

const magneticMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.35,
        ease: 'power3.out',
    })
}

const resetButton = (e) => {
    gsap.to(e.currentTarget, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1,.5)',
    })
}

onMounted(() => {
    window.addEventListener('scroll', onScroll)
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    padding: 28px 0;
    transition: 0.4s;
}

.navbar.scrolled {
    padding: 18px 0;
    backdrop-filter: blur(24px);
    background: rgba(5, 5, 5, 0.55);
    /* border-bottom: 1px solid rgba(255, 255, 255, 0.05); */
}

.container {
    width: min(1400px, 92%);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1001;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -1px;
    text-decoration: none;
    color: white;
}

.logo-icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #FFDE17;
    box-shadow: 0 0 20px #FFDE17;
}

.desktop-nav {
    display: flex;
    gap: 45px;
}

.nav-link {
    color: #9b9b9b;
    text-decoration: none;
    font-size: 15px;
    transition: 0.35s;
    position: relative;
}

.nav-link:hover {
    color: white;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    height: 2px;
    width: 0;
    background: #4f6ef7;
    transition: 0.35s;
}

.nav-link:hover::after {
    width: 100%;
}

.right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #888;
}

.status span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 15px #22c55e;
}

.project-btn {
    padding: 5px 5px;
    border: none;
    border-radius: 999px;
    background: white;
    color: black;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
}

.project-btn:hover {
    box-shadow: 0 15px 40px rgba(79, 110, 247, 0.25);
}

.hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 6px;
    z-index: 1002;
    padding: 10px;
    margin: -10px;
    position: relative;
}

.hamburger span {
    width: 28px;
    height: 2px;
    background: white;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.navbar.open .hamburger span:nth-child(1) {
    transform: translateY(4px) rotate(45deg);
}

.navbar.open .hamburger span:nth-child(2) {
    transform: translateY(-4px) rotate(-45deg);
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    z-index: 999;
}

.mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: min(300px, 80vw);
    height: 100vh;
    background: #090909;
    display: flex;
    flex-direction: column;
    padding: 110px 30px 40px 30px;
    gap: 24px;
    z-index: 1000;
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-nav a {
    color: white;
    text-decoration: none;
    font-size: 22px;
}

.mobile-btn {
    margin-top: 20px;
    padding: 5px;
    border: none;
    border-radius: 999px;
    background: #FFDE17;
    color: #000000;
    font-weight: 700;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Drawer Transition */
.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(-100%);
}

@media (max-width: 980px) {

    .desktop-nav,
    .right {
        display: none;
    }

    .hamburger {
        display: flex;
    }
}
</style>
