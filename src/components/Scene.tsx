'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'cube'

export interface SceneConfig {
  shape?: ShapeType
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  distort?: number
}

interface SceneProps {
  config?: SceneConfig
}

// Deterministic pseudo-random number generator to maintain render purity (React 19 / Next.js 16)
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function StarfieldParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 6 + pseudoRandom(i * 3) * 12
      const theta = pseudoRandom(i * 3 + 1) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i * 3 + 2) - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a855f7"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime()
      ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.4
      ringRef.current.rotation.y = time * 0.2
      ringRef.current.rotation.z = Math.cos(time * 0.2) * 0.2
    }
  })

  return (
    <mesh ref={ringRef} scale={2.2}>
      <torusGeometry args={[1.5, 0.015, 16, 100]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} wireframe />
    </mesh>
  )
}

function MainObject({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const {
    shape = 'torusKnot',
    color = '#6366f1',
    speed = 1.5,
    scale = 1.2,
    wireframe = false,
    distort = 0.4,
  } = config

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * (speed * 0.5)
      meshRef.current.rotation.x = time * 0.4
      meshRef.current.rotation.y = time * 0.6
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.15
    }
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 3]} />
      case 'sphere':
        return <sphereGeometry args={[1.1, 64, 64]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32]} />
    }
  }, [shape])

  return (
    <Float speed={speed * 1.2} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={meshRef} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          speed={speed * 1.5}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({ config = {} }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 5, -5]} intensity={1.2} color="#38bdf8" />

        {/* 3D Elements */}
        <MainObject config={config} />
        <FloatingRing />
        <StarfieldParticles count={250} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
