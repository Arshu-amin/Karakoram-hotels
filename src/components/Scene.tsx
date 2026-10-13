'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Simple deterministic pseudo-random generator to avoid React 19 / Next 16 purity lint errors
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type GeometryShape = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'sphere'

export interface SceneConfig {
  shape?: GeometryShape
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

interface AnimatedObjectProps {
  config: SceneConfig
}

function AnimatedObject({ config }: AnimatedObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { shape = 'torusKnot', color = '#6366f1', speed = 2, distort = 0.4, wireframe = false, scale = 1.2 } = config

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * (speed / 2)
    meshRef.current.rotation.y = time * 0.25 * (speed / 2)
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 4]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.5}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const baseColor = new THREE.Color('#818cf8')

    for (let i = 0; i < count; i++) {
      let seed = i * 3
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 22
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 22
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 22

      const mixedColor = baseColor.clone().offsetHSL((pseudoRandom(seed++) - 0.5) * 0.2, 0, 0)
      cols[i * 3] = mixedColor.r
      cols[i * 3 + 1] = mixedColor.g
      cols[i * 3 + 2] = mixedColor.b
    }
    return [pos, cols]
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
        size={0.07}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene({ config = {} }: { config?: SceneConfig }) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <pointLight position={[10, -10, 5]} intensity={1} color="#38bdf8" />

        <AnimatedObject config={config} />
        <ParticleField count={200} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
