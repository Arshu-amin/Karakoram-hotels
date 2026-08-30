'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'sphere' | 'cyberRing' | 'icosahedron'

export interface SceneProps {
  shape?: ShapeType
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

// Deterministic pseudo-random helper to comply with React 19 render purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleCloud({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = pseudoRandom(i * 3 + 1)
      const v = pseudoRandom(i * 3 + 2)
      const w = pseudoRandom(i * 3 + 3)
      pos[i * 3] = (u - 0.5) * 22
      pos[i * 3 + 1] = (v - 0.5) * 22
      pos[i * 3 + 2] = (w - 0.5) * 22
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
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

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.35,
  wireframe = false,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed * 0.5
      meshRef.current.rotation.x = time * 0.4
      meshRef.current.rotation.y = time * 0.6
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.15
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'cyberRing':
        return <torusGeometry args={[1.3, 0.35, 32, 100]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 3]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={speed * 1.5}
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
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.35,
  wireframe = false,
  scale = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        <spotLight
          position={[0, 10, 5]}
          intensity={1.2}
          angle={0.6}
          penumbra={1}
          color="#818cf8"
        />

        <ParticleCloud count={300} />
        <MainShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          scale={scale}
        />

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
