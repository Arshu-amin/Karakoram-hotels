'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'cyberSphere'

interface SceneProps {
  geometryType?: GeometryType
  primaryColor?: string
  wireframe?: boolean
  speed?: number
  scale?: number
}

// Pseudo-random generator for deterministic purity (React 19 / ESLint rule compliance)
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Starfield({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 16
      sc[i] = pseudoRandom(i * 3 + 4) * 0.8 + 0.2
    }
    return [pos, sc]
  }, [count])

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
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * speed * 0.4) * 0.2
    ringRef.current.rotation.y = time * speed
    ringRef.current.rotation.z = Math.cos(time * speed * 0.3) * 0.2
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.015, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function MainShape({
  geometryType = 'torusKnot',
  primaryColor = '#6366f1',
  wireframe = false,
  speed = 1,
  scale = 1.25,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * speed
    meshRef.current.rotation.y = time * 0.35 * speed

    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3 * speed
      innerRef.current.rotation.z = time * 0.2 * speed
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <group scale={scale}>
        {/* Main interactive mesh */}
        <mesh ref={meshRef}>
          {geometryType === 'torusKnot' && (
            <torusKnotGeometry args={[1, 0.32, 128, 32]} />
          )}
          {geometryType === 'icosahedron' && (
            <icosahedronGeometry args={[1.2, 1]} />
          )}
          {geometryType === 'octahedron' && (
            <octahedronGeometry args={[1.3, 0]} />
          )}
          {geometryType === 'cyberSphere' && (
            <sphereGeometry args={[1.15, 32, 32]} />
          )}

          <meshPhysicalMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={wireframe ? 0.8 : 0.25}
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
            wireframe={wireframe}
          />
        </mesh>

        {/* Nested glowing core */}
        <mesh ref={innerRef} scale={0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Surrounding orbital energy rings */}
        <OrbitalRing radius={1.75} speed={0.4 * speed} color={primaryColor} />
        <OrbitalRing radius={2.05} speed={-0.3 * speed} color="#38bdf8" />
      </group>
    </Float>
  )
}

export default function Scene({
  geometryType = 'torusKnot',
  primaryColor = '#6366f1',
  wireframe = false,
  speed = 1,
  scale = 1.25,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -4, -4]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[6, -3, 3]} intensity={2.0} color={primaryColor} />
        <spotLight
          position={[0, 8, 4]}
          angle={0.4}
          penumbra={0.8}
          intensity={1.8}
          color="#e0e7ff"
        />

        {/* Ambient Cosmic Particles */}
        <Starfield count={220} />

        {/* Animated Central 3D System */}
        <MainShape
          geometryType={geometryType}
          primaryColor={primaryColor}
          wireframe={wireframe}
          speed={speed}
          scale={scale}
        />

        {/* Smooth Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  )
}
