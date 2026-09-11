'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron'
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
  metalness?: number
  roughness?: number
}

function Particles({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    let seed = 42
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random coordinates
      const r1 = (Math.sin(seed++) * 10000 - Math.floor(Math.sin(seed) * 10000))
      const r2 = (Math.sin(seed++) * 10000 - Math.floor(Math.sin(seed) * 10000))
      const r3 = (Math.sin(seed++) * 10000 - Math.floor(Math.sin(seed) * 10000))

      pos[i * 3] = (r1 - 0.5) * 20
      pos[i * 3 + 1] = (r2 - 0.5) * 20
      pos[i * 3 + 2] = (r3 - 0.5) * 20
    }
    return pos
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
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedGeometry({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.5,
  distort = 0.3,
  metalness = 0.2,
  roughness = 0.2,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.6, 8]} />
      case 'torus':
        return <torusGeometry args={[1.3, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.8, 4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {distort > 0 && !wireframe ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distort}
            wireframe={wireframe}
            metalness={metalness}
            roughness={roughness}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            metalness={metalness}
            roughness={roughness}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[10, -5, 5]} intensity={0.8} color="#3b82f6" />
        <AnimatedGeometry {...props} />
        <Particles count={300} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
