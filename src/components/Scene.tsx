'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}

// Deterministic pseudo-random generator to satisfy React 19 / Next.js pure render requirements
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particleCount = 700
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const cols = new Float32Array(particleCount * 3)
    const colorChoices = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#e0e7ff')
    ]

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3
      const radius = 6 + pseudoRandom(i * 3 + 1) * 18
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i * 3 + 3) - 1)

      pos[idx] = radius * Math.sin(phi) * Math.cos(theta)
      pos[idx + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[idx + 2] = radius * Math.cos(phi)

      const col = colorChoices[Math.floor(pseudoRandom(i * 7) * colorChoices.length)]
      cols[idx] = col.r
      cols[idx + 1] = col.g
      cols[idx + 2] = col.b
    }
    return [pos, cols]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.05
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
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function OrbitingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime() * speed
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.2
    ringRef.current.rotation.y = time * 0.8
    ringRef.current.rotation.z = Math.cos(time * 0.3) * 0.2
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

function FloatingSatellites() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime() * 0.3
    groupRef.current.rotation.y = -time
    groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.2
  })

  return (
    <group ref={groupRef}>
      <mesh position={[2.6, 1.2, -0.5]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-2.4, -1.0, 0.8]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#c084fc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.8, -2.2, -1.2]}>
        <tetrahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#818cf8" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function MainObject({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.5,
  distort = 0.35,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed * 0.3
    meshRef.current.rotation.x = time * 0.7
    meshRef.current.rotation.y = time
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.3
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={0.9}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1.2, 0.36, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.4, 4]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.5, 2]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}
        <MeshDistortMaterial
          color={color}
          speed={speed * 1.8}
          distort={distort}
          roughness={0.25}
          metalness={0.85}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.5,
  distort = 0.35,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 25]} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -5, -4]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[7, -4, 4]} intensity={2.5} color="#a855f7" />
        <pointLight position={[0, 6, -3]} intensity={1.2} color="#6366f1" />

        {/* 3D Visual Elements */}
        <Starfield />
        <OrbitingRing radius={2.2} speed={0.7} color="#38bdf8" />
        <OrbitingRing radius={2.9} speed={-0.5} color="#c084fc" />
        <FloatingSatellites />
        <MainObject
          shape={shape}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />

        {/* User Interaction Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
