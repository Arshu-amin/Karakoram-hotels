'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'box'

export interface SceneProps {
  shape?: GeometryType
  color?: string
  distortion?: number
  speed?: number
  wireframe?: boolean
  particleCount?: number
  autoRotate?: boolean
}

function ParticleField({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#a5b4fc')
    ]

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      pos[idx] = (pseudoRandom(i * 3 + 1) - 0.5) * 25
      pos[idx + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 25
      pos[idx + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 25

      const c = colorPalette[Math.floor(pseudoRandom(i * 7 + 4) * colorPalette.length)]
      col[idx] = c.r
      col[idx + 1] = c.g
      col[idx + 2] = c.b
    }
    return [pos, col]
  }, [count])

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
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function MainMesh({
  shape = 'torusKnot',
  color = '#6366f1',
  distortion = 0.45,
  speed = 2.5,
  wireframe = false
}: {
  shape?: GeometryType
  color?: string
  distortion?: number
  speed?: number
  wireframe?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15
      meshRef.current.rotation.y = time * 0.25
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 3]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.8, 1.8, 1.8, 32, 32, 32]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.38, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distortion}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  distortion = 0.45,
  speed = 2.5,
  wireframe = false,
  autoRotate = true
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[0, 10, 0]} intensity={1.2} color="#c084fc" />

        <ParticleField count={800} />
        <Stars radius={50} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

        <MainMesh
          shape={shape}
          color={color}
          distortion={distortion}
          speed={speed}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
