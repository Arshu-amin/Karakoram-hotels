'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Cursor from '@/components/Cursor'
import type { SceneProps } from '@/components/Scene'
import {
  Sparkles,
  Box,
  Layers,
  Cpu,
  Zap,
  Sliders,
  Palette,
  RotateCw,
  Check,
  ArrowRight,
  Globe,
  Share2,
  Code2,
  ShieldCheck,
  Terminal,
  Activity,
  Menu,
  X,
  ChevronRight,
  Gauge,
  Feather
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <span className="text-xs text-indigo-300 font-mono tracking-widest uppercase animate-pulse">
        Initializing 3D Engine...
      </span>
    </div>
  )
})

const PRESETS = [
  {
    name: 'Cyberpunk',
    config: { shape: 'torusKnot', color: '#6366f1', speed: 1.2, distort: 0.4, wireframe: false, materialStyle: 'distort' } as SceneProps
  },
  {
    name: 'Cosmic Violet',
    config: { shape: 'icosahedron', color: '#c084fc', speed: 0.8, distort: 0.25, wireframe: false, materialStyle: 'physical' } as SceneProps
  },
  {
    name: 'Neon Teal',
    config: { shape: 'torus', color: '#06b6d4', speed: 1.5, distort: 0.5, wireframe: false, materialStyle: 'distort' } as SceneProps
  },
  {
    name: 'Emerald Matrix',
    config: { shape: 'octahedron', color: '#10b981', speed: 1.0, distort: 0.3, wireframe: true, materialStyle: 'distort' } as SceneProps
  }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'shaders' | 'lighting' | 'performance' | 'api'>('shaders')
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activePreset, setActivePreset] = useState<string>('Cyberpunk')

  const [sceneConfig, setSceneConfig] = useState<SceneProps>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1.2,
    distort: 0.4,
    wireframe: false,
    materialStyle: 'distort'
  })

  const handleApplyPreset = (presetName: string, config: SceneProps) => {
    setActivePreset(presetName)
    setSceneConfig(config)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Custom Spring Cursor */}
      <Cursor />

      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneConfig} />
      </div>

      {/* Subtle Background Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950 pointer-events-none" />

      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg text-white flex items-center gap-2">
                AURA <span className="text-gradient-primary font-extrabold">3D</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                WebGL Core v2.4
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Metrics</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Launch Studio
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-6 flex flex-col gap-4 text-slate-300"
            >
              <a href="#customizer" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Customizer</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Features</a>
              <a href="#metrics" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Metrics</a>
              <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400">Showcase</a>
              <a href="#customizer" onClick={() => setMobileMenuOpen(false)} className="mt-2 w-full text-center py-3 bg-indigo-600 rounded-lg text-white font-semibold">
                Launch Studio
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 md:pt-32 md:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8 hover:border-indigo-500/60 transition-all cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          ⚡ Aura3D WebGL Engine v2.4 Released
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight max-w-5xl leading-tight mb-8"
        >
          Next-Gen <span className="text-gradient-primary">3D Web</span> Experiences
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Elevate your modern web application with interactive real-time WebGL graphics, liquid 60 FPS animations, and seamless glassmorphic interfaces.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-full shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Sliders className="w-5 h-5" />
            Explore Live Customizer
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 font-semibold rounded-full transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Discover Capabilities
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Quick Performance Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Render Target', value: '60 FPS', sub: 'Liquid Smooth', icon: Gauge },
            { label: 'Latency', value: '< 12ms', sub: 'Instant Response', icon: Zap },
            { label: 'Polygon Count', value: '128K+', sub: 'High Fidelity', icon: Box },
            { label: 'First Interactive', value: '0.4s', sub: 'Ultra Fast Load', icon: Activity }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl flex flex-col items-center text-center">
              <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
              <span className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</span>
              <span className="text-xs text-indigo-300 font-medium mt-0.5">{stat.label}</span>
              <span className="text-[10px] text-slate-500 mt-1">{stat.sub}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Live 3D Studio <span className="text-gradient-secondary">Customizer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Directly adjust the WebGL canvas parameters in real-time. Watch the background 3D engine respond dynamically to your input.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto border border-indigo-500/20 shadow-2xl">
          {/* Preset Buttons */}
          <div className="mb-8">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Style Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handleApplyPreset(p.name, p.config)}
                  className={`px-4 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all border flex items-center justify-between ${
                    activePreset === p.name
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{p.name}</span>
                  {activePreset === p.name && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
            {/* Shape Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['torusKnot', 'icosahedron', 'octahedron', 'sphere', 'torus'] as const).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => {
                      setActivePreset('Custom')
                      setSceneConfig((prev) => ({ ...prev, shape }))
                    }}
                    className={`px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      sceneConfig.shape === shape
                        ? 'bg-purple-600/30 border-purple-500 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Picker */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" /> Material Accent
              </label>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Indigo', hex: '#6366f1' },
                  { name: 'Purple', hex: '#c084fc' },
                  { name: 'Cyan', hex: '#06b6d4' },
                  { name: 'Emerald', hex: '#10b981' },
                  { name: 'Amber', hex: '#f59e0b' },
                  { name: 'Rose', hex: '#f43f5e' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setActivePreset('Custom')
                      setSceneConfig((prev) => ({ ...prev, color: color.hex }))
                    }}
                    className={`w-9 h-9 rounded-full transition-transform border-2 flex items-center justify-center ${
                      sceneConfig.color === color.hex ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {sceneConfig.color === color.hex && <Check className="w-4 h-4 text-slate-950 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-indigo-400" /> Rotation Speed
                </label>
                <span className="text-xs font-mono text-indigo-300">{sceneConfig.speed?.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={sceneConfig.speed || 1}
                onChange={(e) => {
                  setActivePreset('Custom')
                  setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                }}
                className="w-full accent-indigo-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Feather className="w-4 h-4 text-indigo-400" /> Distortion Noise
                </label>
                <span className="text-xs font-mono text-indigo-300">{((sceneConfig.distort || 0) * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={sceneConfig.distort || 0}
                onChange={(e) => {
                  setActivePreset('Custom')
                  setSceneConfig((prev) => ({ ...prev, distort: parseFloat(e.target.value) }))
                }}
                className="w-full accent-indigo-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sceneConfig.wireframe || false}
                  onChange={(e) => {
                    setActivePreset('Custom')
                    setSceneConfig((prev) => ({ ...prev, wireframe: e.target.checked }))
                  }}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300">Wireframe Mesh</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sceneConfig.materialStyle === 'physical'}
                  onChange={(e) => {
                    setActivePreset('Custom')
                    setSceneConfig((prev) => ({
                      ...prev,
                      materialStyle: e.target.checked ? 'physical' : 'distort'
                    }))
                  }}
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300">Metallic Clearcoat Material</span>
              </label>
            </div>

            <button
              onClick={() => handleApplyPreset('Cyberpunk', PRESETS[0].config)}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline underline-offset-4"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">High Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Explore the core architectural pillars powering seamless WebGL renders in modern web browsers.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'shaders', label: 'Shader Architecture', icon: Layers },
              { id: 'lighting', label: 'Lighting & FX', icon: Sparkles },
              { id: 'performance', label: 'Performance', icon: Cpu },
              { id: 'api', label: 'Developer API', icon: Terminal }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'glass text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Dynamic Mesh Distortion',
              category: 'shaders',
              desc: 'Procedural vertex noise displacement running directly inside GPU fragment shaders for zero CPU overhead.',
              icon: Box,
              tag: 'GLSL Shader'
            },
            {
              title: 'Hardware Ray Marching',
              category: 'shaders',
              desc: 'High-speed volumetric lighting and depth computations rendered smoothly across low and high-spec GPUs.',
              icon: Layers,
              tag: 'GPU Accelerated'
            },
            {
              title: 'Physical Clearcoat Materials',
              category: 'lighting',
              desc: 'Realistic metallic reflection, roughness attenuation, and multi-layered specular highlights.',
              icon: Palette,
              tag: 'PBR Pipeline'
            },
            {
              title: 'Instanced Particle Field',
              category: 'performance',
              desc: 'Render hundreds of animated 3D particle nodes simultaneously with single-pass draw call batching.',
              icon: Sparkles,
              tag: 'Instanced Geometry'
            },
            {
              title: 'Zero Hydration Mismatch',
              category: 'performance',
              desc: 'Designed for Next.js App Router with dynamic client-side WebGL canvas initialization and SSR fallback.',
              icon: ShieldCheck,
              tag: 'Next.js 16 Ready'
            },
            {
              title: 'Reactive State Binding',
              category: 'api',
              desc: 'Declarative prop bindings linking standard React state directly to Three.js scene graphs.',
              icon: Code2,
              tag: 'React 19 Hooks'
            }
          ]
            .filter((item) => item.category === activeTab)
            .map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 rounded-3xl flex flex-col justify-between group hover:border-indigo-500/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-slate-900 border border-slate-800 text-indigo-300">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 gap-1">
                  <span>Explore Technical Docs</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Benchmarks & Performance Metrics */}
      <section id="metrics" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                <Gauge className="w-4 h-4" /> Real-time Performance Benchmark
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Uncompromising FPS & Minimal GPU Footprint
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                Aura3D utilizes custom shader optimization algorithms to keep GPU memory usage under 45MB while maintaining 60 frames per second on mobile and desktop devices.
              </p>

              <div className="space-y-6">
                {[
                  { name: 'Frame Time Stability', percent: 98, detail: '16.6ms Target' },
                  { name: 'GPU Memory Footprint', percent: 24, detail: '< 45 MB Allocated' },
                  { name: 'Draw Call Batching', percent: 94, detail: '1 Single Draw Call' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                      <span>{item.name}</span>
                      <span className="font-mono text-indigo-400">{item.detail}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Display Box */}
            <div className="glass p-8 rounded-2xl border border-indigo-500/20 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Engine Diagnostic</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Stream
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block mb-1">FPS Meter</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">60.0</span>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block mb-1">Draw Calls</span>
                  <span className="text-3xl font-extrabold text-indigo-400 font-mono">2</span>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block mb-1">Triangle Count</span>
                  <span className="text-3xl font-extrabold text-purple-400 font-mono">131,072</span>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 block mb-1">WebGL Context</span>
                  <span className="text-3xl font-extrabold text-pink-400 font-mono">v2.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center italic">
                Monitored in real-time via WebGL extension queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase & Testimonials Section */}
      <section id="showcase" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Built for <span className="text-gradient-secondary">Visionary Creators</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            See what developers and designers are building with Aura3D WebGL engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Aura3D completely changed our landing page conversion rate. The interactive 3D background gives our SaaS product a hyper-modern feel.",
              author: "Alex Morgan",
              role: "Lead Frontend Architect",
              company: "NovaTech Labs"
            },
            {
              quote: "The seamless integration between React 19 and Three.js components makes building WebGL interfaces effortless and fun.",
              author: "Sophia Chen",
              role: "Creative Technologist",
              company: "Studio Lumina"
            },
            {
              quote: "Zero frame drops and incredible customization controls. Our client was blown away by the live WebGL customizer demo.",
              author: "Marcus Vance",
              role: "UI/UX Director",
              company: "Aetherial Media"
            }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl flex flex-col justify-between">
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                &quot;{item.quote}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.author}</h4>
                  <p className="text-xs text-slate-400">{item.role} • <span className="text-indigo-400">{item.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section id="pricing" className="relative z-10 py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 md:p-16 rounded-3xl text-center relative overflow-hidden border border-indigo-500/30">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 relative z-10">
            Ready to Upgrade Your <span className="text-gradient-primary">Digital Canvas?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mb-8 relative z-10">
            Join thousands of developers crafting immersive, 3D-driven web interfaces today.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your developer email"
              required
              className="flex-1 px-5 py-3.5 bg-slate-900/90 border border-slate-700 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 text-sm whitespace-nowrap flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{"\u2713 Subscribed"}</span>
                </>
              ) : (
                <span>Get Early Access</span>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-4 relative z-10">
            Free trial included. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300 text-sm">Aura3D WebGL Engine</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#metrics" className="hover:text-slate-300 transition-colors">Benchmarks</a>
            <a href="#showcase" className="hover:text-slate-300 transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Code2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
          <p>© 2026 Aura3D WebGL Studio. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
