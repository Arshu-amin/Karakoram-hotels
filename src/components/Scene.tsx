'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  color: string
  speed: number
  shapeType: 'torus' | 'sphere' | 'box' | 'icosahedron'
  scale: number
  distort: number
}

function AnimatedShape({ color, speed, shapeType, scale, distort }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Update rotation dynamically with speed modifier
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
    meshRef.current.rotation.z = time * 0.05 * speed

    // Apply distortion/wobble effect using position changes inside the vertices if desired,
    // or simulate distortion scaling over time
    if (distort > 0) {
      const scaleFactor = 1 + Math.sin(time * speed * 2) * 0.05 * distort
      meshRef.current.scale.set(scale * scaleFactor, scale * scaleFactor, scale * scaleFactor)
    } else {
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {shapeType === 'torus' && <torusKnotGeometry args={[1, 0.35, 150, 20]} />}
        {shapeType === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shapeType === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  color?: string
  speed?: number
  shapeType?: 'torus' | 'sphere' | 'box' | 'icosahedron'
  scale?: number
  distort?: number
}

export default function Scene({
  color = '#6366f1',
  speed = 1,
  shapeType = 'torus',
  scale = 1.2,
  distort = 0.5,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 } as unknown as { position: [number, number, number] }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        <ambientLight intensity={1.2} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={12} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <directionalLight position={[0, 5, -5]} intensity={2} />

        <AnimatedShape
          color={color}
          speed={speed}
          shapeType={shapeType}
          scale={scale}
          distort={distort}
        />

        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
