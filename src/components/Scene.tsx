'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}

// Deterministic pseudo-random number generator to satisfy React 19 / Next.js component purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function StarfieldParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const u = pseudoRandom(i * 3 + 1)
      const v = pseudoRandom(i * 3 + 2)
      const w = pseudoRandom(i * 3 + 3)

      pos[i3] = (u - 0.5) * 24
      pos[i3 + 1] = (v - 0.5) * 24
      pos[i3 + 2] = (w - 0.5) * 20 - 2

      sc[i] = pseudoRandom(i * 7) * 2 + 0.5
    }

    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.y = t
      pointsRef.current.rotation.x = t * 0.5
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
        color="#818cf8"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRings({ color }: { color: string }) {
  const ringRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime()
      ringRef.current.rotation.z = t * 0.15
      ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.25
    }
  })

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

function MainGeometry({
  geometry = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.8,
  distort = 0.45
}: {
  geometry?: GeometryType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * (0.15 * (speed / 1.5))
      meshRef.current.rotation.y = time * (0.22 * (speed / 1.5))
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 3]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.6, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.4}>
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
  geometry = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.8,
  distort = 0.45
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={2.5} color={color} />
        <pointLight position={[5, -10, 5]} intensity={1.8} color="#06b6d4" />

        <StarfieldParticles count={180} />
        <FloatingRings color={color} />

        <MainGeometry
          geometry={geometry}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
