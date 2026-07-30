'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamically import the 3D scene to prevent hydration issues
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="text-indigo-400 font-mono tracking-widest text-lg animate-pulse">
        INITIALIZING 3D ENVIRONMENT...
      </div>
    </div>
  )
})

type ShapeType = 'torusKnot' | 'sphere' | 'box' | 'octahedron'

export default function Home() {
  // Real-time control states passed directly into the background WebGL scene
  const [speed, setSpeed] = useState<number>(1.2)
  const [scale, setScale] = useState<number>(1.0)
  const [color, setColor] = useState<string>('#6366f1')
  const [shape, setShape] = useState<ShapeType>('torusKnot')

  // Newsletter subscription states
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Scroll animations
  const { scrollY } = useScroll()
  const opacityScene = useTransform(scrollY, [0, 400], [0.85, 0.3])
  const scaleScene = useTransform(scrollY, [0, 600], [1, 0.85])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
    setEmail('')
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" />

      {/* Floating 3D Scene Wrapper */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          opacity: opacityScene,
          scale: scaleScene,
        }}
      >
        <Scene speed={speed} scale={scale} color={color} shape={shape} />
      </motion.div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['Universe', 'Customize', 'Core Features', 'Analytics'].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-white transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#customize"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Control Engine
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="universe" className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-28">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Rethinking Digital Landscapes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none"
          >
            The Era of <br />
            <span className="text-gradient-primary">Fluid Dimensions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            An elite showcase of procedural geometries, reactive light matrices, and physical glass structures built on Next.js 16 and Three.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#customize"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-full font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-500/20"
            >
              Interactive Laboratory
            </a>
            <a
              href="#core-features"
              className="w-full sm:w-auto px-8 py-4 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/70 rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              Discover Ecosystem
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] tracking-widest font-mono uppercase text-slate-400">SCROLL DOWN</span>
          <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Real-Time Interactive 3D Control Panel */}
      <section id="customize" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Controls Information */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-mono text-pink-400">Active Laboratory</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Proactive Shape <br />
              <span className="text-gradient-secondary">Configuration</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Witness immediate updates as you alter variables inside the live 3D background. Built with an optimized reactive canvas to ensure constant frames, high performance, and visual stability.
            </p>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex gap-3 items-center">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 text-lg">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-200">Hardware Accelerated</h4>
                <p className="text-xs text-slate-400">Direct integration of React-Three-Fiber hooks.</p>
              </div>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />

              <div className="space-y-4">
                <label className="flex justify-between items-center text-sm font-bold text-slate-300">
                  <span>Rotational Velocity (Speed)</span>
                  <span className="font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{speed.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <label className="flex justify-between items-center text-sm font-bold text-slate-300">
                  <span>Physical Scale</span>
                  <span className="font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">{scale.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="0.4"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              {/* Geometry Selection */}
              <div className="space-y-4">
                <span className="text-sm font-bold text-slate-300 block">Geometric Form</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'torusKnot', label: 'Torus Knot' },
                    { id: 'sphere', label: 'Sphere' },
                    { id: 'box', label: 'Cube' },
                    { id: 'octahedron', label: 'Octahedron' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id as ShapeType)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                        shape === s.id
                          ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white border-transparent shadow-lg shadow-indigo-500/20 scale-[1.03]'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Color Picker */}
              <div className="space-y-4">
                <span className="text-sm font-bold text-slate-300 block">Mesh Reflection Tone</span>
                <div className="flex gap-4 items-center">
                  {['#6366f1', '#ec4899', '#fef08a', '#10b981', '#06b6d4'].map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setColor(hex)}
                      className="w-10 h-10 rounded-full border-2 transition-transform duration-200 hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: hex,
                        borderColor: color === hex ? '#ffffff' : 'transparent',
                        boxShadow: color === hex ? '0 0 15px ' + hex : 'none'
                      }}
                    />
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">Custom:</span>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="core-features" className="relative z-20 py-24 px-6 bg-slate-950/60 border-y border-slate-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-mono text-indigo-400">Key Pillars</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight">
              The Architecture of Tomorrow
            </h3>
            <p className="text-slate-400">
              Crafted meticulously to redefine modern digital environments, prioritizing render flow and interaction speeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔮",
                title: "WebGL Rendering",
                desc: "High-density floating points and clearcoat physically based materials that preserve frame-rates in real-time.",
                gradient: "from-indigo-500/20 to-indigo-500/5"
              },
              {
                icon: "💎",
                title: "Glassmorphism UI",
                desc: "Frosted backgrounds with absolute saturation layers and borders designed for pristine content readability.",
                gradient: "from-pink-500/20 to-pink-500/5"
              },
              {
                icon: "⚙️",
                title: "Tailwind v4 & R3F",
                desc: "Utilizing modern custom theme alignments and clean component modularity for seamless maintainability.",
                gradient: "from-emerald-500/20 to-emerald-500/5"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-slate-700/50 transition-colors"
              >
                <div className={`absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-br ${feature.gradient} blur-2xl group-hover:scale-125 transition-transform duration-500`} />
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Metrics */}
      <section id="analytics" className="relative z-20 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(99,102,241,0.05)_0%,rgba(236,72,153,0.05)_100%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-mono text-pink-400">Metrics of Excellence</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Designed for Global Scale
              </h3>
              <p className="text-slate-300 max-w-xl">
                Uncompromising standards. Every asset, shader, and script is compiled for lightweight execution, bringing 3D environments straight into normal DOM sections.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-6">
              {[
                { number: "144+", label: "Avg WebGL FPS" },
                { number: "99.9%", label: "Hydration Accuracy" },
                { number: "0.2ms", label: "State Sync Delay" },
                { number: "100%", label: "Responsive Scope" }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/40 text-center">
                  <div className="text-3xl md:text-4xl font-black text-white bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="relative z-20 py-24 px-6 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-xs uppercase tracking-widest font-mono text-indigo-400">Keep in Touch</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight">
            Subscribe to Aura Dimension Labs
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Stay updated with state-of-the-art interactive designs, visual releases, and innovative UI practices.
          </p>

          <div className="max-w-md mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center"
              >
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-bold text-indigo-300">Welcome to the Dimension!</h4>
                <p className="text-sm text-slate-400 mt-1">Check your inbox for a transmission shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your transmission address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25"
                  >
                    Subscribe
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-xs text-left pl-1">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-16 border-t border-slate-900 bg-slate-950 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-xs">
              A
            </div>
            <span className="font-bold tracking-tight text-slate-300">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <p>© 2026 Aura3D Dimension Labs. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
