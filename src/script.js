import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphere.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'



console.log(atmosphereVertexShader);

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5,50, 50), new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('./8081_earthmap4k.jpg')
        }
    }
}))
scene.add(sphere)

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5,50, 50), new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
}))

atmosphere.scale.set(1.1, 1.1, 1.1)


scene.add(atmosphere)

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let mouse = {
    x: undefined,
    y: undefined,
}

document.addEventListener('mousemove', () => {

})

const clock = new THREE.Clock()

const tick = () =>
{
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    sphere.rotation.y += 0.001
    
    // Render
    renderer.render(scene, camera)

}

tick()