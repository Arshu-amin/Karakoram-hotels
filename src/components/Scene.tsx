'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, ScrollControls, useScroll, Float } from '@react-three/drei'
import * as THREE from 'three'

// Rig component that introduces mouse-responsive camera movement
function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// Background environment with floating 3D dust particles
function Particles() {
  const count = 120
  const pointsRef = useRef<THREE.Points>(null!)

  // Generate stable random particle positions and scales
  // Pure mapping using stable calculations to satisfy React 19 rules
  const { positions, sizes } = useMemo(() => {
    const posArray = new Float32Array(count * 3)
    const sizeArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random generation to avoid math.random purity rules
      const seed1 = Math.sin(i * 12.9898) * 43758.5453
      const seed2 = Math.cos(i * 78.233) * 43758.5453
      const seed3 = Math.sin((i + 120) * 43.123) * 87521.1234

      const r1 = seed1 - Math.floor(seed1)
      const r2 = seed2 - Math.floor(seed2)
      const r3 = seed3 - Math.floor(seed3)

      posArray[i * 3] = (r1 - 0.5) * 15
      posArray[i * 3 + 1] = (r2 - 0.5) * 15
      posArray[i * 3 + 2] = (r3 - 0.5) * 10 - 2

      sizeArray[i] = r3 * 0.08 + 0.02
    }
    return { positions: posArray, sizes: sizeArray }
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.x = time * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Refractive high-fidelity geometry whose transformation is tied to scroll progress
function InteractiveGlassShape() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const r = scroll.range(0, 1) // scroll progress from 0 to 1

    // Apply continuous float rotation combined with scroll progress
    meshRef.current.rotation.x = time * 0.15 + r * Math.PI * 1.5
    meshRef.current.rotation.y = time * 0.2 + r * Math.PI * 2.0
    meshRef.current.rotation.z = time * 0.1

    // Position and scale morphing relative to scroll progress
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -r * 2.5, 0.1)
    const currentScale = 1.3 - r * 0.3
    meshRef.current.scale.setScalar(currentScale)
  })

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.45, 64, 100]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.2}
          thickness={0.8}
          roughness={0.1}
          transmission={0.95}
          ior={1.2}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#a5b4fc"
        />
      </mesh>
    </Float>
  )
}

// Accent outer abstract orbit rings
function OrbitRings() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const r = scroll.range(0, 1)
    groupRef.current.rotation.y = -time * 0.1 - r * Math.PI
    groupRef.current.rotation.x = time * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Outer Thin Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.25} />
      </mesh>
      {/* Outer Thin Ring 2 */}
      <mesh rotation={[Math.PI / 3, -0.4, 0.5]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Cinematic dark fog to match --background (#020617) */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 12]} />

        {/* Ambient & Spotlight setups for perfect lighting */}
        <ambientLight intensity={0.6} />
        <spotLight
          position={[12, 12, 10]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          color="#818cf8"
        />
        <spotLight
          position={[-12, -12, -10]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          color="#ec4899"
        />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#c084fc" />

        {/* ScrollControls allows synchronization of WebGL animations with page scrolling */}
        <ScrollControls pages={3} damping={0.1}>
          <InteractiveGlassShape />
          <OrbitRings />
          <Particles />
        </ScrollControls>

        {/* Mouse tracking Camera Rig */}
        <Rig />
      </Canvas>
    </div>
  )
}
