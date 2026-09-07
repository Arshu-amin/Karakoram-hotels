'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'icosahedron' | 'torus'
  color?: string
  speed?: number
  distortion?: number
  scale?: number
  wireframe?: boolean
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3)
    const colArr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      posArr[idx] = (pseudoRandom(i * 3 + 1) - 0.5) * 15
      posArr[idx + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 15
      posArr[idx + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 15

      // Gradient colors between cyan, purple, and indigo
      const r = 0.3 + pseudoRandom(i * 3 + 4) * 0.4
      const g = 0.2 + pseudoRandom(i * 3 + 5) * 0.3
      const b = 0.8 + pseudoRandom(i * 3 + 6) * 0.2

      colArr[idx] = r
      colArr[idx + 1] = g
      colArr[idx + 2] = b
    }

    return [posArr, colArr]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function MainShape({
  shape = 'torusKnot',
  color = '#818cf8',
  speed = 1,
  scale = 1,
  wireframe = false,
}: Omit<SceneProps, 'distortion'>) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.4
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.32, 128, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 0]} />}
        {shape === 'torus' && <torusGeometry args={[1.2, 0.4, 32, 100]} />}

        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#818cf8',
  speed = 1,
  scale = 1,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-6, -4, -4]} intensity={2} color="#a855f7" />
        <pointLight position={[6, 4, -4]} intensity={2} color="#38bdf8" />

        <ParticleField count={180} />
        <MainShape
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5 * speed}
        />
      </Canvas>
    </div>
  )
}
