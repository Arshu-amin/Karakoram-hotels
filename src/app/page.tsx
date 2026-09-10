'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import Customizer from '@/components/Customizer'
import { SceneConfig } from '@/components/Scene'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Globe,
  Code2,
  Box,
  Star,
  CheckCircle2,
  Share2,
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-indigo-400">Initializing 3D Canvas...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torus',
    color: '#6366f1',
    speed: 1.5,
    distort: 0.35,
    wireframe: false,
  })

  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleConfigChange = (newConfig: Partial<SceneConfig>) => {
    setSceneConfig((prev) => ({ ...prev, ...newConfig }))
  }

  const { scrollYProgress } = useScroll()
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.45, 0.25])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D Background Canvas */}
      <motion.div style={{ opacity: sceneOpacity }} className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={sceneConfig} />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-slate-950/40 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#studio" className="hover:text-white transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#metrics" className="hover:text-white transition-colors">
              Benchmarks
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#studio"
              className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Next-Generation WebGL Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]">
            Immersive <br />
            <span className="text-gradient-primary">3D Visual Interfaces</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-12 font-normal leading-relaxed">
            Elevate modern web applications with real-time hardware-accelerated 3D graphics, responsive state customizers, and glassmorphic UI architectures.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#studio"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-[1.02] shadow-xl shadow-indigo-600/30 group"
            >
              <span>Explore 3D Customizer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/60 text-slate-200 font-semibold flex items-center justify-center gap-2 transition-all duration-200 border border-slate-800"
            >
              <span>View Features</span>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs font-mono"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-700 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </section>

      {/* 3D Customizer Section */}
      <section id="studio" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> Real-Time Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Select materials, modify geometry meshes, adjust vertex distortion, and control rotation speeds live on the background canvas.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Customizer config={sceneConfig} onChange={handleConfigChange} />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> Architectural Features
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built for Modern Web Experiences
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Combining fluid Framer Motion animations with dynamic Three.js WebGL shaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10 border-indigo-500/20',
              title: 'Hardware Acceleration',
              desc: 'Leverages GPU-bound WebGL shaders for smooth 60 FPS rendering without blocking the UI thread.',
            },
            {
              icon: Sparkles,
              color: 'text-pink-400',
              bg: 'bg-pink-500/10 border-pink-500/20',
              title: 'Dynamic Shaders & Lighting',
              desc: 'Custom physical materials with metallic reflection, roughness parameters, and responsive lighting setups.',
            },
            {
              icon: Globe,
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10 border-cyan-500/20',
              title: 'Glassmorphism Aesthetic',
              desc: 'Frosted glass UI elements with backdrop filters that overlay seamlessly on top of interactive 3D scenes.',
            },
            {
              icon: ShieldCheck,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              title: 'SSR Safe Optimization',
              desc: 'Dynamic dynamic-import hydration safeguards preventing canvas rendering mismatches during Next.js SSR.',
            },
            {
              icon: Code2,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
              title: 'React Three Fiber Native',
              desc: 'Declarative component-driven 3D scenes seamlessly coupled with React state and custom hook triggers.',
            },
            {
              icon: Share2,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/20',
              title: 'Smooth Physics & Micro-interactions',
              desc: 'Fluid spring cursor trackers and interactive scroll-driven parallax transitions.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.bg} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics Ticker / Benchmark Section */}
      <section id="metrics" className="relative z-10 py-20 border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { metric: '60 FPS', label: 'Smooth Frame Rate' },
            { metric: '< 50ms', label: 'Interactive Latency' },
            { metric: '100%', label: 'WebGL Compatibility' },
            { metric: '0', label: 'SSR Hydration Errors' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="space-y-2"
            >
              <div className="text-3xl sm:text-5xl font-black tracking-tight text-gradient-primary">
                {stat.metric}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 font-mono uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rating / Testimonials banner */}
      <section className="relative z-10 py-24 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 rounded-3xl border border-indigo-500/20 relative overflow-hidden"
        >
          <div className="flex justify-center gap-1 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-medium text-slate-200 max-w-2xl mx-auto mb-6 leading-snug">
            &quot;The combination of real-time 3D state control and glassmorphism styling gives this interface an unmatched futuristic feel.&quot;
          </blockquote>
          <div className="text-sm font-semibold text-indigo-400">Aura3D Engineering Team</div>
        </motion.div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-20 px-4 max-w-4xl mx-auto text-center">
        <div className="glass-card p-10 md:p-14 rounded-3xl border border-indigo-500/20 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Stay Updated with 3D Web Innovations
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            Subscribe to our newsletter for insights on high-performance WebGL, Next.js optimization, and 3D UI designs.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-slate-100 placeholder-slate-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 shrink-0"
            >
              {emailSubmitted ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {"\u2713 Subscribed"}
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span>© 2026 Aura3D Next.js Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
