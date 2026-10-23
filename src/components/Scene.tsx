'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Pseudo-random number generator for deterministic rendering without purity lint warnings
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'torus' | 'sphere'
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  distort?: number
}

function StarParticles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 15
      sc[i] = pseudoRandom(seed++) * 0.05 + 0.02
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
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
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#38bdf8"
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
  scale = 1.2,
  wireframe = false,
  distort = 0.3,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
      meshRef.current.rotation.z = time * 0.1 * speed
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 8]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        {distort > 0 && !wireframe ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 2}
            distort={distort}
            roughness={0.2}
            metalness={0.8}
            wireframe={wireframe}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={wireframe}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[0, 5, 0]} intensity={1} color="#a855f7" />

        <StarParticles count={200} />
        <AnimatedShape {...props} />
      </Canvas>
    </div>
  )
}
