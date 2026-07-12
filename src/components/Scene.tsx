'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Points,
  PointMaterial
} from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      // eslint-disable-next-line react-hooks/purity
      p[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [])

  const ref = useRef<THREE.Points>(null!)
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.05
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
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

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          samples={16}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          chromaticAberration={0.04}
          anisotropy={0.3}
          roughness={0}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.5}
          color="#818cf8"
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <Particles />
        <AnimatedShape />
        <Rig />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
