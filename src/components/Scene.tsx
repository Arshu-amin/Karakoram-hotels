'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'octahedron'

export interface SceneConfig {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  scale?: number
  wireframe?: boolean
  roughness?: number
  metalness?: number
}

interface AnimatedShapeProps {
  config: SceneConfig
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null!)
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
    }
  })

  return (
    <points ref={particlesRef}>
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
      />
    </points>
  )
}

function AnimatedShape({ config }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const {
    shape = 'torusKnot',
    color = '#6366f1',
    speed = 2,
    distort = 0.4,
    scale = 1.2,
    wireframe = false,
    roughness = 0.2,
    metalness = 0.8,
  } = config

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * (0.1 * (speed * 0.5 + 0.5))
      meshRef.current.rotation.y = time * (0.2 * (speed * 0.5 + 0.5))
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 0.8} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  config?: SceneConfig
  enableControls?: boolean
}

export default function Scene({ config = {}, enableControls = true }: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[0, 5, 0]} intensity={1.2} color="#818cf8" />

        <ParticleField />
        <AnimatedShape config={config} />

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.6}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  )
}
