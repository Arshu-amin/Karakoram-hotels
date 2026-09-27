'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Helper for deterministic pseudo-random number generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryType = 'torusKnot' | 'sphere' | 'icosahedron' | 'octahedron' | 'box' | 'cylinder'

export interface SceneProps {
  geometryShape?: GeometryType
  speed?: number
  distort?: number
  scale?: number
  color?: string
  wireframe?: boolean
  isPaused?: boolean
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    let seed = 42
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 16

      // Particle colors (shades of indigo, purple, cyan)
      col[i * 3] = 0.4 + pseudoRandom(seed++) * 0.4 // R
      col[i * 3 + 1] = 0.5 + pseudoRandom(seed++) * 0.4 // G
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1 // B
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.15
    pointsRef.current.rotation.y = time
    pointsRef.current.rotation.x = time * 0.5
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  geometryShape = 'torusKnot',
  speed = 2,
  distort = 0.4,
  scale = 1,
  color = '#6366f1',
  wireframe = false,
  isPaused = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (isPaused || !meshRef.current) return
    const time = state.clock.getElapsedTime()
    const currentSpeed = speed * 0.2
    meshRef.current.rotation.x = time * currentSpeed
    meshRef.current.rotation.y = time * (currentSpeed * 1.2)
  })

  const renderGeometry = () => {
    switch (geometryShape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 2]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 0]} />
      case 'box':
        return <boxGeometry args={[1.8, 1.8, 1.8]} />
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2, 32]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float
      speed={isPaused ? 0 : speed}
      rotationIntensity={isPaused ? 0 : 0.8}
      floatIntensity={isPaused ? 0 : 1}
    >
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={isPaused ? 0 : speed}
          distort={distort}
          wireframe={wireframe}
          metalness={0.2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  geometryShape = 'torusKnot',
  speed = 2,
  distort = 0.4,
  scale = 1,
  color = '#6366f1',
  wireframe = false,
  isPaused = false,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <pointLight position={[0, 5, 2]} intensity={1} color="#c084fc" />

        {/* 3D Content */}
        <FloatingParticles count={150} />
        <AnimatedShape
          geometryShape={geometryShape}
          speed={speed}
          distort={distort}
          scale={scale}
          color={color}
          wireframe={wireframe}
          isPaused={isPaused}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
