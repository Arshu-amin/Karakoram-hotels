'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryShape = 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron'

interface SceneProps {
  color?: string
  distortion?: number
  speed?: number
  shape?: GeometryShape
  wireframe?: boolean
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particleCount = 700
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 15
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 15
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 15
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = time * 0.015
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function MainGeometry({
  color = '#6366f1',
  distortion = 0.4,
  speed = 1.5,
  shape = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 * speed
      meshRef.current.rotation.y = time * 0.3 * speed
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15
      // Apply subtle distortion scaling effect
      const scale = 1 + Math.sin(time * 2) * distortion * 0.08
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 3]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 2]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function SecondaryGeometries() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = -time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating Orbital Ring 1 */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[-2.8, 1.5, -1.5]}>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.2} metalness={0.9} wireframe />
        </mesh>
      </Float>

      {/* Floating Orbital Shape 2 */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1} position={[2.8, -1.2, -1]}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial color="#a855f7" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      {/* Floating Small Sphere */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[2.2, 1.8, -2]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial color="#ec4899" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene({
  color = '#6366f1',
  distortion = 0.4,
  speed = 1.5,
  shape = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 0, 2]} intensity={1} color={color} />

        {/* 3D Elements */}
        <ParticleField />
        <MainGeometry
          color={color}
          distortion={distortion}
          speed={speed}
          shape={shape}
          wireframe={wireframe}
        />
        <SecondaryGeometries />
      </Canvas>
    </div>
  )
}
