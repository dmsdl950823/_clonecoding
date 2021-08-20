import './style.css'
import * as THREE from 'three'

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
// const sphere = new THREE.Mesh({

// })
// scene.add(sphere)

// Floor

/**
 * Lights
 */
// Ambient Light

// Directional Light

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update Sizes

  // Update Camera

  // Update Renderer
})

/**
 * Camera
 */
// Base Camera
const camera = new THREE.PerspectiveCamera()

// Controls

/**
 * Renderer
 */

/**
 * Animate
 */
