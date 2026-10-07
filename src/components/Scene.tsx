'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'octahedron' | 'cyberRing'
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  roughness?: number
  metalness?: number
  scale?: number
}

// Deterministic pseudo-random number generator for react purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
  roughness = 0.15,
  metalness = 0.8,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * (speed / 2)
    meshRef.current.rotation.y = time * 0.35 * (speed / 2)
  })

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.4, 2]} />}
        {shape === 'cyberRing' && <torusGeometry args={[1.2, 0.3, 32, 100]} />}

        {shape === 'sphere' ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distort}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            reflectivity={0.9}
          />
        )}
      </mesh>
    </Float>
  )
}

function OrbitingRing({ color = '#ec4899', speed = 1 }: { color?: string; speed?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = time * 0.5 * speed
    ringRef.current.rotation.z = time * 0.3 * speed
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  )
}

function ParticleField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      let seed = i * 6
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 15
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 15

      // Color variation between indigo, purple, pink
      col[i * 3] = 0.4 + pseudoRandom(seed++) * 0.5     // R
      col[i * 3 + 1] = 0.3 + pseudoRandom(seed++) * 0.5   // G
      col[i * 3 + 2] = 0.9 + pseudoRandom(seed++) * 0.1   // B
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime() * 0.05
    pointsRef.current.rotation.y = time
    pointsRef.current.rotation.x = time * 0.5
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

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#38bdf8" />

        <MainShape {...props} />
        <OrbitingRing color={props.color || '#ec4899'} speed={props.speed || 1} />
        <ParticleField count={100} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
