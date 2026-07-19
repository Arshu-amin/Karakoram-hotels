'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamically import Scene to prevent hydration issues
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950/80 flex items-center justify-center animate-pulse">
      <div className="text-indigo-400 font-semibold tracking-widest text-sm uppercase">
        Initializing WebGL...
      </div>
    </div>
  )
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [shape, setShape] = useState<'torusKnot' | 'sphere' | 'box' | 'icosahedron'>('torusKnot')
  const [speed, setSpeed] = useState<number>(1.2)
  const [color, setColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [materialMode, setMaterialMode] = useState<'physical' | 'normal' | 'distort'>('physical')
  const [distort, setDistort] = useState<number>(0.3)

  // Feedback form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const containerRef = useRef<HTMLDivElement>(null)

  // Declare Framer Motion variables before early returns to satisfy rules-of-hooks
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start start', 'end end']
  })

  // Transform background opacity and 3D scale based on scroll position
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.7, 0.15])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  // Track mounting state to avoid hydration issues and comply with React 19
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) return
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormName('')
      setFormEmail('')
      setFormMessage('')
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-xl font-bold tracking-wider animate-pulse">
          L O A D I N G
        </div>
      </div>
    )
  }

  // Premium colors preset list
  const premiumColors = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Neon Cyber', hex: '#f43f5e' },
    { name: 'Teal Quantum', hex: '#0ea5e9' },
    { name: 'Emerald Flux', hex: '#10b981' },
    { name: 'Amber Star', hex: '#f59e0b' },
    { name: 'Amethyst Flare', hex: '#a855f7' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15, ease: 'easeOut' as const }
    }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Dynamic 3D Scene Viewport (Backdrop) */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/40 to-slate-950" />
        <Scene
          shape={shape}
          speed={speed}
          color={color}
          wireframe={wireframe}
          materialMode={materialMode}
          distort={distort}
        />
      </motion.div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center animate-spin-slow">
              <span className="text-white font-extrabold text-sm">3D</span>
            </div>
            <span className="text-xl font-black tracking-tight text-gradient-primary">
              NEXUS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#laboratory" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Playground
            </a>
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Stats
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Get in Touch
            </a>
          </nav>

          <a
            href="#laboratory"
            className="px-5 py-2 text-xs font-semibold rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95"
          >
            Launch Lab
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          style={{ scale: heroScale, y: heroY }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Version tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/30 text-xs text-indigo-300 mb-8 font-mono tracking-wider shadow-sm shadow-indigo-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            NEXUS ENGINE v2.0 READY
          </motion.div>

          {/* Core Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-none"
          >
            Sculpting the{' '}
            <span className="text-gradient-primary">
              Future of 3D
            </span>{' '}
            Interfaces
          </motion.h1>

          {/* Supporting Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed"
          >
            Step into an immersive WebGL-powered workspace. Real-time control, fluid animations, and highly performant custom physical materials.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4"
          >
            <a
              href="#laboratory"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/30 text-center"
            >
              Enter Laboratory
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-slate-700/80 hover:border-slate-500 glass hover:bg-slate-900/60 text-white rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 text-center"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs font-mono">
          <span>SCROLL TO DISCOVER</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* 3D Laboratory Section */}
      <section id="laboratory" className="relative z-10 py-28 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Lab</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Take absolute control of the 3D entity below. Modify variables in real time and experience immediate procedural visual rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Canvas Frame */}
          <div className="lg:col-span-7 rounded-3xl glass-premium min-h-[450px] overflow-hidden relative flex flex-col">
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="px-3 py-1 text-[10px] font-mono tracking-widest bg-slate-900/90 text-indigo-300 rounded-md border border-slate-800 uppercase">
                Render: {shape}
              </span>
              <span className="px-3 py-1 text-[10px] font-mono tracking-widest bg-slate-900/90 text-indigo-300 rounded-md border border-slate-800 uppercase">
                {materialMode} material
              </span>
            </div>

            <div className="flex-1 w-full h-full min-h-[400px]">
              <Scene
                shape={shape}
                speed={speed}
                color={color}
                wireframe={wireframe}
                materialMode={materialMode}
                distort={distort}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 glass rounded-xl p-3 flex justify-between items-center text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>GPU ACCELERATED</span>
              </div>
              <span className="font-mono text-slate-400">FPS: ~60.00</span>
            </div>
          </div>

          {/* Interactive Lab Controls Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl glass-premium p-6 md:p-8 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold tracking-tight">Controller Panel</h3>
                <span className="text-xs text-slate-500 font-mono">LAB STATUS: CALIBRATED</span>
              </div>

              {/* Shape Selection */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Select Shape
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['torusKnot', 'sphere', 'box', 'icosahedron'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`py-2 px-3 text-sm font-semibold rounded-xl border transition-all ${
                        shape === s
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/5'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      }`}
                    >
                      {s === 'torusKnot' ? 'Torus Knot' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Material Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['physical', 'normal', 'distort'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMaterialMode(m)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all ${
                        materialMode === m
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                      }`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Metallic Hue
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {premiumColors.map((pc) => (
                    <button
                      key={pc.hex}
                      onClick={() => setColor(pc.hex)}
                      className="w-8 h-8 rounded-full border-2 transition-all relative group flex items-center justify-center"
                      style={{
                        backgroundColor: pc.hex,
                        borderColor: color === pc.hex ? '#ffffff' : 'transparent',
                        boxShadow: color === pc.hex ? `0 0 12px ${pc.hex}` : 'none'
                      }}
                      title={pc.name}
                    >
                      {color === pc.hex && (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </button>
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-full bg-transparent cursor-pointer border-2 border-slate-700 hover:border-slate-500 transition-all p-0"
                    title="Custom Color"
                  />
                </div>
              </div>

              {/* Speed Dial & Distort Factor Sliders */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="uppercase tracking-wider text-slate-400">Rotation Speed</span>
                    <span className="text-indigo-400">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {materialMode === 'distort' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="uppercase tracking-wider text-slate-400">Distortion Factor</span>
                      <span className="text-indigo-400">{distort.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.2"
                      step="0.05"
                      value={distort}
                      onChange={(e) => setDistort(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Wireframe and Reset Controls */}
            <div className="pt-4 border-t border-slate-800 flex gap-4">
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  wireframe
                    ? 'bg-yellow-500/10 border-yellow-500/60 text-yellow-200'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {wireframe ? 'Wireframe Enabled' : 'Toggle Wireframe'}
              </button>

              <button
                onClick={() => {
                  setShape('torusKnot')
                  setSpeed(1.2)
                  setColor('#6366f1')
                  setWireframe(false)
                  setMaterialMode('physical')
                  setDistort(0.3)
                }}
                className="py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-sm font-semibold transition-all"
                title="Reset Settings"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid & Interactive Cards */}
      <section id="features" className="relative z-10 py-24 px-4 bg-slate-950/40 border-y border-slate-900/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Designed for <span className="text-gradient-primary">Perfection</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Our 3D Nexus core provides ultra-modern architecture and blazing fast visual execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'High Frame Rates',
                desc: 'Enjoy buttery-smooth 60fps canvas execution powered directly by hardware GPU acceleration.',
                icon: (
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Modular Customization',
                desc: 'Tailor every dimension, rotation speed, wireframe mesh, and premium material mode procedural on-the-fly.',
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                )
              },
              {
                title: 'Frosted Aesthetics',
                desc: 'Exquisite modern glassmorphic UI components designed with dynamic blurring, soft glows, and staggers.',
                icon: (
                  <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                )
              },
              {
                title: 'Responsive Core',
                desc: 'Engineered for seamless interactivity on desktops, tablets, and high-pixel mobile viewports alike.',
                icon: (
                  <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                className="glass-premium p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' as const }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center border border-slate-800 group-hover:border-indigo-500/20 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-100">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-900/60 flex items-center text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <svg className="w-3 h-3 ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Stats Showcase */}
      <section id="stats" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-premium rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            {[
              { num: '60.00', suffix: ' FPS', label: 'Rendering Rate', barColor: 'bg-indigo-500', pct: 100 },
              { num: '0.01', suffix: 'ms', label: 'Interaction Delay', barColor: 'bg-teal-500', pct: 98 },
              { num: '100', suffix: '%', label: 'GPU Optimization', barColor: 'bg-purple-500', pct: 100 }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="space-y-3"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-slate-100 font-mono tracking-tight flex items-center justify-center">
                  <span>{stat.num}</span>
                  <span className="text-indigo-400 text-2xl ml-1">{stat.suffix}</span>
                </div>
                <p className="text-sm font-mono uppercase tracking-widest text-slate-400">{stat.label}</p>

                {/* Visual progression bar */}
                <div className="w-32 h-1 bg-slate-900 mx-auto rounded-full overflow-hidden mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className={`h-full ${stat.barColor}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphic Contact Feedback Form */}
      <section id="contact" className="relative z-10 py-24 px-4 max-w-3xl mx-auto">
        <div className="glass-premium rounded-3xl p-8 md:p-12 border border-indigo-500/15">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold mb-3 text-gradient-primary">
              Laboratory Feedback
            </h2>
            <p className="text-slate-400 text-sm">
              Submit your experience notes to calibrating the Nexus 3D environment.
            </p>
          </div>

          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-emerald-200">Submission Successful!</h3>
              <p className="text-emerald-400/80 text-sm max-w-md mx-auto">
                Thank you for contributing to the 3D research group. Your parameters have been committed to the simulation records.
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="mt-4 px-6 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 font-semibold rounded-xl text-xs transition-colors border border-emerald-500/20"
              >
                Send Another Response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alexis Prime"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-200 focus:outline-none"
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="alexis@nexus.io"
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-200 focus:outline-none"
                    disabled={formStatus === 'sending'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Simulation Notes / Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Share details on shape rendering, performance characteristics, or stylistic ideas..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-slate-200 focus:outline-none resize-none"
                  disabled={formStatus === 'sending'}
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {formStatus === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Transmitting Data...</span>
                  </>
                ) : (
                  <span>Submit Laboratory Logs</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 bg-slate-950/80 text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-extrabold text-[10px]">3D</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-300">
              NEXUS LABS
            </span>
          </div>

          <p className="text-xs text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Next.js 3D Nexus App. All rights reserved. Built with passion.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg bg-slate-900/60"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  )
}
