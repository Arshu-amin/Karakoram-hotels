'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic pseudo-random number generator for pure React rendering
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  speed?: number
  distort?: number
  color?: string
  geometry?: GeometryType
  wireframe?: boolean
  particlesCount?: number
  autoRotate?: boolean
}

function ParticleField({ count = 120, color = '#6366f1' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sca = new Float32Array(count)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 16
      sca[i] = pseudoRandom(seed++) * 1.5 + 0.5
    }

    return [pos, sca]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.15
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
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MainShape({
  speed = 2,
  distort = 0.4,
  color = '#6366f1',
  geometry = 'torusKnot',
  wireframe = false,
  autoRotate = true,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current || !autoRotate) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * (speed / 2)
    meshRef.current.rotation.y = time * 0.25 * (speed / 2)
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
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

export default function Scene({
  speed = 2,
  distort = 0.4,
  color = '#6366f1',
  geometry = 'torusKnot',
  wireframe = false,
  particlesCount = 120,
  autoRotate = true,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={color} />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.6} penumbra={1} />

        <MainShape
          speed={speed}
          distort={distort}
          color={color}
          geometry={geometry}
          wireframe={wireframe}
          autoRotate={autoRotate}
        />

        <ParticleField count={particlesCount} color={color} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
