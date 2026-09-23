'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'sphere' | 'icosahedron' | 'box' | 'torus'

export interface SceneConfig {
  shape: ShapeType
  color: string
  speed: number
  distort: number
  wireframe: boolean
  particleCount: number
  roughness: number
  metalness: number
}

// Deterministic pseudo-random number generator to satisfy React 19 / Next.js purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 200 }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 20

      col[i * 3] = pseudoRandom(seed++) * 0.5 + 0.5
      col[i * 3 + 1] = pseudoRandom(seed++) * 0.3 + 0.3
      col[i * 3 + 2] = pseudoRandom(seed++) * 0.8 + 0.2
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = time * 0.015
    }
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.2 * config.speed
      meshRef.current.rotation.y = time * 0.3 * config.speed
    }
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 8]} />
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={1.5 * config.speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={config.color}
          speed={2 * config.speed}
          distort={config.distort}
          wireframe={config.wireframe}
          roughness={config.roughness}
          metalness={config.metalness}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  config?: SceneConfig
}

const defaultConfig: SceneConfig = {
  shape: 'torusKnot',
  color: '#6366f1',
  speed: 1,
  distort: 0.4,
  wireframe: false,
  particleCount: 250,
  roughness: 0.2,
  metalness: 0.8,
}

export default function Scene({ config = defaultConfig }: SceneProps) {
  const mergedConfig = { ...defaultConfig, ...config }

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 5, -5]} intensity={1} color="#38bdf8" />

        <AnimatedShape config={mergedConfig} />
        <ParticleField count={mergedConfig.particleCount} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5 * mergedConfig.speed}
        />
      </Canvas>
    </div>
  )
}
