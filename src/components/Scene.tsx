'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusknot' | 'icosahedron' | 'octahedron' | 'torus'

interface SceneProps {
  geometry?: GeometryType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}

// Deterministic pseudo-random number generator for React purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Particles({ count = 120, color = '#6366f1' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 14
      pos[i3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 14
      pos[i3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 14
      sc[i] = pseudoRandom(i + 4) * 0.8 + 0.2
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.05
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time
      pointsRef.current.rotation.x = time * 0.5
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
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function CyberRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2
      ringRef.current.rotation.z = t * 0.3
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} wireframe />
    </mesh>
  )
}

function MainShape({
  geometry = 'torusknot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.0,
}: {
  geometry: GeometryType
  color: string
  wireframe: boolean
  speed: number
  distort: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3 * speed
      meshRef.current.rotation.y = time * 0.45 * speed
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 1]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.5, 0]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.45, 32, 100]} />
      case 'torusknot':
      default:
        return <torusKnotGeometry args={[1.1, 0.32, 128, 32]} />
    }
  }

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={wireframe ? 0.6 : 0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  geometry = 'torusknot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.0,
  distort = 0.4,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Ambient & directional lighting for rich metallic reflections */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[0, -2, 2]} intensity={1.2} color={color} distance={8} />

        <MainShape
          geometry={geometry}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
        <CyberRing color={color} />
        <Particles count={150} color={color} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.8}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
