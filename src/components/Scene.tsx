'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

// Pseudo random generator for deterministic particle placement
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere'

export interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  shape?: ShapeType
  wireframe?: boolean
  autoRotate?: boolean
}

function StarField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 30
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 30
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 30

      col[i * 3] = 0.5 + pseudoRandom(seed++) * 0.5
      col[i * 3 + 1] = 0.6 + pseudoRandom(seed++) * 0.4
      col[i * 3 + 2] = 1.0
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01
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

function InteractiveMesh({
  color = '#6366f1',
  speed = 1,
  scale = 1,
  shape = 'torusKnot',
  wireframe = false,
}: Omit<SceneProps, 'autoRotate'>) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = t * 0.25
    meshRef.current.rotation.y = t * 0.35
  })

  const GeometryComponent = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 3]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.5, 2]} />
      case 'sphere':
        return <sphereGeometry args={[1.4, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={scale}>
        {GeometryComponent()}
        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
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
  shape = 'torusKnot',
  wireframe = false,
  autoRotate = true,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <spotLight
          position={[0, 8, 8]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#38bdf8"
        />

        <StarField count={300} />

        <InteractiveMesh
          color={color}
          speed={speed}
          scale={scale}
          shape={shape}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2 * speed}
        />
      </Canvas>
    </div>
  )
}
