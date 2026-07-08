'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function RigidObjects() {
  const count = 10
  const groupRef = useRef<THREE.Group>(null!)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const x = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      const y = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      const z = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      const s = Math.random() * 1.5 + 0.5
      temp.push({ x, y, z, s })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.1
    groupRef.current.rotation.z = time * 0.05
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={2 * p.s} rotationIntensity={p.s} floatIntensity={p.s}>
          <mesh position={[p.x, p.y, p.z]} scale={p.s}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              backsideThickness={0.2}
              thickness={0.5}
              roughness={0.1}
              transmission={1}
              ior={1.2}
              chromaticAberration={0.02}
              anisotropy={0.1}
              distortion={0}
              distortionScale={0}
              temporalDistortion={0}
              clearcoat={1}
              attenuationDistance={0.5}
              attenuationColor="#ffffff"
              color="#e2e8f0"
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 8), 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <fog attach="fog" args={['#020617', 5, 20]} />
        <color attach="background" args={['#020617']} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        <pointLight position={[10, 5, -5]} intensity={0.8} color="#9333ea" />

        <RigidObjects />
        <Rig />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
