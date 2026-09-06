'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Palette,
  RotateCw,
  Sliders,
  ChevronRight,
  CheckCircle2,
  Send,
  Globe,
  Share2,
  Code2,
  ShieldCheck,
  Cpu
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

type ShapeType = NonNullable<SceneProps['shape']>

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-indigo-400 font-medium animate-pulse">
        <Sparkles className="w-5 h-5 animate-spin" />
        Loading 3D Canvas...
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Controls State
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [shape, setShape] = useState<ShapeType>('torusKnot')

  // Newsletter State
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

  const presetColors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6']

  const shapeOptions: { id: ShapeType; name: string }[] = [
    { id: 'torusKnot', name: 'TorusKnot' },
    { id: 'sphere', name: 'Sphere' },
    { id: 'icosahedron', name: 'Icosahedron' },
    { id: 'box', name: 'Cube Box' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D WebGL Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          shape={shape}
        />
      </div>

      {/* Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Aura3D
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              Interactive 3D
            </a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">
              Performance
            </a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">
              Community
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore 3D</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Web Interface</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8 max-w-5xl"
        >
          Immersive Web Experiences <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powered by 3D Technology
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Elevate your digital application with interactive WebGL graphics, fluid Framer Motion animations, and ultra-responsive modern UI components.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <span>Try 3D Customizer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>View Features</span>
          </a>
        </motion.div>
      </section>

      {/* 3D Interactive Customizer Section */}
      <section id="customizer" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
            Customize parameters in real-time and observe instant WebGL scene transformations.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <Sliders className="w-5 h-5" />
              <span>REAL-TIME CANVAS CONTROLS</span>
            </div>

            {/* Geometry Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                3D Mesh Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shapeOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                      shape === item.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Picker */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                Material Color Accent
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {presetColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-9 h-9 rounded-xl transition-all transform hover:scale-110 flex items-center justify-center ${
                      color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed & Scale Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                    Rotation Speed
                  </label>
                  <span className="text-xs font-mono text-indigo-300 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Mesh Scale
                  </label>
                  <span className="text-xs font-mono text-indigo-300 font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-sm font-medium text-slate-300">Wireframe Material Rendering</span>
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
          </div>

          {/* Preset Visual Showcase Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-slate-200">Active Material Specs</h3>
            <div className="space-y-3 text-xs font-mono text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Material Type:</span>
                <span className="text-indigo-300">MeshPhysicalMaterial</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Reflective Roughness:</span>
                <span className="text-indigo-300">0.15</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Metallic Coefficient:</span>
                <span className="text-indigo-300">0.85</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Clearcoat Intensity:</span>
                <span className="text-indigo-300">1.0</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Active Geometry:</span>
                <span className="text-indigo-300 uppercase">{shape}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Crafted for <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Modern Standards</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            High performance WebGL combined with full responsive design and slick animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Optimized WebGL rendering loop running at smooth 60+ FPS with minimal GPU overhead.',
            },
            {
              icon: Box,
              title: '3D WebGL Canvas',
              desc: 'Custom physical materials, dynamic lighting, particles, and real-time mesh updates.',
            },
            {
              icon: ShieldCheck,
              title: 'Modern Architecture',
              desc: 'Built with Next.js 16, React 19, Framer Motion v12, and Tailwind CSS v4.',
            },
            {
              icon: Cpu,
              title: 'Hardware Accelerated',
              desc: 'Leveraging WebGL shader pipelines to deliver high fidelity 3D effects on all devices.',
            },
            {
              icon: Code2,
              title: 'Modular Codebase',
              desc: 'Fully typed TypeScript architecture with scalable layout structures and custom components.',
            },
            {
              icon: Share2,
              title: 'Interactive DOM Sync',
              desc: 'Direct state synchronization between standard DOM controls and 3D WebGL scenes.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats/Metrics Section */}
      <section id="stats" className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '60+ FPS', label: 'Frame Rate' },
            { value: '100%', label: 'Type Safe' },
            { value: '< 50ms', label: 'Latency' },
            { value: 'Modern', label: 'Tech Stack' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Stay Ahead in <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">3D Web Tech</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base mb-8">
            Subscribe to our updates for the latest in WebGL design trends, 3D graphics tutorials, and interactive web tools.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold"
              >
                <CheckCircle2 className="w-4 h-4" />
                {"\u2713 Subscribed"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-300">Aura3D Experience</span>
          </div>

          <p>© 2026 Aura3D. Built with Next.js, WebGL & Framer Motion.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              <Code2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
