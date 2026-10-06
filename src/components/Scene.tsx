'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torus' | 'icosahedron' | 'sphere' | 'ring'

interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  scale?: number
  metalness?: number
  roughness?: number
}

// Pseudo-random generator for particle positions without purity warnings
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 250 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#ec4899'),
    ]

    for (let i = 0; i < count; i++) {
      let seed = i * 3
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 18

      const color = palette[Math.floor(pseudoRandom(seed++) * palette.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!particlesRef.current) return
    const time = state.clock.getElapsedTime()
    particlesRef.current.rotation.y = time * 0.03
    particlesRef.current.rotation.x = time * 0.015
  })

  return (
    <points ref={particlesRef}>
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
        size={0.04}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

function MainGeometry({
  shape = 'torus',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.35,
  scale = 1,
  metalness = 0.8,
  roughness = 0.2,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
  })

  return (
    <Float
      speed={speed * 1.2}
      rotationIntensity={0.8}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 8]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'ring' && <torusGeometry args={[1.2, 0.3, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed * 1.5}
          distort={distort}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <spotLight position={[0, 10, 0]} intensity={1.2} color="#38bdf8" angle={0.6} penumbra={1} />

        <ParticleField count={220} />
        <MainGeometry {...props} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
