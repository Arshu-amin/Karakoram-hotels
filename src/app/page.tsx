'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Shield,
  Palette,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Code2,
  Sliders,
  Box,
  Compass,
  ChevronRight,
  Send,
  Eye,
  Check
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono">Initializing 3D Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PALETTES = [
  { name: 'Neon Indigo', value: '#6366f1', text: 'text-indigo-400' },
  { name: 'Cyber Purple', value: '#a855f7', text: 'text-purple-400' },
  { name: 'Cosmic Cyan', value: '#06b6d4', text: 'text-cyan-400' },
  { name: 'Solar Pink', value: '#ec4899', text: 'text-pink-400' },
  { name: 'Emerald Flux', value: '#10b981', text: 'text-emerald-400' },
]

const SHAPES: { type: ShapeType; label: string; desc: string }[] = [
  { type: 'torusKnot', label: 'Torus Knot', desc: 'Complex topological geometry' },
  { type: 'icosahedron', label: 'Icosahedron', desc: 'Facet crystalline matrix' },
  { type: 'sphere', label: 'Fluid Sphere', desc: 'Organic deformation surface' },
  { type: 'torus', label: 'Hyper Torus', desc: 'Symmetric orbital ring' },
]

const CODE_EXAMPLES = {
  torusKnot: `// 3D Spatial Geometry Matrix
import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export function SpatialNode() {
  return (
    <mesh rotation={[0.4, 0.6, 0]}>
      <torusKnotGeometry args={[1.1, 0.34, 128, 32]} />
      <MeshDistortMaterial
        color="#6366f1"
        speed={2.4}
        distort={0.4}
        metalness={0.85}
      />
    </mesh>
  )
}`,
  icosahedron: `// Crystalline Lattice Shader
export function PolyhedronNode() {
  return (
    <mesh>
      <icosahedronGeometry args={[1.35, 3]} />
      <MeshDistortMaterial
        color="#a855f7"
        speed={1.8}
        distort={0.3}
        roughness={0.2}
      />
    </mesh>
  )
}`,
  sphere: `// Dynamic Fluid Deformation Surface
export function FluidCore() {
  return (
    <mesh>
      <sphereGeometry args={[1.3, 64, 64]} />
      <MeshDistortMaterial
        color="#06b6d4"
        speed={3.2}
        distort={0.65}
      />
    </mesh>
  )
}`,
  torus: `// Orbital Ring Resonance
export function OrbitalMatrix() {
  return (
    <mesh>
      <torusGeometry args={[1.2, 0.45, 32, 100]} />
      <MeshDistortMaterial
        color="#ec4899"
        speed={1.5}
        distort={0.25}
      />
    </mesh>
  )
}`
}

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>('torusKnot')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [distortion, setDistortion] = useState(0.35)
  const [speed, setSpeed] = useState(1.8)
  const [wireframe, setWireframe] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 3D Canvas Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Scene
          shape={selectedShape}
          color={selectedColor}
          distortion={distortion}
          speed={speed}
          wireframe={wireframe}
        />
      </div>

      {/* Grid Pattern and Ambient Glow Overlays */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 radial-glow-top pointer-events-none z-0" />
      <div className="fixed inset-0 radial-glow-center pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                Aether<span className="text-indigo-400">3D</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.5
                </span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#playground" className="hover:text-indigo-400 transition-colors">Visualizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#playground"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-indigo-300 rounded-lg bg-indigo-950/60 border border-indigo-700/50 hover:bg-indigo-900/50 transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Tune Engine
            </a>
            <a
              href="#pricing"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-28">
        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-7rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-indigo-500/30 mb-8 shadow-inner"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">Next-Gen WebGL & Spatial UI Engine</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
          >
            Crafting the Next <br />
            <span className="text-gradient-accent">Spatial Dimension</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            Immerse your users with fluid WebGL graphics, tactile micro-interactions,
            and real-time 3D shaders running natively in the browser at 120 FPS.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
          >
            <a
              href="#playground"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-200 shadow-xl shadow-white/10 flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <Sliders className="w-5 h-5 text-indigo-600" />
              Launch Playground
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold glass-panel glass-panel-hover text-slate-200 flex items-center justify-center gap-3 transition-all"
            >
              Explore Architecture
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </a>
          </motion.div>

          {/* Hero Metrics Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 glass-panel p-6 rounded-2xl border-white/10 w-full max-w-4xl"
          >
            {[
              { label: 'Frame Rendering', value: '120 FPS', sub: 'Zero Drop' },
              { label: 'Bundle Footprint', value: '< 18 KB', sub: 'Compressed' },
              { label: 'Shader Latency', value: '0.4 ms', sub: 'Hardware Sync' },
              { label: 'Web Standards', value: 'WebGL 2.0', sub: 'Three.js r184' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-medium text-indigo-300 mt-1">{stat.label}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* INTERACTIVE 3D PLAYGROUND SECTION */}
        <section id="playground" className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Real-Time Control Room
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Direct Engine Customizer
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Adjust the physical mesh geometry, distortion fields, chromatic palette, and rotation speeds live in the 3D viewport.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border-white/10">
              {/* Shape Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
                  <Box className="w-4 h-4 text-indigo-400" />
                  Select Geometry Lattice
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {SHAPES.map((shape) => {
                    const isActive = selectedShape === shape.type
                    return (
                      <button
                        key={shape.type}
                        onClick={() => setSelectedShape(shape.type)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          isActive
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-sm font-semibold flex items-center justify-between">
                          {shape.label}
                          {isActive && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">{shape.desc}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Color Palette Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-purple-400" />
                  Chromatic Luminescence
                </label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_PALETTES.map((palette) => {
                    const isSelected = selectedColor === palette.value
                    return (
                      <button
                        key={palette.value}
                        onClick={() => setSelectedColor(palette.value)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shadow-inner"
                          style={{ backgroundColor: palette.value }}
                        />
                        {palette.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sliders for Distortion & Speed */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Distortion Warp
                    </span>
                    <span className="text-indigo-300 font-bold">{Math.round(distortion * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distortion}
                    onChange={(e) => setDistortion(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      Vortex Velocity
                    </span>
                    <span className="text-indigo-300 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4"
                    step="0.2"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 flex items-center justify-between border-t border-white/5">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Wireframe Topology
                </span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      wireframe ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Code / Visualizer Inspector Preview */}
            <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden border-white/10 flex flex-col">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-3">EngineState.ts</span>
                </div>
                <div className="flex rounded-lg bg-slate-800/80 p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                      activeTab === 'preview'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspector
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                      activeTab === 'code'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Shader JSX
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                {activeTab === 'preview' ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                      <div>
                        <div className="text-xs font-mono text-slate-500">ACTIVE PRIMITIVE</div>
                        <div className="text-lg font-bold text-white uppercase">{selectedShape}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-slate-500">HEX CHROMA</div>
                        <div className="text-lg font-mono font-bold" style={{ color: selectedColor }}>
                          {selectedColor}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5">
                        <div className="text-xs text-slate-400 mb-1">Renderer Pipeline</div>
                        <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> WebGL 2.0 Active
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900/30 border border-white/5">
                        <div className="text-xs text-slate-400 mb-1">Surface Distort</div>
                        <div className="text-sm font-semibold text-indigo-400">
                          {Math.round(distortion * 100)}% Warping Factor
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      Notice the ambient particles drifting through 3D space, reactive dual orbital rings,
                      and metallic physical clearcoat reflections bouncing off the dynamic lighting arrays.
                    </p>
                  </div>
                ) : (
                  <pre className="font-mono text-xs sm:text-sm text-indigo-200 bg-slate-950/80 p-5 rounded-2xl border border-white/5 overflow-x-auto leading-relaxed">
                    <code>{CODE_EXAMPLES[selectedShape]}</code>
                  </pre>
                )}

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Target FPS: 120</span>
                  <span>Geometry Vertices: 4,096</span>
                  <span className="text-emerald-400">Status: Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section id="features" className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Modern Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Engineered for the Modern Web
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Designed from the ground up for maximum visual fidelity, low CPU overhead, and responsive responsiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-400" />,
                title: "Accelerated GPU Shaders",
                desc: "Harness hardware-accelerated WebGL pipelines with custom vertex shaders and dynamic noise distortion.",
                tag: "Ultra Fast"
              },
              {
                icon: <Layers className="w-6 h-6 text-purple-400" />,
                title: "Glassmorphic Surface Design",
                desc: "Frosted translucent backdrops with high-order Gaussian blurs and adaptive specular borders.",
                tag: "Aesthetic"
              },
              {
                icon: <Compass className="w-6 h-6 text-cyan-400" />,
                title: "Responsive Spatial Camera",
                desc: "Full viewport projection scaling seamlessly from ultra-wide 4K monitors to high-DPI mobile displays.",
                tag: "Fluid"
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "React 19 & Next.js 16",
                desc: "Built on modern Turbopack compilation pipelines with strict concurrency and server components.",
                tag: "Modern Stack"
              },
              {
                icon: <Sliders className="w-6 h-6 text-pink-400" />,
                title: "Live Parameter Binding",
                desc: "Connect React state smoothly to 3D matrix transforms without triggering costly DOM re-renders.",
                tag: "Real-time"
              },
              {
                icon: <Cpu className="w-6 h-6 text-amber-400" />,
                title: "Low Memory Footprint",
                desc: "Deterministic pseudo-random geometry generation ensuring minimal garbage collection stalls.",
                tag: "Optimized"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel glass-panel-hover p-8 rounded-3xl relative overflow-hidden group border-white/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/5">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE SECTION */}
        <section id="architecture" className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  System Architecture
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-6 tracking-tight">
                  A Dual-Layer Rendering Engine
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  Unlike traditional WebGL web pages that freeze or drop frames, Aether3D separates the presentation layers:
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Z-Layer 0: 3D Spatial Canvas", desc: "Runs isolated WebGL draw loops with Three.js and clearcoat materials." },
                    { title: "Z-Layer 1: Glassmorphic Overlay", desc: "Semantic HTML5 components rendered with Tailwind CSS v4 and Framer Motion." },
                    { title: "Deterministic Seeds", desc: "React 19 pure mathematical seed formulas avoiding hydration flicker." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive terminal code preview */}
              <div className="rounded-2xl bg-slate-950 border border-white/10 p-5 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-500">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    terminal@aether: ~
                  </span>
                  <span className="text-emerald-400 text-[10px]">● LIVE</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="text-indigo-400">$ npx create-aether-app@latest</div>
                  <div className="text-slate-500">{"// Configuring WebGL 2.0 context..."}</div>
                  <div className="text-slate-500">{"// Initializing dynamic mesh buffers..."}</div>
                  <div className="text-emerald-400">{"✓ Compiled 4 3D shaders in 18ms"}</div>
                  <div className="text-indigo-300">$ ready on http://localhost:3000</div>
                  <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-white/5 text-[11px] text-slate-400">
                    Active Shader: MeshDistortMaterial <br />
                    Luminescence: #6366f1 <br />
                    Particles: 250 Stardust Points
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Transparent Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Ready to Upgrade Your Interface?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Pick the tier that fits your creative vision, from indie prototypes to enterprise design systems.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 rounded-full glass-panel border-white/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  billingCycle === 'yearly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Yearly
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                name: "Starter",
                price: billingCycle === 'yearly' ? '$19' : '$24',
                period: '/month',
                desc: "Ideal for individual developers creating sleek 3D personal portfolios.",
                features: [
                  "Access to 10+ 3D Geometric Shaders",
                  "60 FPS WebGL Standard Pipeline",
                  "Tailwind CSS v4 & React 19 Starter",
                  "Community Support",
                ],
                popular: false,
                buttonText: "Start Free Trial"
              },
              {
                name: "Pro Studio",
                price: billingCycle === 'yearly' ? '$49' : '$59',
                period: '/month',
                desc: "For digital agencies and scale-ups requiring high-frequency interactive 3D.",
                features: [
                  "All Starter Features Included",
                  "120 FPS High-Fidelity Rendering",
                  "Custom GLSL Shader Distortions",
                  "Dynamic Particle Emitter Engines",
                  "Priority Technical Support",
                ],
                popular: true,
                buttonText: "Deploy Pro"
              },
              {
                name: "Enterprise",
                price: billingCycle === 'yearly' ? '$149' : '$179',
                period: '/month',
                desc: "Dedicated performance architecture for high-traffic web applications.",
                features: [
                  "Everything in Pro Studio",
                  "Bespoke 3D Geometry Modeling",
                  "Dedicated Spatial Solution Architect",
                  "99.99% Uptime Guarantee & SLA",
                  "Custom CDN Asset Sharding",
                ],
                popular: false,
                buttonText: "Contact Enterprise"
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass-panel p-8 rounded-3xl flex flex-col justify-between relative transition-all ${
                  plan.popular
                    ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-slate-500 text-xs font-mono">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-3 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER & FOOTER */}
        <section className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-white/10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Stay in the 3D Vanguard
            </h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
              Subscribe to get updates on new WebGL shaders, Three.js releases, and UI component drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
                Join
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {"\u2713 You're on the early access list!"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Global Footer */}
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">Aether3D</span>
              <span>— Modern Spatial Web Architecture</span>
            </div>
            <div className="flex gap-6">
              <a href="#playground" className="hover:text-slate-300 transition-colors">Visualizer</a>
              <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
              <a href="#architecture" className="hover:text-slate-300 transition-colors">Architecture</a>
              <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
            </div>
            <p>© {new Date().getFullYear()} Aether3D Inc. Crafted with WebGL & Next.js.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
