'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  PerspectiveCamera,
  Stars
} from '@react-three/drei'
import * as THREE from 'three'

function AnimatedBackground() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#020617', 5, 20]} />
    </>
  )
}

function GlassShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.5, 0.5, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#818cf8"
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 5),
      0.05
    )
    state.camera.lookAt(0, 0, 0)
  })
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

        <AnimatedBackground />
        <GlassShape />

        <Environment preset="night" />
        <Rig />
      </Canvas>
    </div>
  )
}
