'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torus' | 'icosahedron' | 'dodecahedron' | 'sphere'

export interface SceneConfig {
  shape: ShapeType
  color: string
  speed: number
  distort: number
  wireframe: boolean
  scale: number
  particleCount: number
}

interface AnimatedShapeProps {
  config: SceneConfig
}

function AnimatedShape({ config }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * config.speed
    meshRef.current.rotation.y = time * 0.25 * config.speed
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 3]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.4, 0]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float
      speed={1.5 * config.speed}
      rotationIntensity={1}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef} scale={config.scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={config.color}
          speed={3 * config.speed}
          distort={config.distort}
          wireframe={config.wireframe}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette = ['#818cf8', '#c084fc', '#38bdf8', '#f472b6', '#6366f1']

    // Simple deterministic pseudo-random function to avoid React hooks purity lint warnings
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20

      const colorHex = palette[Math.floor(pseudoRandom(i * 3 + 4) * palette.length)]
      const color = new THREE.Color(colorHex)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return [pos, col]
  }, [count])

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
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export const defaultConfig: SceneConfig = {
  shape: 'torus',
  color: '#6366f1',
  speed: 1,
  distort: 0.4,
  wireframe: false,
  scale: 1,
  particleCount: 250,
}

interface SceneProps {
  config?: SceneConfig
}

export default function Scene({ config = defaultConfig }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />
        <pointLight position={[0, 5, -2]} intensity={2} color="#38bdf8" />

        {/* 3D Visual Objects */}
        <AnimatedShape config={config} />
        <ParticleField count={config.particleCount} />

        {/* User Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
