'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Pseudo-random generator for render purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export interface SceneConfig {
  shape: 'torus' | 'sphere' | 'icosahedron' | 'octahedron'
  color: string
  speed: number
  wireframe: boolean
  scale: number
  distort: number
}

interface AnimatedShapeProps {
  config: SceneConfig
}

function AnimatedShape({ config }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * config.speed
    meshRef.current.rotation.y = time * 0.35 * config.speed
    meshRef.current.rotation.z = time * 0.1 * config.speed
  })

  const geometry = useMemo(() => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 1]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.5, 0]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }, [config.shape])

  return (
    <Float speed={2 * config.speed} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={config.scale}>
        {geometry}
        <meshPhysicalMaterial
          color={config.color}
          wireframe={config.wireframe}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          emissive={config.color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const count = 1200
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    let seed = 42
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 30
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 30
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 30

      const hue = pseudoRandom(seed++)
      const color = new THREE.Color().setHSL(hue * 0.2 + 0.6, 0.8, 0.7)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return [pos, col]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05
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

const defaultConfig: SceneConfig = {
  shape: 'torus',
  color: '#6366f1',
  speed: 1,
  wireframe: false,
  scale: 1,
  distort: 0.4,
}

export default function Scene({ config = defaultConfig }: { config?: SceneConfig }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 25]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#38bdf8" />

        <AnimatedShape config={config} />
        <ParticleField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
