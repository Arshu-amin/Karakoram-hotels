'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Box,
  Zap,
  ShieldCheck,
  Layers,
  Cpu,
  Palette,
  ArrowRight,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Code2,
  Star,
} from 'lucide-react'

// Dynamically import WebGL Scene component with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-wider uppercase">
          Initializing 3D Engine...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<'torusKnot' | 'sphere' | 'icosahedron' | 'cube'>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [distort, setDistort] = useState(0.35)
  const [wireframe, setWireframe] = useState(false)
  const [scale, setScale] = useState(1.1)

  // Interactive Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  const handleResetControls = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setSpeed(1.5)
    setDistort(0.35)
    setWireframe(false)
    setScale(1.1)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const presetColors = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Neon Cyan', hex: '#06b6d4' },
    { name: 'Cosmic Violet', hex: '#a855f7' },
    { name: 'Rose Glow', hex: '#f43f5e' },
    { name: 'Emerald Cyber', hex: '#10b981' },
    { name: 'Solar Amber', hex: '#f59e0b' },
  ]

  const shapes: Array<{ id: 'torusKnot' | 'sphere' | 'icosahedron' | 'cube'; label: string }> = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'cube', label: 'Cube' },
  ]

  const features = [
    {
      icon: <Box className="w-6 h-6 text-indigo-400" />,
      title: 'Real-Time 3D WebGL Engine',
      description: 'Ultra-fast procedural geometry and dynamic shader distortion rendered at 60+ FPS using React Three Fiber.',
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'Zero Latency Interactions',
      description: 'Instant state reflection between DOM control panels and WebGL canvas elements with seamless responsiveness.',
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      title: 'Glassmorphic Styling System',
      description: 'Crafted with multi-layered frosted glass overlays, subtle neon glows, and dark mode aesthetic tokens.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: 'Optimized GPU Pipeline',
      description: 'Resource-friendly shaders and fallbacks ensuring smooth rendering across desktops and mobile hardware.',
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: 'Modular Architecture',
      description: 'Built on Next.js 16 and React 19, cleanly separating WebGL state managers from UI overlay components.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'Production-Ready Setup',
      description: 'Includes full TypeScript typing, accessibility considerations, and linting compliance out of the box.',
    },
  ]

  const stats = [
    { value: '99.9%', label: 'Frame Rate Stability' },
    { value: '<12ms', label: 'Input Latency' },
    { value: '100%', label: 'WebGL Compatibility' },
    { value: '4.9/5', label: 'User Satisfaction' },
  ]

  const testimonials = [
    {
      quote: "The interactive 3D capabilities integrated with Next.js transformed our product landing page into an unforgettable experience.",
      author: "Elena Rostova",
      role: "Lead Frontend Architect @ TechPulse",
    },
    {
      quote: "Aura 3D sets a new benchmark for modern web design. The visual fluidity and glassmorphic UI controls are top tier.",
      author: "Marcus Vance",
      role: "Creative Director @ Studio V",
    },
    {
      quote: "Setting up custom WebGL shaders and controls took minutes instead of days. Clean code and astonishing performance.",
      author: "Sarah Jenkins",
      role: "Senior UI Engineer @ Waveform",
    },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          scale={scale}
        />
      </div>

      {/* Radial Gradient Overlay for depth */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.2)_0%,rgba(2,6,23,0.85)_100%)]" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 glass-nav">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gradient-primary">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Customizer
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">
              Metrics
            </a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Web UI Framework</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 max-w-5xl"
        >
          Immersive Frontend <br />
          <span className="text-gradient-primary">3D Visuals & Motion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 font-normal leading-relaxed"
        >
          Elevate user engagement with dynamic WebGL geometry, glassmorphic UI controls,
          and smooth fluid motion powered by React Three Fiber and Next.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            <span>Customize 3D Canvas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass glass-hover font-semibold text-slate-200 border border-slate-700/60 transition-all hover:scale-105 active:scale-95"
          >
            Explore Architecture
          </a>
        </motion.div>
      </motion.section>

      {/* Interactive 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
            Interactive Workbench
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Live <span className="text-gradient-primary">3D Canvas Studio</span>
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            Adjust shapes, colors, speed, and distortion in real-time. Notice how the background WebGL scene mutates instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h4 className="font-bold text-lg text-slate-100">Engine Parameters</h4>
              </div>
              <button
                onClick={handleResetControls}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                title="Reset parameters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                3D Geometry Shape
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      shape === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets & Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                Material Color Tone
              </label>
              <div className="flex flex-wrap gap-2.5 mb-3">
                {presetColors.map((p) => (
                  <button
                    key={p.hex}
                    onClick={() => setColor(p.hex)}
                    style={{ backgroundColor: p.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      color === p.hex ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-xs text-slate-300 uppercase">{color}</span>
              </div>
            </div>

            {/* Rotation & Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Rotation Velocity</span>
                <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Vertex Shader Distortion</span>
                <span className="text-indigo-400 font-mono">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.9"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Geometry Scale</span>
                <span className="text-indigo-400 font-mono">{scale.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Wireframe Mode Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Wireframe Rendering
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Code Output / Live Spec Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass border border-slate-800 space-y-6 shadow-2xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-6">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h4 className="font-bold text-lg text-slate-100">Live JSX Code snippet</h4>
              </div>

              <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300 overflow-x-auto shadow-inner leading-relaxed">
                <p className="text-slate-500 mb-2">{"// Synchronized WebGL Material Configuration"}</p>
                <p>
                  <span className="text-purple-400">&lt;Scene</span>
                </p>
                <p className="pl-4">
                  shape=<span className="text-emerald-400">&quot;{shape}&quot;</span>
                </p>
                <p className="pl-4">
                  color=<span className="text-emerald-400">&quot;{color}&quot;</span>
                </p>
                <p className="pl-4">
                  speed=&#123;<span className="text-amber-400">{speed}</span>&#125;
                </p>
                <p className="pl-4">
                  distort=&#123;<span className="text-amber-400">{distort}</span>&#125;
                </p>
                <p className="pl-4">
                  scale=&#123;<span className="text-amber-400">{scale}</span>&#125;
                </p>
                <p className="pl-4">
                  wireframe=&#123;<span className="text-indigo-400">{wireframe ? 'true' : 'false'}</span>&#125;
                </p>
                <p>
                  <span className="text-purple-400">/&gt;</span>
                </p>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-slate-200 text-sm mb-1">
                  Did you know?
                </h5>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  You can click and drag anywhere on the screen to rotate the camera around the 3D element!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
            Architectural Highlights
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Engineered for <span className="text-gradient-primary">Modern Web Apps</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-8 rounded-3xl glass glass-hover border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-inner">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics & Performance Counter */}
      <section id="metrics" className="relative z-10 py-20 px-4 sm:px-6 max-w-7xl mx-auto border-y border-slate-800/80 glass my-12 rounded-3xl scroll-mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl sm:text-5xl font-black text-gradient-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">
            Community Endorsements
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Loved by <span className="text-gradient-primary">Developers & Designers</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl glass border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic mb-6 leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
              </div>
              <div>
                <h5 className="font-bold text-slate-100 text-base">{t.author}</h5>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-slate-950 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Stay Ahead in <span className="text-gradient-primary">3D Web Innovations</span>
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Subscribe to receive developer updates, WebGL shader tutorials, and custom UI starter templates.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm animate-bounce">
              <CheckCircle2 className="w-5 h-5" />
              <span>{"\u2713 Subscribed successfully! Welcome aboard."}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/25 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-4 sm:px-8 mt-12 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-lg text-gradient-primary">Aura 3D Framework</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-300 transition-colors">GitHub Repository</a>
            <a href="#" className="hover:text-slate-300 transition-colors">License (MIT)</a>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>WebGL Engine Active</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-900/60 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} Aura 3D Framework. Designed for ultra-modern web applications.
        </div>
      </footer>
    </main>
  )
}
