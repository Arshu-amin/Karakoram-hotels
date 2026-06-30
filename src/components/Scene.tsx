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

function FloatingShapes() {
  const meshRef1 = useRef<THREE.Mesh>(null!)
  const meshRef2 = useRef<THREE.Mesh>(null!)

  const positions = useMemo(() => {
    return Array.from({ length: 20 }, () => [
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 10,
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 10,
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 5
    ])
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef1.current.rotation.x = THREE.MathUtils.lerp(meshRef1.current.rotation.x, Math.cos(t / 2) / 4 + 0.25, 0.1)
    meshRef1.current.rotation.y = THREE.MathUtils.lerp(meshRef1.current.rotation.y, Math.sin(t / 4) / 4, 0.1)
    meshRef1.current.rotation.z = THREE.MathUtils.lerp(meshRef1.current.rotation.z, Math.sin(t / 4) / 4, 0.1)

    meshRef2.current.position.y = Math.sin(t) * 0.5
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef1} scale={1.5}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#4f46e5"
          />
        </mesh>
      </Float>

      <mesh ref={meshRef2} position={[2, -1, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#818cf8" roughness={0} metalness={1} />
      </mesh>

      {positions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
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

        <FloatingShapes />

        <Environment preset="night" />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2.5}
          far={4.5}
        />
        <Rig />
      </Canvas>
    </div>
  )
}
