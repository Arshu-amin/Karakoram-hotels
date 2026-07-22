'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

function RotatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.25
    meshRef.current.rotation.z = time * 0.05
  })

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <torusKnotGeometry args={[1.2, 0.4, 150, 20]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = time * 0.3
    ringRef.current.rotation.y = time * 0.1
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[2.5, 0.06, 16, 100]} />
      <meshPhysicalMaterial
        color="#c084fc"
        roughness={0.05}
        metalness={0.95}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        emissive="#a855f7"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 300

  // Standard safe rendering.
  // Using React 19 safe creation of float array for points.
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Generate positions within a sphere/box safely
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3] = (Math.random() - 0.5) * 15
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15
    // eslint-disable-next-line react-hooks/purity
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.x = time * 0.01
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
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 4, 12]} />

        {/* High visual fidelity lighting */}
        <ambientLight intensity={0.6} />

        {/* Soft directional lights to accentuate metallic materials */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#38bdf8" />
        <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#c084fc" />

        {/* Spot light pointing at core */}
        <spotLight
          position={[0, 8, 2]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#ffffff"
          castShadow
        />

        <RotatingKnot />
        <OrbitingRing />
        <AmbientParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}
