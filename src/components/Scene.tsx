'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: 'torusKnot' | 'torus' | 'sphere' | 'octahedron'
  color?: string
  roughness?: number
  metalness?: number
  clearcoat?: number
  speed?: number
  wireframe?: boolean
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  roughness = 0.1,
  metalness = 0.8,
  clearcoat = 1.0,
  speed = 1.0,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const factor = speed * 0.15
    meshRef.current.rotation.x = time * factor
    meshRef.current.rotation.y = time * factor * 1.5
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 120, 16]} />}
        {shape === 'torus' && <torusGeometry args={[1.1, 0.4, 16, 100]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          flatShading={shape === 'octahedron'}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} shadows>
        {/* Set scene background or fog synchronized to globals.css --background #020617 */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-8, -5, -5]} intensity={1.0} color="#818cf8" />
        <spotLight position={[0, 10, 0]} intensity={1.2} angle={0.6} penumbra={1} color="#c084fc" />

        <AnimatedShape {...props} />

        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  )
}
