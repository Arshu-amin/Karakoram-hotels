'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic pseudo-random helper to comply with React 19 purity guidelines
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryType = 'torusKnot' | 'sphere' | 'octahedron' | 'icosahedron'

export interface SceneConfig {
  speed: number
  scale: number
  color: string
  geometry: GeometryType
  distort: boolean
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 16
      sc[i] = pseudoRandom(seed++) * 0.08 + 0.02
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.04
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
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

function AnimatedMesh({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * config.speed
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.4
    meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.2
  })

  return (
    <Float speed={2 * config.speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={config.scale}>
        {config.geometry === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {config.geometry === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {config.geometry === 'octahedron' && <octahedronGeometry args={[1.4, 2]} />}
        {config.geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 3]} />}

        <meshPhysicalMaterial
          color={config.color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          wireframe={config.distort}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  config = {
    speed: 1,
    scale: 1,
    color: '#6366f1',
    geometry: 'torusKnot',
    distort: false,
  },
}: {
  config?: SceneConfig
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={config.color} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#a855f7"
        />

        <AnimatedMesh config={config} />
        <FloatingParticles count={150} />

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
