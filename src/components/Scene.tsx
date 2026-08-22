'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  shape?: 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus'
  speed?: number
  roughness?: number
  metalness?: number
  wireframe?: boolean
}

function SelectedGeometry({ shape }: { shape: SceneProps['shape'] }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.3, 3]} />
    case 'octahedron':
      return <octahedronGeometry args={[1.4, 2]} />
    case 'torus':
      return <torusGeometry args={[1.1, 0.4, 32, 100]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
  }
}

function AnimatedShape({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  roughness = 0.2,
  metalness = 0.8,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.2 * speed
      meshRef.current.rotation.y = time * 0.3 * speed
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.2
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <SelectedGeometry shape={shape} />
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const seed = i * 1.61803398875
      const u = Math.sin(seed * 12.9898) * 43758.5453
      const v = Math.cos(seed * 78.233) * 43758.5453
      const w = Math.sin(seed * 45.164) * 43758.5453
      pos[i * 3] = ((u - Math.floor(u)) - 0.5) * 14
      pos[i * 3 + 1] = ((v - Math.floor(v)) - 0.5) * 14
      pos[i * 3 + 2] = ((w - Math.floor(w)) - 0.5) * 14
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
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingAccent({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * speed * 0.4
      meshRef.current.rotation.y = time * speed * 0.6
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  roughness = 0.2,
  metalness = 0.8,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <pointLight position={[0, 5, -2]} intensity={1.5} color="#c084fc" />

        <AnimatedShape
          color={color}
          shape={shape}
          speed={speed}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
        />

        <FloatingAccent position={[-2.8, 1.8, -2]} color="#38bdf8" speed={0.8} />
        <FloatingAccent position={[2.8, -1.6, -1.5]} color="#f472b6" speed={1.1} />

        <ParticleField count={220} />

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}
