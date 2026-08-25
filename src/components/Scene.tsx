'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'sphere'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  speed?: number
  distort?: number
  metalness?: number
  roughness?: number
  wireframe?: boolean
}

function ParticleField() {
  const count = 300
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    // Deterministic pseudo-random distribution
    for (let i = 0; i < count; i++) {
      const seed1 = (i * 9301 + 49297) % 233280
      const seed2 = (i * 49297 + 9301) % 233280
      const seed3 = (i * 233280 + 12345) % 9301
      pos[i * 3] = ((seed1 / 233280) - 0.5) * 20
      pos[i * 3 + 1] = ((seed2 / 233280) - 0.5) * 20
      pos[i * 3 + 2] = ((seed3 / 9301) - 0.5) * 20
    }
    return pos
  }, [count])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
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
        size={0.04}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainMesh({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  metalness = 0.6,
  roughness = 0.2,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * (speed / 2)
      meshRef.current.rotation.y = time * 0.25 * (speed / 2)
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 8]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.5, 0]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {distort > 0 && geometry === 'torusKnot' ? (
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            metalness={metalness}
            roughness={roughness}
            wireframe={wireframe}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            metalness={metalness}
            roughness={roughness}
            wireframe={wireframe}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <spotLight position={[0, 10, 0]} intensity={1} color="#38bdf8" angle={0.6} penumbra={1} />

        <ParticleField />
        <MainMesh {...props} />
        <OrbitRing radius={2.4} color="#a855f7" />
        <OrbitRing radius={3.1} color="#38bdf8" />

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
