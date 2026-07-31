'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedShapeProps {
  shapeType: string
  color: string
  speed: number
  distortion: number
  scale: number
}

function AnimatedShape({ shapeType, color, speed, distortion, scale }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Smooth custom rotation based on configured speed
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.22 * speed
  })

  // Determine geometry based on state
  const renderGeometry = () => {
    switch (shapeType) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 100]} />
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5, 4, 4, 4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[0.9, 0.3, 128, 16]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {renderGeometry()}
        {/*
          Using MeshPhysicalMaterial instead of MeshTransmissionMaterial
          to prevent WebGL headless crashes while retaining high performance glossy material looks.
        */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8 + distortion * 0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
          flatShading={false}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shapeType?: string
  color?: string
  speed?: number
  distortion?: number
  scale?: number
}

export default function Scene({
  shapeType = 'torusKnot',
  color = '#4f46e5',
  speed = 1,
  distortion = 0.4,
  scale = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true }}>
        {/* Synchronize Fog with `--background` variable (#020617) for seamless blending */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[8, 12, 10]}
          angle={0.3}
          penumbra={0.8}
          intensity={1.5}
          castShadow
        />
        <directionalLight position={[-8, -5, -5]} intensity={0.6} color="#818cf8" />
        <pointLight position={[0, 5, -5]} intensity={0.5} color="#ec4899" />

        <AnimatedShape
          shapeType={shapeType}
          color={color}
          speed={speed}
          distortion={distortion}
          scale={scale}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
