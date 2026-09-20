'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'sphere' | 'icosahedron' | 'torus'
  speed?: number
  color?: string
  distort?: number
}

// Deterministic pseudo-random generator to maintain render purity
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function MainShape({
  shape = 'torusKnot',
  speed = 1.5,
  color = '#6366f1',
  distort = 0.45,
}: {
  shape: string
  speed: number
  color: string
  distort: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * (speed * 0.5)
    meshRef.current.rotation.x = time * 0.4
    meshRef.current.rotation.y = time * 0.6
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.1}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 4]} />}
        {shape === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}

        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function Starfield() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colorArray] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 8 + pseudoRandom(i * 3 + 1) * 12
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(pseudoRandom(i * 3 + 3) * 2 - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      // Gradient color palette: indigo/violet/cyan stars
      const mix = pseudoRandom(i * 3 + 4)
      if (mix > 0.6) {
        col[i * 3] = 0.6; col[i * 3 + 1] = 0.5; col[i * 3 + 2] = 1.0; // Violet
      } else if (mix > 0.3) {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 1.0; // Cyan
      } else {
        col[i * 3] = 0.5; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 0.9; // Indigo
      }
    }
    return [pos, col]
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
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  )
}

function AmbientFloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null!)

  const spheres = useMemo(() => {
    const temp = []
    for (let i = 0; i < 8; i++) {
      temp.push({
        position: [
          (pseudoRandom(i * 4) - 0.5) * 10,
          (pseudoRandom(i * 4 + 1) - 0.5) * 8,
          (pseudoRandom(i * 4 + 2) - 0.5) * 6 - 2,
        ] as [number, number, number],
        scale: 0.15 + pseudoRandom(i * 4 + 3) * 0.3,
        color: i % 2 === 0 ? '#38bdf8' : '#a855f7',
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.05
  })

  return (
    <group ref={groupRef}>
      {spheres.map((s, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={s.position} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color={s.color}
              roughness={0.2}
              metalness={0.9}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Scene({
  shape = 'torusKnot',
  speed = 1.5,
  color = '#6366f1',
  distort = 0.45,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <spotLight
          position={[0, 8, 8]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#38bdf8"
        />

        {/* Scene Objects */}
        <MainShape shape={shape} speed={speed} color={color} distort={distort} />
        <Starfield />
        <AmbientFloatingSpheres />
      </Canvas>
    </div>
  )
}
