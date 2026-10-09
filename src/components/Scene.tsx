'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'icosahedron' | 'cube'
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 18

      col[i * 3] = 0.4 + pseudoRandom(seed++) * 0.4
      col[i * 3 + 1] = 0.5 + pseudoRandom(seed++) * 0.5
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.35,
  wireframe = false,
  scale = 1.1,
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
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 2]} />
      case 'cube':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={0.8}>
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
  scale = 1.1,
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
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.6} penumbra={1} color="#818cf8" />

        <ParticleField />
        <AnimatedShape
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
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
