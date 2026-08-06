'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  shape: 'torus' | 'sphere' | 'box' | 'icosahedron'
  color: string
  speed: number
  scale: number
  wireframe: boolean
}

function Particles({ count = 80, speed = 1 }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05 * speed
    pointsRef.current.rotation.x = time * 0.02 * speed
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
        color="#818cf8"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function InteractiveShape({ shape, color, speed, scale, wireframe }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
    meshRef.current.rotation.z = time * 0.1 * speed
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 120, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 1]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={shape === 'icosahedron'}
        />
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torus',
  color = '#4f46e5',
  speed = 1,
  scale = 1,
  wireframe = false,
}: Partial<SceneProps>) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#a5b4fc" />
        <pointLight position={[5, -5, 5]} intensity={1.2} color="#f472b6" />

        <InteractiveShape
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />

        <Particles count={100} speed={speed} />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  )
}
