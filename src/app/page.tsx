'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Sliders,
  Maximize2,
  Code2,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Palette,
  RotateCw,
  Box,
  Compass,
  Flame,
  Globe
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading 3D Pipeline...</span>
      </div>
    </div>
  )
})

const COLOR_PALETTES = [
  { name: 'Indigo Dream', hex: '#6366f1' },
  { name: 'Cyber Cyan', hex: '#06b6d4' },
  { name: 'Neon Emerald', hex: '#10b981' },
  { name: 'Cosmic Violet', hex: '#a855f7' },
  { name: 'Solar Amber', hex: '#f59e0b' },
  { name: 'Hyper Rose', hex: '#f43f5e' },
]

const GEOMETRIES: { id: GeometryType; label: string; detail: string }[] = [
  { id: 'torusknot', label: 'Torus Knot', detail: 'Complex multi-loop topology' },
  { id: 'icosahedron', label: 'Icosahedron', detail: 'Geodesic facets & reflections' },
  { id: 'octahedron', label: 'Octahedron', detail: 'Diamond angular symmetry' },
  { id: 'torus', label: 'Cyber Torus', detail: 'Smooth curvature orbital flow' },
]

export default function Home() {
  const [selectedGeometry, setSelectedGeometry] = useState<GeometryType>('torusknot')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [isWireframe, setIsWireframe] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(1.0)
  const [activeTab, setActiveTab] = useState<'shaders' | 'geometry' | 'performance'>('shaders')
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
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Canvas Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          geometry={selectedGeometry}
          color={selectedColor}
          wireframe={isWireframe}
          speed={rotationSpeed}
        />
        {/* Subtle vignette gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">AURA<span className="text-indigo-400">.3D</span></span>
              <span className="hidden sm:inline-block ml-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">v2.5 Next-Gen</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="transition-colors hover:text-white">Studio 3D</a>
            <a href="#features" className="transition-colors hover:text-white">Architecture</a>
            <a href="#showcase" className="transition-colors hover:text-white">Capabilities</a>
            <a href="#metrics" className="transition-colors hover:text-white">Telemetry</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-700/60 hover:bg-slate-700 transition"
            >
              <Sliders className="h-3.5 w-3.5 text-indigo-400" />
              <span>Configure Engine</span>
            </a>
            <a
              href="#customizer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/30 hover:opacity-95 transition transform hover:scale-105 active:scale-95"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 pt-12 pb-24 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          Next.js 16 & Three.js WebGL Spatial Canvas
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-white">Spatial Interfaces</span> <br />
          <span className="text-gradient-accent">Reimagined in 3D</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' as const }}
          className="mt-6 max-w-2xl text-base text-slate-300 sm:text-xl leading-relaxed"
        >
          Experience next-generation high-performance WebGL rendering. Real-time shader materials,
          dynamic geometry modulation, and seamless fluid interaction natively rendered inside modern Next.js.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#customizer"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-5 w-5 text-indigo-200" />
            <span>Customize 3D Object</span>
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/60 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-slate-800 hover:border-slate-600 active:scale-95"
          >
            <Layers className="h-5 w-5 text-slate-400" />
            <span>Explore Architecture</span>
          </a>
        </motion.div>

        {/* Interactive Floating Quick-Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2.5 backdrop-blur-md shadow-2xl"
        >
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Quick Swap:</span>
          {GEOMETRIES.map((geom) => (
            <button
              key={geom.id}
              onClick={() => setSelectedGeometry(geom.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedGeometry === geom.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
              }`}
            >
              {geom.label}
            </button>
          ))}
          <div className="h-4 w-px bg-slate-800" />
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              isWireframe
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            {isWireframe ? 'Wireframe: ON' : 'Wireframe: OFF'}
          </button>
        </motion.div>
      </section>

      {/* Interactive 3D Studio / Customizer Panel Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="rounded-3xl border border-indigo-500/20 bg-slate-900/70 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                <Sliders className="h-4 w-4" />
                <span>REAL-TIME 3D CONTROL MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Spatial Geometry Studio</h2>
              <p className="text-slate-400 text-sm mt-1">
                Interact with the 3D canvas viewport in real-time. Drag on the canvas to rotate with OrbitControls.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 px-3 py-1 font-mono">Render Status:</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                60 FPS WebGL 2.0
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Control Column 1: Topology */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Box className="h-4 w-4 text-indigo-400" />
                Select Geometry Matrix
              </label>
              <div className="space-y-2">
                {GEOMETRIES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGeometry(g.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      selectedGeometry === g.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      {g.label}
                      {selectedGeometry === g.id && (
                        <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{g.detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Control Column 2: Material & Color */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Palette className="h-4 w-4 text-cyan-400" />
                Spectral Chromatic Palette
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {COLOR_PALETTES.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSelectedColor(c.hex)}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      selectedColor === c.hex
                        ? 'border-indigo-400 bg-slate-800/90 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400'
                        : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="text-left overflow-hidden">
                      <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.hex}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Wireframe Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    isWireframe
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-medium">Holographic Wireframe Mode</span>
                  <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
                    isWireframe ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isWireframe ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </button>
              </div>
            </div>

            {/* Control Column 3: Dynamics & Telemetry */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <RotateCw className="h-4 w-4 text-purple-400" />
                Kinetic Rotation Velocity
              </label>

              <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Angular Velocity:</span>
                  <span className="font-mono text-xs font-semibold text-indigo-400">{rotationSpeed.toFixed(1)}x Speed</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.2"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0x Static</span>
                  <span>1.0x Normal</span>
                  <span>3.0x Hyper</span>
                </div>
              </div>

              {/* Hardware acceleration card */}
              <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950/60 border border-indigo-500/20 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs mb-2">
                  <Cpu className="h-4 w-4" />
                  <span>HARDWARE ACCELERATION</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clearcoat physical shading with additive particle blenders running off GPU float32 vertex buffers.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-indigo-500/10 pt-2 font-mono">
                  <span>Draw Calls: 4</span>
                  <span>Triangles: ~14.8k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Architecture Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-3">
            <Zap className="h-4 w-4" />
            <span>Next-Generation Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">Engineered For Fluid Immersion</h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            A cohesive fusion of Next.js 16 App Router, React 19 concurrent capabilities, and Three.js WebGL graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: "WebGL 2.0 Physical Shading",
              desc: "True-to-life metallic roughness, clearcoat reflections, and reactive specular lighting calculated in real-time.",
              badge: "GPU Accelerated"
            },
            {
              icon: Zap,
              title: "Zero-Lag Framer Sync",
              desc: "Spring-interpolated cursor physics and scroll transformations integrated directly into hardware thread.",
              badge: "60 FPS Native"
            },
            {
              icon: Layers,
              title: "Modular Topology Matrix",
              desc: "Dynamic buffer geometries switch seamlessly without resetting canvas context or GPU memory reallocation.",
              badge: "Dynamic Mesh"
            },
            {
              icon: Maximize2,
              title: "Volumetric Particle Fog",
              desc: "Atmospheric depth buffer with 150 deterministic additive particles interacting with rotational vectors.",
              badge: "Volumetric FX"
            },
            {
              icon: Code2,
              title: "Turbopack Bundler Integration",
              desc: "Optimized Next.js 16 builds with sub-second hot reloading and tree-shaken 3D mathematical libraries.",
              badge: "Next.js 16"
            },
            {
              icon: ShieldCheck,
              title: "Purity & SSR Resilient",
              desc: "Deterministic pseudo-random mathematical seeds preventing hydration mismatches and React 19 purity warnings.",
              badge: "React 19 Safe"
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card glass-card-hover p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Interactive Showcase / Demo Tabs */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Interactive Pipeline</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Inspect The Real-Time 3D Engine Architecture
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                Choose a component below to inspect how the spatial interface synchronizes state between the DOM tree and WebGL scene.
              </p>

              {/* Tabs */}
              <div className="flex gap-2 mt-8 p-1.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                {(['shaders', 'geometry', 'performance'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="mt-6 text-sm text-slate-300 min-h-[100px]">
                {activeTab === 'shaders' && (
                  <div className="space-y-3">
                    <p className="font-semibold text-indigo-300">Clearcoat MeshPhysical Shading Pipeline:</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      {"// Fragment lighting\nmetalness: 0.8\nroughness: 0.15\nclearcoat: 1.0\nemissive: " + selectedColor}
                    </p>
                  </div>
                )}
                {activeTab === 'geometry' && (
                  <div className="space-y-3">
                    <p className="font-semibold text-cyan-300">Procedural Buffer Allocation:</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      {"// Active Geometry\ntype: " + selectedGeometry.toUpperCase() + "\nwireframe: " + isWireframe.toString() + "\nrotation_multiplier: " + rotationSpeed + "x"}
                    </p>
                  </div>
                )}
                {activeTab === 'performance' && (
                  <div className="space-y-3">
                    <p className="font-semibold text-emerald-300">Runtime Telemetry Profiling:</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      {"// Hardware Metrics\nRender Pipeline: WebGL2\nFramerate Target: 60fps Lock\nBuffer Memory: Optimized SSR-safe"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Interactive Preview Box */}
            <div className="w-full lg:w-96 rounded-2xl bg-slate-950/80 border border-indigo-500/20 p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-slate-400">ENGINE_STATE</span>
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              </div>
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Geometry:</span>
                  <span className="text-indigo-400 font-bold">{selectedGeometry}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Color Hex:</span>
                  <span style={{ color: selectedColor }}>{selectedColor}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Wireframe:</span>
                  <span className={isWireframe ? 'text-cyan-400' : 'text-slate-400'}>
                    {isWireframe ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Velocity:</span>
                  <span className="text-purple-400">{rotationSpeed}x</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">OrbitControls:</span>
                  <span className="text-emerald-400">Active (Drag to orbit)</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedGeometry('torusknot')
                    setSelectedColor('#6366f1')
                    setIsWireframe(false)
                    setRotationSpeed(1.0)
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                >
                  Reset Studio Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry & Metrics Section */}
      <section id="metrics" className="relative z-10 max-w-7xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Target Framerate", val: "60 FPS", desc: "Silky smooth WebGL execution", icon: Flame },
            { label: "Turbopack Build", val: "< 5.3s", desc: "Ultra-fast Next.js compilation", icon: Zap },
            { label: "Polygon Budget", val: "15k Poly", desc: "Lightweight mobile-optimized", icon: Compass },
            { label: "Global Availability", val: "99.99%", desc: "Edge CDN worldwide delivery", icon: Globe }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="glass-card p-6 rounded-2xl border border-slate-800 text-center">
                <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 text-indigo-400 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.val}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-2">{stat.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-16 border border-indigo-500/30 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready To Build Next-Gen 3D Experiences?
          </h2>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
            Subscribe for exclusive spatial web design kits, Three.js shaders, and high-performance React templates.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 font-semibold text-sm text-white shadow-lg shadow-indigo-500/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{subscribed ? "Subscribed!" : "Get Updates"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 text-xs text-emerald-400 font-semibold">
              {"\u2713"} You&apos;re in! We will notify you when new 3D shader templates release.
            </p>
          )}
        </div>
      </section>

      {/* Comprehensive Modern Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Box className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-base">AURA<span className="text-indigo-400">.3D</span></span>
            <span className="text-xs text-slate-500 ml-3">Spatial Interfaces &copy; 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#customizer" className="hover:text-white transition">Studio 3D</a>
            <a href="#features" className="hover:text-white transition">Architecture</a>
            <a href="#showcase" className="hover:text-white transition">Capabilities</a>
            <a href="#metrics" className="hover:text-white transition">Metrics</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
