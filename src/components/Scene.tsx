'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shape: 'torusKnot' | 'sphere' | 'box' | 'octahedron'
  color: string
  speed: number
  distort: number
  scale: number
}

function AnimatedShape({ shape, color, speed, distort, scale }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed

    // Subtle breathing scale distortion when distort is higher
    if (distort > 0) {
      const breath = 1 + Math.sin(time * speed) * 0.08 * distort
      meshRef.current.scale.set(scale * breath, scale * breath, scale * breath)
    } else {
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.4, 0]} />}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={shape === 'octahedron' || shape === 'box'}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'box' | 'octahedron'
  color?: string
  speed?: number
  distort?: number
  scale?: number
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  distort = 0.4,
  scale = 1.0
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
        {/* Sync background fog color with globals.css background color (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={2.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <directionalLight position={[0, 5, 5]} intensity={1.5} />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          scale={scale}
        />
      </Canvas>
    </div>
  )
}
