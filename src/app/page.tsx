'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Globe,
  Sliders,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Check,
  Code2,
  Box
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-sm">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span>Initializing 3D Engine...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<NonNullable<SceneProps['shape']>>('torusKnot')
  const [speed, setSpeed] = useState<number>(1.5)
  const [color, setColor] = useState<string>('#6366f1')
  const [distort, setDistort] = useState<number>(0.45)

  // Subscription state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorOptions = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyan Pulse', hex: '#06b6d4' },
    { name: 'Neon Purple', hex: '#a855f7' },
    { name: 'Emerald Spark', hex: '#10b981' },
    { name: 'Rose Glow', hex: '#f43f5e' },
  ]

  const shapeOptions: { label: string; value: NonNullable<SceneProps['shape']> }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Torus Ring', value: 'torus' },
  ]

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: 'Real-time WebGL Shaders',
      description: 'Ultra-low latency 3D rendering with dynamic physics-based material distortion and lighting.',
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'Glassmorphic UI Components',
      description: 'Modern translucent interfaces layered seamlessly over animated 3D visual canvas environments.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: 'Next.js 16 & Turbopack',
      description: 'Instant server-side rendering, optimized bundle sizes, and blazing fast dynamic routing.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: '60 FPS Performance',
      description: 'Adaptive frame rendering and GPU acceleration designed for smooth cross-device performance.',
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: 'Global Edge Runtime',
      description: 'Distributed content delivery ensures interactive visual responsiveness worldwide.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      title: 'Enterprise Scalability',
      description: 'Strict TypeScript typing and modular architecture engineered for enterprise production.',
    },
  ]

  const stats = [
    { label: 'Frame Rate Optimization', value: '60 FPS' },
    { label: '3D Geometry Vertices', value: '120K+' },
    { label: 'Interactive Controls', value: '100%' },
    { label: 'Lighthouse Score', value: '99/100' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene shape={shape} speed={speed} color={color} distort={distort} />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 glass border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 text-xs tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">3D v2.0</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#performance" className="hover:text-indigo-400 transition-colors">Performance</a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="#customizer"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-500/20 flex items-center space-x-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Next-Generation Interactive WebGL Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            Immersive 3D <br />
            <span className="text-gradient-primary">Web Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            Elevate your digital interface with dynamic real-time WebGL graphics,
            seamless glassmorphism aesthetics, and fluid micro-interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold rounded-xl transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 text-white"
            >
              <span>Explore 3D Customizer</span>
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-slate-800/60 font-semibold rounded-xl transition-all border border-slate-700/60 flex items-center justify-center space-x-2 text-slate-200"
            >
              <span>View Features</span>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive 3D Control Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Live WebGL Controller</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gradient-primary">
              Real-time 3D Scene Customizer
            </h2>
            <p className="text-slate-400 mt-3 text-sm md:text-base">
              Directly manipulate the background 3D canvas shader parameters in real time using the controls below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Shape Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Geometry Type</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setShape(opt.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      shape === opt.value
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border border-indigo-400/30'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Material Color</span>
              </label>
              <div className="flex flex-wrap gap-3 pt-1">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.hex}
                    onClick={() => setColor(opt.hex)}
                    title={opt.name}
                    className={`w-9 h-9 rounded-xl transition-all transform hover:scale-110 flex items-center justify-center ${
                      color === opt.hex
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: opt.hex }}
                  >
                    {color === opt.hex && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Rotation Speed</span>
                </span>
                <span className="font-mono text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Mesh Distortion</span>
                </span>
                <span className="font-mono text-indigo-400">{(distort * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Core Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gradient-primary">
            Engineered for Next-Gen Web
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg">
            Combining state-of-the-art WebGL rendering pipeline with modern frontend architectural best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:border-indigo-500/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance Stats Section */}
      <section id="performance" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-10 border border-slate-800/80 bg-gradient-to-br from-indigo-950/30 via-slate-900/50 to-slate-950/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-slate-800/60">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <span className="text-4xl md:text-5xl font-extrabold text-gradient-secondary font-mono mb-2">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section id="architecture" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Technical Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gradient-primary">
              Built with Industry-Leading Standards
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed">
              Our architecture leverages Next.js 16 App Router, React 19, Three.js, React Three Fiber, and Framer Motion to deliver seamless multi-layered interactions without compromising performance or SEO.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Strict ESLint & TypeScript validation',
                'Zero layout shifts during 3D WebGL hydration',
                'Modular React server and client component separation',
                'Responsive glassmorphism layout using Tailwind CSS v4',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="text-slate-400">Architecture Overview</span>
              </div>
              <span className="text-emerald-400">✓ Production Ready</span>
            </div>
            <pre className="text-slate-400 overflow-x-auto p-2 bg-slate-950/60 rounded-lg">
              {`// Tech Stack Matrix
const stack = {
  framework: "Next.js 16 (Turbopack)",
  runtime: "React 19 & Edge",
  graphics: "Three.js + @react-three/fiber",
  animation: "Framer Motion",
  styling: "Tailwind CSS v4"
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-10 md:p-16 border border-indigo-500/30 relative overflow-hidden">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">Stay Updated</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gradient-primary">
            Join the Interactive Web Movement
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Subscribe to receive updates, new WebGL shader presets, and design system components.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-sm flex items-center justify-center space-x-2"
            >
              <span>Subscribe</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs font-mono text-emerald-400"
            >
              {"\u2713"} Subscribed successfully! Thank you for joining.
            </motion.p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900/80 px-6 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <span className="font-semibold text-slate-300">AURA 3D Platform</span>
          </div>

          <p className="text-xs">
            &copy; {new Date().getFullYear()} AURA 3D Inc. Built with Next.js & WebGL. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#performance" className="hover:text-indigo-400 transition-colors">Performance</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
