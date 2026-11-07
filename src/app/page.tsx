'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  RotateCw,
  Box,
  Palette,
  ShieldCheck,
  Activity,
  ArrowRight,
  ChevronRight,
  Globe,
  Sliders,
  CheckCircle2,
  Terminal,
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono">
          Initializing 3D Canvas...
        </span>
      </div>
    </div>
  ),
})

const COLOR_PRESETS = [
  { name: 'Indigo Dream', hex: '#6366f1' },
  { name: 'Neon Cyan', hex: '#06b6d4' },
  { name: 'Cyber Rose', hex: '#ec4899' },
  { name: 'Emerald Flux', hex: '#10b981' },
  { name: 'Solar Amber', hex: '#f59e0b' },
]

const SHAPE_OPTIONS: { id: GeometryType; label: string; desc: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot', desc: 'Complex interwoven parametric geometry' },
  { id: 'icosahedron', label: 'Icosahedron', desc: '20-faced dual geodesic polyhedron' },
  { id: 'octahedron', label: 'Octahedron', desc: 'Symmetric dual diamond crystalline structure' },
  { id: 'cyberSphere', label: 'Cyber Sphere', desc: 'High-density vertex spherical mesh' },
]

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<GeometryType>('torusKnot')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [isWireframe, setIsWireframe] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1.2)
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'controls'>('controls')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Fixed Background 3D Viewport */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          geometryType={selectedShape}
          color={selectedColor}
          wireframe={isWireframe}
          rotationSpeed={rotationSpeed}
        />
      </div>

      {/* Radial Gradient overlay to focus center visual */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />

      {/* Fixed Modern Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white font-mono flex items-center gap-1.5">
                NOVA<span className="text-indigo-400">3D</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                Next-Gen Interface
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#lab" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Architecture
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Specifications
            </a>
            <a href="#ecosystem" className="hover:text-indigo-400 transition-colors">
              Ecosystem
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs font-mono text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WebGL Active
            </div>
            <a
              href="#lab"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-indigo-500/30 text-xs sm:text-sm font-mono text-indigo-300"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive WebGL 3D Shader Framework</span>
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-none mb-8"
        >
          Immersive Dimensional{' '}
          <span className="text-gradient-primary">Digital Horizons</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
        >
          Experience hyper-responsive 3D rendering powered by Three.js and React Three Fiber.
          Tailored with frosted glass aesthetics, physics-inspired shaders, and real-time control.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#lab"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full font-semibold text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all transform hover:scale-105 active:scale-95"
          >
            <Sliders className="w-5 h-5" />
            <span>Customize 3D Object</span>
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-4 glass-panel glass-panel-hover rounded-full font-semibold text-slate-200"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-5 h-5 text-indigo-400" />
          </a>
        </motion.div>

        {/* Live Metrics Quick Bar */}
        <div className="w-full max-w-4xl mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Render Target', value: '60 FPS', sub: 'Real-time WebGL' },
            { label: 'Geometry Vertices', value: '4.2k+', sub: 'Procedural meshes' },
            { label: 'Lighting Rig', value: '5 Point', sub: 'Dynamic clearcoat' },
            { label: 'Interaction Latency', value: '< 1ms', sub: 'DOM to Canvas' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-5 rounded-2xl text-left border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-300">{stat.label}</div>
              <div className="text-[11px] text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 3D Lab / Control Studio */}
      <section id="lab" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800 text-xs font-mono text-indigo-300 mb-4">
            <Sliders className="w-3.5 h-3.5" /> Live Canvas Telemetry
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Control Studio</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Directly manipulate the WebGL viewport in real-time. Change shapes, adjust dynamic lighting colors, toggle wireframes, and calibrate rotational velocity.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-indigo-500/20 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          {/* Header tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Renderer Properties</h3>
                <p className="text-xs text-slate-400 font-mono">Status: SYNCHRONIZED</p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              {(['controls', 'telemetry', 'overview'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'controls' && (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Shape Selector */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
                    <Box className="w-4 h-4 text-indigo-400" />
                    Geometry Structure
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {SHAPE_OPTIONS.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setSelectedShape(shape.id)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          selectedShape === shape.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">{shape.label}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {shape.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color and Material Palettes */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
                      <Palette className="w-4 h-4 text-indigo-400" />
                      Chromatic Spectrum
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {COLOR_PRESETS.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => setSelectedColor(color.hex)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                            selectedColor === color.hex
                              ? 'border-white bg-slate-800 text-white ring-2 ring-indigo-500/50'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wireframe & Speed Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-slate-300">Wireframe Mesh</span>
                        <button
                          type="button"
                          aria-label="Toggle wireframe"
                          onClick={() => setIsWireframe(!isWireframe)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                            isWireframe ? 'bg-indigo-600' : 'bg-slate-700'
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                              isWireframe ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {isWireframe ? 'Holographic wireframe rendered' : 'Physical clearcoat enabled'}
                      </p>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-slate-300">Angular Velocity</span>
                        <span className="text-xs font-mono text-indigo-400">{rotationSpeed}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="3.0"
                        step="0.2"
                        value={rotationSpeed}
                        onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Slow (0.2x)</span>
                        <span>Hyper (3.0x)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 font-mono text-xs"
              >
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-slate-300 space-y-3">
                  <div className="flex items-center justify-between text-indigo-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Live WebGL Context Telemetry
                    </span>
                    <span className="text-[10px] bg-indigo-950 px-2 py-0.5 rounded text-indigo-300">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-slate-500 block">Active Mesh:</span>
                      <span className="font-semibold text-white">{selectedShape}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Base Color:</span>
                      <span className="font-semibold text-white">{selectedColor}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Render Mode:</span>
                      <span className="font-semibold text-white">
                        {isWireframe ? 'Wireframe Hologram' : 'Clearcoat Physical'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Camera Orbit:</span>
                      <span className="font-semibold text-white">Pointer Parallax Enabled</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Particle Cloud:</span>
                      <span className="font-semibold text-white">320 Starfield Nodes</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Rotation Speed:</span>
                      <span className="font-semibold text-white">{rotationSpeed}x Normal</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-300 space-y-4 text-sm"
              >
                <p>
                  Nova3D creates an optimized bridge between React state and the Three.js render loop.
                  Changes executed within this panel update standard WebGL uniforms without triggering full canvas restarts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">Instantaneous Updates</h4>
                    <p className="text-xs text-slate-400">
                      Zero DOM reflows on canvas updates. High-speed shader synchronization.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <h4 className="font-bold text-white mb-1">Smooth Camera Gyro</h4>
                    <p className="text-xs text-slate-400">
                      Lerped pointer coordinates calculate responsive perspective shift.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Feature Architecture Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800 text-xs font-mono text-purple-300 mb-4">
            <Layers className="w-3.5 h-3.5" /> High Performance Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Crafted for <span className="text-gradient-primary">Visual Impact</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineering a world-class 3D web experience with modern tech stacks and high efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: 'Sub-millisecond Shader Pipeline',
              desc: 'High performance MeshPhysicalMaterial with real-time reflections, clearcoat shading, and depth buffering.',
              badge: 'WebGL 2.0',
            },
            {
              icon: <Cpu className="w-6 h-6 text-indigo-400" />,
              title: 'GPU Accelerated Particles',
              desc: 'Procedural particle field computed with custom buffer attributes for butter-smooth 60+ FPS motion.',
              badge: 'Fiber R3F',
            },
            {
              icon: <RotateCw className="w-6 h-6 text-cyan-400" />,
              title: 'Fluid Parallax Rigging',
              desc: 'Pointer tracking lerped over state frame updates, providing depth and spatial presence.',
              badge: 'Interactive',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-pink-400" />,
              title: 'Glassmorphism Design',
              desc: 'Multi-layered backdrop-blur panels with responsive borders and glowing radial highlights.',
              badge: 'Tailwind v4',
            },
            {
              icon: <Activity className="w-6 h-6 text-emerald-400" />,
              title: 'Next.js 16 Ready',
              desc: 'Server-side rendered metadata, Turbopack bundling, dynamic lazy loading, and pristine bundle size.',
              badge: 'App Router',
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
              title: 'Strict Purity & Types',
              desc: 'Full TypeScript coverage with pure deterministic functions and clean component lifecycle.',
              badge: 'TypeScript 5',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border-slate-800/80 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-indigo-400 transition-colors">
                <span>Explore technical specs</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications / Comparison Section */}
      <section id="specs" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-slate-800">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Engineered for Speed, Precision & Immersion
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Comparing Nova3D runtime capabilities with traditional canvas and video-based 3D solutions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase font-mono text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-4">Metric / Capability</th>
                  <th className="py-4 px-4 text-indigo-400 font-bold">Nova3D Engine</th>
                  <th className="py-4 px-4">Standard WebGL</th>
                  <th className="py-4 px-4">Pre-rendered Video</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Dynamic Geometry Switching</td>
                  <td className="py-4 px-4 text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Instant (Zero Stutter)
                  </td>
                  <td className="py-4 px-4 text-slate-400">Manual Rebuild</td>
                  <td className="py-4 px-4 text-rose-400">Not Supported</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Pointer Parallax Response</td>
                  <td className="py-4 px-4 text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Smooth Lerp Physics
                  </td>
                  <td className="py-4 px-4 text-slate-400">Basic Listener</td>
                  <td className="py-4 px-4 text-rose-400">Fixed Perspective</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">DOM to Canvas Data Binding</td>
                  <td className="py-4 px-4 text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Native React Signals
                  </td>
                  <td className="py-4 px-4 text-slate-400">Custom Event Bus</td>
                  <td className="py-4 px-4 text-rose-400">N/A</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Lighting & Clearcoat Reflection</td>
                  <td className="py-4 px-4 text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Multi-point MeshPhysical
                  </td>
                  <td className="py-4 px-4 text-slate-400">Lambert / Phong</td>
                  <td className="py-4 px-4 text-slate-400">Static Baked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ecosystem & Community */}
      <section id="ecosystem" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-xs font-mono text-cyan-300 mb-4">
              <Globe className="w-3.5 h-3.5" /> Global 3D Network
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Connect with the Future of Digital Design
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Join thousands of developers and artists pushing the limits of the browser. Get updates
              on next-gen shader techniques, interactive tutorials, and open-source 3D components.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4 max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 shrink-0"
                >
                  {subscribed ? 'Subscribed!' : 'Get Access'}
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Welcome aboard! You are now subscribed to Nova3D updates.
                </div>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Three.js r184', desc: 'Modern WebGL rendering primitives and math utilities.' },
              { title: 'React 19', desc: 'Latest concurrent rendering with strict lifecycle verification.' },
              { title: 'Tailwind CSS v4', desc: 'Next-gen CSS parser with theme inline variable support.' },
              { title: 'Framer Motion', desc: 'Choreographed spring animations and reactive layout flow.' },
            ].map((box, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border-slate-800/80 hover:border-indigo-500/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 mb-4 font-mono text-xs font-bold">
                  0{i + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{box.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Box className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-black tracking-wider text-white font-mono">
                NOVA<span className="text-indigo-400">3D</span>
              </span>
            </div>

            <div className="flex items-center gap-8 text-xs font-medium text-slate-400">
              <a href="#lab" className="hover:text-white transition-colors">
                Studio
              </a>
              <a href="#features" className="hover:text-white transition-colors">
                Architecture
              </a>
              <a href="#specs" className="hover:text-white transition-colors">
                Specifications
              </a>
              <a href="#ecosystem" className="hover:text-white transition-colors">
                Ecosystem
              </a>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Next.js 16 • Three.js • WebGL 2.0
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} Nova3D Platform. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
