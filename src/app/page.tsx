'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Box,
  Palette,
  Sliders,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Terminal,
  Activity,
  ChevronRight,
  Star,
  Play
} from 'lucide-react'
import type { GeometryShape } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-500 font-mono text-sm">Loading 3D Canvas...</div>
})

export default function Home() {
  // 3D Customizer State
  const [modelColor, setModelColor] = useState('#6366f1')
  const [modelShape, setModelShape] = useState<GeometryShape>('torusKnot')
  const [modelSpeed, setModelSpeed] = useState(1.5)
  const [modelDistortion, setModelDistortion] = useState(0.4)
  const [isWireframe, setIsWireframe] = useState(false)

  // Newsletter Form State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Global scroll effects
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Emerald', value: '#10b981' },
    { label: 'Amber', value: '#f59e0b' },
  ]

  const shapes: { label: string; value: GeometryShape }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Torus', value: 'torus' },
    { label: 'Octahedron', value: 'octahedron' },
  ]

  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "60 FPS WebGL Engine",
      description: "Hardware-accelerated 3D rendering powered by Three.js and React Three Fiber with dynamic lighting and shaders."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "Real-time State Sync",
      description: "Seamless synchronization between DOM UI controls and WebGL canvas properties for live interactive customization."
    },
    {
      icon: <Zap className="w-6 h-6 text-sky-400" />,
      title: "Ultra Low Latency",
      description: "Optimized geometry buffers and non-blocking background render loops to ensure responsive interaction across devices."
    },
    {
      icon: <Layers className="w-6 h-6 text-pink-400" />,
      title: "Glassmorphic Design System",
      description: "Crafted with dynamic backdrop blur filters, glowing borders, custom cursors, and sleek dark mode aesthetics."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Production Ready",
      description: "Fully responsive, accessible, and structured with Next.js App Router and TypeScript type safety."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-amber-400" />,
      title: "Global CDN Edge",
      description: "Zero hydration mismatch dynamic loading strategy ensuring fast initial page loads anywhere in the world."
    }
  ]

  const stats = [
    { label: "Render Frame Rate", value: "60 FPS" },
    { label: "WebGL Vertices", value: "100K+" },
    { label: "Interactive Controls", value: "Real-Time" },
    { label: "User Satisfaction", value: "99.9%" }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background WebGL Scene Container */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          color={modelColor}
          shape={modelShape}
          speed={modelSpeed}
          distortion={modelDistortion}
          wireframe={isWireframe}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">3D</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Metrics</a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-28 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 text-xs font-semibold text-indigo-300 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation Interactive 3D Web Experience</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight mb-6"
        >
          Shape the Future of <br />
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Immerse your audience in real-time WebGL graphics, fluid physical shaders, and responsive custom controls engineered with React Three Fiber.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Try Live Customizer</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm glass hover:bg-slate-800/80 border border-slate-700 text-slate-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Explore Architecture</span>
          </a>
        </motion.div>

        {/* Hero Bottom Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 border-t border-slate-800/80 pt-8"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>WebGL 2.0 Acceleration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>React 19 & Next.js 16</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Tailwind CSS v4</span>
          </div>
        </motion.div>
      </motion.section>

      {/* Interactive 3D Model Customizer Studio */}
      <section id="customizer" className="relative z-10 py-24 scroll-mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-2 block">
            Studio Controls
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Interactive 3D Model Customizer
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Tweak WebGL parameters in real time and see the canvas instantly transform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Panel */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-lg text-white">Parameters</h3>
            </div>

            {/* Geometry Shape Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-3 block uppercase tracking-wider">
                Select Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setModelShape(s.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                      modelShape === s.value
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-3 block uppercase tracking-wider flex items-center justify-between">
                <span>Material Color</span>
                <span className="font-mono text-indigo-400">{modelColor}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setModelColor(c.value)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs transition-all ${
                      modelColor === c.value
                        ? 'bg-slate-800 border-indigo-500 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-sm"
                      style={{ backgroundColor: c.value }}
                    />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Rotation Speed</span>
                <span className="font-mono text-indigo-400">{modelSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={modelSpeed}
                onChange={(e) => setModelSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Distortion Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Distortion Effect</span>
                <span className="font-mono text-indigo-400">{modelDistortion.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={modelDistortion}
                onChange={(e) => setModelDistortion(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Wireframe Mode
              </span>
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  isWireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isWireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Status Display Card */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs text-slate-400 uppercase">Live Canvas Telemetry</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  RENDER_ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Active Shape</div>
                  <div className="font-bold text-white capitalize">{modelShape}</div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Color Value</div>
                  <div className="font-mono text-xs font-bold text-indigo-400">{modelColor}</div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">FPS Speed</div>
                  <div className="font-mono text-xs font-bold text-white">{modelSpeed}x</div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-slate-400 text-xs mb-1">Render Mode</div>
                  <div className="font-bold text-xs text-purple-400">{isWireframe ? 'Wireframe' : 'Physical Mesh'}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-xs text-slate-300">
                  All 3D mesh modifications reflect instantaneously in the background WebGL canvas using continuous R3F render loops.
                </p>
              </div>
              <button
                onClick={() => {
                  setModelColor('#6366f1')
                  setModelShape('torusKnot')
                  setModelSpeed(1.5)
                  setModelDistortion(0.4)
                  setIsWireframe(false)
                }}
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
              >
                Reset Studio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 scroll-mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-400 mb-2 block">
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Built for Extreme Performance
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Engineered with modern frontend standards and low-overhead 3D pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 transition-all group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real-time Metrics Section */}
      <section id="stats" className="relative z-10 py-20 scroll-mt-20 px-6 max-w-7xl mx-auto">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-slate-800 glow-indigo">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-black text-gradient-primary mb-2 font-mono">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 scroll-mt-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400 mb-2 block">
            Developer Praise
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Loved by Modern Web Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The seamless integration between 2D UI components and WebGL 3D scenes provides an unparalleled user experience.",
              author: "Alex Rivera",
              role: "Lead Creative Technologist"
            },
            {
              quote: "Extremely fast render speeds and smooth 60 FPS performance even on mobile devices. A benchmark for modern web apps.",
              author: "Sophia Chen",
              role: "Principal Frontend Architect"
            },
            {
              quote: "The interactive studio controls demonstrate how powerful real-time state management can be when combined with R3F.",
              author: "Marcus Vance",
              role: "UI/UX Director"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &quot;{item.quote}&quot;
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <div className="font-bold text-white text-sm">{item.author}</div>
                <div className="text-slate-500 text-xs">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-indigo-500/30 glow-purple relative overflow-hidden">
          <div className="relative z-10">
            <Activity className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Stay Ahead of Web 3D Trends
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm mb-8">
              Subscribe to get early access to new 3D shaders, WebGL templates, and interactive UI component updates.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{"\u2713 Subscribed! Check your inbox soon."}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-400">AURA 3D</span>
            <span>— © 2026 Next.js & Three.js Studio</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Metrics</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
