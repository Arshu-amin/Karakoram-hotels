'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape: 'torusKnot' | 'icosahedron' | 'sphere' | 'box' | 'torus'
  speed: number
  scale: number
  color: string
  wireframe: boolean
  particleCount: number
  distort: number
  metalness: number
  roughness: number
}

interface SceneProps {
  config?: Partial<SceneConfig>
}

const defaultConfig: SceneConfig = {
  shape: 'torusKnot',
  speed: 1,
  scale: 1,
  color: '#6366f1',
  wireframe: false,
  particleCount: 1500,
  distort: 0.4,
  metalness: 0.8,
  roughness: 0.2,
}

// Deterministic pseudo-random number generator to comply with React 19 render purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 1500 }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const posArr = new Float32Array(count * 3)
    let seed = 42
    for (let i = 0; i < count * 3; i += 3) {
      seed += 1
      const radius = 8 + pseudoRandom(seed) * 20
      seed += 1
      const theta = pseudoRandom(seed) * Math.PI * 2
      seed += 1
      const phi = Math.acos(pseudoRandom(seed) * 2 - 1)

      posArr[i] = radius * Math.sin(phi) * Math.cos(theta)
      posArr[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArr[i + 2] = radius * Math.cos(phi)
    }
    return posArr
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
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
        size={0.04}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.5 + Math.PI / 3
      ringRef.current.rotation.y = time * 0.4
    }
  })

  return (
    <mesh ref={ringRef} scale={1.8}>
      <torusGeometry args={[1.6, 0.015, 32, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  )
}

function MainGeometry({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 * config.speed
      meshRef.current.rotation.y = time * 0.3 * config.speed
      // Gentle floating sine motion
      meshRef.current.position.y = Math.sin(time * 1.5) * 0.15
    }
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 4]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.6, 1.6, 1.6]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float
      speed={2 * config.speed}
      rotationIntensity={1}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef} scale={config.scale}>
        {renderGeometry()}
        {config.distort > 0 ? (
          <MeshDistortMaterial
            color={config.color}
            speed={2 * config.speed}
            distort={config.distort}
            wireframe={config.wireframe}
            roughness={config.roughness}
            metalness={config.metalness}
          />
        ) : (
          <meshPhysicalMaterial
            color={config.color}
            wireframe={config.wireframe}
            roughness={config.roughness}
            metalness={config.metalness}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            reflectivity={0.9}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({ config = {} }: SceneProps) {
  const mergedConfig = { ...defaultConfig, ...config }

  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[10, -5, -5]} intensity={0.8} color="#e879f9" />

        {/* 3D Elements */}
        <ParticleField count={mergedConfig.particleCount} />
        <FloatingRing color={mergedConfig.color} />
        <MainGeometry config={mergedConfig} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  )
}
