'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars, Center } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'torus' | 'octahedron'

export interface SceneConfig {
  shape: ShapeType
  color: string
  speed: number
  distort: number
  wireframe: boolean
  roughness: number
  metalness: number
  rotationSpeed: number
}

interface AnimatedShapeProps {
  config: SceneConfig
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticleField() {
  const count = 300
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sca = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20
      sca[i] = pseudoRandom(i * 10 + 1) * 0.8 + 0.2
    }
    return [pos, sca]
  }, [])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={ringRef} scale={1.8}>
      <torusGeometry args={[1.6, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
    </mesh>
  )
}

function MainShape({ config }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.2 * config.rotationSpeed
      meshRef.current.rotation.y = time * 0.3 * config.rotationSpeed
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
    }
  })

  const renderGeometry = () => {
    switch (config.shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 16]} />
      case 'sphere':
        return <sphereGeometry args={[1.3, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 4]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={config.speed * 1.2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={config.color}
          speed={config.speed * 2}
          distort={config.distort}
          wireframe={config.wireframe}
          roughness={config.roughness}
          metalness={config.metalness}
        />
      </mesh>
    </Float>
  )
}

interface SceneProps {
  config?: SceneConfig
  interactive?: boolean
}

const defaultConfig: SceneConfig = {
  shape: 'torusKnot',
  color: '#6366f1',
  speed: 1.5,
  distort: 0.45,
  wireframe: false,
  roughness: 0.2,
  metalness: 0.8,
  rotationSpeed: 1,
}

export default function Scene({ config = defaultConfig, interactive = true }: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Dynamic Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color={config.color} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#ec4899"
        />

        <ParticleField />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <Center>
          <MainShape config={config} />
          <FloatingRing color={config.color} />
        </Center>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  )
}
