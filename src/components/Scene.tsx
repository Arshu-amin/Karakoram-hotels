'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'box' | 'octahedron'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  roughness?: number
  metalness?: number
}

// Particle field around the shape
function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    // Deterministic pseudo-random placement
    for (let i = 0; i < count; i++) {
      const radius = 4 + (i % 6) * 0.8
      const theta = (i * 137.5 * Math.PI) / 180
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = time * 0.03
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
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * (speed / 2)
      meshRef.current.rotation.y = time * 0.25 * (speed / 2)
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.6, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.5, 64, 64]} />
      case 'box':
        return <boxGeometry args={[2, 2, 2, 16, 16, 16]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.8, 4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.6} floatIntensity={1.2}>
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
  distort = 0.4,
  wireframe = false,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#38bdf8" />

        {/* Dynamic 3D Objects */}
        <MainShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
        />
        <FloatingParticles count={150} />
      </Canvas>
    </div>
  )
}
