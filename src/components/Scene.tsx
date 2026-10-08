'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'octahedron'
  color?: string
  speed?: number
  distort?: number
  scale?: number
  wireframe?: boolean
}

// Deterministic pseudo-random number generator for pure React rendering
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function FloatingParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 15

      // Color gradient between indigo, purple, and cyan
      col[i * 3] = 0.3 + pseudoRandom(seed++) * 0.4     // R
      col[i * 3 + 1] = 0.4 + pseudoRandom(seed++) * 0.5 // G
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1 // B
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = time * 0.015
    }
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
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  scale = 1.2,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * (speed * 0.5)
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.y = time * 0.5
      meshRef.current.position.y = Math.sin(time) * 0.15
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 2]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.5,
  distort = 0.4,
  scale = 1.2,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#c084fc" />

        {/* Floating background stars & particles */}
        <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
        <FloatingParticles count={250} />

        {/* Dynamic Interactive Object */}
        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          scale={scale}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
