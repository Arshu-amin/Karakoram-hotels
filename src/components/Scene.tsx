'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}

// Deterministic pseudo-random number generator to satisfy React 19 / Next.js purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 350

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const u = pseudoRandom(i * 3 + 1)
      const v = pseudoRandom(i * 3 + 2)
      const w = pseudoRandom(i * 3 + 3)

      const radius = 6 + u * 10
      const theta = v * 2 * Math.PI
      const phi = Math.acos(2 * w - 1)

      pos[idx] = radius * Math.sin(phi) * Math.cos(theta)
      pos[idx + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[idx + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = t * 0.015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing({ radius, color, rotationAxis, speed }: { radius: number; color: string; rotationAxis: 'x' | 'y' | 'z'; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime() * speed
      if (rotationAxis === 'x') ringRef.current.rotation.x = t
      if (rotationAxis === 'y') ringRef.current.rotation.y = t
      if (rotationAxis === 'z') ringRef.current.rotation.z = t
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} wireframe={false} />
    </mesh>
  )
}

function MainShape({ shape = 'torusKnot', color = '#6366f1', wireframe = false, speed = 1.8, distort = 0.4 }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * (speed * 0.5)
      meshRef.current.rotation.x = time * 0.35
      meshRef.current.rotation.y = time * 0.45
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.15
    }
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.34, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 2]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.75}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.8,
  distort = 0.4,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -4, -4]} intensity={1.2} color="#a855f7" />
        <pointLight position={[6, -4, 4]} intensity={1.2} color="#38bdf8" />

        <Starfield />
        <FloatingRing radius={2.2} color="#6366f1" rotationAxis="x" speed={0.4} />
        <FloatingRing radius={2.6} color="#ec4899" rotationAxis="y" speed={-0.3} />
        <FloatingRing radius={3.0} color="#38bdf8" rotationAxis="z" speed={0.25} />

        <MainShape
          shape={shape}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={speed * 0.3} />
      </Canvas>
    </div>
  )
}
