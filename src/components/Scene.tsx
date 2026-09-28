'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  speed?: number
  distort?: number
  scale?: number
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'
  color?: string
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null!)
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 15
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 15
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 15
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
    }
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
        size={0.035}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  speed = 1,
  distort = 0.4,
  scale = 1,
  shape = 'torusKnot',
  color = '#6366f1'
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * (0.3 * speed)
    meshRef.current.rotation.x = t
    meshRef.current.rotation.y = t * 1.2
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 16]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  speed = 1,
  distort = 0.4,
  scale = 1,
  shape = 'torusKnot',
  color = '#6366f1'
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#3b82f6" />

        <Stars radius={50} depth={50} count={1000} factor={3} saturation={0.5} fade speed={1} />
        <ParticleField />

        <AnimatedShape
          speed={speed}
          distort={distort}
          scale={scale}
          shape={shape}
          color={color}
        />

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
