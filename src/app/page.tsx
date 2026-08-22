'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Box,
  Cpu,
  Zap,
  Layers,
  ShieldCheck,
  Palette,
  Sliders,
  Check,
  ArrowRight,
  Globe,
  Code2,
  Terminal,
  Activity
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-500">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs tracking-widest uppercase">Initializing 3D Engine...</span>
    </div>
  )
})

export default function Home() {
  // Customizer state for 3D model
  const [modelColor, setModelColor] = useState('#6366f1')
  const [modelShape, setModelShape] = useState<SceneProps['shape']>('torusKnot')
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [roughness, setRoughness] = useState(0.2)
  const [metalness, setMetalness] = useState(0.8)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Active tab state for specs
  const [activeTab, setActiveTab] = useState<'rendering' | 'physics' | 'shaders'>('rendering')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Cyan', hex: '#38bdf8' },
    { label: 'Rose', hex: '#f472b6' },
    { label: 'Emerald', hex: '#34d399' },
    { label: 'Amber', hex: '#fbbf24' }
  ]

  const shapesList: { label: string; value: SceneProps['shape'] }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Octahedron', value: 'octahedron' },
    { label: 'Torus', value: 'torus' }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic 3D Scene Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Scene
          color="#312e81"
          shape="torusKnot"
          speed={0.4}
          roughness={0.4}
          metalness={0.6}
          wireframe={true}
        />
      </div>

      {/* Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Aura3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">Community</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Next-Generation Interactive 3D Web Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.08] mb-8 max-w-5xl"
        >
          Immersive Real-Time <br />
          <span className="text-gradient-primary">3D Visual Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="text-slate-400 text-lg sm:text-2xl max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Elevate your web applications with smooth WebGL rendering, custom material customization, and scroll-linked fluid interface components.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-base transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
          >
            <Sliders className="w-5 h-5" />
            Customize 3D Model
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-card text-slate-200 font-semibold text-base transition-all hover:bg-slate-800/60 hover:scale-105 active:scale-95"
          >
            Explore Features
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* Live 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sliders className="w-4 h-4" />
                Live Configurator
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Control the 3D Canvas in Real Time
              </h2>
              <p className="text-slate-400 mt-3 text-base leading-relaxed">
                Interact directly with the WebGL rendering engine. Modify geometry shapes, color palettes, rotation dynamics, and metallic material properties instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass border border-slate-800 flex flex-col gap-6 shadow-2xl">
              {/* Shape Selector */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 block">
                  Geometry Shape
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapesList.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setModelShape(item.value)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        modelShape === item.value
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 block">
                  Material Color
                </label>
                <div className="flex items-center gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() => setModelColor(preset.hex)}
                      className={`w-9 h-9 rounded-full transition-transform flex items-center justify-center ${
                        modelColor === preset.hex ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: preset.hex }}
                      title={preset.label}
                    >
                      {modelColor === preset.hex && <Check className="w-4 h-4 text-slate-950 font-bold" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rotation Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Roughness & Metalness Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase text-slate-400 mb-2">
                    <span>Roughness</span>
                    <span className="text-indigo-400">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase text-slate-400 mb-2">
                    <span>Metalness</span>
                    <span className="text-indigo-400">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold uppercase text-slate-400">Wireframe View</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
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
          </motion.div>

          {/* Interactive Studio Preview Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 h-[500px] rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800 relative flex items-center justify-center shadow-2xl group"
          >
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-indigo-300 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>WebGL Studio :: Live Preview</span>
            </div>
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-md">
              Drag mouse to rotate model
            </div>

            <div className="w-full h-full">
              <Scene
                color={modelColor}
                shape={modelShape}
                speed={rotationSpeed}
                roughness={roughness}
                metalness={metalness}
                wireframe={wireframe}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" />
            Cutting-Edge Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Engineered for Modern Web Visuals
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            Combines peak WebGL 3D rendering with responsive React components and fluid Framer Motion animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Acceleration',
              desc: 'High-throughput GPU shaders deliver smooth 60+ FPS motion even with intricate physical geometry.'
            },
            {
              icon: Palette,
              title: 'Physical Materials',
              desc: 'PBR shading with customizable clearcoat roughness, metalness reflection, and light falloff.'
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Frosted glass backdrops with multi-layered depth, blurred borders, and subtle glow highlights.'
            },
            {
              icon: ShieldCheck,
              title: 'TypeScript Native',
              desc: 'Strict type safety across 3D state, component props, and Framer Motion animation configurations.'
            },
            {
              icon: Sparkles,
              title: 'Interactive Controls',
              desc: 'Seamless state synchronization connecting DOM UI inputs with real-time WebGL scene parameters.'
            },
            {
              icon: Terminal,
              title: 'Zero Hydration Lag',
              desc: 'Dynamic imports ensure lightweight initial DOM rendering and smooth background 3D canvas mount.'
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl glass-card flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture & Specs Showcase */}
      <section id="specs" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                Technical Specs
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Built on Next.js 16 & Three.js
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Designed for high performance, accessibility, and modern aesthetics. Discover how the architecture handles real-time scene state updates.
              </p>

              {/* Tab Selector */}
              <div className="flex gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800 w-fit">
                <button
                  onClick={() => setActiveTab('rendering')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'rendering' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rendering
                </button>
                <button
                  onClick={() => setActiveTab('physics')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'physics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveTab('shaders')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'shaders' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Shaders
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                {activeTab === 'rendering' && (
                  <div className="flex flex-col gap-2">
                    <span className="text-indigo-400">Three.js WebGL Pipeline</span>
                    <span>Canvas: R3F Canvas with custom FOV 45</span>
                    <span>Lighting: Ambient + 2x Directional + Point Light</span>
                    <span>Fog: Exponential distance fog (#020617)</span>
                  </div>
                )}
                {activeTab === 'physics' && (
                  <div className="flex flex-col gap-2">
                    <span className="text-emerald-400">Framerate Optimization</span>
                    <span>Target FPS: 60 FPS continuous</span>
                    <span>Dynamic Particles: 220 Float32 BufferAttributes</span>
                    <span>SSR Handling: Client dynamic import (ssr: false)</span>
                  </div>
                )}
                {activeTab === 'shaders' && (
                  <div className="flex flex-col gap-2">
                    <span className="text-purple-400">MeshPhysicalMaterial Properties</span>
                    <span>Clearcoat: 0.8 with 0.2 Roughness</span>
                    <span>Reflection: High specular metalness response</span>
                    <span>Geometries: TorusKnot, Icosahedron, Octahedron</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { metric: '60+', label: 'FPS Target', sub: 'Smooth motion' },
                { metric: '< 100ms', label: 'Interactive Latency', sub: 'Instant controls' },
                { metric: '100%', label: 'WebGL 2.0', sub: 'Cross-browser' },
                { metric: '0 KB', label: 'SSR Canvas Overhead', sub: 'Client lazy mount' }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl glass-card flex flex-col justify-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-1">
                    {stat.metric}
                  </div>
                  <div className="text-sm font-semibold text-slate-200">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community / Newsletter Section */}
      <section id="newsletter" className="relative z-10 py-20 px-4 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl glass border border-slate-800 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
            <Globe className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Stay Updated with 3D Web Innovations
          </h2>
          <p className="text-slate-400 max-w-lg mb-8 text-base">
            Subscribe to receive technical breakdowns, open-source 3D WebGL components, and UI design patterns.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              Subscribe
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{"\u2713 Subscribed successfully! Welcome aboard."}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 px-4 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300 text-base">Aura3D</span>
            <span className="text-xs text-slate-600">| Modern Web Interface</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#customizer" className="hover:text-slate-200 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#specs" className="hover:text-slate-200 transition-colors">Specs</a>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>WebGL Active</span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Aura3D. Built with Next.js, R3F & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  )
}
