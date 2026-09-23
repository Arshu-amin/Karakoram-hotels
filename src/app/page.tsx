'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Box,
  Sliders,
  Palette,
  Activity,
  Zap,
  Globe,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Share2,
  Code2
} from 'lucide-react'
import type { SceneConfig, ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
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

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyber Purple', value: '#a855f7' },
  { name: 'Neon Cyan', value: '#06b6d4' },
  { name: 'Sunset Pink', value: '#ec4899' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Solar Gold', value: '#f59e0b' },
]

const SHAPE_OPTIONS: { label: string; value: ShapeType }[] = [
  { label: 'Torus Knot', value: 'torusKnot' },
  { label: 'Sphere', value: 'sphere' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Box', value: 'box' },
  { label: 'Torus', value: 'torus' },
]

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1,
    distort: 0.4,
    wireframe: false,
    particleCount: 250,
    roughness: 0.2,
    metalness: 0.8,
  })

  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleResetConfig = () => {
    setSceneConfig({
      shape: 'torusKnot',
      color: '#6366f1',
      speed: 1,
      distort: 0.4,
      wireframe: false,
      particleCount: 250,
      roughness: 0.2,
      metalness: 0.8,
    })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gradient-primary">
              Aura3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WebGL Active
            </span>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-indigo-500/30"
          >
            <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-slate-300">
              Next-Generation WebGL & React 19 Frontend
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8"
          >
            Crafting Digital <br />
            <span className="text-gradient-primary">Dimensions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Immerse users in high-performance, real-time 3D experiences. Customize physical materials, lighting, and geometric distortions live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/30 flex items-center gap-2"
            >
              Explore 3D Customizer
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 border border-slate-700"
            >
              Learn Architecture
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3D Interactive Customizer Studio */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20"
          >
            <Sliders className="w-4 h-4" />
            Interactive WebGL Studio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Real-Time <span className="text-gradient-primary">3D Controls</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-sm md:text-base"
          >
            Adjust the WebGL parameters below to manipulate the 3D scene in real-time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-10 shadow-2xl max-w-4xl mx-auto border border-slate-700/50"
        >
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <Box className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg md:text-xl font-bold text-slate-100">Mesh & Material Settings</h3>
            </div>
            <button
              onClick={handleResetConfig}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shape Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Geometry Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SHAPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSceneConfig({ ...sceneConfig, shape: opt.value })}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      sceneConfig.shape === opt.value
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" /> Color Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setSceneConfig({ ...sceneConfig, color: p.value })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                      sceneConfig.color === p.value
                        ? 'bg-slate-800 border-indigo-400 text-slate-100 ring-2 ring-indigo-500/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: p.value }} />
                    <span className="truncate">{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Rotation Speed
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneConfig.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={sceneConfig.speed}
                onChange={(e) => setSceneConfig({ ...sceneConfig, speed: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Distortion Amount Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" /> Mesh Distortion
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneConfig.distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneConfig.distort}
                onChange={(e) => setSceneConfig({ ...sceneConfig, distort: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Particle Density Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Particle Cloud
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneConfig.particleCount}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={sceneConfig.particleCount}
                onChange={(e) => setSceneConfig({ ...sceneConfig, particleCount: parseInt(e.target.value) })}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="text-sm font-semibold text-slate-200 block">Wireframe Render</span>
                <span className="text-xs text-slate-400">View geometry polygon structure</span>
              </div>
              <button
                onClick={() => setSceneConfig({ ...sceneConfig, wireframe: !sceneConfig.wireframe })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Engineered for <span className="text-gradient-secondary">Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-xl mx-auto text-sm md:text-base"
          >
            Built on top of cutting-edge web graphics tech to deliver silky smooth 60fps animations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "WebGL Shader Pipeline",
              desc: "Custom vertex distortion shaders rendered directly on GPU for zero CPU thread stutter.",
              color: "text-indigo-400"
            },
            {
              icon: Globe,
              title: "Next.js Turbopack",
              desc: "Fast build speeds and SSR dynamic canvas loading with optimized client hydration.",
              color: "text-cyan-400"
            },
            {
              icon: ShieldCheck,
              title: "Type-Safe Architecture",
              desc: "Fully typed React Three Fiber setup ensuring robust state updates and zero runtime breaks.",
              color: "text-purple-400"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative group overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Showcase Metrics */}
      <section id="tech" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-4">
              <span className="text-4xl md:text-5xl font-black text-indigo-400 block mb-2">60 FPS</span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Smooth WebGL</span>
            </div>
            <div className="p-4 pt-6 md:pt-4">
              <span className="text-4xl md:text-5xl font-black text-purple-400 block mb-2">React 19</span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Next.js 16 Ready</span>
            </div>
            <div className="p-4 pt-6 md:pt-4">
              <span className="text-4xl md:text-5xl font-black text-cyan-400 block mb-2">Tailwind v4</span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Inline Styling</span>
            </div>
            <div className="p-4 pt-6 md:pt-4">
              <span className="text-4xl md:text-5xl font-black text-pink-400 block mb-2">Zero Latency</span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">State Synchronization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-14 border border-indigo-500/20 shadow-2xl relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-7 h-7 text-indigo-400" />
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">Stay Ahead with <span className="text-gradient-primary">Aura3D</span></h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Subscribe for updates on WebGL shader libraries, 3D design components, and interactive UI releases.
          </p>

          {emailSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold"
            >
              <CheckCircle2 className="w-5 h-5" />
              {"\u2713 Subscribed! Check your inbox soon."}
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/30"
              >
                Join Newsletter
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-300">Aura3D Studio</span>
          </div>

          <p>© 2026 Aura3D Web Experience. Built with Next.js, Tailwind CSS & Three.js.</p>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#hero" className="hover:text-indigo-400 transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors"><Sliders className="w-4 h-4" /></a>
            <a href="#features" className="hover:text-indigo-400 transition-colors"><Share2 className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </main>
  )
}
