'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Stars,
  PerspectiveCamera,
  useScroll,
  ScrollControls,
  Scroll
} from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      p[i * 3] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      // eslint-disable-next-line react-hooks/purity
      p[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return p
  }, [count])

  const ref = useRef<THREE.Points>(null!)
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.y = time * 0.05
    ref.current.rotation.x = time * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#6366f1" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function FloatingObject({ position, rotation, scale, color }: { position: [number, number, number], rotation: [number, number, number], scale: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x += 0.001
    meshRef.current.rotation.y += 0.002
    meshRef.current.position.y += Math.sin(time + position[0]) * 0.001
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor={color}
          color={color}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  const scroll = useScroll()
  useFrame((state) => {
    const offset = scroll ? scroll.offset : 0
    state.camera.position.lerp(new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 8 + offset * 10), 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 5, 20]} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Particles />

      <FloatingObject position={[-2, 1, 0]} rotation={[0, 0, 0]} scale={0.8} color="#6366f1" />
      <FloatingObject position={[3, -2, -2]} rotation={[1, 1, 1]} scale={1.2} color="#a855f7" />
      <FloatingObject position={[-4, -3, -4]} rotation={[0.5, 0, 0.5]} scale={1.5} color="#f472b6" />

      <Rig />
      <Environment preset="night" />
    </>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]}>
        <ScrollControls pages={3} damping={0.2}>
          <SceneContent />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
