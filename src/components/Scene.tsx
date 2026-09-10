'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape?: 'torus' | 'icosahedron' | 'sphere' | 'cyberRing'
  color?: string
  speed?: number
  distort?: number
  scale?: number
  wireframe?: boolean
}

// Deterministic pseudo-random number generator to satisfy purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20

      // Blue / Purple glowing tint
      col[i * 3] = 0.3 + pseudoRandom(i * 3 + 4) * 0.4
      col[i * 3 + 1] = 0.5 + pseudoRandom(i * 3 + 5) * 0.5
      col[i * 3 + 2] = 0.9 + pseudoRandom(i * 3 + 6) * 0.1
    }
    return { positions: pos, colors: col }
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
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torus',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.35,
  scale = 1,
  wireframe = false,
}: SceneConfig) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed * 0.4
      meshRef.current.rotation.x = time * 0.6
      meshRef.current.rotation.y = time * 0.8
      meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.2
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 4]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'cyberRing':
        return <torusGeometry args={[1.3, 0.25, 32, 100]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {renderGeometry()}
        {shape === 'sphere' || shape === 'icosahedron' ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distort}
            wireframe={wireframe}
            roughness={0.2}
            metalness={0.8}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({ config }: { config?: SceneConfig }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#ec4899" />
        <pointLight position={[0, 5, -5]} intensity={0.8} color="#38bdf8" />

        <ParticleField count={400} />
        <AnimatedShape {...config} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
