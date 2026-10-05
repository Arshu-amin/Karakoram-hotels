'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'torus'
  color: string
  speed: number
  scale: number
  wireframe: boolean
}

interface MainMeshProps {
  config: SceneConfig
}

function MainMesh({ config }: MainMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * config.speed
      meshRef.current.rotation.y += delta * 0.4 * config.speed
    }
  })

  return (
    <Float speed={2 * config.speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={config.scale}>
        {config.shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {config.shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 2]} />}
        {config.shape === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}
        {config.shape === 'torus' && <torusGeometry args={[1, 0.4, 32, 100]} />}

        <meshPhysicalMaterial
          color={config.color}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={config.wireframe}
        />
      </mesh>
    </Float>
  )
}

function FloatingArtifacts() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.08
      groupRef.current.rotation.x += delta * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-3.5, 2, -2]} scale={0.5}>
          <octahedronGeometry />
          <meshPhysicalMaterial color="#38bdf8" roughness={0.2} metalness={0.9} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <mesh position={[3.8, -1.8, -1]} scale={0.6}>
          <tetrahedronGeometry />
          <meshPhysicalMaterial color="#c084fc" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={2.5} floatIntensity={1}>
        <mesh position={[-2.8, -2.5, -3]} scale={0.4}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#f43f5e" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[3, 2.5, -2.5]} scale={0.45}>
          <torusGeometry args={[0.8, 0.2, 16, 50]} />
          <meshPhysicalMaterial color="#818cf8" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  )
}

function DeterministicStarfield() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    // Simple deterministic pseudo-random generator
    let seed = 42
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 20
      pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 20 - 2

      // Subtle cyan to purple color tinting
      col[i * 3] = 0.5 + pseudoRandom() * 0.5
      col[i * 3 + 1] = 0.6 + pseudoRandom() * 0.4
      col[i * 3 + 2] = 0.9 + pseudoRandom() * 0.1
    }

    return [pos, col]
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
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
        opacity={0.8}
        sizeAttenuation
      />
    </points>
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
    scale: 1,
    wireframe: false,
  },
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#818cf8" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#c084fc" />

        <MainMesh config={config} />
        <FloatingArtifacts />
        <DeterministicStarfield />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
