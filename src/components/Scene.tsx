'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape: 'torusKnot' | 'sphere' | 'box'
  speed: number
  scale: number
  color: string
}

function AnimatedShape({ shape, speed, scale, color }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    // State clock getElapsedTime used for timing animations
    const time = state.clock.getElapsedTime()
    // Base spin + optional user speed
    const currentSpeed = speed * 0.25
    meshRef.current.rotation.x = time * (0.15 + currentSpeed)
    meshRef.current.rotation.y = time * (0.2 + currentSpeed)
  })

  // Set up high-performance glossy metallic material
  const material = (
    <meshPhysicalMaterial
      color={color}
      roughness={0.15}
      metalness={0.9}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
    />
  )

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.0, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {material}
      </mesh>
    </Float>
  )
}

export default function Scene({ shape, speed, scale, color }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        {/* Sync background fog color with --background (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 0]} intensity={1.2} />

        <AnimatedShape shape={shape} speed={speed} scale={scale} color={color} />
      </Canvas>
    </div>
  )
}
