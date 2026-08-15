'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'torus'

export interface SceneProps {
  color?: string
  shape?: ShapeType
  speed?: number
  scale?: number
  wireframe?: boolean
  particleCount?: number
}

function ParticleField({ count = 120, color = '#6366f1' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      sz[i] = Math.random() * 0.08 + 0.02
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
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
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function MainGeometry({ shape }: { shape: ShapeType }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.3, 2]} />
    case 'octahedron':
      return <octahedronGeometry args={[1.4, 0]} />
    case 'sphere':
      return <sphereGeometry args={[1.2, 64, 64]} />
    case 'torus':
      return <torusGeometry args={[1.2, 0.4, 32, 100]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
  }
}

function AnimatedShape({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  scale = 1,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25
      meshRef.current.rotation.y = time * 0.4
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3
      innerRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <group scale={[scale, scale, scale]}>
        <mesh ref={meshRef}>
          <MainGeometry shape={shape} />
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Inner core accent sphere */}
        <mesh ref={innerRef} scale={[0.5, 0.5, 0.5]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      </group>
    </Float>
  )
}

export default function Scene({
  color = '#6366f1',
  shape = 'torusKnot',
  speed = 1,
  scale = 1,
  wireframe = false,
  particleCount = 140,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color={color} />
        <spotLight
          position={[0, 10, 5]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color={color}
        />
        <fog attach="fog" args={['#020617', 5, 25]} />

        <AnimatedShape
          color={color}
          shape={shape}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />

        <ParticleField count={particleCount} color={color} />
      </Canvas>
    </div>
  )
}
