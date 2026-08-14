'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  color: string
  speed: number
  scale: number
  shape: 'torus' | 'sphere' | 'torusKnot' | 'box'
}

function AnimatedShape({ color, speed, scale, shape }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
    meshRef.current.rotation.z = time * 0.05 * speed
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusGeometry args={[1, 0.35, 32, 100]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.1, 64, 64]} />}
        {shape === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.26, 128, 16]} />}
        {shape === 'box' && <boxGeometry args={[1.3, 1.3, 1.3]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  color = '#4f46e5',
  speed = 1.0,
  scale = 1.0,
  shape = 'torusKnot',
}: Partial<SceneProps>) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Background Fog Synchronized with CSS --background (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Ambient & Directional Lights */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} color={color} />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#ffffff" />

        <AnimatedShape color={color} speed={speed} scale={scale} shape={shape} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  )
}
