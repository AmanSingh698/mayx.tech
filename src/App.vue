<template>
  <div id="app-root">
    <Loader v-if="!loaderDone" @done="onLoaderDone" />
    <CustomCursor />
    <RouterView v-if="loaderDone" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Loader from '@/components/layout/Loader.vue'
import CustomCursor from '@/components/layout/CustomCursor.vue'
import { useLenis } from '@/composables/useLenis'

const loaderDone = ref(false)
const { init: initLenis } = useLenis()

function onLoaderDone() {
  loaderDone.value = true
  // Init Lenis after loader exits so smooth scroll doesn't fight the loader
  initLenis()
}
</script>

<style>
html,
body,
#app,
#app-root {
  width: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  overflow-x: hidden;
  background: #050505;
  cursor: none;
}

/* Hide native cursor on desktop */
@media (hover: hover) {
  * {
    cursor: none !important;
  }
}
</style>