'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

export default function Home() {
  // 3D Scene Controls State
  const [sceneColor, setSceneColor] = useState('#6366f1')
  const [sceneSpeed, setSceneSpeed] = useState(1.0)
  const [sceneScale, setSceneScale] = useState(1.2)
  const [sceneGeometry, setSceneGeometry] = useState<'torusKnot' | 'sphere' | 'torus' | 'octahedron'>('torusKnot')
  const [sceneWireframe, setSceneWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const bgOpacity = useTransform(scrollY, [0, 800], [0.65, 0.35])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
      setTimeout(() => {
        setEmail('')
      }, 3000)
    }
  }

  const geometryPresets = [
    { type: 'torusKnot' as const, label: 'Torus Knot' },
    { type: 'sphere' as const, label: 'Sphere' },
    { type: 'torus' as const, label: 'Torus' },
    { type: 'octahedron' as const, label: 'Octahedron' },
  ]

  const colorPresets = [
    { value: '#6366f1', label: 'Indigo' },
    { value: '#f472b6', label: 'Pink' },
    { value: '#10b981', label: 'Emerald' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#06b6d4', label: 'Cyan' },
  ]

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <Scene
          color={sceneColor}
          speed={sceneSpeed}
          scale={sceneScale}
          geometryType={sceneGeometry}
          wireframe={sceneWireframe}
        />
      </motion.div>

      {/* Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              A
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Aura3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors duration-200">Home</a>
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#controls" className="hover:text-white transition-colors duration-200">Control Center</a>
            <a href="#newsletter" className="hover:text-white transition-colors duration-200">Subscribe</a>
          </nav>

          <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md shadow-indigo-500/10 transition-all duration-300 hover:scale-105 active:scale-95">
            Launch App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 pt-12 pb-24 text-center">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Next Generation Web3D Interface
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-8"
          >
            Experience <br className="hidden md:block" />
            <span className="text-gradient-secondary">Aura3D Motion</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            An interactive, high-performance visual layer built with Next.js 16, Three.js, and fluid Framer Motion animations. Customize in real time below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          >
            <a
              href="#controls"
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 rounded-full font-bold transition-all duration-300 shadow-xl shadow-white/5 hover:scale-105 active:scale-95"
            >
              Interactive Controls
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-slate-700/60 hover:bg-slate-800/40 hover:border-slate-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">Capabilities</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tight text-gradient-primary">
            Engineered for Brilliance
          </p>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Combining the absolute best in hardware-accelerated 3D rendering with a fluid design system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "120 FPS Performance",
              desc: "Engineered with optimized clearcoat physical materials designed to be light on the GPU while maintaining gorgeous reflections.",
              icon: "⚡"
            },
            {
              title: "Reactive Controls",
              desc: "Bind elements dynamically. Tweak colors, modify speed, swap geometries, and enable wireframe settings on the fly.",
              icon: "🎛️"
            },
            {
              title: "Smooth Animations",
              desc: "Powered by Framer Motion and React-Three-Fiber hooks, syncing scroll offsets with component rendering smoothly.",
              icon: "🌀"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-3xl glass-interactive flex flex-col gap-5 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl shadow-inner shadow-indigo-400/10">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Control Center Section */}
      <section id="controls" className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Header Description */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">Live Customization</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              Take the Wheel
            </h3>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Adjust parameters in real-time to watch how the 3D canvas immediately responds. Tweak physical metallic attributes and geometries with instant visual response.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-xs text-indigo-300">✓</span>
                <span className="text-sm text-slate-300">Hardware-accelerated physical rendering</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-xs text-indigo-300">✓</span>
                <span className="text-sm text-slate-300">Zero lag state synchronization</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-xs text-indigo-300">✓</span>
                <span className="text-sm text-slate-300">Responsive layouts across devices</span>
              </div>
            </div>
          </div>

          {/* Interactive panel */}
          <div className="lg:col-span-7">
            <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-lg font-bold mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
                <span>⚙️</span> Scene Parameter Controls
              </h4>

              <div className="space-y-8 text-left">
                {/* Geometry Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Geometry Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {geometryPresets.map((preset) => (
                      <button
                        key={preset.type}
                        onClick={() => setSceneGeometry(preset.type)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          sceneGeometry === preset.type
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Material Theme
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setSceneColor(preset.value)}
                        className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          sceneColor === preset.value
                            ? 'bg-slate-800 border-indigo-400 text-white'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.value }} />
                        {preset.label}
                      </button>
                    ))}
                    <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800 rounded-xl px-3 py-1.5">
                      <input
                        type="color"
                        value={sceneColor}
                        onChange={(e) => setSceneColor(e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <span className="text-xs text-slate-400 font-mono">{sceneColor.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Speed Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Rotation Speed
                      </label>
                      <span className="text-xs font-mono text-indigo-400 font-bold">{sceneSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={sceneSpeed}
                      onChange={(e) => setSceneSpeed(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Scale Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Object Scale
                      </label>
                      <span className="text-xs font-mono text-indigo-400 font-bold">{sceneScale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={sceneScale}
                      onChange={(e) => setSceneScale(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Render as Wireframe
                  </span>
                  <button
                    onClick={() => setSceneWireframe(!sceneWireframe)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      sceneWireframe ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        sceneWireframe ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription / Newsletter Section */}
      <section id="newsletter" className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="glass p-12 md:p-20 rounded-3xl border border-white/5 text-center relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

          <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-4">Stay Connected</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Get exclusive updates
          </h3>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Subscribe to our newsletter to receive feature releases, code tutorials, and exclusive 3D shaders directly in your inbox.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-900/60 border border-slate-800 rounded-full px-6 py-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-bold tracking-wide text-white transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-indigo-400 font-bold text-lg py-4 flex flex-col items-center gap-2"
            >
              <span className="text-3xl">🎉</span>
              Thank you! You have been successfully subscribed.
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-xs shadow-md shadow-indigo-500/20">
              A
            </span>
            <span className="text-base font-bold tracking-tight text-slate-200">
              Aura3D
            </span>
          </div>

          <p className="text-xs text-slate-500 font-light">
            &copy; 2026 Aura3D Inc. Crafted with passion, next-generation 3D capabilities, and modern animations. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
