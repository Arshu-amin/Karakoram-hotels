'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus' | 'octahedron'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  metalness?: number
  roughness?: number
}

// Deterministic pseudo-random generator to remain purely deterministic in React 19
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 16

      // Gradient colors from Indigo to Purple to Cyan
      const r = 0.3 + pseudoRandom(seed++) * 0.4
      const g = 0.4 + pseudoRandom(seed++) * 0.5
      const b = 0.8 + pseudoRandom(seed++) * 0.2
      col[i * 3] = r
      col[i * 3 + 1] = g
      col[i * 3 + 2] = b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.02
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

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  metalness = 0.5,
  roughness = 0.2,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * (speed * 0.1)
    meshRef.current.rotation.y = time * (speed * 0.15)
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.3, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.6, 2]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 0.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {distort > 0 ? (
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            metalness={metalness}
            roughness={roughness}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

function SecondaryFloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15
      ring1Ref.current.rotation.z = time * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * -0.12
      ring2Ref.current.rotation.x = time * -0.18
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} wireframe />
      </mesh>
    </>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  metalness = 0.5,
  roughness = 0.2,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -5, -5]} intensity={1} color="#a855f7" />
        <pointLight position={[8, 5, -2]} intensity={1.2} color="#38bdf8" />

        {/* 3D Elements */}
        <ParticleField />
        <SecondaryFloatingRings />
        <MainShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          metalness={metalness}
          roughness={roughness}
        />
      </Canvas>
    </div>
  )
}
