'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveShapeProps {
  shape: 'torus' | 'sphere' | 'box' | 'icosahedron'
  speed: number
  scale: number
  color: string
  metalness: number
  roughness: number
}

function InteractiveShape({
  shape,
  speed,
  scale,
  color,
  metalness,
  roughness,
}: InteractiveShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 128, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}

        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shape?: 'torus' | 'sphere' | 'box' | 'icosahedron'
  speed?: number
  scale?: number
  color?: string
  metalness?: number
  roughness?: number
}

export default function Scene({
  shape = 'torus',
  speed = 1.0,
  scale = 1.0,
  color = '#4f46e5',
  metalness = 0.9,
  roughness = 0.1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Sync background fog color with --background (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight
          position={[0, 10, 2]}
          angle={0.4}
          penumbra={1}
          intensity={2.0}
          color="#a5b4fc"
        />

        <InteractiveShape
          shape={shape}
          speed={speed}
          scale={scale}
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </Canvas>
    </div>
  )
}
