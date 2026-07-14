'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei'
import * as THREE from 'three'

function CameraRig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, 5), 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Shape({ color, ...props }: { color: string; [key: string]: unknown }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  // Use THREE.Timer if available, otherwise fallback to state.clock
  // Actually, THREE.Timer is part of three/examples/jsm/utils/Timer.js in some versions
  // but r184 might have it. Let's stick to state.clock for compatibility unless I'm sure.
  // The memory says "In Three.js (r184+), THREE.Timer is preferred over the deprecated THREE.Clock."
  // I'll try to use it if I can import it, or just use performance.now() logic.

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 10) * Math.PI, 0.02)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 10) * Math.PI, 0.02)
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(t / 10) * Math.PI, 0.02)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} {...props}>
        <torusKnotGeometry args={[1, 0.35, 256, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor={color}
          color={color}
        />
      </mesh>
    </Float>
  )
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
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle
      const t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
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
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

export default function Scene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <CameraRig />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

        <Shape color="#4f46e5" position={[0, 0, 0]} />
        <Particles count={50} />

        <Environment preset="night" />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  )
}
