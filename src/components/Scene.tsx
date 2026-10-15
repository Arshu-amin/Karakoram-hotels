'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneConfig {
  shape?: 'torusKnot' | 'icosahedron' | 'cube' | 'sphere'
  color?: string
  speed?: number
  scale?: number
  wireframe?: boolean
  distortion?: number
  roughness?: number
  metalness?: number
  particleCount?: number
}

function MainObject({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  scale = 1.2,
  wireframe = false,
  distortion = 0.4,
  roughness = 0.2,
  metalness = 0.8,
}: SceneConfig) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 * speed
      meshRef.current.rotation.y = time * 0.25 * speed
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.2
    }
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.3, 4]} />}
        {shape === 'cube' && <boxGeometry args={[1.8, 1.8, 1.8]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.4, 64, 64]} />}

        {distortion > 0 ? (
          <MeshDistortMaterial
            color={color}
            speed={speed * 1.5}
            distort={distortion}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        ) : (
          <MeshWobbleMaterial
            color={color}
            speed={speed}
            factor={0.3}
            wireframe={wireframe}
            roughness={roughness}
            metalness={metalness}
          />
        )}
      </mesh>
    </Float>
  )
}

function BackgroundParticles({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorOptions = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#e879f9'),
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20
      pos[i3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20
      pos[i3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20

      const randomColor = colorOptions[Math.floor(pseudoRandom(i * 3 + 4) * colorOptions.length)]
      col[i3] = randomColor.r
      col[i3 + 1] = randomColor.g
      col[i3 + 2] = randomColor.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.2
      ringRef.current.rotation.y = time * 0.2
    }
  })

  return (
    <mesh ref={ringRef} scale={[2.4, 2.4, 2.4]}>
      <torusGeometry args={[1, 0.015, 16, 100]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} wireframe />
    </mesh>
  )
}

export default function Scene(props: SceneConfig) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#38bdf8" />
        <spotLight position={[0, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#818cf8" />

        <MainObject {...props} />
        <FloatingRing />
        <BackgroundParticles count={props.particleCount || 800} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}
