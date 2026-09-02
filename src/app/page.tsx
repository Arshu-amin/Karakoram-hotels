'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ArrowRight,
  Sliders,
  Palette,
  ShieldCheck,
  Globe,
  Share2,
  CheckCircle2,
  ChevronDown,
  Box,
  Circle,
  Shapes
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm font-medium text-indigo-400/80 tracking-widest uppercase">Initializing 3D Environment</span>
      </div>
    </div>
  )
})

export default function Home() {
  // Interactive 3D Studio Controls state
  const [shape, setShape] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [distortion, setDistortion] = useState(0.45)
  const [speed, setSpeed] = useState(2.5)
  const [wireframe, setWireframe] = useState(false)

  // Form State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const colorPresets = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Neon Cyan', hex: '#38bdf8' },
    { name: 'Cosmic Violet', hex: '#c084fc' },
    { name: 'Emerald Flux', hex: '#10b981' },
    { name: 'Sunset Amber', hex: '#f59e0b' }
  ]

  const shapes: { id: GeometryType; label: string; icon: React.ReactNode }[] = [
    { id: 'torusKnot', label: 'Torus Knot', icon: <Shapes className="w-4 h-4" /> },
    { id: 'icosahedron', label: 'Icosahedron', icon: <Box className="w-4 h-4" /> },
    { id: 'sphere', label: 'Sphere', icon: <Circle className="w-4 h-4" /> },
    { id: 'box', label: 'Cube', icon: <Box className="w-4 h-4" /> }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Dynamic Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          distortion={distortion}
          speed={speed}
          wireframe={wireframe}
        />
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-4 backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#customizer" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#tech" className="hover:text-white transition-colors">Architecture</a>
            <a href="#cta" className="hover:text-white transition-colors">Get Access</a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold glass-button text-indigo-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Studio</span>
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 pt-12 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 glow-bg">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Next Generation Web Graphics</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
            Immersive <br className="hidden sm:inline" />
            <span className="text-gradient-primary">3D Visual Interfaces</span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-400 max-w-2xl mb-10 font-light leading-relaxed">
            Crafting fluid, real-time WebGL experiences integrated seamlessly with modern React architecture and glassmorphic UI.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
            >
              <span>Explore 3D Studio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#features"
              className="px-8 py-4 rounded-full font-semibold glass hover:bg-white/10 text-slate-200 transition-all border border-white/10 flex items-center justify-center"
            >
              Learn Architecture
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-indigo-400" />
        </motion.div>
      </section>

      {/* 3D Studio Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-2">
            <Sliders className="w-4 h-4" /> Interactive WebGL Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Customize the <span className="text-gradient-secondary">3D Environment</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto text-base sm:text-lg">
            Interact with real-time controls below to update the canvas parameters instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 glass-card p-6 sm:p-8 rounded-3xl flex flex-col gap-6"
          >
            {/* Shape Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      shape === item.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" /> Material Color Presets
              </label>
              <div className="flex items-center gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setColor(preset.hex)}
                    title={preset.name}
                    className={`w-9 h-9 rounded-full transition-all transform hover:scale-110 flex items-center justify-center ${
                      color === preset.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: preset.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mesh Distortion
                </label>
                <span className="text-xs font-mono text-indigo-300">{distortion.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={distortion}
                onChange={(e) => setDistortion(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Animation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Float & Distortion Speed
                </label>
                <span className="text-xs font-mono text-indigo-300">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Wireframe Mode
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full shadow"
                  animate={{ x: wireframe ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* Info & Live Canvas Display Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-8 rounded-3xl flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-4 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live WebGL Context Active
              </div>

              <h3 className="text-2xl font-bold mb-3">Real-time Shader & Geometry Customization</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                The underlying 3D canvas utilizes React Three Fiber with custom distorsions, noise fields, and procedural starfield particles. Drag to orbit the perspective view in real-time.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-mono">Geometry</div>
                <div className="text-sm font-semibold capitalize text-indigo-300 mt-1">{shape}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-mono">Primary Color</div>
                <div className="text-sm font-semibold font-mono text-indigo-300 mt-1">{color}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-mono">Distortion</div>
                <div className="text-sm font-semibold font-mono text-indigo-300 mt-1">{distortion}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-mono">Render Mode</div>
                <div className="text-sm font-semibold text-indigo-300 mt-1">{wireframe ? 'Wireframe' : 'Solid Metal'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" /> Key Architectural Pillars
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built for <span className="text-gradient-primary">Next-Level Performance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: 'High-FPS 3D Engine',
              desc: 'Leverages WebGL and React Three Fiber for buttery smooth 60+ FPS hardware accelerated rendering.'
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: 'Glassmorphic UI Layer',
              desc: 'Tailwind CSS v4 backdrop blurring and custom frosted glass elements over background WebGL canvases.'
            },
            {
              icon: <Cpu className="w-6 h-6 text-sky-400" />,
              title: 'Next.js 16 Turbo Stack',
              desc: 'Powered by the App Router with automatic dynamic imports and zero SSR hydration bottlenecks.'
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: 'Strict Type Safety',
              desc: 'End-to-end TypeScript compilation with complete prop interfaces for custom geometry controls.'
            },
            {
              icon: <Globe className="w-6 h-6 text-amber-400" />,
              title: 'Responsive Spatial Design',
              desc: 'Adaptive viewport camera configurations ensuring seamless experiences on mobile and desktop.'
            },
            {
              icon: <Share2 className="w-6 h-6 text-pink-400" />,
              title: 'Fluid Framer Motion',
              desc: 'Scroll-triggered animations, interactive spring hover states, and smooth cursor physics.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:border-indigo-500/50 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section id="tech" className="relative z-10 py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-indigo-500/20 glow-bg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Target Frame Rate', val: '60 FPS' },
              { label: 'Bundle Footprint', val: '< 150kb' },
              { label: 'Lighting Points', val: '2.5k' },
              { label: 'Hydration Overhead', val: '0ms' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-black text-gradient-primary tracking-tight">
                  {stat.val}
                </span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Form Section */}
      <section id="cta" className="relative z-10 py-24 px-4 sm:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-16 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
            Ready to Build the Future?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg mb-8 relative z-10">
            Subscribe to receive updates on upcoming WebGL shaders, Three.js modules, and design tokens.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 text-sm whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Join Newsletter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{"\u2713 Subscribed"} - Welcome aboard!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-wider">AURA 3D</span>
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 AURA 3D Inc. Engineered with Next.js, Tailwind CSS & Three.js.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Documentation</a>
            <a href="#customizer" className="hover:text-white transition-colors">Studio</a>
            <a href="#tech" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
