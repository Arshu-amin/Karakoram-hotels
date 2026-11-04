'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Activity,
  Sliders,
  Palette,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Code2,
  Box,
  Share2,
  Check
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  ),
})

const COLOR_PRESETS = [
  { name: 'Hyper Indigo', hex: '#6366f1' },
  { name: 'Neon Violet', hex: '#a855f7' },
  { name: 'Cyber Cyan', hex: '#06b6d4' },
  { name: 'Electric Emerald', hex: '#10b981' },
  { name: 'Sunset Crimson', hex: '#f43f5e' },
]

const SHAPES: { id: GeometryType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Distorted Sphere' },
  { id: 'torus', label: 'Cyber Torus' },
]

export default function Home() {
  // 3D scene dynamic controls
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [wireframe, setWireframe] = useState(false)
  const [speed, setSpeed] = useState(2)
  const [distort, setDistort] = useState(0.4)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Billing state
  const [isAnnual, setIsAnnual] = useState(true)

  // Active showcase tab
  const [activeTab, setActiveTab] = useState<'spatial' | 'generative' | 'realtime'>('spatial')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      {/* Background 3D Viewport */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <Scene
          geometry={geometry}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
        {/* Subtle vignette / gradient overlays */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#030712]/50 to-[#030712] pointer-events-none" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                AETHERIA <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-medium">3D v2.4</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Interactive 3D</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Capabilities</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WebGL 2.0 Active</span>
            </div>
            <a
              href="#customizer"
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation Spatial Interface Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
        >
          Sculpt The Future of <br className="hidden sm:inline" />
          <span className="text-gradient-accent">Spatial Real-Time Web</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Render cinematic 3D geometries, fluid shader distortions, and ultra-responsive physical materials directly in modern web browsers at 120 FPS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Explore 3D Customizer</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-xl font-semibold glass-panel glass-panel-hover text-slate-200 border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
          >
            <span>View Architecture</span>
          </a>
        </motion.div>

        {/* Live Metrics Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
        >
          {[
            { label: 'Render Latency', value: '< 2.4 ms', icon: Activity, change: 'Optimal' },
            { label: 'Frame Rate', value: '120 FPS', icon: Zap, change: 'Fluid' },
            { label: 'Shader Compute', value: 'Zero Drop', icon: Cpu, change: 'Native' },
            { label: 'GPU Memory', value: '18.4 MB', icon: Layers, change: 'Lightweight' },
          ].map((metric, i) => {
            const Icon = metric.icon
            return (
              <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800/80 text-left">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs">{metric.label}</span>
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{metric.value}</div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">● {metric.change}</div>
              </div>
            )
          })}
        </motion.div>
      </section>

      {/* 3D Real-time Customizer Dock */}
      <section id="customizer" className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-indigo-500/20 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sliders className="w-4 h-4" />
                <span>Live Viewport Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Interactive 3D Geometry Controller
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Tweak parameters in real-time to observe dynamic mesh deformation, shaders, and lighting.
              </p>
            </div>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 ${
                wireframe
                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-lg shadow-indigo-500/20'
                  : 'glass-panel border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Wireframe Mode: {wireframe ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shape Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Geometry Mesh</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setGeometry(shape.id)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all border text-left flex items-center justify-between ${
                      geometry === shape.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{shape.label}</span>
                    {geometry === shape.id && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Color Frequency ({COLOR_PRESETS.find(p => p.hex === color)?.name || 'Custom'})</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setColor(preset.hex)}
                    title={preset.name}
                    className={`w-11 h-11 rounded-xl transition-all transform hover:scale-110 flex items-center justify-center relative ${
                      color === preset.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-[#030712] scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: preset.hex }}
                  >
                    {color === preset.hex && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders for Speed and Distortion */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Distortion Magnitude</span>
                  <span className="text-indigo-400 font-mono">{(distort * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Orbital Speed</span>
                  <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5"
                  step="0.2"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Showcase */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Core Technologies</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">
            Built For Uncompromising Visual Fidelity
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A comprehensive graphics architecture powering smooth web-based spatial computing experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl border border-slate-800 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Hyper-Optimized Three.js Pipeline</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Engineered with React Three Fiber and Three.js r184, leveraging instanced draw calls, deterministic buffer geometries, and float physics to sustain smooth frame pacing across mobile and high-refresh desktop monitors.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Instanced Mesh</span>
              <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Dynamic Subdivision</span>
              <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">Zero Garbage Collection</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Glassmorphic UI</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Frosted glass panels, dynamic backdrop blurs, and luminous border glows create seamless visual depth between the 2D DOM and 3D WebGL viewport.
            </p>
            <span className="text-xs font-mono text-purple-400">backdrop-filter: blur(20px)</span>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Next.js 16 + React 19</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Powered by Turbopack compilation, dynamic client-side hydration for 3D elements, and modern TypeScript architecture.
            </p>
            <span className="text-xs font-mono text-emerald-400">Turbopack Engine</span>
          </div>

          {/* Card 4 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl border border-slate-800 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Universal Device Fallback & Safety</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Graceful degradation for low-powered devices, software OpenGL environments, and headless viewports. Continuous telemetry ensures flawless stability without GPU stalls.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Headless Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Battery Aware</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Responsive FOV</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Experience Showcase Tabs */}
      <section id="showcase" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Applications</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">
            Engineered For Every Spatial Domain
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="glass-panel p-1.5 rounded-2xl border border-slate-800 flex gap-2">
            {[
              { id: 'spatial' as const, label: 'Spatial Commerce' },
              { id: 'generative' as const, label: 'Generative Art' },
              { id: 'realtime' as const, label: 'Data Visualizer' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800">
          <AnimatePresence mode="wait">
            {activeTab === 'spatial' && (
              <motion.div
                key="spatial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Domain 01</span>
                  <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Photorealistic Digital Twins & E-Commerce</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    Allow customers to inspect tactile 3D materials, physical textures, and scale models directly in real-time before making purchase decisions.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      <span>Instant AR preview on mobile devices</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      <span>Physical clearcoat & metallics simulation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      <span>Sub-second load times via mesh compression</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex flex-col items-center justify-center p-6 text-center">
                  <Box className="w-16 h-16 text-indigo-400 mb-4 animate-bounce" style={{ animationDuration: '3s' }} />
                  <div className="text-xl font-bold text-white">Interactive Spatial Twin</div>
                  <div className="text-xs text-slate-400 mt-2 max-w-xs">Configurable live shading pipeline with multi-angle lighting passes.</div>
                </div>
              </motion.div>
            )}

            {activeTab === 'generative' && (
              <motion.div
                key="generative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">Domain 02</span>
                  <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Algorithmic Procedural Shaders</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    Harness GPU mathematical computations to produce infinite generative forms, noise-driven vertices, and reactive audio landscapes.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <span>Perlin and Simplex noise deformation matrices</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <span>Dynamic time-based frequency modulators</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <span>GLSL custom fragment & vertex shader hooks</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-purple-950/60 to-pink-950/40 border border-purple-500/30 flex flex-col items-center justify-center p-6 text-center">
                  <Sparkles className="w-16 h-16 text-purple-400 mb-4 animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="text-xl font-bold text-white">Generative Shader Matrix</div>
                  <div className="text-xs text-slate-400 mt-2 max-w-xs">Dynamic vertex modulation driven by real-time mathematical harmonics.</div>
                </div>
              </motion.div>
            )}

            {activeTab === 'realtime' && (
              <motion.div
                key="realtime"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Domain 03</span>
                  <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Spatial Analytics & High-Density Feeds</h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    Transform complex multi-dimensional time-series data into interactive 3D topology heatmaps and volumetric particle flows.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>100,000+ data points rendered with instanced points</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>Real-time WebSocket telemetry clustering</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      <span>Interactive raycasting and tooltip inspection</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-blue-950/40 border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center">
                  <Activity className="w-16 h-16 text-cyan-400 mb-4 animate-pulse" />
                  <div className="text-xl font-bold text-white">Volumetric Telemetry</div>
                  <div className="text-xs text-slate-400 mt-2 max-w-xs">Spatial clustering and multi-dimensional coordinate mapping.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Flexible Deployment</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Choose the plan that suits your creative project or enterprise workflow.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass-panel px-4 py-2 rounded-full mt-6 border border-slate-800">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-indigo-600 p-1 flex items-center transition-colors relative"
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-white shadow"
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ marginLeft: isAnnual ? 'auto' : '0' }}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annual <span className="text-xs text-indigo-400 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Creator',
              desc: 'Ideal for independent developers and creative visualizers.',
              priceMonthly: 29,
              priceAnnual: 22,
              features: ['Up to 5 active 3D viewports', 'Standard WebGL shaders', 'Community support', 'Standard CDN caching'],
              highlighted: false,
              cta: 'Start Free Trial',
            },
            {
              name: 'Studio Pro',
              desc: 'Tailored for high-growth interactive agencies and tech teams.',
              priceMonthly: 79,
              priceAnnual: 59,
              features: ['Unlimited 3D scenes & meshes', 'Custom GLSL shader compiler', 'Priority 120 FPS guarantees', 'Analytics & telemetry suite', 'Direct engineer support'],
              highlighted: true,
              cta: 'Get Studio Pro',
            },
            {
              name: 'Enterprise Spatial',
              desc: 'Mission-critical spatial apps with dedicated SLA infrastructure.',
              priceMonthly: 199,
              priceAnnual: 159,
              features: ['Dedicated WebGL compute cluster', 'Private CDN edge delivery', 'Custom AR/VR integrations', '99.99% uptime SLA guarantee', 'Dedicated account manager'],
              highlighted: false,
              cta: 'Contact Sales',
            },
          ].map((tier, i) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly
            return (
              <div
                key={i}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  tier.highlighted
                    ? 'glass-panel border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 relative scale-105'
                    : 'glass-panel border border-slate-800'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400 text-xs mb-6 min-h-[36px]">{tier.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-white">${price}</span>
                    <span className="text-slate-400 text-sm">/ month</span>
                  </div>

                  <div className="border-t border-slate-800 pt-6 space-y-3 mb-8">
                    {tier.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Stay on The Cutting Edge
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Receive monthly updates on real-time 3D web standards, WebGPU breakthroughs, and open-source shader formulas.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium text-sm"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{"\u2713 Subscribed! Check your inbox for the latest release."}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-100 placeholder-slate-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Join Network
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#030712]/80 backdrop-blur-md pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-white tracking-tight">AETHERIA 3D</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Next-generation spatial web development toolkit built with Three.js, React 19, and Next.js 16.
              </p>
              <div className="flex items-center gap-3 text-slate-400">
                <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                <Code2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Platform</div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#customizer" className="hover:text-white transition-colors">3D Viewport</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Shader Engine</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Digital Twins</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">Resources</div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Three.js Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">System Status</div>
              <div className="glass-panel p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">WebGL Pipeline</span>
                  <span className="text-emerald-400 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Shader Cache</span>
                  <span className="text-emerald-400 font-medium">Warm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Global CDN</span>
                  <span className="text-emerald-400 font-medium">100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Aetheria 3D Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
