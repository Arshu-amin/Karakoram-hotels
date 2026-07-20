'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface ShapesProps {
  count?: number
}

function FloatingShapes({ count = 25 }: ShapesProps) {
  // Use a constant seed or pre-determined layout to guarantee rendering purity
  const items = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // AvoidMath.random during render cycles or use exact seed
      // Using deterministic generation derived from loop index
      const sin = Math.sin(i * 1.7)
      const cos = Math.cos(i * 2.3)
      const tan = Math.sin(i * 3.1)

      temp.push({
        position: [sin * 6, cos * 4, tan * 3] as [number, number, number],
        scale: Math.abs(sin) * 0.4 + 0.15,
        speed: Math.abs(cos) * 1.5 + 0.5,
        type: i % 3,
      })
    }
    return temp
  }, [count])

  return (
    <>
      {items.map((item, index) => {
        return (
          <Float
            key={index}
            speed={item.speed}
            rotationIntensity={1.5}
            floatIntensity={1.5}
          >
            <mesh position={item.position} scale={item.scale}>
              {item.type === 0 ? (
                <octahedronGeometry args={[1, 0]} />
              ) : item.type === 1 ? (
                <tetrahedronGeometry args={[0.8, 0]} />
              ) : (
                <torusGeometry args={[0.6, 0.2, 16, 32]} />
              )}
              <meshPhysicalMaterial
                color={index % 2 === 0 ? '#818cf8' : '#c084fc'}
                roughness={0.1}
                metalness={0.8}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        )
      })}
    </>
  )
}

function CentralStructure() {
  const outerRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.15
      outerRef.current.rotation.y = time * 0.25
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3
      innerRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <group>
      {/* Dynamic central metallic torus knot */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={outerRef}>
          <torusKnotGeometry args={[1.2, 0.35, 150, 20]} />
          <meshPhysicalMaterial
            color="#4f46e5"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1.0}
          />
        </mesh>
      </Float>

      {/* Floating neon inner core sphere */}
      <Float speed={4} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh ref={innerRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshPhysicalMaterial
            color="#ec4899"
            roughness={0.2}
            metalness={0.1}
            emissive="#db2777"
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Cinematic dynamic lighting configuration */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#c084fc" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[0, 0, 2]} intensity={1.0} color="#ec4899" />

        <CentralStructure />
        <FloatingShapes count={20} />
      </Canvas>
    </div>
  )
}
