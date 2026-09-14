'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'dodecahedron' | 'sphere' | 'octahedron'

export interface SceneProps {
  color?: string
  shape?: ShapeType
  speed?: number
  distort?: number
  wireframe?: boolean
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1)
      const r2 = pseudoRandom(i * 3 + 2)
      const r3 = pseudoRandom(i * 3 + 3)
      pos[i * 3] = (r1 - 0.5) * 20
      pos[i * 3 + 1] = (r2 - 0.5) * 20
      pos[i * 3 + 2] = (r3 - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = t * 0.015
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
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  distort = 0.35,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 * speed
      meshRef.current.rotation.y = time * 0.3 * speed

      // Gentle subtle parallax interaction from mouse pointer
      const pointerX = state.pointer.x * 0.5
      const pointerY = state.pointer.y * 0.5
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointerX, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointerY, 0.05)
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.32, 128, 32]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}

        <MeshDistortMaterial
          color={color}
          speed={2 * speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  distort = 0.35,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#38bdf8" />

        <ParticleField />
        <AnimatedShape
          color={color}
          shape={shape}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
