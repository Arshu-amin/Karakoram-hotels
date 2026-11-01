'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Shield,
  Gauge,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Send,
  Boxes,
  Code2,
  RefreshCw,
  Eye,
  Activity,
  Globe,
  Share2,
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#020617]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading 3D Engine...</span>
      </div>
    </div>
  ),
})

const COLOR_PALETTES = [
  { name: 'Neon Indigo', value: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
  { name: 'Cyan Pulse', value: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
  { name: 'Rose Nebula', value: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  { name: 'Emerald Flux', value: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Amber Solar', value: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
]

const SHAPES: { type: GeometryType; label: string; desc: string }[] = [
  { type: 'torusKnot', label: 'Torus Knot', desc: 'Complex interwoven manifold' },
  { type: 'icosahedron', label: 'Icosahedron', desc: '20-sided geodesic crystalline lattice' },
  { type: 'octahedron', label: 'Octahedron', desc: 'Dual-pyramidal diamond structure' },
  { type: 'cyberSphere', label: 'Cyber Sphere', desc: 'Harmonic geodesic curvature sphere' },
]

const FEATURES = [
  {
    icon: <Cpu className="h-6 w-6 text-indigo-400" />,
    tag: 'WebGPU & WebGL 2',
    title: 'Hardware Acceleration',
    description: 'Blazing fast rendering powered by modern 3D pipelines with low draw calls and zero CPU overhead.',
  },
  {
    icon: <Gauge className="h-6 w-6 text-cyan-400" />,
    tag: 'Ultra Low Latency',
    title: '120 FPS Real-time Fluidity',
    description: 'Silky smooth animation loops coupled with frame-rate independent physics and reactive transforms.',
  },
  {
    icon: <Sliders className="h-6 w-6 text-pink-400" />,
    tag: 'Dynamic Shaders',
    title: 'Parametric Materials',
    description: 'Custom PBR materials with clearcoat reflections, transmission depth, and metallic surface reactivity.',
  },
  {
    icon: <Layers className="h-6 w-6 text-emerald-400" />,
    tag: 'Layered Compositing',
    title: 'Glassmorphic Depth',
    description: 'Multi-layer depth with real-time backdrop blur, neon ambient glows, and orbital spatial rings.',
  },
  {
    icon: <Shield className="h-6 w-6 text-amber-400" />,
    tag: 'Resilience',
    title: 'Universal Fallback',
    description: 'Graceful degradation across low-end mobile devices and software rendering environments.',
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    tag: 'Instant Reactivity',
    title: 'DOM-to-Canvas Sync',
    description: 'Seamless two-way binding between interactive UI components and WebGL scene variables.',
  },
]

const STATS = [
  { value: '120 FPS', label: 'Target Render Performance', change: '+45%' },
  { value: '< 12ms', label: 'Shader Compute Latency', change: '-30%' },
  { value: '99.98%', label: 'WebGL Engine Stability', change: 'Rock Solid' },
  { value: '100K+', label: 'Interactive Sessions Daily', change: 'Growing Fast' },
]

const TIERS = [
  {
    name: 'Standard',
    price: '$29',
    period: '/month',
    desc: 'For creative developers and small interactive web experiences.',
    features: [
      'Standard WebGL 3D Pipeline',
      '8 Pre-built Parametric Geometries',
      'Mobile responsive controls',
      'Community Discord Support',
      'Basic Performance Profiler',
    ],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro Studio',
    price: '$79',
    period: '/month',
    desc: 'For high-end production studios seeking cutting-edge 3D visual design.',
    features: [
      'Unlimited Dynamic Geometries',
      'Full PBR Physical & Clearcoat Shaders',
      'Real-time DOM-to-Canvas Event Sync',
      'Priority GPU Cloud Acceleration',
      'Advanced Spatial Particle Engine',
      'Dedicated Technical Architect',
    ],
    highlighted: true,
    cta: 'Unlock Pro Studio',
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    desc: 'Bespoke immersive solutions for large scale global brands.',
    features: [
      'Custom GLSL Shader Engineering',
      'Multi-user WebXR & Spatial Support',
      '99.99% SLA Guarantee',
      'Dedicated Performance Optimization Team',
      'Full Source Code & White-labeling',
    ],
    highlighted: false,
    cta: 'Contact Enterprise',
  },
]

export default function Home() {
  // 3D Scene Interactive State
  const [geometryType, setGeometryType] = useState<GeometryType>('torusKnot')
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [wireframe, setWireframe] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1.2)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const resetControls = () => {
    setGeometryType('torusKnot')
    setPrimaryColor('#6366f1')
    setWireframe(false)
    setSpeed(1)
    setScale(1.2)
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D Scene Background Layer (Fixed & Scaled) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          geometryType={geometryType}
          primaryColor={primaryColor}
          wireframe={wireframe}
          speed={speed}
          scale={scale}
        />
      </div>

      {/* Subtle radial ambient gradients overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-[#020617]/30 via-transparent to-[#020617]/90" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none z-[1]" />

      {/* Floating Modern Glass Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="glass-nav rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/80">
                  <Boxes className="h-5 w-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  AURA <span className="text-gradient-primary">3D</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1">
                  Spatial Engine
                </span>
              </div>
            </a>

            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#customizer" className="hover:text-indigo-400 transition-colors duration-200">
                3D Studio
              </a>
              <a href="#features" className="hover:text-indigo-400 transition-colors duration-200">
                Features
              </a>
              <a href="#metrics" className="hover:text-indigo-400 transition-colors duration-200">
                Performance
              </a>
              <a href="#pricing" className="hover:text-indigo-400 transition-colors duration-200">
                Pricing
              </a>
            </div>

            {/* Status indicator and action */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                WebGL Active
              </div>

              <a
                href="#customizer"
                className="relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs md:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Launch Studio
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Sections (Z-10 over the 3D scene) */}
      <div className="relative z-10 pt-28 md:pt-36 flex flex-col gap-28 md:gap-40">
        {/* HERO SECTION */}
        <section className="px-4 sm:px-8 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Introducing Next-Gen Spatial 3D Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-slate-400">v2.5 Release</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] max-w-5xl mb-8"
          >
            Immersive 3D Visuals for the <span className="text-gradient-primary">Modern Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' as const }}
            className="text-base sm:text-xl md:text-2xl text-slate-300/90 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Experience interactive WebGL geometry, physics-driven animations, and glassmorphic depth.
            Manipulate the live 3D core in real time with hardware-accelerated precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
          >
            <a
              href="#customizer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Explore 3D Customizer</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-slate-700/80 hover:bg-slate-800/60 text-slate-200 font-semibold text-base hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Platform Specs</span>
            </a>
          </motion.div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-4">
            {[
              { label: 'Latency', val: '< 10ms' },
              { label: 'Render Engine', val: 'Three.js / WebGL 2' },
              { label: 'Frame Rate', val: '120 FPS Cap' },
              { label: 'Interactive Drag', val: 'Orbit Enabled' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-3 sm:p-4 text-center border border-white/5 bg-slate-950/40"
              >
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-1">
                  {stat.label}
                </div>
                <div className="text-sm sm:text-base font-semibold text-indigo-300">{stat.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3D STUDIO / LIVE INTERACTIVE CUSTOMIZER */}
        <section id="customizer" className="scroll-mt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sliders className="h-3.5 w-3.5" />
              Real-Time Control Deck
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Shape the <span className="text-gradient-secondary">3D Reality</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Tweak parameters below to immediately alter the background WebGL shader, geometry topology,
              and physical material reflection.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
            {/* Top Bar with Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-indigo-400 animate-pulse" />
                <span className="font-semibold text-white">Live WebGL Shader Controls</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Realtime Binding
                </span>
              </div>
              <button
                onClick={resetControls}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Parameters
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Geometry Selection */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    1. Select Geometry Topology
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {SHAPES.map((shape) => (
                      <button
                        key={shape.type}
                        onClick={() => setGeometryType(shape.type)}
                        className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                          geometryType === shape.type
                            ? 'bg-indigo-600/30 border-indigo-500 shadow-lg shadow-indigo-500/20 text-white'
                            : 'bg-slate-900/60 border-white/5 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{shape.label}</span>
                          {geometryType === shape.type && (
                            <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-tight">{shape.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette Selector */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    2. Surface Chroma & Emission
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {COLOR_PALETTES.map((palette) => (
                      <button
                        key={palette.value}
                        onClick={() => setPrimaryColor(palette.value)}
                        className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all ${
                          primaryColor === palette.value
                            ? 'bg-slate-800 border-white/30 shadow-md'
                            : 'bg-slate-900/60 border-white/5 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-full ring-2 ring-white/20 transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: palette.value,
                            boxShadow: `0 0 10px ${palette.glow}`,
                          }}
                        />
                        <span className="text-xs font-medium text-slate-200">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sliders and Toggles */}
              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      3. Angular Spin Velocity
                    </label>
                    <span className="text-xs font-mono text-indigo-400">{speed.toFixed(1)}x speed</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>Static (0x)</span>
                    <span>Normal (1x)</span>
                    <span>Hyperspeed (3x)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      4. Object Dimension Scale
                    </label>
                    <span className="text-xs font-mono text-cyan-400">{scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.8"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>Compact (0.8x)</span>
                    <span>Balanced (1.2x)</span>
                    <span>Massive (1.8x)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-white/5">
                    <div>
                      <div className="font-medium text-sm text-white flex items-center gap-2">
                        <Eye className="h-4 w-4 text-indigo-400" />
                        Holographic Wireframe Mode
                      </div>
                      <div className="text-xs text-slate-400">
                        Expose underlying polygon triangulation and vertices
                      </div>
                    </div>
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
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
              </div>
            </div>
          </div>
        </section>

        {/* BENTO FEATURES GRID */}
        <section id="features" className="scroll-mt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Zap className="h-3.5 w-3.5" />
              Engine Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Engineered for <span className="text-gradient-primary">Extreme Precision</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Combining WebGL 2 with modern React state mechanics for unforgettable 3D spatial
              interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-8 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase bg-slate-900/60 px-2.5 py-1 rounded border border-white/5">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* METRICS & BENCHMARKS */}
        <section id="metrics" className="scroll-mt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/20 bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-950/80">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 last:border-none pb-6 md:pb-0"
                >
                  <div className="inline-block px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-500/10 mb-2">
                    {stat.change}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="scroll-mt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Code2 className="h-3.5 w-3.5" />
              Scalable Licensing
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Transparent, <span className="text-gradient-secondary">Flexible Pricing</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Deploy interactive 3D web applications with production-ready infrastructure and SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? 'glass border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 lg:-translate-y-4 bg-slate-900/80'
                    : 'glass-card border border-white/10 hover:border-slate-700'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs tracking-wider uppercase shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="text-xl font-bold text-white mb-2">{tier.name}</div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed min-h-[36px]">
                    {tier.desc}
                  </p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-black text-white">{tier.price}</span>
                    <span className="text-slate-400 text-sm">{tier.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95'
                      : 'border border-slate-700 hover:bg-slate-800 text-slate-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER / ACCESS CTA */}
        <section className="px-4 sm:px-8 max-w-5xl mx-auto w-full">
          <div className="glass rounded-3xl p-8 sm:p-14 border border-indigo-500/30 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Early Developer Access
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to elevate your web experience?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mb-8">
                Join 50,000+ developers receiving monthly WebGL shader recipes, Three.js performance
                tips, and early access releases.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="h-4 w-4" />
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
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{"\u2713 Subscribed! Check your inbox for access keys."}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 bg-slate-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <Boxes className="h-5 w-5 text-indigo-400" />
                <span className="font-bold tracking-tight text-white text-lg">AURA 3D</span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Next-generation spatial interactive frontend framework built on Next.js, Three.js, and
                Framer Motion.
              </p>
            </div>

            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Showcase</a>
              <a href="#" className="hover:text-white transition-colors">Shaders</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" aria-label="Global" className="p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Share" className="p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Code" className="p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">
                <Code2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Aura 3D Inc. Crafted for high-performance interactive web.</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>All systems operational &bull; WebGL 2.0 Ready</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
