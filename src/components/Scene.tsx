'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei'
import * as THREE from 'three'

function Shape() {
  const mesh = useRef<THREE.Mesh>(null!)

  // Use constant values for consistency
  const config = {
    backside: true,
    samples: 16,
    resolution: 512,
    transmission: 1,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    thickness: 1.5,
    backsideThickness: 0.5,
    ior: 1.5,
    chromaticAberration: 0.1,
    anisotropy: 0.1,
    distortion: 0.1,
    distortionScale: 0.1,
    temporalDistortion: 0.1,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
    color: '#818cf8',
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.cos(time / 4) * 0.2
    mesh.current.rotation.y = Math.sin(time / 4) * 0.2
    mesh.current.rotation.z += 0.005
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial {...config} />
      </mesh>
    </Float>
  )
}

function Particles({ count = 100 }) {
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

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
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
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <Shape />
        <Particles count={200} />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4.5}
        />

        <Environment preset="night" />
        <Rig />
      </Canvas>
    </div>
  )
}
