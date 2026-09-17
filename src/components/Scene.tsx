'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'icosahedron' | 'cube'
  color?: string
  speed?: number
  scale?: number
  distort?: number
}

// Deterministic pseudo-random number generator for particles
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions } = useMemo(() => {
    const particleCount = 200
    const pos = new Float32Array(particleCount * 3)
    let seed = 42

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 20
    }

    return { positions: pos }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = time * 0.02
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

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  scale = 1,
}: {
  shape: 'torusKnot' | 'sphere' | 'icosahedron' | 'cube'
  color: string
  speed: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.4
    }
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 0]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }, [shape])

  return (
    <Float speed={1.5 * speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {geometry}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  scale = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 4, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#38bdf8" />

        <ParticleField />
        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
