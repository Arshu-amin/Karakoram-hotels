'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torus' | 'sphere' | 'octahedron' | 'ring' | 'cyber'
  color?: string
  speed?: number
  scale?: number
  metalness?: number
  distort?: number
  roughness?: number
  wireframe?: boolean
}

// Deterministic pseudo-random number generator for React 19 purity compliance
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function ParticleField({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 4 + pseudoRandom(i * 3 + 1) * 8
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = (pseudoRandom(i * 3 + 3) - 0.5) * Math.PI

      pos[i3] = r * Math.cos(theta) * Math.cos(phi)
      pos[i3 + 1] = r * Math.sin(phi)
      pos[i3 + 2] = r * Math.sin(theta) * Math.cos(phi)

      sc[i] = pseudoRandom(i * 3 + 4) * 0.08 + 0.02
    }
    return [pos, sc]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#818cf8"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function Main3DShape({
  shape = 'torus',
  color = '#6366f1',
  speed = 1.5,
  scale = 1,
  metalness = 0.6,
  distort = 0.35,
  roughness = 0.2,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const effSpeed = speed * 0.5

    meshRef.current.rotation.x = time * effSpeed * 0.4
    meshRef.current.rotation.y = time * effSpeed * 0.6

    if (ringRef.current) {
      ringRef.current.rotation.x = -time * effSpeed * 0.3
      ringRef.current.rotation.z = time * effSpeed * 0.5
    }

    // Gentle mouse parallax effect
    const mouseX = state.pointer.x * 0.5
    const mouseY = state.pointer.y * 0.5
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.05)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.05)
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <group scale={[scale, scale, scale]}>
        {/* Main Interactive Shape */}
        <mesh ref={meshRef}>
          {shape === 'torus' && <torusKnotGeometry args={[1, 0.35, 128, 32]} />}
          {shape === 'sphere' && <sphereGeometry args={[1.2, 64, 64]} />}
          {shape === 'octahedron' && <octahedronGeometry args={[1.4, 3]} />}
          {shape === 'ring' && <torusGeometry args={[1.3, 0.3, 32, 100]} />}
          {shape === 'cyber' && <icosahedronGeometry args={[1.3, 2]} />}

          {distort > 0 ? (
            <MeshDistortMaterial
              color={color}
              speed={speed}
              distort={distort}
              metalness={metalness}
              roughness={roughness}
              wireframe={wireframe}
            />
          ) : (
            <meshPhysicalMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
              clearcoat={0.8}
              clearcoatRoughness={0.1}
              wireframe={wireframe}
            />
          )}
        </mesh>

        {/* Outer Accent Orbit Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
        </mesh>
      </group>
    </Float>
  )
}

export default function Scene(props: SceneProps) {
  return (
    <div className="h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={1.2} color="#38bdf8" />

        <Main3DShape {...props} />
        <ParticleField count={150} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
