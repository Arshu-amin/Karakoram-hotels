'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Globe,
  Share2,
  Code2,
  Mail,
  CheckCircle2
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-wider">LOADING 3D ENGINE</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Configurator state
  const [shape, setShape] = useState<'torus' | 'icosahedron' | 'sphere' | 'cube'>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)

  // Newsletter form state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Global scroll motion animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, -60])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorOptions = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Rose', value: '#f43f5e' }
  ]

  const shapesList: { id: 'torus' | 'icosahedron' | 'sphere' | 'cube'; name: string }[] = [
    { id: 'torus', name: 'Torus Knot' },
    { id: 'icosahedron', name: 'Icosahedron' },
    { id: 'sphere', name: 'Sphere' },
    { id: 'cube', name: 'Cube' }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Fixed WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene shape={shape} color={color} speed={speed} scale={scale} />
      </div>

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Box className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Capabilities</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Engine Stats</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-4 py-2 text-xs md:text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center pt-24 px-6">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Next-Generation 3D Frontend Interface</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]"
          >
            Craft Modern Web <br />
            <span className="text-gradient-primary">Visual Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Immerse users in interactive WebGL graphics, glassmorphism UI components, and real-time 3D shape customizers built with React 19 and Next.js 16.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 text-white"
            >
              Explore 3D Studio <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl glass hover:bg-slate-800/80 font-semibold transition-all transform hover:scale-105 active:scale-95 text-slate-200"
            >
              View Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Configurator Studio Section */}
      <section id="customizer" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 glass p-8 rounded-3xl space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Sliders className="w-4 h-4" /> Real-time Controls
              </div>
              <h2 className="text-3xl font-bold text-white">Interactive 3D Configurator</h2>
              <p className="text-slate-400 text-sm mt-2">
                Modify parameters below to directly influence the background WebGL shader & geometry parameters.
              </p>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapesList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between border ${
                      shape === item.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    {shape === item.id && <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Material Tint
              </label>
              <div className="flex items-center gap-3">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setColor(opt.value)}
                    style={{ backgroundColor: opt.value }}
                    title={opt.label}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      color === opt.value
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950'
                        : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Rotation Velocity
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Geometry Scale
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
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </motion.div>

          {/* Interactive Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-12"
          >
            <div className="p-8 glass rounded-3xl space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">DOM-to-WebGL Synchronization</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                State updates in the React DOM layer flow synchronously into Three.js frame loops via `@react-three/fiber` hooks.
                Experience zero layout shifts and buttery smooth 60fps rendering across desktop and mobile browsers.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div>
                  <span className="text-slate-500 block">ACTIVE SHAPE</span>
                  <span className="text-indigo-400 font-bold uppercase">{shape}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">TINT CODE</span>
                  <span className="text-indigo-400 font-bold uppercase">{color}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
            Designed for <span className="text-gradient-primary">Modern Web Apps</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Engineered with modern architecture practices to deliver hyper-realistic visuals without sacrificing runtime performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "60 FPS Performance",
              desc: "Optimized WebGL buffer geometries and physical materials ensure liquid smooth animations."
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: "Glassmorphic Aesthetics",
              desc: "Frosted backdrop filters, vibrant ambient light reflections, and subtle glow shadows."
            },
            {
              icon: <Cpu className="w-6 h-6 text-cyan-400" />,
              title: "React 19 & Next.js 16",
              desc: "Built on top of the latest Next.js App Router and dynamic client rendering patterns."
            },
            {
              icon: <Globe className="w-6 h-6 text-emerald-400" />,
              title: "Cross-Platform WebGL",
              desc: "Fully responsive viewport adjustments with intelligent canvas fallbacks."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
              title: "Type-Safe Components",
              desc: "Written in strict TypeScript with complete prop definitions for seamless integration."
            },
            {
              icon: <Share2 className="w-6 h-6 text-amber-400" />,
              title: "Modular Architecture",
              desc: "Clean separation between WebGL canvas state and UI controls for easy extension."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl glass glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="p-3 w-fit rounded-2xl bg-slate-800/80 border border-slate-700/50 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engine Metrics Section */}
      <section id="metrics" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "60 FPS", label: "Target Frame Rate" },
            { value: "< 16ms", label: "Render Frame Time" },
            { value: "100%", label: "TypeScript Coverage" },
            { value: "0.0s", label: "Layout Shifts" }
          ].map((metric, i) => (
            <div key={i} className="space-y-2">
              <div className="text-3xl sm:text-5xl font-extrabold text-gradient-primary">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto text-center">
        <div className="glass p-12 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Ahead with 3D Web Visuals</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm">
            Subscribe to our developer newsletter for updates on WebGL shader techniques, React 19 visual patterns, and design inspiration.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713"} Subscribed! Thank you for joining Aura 3D.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all whitespace-nowrap shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-800/60 px-6 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>— Next-Gen Visual Web Application</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-slate-300 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Capabilities</a>
          </div>

          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} Aura 3D. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
