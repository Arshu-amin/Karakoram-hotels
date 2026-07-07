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

function Shape({ position, color, ...props }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 10) * Math.PI, 0.02)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 10) * Math.PI, 0.02)
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(t / 10) * Math.PI, 0.02)
  })

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position} {...props}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          samples={10}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          chromaticAberration={0.04}
          anisotropy={0.3}
          roughness={0}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.5}
          color={color}
        />
      </mesh>
    </Float>
  )
}

function SmallShapes() {
  const count = 15
  const shapes = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        // eslint-disable-next-line react-hooks/purity
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10] as [number, number, number],
        // eslint-disable-next-line react-hooks/purity
        scale: Math.random() * 0.5 + 0.2,
        color: i % 2 === 0 ? '#4f46e5' : '#c084fc'
      })
    }
    return temp
  }, [])

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={s.position} scale={s.scale}>
            <octahedronGeometry />
            <meshStandardMaterial color={s.color} wireframe />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={500} color="#c084fc" />

        <Shape position={[0, 0, 0]} color="#ffffff" />
        <SmallShapes />

        <Environment preset="night" />
        <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />

        <Rig />
      </Canvas>
    </div>
  )
}
