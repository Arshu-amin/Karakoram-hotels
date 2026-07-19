'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveShapeProps {
  shape: 'torusKnot' | 'sphere' | 'box' | 'icosahedron'
  speed: number
  color: string
  wireframe: boolean
  materialMode: 'physical' | 'normal' | 'distort'
  distort: number
}

function InteractiveShape({
  shape,
  speed,
  color,
  wireframe,
  materialMode,
  distort,
}: InteractiveShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 * speed
      meshRef.current.rotation.y = time * 0.15 * speed
    }
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.4, 1.4, 1.4]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 1]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.3, 120, 16]} />
    }
  }

  const renderMaterial = () => {
    switch (materialMode) {
      case 'distort':
        return (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distort}
            wireframe={wireframe}
            roughness={0.1}
            metalness={0.9}
          />
        )
      case 'normal':
        return <meshNormalMaterial wireframe={wireframe} />
      case 'physical':
      default:
        return (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        )
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {renderMaterial()}
      </mesh>
    </Float>
  )
}

interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'box' | 'icosahedron'
  speed?: number
  color?: string
  wireframe?: boolean
  materialMode?: 'physical' | 'normal' | 'distort'
  distort?: number
}

export default function Scene({
  shape = 'torusKnot',
  speed = 1.0,
  color = '#6366f1',
  wireframe = false,
  materialMode = 'physical',
  distort = 0.3,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 12]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <spotLight
          position={[0, 10, 0]}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
        />

        <InteractiveShape
          shape={shape}
          speed={speed}
          color={color}
          wireframe={wireframe}
          materialMode={materialMode}
          distort={distort}
        />
      </Canvas>
    </div>
  )
}
