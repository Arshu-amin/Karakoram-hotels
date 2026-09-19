'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ArrowRight,
  Sliders,
  RotateCw,
  Palette,
  Maximize2,
  Check,
  Globe,
  Share2,
  Code2,
  Box,
  Shield,
  Menu,
  X
} from 'lucide-react'
import type { GeometryType, SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading 3D Canvas...</span>
      </div>
    </div>
  )
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 3D Customizer State
  const [selectedGeometry, setSelectedGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [scale, setScale] = useState(1.1)
  const [wireframe, setWireframe] = useState(false)
  const [metalness, setMetalness] = useState(0.8)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  const geometries: { id: GeometryType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'cube', label: 'Cube' },
    { id: 'torus', label: 'Torus' },
  ]

  const colorPresets = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          geometry={selectedGeometry}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          metalness={metalness}
        />
      </div>

      {/* Background Ambient Glow Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[128px]" />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors font-mono">Showcase</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Customize 3D
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 max-w-7xl mx-auto glass rounded-2xl p-6 border border-white/10 flex flex-col gap-4 text-center"
          >
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-2"
            >
              Overview
            </a>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-2"
            >
              3D Studio
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-2"
            >
              Features
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white py-2"
            >
              Showcase
            </a>
            <a
              href="#studio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25"
            >
              Customize 3D
            </a>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center pt-24 px-4">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs sm:text-sm text-indigo-300 mb-8 shadow-inner"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen WebGL Engine Integrated</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
          >
            Elevate Your Digital <br />
            <span className="text-gradient-primary">Visual Experience</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-normal leading-relaxed"
          >
            Immersive 3D animation, real-time WebGL rendering, and responsive design crafted for modern web applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#studio"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3"
            >
              <span>Explore 3D Studio</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-base transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>View Architecture</span>
            </a>
          </motion.div>

          {/* Live Stat Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 w-full max-w-3xl glass-panel rounded-2xl p-6 border border-white/10"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">60 FPS</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Ultra Smooth</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">React 19</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Latest Core</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">WebGL 2</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">GPU Accelerated</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">0ms</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Interactive Sync</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Interactive Control Studio */}
      <section id="studio" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 font-mono text-sm uppercase tracking-wider mb-2">
                <Sliders className="w-4 h-4" />
                <span>Real-Time WebGL Control Studio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Customize the 3D Canvas</h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm">
              Adjust parameters live in real-time. Notice how geometry, lighting, speed, and materials update instantly in the background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shape Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Geometry Shape</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {geometries.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGeometry(g.id)}
                    className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                      selectedGeometry === g.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{g.label}</span>
                    {selectedGeometry === g.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Colors */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Color Preset & Material</span>
              </label>
              <div className="flex items-center gap-3">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-9 h-9 rounded-full transition-all transform hover:scale-110 flex items-center justify-center border-2 ${
                      color === c ? 'border-white scale-110 ring-4 ring-indigo-500/30' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  >
                    {color === c && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Metalness Reflectivity</span>
                  <span className="font-mono">{Math.round(metalness * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    wireframe
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Wireframe Mode: {wireframe ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-pink-400" />
                <span>Dynamics & Scale</span>
              </label>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Rotation Speed</span>
                  <span className="font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Object Scale</span>
                  <span className="font-mono">{scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="2.0"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 font-mono text-sm uppercase tracking-wider">Features & Capabilities</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">Built for Next-Level Web</h2>
          <p className="text-slate-400 mt-4 text-lg">
            Engineered with modern full-stack visual architecture to deliver immersive user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              color: 'text-amber-400',
              bgColor: 'bg-amber-500/10 border-amber-500/20',
              title: 'High-Performance WebGL',
              desc: 'Leverages hardware-accelerated shaders and dynamic particle buffers maintaining locked 60 FPS performance.'
            },
            {
              icon: Layers,
              color: 'text-indigo-400',
              bgColor: 'bg-indigo-500/10 border-indigo-500/20',
              title: 'Glassmorphism Design',
              desc: 'Sleek frosted glass panels with layered blur filters, subtle lighting borders, and high contrast typography.'
            },
            {
              icon: Cpu,
              color: 'text-purple-400',
              bgColor: 'bg-purple-500/10 border-purple-500/20',
              title: 'React 19 & Next.js 16',
              desc: 'Built on the newest React and Next.js Turbopack engine for ultra-fast server rendering and dynamic hydration.'
            },
            {
              icon: Shield,
              color: 'text-emerald-400',
              bgColor: 'bg-emerald-500/10 border-emerald-500/20',
              title: 'Responsive & Accessible',
              desc: 'Fully tailored for touch displays, desktop mouse interactions, and screen-reader accessibility.'
            },
            {
              icon: Code2,
              color: 'text-cyan-400',
              bgColor: 'bg-cyan-500/10 border-cyan-500/20',
              title: 'Modular Architecture',
              desc: 'Separation of concerns between 3D Canvas, UI layout overlays, state management, and CSS custom design system.'
            },
            {
              icon: Maximize2,
              color: 'text-pink-400',
              bgColor: 'bg-pink-500/10 border-pink-500/20',
              title: 'Interactive 3D Controls',
              desc: 'Bidirectional sync between DOM UI input controls and WebGL material and geometry properties.'
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all group hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-purple-400 font-mono text-sm uppercase tracking-wider">Showcase & Live Specs</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-6">
                Real-Time 3D Engine Architecture
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                Experience fluid transitions, real-time lighting physics, and responsive viewport fitting powered by Three.js and Framer Motion.
              </p>

              <div className="space-y-4">
                {[
                  'Physically-Based Rendering (PBR) Materials with metallic clearcoat reflections',
                  'Dynamic OrbitControls with custom damping and auto-rotation',
                  'Framer Motion spring physics for custom pointer cursors',
                  'Tailwind CSS v4 inline themes with glassmorphism overlays'
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                      {"\u2713"}
                    </div>
                    <span className="text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10 space-y-4 font-mono text-xs sm:text-sm text-slate-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <span>{"// Live Canvas State"}</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Geometry:</span>
                  <span className="text-indigo-300 font-bold">{selectedGeometry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hex Color:</span>
                  <span className="text-purple-300 font-bold">{color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Speed Multiplier:</span>
                  <span className="text-pink-300 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Render Mode:</span>
                  <span className="text-cyan-300 font-bold">{wireframe ? 'Wireframe' : 'Solid Mesh'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Particles Active:</span>
                  <span className="text-amber-300 font-bold">120 Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 py-20 px-4 max-w-4xl mx-auto text-center">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay Ahead with Aura 3D</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Subscribe to our updates for the latest in WebGL tech, 3D graphics tutorials, and UI component releases.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-medium inline-flex items-center gap-2"
            >
              {"\u2713"} Subscribed! Thank you for joining.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-sm px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              A3D
            </div>
            <span className="font-semibold text-slate-300">Aura 3D Interactive Platform</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#studio" className="hover:text-white transition-colors">Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors" title="Global">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-slate-600">
          © {new Date().getFullYear()} Aura 3D. Crafted with Next.js & WebGL.
        </div>
      </footer>
    </main>
  )
}
