import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.fog = '?'

/**
 * Textures
 */

/**
 * House
 */
// Temporary sphere
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhysicalMaterial({ color: '#B0FFF8' })
const box = new THREE.Mesh(geometry, material)
scene.add(box)

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: '#ECFFB0' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient Light :: This light globally illuminates all objects in the scene equally.
const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.5)
// scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight('#FFFFFF', 0.9)
directionalLight.castShadow = true
directionalLight.position.x = 3
directionalLight.position.y = 6

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)

scene.add(directionalLight)
scene.add(directionalLightHelper)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth
  sizes.height =  window.innerHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 * PerspectiveCamera
 * @param {Number} fov
 * @param {Number} aspect 
 * @param {Number} near 
 * @param {Number} far
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.addEventListener('change', () => console.log('controling...'))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update Controls
  controls.update()

  // Render
  renderer.render(scene, camera)


  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
