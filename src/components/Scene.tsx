'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  distort?: number
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'torus' | 'octahedron'
  scale?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const baseColor = new THREE.Color('#818cf8')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20

      const shade = 0.5 + pseudoRandom(i + 100) * 0.5
      col[i3] = baseColor.r * shade
      col[i3 + 1] = baseColor.g * shade
      col[i3 + 2] = baseColor.b * shade
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1
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
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

function OrbitalRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
    }
  })

  return (
    <mesh ref={ringRef} scale={2.2}>
      <torusGeometry args={[1, 0.015, 16, 100]} />
      <meshStandardMaterial
        color="#a5b4fc"
        emissive="#4f46e5"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

function CentralMesh({
  color = '#4f46e5',
  speed = 2,
  distort = 0.4,
  shape = 'torusKnot',
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.2 * (speed / 2)
      meshRef.current.rotation.y = time * 0.3 * (speed / 2)
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.3, 2]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.3, 128, 16]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  shape = 'torusKnot',
  scale = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <spotLight
          position={[0, 10, 0]}
          intensity={2}
          angle={0.6}
          penumbra={1}
          color="#a5b4fc"
        />

        <FloatingParticles count={150} />
        <OrbitalRing />
        <CentralMesh
          color={color}
          speed={speed}
          distort={distort}
          shape={shape}
          scale={scale}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
