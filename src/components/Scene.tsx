'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

// Simple deterministic pseudo-random generator
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type ShapeType = 'torusKnot' | 'sphere' | 'icosahedron' | 'torus'

export interface SceneConfig {
  shape: ShapeType
  color: string
  speed: number
  distort: number
  wireframe: boolean
  scale: number
}

interface AnimatedShapeProps {
  config: SceneConfig
}

function AnimatedMesh({ config }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * config.speed
      meshRef.current.rotation.y += delta * 0.3 * config.speed

      // Gentle mouse tilt interaction
      const mouseX = state.pointer.x * 0.4
      const mouseY = state.pointer.y * 0.4
      meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.02
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.02
    }
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 8]} />
      case 'torus':
        return <torusGeometry args={[1.1, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={config.speed * 1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={config.scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={config.color}
          speed={config.speed * 2}
          distort={config.distort}
          wireframe={config.wireframe}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 250, color = '#6366f1' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sca = new Float32Array(count)
    let seed = 42

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 18
      sca[i] = pseudoRandom(seed++) * 1.5
    }
    return [pos, sca]
  }, [count])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04
      pointsRef.current.rotation.x += delta * 0.02
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
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const defaultConfig: SceneConfig = {
  shape: 'torusKnot',
  color: '#6366f1',
  speed: 1,
  distort: 0.35,
  wireframe: false,
  scale: 1,
}

interface SceneProps {
  config?: SceneConfig
}

export default function Scene({ config = defaultConfig }: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color={config.color} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#a855f7"
        />

        <AnimatedMesh config={config} />
        <ParticleField color={config.color} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
