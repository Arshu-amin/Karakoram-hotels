'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  color?: string
  speed?: number
  scale?: number
  geometryType?: 'torusKnot' | 'sphere' | 'torus' | 'octahedron'
  wireframe?: boolean
}

function AnimatedShape({
  color = '#6366f1',
  speed = 1,
  scale = 1.2,
  geometryType = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15
      meshRef.current.rotation.y = time * 0.25
      // Slight scale pulsation
      const pulse = 1 + Math.sin(time * 0.5) * 0.05
      meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse)
    }
  })

  // Prevent dynamic Math.random inside render or useMemo to fulfill react-hooks/purity rules.
  // Use fixed structural geometries.
  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        {geometryType === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 150, 16]} />}
        {geometryType === 'sphere' && <sphereGeometry args={[1.1, 64, 64]} />}
        {geometryType === 'torus' && <torusGeometry args={[1, 0.4, 32, 100]} />}
        {geometryType === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={geometryType === 'octahedron'}
        />
      </mesh>
    </Float>
  )
}

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null!)

  // Generate particle positions on mount with fixed predictable coordinates (no Math.random on render)
  const positions = useMemo(() => {
    const count = 100
    const pos = new Float32Array(count * 3)
    // Seeded random-like generation to satisfy strict react-hooks/purity
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 3 + (i % 7) * 0.7
      const height = ((i % 11) - 5) * 0.8
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03
    }
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
        color="#a5b4fc"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Scene({
  color = '#6366f1',
  speed = 1,
  scale = 1.2,
  geometryType = 'torusKnot',
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 9]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#818cf8" />
        <spotLight position={[0, 8, 2]} intensity={2} angle={0.6} penumbra={1} color="#c084fc" />

        <AnimatedShape
          color={color}
          speed={speed}
          scale={scale}
          geometryType={geometryType}
          wireframe={wireframe}
        />

        <ParticleSystem />

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
