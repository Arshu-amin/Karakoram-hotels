'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { ShapeType } from '@/components/Scene'
import {
  Sparkles,
  Zap,
  Layers,
  Sliders,
  Cpu,
  Globe,
  ShieldCheck,
  Code2,
  ArrowRight,
  CheckCircle2,
  Share2,
  Activity,
  Box,
} from 'lucide-react'

// Dynamic import for WebGL 3D Scene with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
        Initializing 3D Engine...
      </span>
    </div>
  ),
})

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<ShapeType>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [distort, setDistort] = useState(0.35)
  const [scale, setScale] = useState(1)
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const colorPresets = [
    { name: 'Indigo Glow', hex: '#6366f1' },
    { name: 'Neon Violet', hex: '#a855f7' },
    { name: 'Cyber Cyan', hex: '#38bdf8' },
    { name: 'Sunset Crimson', hex: '#f43f5e' },
    { name: 'Emerald Spark', hex: '#10b981' },
  ]

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torus', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere Core' },
    { id: 'ring', label: 'Cyber Ring' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium tracking-wide w-fit">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              <span>WebGL 2.0 Driven Engine • v2.5</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Craft Immersive{' '}
              <span className="text-gradient-primary">3D Digital</span> Experiences
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-normal">
              Elevate your web applications with real-time dynamic WebGL graphics,
              interactive physics, custom mesh distortions, and modern glassmorphism UI components.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#studio"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>Try Studio Customizer</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#features"
                className="px-8 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-base backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Explore Features</span>
              </a>
            </div>

            {/* Hero Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-mono text-indigo-400">60 FPS</div>
                <div className="text-xs text-slate-500 uppercase font-mono tracking-wider">Smooth Motion</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-purple-400">&lt; 15ms</div>
                <div className="text-xs text-slate-500 uppercase font-mono tracking-wider">Low Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-pink-400">100%</div>
                <div className="text-xs text-slate-500 uppercase font-mono tracking-wider">Responsive</div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Preview Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="lg:col-span-5 h-[420px] sm:h-[480px] lg:h-[520px] w-full rounded-3xl relative p-1 bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent shadow-2xl"
          >
            <div className="w-full h-full rounded-[23px] bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden flex flex-col">
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Aura3D Canvas • Active</span>
                </div>
              </div>

              {/* WebGL Canvas Holder */}
              <div className="relative flex-1 w-full h-full">
                <Scene
                  shape={shape}
                  color={color}
                  speed={speed}
                  distort={distort}
                  scale={scale}
                />

                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass border border-slate-700/50 flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-400" />
                    <span className="capitalize">{shape} Geometry</span>
                  </div>
                  <span className="text-indigo-300 font-semibold">{color}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Customizer Studio Section */}
      <section
        id="studio"
        className="relative z-10 pt-28 pb-24 scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Mesh Controls</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Real-Time <span className="text-gradient-primary">3D Studio</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Customize 3D geometric shapes, material distortion, animation speeds, and color dynamics live in WebGL.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between gap-6 border border-slate-800"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <span>Control Parameters</span>
              </h3>

              {/* 1. Shape Selection */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Geometry Shape
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {shapesList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between border ${
                        shape === item.id
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/30'
                          : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      {shape === item.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color Palette */}
              <div className="mb-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Material Color Preset
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() => setColor(preset.hex)}
                      className={`w-9 h-9 rounded-full transition-transform border-2 flex items-center justify-center ${
                        color === preset.hex
                          ? 'scale-110 border-white shadow-lg'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: preset.hex }}
                      title={preset.name}
                    >
                      {color === preset.hex && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Speed Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* 4. Distortion Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                  <span>Mesh Distortion</span>
                  <span className="text-purple-400 font-bold">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* 5. Scale Slider */}
              <div className="mb-2">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                  <span>Scale Factor</span>
                  <span className="text-pink-400 font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tip: Drag with cursor on canvas to inspect mesh in 3D space.</span>
            </div>
          </motion.div>

          {/* Interactive Live Canvas View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 h-[480px] lg:h-auto rounded-3xl glass border border-slate-800 relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WebGL Render Buffer Active</span>
            </div>

            <div className="w-full h-full flex-1">
              <Scene
                shape={shape}
                color={color}
                speed={speed}
                distort={distort}
                scale={scale}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section
        id="features"
        className="relative z-10 pt-28 pb-24 scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Built for <span className="text-gradient-secondary">Modern Performance</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Engineered with industry-leading frontend standards for ultra-fast load times and smooth rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Acceleration',
              desc: 'Direct GPU compute shaders leverage WebGL 2.0 to deliver butter-smooth 60+ FPS visuals.',
              color: 'text-indigo-400',
            },
            {
              icon: Layers,
              title: 'Composable Architecture',
              desc: 'Modular React Three Fiber component tree designed for effortless custom visual effects.',
              color: 'text-purple-400',
            },
            {
              icon: Globe,
              title: 'Next.js 16 Ready',
              desc: 'Seamless App Router integration with SSR dynamic loading and optimal code-splitting.',
              color: 'text-sky-400',
            },
            {
              icon: ShieldCheck,
              title: 'Production Solid',
              desc: 'Strict TypeScript typing and linting standards ensure zero runtime hydration errors.',
              color: 'text-emerald-400',
            },
            {
              icon: Code2,
              title: 'Tailwind CSS v4 Styling',
              desc: 'Modern utility-first layout with glassmorphism effects and inline theme customization.',
              color: 'text-pink-400',
            },
            {
              icon: Share2,
              title: 'Cross-Device Compatible',
              desc: 'Fully responsive canvas scaling with touch gestures and mouse interaction handlers.',
              color: 'text-amber-400',
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass glass-hover p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Metrics Section */}
      <section
        id="metrics"
        className="relative z-10 pt-24 pb-20 scroll-mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-12 rounded-3xl glass border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-950">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-gradient-primary">99.9%</div>
              <div className="mt-2 text-sm text-slate-400 font-medium">Uptime Benchmark</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-gradient-secondary">60+</div>
              <div className="mt-2 text-sm text-slate-400 font-medium">Render FPS Rate</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-gradient-accent">100ms</div>
              <div className="mt-2 text-sm text-slate-400 font-medium">Instant Hydration</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">0</div>
              <div className="mt-2 text-sm text-slate-400 font-medium">Layout Shifts (CLS)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-10 sm:p-16 rounded-3xl border border-slate-800 relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Ready to Upgrade Your Interface?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Stay tuned for upcoming WebGL component releases, shader presets, and design system updates.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{"\u2713"} You are subscribed to Aura 3D updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-semibold text-slate-300">Aura 3D Interactive Platform</span>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} Aura3D Engine. Built with Next.js & Three.js.
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
