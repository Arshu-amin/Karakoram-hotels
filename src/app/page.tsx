'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Code2,
  Box,
  Palette,
  RotateCw,
  Terminal,
  ExternalLink,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono">Initializing WebGL Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PRESETS = [
  { name: 'Cosmic Indigo', hex: '#6366f1' },
  { name: 'Neon Cyan', hex: '#06b6d4' },
  { name: 'Aurora Rose', hex: '#ec4899' },
  { name: 'Emerald Flux', hex: '#10b981' },
  { name: 'Amber Core', hex: '#f59e0b' }
]

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Sphere' }
]

const FEATURES = [
  {
    icon: Cpu,
    title: 'Hardware-Accelerated WebGL',
    desc: 'Powered by Three.js and custom shader materials, delivering buttery-smooth 60+ FPS visuals across desktop and mobile devices.',
    badge: 'Performance'
  },
  {
    icon: Layers,
    title: 'Reactive 3D Viewport',
    desc: 'Seamless two-way reactive state binding between DOM interface controls and the real-time Three.js scene graph.',
    badge: 'Interactive'
  },
  {
    icon: Zap,
    title: 'Zero Latency State Bridge',
    desc: 'Dynamic distortion, material refraction, and rotational parameters rendered instantly with Turbopack fast refresh.',
    badge: 'Realtime'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Pipeline',
    desc: 'Next.js App Router, strict TypeScript type checking, and modern Tailwind CSS v4 styling with glassmorphism aesthetics.',
    badge: 'Architecture'
  },
  {
    icon: Globe,
    title: 'Global Edge Distribution',
    desc: 'Pre-rendered static UI shells paired with dynamic client-side 3D viewports optimized for high-throughput edge nodes.',
    badge: 'Deployment'
  },
  {
    icon: Activity,
    title: 'Adaptive Graphics Quality',
    desc: 'Intelligent viewport detection and performance-tuned physical lighting models built to eliminate frame drops.',
    badge: 'Optimization'
  }
]

const STATS = [
  { value: '120 FPS', label: 'Target Frame Rate', detail: 'Hardware sync' },
  { value: '< 15ms', label: 'Input Latency', detail: 'Real-time response' },
  { value: '99.99%', label: 'Uptime Reliability', detail: 'Edge clustered' },
  { value: '100K+', label: 'Concurrent Users', detail: 'Stress tested' }
]

const CODE_TABS = [
  {
    id: 'scene',
    name: 'Scene.tsx',
    code: `// Three.js & Fiber Canvas Setup
<Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
  <ambientLight intensity={0.6} />
  <pointLight position={[-8, -5, -4]} intensity={2.0} color="#38bdf8" />
  <Starfield count={700} />
  <Float speed={speed * 1.5} rotationIntensity={0.8}>
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.36, 128, 32]} />
      <MeshDistortMaterial color={color} distort={distort} speed={speed} />
    </mesh>
  </Float>
  <OrbitControls enableZoom={false} />
</Canvas>`
  },
  {
    id: 'state',
    name: 'useSceneController.ts',
    code: `// Reactive WebGL State Dispatcher
export function useSceneController() {
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [speed, setSpeed] = useState<number>(1.5)
  const [distort, setDistort] = useState<number>(0.35)
  const [color, setColor] = useState<string>('#6366f1')

  return { shape, setShape, speed, setSpeed, distort, setDistort, color, setColor }
}`
  },
  {
    id: 'styling',
    name: 'glassmorphism.css',
    code: `/* Ultra-Modern Glassmorphism Utilities */
.glass-panel {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`
  }
]

