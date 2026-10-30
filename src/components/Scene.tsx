'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Simple deterministic pseudo-random generator to avoid impure Math.random() in React render
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryShape = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  shape?: GeometryShape
  wireframe?: boolean
}

function ParticleField() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 18

      col[i * 3] = 0.3 + pseudoRandom(seed++) * 0.4 // R
      col[i * 3 + 1] = 0.5 + pseudoRandom(seed++) * 0.5 // G
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1 // B
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  color = '#4f46e5',
  speed = 1,
  scale = 1,
  shape = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.25 * speed
      meshRef.current.rotation.y = time * 0.35 * speed
      meshRef.current.rotation.z = time * 0.1 * speed
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 3]} />
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function FloatingRing({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime()
      ringRef.current.rotation.x = time * 0.4 * speed
      ringRef.current.rotation.y = time * 0.2 * speed
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
    </mesh>
  )
}

export default function Scene({
  color = '#6366f1',
  speed = 1,
  scale = 1,
  shape = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[0, 5, -2]} intensity={2} color="#c084fc" />

        <ParticleField />
        <MainShape color={color} speed={speed} scale={scale} shape={shape} wireframe={wireframe} />
        <FloatingRing position={[0, 0, 0]} color={color} speed={speed} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  )
}
