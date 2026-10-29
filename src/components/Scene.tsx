'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape: 'torus' | 'sphere' | 'crystal' | 'ring'
  color: string
  speed: number
  distort: number
  wireframe: boolean
  particlesCount: number
}

interface SceneProps {
  config?: SceneConfig
}

const defaultConfig: SceneConfig = {
  shape: 'torus',
  color: '#6366f1',
  speed: 1.5,
  distort: 0.4,
  wireframe: false,
  particlesCount: 200,
}

// Deterministic pseudo random generator to keep renders pure
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count }: { count: number }) {
  const particlesRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20
      sc[i] = pseudoRandom(i + 100) * 0.08 + 0.02
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!particlesRef.current) return
    const time = state.clock.getElapsedTime()
    particlesRef.current.rotation.y = time * 0.03
    particlesRef.current.rotation.x = time * 0.02
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2 * config.speed
    meshRef.current.rotation.y = time * 0.3 * config.speed
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'crystal':
        return <icosahedronGeometry args={[1.4, 0]} />
      case 'ring':
        return <torusGeometry args={[1.5, 0.25, 32, 100]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float
      speed={config.speed * 1.5}
      rotationIntensity={1}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef}>
        {renderGeometry()}
        {config.distort > 0 && config.shape !== 'ring' ? (
          <MeshDistortMaterial
            color={config.color}
            speed={config.speed * 2}
            distort={config.distort}
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
            clearcoatRoughness={0.2}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({ config = defaultConfig }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={config.color} />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.8}
          penumbra={1}
          color="#a855f7"
        />

        <ParticleField count={config.particlesCount} />
        <MainShape config={config} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={config.speed * 1.2}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
