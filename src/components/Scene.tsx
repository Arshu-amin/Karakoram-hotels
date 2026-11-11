'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  distortion?: number
  speed?: number
  wireframe?: boolean
}

// Pseudo-random generator to respect React 19 purity rules in useMemo
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      pos[idx] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      pos[idx + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18
      pos[idx + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 18
      sc[i] = pseudoRandom(i * 3 + 4) * 0.04 + 0.01
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.05
    pointsRef.current.rotation.y = time
    pointsRef.current.rotation.x = time * 0.5
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing({ radius = 2.5, color = '#6366f1', speed = 0.5 }: { radius?: number; color?: string; speed?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const t = state.clock.getElapsedTime() * speed
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2
    ringRef.current.rotation.y = t * 0.8
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  )
}

function MainAnimatedMesh({
  shape = 'torusKnot',
  color = '#6366f1',
  distortion = 0.35,
  speed = 1.8,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * (speed / 1.5)
    meshRef.current.rotation.y = time * 0.35 * (speed / 1.5)
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.34, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.35, 3]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}
        {shape === 'torus' && <torusGeometry args={[1.2, 0.45, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distortion}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  distortion = 0.35,
  speed = 1.8,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 4, 12]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#818cf8" />
        <pointLight position={[-10, -8, -5]} intensity={1.5} color="#ec4899" />
        <spotLight
          position={[0, 12, 6]}
          angle={0.4}
          penumbra={0.8}
          intensity={2}
          color="#38bdf8"
        />

        {/* 3D Visual Elements */}
        <ParticleField count={250} />
        <FloatingRing radius={2.2} color={color} speed={0.4} />
        <FloatingRing radius={2.8} color="#c084fc" speed={-0.3} />

        <MainAnimatedMesh
          shape={shape}
          color={color}
          distortion={distortion}
          speed={speed}
          wireframe={wireframe}
        />
      </Canvas>
    </div>
  )
}
