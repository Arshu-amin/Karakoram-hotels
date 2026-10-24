'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Globe,
  Share2,
  Code2,
  Box,
  Palette,
  Sliders,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Activity,
  ArrowRight,
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-600 text-sm font-mono">
      Initializing 3D Canvas...
    </div>
  ),
})

export default function Home() {
  // 3D Customizer state
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [distort, setDistort] = useState(0.4)
  const [wireframe, setWireframe] = useState(false)
  const [particlesEnabled, setParticlesEnabled] = useState(true)

  // Subscription state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorOptions = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
  ]

  const shapeOptions: { label: string; value: ShapeType }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Torus Ring', value: 'torus' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Canvas Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          particlesEnabled={particlesEnabled}
        />
      </div>

      {/* Glassmorphic Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center glow-primary">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-400 bg-clip-text text-transparent">
              Aura 3D
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">
              Showcase
            </a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Launch Studio
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            Next-Gen Web Graphics Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8"
          >
            Immersive 3D <br />
            <span className="text-gradient-primary">Digital Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
          >
            Elevate your web apps with modern WebGL shaders, real-time parametric controls, and sleek glassmorphic user interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Explore 3D Controls
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-white font-semibold transition-all border border-slate-700 hover:border-slate-500 transform hover:scale-105 active:scale-95"
            >
              Read Architecture
            </a>
          </motion.div>

          {/* Key Metrics Header Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl glass-card p-6 rounded-2xl"
          >
            {[
              { label: 'Frame Rate', value: '60 FPS' },
              { label: 'Bundle Size', value: '< 20 KB' },
              { label: 'Shader Tech', value: 'WebGL 2' },
              { label: 'Next.js', value: 'v16 Ready' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-2">
                <div className="text-xl md:text-2xl font-bold text-indigo-300">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-secondary">
              Interactive 3D Studio
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Manipulate 3D mesh properties directly in real-time. Tune colors, distortion, wireframe rendering, and rotational speed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Control Panel Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 glass-card p-6 md:p-8 rounded-3xl space-y-8"
            >
              {/* Geometry Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Select Mesh Geometry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setShape(opt.value)}
                      className={`px-3 py-2.5 text-xs font-medium rounded-xl transition-all border ${
                        shape === opt.value
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Color Selector */}
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-400" />
                  Material Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setColor(opt.value)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-all ${
                        color === opt.value
                          ? 'border-indigo-400 bg-slate-800/80 text-white'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow"
                        style={{ backgroundColor: opt.value }}
                      />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    Rotation Speed
                  </label>
                  <span className="text-xs font-mono text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Mesh Distortion
                  </label>
                  <span className="text-xs font-mono text-purple-400">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-3">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-between border transition-all ${
                    wireframe
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>Wireframe Mode</span>
                  <span className={`w-3 h-3 rounded-full ${wireframe ? 'bg-indigo-400 shadow-glow' : 'bg-slate-700'}`} />
                </button>

                <button
                  onClick={() => setParticlesEnabled(!particlesEnabled)}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-between border transition-all ${
                    particlesEnabled
                      ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>Particle Dust</span>
                  <span className={`w-3 h-3 rounded-full ${particlesEnabled ? 'bg-purple-400 shadow-glow' : 'bg-slate-700'}`} />
                </button>
              </div>
            </motion.div>

            {/* Viewport Info / Live Metrics Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl flex flex-col justify-between min-h-[400px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-slate-200">Live WebGL Viewport State</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    ACTIVE
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  The background 3D canvas is synchronized live with these parameters. Drag with your pointer anywhere in the viewport to rotate the perspective camera in real time.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-500 mb-1 font-mono">Active Geometry</div>
                    <div className="text-sm font-bold text-white capitalize">{shape}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-500 mb-1 font-mono">Primary Color</div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm font-bold text-white font-mono">{color}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-500 mb-1 font-mono">Render Mode</div>
                    <div className="text-sm font-bold text-indigo-300">
                      {wireframe ? 'Wireframe Mesh' : 'Physical Clearcoat'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>WebGL 2.0 / Three.js</span>
                <span>Framer Motion 12</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Engineered for <span className="text-gradient-primary">Performance</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Combining modern React 19 server components with fluid 60FPS WebGL client graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'High Performance GPU',
                desc: 'Hardware accelerated shaders rendering complex geometries seamlessly across desktop and mobile.',
                color: 'text-indigo-400',
              },
              {
                icon: ShieldCheck,
                title: 'Type-Safe Architecture',
                desc: 'Full TypeScript coverage across Three.js props, state management, and Framer Motion hooks.',
                color: 'text-purple-400',
              },
              {
                icon: Zap,
                title: 'Next.js 16 Turbo',
                desc: 'Built on Next.js App Router, dynamic dynamic SSR loading, and modular code splitting.',
                color: 'text-cyan-400',
              },
            ].map((feature, i) => {
              const IconComp = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="glass-card p-8 rounded-3xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6">
                      <IconComp className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    <span>Learn detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  Modular Components
                </span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2 mb-6">
                  Ready to drop into your Next.js project
                </h3>
                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  Designed from the ground up to integrate into modern design systems with minimal overhead and zero layout thrashing.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    'Dynamic SSR component hydration safety',
                    'Framer Motion smooth scroll-driven transitions',
                    'Tailwind CSS v4 inline themes and glassmorphism',
                    'Interactive orbit controls & particle systems',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25">
                  View Documentation
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-slate-500 font-mono">{"// Import 3D Scene safely with SSR disabled"}</div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">const</span> Scene = <span className="text-indigo-400">dynamic</span>(() =&#x3E; <span className="text-purple-400">import</span>(<span className="text-emerald-300">&apos;@/components/Scene&apos;</span>), &#123; ssr: <span className="text-amber-400">false</span> &#125;)
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-slate-500 font-mono">{"// Render dynamic WebGL canvas"}</div>
                  <div className="text-slate-300">
                    &lt;<span className="text-indigo-400">Scene</span> shape=<span className="text-emerald-300">&quot;torusKnot&quot;</span> speed=&#123;<span className="text-amber-400">1.5</span>&#125; /&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card p-10 md:p-16 rounded-3xl border border-purple-500/20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Stay Updated
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Subscribe to our developer updates and receive the latest 3D shader primitives directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-all"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {subscribed ? '\u2713 Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-300">Aura 3D</span>
          </div>

          <p>© 2026 Aura 3D Inc. Built with Next.js, Tailwind v4 & Three.js.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Code2 className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
