'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torus' | 'icosahedron' | 'sphere' | 'cube'
  color?: string
  speed?: number
  scale?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Particles({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 16
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = time * 0.02
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
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torus',
  color = '#6366f1',
  speed = 1,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.4
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'cube':
        return <boxGeometry args={[1.6, 1.6, 1.6]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torus',
  color = '#6366f1',
  speed = 1,
  scale = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#3b82f6" />
        <pointLight position={[10, -5, 5]} intensity={1} color="#a855f7" />

        <Particles />
        <AnimatedShape shape={shape} color={color} speed={speed} scale={scale} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
