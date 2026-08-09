'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Define dynamic Scene component with ssr: false to prevent Next.js hydration mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/25 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  // Configurable states for WebGL scene interactivity
  const [shape, setShape] = useState<'torusKnot' | 'sphere' | 'box'>('torusKnot')
  const [speed, setSpeed] = useState<number>(1.5)
  const [scale, setScale] = useState<number>(1.2)
  const [color, setColor] = useState<string>('#4f46e5')

  // Newsletter subscription states
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Motion properties declared first before early-return statements
  const { scrollY } = useScroll()

  // Dynamic transforms based on window scroll progress
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, -50])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  const handleResetControls = () => {
    setShape('torusKnot')
    setSpeed(1.5)
    setScale(1.2)
    setColor('#4f46e5')
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Background 3D Canvas Scene - fixed position */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <Scene shape={shape} speed={speed} scale={scale} color={color} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' as const }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-medium text-sm mb-6 uppercase tracking-wider backdrop-blur-sm">
              ✨ Next-Generation 3D Showcase
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' as const }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-none"
          >
            <span className="text-gradient-primary">Aura3D</span>
            <br />
            <span className="text-gradient-secondary">Interactive World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Experience dynamic WebGL graphics integrated seamlessly with modern UI controls. Customize, shape, and command the atmosphere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#controls"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              Control Scene
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium rounded-full transition-all duration-300 backdrop-blur-sm text-center"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 gap-1.5 pointer-events-none"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2 bg-indigo-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Control Customizer Dashboard Section */}
      <section id="controls" className="relative z-10 max-w-5xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title & Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Atmosphere Core</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Customize Your <span className="text-indigo-300">3D Artifact</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Tweak parameters in real-time. Notice how changes update the WebGL geometry immediately. High performance, zero lag.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetControls}
                  className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
                >
                  Reset Parameters
                </button>
              </div>
            </div>

            {/* Inputs & Controls Dashboard */}
            <div className="lg:col-span-7 space-y-8 bg-slate-950/50 p-6 md:p-8 rounded-2xl border border-slate-800">
              {/* Shape Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Select Mesh Shape</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['torusKnot', 'sphere', 'box'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`py-3 px-4 rounded-xl font-medium text-xs transition-all border ${
                        shape === s
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {s === 'torusKnot' ? 'Torus Knot' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider">Rotation Speed</span>
                  <span className="text-indigo-400 font-semibold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                />
              </div>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase tracking-wider">Mesh Dimension</span>
                  <span className="text-indigo-400 font-semibold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                />
              </div>

              {/* Color Picker & Preset Swatches */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Object Theme Color</label>
                <div className="flex flex-wrap gap-3 items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-slate-800 border border-slate-700 outline-none p-0.5"
                  />
                  {['#4f46e5', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map((swatch) => (
                    <button
                      key={swatch}
                      onClick={() => setColor(swatch)}
                      style={{ backgroundColor: swatch }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        color.toLowerCase() === swatch.toLowerCase()
                          ? 'border-white scale-110 shadow-lg shadow-white/10'
                          : 'border-transparent hover:scale-105'
                      }`}
                      aria-label={`Select color swatch ${swatch}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Cutting Edge Features</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6">
            Interactive Ecosystem
          </h2>
          <p className="text-slate-400">
            Powered by Next.js 16 and Tailwind CSS v4 to deliver stunningly fluid, modular environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Next.js 16 Tech",
              desc: "Optimized utilizing Next.js App Router and dynamic client-side SSR components.",
              icon: "🚀"
            },
            {
              title: "GPU Accelerated",
              desc: "Three.js and React Three Fiber powered rendering for realistic materials and animations.",
              icon: "⚡"
            },
            {
              title: "Fluid Animations",
              desc: "Framer Motion transitions providing natural, beautiful interactive responses.",
              icon: "🎨"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-500/25 transition-all"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-indigo-300">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/0 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Form CTA */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden"
        >
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Newsletter</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Stay in the Loop</h2>
            <p className="text-slate-300">
              Subscribe to receive core updates, modern interface templates, and 3D visual component releases.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-slate-900 border border-slate-800 focus:border-indigo-500 text-white placeholder-slate-500 outline-none text-sm transition-all"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-sm"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto p-6 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 space-y-2"
            >
              <div className="text-3xl">{"\u2713"}</div>
              <p className="font-semibold text-lg text-white">Subscription Successful!</p>
              <p className="text-sm text-indigo-200/80">Thank you for joining. Welcome to Aura3D ecosystem!</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900/50 bg-slate-950/80 backdrop-blur-md text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-semibold text-slate-400 tracking-wider">AURA3D</p>
          <p>© 2026 Aura3D Web Experience. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
