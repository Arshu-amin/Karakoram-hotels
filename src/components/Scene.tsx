'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  shape?: 'torus' | 'icosahedron' | 'sphere' | 'box'
  distort?: number
}

function FloatingParticles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    let seed = 12345
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
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
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedMesh({
  color = '#6366f1',
  speed = 1.5,
  scale = 1,
  wireframe = false,
  shape = 'torus',
  distort = 0.4,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2 * scale, 4]} />
      case 'sphere':
        return <sphereGeometry args={[1.2 * scale, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.4 * scale, 1.4 * scale, 1.4 * scale]} />
      case 'torus':
      default:
        return <torusKnotGeometry args={[1 * scale, 0.35 * scale, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
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
  shape = 'torus',
  distort = 0.4,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 18]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#a5b4fc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#c084fc" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#38bdf8" />

        <FloatingParticles count={200} />

        <AnimatedMesh
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          shape={shape}
          distort={distort}
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
