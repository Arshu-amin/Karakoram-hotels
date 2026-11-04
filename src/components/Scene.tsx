'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  wireframe?: boolean
  distort?: number
  speed?: number
  roughness?: number
  metalness?: number
}

// Particle field around the 3D scene using deterministic pseudo-random generator
function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    // Deterministic pseudo-random sequence for SSR purity
    let seed = 42
    const pseudoRandom = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    for (let i = 0; i < count; i++) {
      const radius = 4 + pseudoRandom() * 6
      const theta = pseudoRandom() * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return [pos]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
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

function MainShape({
  geometry = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  distort = 0.4,
  speed = 2,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * (0.2 * speed * 0.5)
    meshRef.current.rotation.y = time * (0.3 * speed * 0.5)
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {geometry === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 4]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {geometry === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

// Subtle orbital decorative ring
function OrbitalRing({ color = '#c084fc' }: { color?: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.3) * 0.2
    ringRef.current.rotation.y = time * 0.2
    ringRef.current.rotation.z = time * 0.1
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        wireframe={false}
      />
    </mesh>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#818cf8" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#ec4899" />

        <MainShape {...props} />
        <OrbitalRing color={props.color || '#a855f7'} />
        <ParticleField count={150} />
      </Canvas>
    </div>
  )
}
