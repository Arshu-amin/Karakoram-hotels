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

function Shape({ color, ...props }: { color: string; [key: string]: unknown }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const config = useMemo(() => ({
    backside: true,
    samples: 16,
    resolution: 512,
    transmission: 1,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    thickness: 0.5,
    backsideThickness: 0.5,
    ior: 1.5,
    chromaticAberration: 0.06,
    anisotropy: 0.1,
    distortion: 0.5,
    distortionScale: 0.5,
    temporalDistortion: 0.5,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
    color: color,
  }), [color])

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} {...props}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial {...config} />
      </mesh>
    </Float>
  )
}

function Particles({ count = 100 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.4} />
    </points>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />

        <Shape color="#818cf8" position={[0, 0, 0]} scale={1.2} />

        <Particles count={200} />

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4.5}
        />

        <Environment preset="city" />
        <Rig />
      </Canvas>
    </div>
  )
}
