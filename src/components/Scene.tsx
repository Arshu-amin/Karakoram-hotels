'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'box'
  color?: string
  speed?: number
  scale?: number
  distort?: number
  roughness?: number
  metalness?: number
}

function MainGeometry({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  scale = 1,
  distort = 0.3,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 8]} />
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.4, 1.4, 1.4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />
    }
  }

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} scale={scale}>
        {renderGeometry()}
        {distort > 0 ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distort}
            roughness={roughness}
            metalness={metalness}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            roughness={roughness}
            metalness={metalness}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        )}
      </mesh>
    </Float>
  )
}

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const count = 400
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.sin(i * 12.9898) - 0.5) * 18
      positions[i3 + 1] = (Math.cos(i * 78.233) - 0.5) * 18
      positions[i3 + 2] = (Math.sin(i * 45.164) - 0.5) * 18
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={1} />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#38bdf8" />

        <MainGeometry {...props} />
        <BackgroundParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
