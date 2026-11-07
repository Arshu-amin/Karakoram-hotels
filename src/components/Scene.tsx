'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export type GeometryType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'cyberSphere'

export interface SceneProps {
  geometryType?: GeometryType
  color?: string
  wireframe?: boolean
  rotationSpeed?: number
  distortSpeed?: number
}

// Deterministic pseudo-random number generator to satisfy react-hooks/purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function StarfieldParticles({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 22
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 22
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 16
      sc[i] = pseudoRandom(i * 4 + 7) * 0.8 + 0.2
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.05
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.4
      pointsRef.current.rotation.x = t * 0.2
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
        color="#a5b4fc"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2
      ringRef.current.rotation.y = t * 0.3
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#4338ca"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  )
}

function MainShape({
  geometryType = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  rotationSpeed = 1,
}: {
  geometryType?: GeometryType
  color?: string
  wireframe?: boolean
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * rotationSpeed
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25
      meshRef.current.rotation.y = t * 0.45
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.15
    }
  })

  return (
    <Float speed={2 * rotationSpeed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {geometryType === 'torusKnot' && (
          <torusKnotGeometry args={[1.05, 0.32, 128, 32]} />
        )}
        {geometryType === 'icosahedron' && (
          <icosahedronGeometry args={[1.35, 1]} />
        )}
        {geometryType === 'octahedron' && (
          <octahedronGeometry args={[1.4, 0]} />
        )}
        {geometryType === 'cyberSphere' && (
          <sphereGeometry args={[1.25, 32, 32]} />
        )}

        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.7}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={wireframe ? 0.4 : 0.15}
        />
      </mesh>
    </Float>
  )
}

function MouseParallaxRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.8,
      0.03
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.8,
      0.03
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene({
  geometryType = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  rotationSpeed = 1,
}: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 6, 18]} />

        {/* Ambient & Directional Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-6, -4, -3]} intensity={1.8} color="#c084fc" />
        <pointLight position={[6, -4, 3]} intensity={1.2} color="#38bdf8" />
        <spotLight
          position={[0, 10, 5]}
          intensity={1.2}
          angle={0.6}
          penumbra={0.8}
          color="#818cf8"
        />

        {/* 3D Elements */}
        <StarfieldParticles count={320} />
        <FloatingRing />
        <MainShape
          geometryType={geometryType}
          color={color}
          wireframe={wireframe}
          rotationSpeed={rotationSpeed}
        />

        <MouseParallaxRig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
