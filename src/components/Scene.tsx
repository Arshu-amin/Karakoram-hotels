'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shape: string
  color: string
  speed: number
  scale: number
}

function AnimatedShape({ shape, color, speed, scale }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Smoothly rotate shape over time weighted by speed multiplier
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
    meshRef.current.rotation.z = time * 0.05 * speed
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.1, 64, 64]} />}
        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shape?: string
  color?: string
  speed?: number
  scale?: number
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  scale = 1.0,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        {/* Spatial background fog to blend cleanly with the CSS background */}
        <fog attach="fog" args={['#020617', 3, 10]} />
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#ffffff"
        />
        <pointLight position={[-8, -8, -8]} intensity={0.8} color={color} />
        <pointLight position={[8, -8, 8]} intensity={0.5} color="#38bdf8" />
        <AnimatedShape shape={shape} color={color} speed={speed} scale={scale} />
      </Canvas>
    </div>
  )
}
