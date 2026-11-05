'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'sphere' | 'cyberRing'

export interface SceneProps {
  geometry?: GeometryType
  color?: string
  wireframe?: boolean
  speed?: number
  distort?: number
  rotationSpeed?: number
  autoRotate?: boolean
}

// Pseudo-random generator for deterministic purity in React 19
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Starfield() {
  const count = 350
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const seed1 = i * 7.13
      const seed2 = i * 13.91
      const seed3 = i * 23.47

      pos[i3] = (pseudoRandom(seed1) - 0.5) * 25
      pos[i3 + 1] = (pseudoRandom(seed2) - 0.5) * 25
      pos[i3 + 2] = (pseudoRandom(seed3) - 0.5) * 20 - 5
      sc[i] = pseudoRandom(seed1 + seed2) * 1.5 + 0.5
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.02
      pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05
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
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingOrb({ position, scale, color, speed }: { position: [number, number, number]; scale: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.y = t * 0.7
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function MainShape({
  geometry = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.8,
  distort = 0.45,
  rotationSpeed = 0.5,
}: {
  geometry: GeometryType
  color: string
  wireframe: boolean
  speed: number
  distort: number
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const outerRingRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25 * rotationSpeed
      meshRef.current.rotation.y = time * 0.35 * rotationSpeed
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -time * 0.2 * rotationSpeed
      outerRingRef.current.rotation.z = time * 0.15 * rotationSpeed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1}>
      <group>
        {/* Core Main Mesh */}
        <mesh ref={meshRef}>
          {geometry === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />}
          {geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 3]} />}
          {geometry === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
          {geometry === 'cyberRing' && <torusGeometry args={[1.2, 0.4, 30, 100]} />}

          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Orbiting Cyber Gyro Ring */}
        <mesh ref={outerRingRef} scale={1.85}>
          <torusGeometry args={[1, 0.015, 16, 80]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
        </mesh>
      </group>
    </Float>
  )
}

export default function Scene({
  geometry = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1.8,
  distort = 0.45,
  rotationSpeed = 0.5,
  autoRotate = true,
}: SceneProps) {
  return (
    <div className="h-full w-full select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 16]} />

        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -8, -5]} intensity={1.2} color={color} />
        <pointLight position={[0, -10, 5]} intensity={0.8} color="#38bdf8" />
        <spotLight
          position={[0, 12, 6]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#a855f7"
        />

        {/* Ambient starfield background */}
        <Starfield />

        {/* Floating atmospheric accent orbs */}
        <FloatingOrb position={[-3.2, 1.8, -2]} scale={0.45} color="#38bdf8" speed={0.9} />
        <FloatingOrb position={[3.4, -1.6, -1.5]} scale={0.5} color="#c084fc" speed={1.2} />
        <FloatingOrb position={[-2.8, -2.2, -3]} scale={0.35} color="#818cf8" speed={0.7} />

        {/* Hero 3D Animated Shape */}
        <MainShape
          geometry={geometry}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
          rotationSpeed={rotationSpeed}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8 * rotationSpeed}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
