'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere'

interface SceneProps {
  geometry?: GeometryType
  color?: string
  speed?: number
  wireframe?: boolean
  scale?: number
}

// Pseudo-random generator for purity in React 19
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function Starfield({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#e879f9'),
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Spread stars in a sphere around scene
      const radius = 12 + pseudoRandom(i * 3 + 1) * 18
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i * 3 + 3) - 1)

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)

      const col = colorPalette[Math.floor(pseudoRandom(i * 3 + 4) * colorPalette.length)]
      cols[i3] = col.r
      cols[i3 + 1] = col.g
      cols[i3 + 2] = col.b
    }
    return [pos, cols]
  }, [count])

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
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MainShape({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  wireframe = false,
  scale = 1.3,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const outerWireRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * (speed * 0.6)
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.y = t * 0.7
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.4
    }
    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = -t * 0.3
      outerWireRef.current.rotation.y = -t * 0.5
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 2]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.3, 0]} />
      case 'sphere':
        return <sphereGeometry args={[1.1, 48, 48]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1, 0.32, 128, 32, 2, 3]} />
    }
  }

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1.2}>
      <group scale={scale}>
        {/* Core Mesh */}
        <mesh ref={meshRef}>
          {renderGeometry()}
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={wireframe}
          />
        </mesh>

        {/* Outer glowing orbital cage */}
        {!wireframe && (
          <mesh ref={outerWireRef} scale={1.25}>
            <icosahedronGeometry args={[1.3, 1]} />
            <meshBasicMaterial
              color={color}
              wireframe
              transparent
              opacity={0.2}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export default function Scene({
  geometry = 'torusKnot',
  color = '#6366f1',
  speed = 1,
  wireframe = false,
  scale = 1.3,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={1.5} color="#ec4899" />
        <pointLight position={[5, -10, 5]} intensity={1.2} color="#06b6d4" />

        <MainShape
          geometry={geometry}
          color={color}
          speed={speed}
          wireframe={wireframe}
          scale={scale}
        />
        <Starfield count={280} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
