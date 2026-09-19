'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'cube' | 'torus'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  speed?: number
  distort?: number
  metalness?: number
  roughness?: number
  scale?: number
  wireframe?: boolean
  particleCount?: number
}

function GeometryMesh({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  metalness = 0.8,
  roughness = 0.2,
  scale = 1.2,
  wireframe = false,
}: Omit<SceneProps, 'particleCount'>) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * (speed * 0.5)
    meshRef.current.rotation.x = time * 0.4
    meshRef.current.rotation.y = time * 0.6
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.15
  })

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }, [geometry])

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {geometryNode}
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    // Deterministic pseudo-random helper
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 18

      col[i * 3] = 0.4 + pseudoRandom(i * 3 + 4) * 0.6
      col[i * 3 + 1] = 0.5 + pseudoRandom(i * 3 + 5) * 0.5
      col[i * 3 + 2] = 0.9 + pseudoRandom(i * 3 + 6) * 0.1
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.4,
  metalness = 0.8,
  roughness = 0.2,
  scale = 1.1,
  wireframe = false,
  particleCount = 120,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        <pointLight position={[0, 5, 2]} intensity={2} color="#ec4899" />

        <GeometryMesh
          geometry={geometry}
          color={color}
          speed={speed}
          distort={distort}
          metalness={metalness}
          roughness={roughness}
          scale={scale}
          wireframe={wireframe}
        />

        <ParticleField count={particleCount} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={speed * 0.8}
        />
      </Canvas>
    </div>
  )
}
