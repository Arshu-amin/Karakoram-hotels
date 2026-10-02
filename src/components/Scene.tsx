'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  shape?: 'torus' | 'icosahedron' | 'dodecahedron'
  wireframe?: boolean
}

const PARTICLE_COUNT = 150
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)

function pseudoRandom(seedIndex: number) {
  const x = Math.sin(seedIndex) * 10000
  return x - Math.floor(x)
}

for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
  particlePositions[i] = (pseudoRandom(i + 1) - 0.5) * 16
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!)

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
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  color = '#6366f1',
  speed = 1,
  scale = 1,
  shape = 'torus',
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.4
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
  })

  const getGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 1]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.3, 0]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1.1, 0.38, 128, 16]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {getGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  speed = 1,
  scale = 1,
  shape = 'torus',
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#ec4899" />
        <pointLight position={[0, 3, 2]} intensity={1.2} color="#38bdf8" />

        <MainShape
          color={color}
          speed={speed}
          scale={scale}
          shape={shape}
          wireframe={wireframe}
        />
        <Particles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
