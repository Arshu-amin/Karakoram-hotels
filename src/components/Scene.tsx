'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Center } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveMeshProps {
  color: string
  position: [number, number, number]
  type: 'torus' | 'sphere' | 'octahedron'
}

function FloatingShape({ color, position, type }: InteractiveMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.25
    meshRef.current.rotation.z = time * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef}>
        {type === 'torus' && <torusGeometry args={[1.2, 0.4, 32, 64]} />}
        {type === 'sphere' && <sphereGeometry args={[1.1, 64, 64]} />}
        {type === 'octahedron' && <octahedronGeometry args={[1.3]} />}

        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1.0}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 350
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 18
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full bg-[#020617]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 } as unknown as THREE.PerspectiveCamera}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, -10, -5]} intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#c084fc" />

        <ParticleField />

        <Center>
          <FloatingShape type="torus" color="#6366f1" position={[-2.8, 1, -1]} />
          <FloatingShape type="sphere" color="#a855f7" position={[2.8, -1.2, -1.5]} />
          <FloatingShape type="octahedron" color="#38bdf8" position={[0.5, 2, -2]} />
        </Center>
      </Canvas>
    </div>
  )
}
