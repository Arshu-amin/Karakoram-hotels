'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  color: string
  speed: number
  scale?: number
}

// Ensure strict component purity by wrapping Math.random() or using deterministic seed-based positions/sizes inside component code
function FloatingSphere({ position, color, speed, scale = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

function FloatingTorus({ position, color, speed, scale = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.cos(time * speed) * 0.25
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[0.8, 0.25, 32, 100]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.9}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </mesh>
  )
}

function FloatingCone({ position, color, speed, scale = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * speed * 1.2) * 0.15
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.z = time * 0.25
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <coneGeometry args={[0.7, 1.4, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.7}
        clearcoat={0.9}
        clearcoatRoughness={0.15}
      />
    </mesh>
  )
}

// Deterministic array generation for floating particles to keep strict component purity
const PARTICLE_COUNT = 45
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)

    // Using a deterministic LCG pseudo-random generator for render purity
    let seed = 42
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 12
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 12
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    particlesRef.current.rotation.y = time * 0.03
    particlesRef.current.rotation.x = time * 0.015
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.1}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Set Fog matching global background color */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Ambient & Spotlight lighting for shiny physical materials */}
        <ambientLight intensity={1.2} />
        <spotLight
          position={[8, 8, 8]}
          angle={0.3}
          penumbra={1}
          intensity={4}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#a5b4fc" />
        <pointLight position={[10, -10, 5]} intensity={2} color="#f472b6" />

        {/* Main 3D Floating Objects */}
        <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
          <FloatingSphere position={[1.8, 1, 0]} color="#4f46e5" speed={0.8} scale={0.9} />
        </Float>

        <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
          <FloatingTorus position={[-2.2, -1, 0.5]} color="#f472b6" speed={0.6} scale={1.1} />
        </Float>

        <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
          <FloatingCone position={[0, -2, -1]} color="#db2777" speed={0.9} scale={0.8} />
        </Float>

        {/* Floating particles network background */}
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
