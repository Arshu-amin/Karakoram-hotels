'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torus' | 'icosahedron' | 'sphere' | 'cyber'
  color?: string
  speed?: number
  distort?: number
  wireframe?: boolean
  scale?: number
}

// Particle field around 3D mesh
function StarField() {
  const count = 300
  const pointsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3)
    let seed = 42
    function nextRand() {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    for (let i = 0; i < count * 3; i += 3) {
      posArray[i] = (nextRand() - 0.5) * 16
      posArray[i + 1] = (nextRand() - 0.5) * 16
      posArray[i + 2] = (nextRand() - 0.5) * 16
    }
    return posArray
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
    }
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
        size={0.03}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function CyberGroup({
  color,
  speed,
  distort,
  wireframe
}: {
  color: string
  speed: number
  distort: number
  wireframe: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (groupRef.current) {
      groupRef.current.rotation.z = time * 0.2
      groupRef.current.rotation.y = time * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.3, 0.1, 16, 100]} />
        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.04, 16, 100]} />
        <meshPhysicalMaterial
          color="#ec4899"
          wireframe={wireframe}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <icosahedronGeometry args={[0.8, 2]} />
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort * 0.5}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  )
}

function AnimatedShape({
  shape = 'torus',
  color = '#6366f1',
  speed = 1,
  distort = 0.4,
  wireframe = false,
  scale = 1
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.2}>
      <group scale={[scale, scale, scale]}>
        {shape === 'cyber' ? (
          <CyberGroup
            color={color}
            speed={speed}
            distort={distort}
            wireframe={wireframe}
          />
        ) : (
          <mesh ref={meshRef}>
            {shape === 'icosahedron' && <icosahedronGeometry args={[1.5, 8]} />}
            {shape === 'sphere' && <sphereGeometry args={[1.4, 64, 64]} />}
            {shape === 'torus' && <torusKnotGeometry args={[1.1, 0.35, 128, 16]} />}
            <MeshDistortMaterial
              color={color}
              speed={speed * 2}
              distort={distort}
              wireframe={wireframe}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color={props.color || '#6366f1'} />
        <spotLight position={[0, 10, 0]} intensity={1} color="#a855f7" />

        <StarField />
        <AnimatedShape {...props} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
