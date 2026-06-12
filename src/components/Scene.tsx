'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  MeshDistortMaterial,
  Float,
  PerspectiveCamera,
  ContactShadows,
  Environment,
  Points,
  PointMaterial
} from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      p[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [count])

  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = time * 0.02
  })

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4338ca" />

        <AnimatedShape />
        <Particles count={3000} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}
