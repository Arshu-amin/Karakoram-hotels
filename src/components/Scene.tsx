'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape: 'torusKnot' | 'sphere' | 'icosahedron' | 'box'
  color: string
  speed: number
  distort: number
  scale: number
  wireframe: boolean
  roughness: number
}

function ParticleField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorChoices = ['#6366f1', '#a855f7', '#38bdf8', '#818cf8']

    // Deterministic pseudo-random sequence based on index
    function pseudoRandom(seed: number) {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20

      const c = new THREE.Color(colorChoices[i % colorChoices.length])
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
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
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function InteractiveShape({ config }: { config: SceneConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 * config.speed
      meshRef.current.rotation.y = time * 0.25 * config.speed
    }
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.4, 4]} />
      case 'box':
        return <boxGeometry args={[1.8, 1.8, 1.8]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float
      speed={1.5 * config.speed}
      rotationIntensity={1}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef} scale={config.scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={config.color}
          speed={config.speed * 2}
          distort={config.distort}
          wireframe={config.wireframe}
          roughness={config.roughness}
          metalness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  config?: SceneConfig
}

export default function Scene({
  config = {
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1,
    distort: 0.45,
    scale: 1,
    wireframe: false,
    roughness: 0.2,
  },
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#c084fc" />
        <pointLight position={[0, 5, -5]} intensity={0.8} color="#38bdf8" />

        <InteractiveShape config={config} />
        <ParticleField count={200} />

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
