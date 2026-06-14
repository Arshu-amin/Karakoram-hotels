'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={2}
          distort={0.4}
          roughness={0}
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AnimatedShape />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
