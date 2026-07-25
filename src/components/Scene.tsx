'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null!)

  // Generate deterministic ring particles
  const count = 300
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.2 + (i % 5) * 0.15 + (i % 3 === 0 ? 0.1 : -0.1)
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (i % 4 - 2) * 0.15
      pos[i * 3 + 2] = Math.sin(angle) * radius

      // Alternating Indigo, Purple, Teal gradients
      if (i % 3 === 0) {
        col[i * 3] = 0.635 // Indigo-400 R
        col[i * 3 + 1] = 0.631 // G
        col[i * 3 + 2] = 0.949 // B
      } else if (i % 3 === 1) {
        col[i * 3] = 0.753 // Purple-400 R
        col[i * 3 + 1] = 0.518 // G
        col[i * 3 + 2] = 0.988 // B
      } else {
        col[i * 3] = 0.22 // Teal-400 R
        col[i * 3 + 1] = 0.74 // G
        col[i * 3 + 2] = 0.97 // B
      }
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.08
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingPremiumCore() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Smooth slow continuous rotation
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2
    meshRef.current.rotation.z = time * 0.05
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.1, 2]} />
        <meshPhysicalMaterial
          color="#818cf8"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading
        />
      </mesh>
    </Float>
  )
}

function BackgroundLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Front premium spotlight */}
      <spotLight
        position={[15, 20, 15]}
        angle={0.25}
        penumbra={1}
        intensity={2.5}
        color="#a5b4fc"
      />
      {/* Dynamic colorful pointlights for depth */}
      <pointLight position={[-10, 5, -10]} intensity={1.5} color="#c084fc" />
      <pointLight position={[10, -5, 10]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[0, -10, 0]} intensity={0.8} color="#818cf8" />
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        {/* Sync background fog color with globals.css background `#020617` */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        <BackgroundLighting />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0.5} fade speed={1} />

        <FloatingPremiumCore />
        <ParticleRing />
      </Canvas>
    </div>
  )
}
