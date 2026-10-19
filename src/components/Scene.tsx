'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape?: 'torus' | 'icosahedron' | 'box' | 'ring'
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  metalness?: number
  roughness?: number
}

interface AnimatedMeshProps {
  config: SceneConfig
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 1200

  // Deterministic particle positions using pseudoRandom generator to avoid React 19 purity issues
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sca = new Float32Array(count)

    let seed = 42
    function pseudoRandom() {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 25
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 25
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 25
      sca[i] = pseudoRandom() * 0.08 + 0.02
    }
    return [pos, sca]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.05
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * 0.2
      pointsRef.current.rotation.y = time * 0.3
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
        color="#a855f7"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function MainMesh({ config }: AnimatedMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const {
    shape = 'torus',
    color = '#6366f1',
    speed = 1.5,
    scale = 1.2,
    wireframe = false,
    metalness = 0.8,
    roughness = 0.2,
  } = config

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25
      meshRef.current.rotation.y = time * 0.4
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.2
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.32, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 3]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'ring' && <torusGeometry args={[1.2, 0.35, 32, 100]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function OrbitingSatellites() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.5
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[2.8, 1, 0]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshPhysicalMaterial color="#38bdf8" metalness={0.9} roughness={0.1} emissive="#0284c7" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-2.8, -0.8, 0.5]}>
        <tetrahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial color="#ec4899" metalness={0.9} roughness={0.1} emissive="#db2777" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -2.5, -1.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial color="#a855f7" metalness={0.9} roughness={0.1} emissive="#9333ea" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

interface SceneProps {
  config?: SceneConfig
}

export default function Scene({ config = {} }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#818cf8" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#ec4899" />

        <ParticleField />
        <MainMesh config={config} />
        <OrbitingSatellites />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
