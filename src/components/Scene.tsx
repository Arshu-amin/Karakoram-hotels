'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  const { mouse } = useThree()

  // Generate random positions once for purity
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Rotate the particles
    ref.current.rotation.x = time * 0.05
    ref.current.rotation.y = time * 0.07

    // Subtle follow mouse
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.2, 0.1)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.2, 0.1)
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function AnimatedShapes() {
  const groupRef = useRef<THREE.Group>(null!)
  const { mouse } = useThree()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Smooth group floating
    groupRef.current.position.y = Math.sin(time) * 0.1

    // Mouse interaction for the whole group
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.5, 0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.1)
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-2, 0.5, -1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.1} metalness={0.8} emissive="#4f46e5" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[2, -0.5, 1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#a855f7" roughness={0.1} metalness={0.8} emissive="#a855f7" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2.5} floatIntensity={1}>
        <mesh position={[0, -1.5, -2]}>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial color="#6366f1" roughness={0.1} metalness={0.8} emissive="#6366f1" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Particles />
        <AnimatedShapes />
      </Canvas>
    </div>
  )
}
