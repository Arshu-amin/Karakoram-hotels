'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Sphere, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={3}
          distort={0.4}
          roughness={0.1}
          metalness={0.8}
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
      // Using deterministic values to satisfy purity check,
      // or we can just use a simple seeded pseudo-random if needed.
      // For simplicity here, we'll use a predictable distribution.
      const t = (i / count) * 100
      const factor = 20 + (i % 10) * 10
      const speed = 0.01 + (i % 5) / 500
      const xFactor = -50 + (i % 7) * 15
      const yFactor = -50 + (i % 3) * 30
      const zFactor = -50 + (i % 4) * 25
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
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function FloatingSpheres() {
  return (
    <>
      <Float speed={1} rotationIntensity={1} floatIntensity={1} position={[-4, 2, -2]}>
        <Sphere args={[0.5, 32, 32]}>
          <MeshWobbleMaterial color="#8b5cf6" speed={1} factor={0.6} />
        </Sphere>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5} position={[4, -2, -3]}>
        <Sphere args={[0.8, 32, 32]}>
          <MeshWobbleMaterial color="#ec4899" speed={1.5} factor={0.4} />
        </Sphere>
      </Float>
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#ec4899" />

        <AnimatedShape />
        <FloatingSpheres />
        <Particles count={40} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
