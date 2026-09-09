'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic pseudo-random helper to comply with React 19 render purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'torus'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  roughness?: number
  metalness?: number
  scale?: number
  particleCount?: number
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const posArr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      posArr[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      posArr[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18
      posArr[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 18
    }
    return posArr
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = time * 0.015
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

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  distort = 0.35,
  wireframe = false,
  roughness = 0.2,
  metalness = 0.8,
  scale = 1.0,
}: Omit<SceneProps, 'particleCount'>) {
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
        return <icosahedronGeometry args={[1.3 * scale, 4]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4 * scale, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.2 * scale, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.1 * scale, 0.4 * scale, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.0 * scale, 0.32 * scale, 128, 32]} />
    }
  }

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {distort > 0.01 ? (
          <MeshDistortMaterial
            color={color}
            speed={2 * speed}
            distort={distort}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  distort = 0.35,
  wireframe = false,
  roughness = 0.2,
  metalness = 0.8,
  scale = 1.0,
  particleCount = 90,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          color="#a855f7"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#38bdf8" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} color="#ffffff" />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          scale={scale}
        />

        <FloatingParticles count={particleCount} />

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
