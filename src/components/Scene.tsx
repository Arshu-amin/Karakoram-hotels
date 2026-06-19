'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, 5), 0.05)
    camera.lookAt(0, 0, 0)
  })
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
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.2}
          thickness={0.1}
          transmission={1}
          roughness={0.1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#c7d2fe"
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
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

        <GlassShape />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />

        <CameraRig />
      </Canvas>
    </div>
  )
}
