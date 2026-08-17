'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm font-medium text-indigo-300 tracking-wider uppercase">Loading 3D Engine...</span>
      </div>
    </div>
  )
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneProps>({
    shape: 'torusKnot',
    color: '#6366f1',
    wireframe: false,
    speed: 1,
    scale: 1,
    roughness: 0.2,
    metalness: 0.8,
  })

  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  const presetColors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#a855f7']

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background WebGL Canvas Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneConfig} />
      </div>

      {/* Modern Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-slate-950/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              AURA <span className="text-gradient-primary">3D</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Live Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Metrics</a>
          </div>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 transition-all shadow-md backdrop-blur-md"
          >
            Launch Studio
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            Next-Gen WebGL 3D Interactive Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-8"
          >
            Transform Digital <br />
            <span className="text-gradient-primary">Dimensions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Immerse your users in an ethereal modern interface built with real-time WebGL rendering, smooth Framer Motion animations, and fluid state management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore Interactive Studio
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl glass hover:bg-white/10 text-slate-200 font-semibold border border-white/15 transition-all"
            >
              Learn Architecture
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Live 3D Scene Customizer */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Interactive <span className="text-gradient-primary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Manipulate the real-time background WebGL viewport directly from the UI controls below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-6 sm:p-10 border border-white/10 max-w-4xl mx-auto shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'dodecahedron', label: 'Dodecahedron' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneConfig(prev => ({ ...prev, shape: s.id as SceneProps['shape'] }))}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      sceneConfig.shape === s.id
                        ? 'bg-indigo-600/80 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Material Color
              </label>
              <div className="flex items-center gap-3">
                {presetColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSceneConfig(prev => ({ ...prev, color: col }))}
                    className={`w-9 h-9 rounded-full transition-transform border-2 ${
                      sceneConfig.color === col ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
                <input
                  type="color"
                  value={sceneConfig.color || '#6366f1'}
                  onChange={(e) => setSceneConfig(prev => ({ ...prev, color: e.target.value }))}
                  className="w-9 h-9 rounded-full cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>

            {/* Rotation Speed Control */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneConfig.speed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={sceneConfig.speed || 1}
                onChange={(e) => setSceneConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Scale Control */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Model Scale
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneConfig.scale}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.1"
                value={sceneConfig.scale || 1}
                onChange={(e) => setSceneConfig(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="md:col-span-2 flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <h4 className="text-sm font-semibold text-white">Wireframe Render Mode</h4>
                <p className="text-xs text-slate-400">Display geometry polygons and structural wireframe mesh.</p>
              </div>
              <button
                onClick={() => setSceneConfig(prev => ({ ...prev, wireframe: !prev.wireframe }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Engineered for <span className="text-gradient-primary">Excellence</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Combining cutting-edge graphics frameworks with modern reactive component patterns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "WebGL 2.0 Acceleration",
              desc: "Direct GPU hardware rendering utilizing React Three Fiber for buttery smooth 60+ FPS visuals."
            },
            {
              icon: "🎨",
              title: "Glassmorphic Aesthetics",
              desc: "Layered backdrop blurring and dynamic light interactions creating sophisticated depth."
            },
            {
              icon: "🚀",
              title: "Next.js 16 App Router",
              desc: "Optimized server component architecture with seamless dynamic client hydration."
            },
            {
              icon: "✨",
              title: "Custom Interactive Cursor",
              desc: "Smooth spring-animated cursor follower with intelligent contextual hover feedback."
            },
            {
              icon: "🌀",
              title: "Scroll Dynamics",
              desc: "Fluid parallax transforms and view-triggered entrance animations powered by Framer Motion."
            },
            {
              icon: "📱",
              title: "Responsive Perfection",
              desc: "Adaptive viewport scaling tailored for ultra-wide displays down to mobile screens."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card glass-hover rounded-2xl p-8 flex flex-col items-start border border-white/5"
            >
              <div className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/10 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-10 border border-indigo-500/20 shadow-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "60+", label: "FPS Render Speed" },
              { val: "<0.1s", label: "State Sync Latency" },
              { val: "100%", label: "TypeScript Coverage" },
              { val: "99+", label: "Lighthouse Score" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black text-gradient-primary mb-2">{stat.val}</span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA / Newsletter */}
      <section className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 sm:p-14 border border-white/10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Stay Ahead of the <span className="text-gradient-primary">Curve</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base mb-8">
            Subscribe to receive updates on upcoming 3D WebGL features and design system templates.
          </p>

          {emailSubmitted ? (
            <div className="p-4 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-sm font-medium">
              {"\u2713"} Thank you for subscribing! We&apos;ll keep you posted.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>— Next-Gen Interface Experience</span>
          </div>
          <p>© 2026 Aura 3D Platform. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
