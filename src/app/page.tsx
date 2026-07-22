'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
      <div className="text-sky-400 font-mono text-lg animate-pulse">
        Initializing 3D Environment...
      </div>
    </div>
  ),
})

export default function Home() {
  // UseScroll with safe window scroll (no hydration/ref issues)
  const { scrollYProgress } = useScroll()

  // Dynamic transforms based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])
  const yTranslate = useTransform(scrollYProgress, [0, 0.35], [0, -40])

  // State management for interactive features
  const [activeTab, setActiveTab] = useState<'visuals' | 'performance' | 'experience'>('visuals')
  const [customValue, setCustomValue] = useState(50)
  const [notification, setNotification] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const triggerNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  // Define transition easings cleanly to avoid TS errors
  const easeOutTransition = { duration: 0.8, ease: 'easeOut' as const }
  const delayTransition = (delay: number) => ({ duration: 0.8, delay, ease: 'easeOut' as const })

  // Static list of features
  const features = [
    {
      title: 'Ultra Performance',
      desc: 'Blazing fast rendering rates utilizing next-generation standard physical shaders.',
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Cinematic 3D WebGL',
      desc: 'Rich reflections, glossy clearcoats, and high-performance orbital physics.',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" />
        </svg>
      ),
    },
    {
      title: 'Liquid Animation',
      desc: 'Seamless spring dynamics and custom physics-driven reactive elements.',
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-xl animate-pulse font-mono">Loading Interface...</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 overflow-hidden">

      {/* Floating Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
              S
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              SPATIAL.IO
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Overview</a>
            <a href="#demo" className="hover:text-purple-400 transition-colors">Interactive Demo</a>
            <a href="#features" className="hover:text-pink-400 transition-colors">Features</a>
          </div>

          <div>
            <button
              onClick={() => triggerNotification('Secure digital connection initialising...')}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all hover:shadow-lg hover:shadow-sky-500/30 active:scale-95 cursor-pointer"
            >
              Connect Node
            </button>
          </div>
        </div>
      </nav>

      {/* Background 3D Engine Frame */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-80">
        <Scene />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-24 text-center max-w-6xl mx-auto"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: yTranslate }}
          className="space-y-8 flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={easeOutTransition}
            className="px-4 py-1.5 rounded-full border border-sky-400/20 bg-sky-500/5 text-sky-300 text-xs font-semibold tracking-widest uppercase"
          >
            Spatial Interfaces 2.0
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={delayTransition(0.15)}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none text-gradient-primary"
          >
            Modern Cinematic<br />Experience
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={delayTransition(0.3)}
            className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed"
          >
            An interactive, high-performance interface meticulously crafted with Next.js 16,
            Tailwind CSS v4, and dynamic, glossy WebGL orbital physics.
          </motion.p>

          {/* Interactive buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={delayTransition(0.45)}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="#demo"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-slate-950 font-bold hover:shadow-xl hover:shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Explore Sandbox
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full border border-slate-800 hover:border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900 font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Core Technology
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Sandbox Demo Section */}
      <section id="demo" className="relative z-10 max-w-5xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={easeOutTransition}
          className="glass rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center md:text-left space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Interactive Playground</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Client-State Sandbox</h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Interact with state controls to experience zero-latency updates synchronized with WebGL environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Control Left Side */}
            <div className="md:col-span-1 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Interactive Tab Toggle
                </label>
                <div className="flex flex-col space-y-2">
                  {(['visuals', 'performance', 'experience'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab)
                        triggerNotification(`Switched environment state to: ${tab}`)
                      }}
                      className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Panel and custom Slider Right Side */}
            <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeTab === 'visuals' && (
                    <motion.div
                      key="visuals"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <h4 className="font-bold text-sky-300">Advanced Visual Fidelity</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Rendering highly-dense polygons with glossy clearcoats, allowing reflective components to render in real-time under standard spotlight rigs.
                      </p>
                    </motion.div>
                  )}
                  {activeTab === 'performance' && (
                    <motion.div
                      key="performance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <h4 className="font-bold text-purple-400">Headless Performance Matrix</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Optimized to completely prevent CPU ReadPixels stalling. Safe execution on software OpenGL environments ensures rendering never drops frames.
                      </p>
                    </motion.div>
                  )}
                  {activeTab === 'experience' && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <h4 className="font-bold text-pink-400">Sub-surface Integration</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Fluid user layout transitions synchronized with Framer Motion ease curves create a perfectly unified and futuristic feel.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Slider Controls */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span className="uppercase tracking-wider">Dynamic Force Multiplier</span>
                  <span className="font-mono text-sky-400">{customValue}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={customValue}
                  onChange={(e) => setCustomValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid / Bento Grid Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto py-24 px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Next-Gen Architecture</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Engineered For Innovation</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Discover the technologies fueling modern WebGL experiences, without sacrificing responsiveness or visual depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={delayTransition(i * 0.15)}
              className="glass p-8 rounded-2xl space-y-6 hover:border-sky-500/20 hover:bg-slate-900/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500/10 transition-all duration-300">
                {feat.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="relative z-10 max-w-5xl mx-auto py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={easeOutTransition}
          className="glass rounded-3xl p-12 md:p-20 relative overflow-hidden"
        >
          {/* Neon mesh background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Ready to transcend the <br />
              <span className="text-gradient-secondary">ordinary web?</span>
            </h2>
            <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed md:text-base">
              Establish connection today and launch reactive 3D portals designed for high-density rendering.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => triggerNotification('Portal initialisation requested...')}
                className="px-8 py-4 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold hover:shadow-lg hover:shadow-sky-400/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Launch App Portal
              </button>
              <button
                onClick={() => triggerNotification('Documentation node established...')}
                className="px-8 py-4 rounded-full border border-slate-800 hover:border-slate-700 bg-white/5 hover:bg-white/10 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Access Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
                S
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                SPATIAL.IO
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Developing sensory-level reactive experiences utilizing the industry&apos;s leading high-performance rendering components.
            </p>
          </div>

          {/* Links 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-sky-400 transition-colors">Spatial Sandbox</a></li>
              <li><a href="#features" className="hover:text-sky-400 transition-colors">Core Physics</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Release Notes</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Developer</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Performance Tuning</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Open Source</a></li>
            </ul>
          </div>

          {/* Newsletter mockup */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Stay Synced</h4>
            <p className="text-xs text-slate-500">
              Receive live telemetry diagnostics and architectural updates directly to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                triggerNotification('Successfully joined the telemetry dispatch!')
              }}
              className="flex gap-2"
            >
              <input
                required
                type="email"
                placeholder="node@spatial.io"
                className="bg-white/5 border border-white/5 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-400/40 w-full"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/5 py-8 text-center text-xs text-slate-600">
          <p>© 2026 SPATIAL.IO. Engineered with physical WebGL orbital precision. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Interactive Toast/Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 glass px-6 py-3 rounded-full text-xs font-semibold text-sky-400 shadow-xl flex items-center space-x-3"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
