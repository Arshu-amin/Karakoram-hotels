'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'box'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  wireframe?: boolean
  scale?: number
  roughness?: number
  metalness?: number
  distort?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particlePositions = useMemo(() => {
    const count = 150
    const positions = new Float32Array(count * 3)
    let seed = 1
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (pseudoRandom(seed++) - 0.5) * 14
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = time * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  wireframe = false,
  scale = 1,
  roughness = 0.2,
  metalness = 0.8,
  distort = 0.35
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2 * scale, 3]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.3 * scale, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.2 * scale, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.4 * scale, 1.4 * scale, 1.4 * scale]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1 * scale, 0.35 * scale, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  wireframe = false,
  scale = 1,
  roughness = 0.2,
  metalness = 0.8,
  distort = 0.35
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.6} penumbra={1} color="#38bdf8" />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          wireframe={wireframe}
          scale={scale}
          roughness={roughness}
          metalness={metalness}
          distort={distort}
        />
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
