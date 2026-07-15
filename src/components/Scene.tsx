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
  const meshRef = useRef<THREE.Mesh>(null!)

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 15), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} geometry={geometry} scale={1.5}>
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
          color="#c7d2fe"
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 100 }: { count?: number }) {
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
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.4} />
    </points>
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
        <Particles count={200} />

        <Rig />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />

        <Environment preset="night" />

        {/* Sync background with CSS --background variable */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />
      </Canvas>
    </div>
  )
}
