'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torus' | 'icosahedron' | 'octahedron' | 'sphere'

export interface SceneProps {
  shape?: ShapeType
  speed?: number
  color?: string
  distort?: number
  wireframe?: boolean
  scale?: number
}

// Pseudo-random generator for React 19 purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const numPoints = 350
    const pos = new Float32Array(numPoints * 3)
    let seed = 42
    for (let i = 0; i < numPoints * 3; i += 3) {
      pos[i] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i + 1] = (pseudoRandom(seed++) - 0.5) * 20
      pos[i + 2] = (pseudoRandom(seed++) - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = time * 0.02
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
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function OrbitalRings({ color }: { color: string }) {
  const ring1Ref = useRef<THREE.Mesh>(null!)
  const ring2Ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15
      ring1Ref.current.rotation.y = time * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.1
      ring2Ref.current.rotation.z = time * 0.15
    }
  })

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} wireframe />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.25} wireframe />
      </mesh>
    </group>
  )
}

function AnimatedShape({
  shape = 'torus',
  speed = 1,
  color = '#6366f1',
  distort = 0.35,
  wireframe = false,
  scale = 1
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.25
      meshRef.current.rotation.y = time * 0.35
    }
  })

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.32, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 8]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.3, 3]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}

        <MeshDistortMaterial
          color={color}
          speed={3 * speed}
          distort={distort}
          wireframe={wireframe}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto select-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} color="#f472b6" />
        <pointLight position={[0, 5, 2]} intensity={1} color="#c084fc" />

        <StarField />
        <AnimatedShape {...props} />
        <OrbitalRings color={props.color || '#6366f1'} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
