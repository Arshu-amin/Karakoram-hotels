'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: string
  color?: string
  speed?: number
  scale?: number
  roughness?: number
  metalness?: number
  wireframe?: boolean
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  scale = 1,
  roughness = 0.1,
  metalness = 0.8,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Smooth custom rotation based on time and speed prop
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
  })

  // Dynamic mesh generation depending on 'shape' prop selection
  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 256, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5, 4, 4, 4]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.4, 0]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  scale = 1,
  roughness = 0.1,
  metalness = 0.8,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Consistent fog synchronized with Tailwind variables */}
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Ambient background light */}
        <ambientLight intensity={0.4} />

        {/* Dynamic bright spot light for beautiful clearcoat reflections */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          castShadow
        />

        {/* Subtle fill light */}
        <pointLight position={[-10, -10, -10]} intensity={1.5} />

        {/* Intense key light highlighting metallic values */}
        <directionalLight position={[0, 5, 5]} intensity={1.5} />

        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
