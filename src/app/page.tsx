'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Box,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Compass,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Eye,
  RefreshCw,
  CheckCircle2,
  Mail,
  Globe,
  Share2,
  Code2,
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />,
})

const SHAPES: { label: string; value: ShapeType }[] = [
  { label: 'Torus Knot', value: 'torusKnot' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Octahedron', value: 'octahedron' },
  { label: 'Torus Ring', value: 'torus' },
  { label: 'Sphere', value: 'sphere' },
]

const COLORS = [
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
]

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(1.5)
  const [distort, setDistort] = useState<number>(0.45)
  const [wireframe, setWireframe] = useState<boolean>(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
      </div>

      {/* Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">
              Performance
            </a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">
              Community
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-8 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          WebGL 2.0 Real-time Rendering Engine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.1]"
        >
          Next-Gen <span className="text-gradient-primary">3D Interactive</span> Visual Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          Transform web applications with immersive WebGL graphics, fluid scroll dynamics,
          and customizable high-performance 3D components built for Next.js 16.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-full font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center gap-3 group"
          >
            Customize 3D Object
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 glass hover:bg-slate-800/80 rounded-full font-semibold text-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-slate-700"
          >
            <Eye className="w-5 h-5 text-indigo-400" />
            Explore Features
          </a>
        </motion.div>
      </section>

      {/* 3D Interactive Customizer Studio Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800/80 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          {/* Ambient Glow background inside card */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            {/* Left Column: Information */}
            <div className="lg:w-1/2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
                <Sliders className="w-3.5 h-3.5" /> Interactive Control Panel
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Live 3D Studio
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
                Interact with the background WebGL canvas in real time. Modify shapes, speed, mesh
                distortion, and colors to see instant updates powered by React Three Fiber.
              </p>

              {/* Control Widgets */}
              <div className="space-y-6">
                {/* Shape Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Geometry Mesh Shape
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SHAPES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setShape(s.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          shape === s.value
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Material Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setColor(c.hex)}
                        title={c.name}
                        className={`w-9 h-9 rounded-full transition-transform ${
                          color === c.hex ? 'scale-125 ring-2 ring-white shadow-lg' : 'hover:scale-110 opacity-80'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <span>Rotation Speed</span>
                      <span className="text-indigo-400">{speed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="4.0"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <span>Mesh Distortion</span>
                      <span className="text-indigo-400">{distort.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1.2"
                      step="0.05"
                      value={distort}
                      onChange={(e) => setDistort(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">Wireframe View Mode</span>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                      wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                        wireframe ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Summary Preview */}
            <div className="lg:w-1/2 w-full glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between h-full min-h-[320px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs font-mono text-slate-400">ACTIVE_RENDER_PIPELINE</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  60 FPS
                </span>
              </div>

              <div className="my-8 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Geometry Type:</span>
                  <span className="font-mono text-indigo-300 font-semibold uppercase">{shape}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Material Color:</span>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-mono text-slate-200">{color}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Render Speed:</span>
                  <span className="font-mono text-slate-200">{speed}x</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Distortion Factor:</span>
                  <span className="font-mono text-slate-200">{distort.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Wireframe Topology:</span>
                  <span className="font-mono text-slate-200">{wireframe ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShape('torusKnot')
                  setColor('#6366f1')
                  setSpeed(1.5)
                  setDistort(0.45)
                  setWireframe(false)
                }}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                Reset Default Parameters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Engineered for <span className="text-gradient-secondary">Modern Web Architecture</span>
          </h2>
          <p className="text-slate-400 text-lg">
            High quality visual components built with performance and elegance at core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Optimized WebGL buffer geometries and shader passes ensuring 60+ FPS performance on mobile & desktop.',
              color: 'text-amber-400',
            },
            {
              icon: Cpu,
              title: 'Next.js 16 Ready',
              desc: 'Seamless dynamic SSR hydration with React 19 compatibility and Turbopack compiler acceleration.',
              color: 'text-indigo-400',
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Modern frosted glass aesthetics with deep backdrops, dynamic shadows, and glowing accent gradients.',
              color: 'text-purple-400',
            },
            {
              icon: Compass,
              title: 'Interactive Physics',
              desc: 'Mouse dynamic lighting, particle float velocities, and real-time mesh distortion effects.',
              color: 'text-cyan-400',
            },
            {
              icon: ShieldCheck,
              title: 'TypeScript Native',
              desc: 'Fully typed props, ESLint compliance, and clean modular component boundaries.',
              color: 'text-emerald-400',
            },
            {
              icon: Code2,
              title: 'Tailwind v4 Integration',
              desc: 'Modern inline theme styling with CSS variables and responsive glass utility layers.',
              color: 'text-pink-400',
            },
          ].map((feature, i) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Performance Stats Section */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '60 FPS', label: 'Constant Frame Rate' },
            { value: '0.2s', label: 'Initial Load Time' },
            { value: '100%', label: 'Type Safe Stack' },
            { value: '99.9%', label: 'GPU Optimization' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-gradient-primary">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section id="newsletter" className="relative z-10 max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="glass rounded-3xl p-10 md:p-16 border border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Ready to elevate your web experience?
            </h2>
            <p className="text-slate-400 text-base md:text-lg mb-8">
              Join thousands of developers creating groundbreaking interactive 3D web applications.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 inline-flex items-center gap-3 font-semibold text-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                {"\u2713 Subscribed! Check your inbox for access updates."}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-grow">
                  <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30 shrink-0"
                >
                  Get Started
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-base">Aura3D Studio</span>
          </div>

          <p className="text-slate-500">
            &copy; 2026 Aura3D Next.js Platform. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Global API
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Share2 className="w-4 h-4" /> Ecosystem
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