const PRICING_PLANS = [
  {
    name: 'Starter Developer',
    price: '$0',
    frequency: 'forever free',
    desc: 'Perfect for experimental 3D prototypes and creative portfolio projects.',
    popular: false,
    features: [
      'Interactive 3D WebGL Canvas',
      '4 Parametric Geometry Types',
      'Full Shader Customization',
      'Community Discord Access',
      'Standard Documentation'
    ],
    cta: 'Get Started Free'
  },
  {
    name: 'Production Pro',
    price: '$29',
    frequency: 'per month',
    desc: 'Designed for production applications demanding custom shaders and real-time interaction.',
    popular: true,
    features: [
      'All Starter Features Included',
      'High-Density Particle Galaxy (10k+)',
      'Custom GLTF/GLB Asset Loader',
      'Post-Processing Bloom & Vignette',
      'Priority 24/7 SLA Support',
      'Commercial License & Exports'
    ],
    cta: 'Upgrade to Pro'
  },
  {
    name: 'Enterprise Scale',
    price: '$99',
    frequency: 'per month',
    desc: 'Tailored for high-scale enterprise platforms with custom 3D design systems.',
    popular: false,
    features: [
      'Unlimited 3D Canvas Instances',
      'Dedicated WebGL GPU Cluster',
      'Custom Shader Architecture',
      'On-demand Performance Audits',
      'Custom Contract & Dedicated SLA',
      'Dedicated Engineering Lead'
    ],
    cta: 'Contact Solutions'
  }
]

