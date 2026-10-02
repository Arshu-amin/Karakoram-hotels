'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Share2,
  Globe,
  Code2
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm font-medium">Loading 3D Canvas...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<'torus' | 'icosahedron' | 'dodecahedron'>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter Form State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorOptions = [
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Purple', hex: '#a855f7' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' }
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: "60 FPS WebGL Rendering",
      desc: "Hardware-accelerated 3D visuals powered by Three.js and React Three Fiber with zero layout shift."
    },
    {
      icon: <Box className="w-6 h-6 text-purple-400" />,
      title: "Real-Time Customization",
      desc: "Instant react-state reflection onto 3D materials, geometry shapes, rotation velocity, and wireframe modes."
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: "Glassmorphism UI",
      desc: "Sophisticated multi-layered backdrop blur surfaces, neon gradient accents, and spring cursor feedback."
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "Next.js App Router",
      desc: "Built with Next.js Turbopack, React 19, and full static / server component optimizations."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Type-Safe Architecture",
      desc: "End-to-end TypeScript code standard with strict ESLint and zero runtime reflection bugs."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Scroll-Driven Motion",
      desc: "Fluid Framer Motion entrance animations, micro-interactions, and staggered viewport triggers."
    }
  ]

  const stats = [
    { value: "99.9%", label: "Uptime Reliability" },
    { value: "<15ms", label: "Render Frame Latency" },
    { value: "100%", label: "Responsive Layout" },
    { value: "4.9/5", label: "Developer Experience" }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-auto">
        <Scene
          color={color}
          speed={speed}
          scale={scale}
          shape={shape}
          wireframe={wireframe}
        />
      </div>

      {/* Glass Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
            A
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Aura<span className="text-indigo-400">3D</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
          <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#stats" className="hover:text-indigo-400 transition-colors">Stats</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#customizer"
            className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 active:scale-95"
          >
            Launch Studio
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-indigo-500/20"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-slate-300">
            Next-Gen Interactive Web Graphics
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl mb-6 leading-tight"
        >
          Immersive Web <br />
          <span className="text-gradient-primary">3D Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-10 font-light leading-relaxed"
        >
          Engineered with React 19, Three.js, and Framer Motion for high-impact visual storytelling and fluid interactivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Customize 3D Object
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 glass hover:bg-slate-800/80 text-slate-200 font-semibold rounded-full border border-slate-700/60 transition-all transform hover:scale-105 active:scale-95"
          >
            Explore Tech Stack
          </a>
        </motion.div>
      </section>

      {/* Interactive 3D Studio Panel */}
      <section id="customizer" className="relative z-10 max-w-6xl mx-auto py-24 px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sliders className="w-3.5 h-3.5" /> Real-time Control
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Interactive 3D Studio
          </motion.h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Tweak shape properties, mesh physics, rotation speed, and hue parameters in real-time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Geometry Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Geometry Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torus', name: 'Torus' },
                  { id: 'icosahedron', name: 'Icosa' },
                  { id: 'dodecahedron', name: 'Dodeca' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id as 'torus' | 'icosahedron' | 'dodecahedron')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      shape === s.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Material Tint
              </label>
              <div className="flex items-center gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.hex}
                    onClick={() => setColor(opt.hex)}
                    style={{ backgroundColor: opt.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      color === opt.hex
                        ? 'scale-125 border-white shadow-md'
                        : 'border-transparent opacity-80 hover:opacity-100 hover:scale-110'
                    }`}
                    title={opt.label}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Rotation Velocity
                </label>
                <span className="text-xs text-indigo-400 font-mono font-bold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Scale & Wireframe */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Object Scale
                </label>
                <span className="text-xs text-indigo-400 font-mono font-bold">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.5"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-2"
              />
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`py-1.5 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  wireframe
                    ? 'bg-purple-600 border-purple-400 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Wireframe: {wireframe ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Built for High-Performance Web
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Combining cutting-edge WebGL graphics with seamless frontend component architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card p-8 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all group"
            >
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 w-fit mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics / Stats Section */}
      <section id="stats" className="relative z-10 max-w-6xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 border border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold text-gradient-primary mb-2">
                {stat.value}
              </span>
              <span className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Newsletter / Interactive CTA */}
      <section className="relative z-10 max-w-4xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-14 border border-slate-800/80 relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Stay Ahead in Web3D
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Get exclusive updates on WebGL shader techniques, 3D interaction patterns, and performance recipes.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {"\u2713 Subscribed! Check your inbox for updates."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-100 text-sm placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-12 px-6 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <span className="font-semibold text-slate-300">Aura 3D Platform</span>
          </div>

          <p className="text-center md:text-left text-xs">
            © 2026 Aura 3D. Crafted with Next.js 16, React 19, & Three.js.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors" title="Global Network">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors" title="Source Code">
              <Code2 className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors" title="Share Experience">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
