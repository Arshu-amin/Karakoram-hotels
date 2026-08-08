'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  speed?: number
  scale?: number
  color?: string
  shape?: 'torusKnot' | 'sphere' | 'box' | 'icosahedron'
}

function AnimatedShape({ speed = 1, scale = 1, color = '#4f46e5', shape = 'torusKnot' }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const rate = speed * 0.4
    meshRef.current.rotation.x = time * rate
    meshRef.current.rotation.y = time * rate * 1.5
  })

  // Avoid recreation on every render, and keep it safe from impurity checks
  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.2, 1.2, 1.2]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.1, 1]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[0.8, 0.28, 150, 16]} />
    }
  }, [shape])

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {geometry}
        {/* High performance Physical material instead of glass transmission to avoid crashes */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({ speed = 1, scale = 1, color = '#4f46e5', shape = 'torusKnot' }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        {/* Synchronize Fog with the CSS --background color #020617 */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={1.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <directionalLight position={[0, 5, -5]} intensity={1} color="#6366f1" />

        <AnimatedShape speed={speed} scale={scale} color={color} shape={shape} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
