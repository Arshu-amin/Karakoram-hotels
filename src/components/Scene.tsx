'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  distort?: number
  speed?: number
  scale?: number
  wireframe?: boolean
}

function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = ['#818cf8', '#c084fc', '#38bdf8', '#6366f1']

    for (let i = 0; i < count; i++) {
      // Simple deterministic pseudo-random formula
      const x = ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 16 - 8
      const y = ((Math.sin(i * 78.233) * 43758.5453) % 1) * 16 - 8
      const z = ((Math.sin(i * 45.164) * 43758.5453) % 1) * 16 - 8

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      const color = new THREE.Color(palette[i % palette.length])
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainGeometry({ shape = 'torusKnot' }: { shape: ShapeType }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.3, 4]} />
    case 'sphere':
      return <sphereGeometry args={[1.2, 64, 64]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.3, 128, 16]} />
  }
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  distort = 0.4,
  speed = 2,
  scale = 1,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * (speed / 2)
      meshRef.current.rotation.y = time * 0.25 * (speed / 2)
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        <MainGeometry shape={shape} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  distort = 0.4,
  speed = 2,
  scale = 1,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 4, 12]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#6366f1" />

        <Particles count={150} />
        <AnimatedShape
          shape={shape}
          color={color}
          distort={distort}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />
      </Canvas>
    </div>
  )
}
