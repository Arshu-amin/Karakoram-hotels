'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic pseudo-random number generator to satisfy React 19 purity checks
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'cube'

export interface SceneProps {
  color?: string
  speed?: number
  distort?: number
  scale?: number
  wireframe?: boolean
  shape?: ShapeType
  autoRotate?: boolean
}

function ParticleField({ count = 150 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 15
      pos[i3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 15
      pos[i3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 15

      col[i3] = 0.4 + pseudoRandom(i * 3 + 4) * 0.4
      col[i3 + 1] = 0.3 + pseudoRandom(i * 3 + 5) * 0.5
      col[i3 + 2] = 0.9 + pseudoRandom(i * 3 + 6) * 0.1
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()
      particlesRef.current.rotation.y = time * 0.03
      particlesRef.current.rotation.x = time * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
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

function FloatingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime()
      ringRef.current.rotation.x = time * 0.4
      ringRef.current.rotation.y = time * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={ringRef} position={position}>
        <torusGeometry args={[0.7, 0.03, 16, 64]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  )
}

function MainShape({
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  scale = 1,
  wireframe = false,
  shape = 'torusKnot',
  autoRotate = true,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * (speed / 2)
      meshRef.current.rotation.y = time * 0.25 * (speed / 2)
    }
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'cube':
        return <boxGeometry args={[1.4, 1.4, 1.4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }, [shape])

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <pointLight position={[0, 5, -5]} intensity={1} color="#a855f7" />

        <ParticleField />
        <FloatingRing position={[-2.8, 1.5, -2]} color={props.color || '#6366f1'} />
        <FloatingRing position={[3, -1.8, -2]} color="#a855f7" />
        <MainShape {...props} />

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
