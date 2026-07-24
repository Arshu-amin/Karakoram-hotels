'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shapeType: 'torusKnot' | 'sphere' | 'box' | 'octahedron'
  color: string
  speed: number
  metalness: number
  roughness: number
  clearcoat: number
  scale?: number
}

function AnimatedShape({
  shapeType,
  color,
  speed,
  metalness,
  roughness,
  clearcoat,
  scale = 1.4,
}: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.25
    meshRef.current.rotation.z = time * 0.1
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shapeType === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.28, 150, 20]} />}
        {shapeType === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
        {shapeType === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {shapeType === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}

        {/* High performance physical material to avoid WebGL context issues */}
        <meshPhysicalMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          clearcoat={clearcoat}
          clearcoatRoughness={0.1}
          flatShading={shapeType === 'octahedron'}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shapeType?: 'torusKnot' | 'sphere' | 'box' | 'octahedron'
  color?: string
  speed?: number
  metalness?: number
  roughness?: number
  clearcoat?: number
  scale?: number
}

export default function Scene({
  shapeType = 'torusKnot',
  color = '#4f46e5',
  speed = 1.0,
  metalness = 0.9,
  roughness = 0.1,
  clearcoat = 1.0,
  scale = 1.4,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        {/* Fog color matching CSS --background (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        <ambientLight intensity={0.4} />
        <spotLight position={[8, 10, 8]} angle={0.25} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-8, -8, -8]} intensity={0.6} color="#c084fc" />
        <pointLight position={[0, 8, -5]} intensity={0.5} color="#38bdf8" />

        <AnimatedShape
          shapeType={shapeType}
          color={color}
          speed={speed}
          metalness={metalness}
          roughness={roughness}
          clearcoat={clearcoat}
          scale={scale}
        />
      </Canvas>
    </div>
  )
}
