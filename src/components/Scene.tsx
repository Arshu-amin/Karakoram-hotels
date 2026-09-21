'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Simple deterministic pseudo random function to comply with pure render guidelines
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export type SceneProps = {
  shape?: 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'torus'
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  materialStyle?: 'distort' | 'physical'
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate deterministic particle positions
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      const y = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      const z = (pseudoRandom(i * 3 + 3) - 0.5) * 20
      const factor = pseudoRandom(i + 100) * 0.4 + 0.1
      const speed = pseudoRandom(i + 200) * 0.5 + 0.2
      temp.push({ x, y, z, factor, speed, baseScale: pseudoRandom(i + 300) * 0.08 + 0.02 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    particles.forEach((p, i) => {
      const { x, y, z, factor, speed, baseScale } = p
      dummy.position.set(
        x + Math.sin(t * speed + factor) * 0.5,
        y + Math.cos(t * speed + factor) * 0.5,
        z + Math.sin(t * speed) * 0.5
      )
      dummy.scale.set(baseScale, baseScale, baseScale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
    </instancedMesh>
  )
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  distort = 0.35,
  wireframe = false,
  materialStyle = 'distort',
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.25
    meshRef.current.rotation.y = time * 0.35
    meshRef.current.rotation.z = time * 0.1
  })

  const renderGeometry = () => {
    switch (shape) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1.5, 8]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.6, 4]} />
      case 'sphere':
        return <sphereGeometry args={[1.5, 64, 64]} />
      case 'torus':
        return <torusGeometry args={[1.3, 0.4, 32, 100]} />
      case 'torusKnot':
      default:
        return <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
    }
  }

  return (
    <Float speed={2 * speed} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {materialStyle === 'physical' ? (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        ) : (
          <MeshDistortMaterial
            color={color}
            speed={2 * speed}
            distort={distort}
            wireframe={wireframe}
            roughness={0.2}
            metalness={0.5}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 1.0,
  distort = 0.35,
  wireframe = false,
  materialStyle = 'distort',
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.25}
          penumbra={1}
          intensity={2}
          color={color}
        />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <pointLight position={[10, -10, 10]} intensity={0.8} color="#06b6d4" />

        <MainShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          materialStyle={materialStyle}
        />

        <FloatingParticles count={100} />
        <Stars radius={50} depth={50} count={1200} factor={4} saturation={0.5} fade speed={1} />

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
