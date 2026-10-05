'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  Sliders,
  ChevronRight,
  ArrowRight,
  Code2,
  Box,
  Share2,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  ),
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1,
    scale: 1,
    wireframe: false,
  })

  const shapes: Array<{ id: SceneConfig['shape']; label: string }> = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'dodecahedron', label: 'Dodecahedron' },
    { id: 'torus', label: 'Ring' },
  ]

  const colorPresets = [
    { name: 'Indigo Core', value: '#6366f1' },
    { name: 'Cyan Pulse', value: '#38bdf8' },
    { name: 'Neon Purple', value: '#c084fc' },
    { name: 'Emerald Wave', value: '#34d399' },
    { name: 'Ruby Glow', value: '#f43f5e' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500/30">
      {/* Dynamic 3D WebGL Canvas Layer */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Decorative Glow Elements */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0 animate-glow" />
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Fixed Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              AURA<span className="text-gradient-primary">3D</span>
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#studio" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Tech Specs
            </a>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 border border-slate-700/80 hover:bg-slate-800/80 transition-all"
            >
              Open Studio
            </a>
            <a
              href="#subscribe"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Get Access
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 border-b border-slate-800 px-6 py-6 flex flex-col gap-4"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Overview
              </a>
              <a
                href="#studio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                3D Studio
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Features
              </a>
              <a
                href="#specs"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Tech Specs
              </a>
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="#subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-indigo-600 font-semibold text-sm text-white"
                >
                  Get Access
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs md:text-sm font-medium text-indigo-300 mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation Interactive 3D Web Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]"
        >
          Immersive Design <br />
          <span className="text-gradient-primary">In Three Dimensions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-slate-400 text-lg md:text-2xl max-w-3xl mb-12 leading-relaxed"
        >
          Experience real-time interactive WebGL graphics combined with sleek glassmorphism,
          lightning-fast rendering, and intuitive customization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 group"
          >
            <span>Customize Scene</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass border border-slate-700/80 hover:bg-slate-800/60 font-semibold rounded-2xl text-slate-200 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Explore Features</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        >
          <span>Scroll to customize</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-700 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' as const }}
              className="w-1.5 h-2.5 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio */}
      <section id="studio" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5" />
                <span>Real-Time Controller</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                Interactive 3D Studio
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                Modify WebGL geometry parameters on the fly. Watch shaders, geometry mesh positions, and metallic reflection parameters adjust dynamically in real time.
              </p>

              {/* Control Panel Grid */}
              <div className="space-y-6">
                {/* Shape Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Geometry Mesh
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {shapes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSceneConfig((prev) => ({ ...prev, shape: s.id }))}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                          sceneConfig.shape === s.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Preset Palette */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Color Palette
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorPresets.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setSceneConfig((prev) => ({ ...prev, color: c.value }))}
                        className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          sceneConfig.color === c.value
                            ? 'bg-slate-800 border-indigo-500 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: c.value }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders: Speed & Scale */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      <span>Rotation Speed</span>
                      <span className="text-indigo-400">{sceneConfig.speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={sceneConfig.speed}
                      onChange={(e) =>
                        setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                      }
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      <span>Mesh Scale</span>
                      <span className="text-indigo-400">{sceneConfig.scale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.1"
                      value={sceneConfig.scale}
                      onChange={(e) =>
                        setSceneConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
                      }
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Wireframe Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))
                    }
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      sceneConfig.wireframe
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${
                        sceneConfig.wireframe ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-600'
                      }`}
                    >
                      {sceneConfig.wireframe && '✓'}
                    </div>
                    <span>Wireframe Render Mode</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Config Output Card */}
            <div className="w-full lg:w-80 glass rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Live State Matrix</span>
              </div>
              <pre className="text-xs font-mono bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-indigo-300 overflow-x-auto">
{JSON.stringify(sceneConfig, null, 2)}
              </pre>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-500 flex items-center justify-between">
                <span>FPS: <strong className="text-emerald-400 font-mono">60</strong></span>
                <span>Renderer: <strong className="text-slate-300 font-mono">WebGL2</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Architected for <span className="text-gradient-secondary">Performance</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Built with modern web technologies that combine high-speed rendering with responsive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Acceleration',
              desc: 'Leverages GPU hardware pipelines via WebGL for fluid 60fps 3D rendering without lagging UI interactions.',
              color: 'text-indigo-400',
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Layered backdrop filters, frosted glass overlays, and dynamic lighting create physical depth.',
              color: 'text-purple-400',
            },
            {
              icon: Zap,
              title: 'Next.js 16 Turbopack',
              desc: 'Powered by Next.js App Router and React 19 server components for fast load times.',
              color: 'text-amber-400',
            },
            {
              icon: ShieldCheck,
              title: 'Type-Safe Architecture',
              desc: 'Strict TypeScript typing across Three.js canvas props and Framer Motion animation triggers.',
              color: 'text-emerald-400',
            },
            {
              icon: Globe,
              title: 'Cross-Device Smoothness',
              desc: 'Responsive layouts adapt seamlessly to mobile, tablet, and high-resolution displays.',
              color: 'text-sky-400',
            },
            {
              icon: Sparkles,
              title: 'Spring Animations',
              desc: 'Physics-based spring dynamics powered by Framer Motion for natural interactive feel.',
              color: 'text-rose-400',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Specs / Metrics Section */}
      <section id="specs" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-0 lg:divide-x divide-slate-800">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-gradient-primary font-mono mb-2">
                60 FPS
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Target Frame Rate
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-gradient-secondary font-mono mb-2">
                &lt; 50ms
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Interaction Latency
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-indigo-400 font-mono mb-2">
                100%
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Type Safe TypeScript
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold text-purple-400 font-mono mb-2">
                WebGL2
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                3D Graphic Pipeline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action / Newsletter Section */}
      <section id="subscribe" className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="glass-card rounded-3xl p-10 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Ready to Build Next-Gen Experiences?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Subscribe to receive updates on upcoming WebGL components, performance optimizations, and design system templates.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed"}! We&apos;ll keep you in the loop.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-200">AURA 3D</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
