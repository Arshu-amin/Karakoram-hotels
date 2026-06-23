'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
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

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const t = Math.random() * 100
      // eslint-disable-next-line react-hooks/purity
      const factor = 20 + Math.random() * 100
      // eslint-disable-next-line react-hooks/purity
      const speed = 0.01 + Math.random() / 200
      // eslint-disable-next-line react-hooks/purity
      const xFactor = -50 + Math.random() * 100
      // eslint-disable-next-line react-hooks/purity
      const yFactor = -50 + Math.random() * 100
      // eslint-disable-next-line react-hooks/purity
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor })
    }
    return temp
  }, [count])

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle
      const t = particle.t += speed / 2
      const s = Math.cos(t)

      dummy.position.set(
        (xFactor + Math.cos(t) * factor) / 10,
        (yFactor + Math.sin(t) * factor) / 10,
        (zFactor + Math.cos(t) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshStandardMaterial color="#6366f1" emissive="#4f46e5" />
    </instancedMesh>
  )
}

function MainObject() {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <Float rotationIntensity={2} floatIntensity={2} speed={2}>
      <mesh ref={mesh} scale={1.5}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.5}
          anisotropicBlur={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          roughness={0}
          transmission={1}
          ior={1.2}
          color="#818cf8"
        />
      </mesh>
    </Float>
  )
}

function FloatingShapes() {
  return (
    <>
      <Float position={[3, 2, -2]} rotation={[Math.PI / 4, 0, 0]} speed={3}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ec4899" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float position={[-3, -1, -1]} rotation={[0, Math.PI / 3, 0]} speed={4}>
        <mesh>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float position={[2, -2, 1]} rotation={[Math.PI / 2, 0, Math.PI / 4]} speed={2}>
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full bg-slate-950">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

        <React.Suspense fallback={null}>
          <MainObject />
          <FloatingShapes />
          <Particles count={150} />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
        </React.Suspense>
        <Rig />
      </Canvas>
    </div>
  )
}
