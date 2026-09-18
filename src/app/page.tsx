'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Cpu,
  Layers,
  Zap,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  Menu,
  X,
  Sliders,
  Palette,
  Maximize2,
  Minimize2,
  ArrowRight,
  Activity,
  Globe,
  Share2,
  Code2
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-mono tracking-wider">INITIALIZING WEBGL 3D ENGINE...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Config State
  const [sceneConfig, setSceneConfig] = useState<SceneProps>({
    shape: 'torus',
    color: '#6366f1',
    speed: 1.5,
    scale: 1,
    metalness: 0.7,
    distort: 0.3,
    roughness: 0.2,
    wireframe: false,
  })

  // UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isFullscreenBg, setIsFullscreenBg] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [activeTab, setActiveTab] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Preset Theme Handler
  const applyPreset = (preset: 'neon' | 'emerald' | 'gold' | 'obsidian') => {
    switch (preset) {
      case 'neon':
        setSceneConfig(prev => ({ ...prev, color: '#ec4899', distort: 0.45, speed: 2, shape: 'cyber' }))
        break
      case 'emerald':
        setSceneConfig(prev => ({ ...prev, color: '#10b981', distort: 0.2, speed: 1.2, shape: 'ring' }))
        break
      case 'gold':
        setSceneConfig(prev => ({ ...prev, color: '#f59e0b', distort: 0.1, metalness: 0.95, roughness: 0.1, shape: 'octahedron' }))
        break
      case 'obsidian':
        setSceneConfig(prev => ({ ...prev, color: '#64748b', distort: 0.6, metalness: 0.8, shape: 'torus' }))
        break
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene Canvas */}
      <div
        className={`fixed inset-0 transition-opacity duration-700 ${
          isFullscreenBg ? 'z-40 opacity-100 pointer-events-auto' : 'z-0 opacity-40 pointer-events-none'
        }`}
      >
        <Scene {...sceneConfig} />
      </div>

      {/* Floating Canvas Controls overlay when fullscreen */}
      {isFullscreenBg && (
        <button
          onClick={() => setIsFullscreenBg(false)}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-slate-800 transition-all shadow-xl backdrop-blur-md"
          title="Exit Fullscreen 3D View"
        >
          <Minimize2 className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                AURA <span className="text-indigo-400 font-mono text-sm">3D</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              3D Sandbox
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsFullscreenBg(!isFullscreenBg)}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-2 text-xs font-mono"
            >
              {isFullscreenBg ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>3D Immersion</span>
            </button>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Launch Sandbox
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-4"
            >
              <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-indigo-400 py-2">Overview</a>
              <a href="#customizer" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-indigo-400 py-2">3D Sandbox</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-indigo-400 py-2">Features</a>
              <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-indigo-400 py-2">Showcase</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-indigo-400 py-2">Pricing</a>
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Launch Sandbox
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>AURA 3D Engine v2.5 • Next.js 16 WebGL</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.08] mb-8"
          >
            Architecting Next-Gen{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3D Web Visuals
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 font-normal leading-relaxed"
          >
            Seamlessly combine real-time WebGL rendering, custom material shaders, and interactive 3D scene controls directly inside modern web applications.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Explore 3D Customizer</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setIsFullscreenBg(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-base backdrop-blur-md transition-all hover:border-slate-500 flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-5 h-5 text-indigo-400" />
              <span>Full Screen Canvas</span>
            </button>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {[
              { label: 'Target Frame Rate', value: '60 FPS', detail: 'Silky smooth WebGL rendering' },
              { label: 'Render Latency', value: '<2ms', detail: 'Hardware accelerated pipeline' },
              { label: 'Shader Uniforms', value: '128+', detail: 'Dynamic realtime materials' },
              { label: 'WebGL Compatibility', value: '100%', detail: 'Cross-platform support' },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-2xl text-left border border-slate-800/80 hover:border-indigo-500/30 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400">{stat.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Customizer Sandbox Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>REAL-TIME WEBGL PARAMETRIC CONTROL</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Interactive 3D Sandbox
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-3">
            Modify shape geometry, material metallicness, distortion forces, and color spectrums in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Preview Canvas Container */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-2 border border-slate-800 relative overflow-hidden group shadow-2xl h-[480px] lg:h-[560px] flex flex-col">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700">
                LIVE CANVAS PREVIEW
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setSceneConfig(prev => ({ ...prev, wireframe: !prev.wireframe }))}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                  sceneConfig.wireframe
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Wireframe: {sceneConfig.wireframe ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <Scene {...sceneConfig} />
            </div>

            {/* Bottom Status Ribbon */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>SHAPE: <strong className="text-indigo-400 uppercase">{sceneConfig.shape}</strong></span>
                <span>SPEED: <strong className="text-purple-400">{sceneConfig.speed}x</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: sceneConfig.color }} />
                <span>{sceneConfig.color}</span>
              </div>
            </div>
          </div>

          {/* Customizer Control Panel */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold">Geometry & Shaders</h3>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
                GPU Active
              </span>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Quick Theme Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'neon', label: 'Neon Cyber', color: 'from-pink-500 to-purple-600' },
                  { id: 'emerald', label: 'Emerald', color: 'from-emerald-500 to-teal-600' },
                  { id: 'gold', label: 'Gold Alloy', color: 'from-amber-400 to-orange-500' },
                  { id: 'obsidian', label: 'Obsidian', color: 'from-slate-600 to-slate-800' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id as 'neon' | 'emerald' | 'gold' | 'obsidian')}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-xs font-medium text-slate-300 flex items-center gap-2 group"
                  >
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${p.color}`} />
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                3D Primitive Mesh
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { id: 'torus', label: 'Knot' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'octahedron', label: 'Octa' },
                  { id: 'ring', label: 'Ring' },
                  { id: 'cyber', label: 'Cyber' },
                ].map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSceneConfig(prev => ({ ...prev, shape: shape.id as SceneProps['shape'] }))}
                    className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all text-center ${
                      sceneConfig.shape === shape.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Material Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={sceneConfig.color}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, color: e.target.value }))}
                  className="w-10 h-10 rounded-xl border border-slate-700 bg-transparent cursor-pointer p-0.5"
                />
                <div className="flex items-center gap-2 flex-1">
                  {['#6366f1', '#ec4899', '#38bdf8', '#10b981', '#f59e0b', '#a855f7'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSceneConfig(prev => ({ ...prev, color: c }))}
                      className={`w-7 h-7 rounded-lg border transition-transform ${
                        sceneConfig.color === c ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Distortion Wave</span>
                  <span className="font-mono text-indigo-400">{sceneConfig.distort}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={sceneConfig.distort}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, distort: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Rotation Speed</span>
                  <span className="font-mono text-purple-400">{sceneConfig.speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={sceneConfig.speed}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Scale Factor</span>
                  <span className="font-mono text-pink-400">{sceneConfig.scale}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.05"
                  value={sceneConfig.scale}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                  className="w-full accent-pink-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Metallic Reflectivity</span>
                  <span className="font-mono text-cyan-400">{sceneConfig.metalness}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sceneConfig.metalness}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, metalness: parseFloat(e.target.value) }))}
                  className="w-full accent-cyan-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Built for High Performance
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-3">
            Engineered with modern WebGL pipelines, automated bundle splitting, and adaptive frame management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Acceleration',
              desc: 'Direct GPU shader execution delivering native 60fps performance across desktop and mobile browsers.',
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10',
            },
            {
              icon: Layers,
              title: 'Modular Material Shaders',
              desc: 'Custom physical materials with metallic reflection, roughness, clearcoat, and real-time vertex displacement.',
              color: 'text-purple-400',
              bg: 'bg-purple-500/10',
            },
            {
              icon: Sparkles,
              title: 'Particle Synthesis',
              desc: 'High-density spatial particle systems rendered with minimal memory footprint and zero main-thread lag.',
              color: 'text-pink-400',
              bg: 'bg-pink-500/10',
            },
            {
              icon: ShieldCheck,
              title: 'SSR Safe Hydration',
              desc: 'Dynamic asynchronous component loading guarantees clean server-side rendering without WebGL mismatches.',
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
            {
              icon: Activity,
              title: 'Adaptive Frame Scaling',
              desc: 'Automatic device capability detection dynamically adjusts vertex counts to maintain smooth interactions.',
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10',
            },
            {
              icon: Code2,
              title: 'React 19 & Turbopack',
              desc: 'Seamless compatibility with Next.js 16 App Router, React 19 Concurrent rendering, and Turbopack builds.',
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Globe className="w-3.5 h-3.5" />
                <span>USE CASES & DEPLOYMENTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Empowering Next-Gen Applications
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Discover how 3D WebGL visuals transform static web interfaces into immersive product configurators, brand showcases, and spatial landing pages.
              </p>

              {/* Showcase Tabs */}
              <div className="space-y-3 pt-2">
                {[
                  { title: 'Interactive Product Configurator', desc: 'Real-time 3D customization with instant visual feedback.' },
                  { title: 'Generative Audio Visualizer', desc: 'Audio-reactive vertex displacements and glowing particle fields.' },
                  { title: 'Spatial E-Commerce Showcase', desc: 'Inspect materials, lighting angles, and product details in 360 degrees.' },
                ].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      activeTab === idx
                        ? 'bg-indigo-600/15 border-indigo-500/80 text-white'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      <span>{tab.title}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === idx ? 'rotate-90 text-indigo-400' : ''}`} />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{tab.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Tab Visualizer Box */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">ACTIVE SCENARIO ENGINE</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  Ready
                </span>
              </div>

              <div className="p-8 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  {activeTab === 0 && <Sliders className="w-8 h-8" />}
                  {activeTab === 1 && <Activity className="w-8 h-8 text-pink-400" />}
                  {activeTab === 2 && <Box className="w-8 h-8 text-cyan-400" />}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {activeTab === 0 && '3D Product Customization Pipeline'}
                  {activeTab === 1 && 'Real-Time Audio & Spatial Synthesis'}
                  {activeTab === 2 && '360° E-Commerce WebGL Viewport'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                  {activeTab === 0 && 'Users can tweak physical materials, colors, metallic reflections, and lighting directly on their device before purchasing.'}
                  {activeTab === 1 && 'Dynamic vertex shaders respond directly to audio frequencies and cursor motion with smooth spring-damped physics.'}
                  {activeTab === 2 && 'High-fidelity WebGL models provide tactile engagement with zero external browser plugin requirements.'}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const shapes: SceneProps['shape'][] = ['torus', 'cyber', 'octahedron']
                      setSceneConfig(prev => ({ ...prev, shape: shapes[activeTab] }))
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <span>Load Preset Scene</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
            <Share2 className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING TIERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Flexible Developer Plans
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-3">
            Choose the ideal license tier for your project requirements.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: billingCycle === 'yearly' ? '$29' : '$35',
              desc: 'Ideal for independent creators and portfolio sites.',
              features: [
                'Up to 3 Active 3D Scenes',
                'Standard WebGL Shaders',
                'Custom Material Controls',
                'Community Support',
              ],
              cta: 'Get Started',
              popular: false,
            },
            {
              name: 'Professional',
              price: billingCycle === 'yearly' ? '$79' : '$99',
              desc: 'For growing teams building production 3D web products.',
              features: [
                'Unlimited 3D WebGL Scenes',
                'Custom Shader Node Pipeline',
                'High-Density Particle Systems',
                'SSR Hydration Utilities',
                'Priority Tech Support',
              ],
              cta: 'Start Pro Trial',
              popular: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              desc: 'Custom WebGL engine architecture & dedicated SLA.',
              features: [
                'Custom Shader Kernel Development',
                'Dedicated Graphics Engineers',
                'Full Source Code Access',
                'Custom WebGL Performance SLA',
                '24/7 Priority Support',
              ],
              cta: 'Contact Sales',
              popular: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl border relative flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/10 scale-105 bg-slate-900/90'
                  : 'border-slate-800/80'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                  MOST POPULAR
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                <p className="text-slate-400 text-xs mt-2 min-h-[36px]">{plan.desc}</p>

                <div className="my-6">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-xs text-slate-400 font-mono ml-2">/ month</span>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  {plan.features.map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-800/60">
                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Stay Updated with 3D Web Engine Releases
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Subscribe for monthly shader tutorials, performance benchmarks, and feature updates.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-sm inline-block">
              {"\u2713 Subscribed! Check your inbox for early access."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your developer email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl glass-input text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all whitespace-nowrap shadow-lg shadow-indigo-500/25"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>© 2026 AURA 3D Platform. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] text-slate-400">All Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
