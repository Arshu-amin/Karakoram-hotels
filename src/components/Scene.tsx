'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'torus' | 'dodecahedron'
  color?: string
  speed?: number
  distortion?: number
  wireframe?: boolean
  roughness?: number
  metalness?: number
}

interface SceneProps {
  config?: SceneConfig
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 350

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 18
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015
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

function GeometrySwitch({ shape }: { shape: string }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.2, 8]} />
    case 'sphere':
      return <sphereGeometry args={[1.2, 64, 64]} />
    case 'torus':
      return <torusGeometry args={[1, 0.4, 32, 100]} />
    case 'dodecahedron':
      return <dodecahedronGeometry args={[1.2, 0]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
  }
}

function MainObject({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const {
    shape = 'torusKnot',
    color = '#6366f1',
    speed = 2,
    distortion = 0.35,
    wireframe = false,
    roughness = 0.2,
    metalness = 0.8
  } = config

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.15 * (speed / 2)
      meshRef.current.rotation.y = time * 0.25 * (speed / 2)
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <GeometrySwitch shape={shape} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distortion}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    </Float>
  )
}

function FloatingAccents({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-2.8, 1.8, -1]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={color} wireframe transparent opacity={0.7} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[2.8, -1.5, -0.5]}>
          <tetrahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={4} rotationIntensity={1.5} floatIntensity={2.5}>
        <mesh position={[2.2, 2.0, -2]}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene({ config = {} }: SceneProps) {
  const color = config.color || '#6366f1'

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color={color} />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#38bdf8" />

        <MainObject config={config} />
        <FloatingAccents color={color} />
        <Particles />

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
