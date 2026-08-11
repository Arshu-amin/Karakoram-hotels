'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  color: string
  speed: number
  scale: number
  shape: 'torusKnot' | 'sphere' | 'box' | 'icosahedron'
}

function AnimatedShape({ color, speed, scale, shape }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Animation speed is controlled dynamically from UI
    const rotSpeedX = speed * 0.1
    const rotSpeedY = speed * 0.15

    meshRef.current.rotation.x = time * rotSpeedX
    meshRef.current.rotation.y = time * rotSpeedY
  })

  // Render the appropriate geometry based on control state
  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.3, 1.3, 1.3]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 1]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[0.9, 0.3, 128, 16]} />
    }
  }, [shape])

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {geometry}
        {/* Use high-performance glossy/clearcoat physical material with metalness to prevent context crashes */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

function SparklingParticles() {
  const pointsRef = useRef<THREE.Points>(null!)

  // Generate deterministic/pure pseudo-random positions for the particle field (avoiding purity issues)
  const positions = useMemo(() => {
    const particleCount = 200
    const coords = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      // Deterministic spread to ensure rendering stability and prevent render-time purity issues
      const seed = i * 23.45
      const r = 10 + (Math.sin(seed) * 5)
      const theta = seed
      const phi = seed * 1.5

      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      coords[i * 3 + 2] = r * Math.cos(phi)
    }
    return coords
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* Use args on bufferAttribute to satisfy strict TypeScript/constructor rules */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  )
}

interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  shape?: 'torusKnot' | 'sphere' | 'box' | 'icosahedron'
}

export default function Scene({
  color = '#6366f1',
  speed = 1.5,
  scale = 1.0,
  shape = 'torusKnot',
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Synchronize fog color with background css variable (#020617) for visual integration */}
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <AnimatedShape color={color} speed={speed} scale={scale} shape={shape} />
        <SparklingParticles />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
