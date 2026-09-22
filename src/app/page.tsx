'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Box,
  Sparkles,
  Zap,
  Sliders,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Share2,
  Code2
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  // 3D Scene Interactive Controls State
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1.1)
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [wireframe, setWireframe] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  // Scroll Driven Animations
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const colors = [
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Cyan', hex: '#06b6d4' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Rose', hex: '#f43f5e' },
  ]

  const shapes: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'octahedron', label: 'Octahedron' },
    { id: 'sphere', label: 'Sphere' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene Container */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          color={color}
          speed={speed}
          scale={scale}
          shape={shape}
          wireframe={wireframe}
        />
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-white">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-400">
              <Box className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-gradient-primary">Aura3D</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#customizer" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#stats" className="hover:text-white transition-colors">Performance</a>
          </div>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Launch Studio
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen Web Visuals with Next.js 16 & Three.js</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
        >
          Immersive <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Digital</span> Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Elevate your web applications with real-time WebGL rendering, custom interactive 3D elements, and smooth Framer Motion scroll animations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold transition-all shadow-xl shadow-indigo-500/25 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Customize 3D Scene
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass hover:bg-slate-800/60 font-semibold transition-all active:scale-95 text-slate-200 border border-slate-700/50"
          >
            Explore Features
          </a>
        </motion.div>
      </motion.section>

      {/* Live 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Real-Time <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Interact with the control panel below to modify the background 3D WebGL viewport in real-time.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shape Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all text-left flex items-center justify-between ${
                      shape === s.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-800'
                    }`}
                  >
                    <span>{s.label}</span>
                    {shape === s.id && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Color Palette */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Color Accent
              </label>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-10 h-10 rounded-full transition-transform flex items-center justify-center ${
                      color === c.hex
                        ? 'ring-4 ring-indigo-400/50 scale-110 shadow-lg'
                        : 'hover:scale-105 opacity-80'
                    }`}
                    title={c.name}
                  >
                    {color === c.hex && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Rotation Speed
                </label>
                <span className="text-sm font-bold text-indigo-400">{speed.toFixed(1)}x</span>
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

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" /> Object Scale
                </label>
                <span className="text-sm font-bold text-indigo-400">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Wireframe Toggle */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="font-semibold text-sm text-white">Wireframe Renderer</span>
                <p className="text-xs text-slate-400">Display polygon mesh structure</p>
              </div>
            </div>
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
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Engineered for <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Combining cutting-edge web technologies to deliver 60fps interactive graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Box className="w-8 h-8 text-indigo-400" />,
              title: "Interactive WebGL",
              desc: "Rendered directly in your browser using Three.js and React-Three-Fiber with hardware acceleration."
            },
            {
              icon: <Zap className="w-8 h-8 text-purple-400" />,
              title: "Turbopack Fast",
              desc: "Powered by Next.js 16 with instant hot reloading and optimized production bundles."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
              title: "Glassmorphism UI",
              desc: "Modern translucent frosted glass overlays engineered with Tailwind CSS v4."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:-translate-y-1 transition-all group"
            >
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Badges */}
      <section id="tech" className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl font-bold mb-8 text-white">Powered by Modern Web Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { name: 'Next.js 16', icon: <Globe className="w-4 h-4 text-indigo-400" /> },
              { name: 'React 19', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
              { name: 'Three.js / R3F', icon: <Box className="w-4 h-4 text-purple-400" /> },
              { name: 'Tailwind CSS v4', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
              { name: 'Framer Motion', icon: <Share2 className="w-4 h-4 text-rose-400" /> },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-200 text-sm font-semibold hover:border-slate-700 transition-colors"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "60 FPS", label: "Smooth Animation" },
            { value: "100%", label: "Responsive Layout" },
            { value: "< 100ms", label: "Interaction Latency" },
            { value: "Zero", label: "Hydration Mismatch" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-6 rounded-2xl"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="relative z-10 max-w-4xl mx-auto py-20 px-4">
        <div className="glass-card p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white">
            Stay Connected
          </h3>
          <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
            Get early access to updates, new 3D WebGL shader templates, and interactive components.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 flex-grow"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 shrink-0"
            >
              {subscribed ? '\u2713 Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <Box className="w-4 h-4 text-indigo-400" /> Aura3D Showcase
          </div>
          <p>© 2026 Aura3D. Built with Next.js & Three.js.</p>
          <div className="flex gap-6 text-slate-400 text-xs">
            <a href="#features" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#features" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
