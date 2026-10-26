'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  shape?: 'torus' | 'sphere' | 'icosahedron'
  scale?: number
}

// Particle field around the 3D element
function Particles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    // Deterministic pseudo-random distribution
    function pseudoRandom(seed: number) {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 12
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 12
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 12
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03
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
        size={0.04}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  color = '#4f46e5',
  speed = 2,
  distort = 0.4,
  wireframe = false,
  shape = 'torus',
  scale = 1
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.25
      meshRef.current.rotation.y = time * 0.35
    }
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.4, 8]} />}
        {(shape === 'torus' || !shape) && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
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

function BackgroundRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * -0.1
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -2]} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[3.2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.25} wireframe />
    </mesh>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#38bdf8" />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <MainShape {...props} />
        <BackgroundRing />
        <Particles count={100} />
      </Canvas>
    </div>
  )
}
