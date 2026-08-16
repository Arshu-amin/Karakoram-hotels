'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'octahedron'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  speed?: number
  distort?: number
  metalness?: number
  roughness?: number
  scale?: number
}

function AnimatedShape({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.4,
  metalness = 0.6,
  roughness = 0.2,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
      // Mouse interaction parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (state.pointer.x * 0.8),
        0.05
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (state.pointer.y * 0.8),
        0.05
      )
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {geometry === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 4]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.4, 2]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </Float>
  )
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.3
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[2.5, 0.015, 16, 100]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
    </mesh>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#3b82f6" />

        <AnimatedShape {...props} />
        <FloatingRing />

        <Sparkles
          count={70}
          scale={10}
          size={3}
          speed={0.4}
          opacity={0.6}
          color="#818cf8"
        />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
