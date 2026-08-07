'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamically import Scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#020617] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

type ShapeType = 'torus' | 'sphere' | 'box' | 'icosahedron'

export default function Home() {
  // Real-time WebGL control state variables
  const [shape, setShape] = useState<ShapeType>('torus')
  const [speed, setSpeed] = useState<number>(1.0)
  const [scale, setScale] = useState<number>(1.1)
  const [color, setColor] = useState<string>('#6366f1')
  const [metalness, setMetalness] = useState<number>(0.9)
  const [roughness, setRoughness] = useState<number>(0.1)

  // Subscription email state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Global window-level scroll monitoring (avoids SSR and ref hydration problems)
  const { scrollYProgress } = useScroll()

  // Use scroll transforms to make sections move gracefully
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.85, 0.6, 0.45])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-[#f8fafc] overflow-x-hidden">
      {/* Background 3D Scene */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: sceneOpacity }}
      >
        <Scene
          shape={shape}
          speed={speed}
          scale={scale}
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </motion.div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Navigation Bar */}
        <header className="fixed top-0 left-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 animate-pulse" />
              <span className="text-xl font-bold tracking-wider text-gradient-primary">
                Aura 3D
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#controls" className="hover:text-white transition-colors">Interactive Lab</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#cta" className="hover:text-white transition-colors">Get Started</a>
            </nav>
            <a
              href="#controls"
              className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25"
            >
              Enter Lab
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-4 pt-20"
        >
          <motion.div
            style={{ scale: heroScale, y: heroTranslateY }}
            className="text-center max-w-4xl glass p-12 md:p-20 rounded-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' as const }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">
                Welcome to Next-Gen Interaction
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              Design Beyond{' '}
              <span className="text-gradient-secondary">Dimensions</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Experience a gorgeous, hyper-customizable WebGL simulation engineered for maximum performance and gorgeous visual fidelity.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <a
                href="#controls"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/30 text-center"
              >
                Launch Interaction Lab
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 border border-slate-700 hover:bg-slate-800/80 rounded-full font-semibold transition-all text-center"
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </section>

        {/* Real-time Interaction Lab (Controls) */}
        <section
          id="controls"
          className="py-32 px-4 max-w-6xl mx-auto w-full"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Interaction <span className="text-gradient-primary">Lab</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Directly manipulate the WebGL 3D environment behind this layout using the parameters below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel */}
            <div className="lg:col-span-7 glass p-8 md:p-10 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-indigo-300 border-b border-slate-800 pb-4">
                  Shape Controllers
                </h3>

                {/* Shape Selector Buttons */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold tracking-wide uppercase text-slate-400 mb-4">
                    Active Geometry
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['torus', 'sphere', 'box', 'icosahedron'] as ShapeType[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`py-3 px-4 rounded-xl font-medium text-sm transition-all capitalize border ${
                          shape === s
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Numeric Controls / Sliders */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                        Rotation Speed
                      </label>
                      <span className="text-indigo-300 font-mono text-sm">{speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                        Object Scale
                      </label>
                      <span className="text-indigo-300 font-mono text-sm">{scale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                        Metalness Reflection
                      </label>
                      <span className="text-indigo-300 font-mono text-sm">{(metalness * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={metalness}
                      onChange={(e) => setMetalness(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold tracking-wide uppercase text-slate-400">
                        Surface Roughness
                      </label>
                      <span className="text-indigo-300 font-mono text-sm">{(roughness * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={roughness}
                      onChange={(e) => setRoughness(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Color Picker Control */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <label className="block text-sm font-semibold tracking-wide uppercase text-slate-400 mb-3">
                  Material Base Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-14 h-14 rounded-xl border border-slate-800 cursor-pointer bg-slate-950"
                  />
                  <div>
                    <p className="font-semibold text-white">{color.toUpperCase()}</p>
                    <p className="text-xs text-slate-400">Click color square to pick custom hue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory / Context Card */}
            <div className="lg:col-span-5 glass p-8 md:p-10 rounded-2xl flex flex-col justify-between border-indigo-500/20">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 uppercase tracking-wider">
                  Real-time Synchronization
                </span>
                <h4 className="text-2xl font-bold mt-4 mb-4 text-white">
                  WebGL Direct Link
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Unlike traditional components, these configurations immediately pass to the Three.js canvas layer operating behind the DOM. You are directly altering shader values and geometry calculations.
                </p>

                <div className="space-y-4">
                  {[
                    'No GPU rendering stalls',
                    'Zero layout lag or WebGL context recreation',
                    'Physical clearcoat & custom reflection shaders',
                    'Smooth-spring tracked animated responses',
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-extrabold">
                        {'\u2713'}
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                <p className="text-xs text-indigo-300/90 leading-relaxed font-mono">
                  State parameters are reactive. Adjust a value above, and observe the main 3D shape instantly transition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section
          id="features"
          className="relative py-32 px-4 max-w-7xl mx-auto w-full"
        >
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Modern <span className="text-gradient-secondary">Architecture</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Building next-gen user interfaces requires a state-of-the-art tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High Performance 3D',
                desc: 'Utilizing Three.js and React Three Fiber to achieve smooth 60fps animations. Rendered with custom lighting and reflections.',
                gradient: 'from-pink-500 to-indigo-500',
              },
              {
                title: 'Modern Tech Stack',
                desc: 'Power-packed with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion for beautiful page transitions and reactive styles.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Glassmorphic UI',
                desc: 'A gorgeous aesthetics featuring frosted glass panels, custom interactive hover effects, and linear gradient highlights.',
                gradient: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${feature.gradient}`} />
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call To Action / Newsletter Subscription */}
        <section
          id="cta"
          className="py-32 px-4 max-w-4xl mx-auto w-full text-center"
        >
          <div className="glass p-12 md:p-20 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-30 pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to <span className="text-gradient-primary">Elevate</span> Your Brand?
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Subscribe to our exclusive tech newsletter to receive the latest updates, design mockups, and premium 3D assets.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex flex-col items-center gap-3 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg font-bold">
                  {'\u2713'}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Subscription Successful!</h4>
                  <p className="text-xs text-slate-400 mt-1">Thank you for joining Aura 3D.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-5 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 border-t border-slate-900/50 bg-[#020617]/80 backdrop-blur-md text-center text-slate-500 text-sm z-20">
          <p className="mb-2">© 2026 Aura 3D Platform. All rights reserved.</p>
          <p className="text-xs text-slate-600">Engineered with Next.js, Tailwind CSS, Three.js & Framer Motion.</p>
        </footer>
      </div>
    </main>
  )
}
