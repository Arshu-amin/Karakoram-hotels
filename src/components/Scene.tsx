'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 5),
      0.05
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function FloatingShape({ position, color, speed }: {
  position: [number, number, number],
  color: string,
  speed: number
}) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          transmission={0.95}
          color={color}
        />
      </mesh>
    </Float>
  )
}

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.5}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          transmission={1}
          color="#818cf8"
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <CameraRig />
        <TorusKnot />

        <FloatingShape position={[-3, 2, -2]} color="#c084fc" speed={4} />
        <FloatingShape position={[3, -2, -3]} color="#6366f1" speed={3} />

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.4}
          scale={20}
          blur={2.4}
          far={4.5}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
