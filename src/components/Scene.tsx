'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)

  const sphere = useMemo(() => {
    const points = new Float32Array(3000 * 3)
    // eslint-disable-next-line react-hooks/purity
    const random = () => Math.random()
    for (let i = 0; i < 3000; i++) {
      const r = 10
      const theta = 2 * Math.PI * random()
      const phi = Math.acos(2 * random() - 1)
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      points[i * 3 + 2] = r * Math.cos(phi)
    }
    return points
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.x = time * 0.05
    ref.current.rotation.y = time * 0.075
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function FloatingShapes() {
  return (
    <>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 1, -2]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#818cf8" wireframe />
        </mesh>
      </Float>
      <Float speed={5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, -2, -1]}>
          <torusGeometry args={[0.8, 0.2, 16, 32]} />
          <meshStandardMaterial color="#c084fc" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c084fc" />
        <ParticleField />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
