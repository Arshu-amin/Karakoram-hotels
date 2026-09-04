'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: 'torus' | 'icosahedron' | 'ring' | 'sphere'
  color?: string
  speed?: number
  distortion?: number
  scale?: number
  showParticles?: boolean
}

// Deterministic pseudo-random number generator to satisfy React 19 purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      pos[idx] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      pos[idx + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18
      pos[idx + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 12

      // Subtle cyan/indigo colors for particles
      col[idx] = 0.3 + pseudoRandom(i * 3 + 4) * 0.4 // R
      col[idx + 1] = 0.5 + pseudoRandom(i * 3 + 5) * 0.5 // G
      col[idx + 2] = 0.9 // B
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

function AnimatedShape({
  shape = 'torus',
  color = '#6366f1',
  speed = 2,
  distortion = 0.4,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 8]} />}
        {shape === 'ring' && <torusGeometry args={[1.2, 0.3, 32, 100]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distortion}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torus',
  color = '#6366f1',
  speed = 2,
  distortion = 0.4,
  scale = 1,
  showParticles = true,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color={color} />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#38bdf8" />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          distortion={distortion}
          scale={scale}
        />

        {showParticles && <ParticleField count={150} />}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
