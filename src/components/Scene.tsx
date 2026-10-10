'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

export type ShapeType = 'torusKnot' | 'sphere' | 'icosahedron' | 'octahedron' | 'torus'

export interface SceneProps {
  speed?: number
  scale?: number
  color?: string
  shape?: ShapeType
  wireframe?: boolean
}

// Deterministic pseudo-random number generator to comply with React 19 render purity rules
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function FloatingShape({ speed = 1, scale = 1, color = '#6366f1', shape = 'torusKnot', wireframe = false }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed * 0.5
    meshRef.current.rotation.x = time * 0.6
    meshRef.current.rotation.y = time * 0.8
    meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.2
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 2]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.4, 0]} />}
        {shape === 'torus' && <torusGeometry args={[1.1, 0.4, 32, 100]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function SecondaryGeometries({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * -0.1
  })

  return (
    <group ref={groupRef}>
      {/* Floating Torus Ring 1 */}
      <mesh position={[-3.2, 1.8, -2]} rotation={[0.4, 0.5, 0]}>
        <torusGeometry args={[0.7, 0.08, 16, 64]} />
        <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>

      {/* Floating Tetrahedron 2 */}
      <mesh position={[3.5, -1.5, -2.5]} rotation={[0.2, 0.8, 0.4]}>
        <tetrahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.2} transparent opacity={0.7} />
      </mesh>

      {/* Floating Cube 3 */}
      <mesh position={[-2.8, -2.2, -1.5]} rotation={[0.5, 0.3, 0.7]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#c084fc" metalness={0.6} roughness={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function StarParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 300

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
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = time * 0.015
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
        color="#a5b4fc"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        {/* Ambient & Directional Lights */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#818cf8" />
        <pointLight position={[10, -10, -5]} intensity={0.8} color="#f472b6" />

        {/* 3D Elements */}
        <FloatingShape {...props} />
        <SecondaryGeometries color={props.color || '#6366f1'} />
        <StarParticles />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
