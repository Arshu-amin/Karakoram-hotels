'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron'

export interface SceneProps {
  shape?: ShapeType
  speed?: number
  color?: string
  distort?: number
  wireframe?: boolean
  scale?: number
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      const seed = (i * 9301 + 49297) % 233280
      const rnd = seed / 233280
      pos[i] = (rnd - 0.5) * 18
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
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
        size={0.04}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  speed = 1.5,
  color = '#6366f1',
  distort = 0.35,
  wireframe = false,
  scale = 1.2,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25
      meshRef.current.rotation.y = time * 0.35
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 8]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 2]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          speed={2 * speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={props.color || '#6366f1'} />
        <spotLight
          position={[0, 8, 8]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#a5b4fc"
        />

        <FloatingParticles />
        <AnimatedShape {...props} />

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
