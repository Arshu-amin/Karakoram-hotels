'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type ShapeType = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'torus'

export interface SceneProps {
  shape?: ShapeType
  speed?: number
  scale?: number
  distort?: number
  color?: string
  wireframe?: boolean
}

function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 20

      col[i * 3] = 0.4 + pseudoRandom(seed++) * 0.5
      col[i * 3 + 1] = 0.6 + pseudoRandom(seed++) * 0.4
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function GeometryMesh({ shape }: { shape: ShapeType }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.2, 8]} />
    case 'dodecahedron':
      return <dodecahedronGeometry args={[1.2, 0]} />
    case 'torus':
      return <torusGeometry args={[1, 0.4, 32, 100]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.3, 128, 16]} />
  }
}

function InteractiveShape({
  shape = 'torusKnot',
  speed = 1.5,
  scale = 1,
  distort = 0.45,
  color = '#6366f1',
  wireframe = false
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * speed
    meshRef.current.rotation.y = time * 0.35 * speed
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        <GeometryMesh shape={shape} />
        {distort > 0 && !wireframe ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.8}
            distort={distort}
            roughness={0.2}
            metalness={0.8}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  speed = 1.5,
  scale = 1,
  distort = 0.45,
  color = '#6366f1',
  wireframe = false
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[0, 5, -5]} intensity={0.8} color="#a855f7" />

        <Particles count={150} />
        <InteractiveShape
          shape={shape}
          speed={speed}
          scale={scale}
          distort={distort}
          color={color}
          wireframe={wireframe}
        />
      </Canvas>
    </div>
  )
}
