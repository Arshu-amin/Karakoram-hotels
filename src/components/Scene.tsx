'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei'
import * as THREE from 'three'

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, 5), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Use a constant for seed to maintain purity in React 19/Next 16
  const config = useMemo(() => ({
    backside: true,
    samples: 16,
    resolution: 512,
    transmission: 1,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    thickness: 1.5,
    backsideThickness: 0.5,
    ior: 1.5,
    chromaticAberration: 0.04,
    anisotropy: 0.1,
    distortion: 0.1,
    distortionScale: 0.1,
    temporalDistortion: 0.1,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
    color: '#c7d2fe',
  }), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial {...config} />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Shape />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Environment preset="city" />
        <Rig />
      </Canvas>
    </div>
  )
}
