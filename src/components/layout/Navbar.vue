<template>
    <header class="navbar" :class="{
        scrolled: isScrolled,
        open: mobileMenu,
    }">
        <div class="container">
            <!-- Logo -->
            <RouterLink to="/" class="logo">
                <span class="logo-icon"></span>
                U18
            </RouterLink>
            <!-- Desktop Menu -->
            <nav class="desktop-nav">
                <RouterLink v-for="item in menu" :key="item.name" :to="item.link" class="nav-link">
                    {{ item.name }}
                </RouterLink>
            </nav>

            <!-- Right -->
            <div class="right">
                <!-- <div clss="status">
                    <span></span>
                    Available
                </div> -->
                <button class="project-btn" @mousemove="magneticMove" @mouseleave="resetButton">
                    Start Project
                    <i class="ri-arrow-right-up-line"></i>
                </button>
            </div>

            <!-- Mobile -->
            <button class="hamburger" @click="mobileMenu = !mobileMenu">
                <span></span>
                <span></span>
            </button>
        </div>

        <!-- Mobile Menu -->

        <Transition name="menu">
            <div v-if="mobileMenu" class="mobile-nav">
                <RouterLink v-for="item in menu" :key="item.name" :to="item.link" @click="mobileMenu = false">
                    {{ item.name }}
                </RouterLink>
                <button class="mobile-btn">Start Project</button>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const mobileMenu = ref(false)
const isScrolled = ref(false)

const menu = [
    {
        name: 'Home',
        link: '/',
    },

    {
        name: 'Services',
        link: '/',
    },

    {
        name: 'Work',
        link: '/',
    },

    {
        name: 'Process',
        link: '/',
    },

    {
        name: 'Contact',
        link: '/',
    },
]

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
}

.hamburger span {
    width: 28px;
    height: 2px;
    background: white;
}

.mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 35px;
    background: #090909;
    gap: 24px;
}

.mobile-nav a {
    color: white;
    text-decoration: none;
    font-size: 22px;
}

.mobile-btn {
    margin-top: 20px;
    padding: 18px;
    border: none;
    border-radius: 999px;
    background: #4f6ef7;
    color: white;
    font-weight: 700;
}

.menu-enter-active,
.menu-leave-active {
    transition: 0.35s;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-20px);
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
