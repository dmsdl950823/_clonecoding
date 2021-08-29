import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

// 🎇 https://sbcode.net/threejs/

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.fog = '?'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const dooNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

/**
 * House
 */
// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
)
walls.castShadow = true
scene.add(walls)

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: '#ECFFB0' })
)
floor.rotation.x  = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient Light :: This light globally illuminates all objects in the scene equally.
const ambientLight = new THREE.AmbientLight('#FFFFFF', 0.5)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight('#FFFFFF', 0.5)
directionalLight.castShadow = true
directionalLight.position.x = 3
directionalLight.position.y = 6

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)

scene.add(directionalLight)
scene.add(directionalLightHelper)

gui.add(directionalLight, 'intensity', 0, 1, 0.01)
// gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01)


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

const cameraGui = gui.addFolder('Camera')
cameraGui.add(camera.position, 'x', -100, 100, 0.01)
cameraGui.add(camera.position, 'y', -100, 100, 0.01)
cameraGui.add(camera.position, 'z', -100, 100, 0.01)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.addEventListener('change', () => console.log('controling...'))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.shadowMap.enabled = true // set Shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap

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
