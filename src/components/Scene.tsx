'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus' | 'sphere'

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

function FloatingParticles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      const y = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      const z = (pseudoRandom(i * 3 + 3) - 0.5) * 20
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime() * 0.1
      pointsRef.current.rotation.y = time
      pointsRef.current.rotation.x = time * 0.5
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function GeometryMesh({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.25 * (speed / 2)
      meshRef.current.rotation.y = time * 0.35 * (speed / 2)
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 8]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.6, 2]} />
      case 'torus':
        return <torusGeometry args={[1.4, 0.4, 32, 100]} />
      case 'sphere':
        return <sphereGeometry args={[1.5, 64, 64]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {distort > 0 && !wireframe ? (
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            roughness={0.2}
            metalness={0.8}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 2,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          color="#a855f7"
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
        <directionalLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />

        <FloatingParticles count={180} />

        <GeometryMesh
          color={color}
          shape={shape}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
