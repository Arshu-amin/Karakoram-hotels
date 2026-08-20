'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Zap,
  ShieldCheck,
  Layers,
  Globe,
  Sliders,
  RotateCw,
  Palette,
  Box,
  CheckCircle2,
  ArrowRight,
  Code2,
  Activity
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-indigo-300">Initializing 3D Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PALETTES = [
  { name: 'Quantum Indigo', value: '#6366f1', border: 'border-indigo-500' },
  { name: 'Cyber Magenta', value: '#ec4899', border: 'border-pink-500' },
  { name: 'Emerald Wave', value: '#10b981', border: 'border-emerald-500' },
  { name: 'Electric Amber', value: '#f59e0b', border: 'border-amber-500' },
  { name: 'Deep Azure', value: '#06b6d4', border: 'border-cyan-500' },
]

const SHAPE_OPTIONS: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'torus', label: 'Torus Ring' },
  { id: 'octahedron', label: 'Octahedron' },
]

export default function Home() {
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [speed, setSpeed] = useState<number>(1.2)
  const [color, setColor] = useState<string>('#6366f1')
  const [distort, setDistort] = useState<number>(0.35)
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [scale, setScale] = useState<number>(1.2)

  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleReset = () => {
    setShape('torusKnot')
    setSpeed(1.2)
    setColor('#6366f1')
    setDistort(0.35)
    setWireframe(false)
    setScale(1.2)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto">
        <Scene
          shape={shape}
          speed={speed}
          color={color}
          distort={distort}
          wireframe={wireframe}
          scale={scale}
        />
      </div>

      {/* Subtle Ambient Gradient Overlays */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full glass border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Customizer
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Tech Specs
            </a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Customizer</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section id="hero" className="pt-20 pb-24 md:pt-32 md:pb-36 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Next-Generation Interactive 3D Experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-8 text-white max-w-5xl"
          >
            Dimension Beyond <br />
            <span className="text-gradient-primary">Boundaries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 font-normal leading-relaxed"
          >
            Explore real-time WebGL rendering, fluid spring interactions, and dynamic mesh customizers engineered for modern digital interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <Sliders className="w-5 h-5" />
              <span>Launch 3D Studio</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full font-bold text-slate-200 glass hover:bg-slate-800/80 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-slate-700/60"
            >
              <span>Explore Features</span>
            </a>
          </motion.div>

          {/* Performance Stats Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl glass-card p-6 rounded-2xl"
          >
            {[
              { label: 'Target Frame Rate', value: '60 FPS' },
              { label: 'WebGL Engine', value: 'Three.js / R3F' },
              { label: 'Shader Pass', value: 'Realtime Mesh' },
              { label: 'Latency', value: '< 2ms' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-extrabold text-indigo-300">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 3D CUSTOMIZER / CONFIGURATOR SECTION */}
        <section id="customizer" className="py-20 border-t border-slate-800/60">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient-secondary">
              Real-Time 3D Configurator
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Adjust parameters in real-time to customize the active background WebGL geometry, color, and distortion physics.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-slate-700/50 shadow-2xl">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Sliders className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Mesh Controls</h3>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold glass hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Geometry Selector */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Box className="w-4 h-4 text-indigo-400" />
                  <span>Geometry Shape</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {SHAPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setShape(opt.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        shape === opt.id
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                          : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Preset Palette */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  <span>Theme Color</span>
                </label>
                <div className="flex items-center gap-3 py-1">
                  {COLOR_PALETTES.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setColor(p.value)}
                      title={p.name}
                      className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 flex items-center justify-center border-2 ${
                        color === p.value ? p.border + ' scale-110 shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: p.value }}
                    >
                      {color === p.value && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-300">Rotation Speed</span>
                  <span className="text-indigo-400 font-mono font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-300">Surface Distortion</span>
                  <span className="text-indigo-400 font-mono font-bold">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-300">Scale Factor</span>
                  <span className="text-indigo-400 font-mono font-bold">{scale.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-200">Wireframe View</span>
                  <span className="text-xs text-slate-400">Render geometry mesh structure</span>
                </div>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-700'
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
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-24 border-t border-slate-800/60">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Engineered for Modern Web
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Combining 3D graphics, spring physics, and modular architecture to build next-level user interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'High Performance',
                desc: 'Optimized WebGL rendering with requestAnimationFrame loops and low-impact GPU shaders.',
              },
              {
                icon: Cpu,
                title: 'Next.js 16 Ready',
                desc: 'Leverages Turbopack compilation and async layout rendering for instant load speeds.',
              },
              {
                icon: Sparkles,
                title: 'Spring Physics',
                desc: 'Fluid cursor motion and responsive hover states powered by Framer Motion springs.',
              },
              {
                icon: Layers,
                title: 'Glassmorphic UI',
                desc: 'Multi-layered glass design with frosted backdrops and dynamic lighting accents.',
              },
              {
                icon: ShieldCheck,
                title: 'Type-Safe Architecture',
                desc: 'Fully typed with TypeScript and compliant with strict React 19 ESLint rules.',
              },
              {
                icon: Globe,
                title: 'Cross-Device Smooth',
                desc: 'Responsive canvas scaling that gracefully adapts across mobile, tablet, and desktop viewports.',
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 rounded-3xl flex flex-col items-start gap-4"
              >
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TECH SPECS SHOWCASE SECTION */}
        <section id="specs" className="py-24 border-t border-slate-800/60">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-700/50 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Architecture & Stack</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                  State-of-the-art tech stack under the hood.
                </h2>
                <p className="text-slate-300 text-base mb-8 leading-relaxed">
                  Combining React Three Fiber for WebGL scene management, Framer Motion for DOM orchestrations, and Tailwind CSS v4 for rapid glassmorphism design.
                </p>

                <div className="space-y-4">
                  {[
                    'React 19 & Next.js 16 with App Router',
                    'Three.js (r184) & @react-three/fiber canvas',
                    'Tailwind CSS v4 with custom glass styling',
                    'Framer Motion spring mechanics & interactive cursor',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-slate-200 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-3 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span>aura3d.config.ts</span>
                </div>
                <div>
                  <span className="text-purple-400">export const</span>{' '}
                  <span className="text-blue-400">3dConfig</span> = &#123;
                </div>
                <div className="pl-4 text-slate-400">
                  engine: <span className="text-emerald-400">&apos;Three.js&apos;</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  renderer: <span className="text-emerald-400">&apos;WebGL2&apos;</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  activeShape: <span className="text-amber-400">&apos;{shape}&apos;</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  materialColor: <span className="text-amber-400">&apos;{color}&apos;</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  fpsTarget: <span className="text-indigo-400">60</span>,
                </div>
                <div className="pl-4 text-slate-400">
                  distortion: <span className="text-indigo-400">{distort}</span>,
                </div>
                <div>&#125;;</div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER / SUBSCRIBE CALLOUT */}
        <section className="py-20 border-t border-slate-800/60">
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-slate-700/50">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Stay Updated with AURA 3D
            </h2>
            <p className="text-slate-400 mb-8 text-sm sm:text-base">
              Get notified when new shaders, WebGL interactions, and modern UI components are released.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium inline-flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{"\u2713 Subscribed! Welcome to the 3D ecosystem."}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-indigo-600/30"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-800/80 glass text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white tracking-wide">AURA 3D</span>
            <span className="text-xs text-slate-500">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Documentation</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>WebGL Engine Online</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
