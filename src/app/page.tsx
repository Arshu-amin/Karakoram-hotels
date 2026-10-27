'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Shield,
  Palette,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Globe,
  Share2,
  Code2,
  Box,
  Send,
} from 'lucide-react'
import type { SceneConfig, GeometryType } from '@/components/Scene'
import Cursor from '@/components/Cursor'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-mono">Initializing 3D Engine...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  // Interactive 3D scene controls state
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    speed: 1,
    scale: 1,
    color: '#6366f1',
    geometry: 'torusKnot',
    distort: false,
  })

  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
      setEmailInput('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Custom Spring Cursor */}
      <Cursor />

      {/* Background 3D Canvas Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Glassmorphism Header Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 group-hover:border-indigo-400/60 transition-all">
              <Box className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#customizer" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#demo" className="hover:text-white transition-colors">Showcase</a>
            <a href="#cta" className="hover:text-white transition-colors">Get Started</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="pointer-events-auto max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Next-Gen Spatial Interface
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight">
            Craft Next-Level <br />
            <span className="text-gradient-primary">3D Web Experiences</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300/90 max-w-2xl mb-10 leading-relaxed font-normal">
            Immerse your users with hardware-accelerated spatial visuals, fluid glassmorphism design, and dynamic real-time interaction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <Palette className="w-5 h-5" />
              Customize Scene
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full font-semibold text-base glass hover:bg-slate-800/80 text-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Explore Capabilities
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl glass-card rounded-2xl p-6 text-left">
            <div>
              <div className="text-2xl font-black text-indigo-400">60 FPS</div>
              <div className="text-xs text-slate-400 mt-1">Silky WebGL Rendering</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">&lt; 50ms</div>
              <div className="text-xs text-slate-400 mt-1">Ultra-Low Latency</div>
            </div>
            <div>
              <div className="text-2xl font-black text-pink-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Responsive Math</div>
            </div>
            <div>
              <div className="text-2xl font-black text-sky-400">Zero</div>
              <div className="text-xs text-slate-400 mt-1">External Dependencies</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
              <Sliders className="w-3.5 h-3.5" /> Interactive 3D Playground
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Live WebGL Configurator
            </h2>
            <p className="text-slate-400">
              Directly control the background 3D canvas properties in real-time using modern React state bindings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Control Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-300">
                  <Sliders className="w-5 h-5" /> Mesh Properties
                </h3>
                <button
                  onClick={() =>
                    setSceneConfig({
                      speed: 1,
                      scale: 1,
                      color: '#6366f1',
                      geometry: 'torusKnot',
                      distort: false,
                    })
                  }
                  className="text-xs text-slate-400 hover:text-indigo-400 underline"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Geometry Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Geometry Shape
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['torusKnot', 'sphere', 'octahedron', 'icosahedron'] as GeometryType[]).map(
                    (shape) => (
                      <button
                        key={shape}
                        onClick={() => setSceneConfig((prev) => ({ ...prev, geometry: shape }))}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium capitalize transition-all border ${
                          sceneConfig.geometry === shape
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {shape.replace(/([A-Z])/, ' $1')}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400">{sceneConfig.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={sceneConfig.speed}
                  onChange={(e) =>
                    setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Scale Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Mesh Scale</span>
                  <span className="text-purple-400">{sceneConfig.scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={sceneConfig.scale}
                  onChange={(e) =>
                    setSceneConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Color Preset Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Material Palette
                </label>
                <div className="flex gap-3">
                  {[
                    { name: 'Indigo', color: '#6366f1' },
                    { name: 'Purple', color: '#a855f7' },
                    { name: 'Emerald', color: '#10b981' },
                    { name: 'Rose', color: '#f43f5e' },
                    { name: 'Amber', color: '#f59e0b' },
                  ].map((p) => (
                    <button
                      key={p.color}
                      onClick={() => setSceneConfig((prev) => ({ ...prev, color: p.color }))}
                      style={{ backgroundColor: p.color }}
                      className={`w-9 h-9 rounded-full transition-transform border-2 ${
                        sceneConfig.color === p.color
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-300">Wireframe Mode</span>
                <button
                  onClick={() => setSceneConfig((prev) => ({ ...prev, distort: !prev.distort }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    sceneConfig.distort ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      sceneConfig.distort ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Config Output / Viewport Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs">
                    <Code2 className="w-4 h-4" /> Live State Config
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                    ● WebGL Active
                  </span>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
{JSON.stringify(sceneConfig, null, 2)}
                </pre>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                <p>Drag anywhere on the screen to rotate camera perspective.</p>
                <div className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  <span>Realtime Canvas Sync</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> High Performance
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Architected for the Web Era
            </h2>
            <p className="text-slate-400">
              Combining modern Next.js App Router, Tailwind CSS, and WebGL physics into a seamless stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'GPU Accelerated',
                desc: 'Built with React Three Fiber & Three.js to offload heavy animation pipelines directly to hardware.',
                color: 'text-indigo-400',
                border: 'hover:border-indigo-500/50',
              },
              {
                icon: Layers,
                title: 'Glassmorphism UI',
                desc: 'Ultra-clear frosted glass visual depth using backdrop filters, custom blurs, and gradient borders.',
                color: 'text-purple-400',
                border: 'hover:border-purple-500/50',
              },
              {
                icon: Shield,
                title: 'Type-Safe Architecture',
                desc: 'Fully typed custom props, motion variants, and dynamic imports with 0 runtime layout shift.',
                color: 'text-pink-400',
                border: 'hover:border-pink-500/50',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`glass-card p-8 rounded-3xl border border-slate-800/80 transition-all duration-300 hover:-translate-y-2 group ${feature.border}`}
              >
                <div className={`p-4 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Showcase / Demo Section */}
      <section id="demo" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-4">
                <Globe className="w-3.5 h-3.5" /> Spatial Computing
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Redefining Interface Dynamics
              </h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Traditional flat websites belong in the past. Aura3D elevates modern product presentations with interactive depth, dynamic lighting response, and intuitive touch/scroll controls.
              </p>

              <div className="space-y-4">
                {[
                  'Hardware-accelerated dynamic shadows & reflections',
                  'Fluid spring animations integrated with cursor physics',
                  'Next.js Turbopack optimized bundle sizes',
                  'Seamless dark mode aesthetics with color-matched fog',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-slate-700/60 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span className="font-mono">STATUS: OPERATIONAL</span>
                <span className="text-indigo-400 font-mono">LATENCY: 12ms</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Mesh Vertices</div>
                  <div className="text-2xl font-bold text-slate-100 mt-1">16,384</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Shader Uniforms</div>
                  <div className="text-2xl font-bold text-slate-100 mt-1">32 Active</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 flex items-center justify-between">
                <span>WebGL 2.0 Context Standard</span>
                <Share2 className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section id="cta" className="relative z-10 py-24 px-6 text-center scroll-mt-20">
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-10 md:p-16 border border-slate-800">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Ready to Build the Future?
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Get early access to our full suite of 3D UI components and spatial templates.
          </p>

          {emailSubmitted ? (
            <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-200 font-semibold text-sm inline-flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>{"\u2713 Subscribed"}! Thank you for joining Aura3D.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Join Waitlist
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-sm text-slate-500 glass-nav">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-200">AURA3D Studio</span>
            <span>— Spatial Web Experience</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-slate-200 transition-colors">Studio</a>
            <a href="#demo" className="hover:text-slate-200 transition-colors">Showcase</a>
            <span>© 2026 Aura3D. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
