'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  particlesEnabled?: boolean
}

// Pseudo-random generator to avoid React 19 purity warnings
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function StarParticles({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 20
      sc[i] = pseudoRandom(seed++) * 0.05 + 0.01
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.015
  })

  return (
    <points ref={pointsRef}>
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
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2 * (speed / 1.5)
    meshRef.current.rotation.y = time * 0.3 * (speed / 1.5)
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32]} />
    }
  }, [shape])

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.4,
  wireframe = false,
  particlesEnabled = true,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.7} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          color="#a5b4fc"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#c084fc" />
        <directionalLight position={[0, -5, 5]} intensity={0.5} color="#38bdf8" />

        {particlesEnabled && <StarParticles count={900} />}

        <AnimatedShape
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
