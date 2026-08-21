'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus' | 'sphere' | 'cube'

export interface SceneProps {
  color?: string
  geometry?: GeometryType
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

function GeometryMesh({ geometry }: { geometry: GeometryType }) {
  switch (geometry) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.5, 8]} />
    case 'octahedron':
      return <octahedronGeometry args={[1.6, 2]} />
    case 'torus':
      return <torusGeometry args={[1.2, 0.4, 32, 100]} />
    case 'sphere':
      return <sphereGeometry args={[1.4, 64, 64]} />
    case 'cube':
      return <boxGeometry args={[1.8, 1.8, 1.8]} />
    case 'torusKnot':
    default:
      return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
  }
}

function MainAnimatedObject({
  color = '#6366f1',
  geometry = 'torusKnot',
  speed = 1.5,
  wireframe = false,
  scale = 1,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.25 * speed
    meshRef.current.rotation.y = time * 0.35 * speed

    // Subtle parallax response to pointer position
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      state.pointer.x * 0.5,
      delta * 2
    )

    if (materialRef.current) {
      // Smooth color interpolation
      materialRef.current.color.lerp(new THREE.Color(color), delta * 4)
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={scale}>
        <GeometryMesh geometry={geometry} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          wireframe={wireframe}
          transparent={true}
          opacity={wireframe ? 0.85 : 0.95}
        />
      </mesh>
    </Float>
  )
}

function FloatingRing({ radius, color, speed, rotX, rotY }: { radius: number; color: string; speed: number; rotX: number; rotY: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.z = time * speed
  })

  return (
    <mesh ref={ringRef} rotation={[rotX, rotY, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} wireframe />
    </mesh>
  )
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

function ParticlesBackground() {
  const count = 150
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const baseColor = new THREE.Color('#818cf8')
    const altColor = new THREE.Color('#c084fc')

    let seed = 12345
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 1] = (pseudoRandom(seed++) - 0.5) * 18
      pos[i * 3 + 2] = (pseudoRandom(seed++) - 0.5) * 18

      const mixed = pseudoRandom(seed++) > 0.5 ? baseColor : altColor
      col[i * 3] = mixed.r
      col[i * 3 + 1] = mixed.g
      col[i * 3 + 2] = mixed.b
    }
    return [pos, col]
  }, [count])

  const particlesRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={particlesRef}>
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, -8, -5]} intensity={1} color="#6366f1" />
        <pointLight position={[8, 8, 5]} intensity={1.5} color="#c084fc" />

        {/* Sparkles Particle Field */}
        <Sparkles count={80} scale={12} size={2.5} speed={0.4} opacity={0.5} color="#818cf8" />
        <ParticlesBackground />

        {/* Decorative Concentric Floating Rings */}
        <FloatingRing radius={2.6} color="#818cf8" speed={0.2} rotX={Math.PI / 4} rotY={Math.PI / 6} />
        <FloatingRing radius={3.2} color="#c084fc" speed={-0.15} rotX={-Math.PI / 3} rotY={Math.PI / 4} />

        {/* Central Dynamic Object */}
        <MainAnimatedObject {...props} />
      </Canvas>
    </div>
  )
}
