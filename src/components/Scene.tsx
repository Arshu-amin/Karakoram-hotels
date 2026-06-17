'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingShapeProps {
  shape: React.ReactNode
  color: string
  position: [number, number, number]
  rotationSpeed: { x: number; y: number }
  scale: number
}

function FloatingShape({ shape, color, position, rotationSpeed, scale }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * rotationSpeed.x
    meshRef.current.rotation.y = time * rotationSpeed.y

    // Mouse interaction
    const mouseX = state.mouse.x * 2
    const mouseY = state.mouse.y * 2
    meshRef.current.position.x = position[0] + mouseX * 0.5
    meshRef.current.position.y = position[1] + mouseY * 0.5
  })

  return (
    <Float speed={2 * scale} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {shape}
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          color={color}
        />
      </mesh>
    </Float>
  )
}

function Shapes() {
  const shapes = useMemo(() => [
    {
      shape: <torusKnotGeometry args={[1, 0.35, 128, 32]} />,
      color: '#818cf8',
      position: [0, 0, 0] as [number, number, number],
      rotationSpeed: { x: 0.2, y: 0.3 },
      scale: 1
    },
    {
      shape: <sphereGeometry args={[0.7, 32, 32]} />,
      color: '#c084fc',
      position: [-4, 2, -2] as [number, number, number],
      rotationSpeed: { x: 0.5, y: 0.2 },
      scale: 0.8
    },
    {
      shape: <boxGeometry args={[1, 1, 1]} />,
      color: '#60a5fa',
      position: [4, -2, -1] as [number, number, number],
      rotationSpeed: { x: 0.1, y: 0.4 },
      scale: 0.6
    },
    {
      shape: <octahedronGeometry args={[1]} />,
      color: '#f472b6',
      position: [-3, -2, 1] as [number, number, number],
      rotationSpeed: { x: 0.3, y: 0.1 },
      scale: 0.5
    },
    {
      shape: <torusGeometry args={[0.6, 0.2, 16, 100]} />,
      color: '#2dd4bf',
      position: [3, 2, 2] as [number, number, number],
      rotationSpeed: { x: 0.4, y: 0.5 },
      scale: 0.7
    }
  ], [])

  return (
    <>
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
    </>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 8), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#818cf8" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#c084fc" />

        <Shapes />
        <Rig />

        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.4}
          scale={20}
          blur={2.5}
          far={4.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
