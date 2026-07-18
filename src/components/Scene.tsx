'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Slow rotational and floating animation
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.4, 128, 16, 3, 5]} />
        {/* Shiny futuristic metallic material, extremely fast to render and runs flawlessly in headless contexts */}
        <meshPhysicalMaterial
          color="#818cf8"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#312e81"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingOrb({ position, scale, color, speed }: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.25
    meshRef.current.rotation.x = time * 0.12
    meshRef.current.rotation.z = time * 0.08
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </Float>
  )
}

// Rig component that smoothly tilts/rotates camera based on mouse coordinates
function Rig() {
  const { camera, pointer } = useThree()
  const vec = new THREE.Vector3()

  useFrame(() => {
    // Smoothly interpolate camera position based on pointer
    camera.position.lerp(vec.set(pointer.x * 1.2, pointer.y * 1.2, 5.5), 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function Scene() {
  return (
    <div className="h-full w-full bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Deep, matching background fog */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 4, 10]} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.4} />
        <spotLight position={[15, 20, 15]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={1.2} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#c084fc" />
        <pointLight position={[10, -10, 10]} intensity={0.8} color="#38bdf8" />

        {/* Central Shiny Metallic Artpiece */}
        <FloatingCrystal />

        {/* Floating Side Accents */}
        <FloatingOrb position={[-2.5, 1.2, -1]} scale={0.5} color="#c084fc" speed={1.1} />
        <FloatingOrb position={[2.5, -1.2, -1.5]} scale={0.6} color="#38bdf8" speed={0.9} />
        <FloatingOrb position={[-3, -1.5, -2]} scale={0.4} color="#818cf8" speed={1.3} />
        <FloatingOrb position={[3, 1.5, -2.5]} scale={0.45} color="#a5b4fc" speed={0.8} />

        {/* Interactive Mouse Tracking Camera Rig */}
        <Rig />
      </Canvas>
    </div>
  )
}
