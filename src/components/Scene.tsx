'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus' | 'sphere'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

function SeededParticles({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    // Deterministic pseudo-random generation to ensure render purity
    let seed = 12345
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = time * 0.3
      pointsRef.current.rotation.y = time * 0.5
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

function OrbitRing({ radius, speed, rx, ry }: { radius: number; speed: number; rx: number; ry: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime() * speed
      ringRef.current.rotation.z = time
    }
  })

  return (
    <mesh ref={ringRef} rotation={[rx, ry, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 120]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.35} wireframe />
    </mesh>
  )
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.45,
  wireframe = false,
  scale = 1.1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    // Subtle float & rotation driven by time + subtle mouse interaction
    const targetRotX = time * 0.15 * speed + state.pointer.y * 0.4
    const targetRotY = time * 0.25 * speed + state.pointer.x * 0.4

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05)
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 8]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.3, 0]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed * 1.5}
          distort={distort}
          wireframe={wireframe}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#ec4899" />
        <spotLight position={[0, 10, 0]} intensity={1.0} color="#38bdf8" angle={0.6} penumbra={1} />

        <MainShape {...props} />
        <OrbitRing radius={2.2} speed={0.4} rx={Math.PI / 3} ry={Math.PI / 6} />
        <OrbitRing radius={2.8} speed={-0.3} rx={-Math.PI / 4} ry={Math.PI / 4} />
        <SeededParticles count={700} />
        <Sparkles count={40} scale={6} size={2.5} speed={0.4} color="#a855f7" />
      </Canvas>
    </div>
  )
}
