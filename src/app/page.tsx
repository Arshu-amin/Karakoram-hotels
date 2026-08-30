'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Box,
  Cpu,
  Layers,
  Zap,
  Palette,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Eye,
  Activity,
  Code2,
  Globe
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-mono text-indigo-400/80 animate-pulse">Initializing WebGL Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PALETTES = [
  { name: 'Indigo Aura', value: '#6366f1', glow: 'shadow-indigo-500/50' },
  { name: 'Cyber Cyan', value: '#06b6d4', glow: 'shadow-cyan-500/50' },
  { name: 'Neon Rose', value: '#ec4899', glow: 'shadow-pink-500/50' },
  { name: 'Emerald Flare', value: '#10b981', glow: 'shadow-emerald-500/50' },
  { name: 'Amber Burst', value: '#f59e0b', glow: 'shadow-amber-500/50' }
]

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'cyberRing', label: 'Cyber Ring' },
  { id: 'sphere', label: 'Fluid Sphere' },
  { id: 'icosahedron', label: 'Icosahedron' }
]

export default function Home() {
  // 3D Scene Interactive Controls State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [distort, setDistort] = useState(0.35)
  const [wireframe, setWireframe] = useState(false)
  const [scale, setScale] = useState(1.0)

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<'overview' | 'rendering' | 'shaders'>('overview')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  const handleResetScene = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setSpeed(1.5)
    setDistort(0.35)
    setWireframe(false)
    setScale(1.0)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D WebGL Canvas Container */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          scale={scale}
        />
      </div>

      {/* Floating Modern Header / Navigation Bar */}
      <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between border border-slate-800/80 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AURA<span className="text-cyan-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#customizer" className="hover:text-cyan-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-cyan-400 transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-indigo-300 text-xs font-mono mb-8 shadow-lg shadow-indigo-900/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Next-Gen WebGL & Interactive 3D Interface</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.1] mb-6"
        >
          Immersive <span className="text-gradient-primary">3D Experiences</span> Built for the Web
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-normal"
        >
          Engineered with Next.js 16, React Three Fiber, Framer Motion, and Tailwind CSS v4 for ultra-smooth 60fps WebGL rendering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mb-16"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Customize 3D Object</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Features</span>
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
        >
          {[
            { label: 'Target Frame Rate', value: '60 FPS', sub: 'Smooth Animation' },
            { label: 'Render Engine', value: 'WebGL 2.0', sub: 'Hardware Accelerated' },
            { label: 'Shader Pass Time', value: '< 1.2 ms', sub: 'Ultra Low Latency' },
            { label: 'App Stack', value: 'Next.js 16', sub: 'Turbopack Powered' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-left border border-slate-800/80">
              <div className="text-xs font-mono text-cyan-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-extrabold text-slate-100">{stat.value}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio / Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Real-time Control</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            3D Studio <span className="text-gradient-primary">Playground</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">
            Adjust shapes, colors, rotation speed, distortion parameters, and wireframe mode to see immediate real-time canvas updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customizer Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-slate-200">Scene Parameters</h3>
              </div>
              <button
                onClick={handleResetScene}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800/50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Shape Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border ${
                      shape === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{s.label}</span>
                    {shape === s.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Presets */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Material Color
              </label>
              <div className="flex items-center justify-between gap-2">
                {COLOR_PALETTES.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setColor(p.value)}
                    title={p.name}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center border-2 ${
                      color === p.value
                        ? 'border-white scale-110 shadow-lg ' + p.glow
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: p.value }}
                  >
                    {color === p.value && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-5 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Rotation Speed</span>
                  <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Mesh Distortion</span>
                  <span className="text-cyan-400 font-bold">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Scale Factor</span>
                  <span className="text-pink-400 font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-300">Wireframe View</span>
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
          </motion.div>

          {/* Interactive Info Display Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 border border-slate-800/80 flex flex-col justify-between min-h-[420px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-mono">
                  Active WebGL Config
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-100">
                Customizing {SHAPES.find((s) => s.id === shape)?.label}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The 3D background object is updating live with metallic physical materials, dynamic lighting, and float keyframes managed by React Three Fiber and Three.js shader routines.
              </p>

              {/* Live JSON Config Spec Inspector */}
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs text-indigo-300 overflow-x-auto">
                <div className="text-slate-500 mb-2">{"// WebGL Material State"}</div>
                <pre className="text-emerald-300">
{JSON.stringify(
  {
    geometry: shape,
    colorHex: color,
    speedMultiplier: speed,
    distortion: distort,
    scale: scale,
    wireframe: wireframe,
  },
  null,
  2
)}
                </pre>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Active Shaders: MeshDistortMaterial
              </span>
              <span>GPU Memory: ~14.2 MB</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Built for <span className="text-gradient-primary">High-Impact</span> Applications
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Everything you need to craft high performance, visually stunning modern web products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: "Next.js 16 & Turbopack",
              desc: "Instant server rendering, zero-lag dynamic imports, and rapid build times with Turbopack compilation.",
              color: "text-cyan-400"
            },
            {
              icon: Layers,
              title: "React Three Fiber",
              desc: "Declarative, component-driven 3D scene architecture rendering WebGL graphics at native 60fps.",
              color: "text-indigo-400"
            },
            {
              icon: Sparkles,
              title: "Framer Motion Effects",
              desc: "Fluid physics-based spring transitions, layout morphing, and scroll-triggered animations.",
              color: "text-purple-400"
            },
            {
              icon: Palette,
              title: "Glassmorphism UI",
              desc: "Frosted glass aesthetic with backdrop filters, gradient borders, and custom spring cursor.",
              color: "text-pink-400"
            },
            {
              icon: ShieldCheck,
              title: "Strict TypeScript",
              desc: "End-to-end type safety across Three.js props, React state, and Tailwind CSS v4 design tokens.",
              color: "text-emerald-400"
            },
            {
              icon: Globe,
              title: "Responsive & Accessible",
              desc: "Fully scalable across desktop, tablet, and mobile devices with fluid typography and layout system.",
              color: "text-amber-400"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className={`p-3 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-6 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Architecture Showcase Section */}
      <section id="tech" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Modern Frontend Stack</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Seamless Integration of WebGL & DOM
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                By maintaining standard React state for UI components while syncing props down to the WebGL canvas layer, Aura3D provides zero-latency visual feedback without compromising render performance.
              </p>

              {/* Tab Selector */}
              <div className="flex gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 w-fit">
                {[
                  { id: 'overview' as const, label: 'Overview' },
                  { id: 'rendering' as const, label: 'Pipeline' },
                  { id: 'shaders' as const, label: 'Shaders' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono"
                >
                  {activeTab === 'overview' && (
                    <p>React 19 fiber tree manages layout & state. Next.js 16 handles dynamic SSR/CSR component boundary with ssr: false optimization.</p>
                  )}
                  {activeTab === 'rendering' && (
                    <p>60fps requestAnimationFrame loop running OrbitControls, mesh rotation delta, float physics, and particle cloud position updates.</p>
                  )}
                  {activeTab === 'shaders' && (
                    <p>Physical material distortion pass using WebGL fragment shaders with customizable metallic reflection, roughness, and wireframe options.</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Architecture Card Grid */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
              {[
                { title: 'Next.js 16', sub: 'App Router & Turbopack' },
                { title: 'Three.js r184', sub: 'WebGL 2.0 Engine' },
                { title: 'Tailwind v4', sub: '@import inline theme' },
                { title: 'Framer Motion 12', sub: 'Spring Physics' },
              ].map((tech, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl border border-slate-800">
                  <div className="text-cyan-400 font-bold text-base mb-1">{tech.title}</div>
                  <div className="text-slate-400 text-xs font-mono">{tech.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Call to Action / Newsletter Section */}
      <section className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ready to Build Modern <span className="text-gradient-primary">3D Web Apps</span>?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8">
            Subscribe to our developer updates and stay ahead with cutting-edge WebGL & 3D user experience releases.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-semibold text-sm max-w-md mx-auto flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713"} You&apos;re subscribed to Aura3D updates!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Get Updates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-4 text-center text-slate-500 text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300 tracking-wider">AURA3D INTERACTIVE</span>
          </div>

          <p>© {new Date().getFullYear()} Aura3D Engine. Built with Next.js 16, React Three Fiber & Tailwind CSS v4.</p>

          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WebGL Engine Operational</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
