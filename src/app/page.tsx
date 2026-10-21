'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Box,
  Layers,
  Sliders,
  Palette,
  RotateCw,
  Globe,
  Share2,
  Code2,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Activity,
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 text-sm animate-pulse">
      Loading 3D Canvas...
    </div>
  ),
})

const COLOR_OPTIONS = [
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Cyan', value: '#38bdf8' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Rose', value: '#f43f5e' },
]

const SHAPE_OPTIONS: { label: string; value: ShapeType }[] = [
  { label: 'Torus Knot', value: 'torusKnot' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Octahedron', value: 'octahedron' },
  { label: 'Torus', value: 'torus' },
  { label: 'Sphere', value: 'sphere' },
]

export default function Home() {
  // Customizer State
  const [color, setColor] = useState('#6366f1')
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [speed, setSpeed] = useState(2)
  const [distort, setDistort] = useState(0.4)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene
          color={color}
          shape={shape}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
      </div>

      {/* Top Fixed Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Playground
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Tech Specs
            </a>
            <a href="#subscribe" className="hover:text-indigo-400 transition-colors">
              Subscribe
            </a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Studio</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="overview"
        className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center scroll-mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>Next-Gen WebGL Experience v2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl leading-tight mb-8"
        >
          Crafting Digital Worlds with{' '}
          <span className="text-gradient-primary">3D Precision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          An interactive digital interface seamlessly combining dynamic WebGL shaders,
          smooth spring physics, and modern glassmorphic UI architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg"
          >
            <span>Customize 3D Canvas</span>
            <ChevronRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass border border-slate-700/80 hover:bg-slate-800/80 font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-slate-200 text-lg"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Floating Quick Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full"
        >
          {[
            { icon: Gauge, label: '60 FPS WebGL', sub: 'Smooth Rendering' },
            { icon: Cpu, label: 'React 19 Core', sub: 'Next.js 16 Turbo' },
            { icon: Layers, label: 'Glassmorphism', sub: 'Frosted Aesthetic' },
            { icon: Sliders, label: 'Real-Time Sync', sub: 'DOM to 3D State' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-card flex flex-col items-center text-center"
            >
              <item.icon className="w-6 h-6 text-indigo-400 mb-2" />
              <div className="font-semibold text-slate-200 text-sm">{item.label}</div>
              <div className="text-xs text-slate-500">{item.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Section */}
      <section
        id="customizer"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Real-Time Playground
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-secondary">
            Interactive 3D Studio Controls
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Modify 3D geometry parameters in real time. Experience low-latency state updates
            reflected dynamically on the WebGL canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass border border-slate-800 shadow-2xl space-y-8"
          >
            {/* Shape Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Select Mesh Geometry</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHAPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setShape(opt.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left border ${
                      shape === opt.value
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Color Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Material Color</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border-2 ${
                      color === c.value
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-cyan-400" />
                  Rotation Speed
                </span>
                <span className="text-indigo-400">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Distortion Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-pink-400" />
                  Mesh Distortion
                </span>
                <span className="text-indigo-400">{distort.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Wireframe Overlay
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Live Viewport Preview Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 h-[450px] sm:h-[520px] rounded-3xl glass border border-slate-800 relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl"
          >
            {/* Viewport Header overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-slate-700/50">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-mono">
                  WebGL Viewport Active
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500 glass px-3 py-1.5 rounded-full border border-slate-700/50">
                Mesh: {shape}
              </div>
            </div>

            {/* Center Hint */}
            <div className="self-center text-center pointer-events-none z-10 opacity-60">
              <p className="text-xs text-slate-400 font-mono">
                Click &amp; drag to rotate canvas camera
              </p>
            </div>

            {/* Viewport Footer status */}
            <div className="flex flex-wrap items-center justify-between gap-2 z-10 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
              <div>Color: {color}</div>
              <div>Speed: {speed}x</div>
              <div>Distortion: {distort}</div>
              <div>Wireframe: {wireframe ? 'ON' : 'OFF'}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Built For Performance
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-primary">
            Engineered for Modern Web
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Combining state-of-the-art WebGL acceleration with modern front-end design patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'Dynamic WebGL Shaders',
              desc: 'Custom physical materials, noise distortion, and particle fields compiled for maximum GPU performance.',
            },
            {
              icon: Zap,
              title: '60 FPS Fluid Motion',
              desc: 'Silky smooth spring physics powered by Framer Motion and Three.js requestAnimationFrame loops.',
            },
            {
              icon: Shield,
              title: 'Type-Safe Architecture',
              desc: 'Strict TypeScript coverage, React 19 concurrent features, and zero runtime hydration issues.',
            },
            {
              icon: Box,
              title: 'Glassmorphism Aesthetics',
              desc: 'Frosted translucent backdrop blurs, refined borders, and glowing gradient highlight cards.',
            },
            {
              icon: Sliders,
              title: 'Reactive State Sync',
              desc: 'Instant bidirectional synchronization between UI control inputs and WebGL render targets.',
            },
            {
              icon: Layers,
              title: 'Tailwind CSS v4 Styling',
              desc: 'Next-generation utility CSS engine offering instantaneous build times and minimal CSS bundle sizes.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-card flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-indigo-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <span>Learn more</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Specs & Architecture Section */}
      <section
        id="specs"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="p-8 sm:p-12 rounded-3xl glass border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
                Technical Highlights
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                High Performance Web Architecture
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Built from the ground up to leverage Next.js App Router, Turbopack, and WebGL2.
                Optimized frame rendering ensures steady 60 FPS even on mobile devices.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Zero layout shift hydration with dynamic SSR fallback',
                  'High-contrast physical shader material pipeline',
                  'Spring-animated interactive micro-interactions',
                  'Accessibility compliant custom interactive states',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { number: '60 FPS', label: 'Frame Rate', sub: 'WebGL 2 Acceleration' },
                { number: '<16ms', label: 'Input Latency', sub: 'Interactive Physics' },
                { number: '100%', label: 'Type Safe', sub: 'TypeScript Strict Mode' },
                { number: '3.2 KB', label: 'CSS Overhead', sub: 'Tailwind Engine' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl glass-card text-center flex flex-col justify-center"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-slate-200 font-semibold text-sm">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription CTA Section */}
      <section
        id="subscribe"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center scroll-mt-20"
      >
        <div className="p-8 sm:p-16 rounded-3xl glass border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Stay Connected
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-primary mb-4">
            Join the Next Era of Web Design
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base">
            Subscribe to receive updates on upcoming WebGL components, 3D design templates, and performance optimizations.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{"\u2713"} You have successfully joined our insider list!</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900/80 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-500 text-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-200">Aura 3D Studio</span>
          </div>

          <div className="flex gap-6 text-slate-400">
            <a href="#overview" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Specs
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="p-2 rounded-full glass hover:text-indigo-400 transition-colors" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full glass hover:text-indigo-400 transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full glass hover:text-indigo-400 transition-colors" aria-label="Source Code">
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900/60 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Aura 3D Studio. Built with Next.js, Three.js, and Tailwind CSS.
        </div>
      </footer>
    </main>
  )
}
