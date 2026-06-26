'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

function Shape({
  position,
  args,
  rotationSpeed = 1,
  color = 'white'
}: {
  position: [number, number, number],
  args: [number, number, number, number],
  rotationSpeed?: number,
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const timeRef = useRef(0)
  useFrame((_state, delta) => {
    timeRef.current += delta
    const time = timeRef.current
    meshRef.current.rotation.x = Math.sin(time * 0.2 * rotationSpeed)
    meshRef.current.rotation.y = Math.cos(time * 0.3 * rotationSpeed)
  })

  return (
    <Float speed={2 * rotationSpeed} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={args} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={1}
          samples={16}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.2}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color={color}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 5), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

function SceneContent() {
  // Use useMemo to avoid Math.random() during render for purity
  const shapes = useMemo(() => {
    // Fixed seed values instead of Math.random() for deterministic results in this context,
    // or just predefined values.
    return [
      { position: [-2, 1, 0] as [number, number, number], args: [0.8, 0.2, 128, 16] as [number, number, number, number], color: '#818cf8', speed: 0.8 },
      { position: [2, -1, -1] as [number, number, number], args: [0.6, 0.15, 128, 16] as [number, number, number, number], color: '#c084fc', speed: 1.2 },
      { position: [-1, -2, 1] as [number, number, number], args: [0.5, 0.2, 128, 16] as [number, number, number, number], color: '#f472b6', speed: 1 },
    ]
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

      {shapes.map((props, i) => (
        <Shape key={i} {...props} rotationSpeed={props.speed} />
      ))}

      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2.4}
        far={4.5}
      />

      <Environment preset="city" />
      <Rig />
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <SceneContent />
      </Canvas>
    </div>
  )
}
