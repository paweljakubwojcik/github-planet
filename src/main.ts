import './style.css'
import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import atmoVertex from '../shaders/atmosphere.vertex.glsl'
import atmoFrgment from '../shaders/atmosphere.fragment.glsl'

const app = document.querySelector<HTMLDivElement>('#app')!

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
app.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./images/globe_8k.jpg'),
            },
        },
    })
)
sphere.rotation.y = (-90 / 360) * Math.PI * 2
sphere.rotation.x = (35 / 360) * Math.PI * 2
sphere.rotation.z = (-20 / 360) * Math.PI * 2

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmoVertex,
        fragmentShader: atmoFrgment,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    })
)
atmosphere.scale.set(1.2, 1.2, 1.2)

scene.add(sphere)
scene.add(atmosphere)

camera.position.z = 15

function animate() {
    requestAnimationFrame(animate)
    sphere.rotateY(-0.004)
    renderer.render(scene, camera)
}
animate()

window.addEventListener('resize', () => {
    //renderer.setSize(innerWidth, innerHeight)
    camera.aspect = innerWidth / innerHeight
})
