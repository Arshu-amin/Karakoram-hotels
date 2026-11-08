'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torus' | 'icosahedron' | 'octahedron' | 'sphere'

interface SceneProps {
  geometry?: GeometryType
  speed?: number
  distort?: number
  color?: string
  wireframe?: boolean
  roughness?: number
  autoRotate?: boolean
}

// Deterministic pseudo-random generator to preserve React purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function StarfieldParticles({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 6 + pseudoRandom(i * 3 + 1) * 8
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(pseudoRandom(i * 3 + 3) * 2 - 1)

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)

      sz[i] = 1.2 + pseudoRandom(i + 4) * 2.5
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a5b4fc"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingOrb({
  position,
  color,
  scale = 0.35,
  speed = 1.5,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() * speed
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.25
    meshRef.current.rotation.x = t * 0.4
    meshRef.current.rotation.y = t * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

function CentralMesh({
  geometry = 'torus',
  speed = 2,
  distort = 0.45,
  color = '#6366f1',
  wireframe = false,
  roughness = 0.2,
  autoRotate = true,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current || !autoRotate) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * (0.15 * (speed / 2))
    meshRef.current.rotation.y = time * (0.25 * (speed / 2))
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {geometry === 'torus' && <torusKnotGeometry args={[1.1, 0.32, 128, 24]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 3]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.4, 2]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1.25, 64, 64]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          roughness={roughness}
          metalness={0.85}
          wireframe={wireframe}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  geometry = 'torus',
  speed = 2,
  distort = 0.45,
  color = '#6366f1',
  wireframe = false,
  roughness = 0.2,
  autoRotate = true,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 6, 22]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -6, -4]} intensity={2.5} color="#818cf8" />
        <pointLight position={[8, 5, 3]} intensity={2} color="#c084fc" />
        <pointLight position={[0, -5, 2]} intensity={1} color="#38bdf8" />

        {/* Background Starfield */}
        <StarfieldParticles count={220} />

        {/* Orbiting accent geometric bodies */}
        <FloatingOrb position={[-2.4, 1.3, -1.2]} color="#38bdf8" scale={0.28} speed={1.3} />
        <FloatingOrb position={[2.6, -1.2, -0.8]} color="#ec4899" scale={0.32} speed={1.7} />
        <FloatingOrb position={[1.8, 1.8, -1.8]} color="#a855f7" scale={0.24} speed={1.1} />

        {/* Main Central Interactive 3D Mesh */}
        <CentralMesh
          geometry={geometry}
          speed={speed}
          distort={distort}
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          autoRotate={autoRotate}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.7}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
