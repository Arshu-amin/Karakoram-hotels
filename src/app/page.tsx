'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Sliders,
  RotateCw,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Boxes,
  Code2,
  Terminal,
  Activity,
  Globe
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#020617] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Initializing 3D Engine...</span>
      </div>
    </div>
  ),
})

const COLOR_PALETTES = [
  { name: 'Hyper Indigo', hex: '#6366f1' },
  { name: 'Cyan Neon', hex: '#06b6d4' },
  { name: 'Emerald Flux', hex: '#10b981' },
  { name: 'Amber Core', hex: '#f59e0b' },
  { name: 'Rose Cyber', hex: '#f43f5e' },
  { name: 'Orchid Purple', hex: '#c084fc' },
]

const GEOMETRIES: { id: GeometryType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'cyberRing', label: 'Cyber Ring' },
  { id: 'sphere', label: 'Fluid Sphere' },
]

export default function Home() {
  // 3D Scene Interactive Controls State
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [wireframe, setWireframe] = useState(false)
  const [speed, setSpeed] = useState(1.8)
  const [distort, setDistort] = useState(0.45)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)

  // Interactive tab state
  const [activeTab, setActiveTab] = useState<'metrics' | 'shaders' | 'arch'>('metrics')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Fixed Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-75">
        <Scene
          geometry={geometry}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
          rotationSpeed={rotationSpeed}
          autoRotate={autoRotate}
        />
      </div>

      {/* Glassmorphic Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Boxes className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                AURA<span className="text-indigo-400 font-mono">.3D</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Next-Gen Interface</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#lab" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              3D Studio
            </a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Tech Specs</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#lab"
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              <span>Next.js 16 &middot; WebGL Engine &middot; Real-Time Shader Motion</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-gradient-primary">
              Crafting <br />
              <span className="text-gradient-accent">Spatial Web</span> <br />
              Dimensions.
            </h1>

            <p className="text-base sm:text-xl text-slate-400 max-w-xl font-normal leading-relaxed">
              Immerse your users in an ethereal, high-fidelity experience blending React Three Fiber, hardware-accelerated shaders, and precision UI design.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#lab"
                className="px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-semibold rounded-xl flex items-center gap-2 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <span>Customize 3D Canvas</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#features"
                className="px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
              >
                Explore Architecture
              </a>
            </div>

            {/* Quick Stats Strip */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">120<span className="text-indigo-400 font-mono">FPS</span></p>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Render Budget</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">0.4<span className="text-sky-400 font-mono">ms</span></p>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Shader Latency</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">100<span className="text-emerald-400 font-mono">%</span></p>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Client Reactivity</p>
              </div>
            </div>
          </motion.div>

          {/* Quick HUD Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-medium text-emerald-400">ACTIVE SHADER RUNTIME</span>
                </div>
                <span className="text-xs font-mono text-slate-400">Turbopack v16</span>
              </div>

              <div className="py-4 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Topology:</span>
                  <span className="text-indigo-300 uppercase font-semibold">{geometry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Distortion Flow:</span>
                  <span className="text-sky-300 font-semibold">{distort} vec3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Color Spectrum:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-semibold">{color}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Wireframe Mesh:</span>
                  <span className={wireframe ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                    {wireframe ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                Tip: Drag on the viewport to rotate the 3D element in space or use the interactive studio below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Interactive Controls Studio Section */}
      <section id="lab" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono tracking-wider uppercase mb-3">
            <Sliders className="w-3.5 h-3.5" />
            Interactive Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Direct WebGL <span className="text-gradient-secondary">Control Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Manipulate the live Three.js scene in real-time. Adjust geometry, deformational wave speed, wireframe styling, and luminous palettes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Panel 1: Geometry Picker */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 mb-4 font-semibold text-sm">
                <Boxes className="w-4 h-4" />
                <h3>Geometry Topology</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {GEOMETRIES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGeometry(g.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                      geometry === g.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{g.label}</span>
                    {geometry === g.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-4">Procedural vertex buffers</span>
          </div>

          {/* Panel 2: Color Palette */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-400 mb-4 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <h3>Color Synthesis</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.hex}
                    onClick={() => setColor(palette.hex)}
                    className={`p-2 rounded-xl text-left transition-all border ${
                      color === palette.hex
                        ? 'border-white bg-slate-800/90'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: palette.hex }} />
                      <span className="text-[11px] font-medium text-slate-200 truncate">{palette.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Custom Hex</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>

          {/* Panel 3: Distortion & Speed */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-4 font-semibold text-sm">
                <Zap className="w-4 h-4" />
                <h3>Distortion Dynamics</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Wave Distortion</span>
                    <span className="text-white">{distort}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.2"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Oscillation Speed</span>
                    <span className="text-white">{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Rotation Momentum</span>
                    <span className="text-white">{rotationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.5"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-4">Simplex 3D noise vector</span>
          </div>

          {/* Panel 4: Rendering Flags */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-4 font-semibold text-sm">
                <Eye className="w-4 h-4" />
                <h3>Viewport Directives</h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                    wireframe
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    <span>Wireframe Grid</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {wireframe ? 'ON' : 'OFF'}
                  </span>
                </button>

                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                    autoRotate
                      ? 'bg-sky-600/20 border-sky-500 text-sky-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    <span>Continuous Orbit</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    {autoRotate ? 'ON' : 'OFF'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setGeometry('torusKnot')
                    setColor('#6366f1')
                    setWireframe(false)
                    setSpeed(1.8)
                    setDistort(0.45)
                    setRotationSpeed(1)
                    setAutoRotate(true)
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-800 border border-slate-800/70 transition-all text-center"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-4">Hardware swap-chain active</span>
          </div>
        </div>
      </section>

      {/* Features Showcase Grid */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Architectural Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Engineered for <span className="text-gradient-primary">Peak Performance</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            A state-of-the-art tech matrix built for scale, ultra-fluid frame rates, and unforgettable aesthetic presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "WebGL 2.0 Acceleration",
              desc: "Zero dropped frames. Utilizes custom vertex distortion shaders and compute cycles designed specifically for modern GPUs.",
              badge: "GPU Optimized"
            },
            {
              icon: Layers,
              title: "Glassmorphic Layering",
              desc: "Sophisticated backdrop-filter glass panels layered with calibrated optical depth, dynamic shadows, and glowing accent borders.",
              badge: "Visual Depth"
            },
            {
              icon: Cpu,
              title: "Turbopack Next.js 16",
              desc: "Engineered on the freshest Next.js App Router with server/client boundaries and asynchronous dynamic imports for instantaneous loads.",
              badge: "Lightning Core"
            },
            {
              icon: Activity,
              title: "Synchronized Animations",
              desc: "Harmonized Framer Motion layout transitions paired seamlessly with Three.js useFrame animation loops.",
              badge: "60-120 FPS"
            },
            {
              icon: Terminal,
              title: "TypeScript Strict Mode",
              desc: "Fully typed 3D geometries, materials, and motion hooks ensuring enterprise stability and seamless developer velocity.",
              badge: "Type-Safe"
            },
            {
              icon: ShieldCheck,
              title: "Software GL Safe",
              desc: "Robust fallback capabilities engineered for both high-end mobile chipsets and headless server-side testing environments.",
              badge: "Resilient"
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="glass-panel p-8 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tech Specs & Architecture Interactive Tab Section */}
      <section id="architecture" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">System Blueprint</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">Under The Hood</h3>
            </div>

            {/* Segmented Controls */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'metrics' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setActiveTab('shaders')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'shaders' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Shader Stack
              </button>
              <button
                onClick={() => setActiveTab('arch')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'arch' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Architecture
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="pt-8">
            {activeTab === 'metrics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Canvas Render Target</div>
                  <div className="text-2xl font-bold text-white mb-2">Offscreen WebGL2</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Optimal Draw Calls (&lt; 25)
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Texture Cache Memory</div>
                  <div className="text-2xl font-bold text-white mb-2">12.4 MB</div>
                  <div className="text-xs text-sky-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Zero VRAM Memory Leaks
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Hydration Strategy</div>
                  <div className="text-2xl font-bold text-white mb-2">next/dynamic (ssr: false)</div>
                  <div className="text-xs text-purple-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Zero SSR Desync
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shaders' && (
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-indigo-400 font-bold">{"// MeshDistortMaterial Configuration"}</div>
                <div className="text-slate-500">{"// Dynamic uniforms bind directly to React state inputs"}</div>
                <p>uniform float uDistort = <span className="text-sky-300">{distort}</span>;</p>
                <p>uniform float uSpeed = <span className="text-sky-300">{speed}</span>;</p>
                <p>uniform vec3 uColor = <span className="text-emerald-300">&quot;{color}&quot;</span>;</p>
                <p>uniform bool uWireframe = <span className="text-amber-300">{wireframe ? 'true' : 'false'}</span>;</p>
                <p className="text-slate-500 mt-2">{"// Evaluated on every tick via state.clock.getElapsedTime()"}</p>
              </div>
            )}

            {activeTab === 'arch' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    Client-Server Separation
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Page structure is delivered with React Server Component layouts while WebGL canvas primitives and interactive state nodes operate seamlessly on the client tier.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-sky-400" />
                    Tailwind CSS v4 Engine
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Built using the brand new @tailwindcss/postcss pipeline with CSS variables for lightning-quick theme compilation and zero CSS bloat.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive CTA & Newsletter */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-panel-glow p-8 sm:p-14 rounded-3xl border border-indigo-500/30 relative">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Ready to Build the <span className="text-gradient-accent">Next Dimension?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Experience spatial web design in your own production projects. Join our developer network for component drops and 3D shader kits.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={subscribed}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-sm text-slate-100 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{"\u2713 Subscribed"}</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
          <AnimatePresence>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 font-mono mt-3"
              >
                Welcome aboard! You have joined the Aura 3D network.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-[#020617]/90 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Boxes className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-200 tracking-tight">AURA 3D</span>
            <span className="text-xs font-mono text-slate-600">|</span>
            <span className="text-xs text-slate-400">Next.js &middot; Three.js &middot; Tailwind v4</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#hero" className="hover:text-slate-200 transition-colors">Overview</a>
            <a href="#lab" className="hover:text-slate-200 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-slate-200 transition-colors">Architecture</a>
          </div>

          <p className="text-xs text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} Aura Spatial Lab. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
