'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'crystal' | 'sphere' | 'ring'
  color?: string
  rotationSpeed?: number
  distort?: number
  wireframe?: boolean
  particleCount?: number
  scale?: number
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  rotationSpeed = 1,
  distort = 0.4,
  wireframe = false,
  scale = 1
}: Omit<SceneProps, 'particleCount'>) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * rotationSpeed
    meshRef.current.rotation.y = time * 0.35 * rotationSpeed
    meshRef.current.rotation.z = time * 0.1 * rotationSpeed
  })

  return (
    <Float speed={1.5 * rotationSpeed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.32, 128, 32]} />}
        {shape === 'crystal' && <icosahedronGeometry args={[1.2, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.1, 64, 64]} />}
        {shape === 'ring' && <torusGeometry args={[1.2, 0.25, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={2 * rotationSpeed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function DeterministicParticles({ count = 120, color = '#a855f7' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    // Deterministic pseudo-random number generator
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      const r = 3.5 + pseudoRandom(i * 3 + 1) * 6
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = (pseudoRandom(i * 3 + 3) - 0.5) * Math.PI

      pos[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      pos[i * 3 + 1] = r * Math.sin(phi)
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)

      sc[i] = pseudoRandom(i + 100) * 0.08 + 0.02
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
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
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  rotationSpeed = 1,
  distort = 0.4,
  wireframe = false,
  particleCount = 120,
  scale = 1
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={color} />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#a855f7" />

        <MainShape
          shape={shape}
          color={color}
          rotationSpeed={rotationSpeed}
          distort={distort}
          wireframe={wireframe}
          scale={scale}
        />

        <DeterministicParticles count={particleCount} color={color} />
      </Canvas>
    </div>
  )
}
