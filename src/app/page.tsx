'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Zap,
  Layers,
  Cpu,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Palette,
  RotateCw,
  Code2
} from 'lucide-react'

// Dynamic import for WebGL scene to avoid SSR hydration mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-widest uppercase">
          Initializing 3D WebGL Canvas...
        </span>
      </div>
    </div>
  )
})

type ShapeType = 'torusKnot' | 'icosahedron' | 'octahedron' | 'sphere' | 'torus' | 'box'

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'torus', label: 'Torus' },
  { id: 'box', label: 'Cube' }
]

const COLORS = [
  { hex: '#6366f1', label: 'Indigo Glow' },
  { hex: '#ec4899', label: 'Neon Pink' },
  { hex: '#06b6d4', label: 'Cyan Pulse' },
  { hex: '#10b981', label: 'Emerald Beam' },
  { hex: '#f59e0b', label: 'Amber Flare' }
]

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.8)
  const [distort, setDistort] = useState(0.35)
  const [wireframe, setWireframe] = useState(false)

  // UI Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D WebGL Canvas Background */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-[1] bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Glassmorphism Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
                AURA <span className="text-indigo-400 font-mono text-sm uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">3D</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>3D Playground</span>
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Tech Stack</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Customize 3D</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-slate-200"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium"
              >
                Overview
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>3D Playground</span>
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#tech"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium"
              >
                Tech Stack
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-indigo-400 transition-colors font-medium"
              >
                FAQ
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3 rounded-full font-semibold bg-indigo-600 text-white"
              >
                Launch Playground
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 scroll-mt-20 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Introducing AURA 3D Engine v2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-slate-400">Next.js 16 & React 19 Powered</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]">
            Spatial Web <br />
            <span className="text-gradient-primary">Interactive 3D</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mb-10 font-normal leading-relaxed">
            Craft immersive, hardware-accelerated 3D user experiences on the web with real-time reactive WebGL controls and responsive design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:opacity-95 shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Explore 3D Playground</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold glass hover:bg-slate-800/80 border border-slate-700 text-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>View Features</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-slate-800/80 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">120 FPS</span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">Hardware Accelerated</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-gradient-cyan font-mono">&lt; 10ms</span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">Interactive Latency</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">100%</span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">Reactive WebGL</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#customizer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1, duration: 0.5 }, y: { repeat: Infinity, duration: 2 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass border border-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll to 3D Customizer"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </section>

      {/* 3D PLAYGROUND / CUSTOMIZER SECTION */}
      <section id="customizer" className="relative z-10 scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive WebGL Customizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Direct DOM-to-WebGL Control
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Interact with the background 3D canvas in real-time. Select shapes, adjust shader parameters, distortion, and material colors.
          </p>
        </div>

        {/* Customizer Control Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-indigo-500/20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow background inside card */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Shape Selector & Colors */}
            <div className="space-y-6">
              {/* Geometry Shape Selection */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center gap-2">
                  <Box className="w-4 h-4 text-indigo-400" />
                  <span>Select 3D Geometry</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SHAPES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        shape === item.id
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/30'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Color Palette */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  <span>Material Color Swatches</span>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {COLORS.map((item) => (
                    <button
                      key={item.hex}
                      onClick={() => setColor(item.hex)}
                      className={`w-10 h-10 rounded-full transition-transform border-2 ${
                        color === item.hex ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: item.hex }}
                      title={item.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sliders & Toggles */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* Speed Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-cyan-400" />
                    <span>Rotation Speed</span>
                  </label>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Distortion Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span>Mesh Distortion</span>
                  </label>
                  <span className="text-xs font-mono text-purple-400 font-semibold">{(distort * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Wireframe Mode</span>
                </span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
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
        </motion.div>
      </section>

      {/* FEATURES BENTO GRID SECTION */}
      <section id="features" className="relative z-10 scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Features</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Engineered for High Frame Rates
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Discover how AURA 3D combines modern WebGL shaders with React 19 component trees for smooth 3D visuals.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Large Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 glass-card rounded-3xl p-8 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-Time WebGL Shader Pipeline</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Hardware-accelerated rendering powered by Three.js and React Three Fiber. Dynamic lights, floating starfields, and real-time physical materials render smoothly at 60–120 FPS across modern desktop and mobile browsers.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-indigo-300 pt-4 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> WebGL 2.0
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Physical Shaders
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Lag
              </span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">React 19 & Next.js 16</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Turbopack build optimization, dynamic client-side WebGL canvas hydration, and modern Next.js App Router layout structuring.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-purple-300">
              <span>Next-Gen React Fiber Tree</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DOM-to-Canvas Sync</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bi-directional state sync between DOM control inputs and WebGL mesh geometries without frame hitching or re-render stalls.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-cyan-300">
              <span>Instant Parameter Mutators</span>
            </div>
          </motion.div>

          {/* Card 4 - Large Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 glass-card rounded-3xl p-8 border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Glassmorphic Layering & Motion</h3>
              <p className="text-slate-400 leading-relaxed">
                Multi-layered UI architecture featuring frosted glass elements, Framer Motion scroll animations, and interactive spring-physics mouse cursor tracking.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-pink-300 pt-4 border-t border-slate-800/80">
              <span>Framer Motion v12</span>
              <span>•</span>
              <span>Tailwind v4 Inline Themes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech" className="relative z-10 scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Modern Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Built with Industry Standards
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Powered by top-tier open-source technologies for maximal developer efficiency and frontend output quality.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Next.js 16', role: 'App Router & Turbopack', color: 'border-slate-700' },
            { name: 'React 19', role: 'Concurrent Rendering', color: 'border-cyan-500/40' },
            { name: 'Three.js', role: '3D WebGL Engine', color: 'border-indigo-500/40' },
            { name: 'R3F / Drei', role: 'Declarative 3D Canvas', color: 'border-purple-500/40' },
            { name: 'Tailwind CSS v4', role: 'Utility Styling', color: 'border-sky-500/40' },
            { name: 'Framer Motion', role: 'Gestures & Animations', color: 'border-pink-500/40' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`p-5 rounded-2xl glass-card border ${item.color} text-center flex flex-col items-center justify-center hover:scale-105 transition-transform`}
            >
              <span className="font-bold text-white text-base mb-1">{item.name}</span>
              <span className="text-xs text-slate-400 font-mono">{item.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Plans for Every Scale
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Choose the ideal license for indie developers, creative studios, or enterprise teams.
          </p>

          {/* Monthly / Annual Toggle Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Developer Starter</h3>
              <p className="text-slate-400 text-sm mb-6">Perfect for personal web projects and prototype building.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">
                  ${billingCycle === 'annual' ? '19' : '24'}
                </span>
                <span className="text-slate-400 text-sm">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                {['Up to 3 Active 3D Scenes', 'Standard WebGL Shaders', 'Community Forum Support', 'Standard Export Formats'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-full font-semibold glass border border-slate-700 hover:bg-slate-800 text-white transition-all">
              Get Started
            </button>
          </motion.div>

          {/* Pro Plan - Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border-2 border-indigo-500/80 shadow-xl shadow-indigo-500/10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-500 text-white text-[10px] font-mono uppercase font-bold px-4 py-1 rounded-bl-xl">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Pro Studio</h3>
              <p className="text-slate-400 text-sm mb-6">Designed for professional creators and digital agencies.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gradient-primary font-mono">
                  ${billingCycle === 'annual' ? '49' : '59'}
                </span>
                <span className="text-slate-400 text-sm">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                {[
                  'Unlimited 3D Scenes & Geometry',
                  'Custom Physical Shaders & Lighting',
                  'DOM-to-WebGL Control Pipeline',
                  'Priority Tech Support',
                  'Commercial Usage License'
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-full font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-102">
              Start Free Trial
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-slate-400 text-sm mb-6">Custom WebGL engine integration and dedicated SLA support.</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">Custom</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                {[
                  'Custom GLSL Shader Authoring',
                  'Dedicated WebGL Engineer',
                  '99.99% Uptime SLA',
                  'Custom On-Premises Hosting'
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-full font-semibold glass border border-slate-700 hover:bg-slate-800 text-white transition-all">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="relative z-10 scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does AURA 3D achieve 120 FPS WebGL rendering?',
              a: 'AURA 3D uses React Three Fiber with lightweight physical shaders, instanced particle buffers, and off-main-thread event handlers to avoid frame stalls during complex DOM rendering.'
            },
            {
              q: 'Can I integrate custom 3D models (GLTF / GLB)?',
              a: 'Yes! AURA 3D natively supports GLTF and GLB 3D model loaders through @react-three/drei with automatic texture compressed mipmapping.'
            },
            {
              q: 'Does it work seamlessly on mobile browsers?',
              a: 'Absolutely. The WebGL viewport automatically adjusts canvas resolution and pixel ratios based on screen density and mobile GPU capability.'
            },
            {
              q: 'Is it compatible with Next.js 16 App Router?',
              a: 'Yes, AURA 3D is fully engineered for Next.js 16 and React 19, utilizing dynamic dynamic SSR imports to eliminate hydration errors.'
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left font-semibold text-lg flex items-center justify-between gap-4 text-white hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA SECTION */}
      <section id="newsletter" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-indigo-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">
            Stay Updated on 3D Spatial Innovations
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-8 relative z-10">
            Join 10,000+ spatial web developers. Receive monthly WebGL shaders, tutorials, and performance optimizations.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full glass-input text-white text-sm placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full font-bold bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition-all shadow-lg shadow-indigo-500/30 whitespace-nowrap"
            >
              {subscribed ? <span>{"\u2713 Subscribed!"}</span> : <span>Subscribe Now</span>}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="font-bold text-white tracking-wide">AURA 3D</span>
            <span className="text-xs text-slate-500">© 2026 Next.js Spatial Platform</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-white transition-colors">Documentation</a>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
