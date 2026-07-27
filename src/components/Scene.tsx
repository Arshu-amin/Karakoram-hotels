'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  activeShapeIndex?: number;
  colorTheme?: string;
}

function InteractiveShape({
  activeShapeIndex = 0,
  colorTheme = '#6366f1',
  scrollY
}: {
  activeShapeIndex: number;
  colorTheme: string;
  scrollY: React.RefObject<number | null>;
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const mesh0Ref = useRef<THREE.Mesh>(null!)
  const mesh1Ref = useRef<THREE.Mesh>(null!)
  const mesh2Ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const currentScrollY = scrollY.current || 0
    const scrollMax = typeof window !== 'undefined' ? (document.documentElement.scrollHeight - window.innerHeight || 1) : 1
    const scrollRatio = Math.min(Math.max(currentScrollY / scrollMax, 0), 1)

    // Smooth base rotation responsive to time and scroll position
    groupRef.current.rotation.x = time * 0.15 + scrollRatio * Math.PI
    groupRef.current.rotation.y = time * 0.2 + scrollRatio * Math.PI * 1.5

    // Smoothly shift positions based on scroll ratio to clear the UI viewport areas
    // Shift slightly right on higher scroll, or center, depending on page sections
    const targetX = Math.sin(scrollRatio * Math.PI * 1.5) * 1.2
    const targetY = Math.cos(scrollRatio * Math.PI) * 0.4
    const targetZ = -scrollRatio * 1.5

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05)

    // Smoothly scale shapes in and out based on the active state
    const shape0Scale = THREE.MathUtils.lerp(mesh0Ref.current.scale.x, activeShapeIndex === 0 ? 1 : 0, 0.1)
    mesh0Ref.current.scale.set(shape0Scale, shape0Scale, shape0Scale)

    const shape1Scale = THREE.MathUtils.lerp(mesh1Ref.current.scale.x, activeShapeIndex === 1 ? 1 : 0, 0.1)
    mesh1Ref.current.scale.set(shape1Scale, shape1Scale, shape1Scale)

    const shape2Scale = THREE.MathUtils.lerp(mesh2Ref.current.scale.x, activeShapeIndex === 2 ? 1 : 0, 0.1)
    mesh2Ref.current.scale.set(shape2Scale, shape2Scale, shape2Scale)
  })

  return (
    <group ref={groupRef}>
      {/* Shape 0: Glossy Torus Knot */}
      <mesh ref={mesh0Ref}>
        <torusKnotGeometry args={[0.85, 0.26, 120, 16]} />
        <meshPhysicalMaterial
          color={colorTheme}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Shape 1: Glossy Octahedron */}
      <mesh ref={mesh1Ref} scale={[0, 0, 0]}>
        <octahedronGeometry args={[1.1, 1]} />
        <meshPhysicalMaterial
          color={colorTheme}
          metalness={0.8}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Shape 2: Glossy Icosahedron */}
      <mesh ref={mesh2Ref} scale={[0, 0, 0]}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color={colorTheme}
          metalness={0.95}
          roughness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.15}
        />
      </mesh>
    </group>
  )
}

export default function Scene({ activeShapeIndex = 0, colorTheme = '#6366f1' }: SceneProps) {
  const scrollYRef = useRef<number | null>(null)

  useEffect(() => {
    scrollYRef.current = window.scrollY
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 4, 8]} />

        {/* Balanced aesthetic studio lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
          <InteractiveShape
            activeShapeIndex={activeShapeIndex}
            colorTheme={colorTheme}
            scrollY={scrollYRef}
          />
        </Float>
      </Canvas>
    </div>
  )
}
