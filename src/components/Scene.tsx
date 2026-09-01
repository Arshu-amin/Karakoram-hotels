'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  color?: string
  speed?: number
  distortion?: number
  scale?: number
  shape?: 'torusknot' | 'icosahedron' | 'sphere' | 'torus'
  wireframe?: boolean
  roughness?: number
  metalness?: number
}

function Geometry({ shape }: { shape?: 'torusknot' | 'icosahedron' | 'sphere' | 'torus' }) {
  switch (shape) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1.3, 16]} />
    case 'sphere':
      return <sphereGeometry args={[1.2, 64, 64]} />
    case 'torus':
      return <torusGeometry args={[1.1, 0.4, 32, 100]} />
    case 'torusknot':
    default:
      return <torusKnotGeometry args={[1, 0.35, 128, 32]} />
  }
}

function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    // Deterministic pseudo-random generation to avoid SSR/purity warnings
    let seed = 42
    function rnd() {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() - 0.5) * 16
      pos[i * 3 + 1] = (rnd() - 0.5) * 16
      pos[i * 3 + 2] = (rnd() - 0.5) * 16
      sc[i] = rnd() * 0.8 + 0.2
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
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
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MainShape({
  color = '#6366f1',
  speed = 1,
  distortion = 0.4,
  scale = 1,
  shape = 'torusknot',
  wireframe = false,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3

    // Pulsing or distortion effect simulation via rotation & scale
    const pulse = 1 + Math.sin(time * 1.5) * 0.05 * distortion
    meshRef.current.scale.set(
      scale * pulse,
      scale * pulse,
      scale * pulse
    )
  })

  return (
    <Float speed={speed * 2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <Geometry shape={shape} />
        <meshPhysicalMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#38bdf8" />

        <MainShape {...props} />
        <Particles count={180} />

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
