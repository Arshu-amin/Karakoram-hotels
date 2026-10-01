'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Code } from 'lucide-react'
import { CustomizerState } from './CustomizerControlPanel'

interface CodeExportModalProps {
  isOpen: boolean
  onClose: () => void
  state: CustomizerState
}

export default function CodeExportModal({ isOpen, onClose, state }: CodeExportModalProps) {
  const [copied, setCopied] = useState(false)

  const codeSnippet = `'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ${state.distort > 0 && !state.wireframe ? 'MeshDistortMaterial, ' : ''}Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Custom3DCanvas() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * ${(0.25 * (state.speed / 2)).toFixed(2)}
    meshRef.current.rotation.y = time * ${(0.35 * (state.speed / 2)).toFixed(2)}
  })

  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} color="${state.color}" />

        <Float speed={${state.speed}} rotationIntensity={1.2} floatIntensity={1.2}>
          <mesh ref={meshRef}>
            <${
              state.shape === 'torusKnot'
                ? 'torusKnotGeometry args={[1.1, 0.38, 128, 32]}'
                : state.shape === 'icosahedron'
                ? 'icosahedronGeometry args={[1.5, 4]}'
                : state.shape === 'sphere'
                ? 'sphereGeometry args={[1.4, 64, 64]}'
                : 'boxGeometry args={[2, 2, 2, 16, 16, 16]}'
            } />
            ${
              state.distort > 0 && !state.wireframe
                ? `<MeshDistortMaterial
              color="${state.color}"
              speed={${state.speed}}
              distort={${state.distort}}
              wireframe={${state.wireframe}}
              roughness={0.2}
              metalness={0.7}
            />`
                : `<meshPhysicalMaterial
              color="${state.color}"
              wireframe={${state.wireframe}}
              roughness={0.15}
              metalness={0.85}
              clearcoat={0.8}
            />`
            }
          </mesh>
        </Float>
      </Canvas>
    </div>
  )
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="glass w-full max-w-2xl rounded-3xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Generated React Three Fiber Code</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code View */}
            <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-indigo-300 border border-slate-800 max-h-[380px] overflow-y-auto leading-relaxed">
              <pre>{codeSnippet}</pre>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Ready to paste into your Next.js project
              </span>
              <button
                onClick={handleCopy}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Component Snippet
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
