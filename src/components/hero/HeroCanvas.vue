<template>
  <canvas ref="canvas" class="hero-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const canvas = ref(null)

let renderer, scene, camera, composer
let particles
let animId
let mouse = { x: 0, y: 0 }
let targetCamera = { x: 0, y: 0 }
let time = 0

const PARTICLE_COUNT = 180
const CONNECTION_DIST = 140
const BOUNDS = 380

// Node data
const nodePositions = []
const nodeVelocities = []
const originalPositions = []

function initThree() {
  const el = canvas.value
  const w = el.clientWidth
  const h = el.clientHeight

  // Scene
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x050505, 0.0015)

  // Camera
  camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 2000)
  camera.position.set(0, 0, 550)

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x050505, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2

  buildParticles()
  setupPostProcessing()
  setupEvents()
  animate()
}

function buildParticles() {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)

  const colorA = new THREE.Color(0x4f6ef7) // primary blue
  const colorB = new THREE.Color(0x7c3aed) // purple
  const colorC = new THREE.Color(0x00d4ff) // accent cyan

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * BOUNDS * 2
    const y = (Math.random() - 0.5) * BOUNDS * 1.5
    const z = (Math.random() - 0.5) * BOUNDS

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    nodePositions.push({ x, y, z })
    originalPositions.push({ x, y, z })
    nodeVelocities.push({
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.3,
      z: (Math.random() - 0.5) * 0.2
    })

    // Randomize color
    const rand = Math.random()
    let col
    if (rand < 0.4) col = colorA
    else if (rand < 0.75) col = colorB
    else col = colorC

    colors[i * 3] = col.r
    colors[i * 3 + 1] = col.g
    colors[i * 3 + 2] = col.b

    // 15% of nodes are "glow nodes" — bigger
    sizes[i] = Math.random() < 0.15 ? Math.random() * 6 + 5 : Math.random() * 3 + 1.5
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const mat = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geo, mat)
  scene.add(particles)
}



function updateParticles() {
  const pPos = particles.geometry.attributes.position.array

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const vel = nodeVelocities[i]
    const orig = originalPositions[i]

    // Float animation
    nodePositions[i].x += vel.x
    nodePositions[i].y += vel.y + Math.sin(time * 0.5 + i) * 0.05
    nodePositions[i].z += vel.z

    // Boundary wrap
    if (nodePositions[i].x > BOUNDS) nodePositions[i].x = -BOUNDS
    if (nodePositions[i].x < -BOUNDS) nodePositions[i].x = BOUNDS
    if (nodePositions[i].y > BOUNDS * 0.75) nodePositions[i].y = -BOUNDS * 0.75
    if (nodePositions[i].y < -BOUNDS * 0.75) nodePositions[i].y = BOUNDS * 0.75
    if (nodePositions[i].z > BOUNDS * 0.5) nodePositions[i].z = -BOUNDS * 0.5
    if (nodePositions[i].z < -BOUNDS * 0.5) nodePositions[i].z = BOUNDS * 0.5

    pPos[i * 3] = nodePositions[i].x
    pPos[i * 3 + 1] = nodePositions[i].y
    pPos[i * 3 + 2] = nodePositions[i].z
  }

  particles.geometry.attributes.position.needsUpdate = true
}

function setupPostProcessing() {
  const w = canvas.value.clientWidth
  const h = canvas.value.clientHeight

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    1.4,   // strength
    0.4,   // radius
    0.1    // threshold
  )
  composer.addPass(bloom)
}

function animate() {
  animId = requestAnimationFrame(animate)
  time += 0.008

  updateParticles()

  // Camera parallax (smooth lerp toward mouse target)
  targetCamera.x += (mouse.x * 60 - targetCamera.x) * 0.04
  targetCamera.y += (mouse.y * 30 - targetCamera.y) * 0.04
  camera.position.x = targetCamera.x
  camera.position.y = targetCamera.y
  camera.lookAt(0, 0, 0)

  composer.render()
}

function setupEvents() {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
}

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
}

function onResize() {
  const w = canvas.value?.clientWidth
  const h = canvas.value?.clientHeight
  if (!w || !h) return

  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  composer.setSize(w, h)
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
  composer?.dispose()
  particles?.geometry.dispose()
  particles?.material.dispose()
  scene?.clear()
})
</script>

<style lang="scss" scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: block;
}
</style>