export default function Home() {
  // 3D Scene Interactive Parameters
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1.5)
  const [distort, setDistort] = useState<number>(0.35)

  // UI State
  const [activeTab, setActiveTab] = useState<string>('scene')
  const [email, setEmail] = useState<string>('')
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isAnnual, setIsAnnual] = useState<boolean>(false)
  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(true)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Fixed Background 3D WebGL Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
      </div>

      {/* Modern Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider text-white">AETHERIA</span>
              <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.4 Live
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#lab" className="hover:text-indigo-400 transition-colors">3D Lab</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="px-3.5 py-2 text-xs font-mono rounded-lg glass-panel hover:bg-slate-800/80 transition-all flex items-center gap-2 border border-slate-700/60"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{showConfigDrawer ? 'Hide Lab Controls' : 'Show Lab Controls'}</span>
            </button>
            <a
              href="#pricing"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Launch Console
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Container (relative z-10) */}
      <main className="relative z-10 pt-20">

        {/* Floating Interactive 3D Controller Bar / Card (Docked at side or hero) */}
        <AnimatePresence>
          {showConfigDrawer && (
            <motion.aside
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-40 w-80 sm:w-88 glass-panel-glow p-5 rounded-2xl shadow-2xl backdrop-blur-xl border border-indigo-500/30"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Realtime 3D Controller</span>
                </div>
                <button
                  onClick={() => setShowConfigDrawer(false)}
                  className="text-xs text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              {/* Geometry Selector */}
              <div className="mb-4">
                <label className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-indigo-400" />
                  Geometry Model
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`text-xs py-1.5 px-2.5 rounded-lg font-medium transition-all text-center ${
                        shape === s.id
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette Selector */}
              <div className="mb-4">
                <label className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  Color Spectrum
                </label>
                <div className="flex items-center justify-between gap-1">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setColor(p.hex)}
                      title={p.name}
                      style={{ backgroundColor: p.hex }}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        color === p.hex
                          ? 'ring-2 ring-white scale-110 shadow-lg'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Distortion & Speed Sliders */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Distortion Field</span>
                    <span className="text-indigo-300">{distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Rotation Velocity</span>
                    <span className="text-indigo-300">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4"
                    step="0.2"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* Wireframe toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs text-slate-300">Wireframe Mesh</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      wireframe ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section id="hero" className="min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-300">
              Next-Generation Reactive 3D Interfaces
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-8"
          >
            <span className="text-gradient-primary">Craft Fluid</span>
            <br />
            <span className="text-gradient-secondary">Spatial Computing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Immerse users in an ultra-performant 3D spatial ecosystem. Powered by Three.js,
            Next.js 16, and real-time WebGL shader rendering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#lab"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group"
            >
              <span>Explore 3D Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setShowConfigDrawer(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-slate-800/80 font-semibold text-slate-200 border border-slate-700/60 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4 text-indigo-400" />
              <span>Customize 3D Object</span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 w-full"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all text-left"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-indigo-300 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Down Prompt */}
          <div className="mt-12 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
            <span className="text-[11px] font-mono tracking-widest uppercase">Scroll Down</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>

        {/* 3D LAB INTERACTIVE SECTION */}
        <section id="lab" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase mb-4">
              <Sliders className="w-3.5 h-3.5" />
              Interactive Playground
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Direct DOM to WebGL Integration
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Adjust parameters below to witness instant reactive transformation of the 3D scene in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Control Column 1: Shape & Form */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-400" />
                Geometry Selection
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Switch between high-polygon Three.js mathematical structures with procedural surface calculations.
              </p>
              <div className="space-y-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-sm font-medium ${
                      shape === s.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{s.label}</span>
                    {shape === s.id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Column 2: Material & Optics */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                Material Optics & Shaders
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Pick curated physical presets or toggle wireframe mesh mode for technical blueprints.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setColor(p.hex)}
                      className={`h-10 rounded-xl transition-all ${
                        color === p.hex
                          ? 'ring-2 ring-white scale-105 shadow-lg'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div>
                      <div className="text-sm font-medium text-white">Wireframe Mode</div>
                      <div className="text-[11px] text-slate-400">Expose underlying vertex topology</div>
                    </div>
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
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
              </div>
            </div>

            {/* Control Column 3: Physics & Dynamics */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Physics & Distortion
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Control procedural Simplex noise displacement fields and rotational inertia in real-time.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Distortion Amplitude</span>
                    <span className="text-indigo-400 font-bold">{Math.round(distort * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Rigid (0.0)</span>
                    <span>Fluid (1.0)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300">Animation Speed</span>
                    <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4"
                    step="0.2"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>Slow (0.2x)</span>
                    <span>Hyper (4.0x)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase mb-4">
              <Zap className="w-3.5 h-3.5" />
              Engine Features
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Engineered for Modern Web Visuals
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Every detail is tuned for peak frame performance, instant reactivity, and seamless visual storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="glass-panel p-8 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all">
                      <Icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ARCHITECTURE & CODE SHOWCASE */}
        <section id="architecture" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono uppercase mb-4">
              <Terminal className="w-3.5 h-3.5" />
              Source Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Developer-First Implementation
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Clean modular components built with React 19, TypeScript, and Three.js declarative paradigms.
            </p>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Editor Window Header */}
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  aetheria-core // v2.4
                </span>
              </div>

              <div className="flex items-center gap-1">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-slate-800 text-indigo-300 font-semibold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 bg-slate-950/80 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
              <pre className="text-indigo-300/90">
                {CODE_TABS.find((t) => t.id === activeTab)?.code}
              </pre>
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section id="pricing" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Flexible Licensing
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Transparent Access For Every Project
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Choose the right plan to power interactive 3D web experiences at any scale.
            </p>

            {/* Billing cycle toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-xl glass-panel border border-slate-800">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  !isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'glass-panel-glow border-2 border-indigo-500/50 scale-100 lg:-translate-y-2'
                    : 'glass-panel border border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-6">{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-mono">/ {plan.frequency}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-lg ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:scale-105 active:scale-95'
                      : 'glass-panel hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER CTA SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Stay Ahead in Spatial Web Development
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mb-8">
                Subscribe to our weekly newsletter for cutting-edge WebGL shader breakdowns,
                Three.js performance guides, and open-source updates.
              </p>

              {isSubscribed ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{"\u2713"} Subscribed successfully! Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your developer email..."
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* MODERN GLASS FOOTER */}
        <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-white tracking-wider">AETHERIA</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Next-generation spatial computing framework for interactive 3D web applications and creative engineering.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>All WebGL systems operational</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Architecture</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#lab" className="hover:text-indigo-400 transition-colors">3D Scene Controller</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Shader Pipeline</a></li>
                <li><a href="#architecture" className="hover:text-indigo-400 transition-colors">Geometry Modifiers</a></li>
                <li><a href="#architecture" className="hover:text-indigo-400 transition-colors">Particle Systems</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Resources</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#hero" className="hover:text-indigo-400 transition-colors">Three.js Documentation</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Next.js 16 App Router</a></li>
                <li><a href="#architecture" className="hover:text-indigo-400 transition-colors">Tailwind CSS v4</a></li>
                <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Community Forum</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Connect</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Global Edge Network</span>
                </li>
                <li className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Open Source Core</span>
                </li>
                <li className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Status & Telemetry</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Aetheria 3D Spatial Computing. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#hero" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#hero" className="hover:text-slate-400">Terms of Service</a>
              <a href="#hero" className="hover:text-slate-400">Security</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
