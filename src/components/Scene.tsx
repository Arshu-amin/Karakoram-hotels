'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  speed: number
  scale: number
  color: string
  shape: 'torusKnot' | 'sphere' | 'box' | 'octahedron'
}

function AnimatedShape({ speed, scale, color, shape }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)

  // Target values to smoothly transition (lerp) towards
  const targetScale = useRef(scale)
  const targetColor = useRef(new THREE.Color(color))

  useEffect(() => {
    targetScale.current = scale
  }, [scale])

  useEffect(() => {
    targetColor.current.set(color)
  }, [color])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Smooth lerps to avoid jarring shifts on control updates
    const scaleFactor = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale.current, 0.1)
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor)

    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor.current, 0.1)
    }

    // Rotations dependent on user-defined speed
    meshRef.current.rotation.x = time * 0.15 * speed
    meshRef.current.rotation.y = time * 0.25 * speed
    meshRef.current.rotation.z = time * 0.05 * speed
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 150, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1.5, 0]} />}

        <meshPhysicalMaterial
          ref={materialRef}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingParticles() {
  const count = 40
  const pointsRef = useRef<THREE.Points>(null!)

  // Stable random positions generated exactly once via useMemo to avoid lint and re-render mutation errors.
  const positionsArray = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // react-hooks/purity rules require direct suppression for Math.random in renders if flagged
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      // eslint-disable-next-line react-hooks/purity
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
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
          args={[positionsArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5b4fc"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}

export default function Scene({ speed, scale, color, shape }: SceneProps) {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[8, 8, 8]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          color="#a5b4fc"
        />
        <pointLight position={[-8, -8, -5]} intensity={0.8} color="#fbcfe8" />
        <directionalLight position={[0, 5, -5]} intensity={0.5} color="#818cf8" />

        <AnimatedShape speed={speed} scale={scale} color={color} shape={shape} />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
