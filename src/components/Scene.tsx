'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shapeType: string
  speed: number
  scale: number
  color: string
  distortion: number
  roughness: number
  metalness: number
}

function AnimatedShape({
  shapeType,
  speed,
  scale,
  color,
  distortion,
  roughness,
  metalness,
}: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2

    // Apply some organic oscillation depending on the distortion prop
    if (distortion > 0) {
      const scaleOsc = 1 + Math.sin(time * 2) * distortion * 0.15
      meshRef.current.scale.set(scale * scaleOsc, scale * scaleOsc, scale * scaleOsc)
    } else {
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        {shapeType === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 16]} />}
        {shapeType === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shapeType?: string
  speed?: number
  scale?: number
  color?: string
  distortion?: number
  roughness?: number
  metalness?: number
}

export default function Scene({
  shapeType = 'torusKnot',
  speed = 1,
  scale = 1,
  color = '#6366f1',
  distortion = 0.4,
  roughness = 0.1,
  metalness = 0.9,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <AnimatedShape
          shapeType={shapeType}
          speed={speed}
          scale={scale}
          color={color}
          distortion={distortion}
          roughness={roughness}
          metalness={metalness}
        />
      </Canvas>
    </div>
  )
}
