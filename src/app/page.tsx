'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Code2,
  Orbit,
  Palette,
  Activity,
  Send,
  Boxes
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SceneConfig, defaultConfig, ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
          Initializing WebGL Context...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>(defaultConfig)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleShapeChange = (shape: ShapeType) => {
    setSceneConfig((prev) => ({ ...prev, shape }))
  }

  const handleColorChange = (color: string) => {
    setSceneConfig((prev) => ({ ...prev, color }))
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyber Neon', hex: '#ec4899' },
    { name: 'Quantum Cyan', hex: '#38bdf8' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Amber Pulse', hex: '#f59e0b' },
    { name: 'Royal Violet', hex: '#8b5cf6' },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: 'Real-time WebGL Shaders',
      desc: 'High-performance GLSL material shaders and geometry displacement running at 60+ FPS.',
      badge: 'Hardware Accelerated',
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      title: 'Glassmorphic UI Design',
      desc: 'Layered frosted glass elements built with Tailwind v4, dynamic blur, and reactive borders.',
      badge: 'Modern Aesthetic',
    },
    {
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      title: 'Optimized React 19 Engine',
      desc: 'Leverages modern React 19 state synchronization and dynamic client-side WebGL canvas rendering.',
      badge: 'Zero Jank',
    },
    {
      icon: <Orbit className="w-6 h-6 text-pink-400" />,
      title: 'Interactive Controls',
      desc: 'Seamless real-time binding between DOM controls and 3D WebGL scene materials and parameters.',
      badge: 'Bidirectional Sync',
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: 'Responsive & Accessible',
      desc: 'Fully fluid layout engineered for mobile devices, high-DPI displays, and keyboard navigation.',
      badge: 'Cross-Platform',
    },
    {
      icon: <Code2 className="w-6 h-6 text-amber-400" />,
      title: 'Developer Focused',
      desc: 'Clean TypeScript codebase with strict ESLint validation and modular component hierarchy.',
      badge: 'TypeScript Ready',
    },
  ]

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Persistent Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene config={sceneConfig} />
      </div>

      <main className="relative z-10 flex-1">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">
                Next-Gen 3D Web Interface v2.0
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08]">
                Immersive <br className="hidden sm:inline" />
                <span className="text-gradient-primary">3D Web Experience</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-2xl text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed"
            >
              Experience the convergence of modern web aesthetics and real-time WebGL graphics, crafted for speed, interaction, and visual depth.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <a
                href="#customizer"
                className="glow-button px-8 py-4 rounded-full text-base font-semibold text-white flex items-center gap-3 group w-full sm:w-auto justify-center"
              >
                <Sliders className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                Customize 3D Object
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-full text-base font-semibold text-slate-300 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all backdrop-blur-md w-full sm:w-auto justify-center flex items-center gap-2"
              >
                Explore Features
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { label: 'FRAME RATE', value: '60 FPS' },
                { label: 'WEBGL VERSION', value: '2.0 Active' },
                { label: 'LIGHTWEIGHT', value: '< 100kb Core' },
                { label: 'RESPONSE TIME', value: '1.2ms Sync' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="text-base font-bold text-slate-200">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3D INTERACTIVE CUSTOMIZER SECTION */}
        <section id="customizer" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="glass p-8 sm:p-12 rounded-3xl border border-slate-800/80 relative overflow-hidden shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                  <Palette className="w-3.5 h-3.5" />
                  Live Studio Customizer
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Real-time 3D Scene Controls
                </h2>

                <p className="text-slate-400 text-base leading-relaxed">
                  Interact with the WebGL canvas in real-time. Choose different parametric geometries, adjust noise distortion, tweak rotation speed, or toggle metallic wireframe mode.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span>Instant reactive state binding with WebGL shaders</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span>Hardware-accelerated mesh deformation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span>Dynamic floating particle system synchronization</span>
                  </div>
                </div>
              </div>

              {/* Control Panel Column */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-inner">
                {/* Shape Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-indigo-400" />
                    Geometry Shape
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'torus', label: 'Torus Knot' },
                      { id: 'icosahedron', label: 'Icosahedron' },
                      { id: 'dodecahedron', label: 'Dodecahedron' },
                      { id: 'sphere', label: 'Sphere' },
                    ].map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => handleShapeChange(shape.id as ShapeType)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                          sceneConfig.shape === shape.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-purple-400" />
                    Material Color Accent
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => handleColorChange(preset.hex)}
                        className={`w-9 h-9 rounded-full transition-all flex items-center justify-center border-2 ${
                          sceneConfig.color === preset.hex
                            ? 'border-white scale-110 shadow-lg'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: preset.hex }}
                        title={preset.name}
                      >
                        {sceneConfig.color === preset.hex && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Rotation Speed Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Rotation Speed</span>
                      <span className="font-mono text-indigo-400">{sceneConfig.speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={sceneConfig.speed}
                      onChange={(e) =>
                        setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                      }
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800"
                    />
                  </div>

                  {/* Surface Distortion Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Surface Distortion</span>
                      <span className="font-mono text-purple-400">{sceneConfig.distort.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={sceneConfig.distort}
                      onChange={(e) =>
                        setSceneConfig((prev) => ({ ...prev, distort: parseFloat(e.target.value) }))
                      }
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500 border border-slate-800"
                    />
                  </div>
                </div>

                {/* Toggles & Reset */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sceneConfig.wireframe}
                      onChange={(e) =>
                        setSceneConfig((prev) => ({ ...prev, wireframe: e.target.checked }))
                      }
                      className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-300">
                      Wireframe Overlay Mode
                    </span>
                  </label>

                  <button
                    onClick={() => setSceneConfig(defaultConfig)}
                    className="text-xs font-mono text-slate-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES BENTO GRID SECTION */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Engineered for <span className="text-gradient-primary">Performance</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Combining bleeding-edge WebGL shader mechanics with modern React architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all">
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Learn architecture details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION / SUBSCRIPTION SECTION */}
        <section id="cta" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="glass p-10 sm:p-16 rounded-3xl border border-indigo-500/20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
                <Activity className="w-3.5 h-3.5" />
                Developer Community
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Stay Ahead in <span className="text-gradient-secondary">3D Web Tech</span>
              </h2>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Join our developer ecosystem to receive updates on WebGL shader techniques, React Three Fiber optimizations, and modern web UI trends.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3 font-medium"
                >
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <span>{"\u2713"} You&apos;re subscribed! Check your inbox for launch details.</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="glow-button px-7 py-3.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              <p className="text-xs text-slate-500 pt-2">
                No spam. Unsubscribe at any time with one click.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
