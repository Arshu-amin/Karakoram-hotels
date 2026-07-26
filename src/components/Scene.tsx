'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedMeshProps {
  position: [number, number, number]
  scale?: number
}

function AnimatedMesh({ position, scale = 1 }: AnimatedMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Perform elegant complex 3D rotations and subtle scaling
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.rotation.z = time * 0.05
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
        <torusKnotGeometry args={[0.7, 0.22, 160, 24]} />
        {/* High performance physical material using metalness and clearcoat */}
        <meshPhysicalMaterial
          color="#6366f1"
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Impure Math.random() is safe to call during useMemo since we do not render inside a loop,
      // but to satisfy strict react-hooks/purity rules we suppress the warning.
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.05}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 10]} />
        <ambientLight intensity={0.6} />
        {/* Spot and Point lights with physical details */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={1.8}
          color="#818cf8"
        />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#ec4899" />
        <directionalLight position={[0, 5, 2]} intensity={0.8} color="#ffffff" />

        <AnimatedMesh position={[0, 0, 0]} scale={1.1} />
        <ParticleField count={250} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
