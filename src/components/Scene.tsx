'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

function RigidObjects() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  // Create static positions/rotations to avoid random on each render
  const geometries = useMemo(() => [
    new THREE.IcosahedronGeometry(1, 15),
    new THREE.TorusGeometry(0.8, 0.35, 16, 100),
    new THREE.OctahedronGeometry(1.2, 0),
  ], [])

  return (
    <>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={1.5 + i}
          rotationIntensity={2}
          floatIntensity={2}
          position={[((i - 1) * 3), (i % 2 === 0 ? 1 : -1), 0]}
        >
          <mesh
            geometry={geo}
            ref={(el) => { meshRefs.current[i] = el }}
          >
            <MeshTransmissionMaterial
              backside
              backsideThickness={5}
              thickness={2}
              samples={10}
              transmission={1}
              clearcoat={1}
              clearcoatRoughness={0}
              chromaticAberration={0.5}
              anisotropy={0.3}
              roughness={0}
              distortion={0.5}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#e0e7ff"
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2, 5),
      0.05
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />

        <RigidObjects />

        <Rig />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
