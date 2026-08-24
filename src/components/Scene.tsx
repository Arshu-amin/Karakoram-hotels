'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'sphere'

export interface SceneConfig {
  shape: ShapeType
  color: string
  speed: number
  scale: number
  wireframe: boolean
  distort: boolean
}

export const defaultConfig: SceneConfig = {
  shape: 'torusKnot',
  color: '#6366f1',
  speed: 1,
  scale: 1,
  wireframe: false,
  distort: true,
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Particles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (pseudoRandom(i + 1) - 0.5) * 16
    }
    return pos
  })

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.04
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
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * config.speed
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.4
  })

  return (
    <Float speed={config.speed * 1.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} scale={config.scale}>
        {config.shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {config.shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 2]} />}
        {config.shape === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
        {config.shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}

        {config.distort ? (
          <MeshDistortMaterial
            color={config.color}
            speed={config.speed * 2}
            distort={0.45}
            wireframe={config.wireframe}
            roughness={0.2}
            metalness={0.8}
          />
        ) : (
          <meshPhysicalMaterial
            color={config.color}
            wireframe={config.wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

export interface SceneProps {
  config?: SceneConfig
}

export default function Scene({ config = defaultConfig }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#c084fc" />
        <directionalLight position={[0, -5, 5]} intensity={0.5} color="#38bdf8" />

        <AnimatedShape config={config} />
        <Particles />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
