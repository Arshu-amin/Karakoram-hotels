'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Box,
  Zap,
  Sliders,
  RotateCcw,
  Check,
  ArrowRight,
  Globe,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-400 font-mono tracking-wider">INITIALIZING 3D ENGINE...</span>
      </div>
    </div>
  ),
})

type ShapeType = NonNullable<SceneProps['shape']>

const DEFAULT_SCENE_PROPS: Required<SceneProps> = {
  shape: 'torusKnot',
  color: '#6366f1',
  wireframe: false,
  speed: 1.5,
  distort: 0.35,
  metalness: 0.3,
  roughness: 0.2,
}

export default function Home() {
  const [sceneProps, setSceneProps] = useState<Required<SceneProps>>(DEFAULT_SCENE_PROPS)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const presetColors = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
  ]

  const shapes: Array<{ id: ShapeType; name: string }> = [
    { id: 'torusKnot', name: 'Torus Knot' },
    { id: 'icosahedron', name: 'Icosahedron' },
    { id: 'torus', name: 'Torus' },
    { id: 'octahedron', name: 'Octahedron' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background WebGL Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneProps} />
      </div>

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 shadow-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Tech Specs</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-28 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-8 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Next-Gen WebGL & React 19 Engine</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Spatial Interfaces,{' '}
            <span className="text-gradient-primary">Reimagined in 3D</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal">
            Immerse your users in interactive WebGL experiences. High-performance 60FPS rendering meets modern glassmorphism design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#customizer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white shadow-xl shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <Sliders className="w-5 h-5" />
              <span>Customize 3D Scene</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold glass hover:bg-slate-800/80 border border-slate-700/80 text-slate-200 transition-all transform hover:scale-105 active:scale-95"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 pt-12 border-t border-slate-800/60 text-center w-full max-w-2xl">
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-white">60 FPS</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">Hardware Accelerated</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-indigo-400">&lt; 16ms</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">Render Latency</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-purple-400">100%</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">Real-time Reactive</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3D Interactive Customizer Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
            Control the WebGL background scene live. Adjust geometries, speed, distortion, and physical properties in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-8">
            {/* Shape Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
                Geometry Mesh
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneProps((prev) => ({ ...prev, shape: s.id }))}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-2 ${
                      sceneProps.shape === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Box className="w-5 h-5" />
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
                Material Color Accent
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {presetColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSceneProps((prev) => ({ ...prev, color: c.value }))}
                    className={`w-10 h-10 rounded-xl transition-all transform hover:scale-110 flex items-center justify-center border-2 ${
                      sceneProps.color === c.value ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  >
                    {sceneProps.color === c.value && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
                <div className="flex items-center gap-2 ml-2 pl-4 border-l border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">Custom:</span>
                  <input
                    type="color"
                    value={sceneProps.color}
                    onChange={(e) => setSceneProps((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border-0"
                  />
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-wider text-slate-300">
                  <span>ROTATION SPEED</span>
                  <span className="text-indigo-400 font-mono">{sceneProps.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={sceneProps.speed}
                  onChange={(e) => setSceneProps((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Distortion Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-wider text-slate-300">
                  <span>MESH DISTORTION</span>
                  <span className="text-indigo-400 font-mono">{sceneProps.distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.05"
                  value={sceneProps.distort}
                  onChange={(e) => setSceneProps((prev) => ({ ...prev, distort: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Metalness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-wider text-slate-300">
                  <span>METALNESS</span>
                  <span className="text-indigo-400 font-mono">{sceneProps.metalness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={sceneProps.metalness}
                  onChange={(e) => setSceneProps((prev) => ({ ...prev, metalness: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Roughness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold tracking-wider text-slate-300">
                  <span>ROUGHNESS</span>
                  <span className="text-indigo-400 font-mono">{sceneProps.roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={sceneProps.roughness}
                  onChange={(e) => setSceneProps((prev) => ({ ...prev, roughness: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() =>
                  setSceneProps((prev) => ({ ...prev, wireframe: !prev.wireframe }))
                }
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                  sceneProps.wireframe
                    ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Wireframe Mode: {sceneProps.wireframe ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setSceneProps(DEFAULT_SCENE_PROPS)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between h-full">
            <div>
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit mb-6 border border-indigo-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Live State Synchronization</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Changes to the control panel instantly update React state, which flows into React Three Fiber shaders without interrupting frame rates.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Mesh: {sceneProps.shape}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Color: {sceneProps.color}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Distortion: {sceneProps.distort}</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500">
              Tip: Click and drag on the 3D viewport to orbit around the model.
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Engineered for <span className="text-gradient-primary">Modern Web</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
            Built with cutting-edge tools to deliver visually captivating, smooth, and accessible digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: "60 FPS WebGL Engine",
              desc: "Hardware-accelerated Three.js rendering optimized for low CPU/GPU overhead.",
            },
            {
              icon: <Layers className="w-6 h-6 text-indigo-400" />,
              title: "Frosted Glassmorphism",
              desc: "Deep frosted glass UI elements crafted with CSS backdrop filters and Framer Motion.",
            },
            {
              icon: <Code2 className="w-6 h-6 text-cyan-400" />,
              title: "React 19 & Next.js 16",
              desc: "Leverages the latest React features and Next.js Turbopack compiler for fast builds.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: "Type-Safe Architecture",
              desc: "100% strict TypeScript codebase preventing runtime state bugs and UI mismatches.",
            },
            {
              icon: <Globe className="w-6 h-6 text-purple-400" />,
              title: "Cross-Platform Precision",
              desc: "Seamless responsive layouts designed to look stunning on mobile, tablet, and desktop.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-rose-400" />,
              title: "Fluid Cursor Dynamics",
              desc: "Custom spring-driven cursor physics that intelligently reacts to interactive DOM elements.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl glass glass-hover border border-slate-800/80 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Specs Section */}
      <section id="specs" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-6">
                TECHNICAL BENCHMARKS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Under the Hood of <span className="text-gradient-secondary">Aura3D</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Every component is crafted for modularity and performance. WebGL canvases run asynchronously on isolated render loops without blocking main-thread React updates.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Rendering Pipeline", val: "Three.js r184 + React Three Fiber" },
                  { label: "UI Framework", val: "Next.js 16 App Router + React 19" },
                  { label: "Styling Engine", val: "Tailwind CSS v4 + Glassmorphism" },
                  { label: "Animation Engine", val: "Framer Motion 12 + Spring Cursor" },
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-800/80 text-sm">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-indigo-300 font-mono font-semibold">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-3xl font-extrabold text-indigo-400 mb-2">0</div>
                <div className="text-xs text-slate-400 font-medium">Render Hydration Errors</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-3xl font-extrabold text-purple-400 mb-2">100%</div>
                <div className="text-xs text-slate-400 font-medium">SSR & Dynamic Loading Safe</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-3xl font-extrabold text-cyan-400 mb-2">&lt; 100KB</div>
                <div className="text-xs text-slate-400 font-medium">Initial JS Bundle Chunk</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-3xl font-extrabold text-emerald-400 mb-2">A+</div>
                <div className="text-xs text-slate-400 font-medium">Lighthouse UX Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-4 text-center">
        <div className="glass rounded-3xl p-8 md:p-14 border border-slate-800 shadow-2xl relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Stay Ahead of <span className="text-gradient-primary">Web 3D</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-base mb-8">
            Subscribe to our newsletter for early access to new 3D customizer tools, shader libraries, and UI component releases.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm max-w-md mx-auto">
              {"\u2713 Subscribed! Check your inbox for updates."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-4 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">Aura3D</span>
            <span className="text-xs text-slate-600">— Modern WebGL Interface</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>

          <p>© 2026 Aura3D. Built with Next.js & React 19.</p>
        </div>
      </footer>
    </main>
  )
}
