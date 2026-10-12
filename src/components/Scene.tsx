'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  shape?: 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron'
  wireframe?: boolean
  scale?: number
  distort?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20
      sc[i] = pseudoRandom(i + 100) * 1.5 + 0.5
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.2
    pointsRef.current.rotation.y = time
    pointsRef.current.rotation.x = time * 0.5
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
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function AnimatedShape({
  color = '#6366f1',
  speed = 1,
  shape = 'torusKnot',
  wireframe = false,
  scale = 1,
  distort = 0.4,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 8]} />}
        {shape === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.3, 2]} />}

        <MeshDistortMaterial
          color={color}
          speed={3 * speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing({ color = '#c084fc' }: { color?: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.2
    ringRef.current.rotation.y = time * 0.4
  })

  return (
    <mesh ref={ringRef} scale={2.2}>
      <torusGeometry args={[1.2, 0.02, 16, 100]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#818cf8" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#c084fc" />

        <AnimatedShape {...props} />
        <OrbitingRing color={props.color || '#c084fc'} />
        <FloatingParticles count={150} />
      </Canvas>
    </div>
  )
}
