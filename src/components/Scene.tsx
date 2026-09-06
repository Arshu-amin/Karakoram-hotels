'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  shape?: 'torusKnot' | 'sphere' | 'icosahedron' | 'box'
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    // Deterministic pseudo-random function to preserve React 19 purity
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 2) - 0.5) * 18

      col[i * 3] = 0.5 + pseudoRandom(i * 3 + 3) * 0.5
      col[i * 3 + 1] = 0.4 + pseudoRandom(i * 3 + 4) * 0.4
      col[i * 3 + 2] = 0.9 + pseudoRandom(i * 3 + 5) * 0.1
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.015
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
  color = '#6366f1',
  speed = 1,
  scale = 1,
  wireframe = false,
  shape = 'torusKnot',
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed * 0.5
    meshRef.current.rotation.x = time * 0.5
    meshRef.current.rotation.y = time * 0.7
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.2
  })

  return (
    <Float speed={2 * speed} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 2]} />}
        {shape === 'box' && <boxGeometry args={[1.6, 1.6, 1.6]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
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
  color = '#6366f1',
  speed = 1,
  scale = 1,
  wireframe = false,
  shape = 'torusKnot',
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <pointLight position={[0, 0, 3]} intensity={1} color={color} />

        <MainShape
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          shape={shape}
        />
        <FloatingParticles count={150} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5 * speed}
        />
      </Canvas>
    </div>
  )
}
