'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Globe,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Sliders,
  Box,
  Check,
  ArrowRight,
  Share2,
  Code2,
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        <span className="text-xs text-slate-400 font-mono tracking-wider">
          INITIALIZING WEBGL 3D SCENE...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Interactive Controls
  const [shape, setShape] = useState<'torusKnot' | 'sphere' | 'icosahedron' | 'cube'>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)

  // Subscription state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95])

  const colorPresets = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b' },
  ]

  const shapePresets: Array<{ id: 'torusKnot' | 'sphere' | 'icosahedron' | 'cube'; label: string }> = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'sphere', label: 'Orb' },
    { id: 'icosahedron', label: 'Crystal' },
    { id: 'cube', label: 'Matrix' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background Fixed 3D Scene Layer */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-70">
        <Scene shape={shape} color={color} speed={speed} scale={scale} />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 border border-slate-800/80 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-white transition-colors">
              Customizer
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#metrics" className="hover:text-white transition-colors">
              Performance
            </a>
            <a href="#community" className="hover:text-white transition-colors">
              Community
            </a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Launch Studio
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner"
        >
          <Zap className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>Next-Gen Spatial Interface Framework</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-8 text-gradient-primary"
        >
          Immersive 3D <br />
          Modern Web
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-12"
        >
          Elevate your user experience with real-time WebGL rendering, continuous fluid
          animations, dynamic lighting, and seamless interactive spatial DOM controls.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Interactive Customizer</span>
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all border border-slate-700/60"
          >
            Explore Ecosystem
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase opacity-70"
        >
          <span>Scroll To Explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-600 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-indigo-400" />
          </div>
        </motion.div>
      </motion.section>

      {/* 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 glass p-8 sm:p-10 rounded-3xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-6">
                <Sliders className="h-4 w-4" />
                <span>LIVE WEBGL DOM CONTROLS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gradient-secondary">
                Customize 3D Object in Real-Time
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                Interact with parameters directly in the browser. Watch the dynamic physical shader
                materials, geometric topologies, and lighting respond instantly to DOM inputs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Geometry</div>
                  <div className="text-sm font-bold text-slate-200 capitalize">{shape}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Render Engine</div>
                  <div className="text-sm font-bold text-slate-200">WebGL 2.0</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-96 glass p-8 rounded-3xl border border-slate-800 space-y-6"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Sliders className="h-5 w-5 text-indigo-400" />
              <span>Studio Controls</span>
            </h3>

            {/* Shape Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setShape(preset.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      shape === preset.id
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Material Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setColor(preset.value)}
                    style={{ backgroundColor: preset.value }}
                    title={preset.label}
                    className={`h-9 w-full rounded-xl transition-all transform hover:scale-110 flex items-center justify-center ${
                      color === preset.value ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105' : ''
                    }`}
                  >
                    {color === preset.value && <Check className="h-4 w-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rotation Speed
                </label>
                <span className="text-xs font-mono text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Object Scale
                </label>
                <span className="text-xs font-mono text-indigo-400">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-gradient-primary">
            Engineered for Modern Web
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Combines state-of-the-art WebGL 3D graphics with high performance Next.js Server Components
            and smooth Framer Motion interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Accelerated',
              description: 'Utilizes WebGL 2.0 and Three.js physical shader materials for maximum GPU acceleration.',
              color: 'from-blue-500 to-indigo-500',
            },
            {
              icon: Zap,
              title: '60 FPS Performance',
              description: 'Optimized rendering loop with efficient memory management and light geometry foot-print.',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Layers,
              title: 'Glassmorphism Design',
              description: 'Frosted blur filters, subtle border highlights, and dark modern color palettes.',
              color: 'from-cyan-500 to-blue-500',
            },
            {
              icon: Globe,
              title: 'Universal Compatibility',
              description: 'Fully responsive dynamic viewport adjustments across desktop, tablet, and mobile browsers.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: ShieldCheck,
              title: 'Type-Safe Architecture',
              description: 'Strict TypeScript interfaces and clean ESLint rule adherence throughout component tree.',
              color: 'from-amber-500 to-orange-500',
            },
            {
              icon: Sparkles,
              title: 'Spring Micro-Interactions',
              description: 'Custom physics-based mouse cursor followers and scroll-driven parallax transitions.',
              color: 'from-rose-500 to-purple-500',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
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
          transition={{ duration: 0.7 }}
          className="glass p-10 sm:p-14 rounded-3xl border border-slate-800 glow-primary"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Target Frame Rate', value: '60 FPS' },
              { label: 'Interaction Latency', value: '< 16ms' },
              { label: 'Build Optimizations', value: '100%' },
              { label: 'Responsive Viewports', value: 'Seamless' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl sm:text-5xl font-black tracking-tight text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section id="community" className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass p-10 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden"
        >
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Stay Updated with 3D Web Tech
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join our newsletter to receive updates on WebGL shaders, Three.js techniques, and spatial UI component releases.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribed}
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              {subscribed ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900/80 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-200">AURA 3D</span>
            <span className="text-slate-600">|</span>
            <span>Next.js 16 WebGL Experience</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#customizer" className="hover:text-slate-200 transition-colors">
              Customizer
            </a>
            <a href="#features" className="hover:text-slate-200 transition-colors">
              Features
            </a>
            <a href="#metrics" className="hover:text-slate-200 transition-colors">
              Metrics
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Globe className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Code2 className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Share2 className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </main>
  )
}
