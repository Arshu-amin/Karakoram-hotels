'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export interface SceneProps {
  shape?: 'torusKnot' | 'icosahedron' | 'sphere' | 'cube';
  color?: string;
  speed?: number;
  distort?: number;
  wireframe?: boolean;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function ParticleGalaxy({ count = 1000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    let seed = 12345;
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + pseudoRandom(seed++) * 10;
      const theta = pseudoRandom(seed++) * Math.PI * 2;
      const phi = Math.acos(pseudoRandom(seed++) * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      const t = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.y = t;
      pointsRef.current.rotation.x = t * 0.2;
    }
  });

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
        color="#a5b4fc"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedShape({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = time * 0.25 * (speed / 2)
      meshRef.current.rotation.y = time * 0.35 * (speed / 2)
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {shape === 'torusKnot' && <torusKnotGeometry args={[1.1, 0.38, 128, 32]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1.5, 4]} />}
        {shape === 'sphere' && <sphereGeometry args={[1.4, 64, 64]} />}
        {shape === 'cube' && <boxGeometry args={[2, 2, 2, 16, 16, 16]} />}

        {distort > 0 && !wireframe ? (
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            wireframe={wireframe}
            roughness={0.2}
            metalness={0.7}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            wireframe={wireframe}
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        )}
      </mesh>
    </Float>
  )
}

export default function Scene({
  shape = 'torusKnot',
  color = '#6366f1',
  speed = 2,
  distort = 0.4,
  wireframe = false,
}: SceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color={color} />
        <spotLight
          position={[0, 10, 10]}
          angle={0.25}
          penumbra={1}
          intensity={1.2}
          color="#a855f7"
        />

        <ParticleGalaxy count={900} />
        <AnimatedShape
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
