'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'dodecahedron'
  color?: string
  wireframe?: boolean
  speed?: number
  scale?: number
  roughness?: number
  metalness?: number
}

function MainShape({
  shape = 'torusKnot',
  color = '#6366f1',
  wireframe = false,
  speed = 1,
  scale = 1,
  roughness = 0.2,
  metalness = 0.8,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.rotation.x = time * 0.25
    meshRef.current.rotation.y = time * 0.35
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.15
  })

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={1.2}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef} scale={scale}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 8]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[1.2, 0]} />}

        <meshPhysicalMaterial
          color={color}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>
    </Float>
  )
}

function FloatingParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useMemo(() => {
    const posArr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      posArr[i * 3] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 15
      // eslint-disable-next-line react-hooks/purity
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return [posArr]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05
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
        size={0.04}
        color="#a5b4fc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 18]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
        <pointLight position={[0, 5, -2]} intensity={1.2} color="#c084fc" />

        <MainShape {...props} />
        <FloatingParticles />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
