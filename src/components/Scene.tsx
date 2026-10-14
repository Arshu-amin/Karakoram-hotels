'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'torus' | 'box'
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
}

// Pseudo-random number generator for React 19 purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = pseudoRandom(i * 3 + 1)
      const v = pseudoRandom(i * 3 + 2)
      const w = pseudoRandom(i * 3 + 3)
      pos[i * 3] = (u - 0.5) * 18
      pos[i * 3 + 1] = (v - 0.5) * 18
      pos[i * 3 + 2] = (w - 0.5) * 18
    }
    return pos
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
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedGeometry({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
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
        return <icosahedronGeometry args={[1.3, 2]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.5, 0]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.8,
  distort = 0.35,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <spotLight
          position={[0, 8, 8]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />

        <ParticleField count={400} />
        <Stars radius={50} depth={50} count={1200} factor={3} saturation={0} fade speed={1} />

        <AnimatedGeometry
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
