'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere'

interface SceneProps {
  shape?: ShapeType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
  roughness?: number
  metalness?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const seed = i * 3
      pos[i * 3] = (pseudoRandom(seed) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(seed + 1) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(seed + 2) - 0.5) * 16

      col[i * 3] = 0.4 + pseudoRandom(seed + 3) * 0.4
      col[i * 3 + 1] = 0.5 + pseudoRandom(seed + 4) * 0.5
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed + 5) * 0.1
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 2,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * (speed * 0.2)
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.8
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.38, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 2]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />

        {/* Dynamic Lighting System */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -8, -5]} intensity={1.2} color="#818cf8" />
        <pointLight position={[8, -4, 5]} intensity={1} color="#c084fc" />

        {/* 3D Scene Components */}
        <FloatingParticles count={100} />
        <MainShape {...props} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
