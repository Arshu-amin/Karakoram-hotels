'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
  PerspectiveCamera,
  ContactShadows
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
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: [
        // eslint-disable-next-line react-hooks/purity
        (Math.random() - 0.5) * 10,
        // eslint-disable-next-line react-hooks/purity
        (Math.random() - 0.5) * 10,
        // eslint-disable-next-line react-hooks/purity
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      // eslint-disable-next-line react-hooks/purity
      scale: Math.random() * 0.5 + 0.2,
      // eslint-disable-next-line react-hooks/purity
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      // eslint-disable-next-line react-hooks/purity
      speed: Math.random() * 0.5 + 0.2
    }))
  }, [])

  return (
    <>
      {shapes.map((props, i) => (
        <Float key={i} speed={props.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={1}
              chromaticAberration={0.02}
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
      ))}
    </>
  )
}

function CentralObject() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.5}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          clearcoat={1}
          attenuationDistance={1}
          attenuationColor="#ffffff"
          color="#818cf8"
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <CentralObject />
        <FloatingShapes />

        <Rig />
        <Environment preset="night" />
        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
      </Canvas>
    </div>
  )
}
