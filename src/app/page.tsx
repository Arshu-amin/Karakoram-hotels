'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

// Dynamically import Scene to avoid SSR hydration mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#020617] z-0">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 font-mono text-sm animate-pulse tracking-widest">
          INITIALIZING WEBGL CANVAS...
        </p>
      </div>
    </div>
  ),
})

export default function Home() {
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.0)
  const [scale, setScale] = useState(1.1)
  const [shape, setShape] = useState<'torus' | 'sphere' | 'torusKnot' | 'box'>('torusKnot')

  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error')
      return
    }
    setSubscribeStatus('loading')
    setTimeout(() => {
      setSubscribeStatus('success')
    }, 1200)
  }

  const colorPresets = [
    { name: 'Indigo Spark', value: '#6366f1' },
    { name: 'Electric Purple', value: '#a855f7' },
    { name: 'Cosmic Magenta', value: '#ec4899' },
    { name: 'Cyber Cyan', value: '#06b6d4' },
    { name: 'Neon Emerald', value: '#10b981' },
    { name: 'Sunset Amber', value: '#f59e0b' },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D WebGL Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <Scene color={color} speed={speed} scale={scale} shape={shape} />
      </div>

      {/* Ambient Gradient Background Overlay */}
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#020617]/50 to-[#020617] z-0 pointer-events-none" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </span>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Interactive</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              Launch App
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto min-h-[90vh] px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' as const }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 animate-pulse">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Next-Generation Web Interface
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            <span className="text-gradient-primary">Unleash Spatial</span>
            <br />
            <span className="text-gradient-secondary">3D Experiences</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 font-normal max-w-2xl mx-auto mb-12 leading-relaxed">
            Manipulate the dynamic WebGL canvas in real-time. Experience beautiful glassmorphism, responsive spring animations, and high-performance metallic renders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/25 transform hover:-translate-y-0.5 active:translate-y-0 hover:scale-105"
            >
              Start Customizing
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold rounded-full border border-white/10 hover:border-white/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE CUSTOMIZER SECTION */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-gradient-primary">
            Real-Time 3D Control Panel
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Interact with the WebGL mesh directly. Adjust physical geometries, change surface gloss/metallic hues, and speed up spatial rotations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Information & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Current Parameters
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The background WebGL environment uses GPU-accelerated <code className="text-indigo-300 font-mono">MeshPhysicalMaterial</code>, reflecting secondary lighting, orbital pathing, and variable-frequency rotations dynamically.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/5 font-mono text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>ACTIVE SHAPE:</span>
                  <span className="text-indigo-400 font-bold uppercase">{shape}</span>
                </div>
                <div className="flex justify-between">
                  <span>METALLIC HUE:</span>
                  <span className="font-bold" style={{ color: color }}>{color.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ROTATIONAL FREQUENCY:</span>
                  <span className="text-indigo-400 font-bold">{(speed * 15).toFixed(0)} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span>DIMENSIONAL SCALE:</span>
                  <span className="text-indigo-400 font-bold">{(scale * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Orbit Control Activated</h4>
                <p className="text-xs text-slate-400">Click and drag inside the viewport to rotate camera angles.</p>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-10 rounded-3xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Control Section: Shape Selector */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                  1. Choose Surface Geometry
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['torusKnot', 'torus', 'sphere', 'box'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-2 ${
                        shape === s
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <span className="capitalize">{s === 'torusKnot' ? 'Torus Knot' : s}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Section: Color Preset Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                    2. Choose Metallic Gloss Color
                  </label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-md border-0 bg-transparent cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setColor(preset.value)}
                      className={`h-11 rounded-xl transition-all flex items-center justify-center relative overflow-hidden border ${
                        color === preset.value
                          ? 'border-indigo-400 scale-105'
                          : 'border-transparent hover:scale-102'
                      }`}
                      style={{ backgroundColor: preset.value }}
                      title={preset.name}
                    >
                      {color === preset.value && (
                        <span className="w-2.5 h-2.5 bg-white rounded-full shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Section: Speed Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 tracking-wider uppercase">3. Rotational Velocity</span>
                  <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Control Section: Scale Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 tracking-wider uppercase">4. Geometry Size</span>
                  <span className="text-indigo-400 font-mono">{(scale * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-gradient-primary">
            Next-Gen Architecture
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Experience spatial user interfaces built with performance, security, and beauty at the very core.
          </p>
        </div>

        {mounted && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Stunning 3D Physics',
                desc: 'Leverages hardware-accelerated WebGL through React Three Fiber, delivering glossy physical renders directly to the viewport.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                ),
              },
              {
                title: 'Lag-Free Responsiveness',
                desc: 'Utilizes Framer Motion spring physics for mouse trailing cursor interactions and animations, eliminating synthetic render delays.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
              {
                title: 'Adaptive Glassmorphic UI',
                desc: 'Blends seamlessly with ambient environment shaders, featuring subtle frosting borders, frosted blurs, and metallic accent colors.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                ),
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-interactive p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech" className="relative z-10 max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-gradient-secondary">
            Built On Modern Foundations
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            This platform brings together the absolute best-in-class tech stack for fast, lightweight, and cinematic websites.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Next.js 16', role: 'Server Optimization', color: 'from-slate-800 to-black' },
            { name: 'React 19', role: 'Strict Component Purity', color: 'from-cyan-950 to-slate-900' },
            { name: 'Three.js (R3F)', role: 'GPU-Accelerated 3D', color: 'from-slate-900 to-indigo-950' },
            { name: 'Tailwind v4', role: 'Dynamic Theme Engine', color: 'from-blue-950 to-cyan-950' },
            { name: 'Framer Motion', role: 'Fluid Physics Animation', color: 'from-pink-950 to-purple-950' },
          ].map((tech, idx) => (
            <div
              key={idx}
              className={`glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-40 bg-gradient-to-br ${tech.color} hover:border-indigo-500/20 transition-all`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-mono text-slate-300">
                0{idx + 1}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-100">{tech.name}</h4>
                <p className="text-xs text-slate-400">{tech.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIBE SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-6">
        <div className="glass p-10 md:p-14 rounded-3xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gradient-primary">
              Stay in the 3D Loop
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Subscribe to our newsletter and receive updates on cutting-edge spatial UI designs, WebGL techniques, and industry news.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (subscribeStatus === 'error') setSubscribeStatus('idle')
              }}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="flex-grow px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-indigo-500 focus:outline-none text-slate-200 text-sm placeholder-slate-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 active:scale-98 transition-all font-semibold text-sm flex items-center justify-center gap-2 text-white disabled:opacity-50"
            >
              {subscribeStatus === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : subscribeStatus === 'success' ? (
                <span>{"\u2713 Subscribed"}</span>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {subscribeStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-400 font-mono"
              >
                Welcome aboard! You have successfully subscribed to the Aura3D weekly digest.
              </motion.p>
            )}
            {subscribeStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-rose-400 font-mono"
              >
                Please enter a valid email address before submitting.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 border-t border-white/5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-6 rounded bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-[10px]">
              A
            </span>
            <span className="font-bold tracking-tight text-slate-400">AURA3D</span>
          </div>
          <p>© 2026 Aura3D Design. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">GitHub Repository</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
