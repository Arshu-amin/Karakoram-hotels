'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shape: 'torus' | 'sphere' | 'box' | 'icosahedron'
  color: string
  speed: number
  scale: number
  wireframe: boolean
  roughness: number
}

function AnimatedShape({
  shape,
  color,
  speed,
  scale,
  wireframe,
  roughness,
}: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const rotationSpeed = speed * 0.4
    meshRef.current.rotation.x = time * rotationSpeed
    meshRef.current.rotation.y = time * rotationSpeed * 1.5
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 150, 20]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={shape === 'icosahedron'}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shape?: 'torus' | 'sphere' | 'box' | 'icosahedron'
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  roughness?: number
}

export default function Scene({
  shape = 'torus',
  color = '#6366f1',
  speed = 1,
  scale = 1,
  wireframe = false,
  roughness = 0.1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Sync background & fog with global CSS background #020617 */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2.5}
          color="#ffffff"
        />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ec4899" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#6366f1" />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          roughness={roughness}
        />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={speed * 0.5} />
      </Canvas>
    </div>
  )
}
