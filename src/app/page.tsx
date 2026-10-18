'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe,
  Sliders,
  ChevronRight,
  Code2,
  Share2,
  CheckCircle2,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-mono tracking-wider">INITIALIZING WEBGL 2.0...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // State for live 3D Scene controls
  const [geometryType, setGeometryType] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [metalness, setMetalness] = useState(0.8)

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Newsletter interactive state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Interactive demo counter
  const [activeTab, setActiveTab] = useState<'shading' | 'geometry' | 'performance'>('shading')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  const shapes: { id: GeometryType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'torus', label: 'Torus' },
    { id: 'octahedron', label: 'Octahedron' },
    { id: 'sphere', label: 'Sphere' }
  ]

  const colorPresets = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Neon Cyan', hex: '#06b6d4' },
    { name: 'Electric Purple', hex: '#a855f7' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Sunset Coral', hex: '#f43f5e' }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          geometryType={geometryType}
          color={color}
          speed={speed}
          wireframe={wireframe}
          metalness={metalness}
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/80 to-slate-950" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Studio Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#playground" className="hover:text-indigo-400 transition-colors">Playground</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Specifications</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center gap-2 active:scale-95"
            >
              <span>Launch Studio</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-slate-800 px-4 py-6 space-y-4"
            >
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-indigo-400 py-1"
              >
                Studio Customizer
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-indigo-400 py-1"
              >
                Features
              </a>
              <a
                href="#playground"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-indigo-400 py-1"
              >
                Playground
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium block"
              >
                Launch Studio
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs sm:text-sm font-medium text-indigo-300 mb-8 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Next-Gen WebGL 2.0 Engine & Interactive UI</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-6 leading-[1.08]"
          >
            Crafting Digital <br />
            <span className="text-gradient-primary">Dimensions in 3D</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 font-normal leading-relaxed"
          >
            Immerse users with fluid WebGL graphics, real-time lighting shaders, and
            glassmorphic aesthetics engineered for maximum frame rate performance.
          </motion.p>

          {/* Quick Shape Select Controls on Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass p-2 rounded-2xl border border-slate-800 flex flex-wrap justify-center gap-2 mb-12 shadow-2xl"
          >
            {shapes.map((s) => (
              <button
                key={s.id}
                onClick={() => setGeometryType(s.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  geometryType === s.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Explore 3D Studio</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full glass glass-hover text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-slate-700"
            >
              <span>View Architecture</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Studio Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass rounded-3xl p-6 sm:p-10 border border-slate-800/80 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-1">
                <Sliders className="w-4 h-4" />
                <span>Interactive WebGL Studio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Real-Time Shader Inspector</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                60 FPS SYNCED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Panel 1: Geometry & Wireframe */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <Box className="w-5 h-5" /> Geometry Mesh
              </h3>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-mono">SELECT SHAPE GEOMETRY</label>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setGeometryType(s.id)}
                      className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                        geometryType === s.id
                          ? 'border-indigo-500 bg-indigo-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-white block">Wireframe View</span>
                  <span className="text-xs text-slate-500">Render geometry poly-lines</span>
                </div>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      wireframe ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Control Panel 2: Color Presets */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Material Chromaticity
              </h3>

              <div className="space-y-3">
                <label className="text-xs text-slate-400 font-mono">COLOR PALETTE PRESETS</label>
                <div className="space-y-2">
                  {colorPresets.map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setColor(p.hex)}
                      className={`w-full p-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                        color === p.hex
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: p.hex }} />
                        {p.name}
                      </span>
                      <span className="font-mono text-slate-500 uppercase">{p.hex}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Control Panel 3: Physical Dynamics */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Motion & Surface Optics
              </h3>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">ROTATION SPEED</span>
                  <span className="text-cyan-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Metalness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">METALLIC REFLECTIVITY</span>
                  <span className="text-cyan-400 font-bold">{Math.round(metalness * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Live Shader Parameters:</div>
                <div className="font-mono text-[11px] text-slate-500">
                  mesh.material.metalness = {metalness.toFixed(2)};
                  <br />
                  mesh.rotation.speed = {speed.toFixed(1)};
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Showcase Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
            Engineered Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            High-Performance Tech Architecture
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Built on top of cutting-edge modern tools to deliver uncompromising visual quality
            and lightning-fast load times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Box,
              title: "WebGL 2.0 & Three.js",
              desc: "Direct GPU rendering leveraging customized physical materials, dynamic lighting, and clearcoat reflections."
            },
            {
              icon: Layers,
              title: "Glassmorphic Design",
              desc: "Frosted backdrop filters, ultra-subtle border gradients, and translucent modern elevated surfaces."
            },
            {
              icon: Cpu,
              title: "60 FPS Optimization",
              desc: "Lightweight geometry buffers, automated level-of-detail management, and non-blocking frame animation loops."
            },
            {
              icon: Zap,
              title: "Framer Motion 12",
              desc: "Hardware-accelerated layout transitions, spring physics cursor trailing, and entrance stagger effects."
            },
            {
              icon: Code2,
              title: "Next.js 16 Turbopack",
              desc: "Instant hot module replacement, zero-config SSR dynamic loading, and optimized asset delivery."
            },
            {
              icon: Globe,
              title: "Responsive Spatial UI",
              desc: "Seamless cross-device adaptive layouts tailored for ultra-wide desktop displays down to mobile screens."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-8 rounded-2xl glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-indigo-400 font-medium">
                <span>Explore technical specification</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Playground & Performance Metrics Section */}
      <section id="playground" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-slate-800/80 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
                Interactive Playground
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                Inspect Real-Time Rendering Stats
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Toggle through engine telemetry views to analyze memory footprint, vertex counts, and draw call overhead in real-time.
              </p>

              {/* Tabs */}
              <div className="flex gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 mb-8">
                {(['shading', 'geometry', 'performance'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                {activeTab === 'shading' && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Shader Program:</span>
                      <span className="font-mono text-indigo-400 font-semibold">MeshPhysicalMaterial</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Lighting Calculations:</span>
                      <span className="font-mono text-indigo-400 font-semibold">3-Point Directional + Ambient</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Reflective Coating:</span>
                      <span className="font-mono text-emerald-400 font-semibold">Enabled (Clearcoat 0.8)</span>
                    </div>
                  </>
                )}

                {activeTab === 'geometry' && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Active Topology:</span>
                      <span className="font-mono text-indigo-400 font-semibold capitalize">{geometryType}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Subdivision Resolution:</span>
                      <span className="font-mono text-indigo-400 font-semibold">128 x 32 Segments</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Starfield Particle Count:</span>
                      <span className="font-mono text-emerald-400 font-semibold">1,000 Points</span>
                    </div>
                  </>
                )}

                {activeTab === 'performance' && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Target Refresh Rate:</span>
                      <span className="font-mono text-emerald-400 font-semibold">60.0 FPS</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Frame Budget Utilization:</span>
                      <span className="font-mono text-indigo-400 font-semibold">12.4 ms / 16.6 ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">WebGL Context:</span>
                      <span className="font-mono text-emerald-400 font-semibold">Hardware Accelerated</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Visual Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 flex flex-col justify-between">
                <span className="text-xs font-mono text-indigo-300">FRAME TIME</span>
                <div className="my-4">
                  <span className="text-4xl font-extrabold text-white">12.4</span>
                  <span className="text-sm text-slate-400 ml-1">ms</span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Target
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 flex flex-col justify-between">
                <span className="text-xs font-mono text-purple-300">GPU MEMORY</span>
                <div className="my-4">
                  <span className="text-4xl font-extrabold text-white">18.2</span>
                  <span className="text-sm text-slate-400 ml-1">MB</span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Low Overhead
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-500/30 flex flex-col justify-between">
                <span className="text-xs font-mono text-cyan-300">DRAW CALLS</span>
                <div className="my-4">
                  <span className="text-4xl font-extrabold text-white">2</span>
                  <span className="text-sm text-slate-400 ml-1">calls</span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Batch Rendered
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 flex flex-col justify-between">
                <span className="text-xs font-mono text-emerald-300">Lighthouse Score</span>
                <div className="my-4">
                  <span className="text-4xl font-extrabold text-white">100</span>
                  <span className="text-sm text-slate-400 ml-1">/100</span>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Top Tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section id="specs" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center scroll-mt-20">
        <div className="glass rounded-3xl p-8 sm:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Build Next-Gen Experiences?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base sm:text-lg">
            Join developers utilizing WebGL 3D immersion and modern glassmorphic interface designs.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2 font-medium"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed! Check your inbox."}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm flex-1"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 whitespace-nowrap"
              >
                Get Started
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              A3D
            </div>
            <span className="font-semibold text-slate-300">Aura3D Interactive Experience</span>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#playground" className="hover:text-indigo-400 transition-colors">Telemetry</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Specs</a>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>© 2026 Aura3D. All rights reserved.</span>
            <div className="flex gap-2">
              <Share2 className="w-4 h-4 hover:text-slate-300 cursor-pointer" />
              <Code2 className="w-4 h-4 hover:text-slate-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
