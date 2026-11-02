'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torus' | 'icosahedron' | 'sphere' | 'ring'

export interface SceneProps {
  geometry?: GeometryType
  primaryColor?: string
  accentColor?: string
  wireframe?: boolean
  speed?: number
  distort?: number
}

// Deterministic pseudo-random number generator for purity in React 19
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function FloatingParticles({ count = 120, color = '#818cf8' }: { count?: number; color?: string }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 16
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 16
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 16
    }
    return [pos]
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
          args={[positions, 3]}
          attach="attributes-position"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function DynamicMesh({
  geometry = 'torus',
  primaryColor = '#6366f1',
  wireframe = false,
  speed = 1,
  distort = 0.35,
}: {
  geometry: GeometryType
  primaryColor: string
  wireframe: boolean
  speed: number
  distort: number
}) {
  const primaryMeshRef = useRef<THREE.Mesh>(null!)
  const innerMeshRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    if (primaryMeshRef.current) {
      primaryMeshRef.current.rotation.x = t * 0.25
      primaryMeshRef.current.rotation.y = t * 0.35
      primaryMeshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.4
      innerMeshRef.current.rotation.y = t * 0.2
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <group>
        {/* Main interactive mesh */}
        <mesh ref={primaryMeshRef} scale={1.2}>
          {geometry === 'torus' && <torusKnotGeometry args={[1.05, 0.32, 128, 24]} />}
          {geometry === 'icosahedron' && <icosahedronGeometry args={[1.3, 2]} />}
          {geometry === 'sphere' && <sphereGeometry args={[1.3, 64, 64]} />}
          {geometry === 'ring' && <torusGeometry args={[1.3, 0.28, 32, 100]} />}

          <MeshDistortMaterial
            color={primaryColor}
            speed={2 * speed}
            distort={distort}
            roughness={0.15}
            metalness={0.85}
            wireframe={wireframe}
          />
        </mesh>

        {/* Inner energy core */}
        <mesh ref={innerMeshRef} scale={0.55}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={primaryColor}
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Orbiting Tech Ring */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 3, 0, 0]} scale={1.8}>
            <torusGeometry args={[1.1, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

export default function Scene({
  geometry = 'torus',
  primaryColor = '#6366f1',
  accentColor = '#38bdf8',
  wireframe = false,
  speed = 1,
  distort = 0.35,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -4, -4]} intensity={1.2} color={accentColor} />
        <pointLight position={[6, -4, 4]} intensity={1} color={primaryColor} />

        <FloatingParticles count={100} color={accentColor} />

        <DynamicMesh
          geometry={geometry}
          primaryColor={primaryColor}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
      </Canvas>
    </div>
  )
}
