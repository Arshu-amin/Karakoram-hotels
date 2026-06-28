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

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05)
    camera.lookAt(0, 0, 0)
  })
}

function FloatingShapes() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}>
        <mesh position={[-2, 1, -2]} rotation={[1.2, 0.5, 0]}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={3}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color="#a5b4fc"
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[2, -1, -1]} rotation={[0, 0.5, 1.2]}>
          <torusGeometry args={[0.5, 0.2, 32, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#c084fc"
          />
        </mesh>
      </Float>
    </>
  )
}

function MainShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <group>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 3]} />
          <MeshTransmissionMaterial
            backside
            samples={10}
            thickness={1.5}
            chromaticAberration={0.1}
            anisotropy={0.5}
            distortion={0.3}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#6366f1"
            roughness={0.1}
          />
        </mesh>
      </Float>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} />
      </points>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />

        <MainShape />
        <FloatingShapes />

        <Rig />
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
