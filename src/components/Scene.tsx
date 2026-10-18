'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron' | 'sphere'

export interface SceneProps {
  color?: string
  geometryType?: GeometryType
  speed?: number
  distort?: number
  wireframe?: boolean
  metalness?: number
  roughness?: number
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const count = 1000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 8 + pseudoRandom(i * 3 + 1) * 20
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(pseudoRandom(i * 3 + 3) * 2 - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      col[i * 3] = 0.5 + pseudoRandom(i * 3 + 4) * 0.5
      col[i * 3 + 1] = 0.6 + pseudoRandom(i * 3 + 5) * 0.4
      col[i * 3 + 2] = 0.9 + pseudoRandom(i * 3 + 6) * 0.1
    }

    return [pos, col]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime()
      pointsRef.current.rotation.y = time * 0.02
      pointsRef.current.rotation.x = time * 0.01
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

function MainShape({
  color = '#6366f1',
  geometryType = 'torusKnot',
  speed = 1,
  wireframe = false,
  metalness = 0.8,
  roughness = 0.2
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        {geometryType === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.38, 128, 32]} />}
        {geometryType === 'icosahedron' && <icosahedronGeometry args={[1.4, 4]} />}
        {geometryType === 'torus' && <torusGeometry args={[1.2, 0.45, 32, 100]} />}
        {geometryType === 'octahedron' && <octahedronGeometry args={[1.5, 3]} />}
        {geometryType === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          metalness={metalness}
          roughness={roughness}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 5, 25]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#a855f7" />
        <pointLight position={[10, -5, 5]} intensity={0.8} color="#38bdf8" />

        <MainShape {...props} />
        <StarField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
