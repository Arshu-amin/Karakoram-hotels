'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Maximize2,
  RotateCw,
  Palette,
  CheckCircle2,
  Star,
  Send,
  Globe,
  Share2,
  Code2
} from 'lucide-react'

// Dynamic import for WebGL scene with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-xs font-mono text-slate-400">Initializing 3D Canvas...</p>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls State
  const [speed, setSpeed] = useState<number>(1)
  const [distort, setDistort] = useState<number>(0.4)
  const [scale, setScale] = useState<number>(1)
  const [shape, setShape] = useState<'torusKnot' | 'icosahedron' | 'sphere' | 'torus'>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [showCustomizer, setShowCustomizer] = useState<boolean>(true)

  // Interactive Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Active Playground Tab State
  const [activeTab, setActiveTab] = useState<'visuals' | 'tech' | 'performance'>('visuals')

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
    { label: 'Pink', value: '#ec4899' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Emerald', value: '#10b981' }
  ]

  const shapeOptions: { label: string; value: 'torusKnot' | 'icosahedron' | 'sphere' | 'torus' }[] = [
    { label: 'Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Torus', value: 'torus' }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D Canvas Background Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          speed={speed}
          distort={distort}
          scale={scale}
          shape={shape}
          color={color}
        />
        {/* Subtle Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-nav rounded-2xl px-6 py-3 shadow-2xl">
          <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-gradient-primary text-xl font-extrabold">AURA 3D</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Performance</a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Showcase</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="p-2.5 rounded-xl glass hover:bg-slate-800/80 text-slate-300 border border-slate-700/60 transition-all text-xs flex items-center gap-1.5"
              title="Toggle Controls"
            >
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Controls</span>
            </button>
            <a
              href="#customizer"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              Explore 3D
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-xs font-semibold tracking-wide uppercase text-indigo-300">Next-Gen Interface v2.0</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl mb-6 leading-tight"
        >
          Crafting <span className="text-gradient-primary">Immersive</span> 3D Digital Web Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-normal"
        >
          Elevate your application with real-time WebGL rendering, fluid glassmorphism UI,
          and seamless physics-driven animations built for high frame rates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            Launch Studio <Sparkles className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            View Features
          </a>
        </motion.div>

        {/* Quick Highlights Counter Pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full px-4"
        >
          {[
            { label: 'Render Speed', value: '60+ FPS' },
            { label: 'Bundle Footprint', value: '< 45KB' },
            { label: 'Interactive Controls', value: 'Real-Time' },
            { label: 'Browser Engine', value: 'WebGL 2.0' }
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-card text-center border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-bold text-gradient-secondary mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Real-time 3D Customizer Controls Panel */}
      <AnimatePresence>
        {showCustomizer && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 w-80 sm:w-96 glass-card rounded-3xl p-6 shadow-2xl border border-indigo-500/20 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-300">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>3D Canvas Live Inspector</span>
              </div>
              <button
                onClick={() => setShowCustomizer(false)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 rounded-lg hover:bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Shape Selection */}
              <div>
                <label className="block text-slate-400 font-medium mb-1.5 flex items-center justify-between">
                  <span>Geometry Shape</span>
                  <span className="text-indigo-400 font-mono capitalize">{shape}</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {shapeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setShape(opt.value)}
                      className={`py-1.5 rounded-xl border text-[11px] font-medium transition-all ${
                        shape === opt.value
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Preset Picker */}
              <div>
                <label className="block text-slate-400 font-medium mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-indigo-400" /> Material Color
                  </span>
                  <span className="text-slate-400 font-mono">{color}</span>
                </label>
                <div className="flex gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-7 h-7 rounded-full transition-transform border-2 ${
                        color === c.value ? 'scale-110 border-white shadow-md' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Rotation Speed Slider */}
              <div>
                <div className="flex justify-between text-slate-400 font-medium mb-1">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-400" /> Rotation Speed
                  </span>
                  <span className="font-mono text-indigo-300">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Mesh Distortion Slider */}
              <div>
                <div className="flex justify-between text-slate-400 font-medium mb-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" /> Mesh Distortion
                  </span>
                  <span className="font-mono text-indigo-300">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div>
                <div className="flex justify-between text-slate-400 font-medium mb-1">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-indigo-400" /> Object Scale
                  </span>
                  <span className="font-mono text-indigo-300">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Performance & Beauty</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Combining state-of-the-art WebGL technology with modern UI design principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "60 FPS WebGL Engine",
              desc: "Optimized Three.js rendering loop with custom physical materials and lighting setups.",
              color: "text-amber-400"
            },
            {
              icon: Box,
              title: "Reactive Dynamic Controls",
              desc: "Seamless state binding between standard DOM controls and 3D mesh instances.",
              color: "text-indigo-400"
            },
            {
              icon: Cpu,
              title: "Next.js 16 & React 19",
              desc: "Built on the cutting-edge React ecosystem with Turbopack acceleration.",
              color: "text-cyan-400"
            },
            {
              icon: Layers,
              title: "Glassmorphism UI",
              desc: "Polished frosted glass layers, fluid gradients, and crisp dark mode elements.",
              color: "text-purple-400"
            },
            {
              icon: Sparkles,
              title: "Interactive Cursor",
              desc: "Custom spring-driven cursor follower that reacts gracefully to interactive elements.",
              color: "text-pink-400"
            },
            {
              icon: ShieldCheck,
              title: "Production Ready",
              desc: "Fully type-safe codebase, strict linting, and comprehensive cross-browser support.",
              color: "text-emerald-400"
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-3xl glass-card border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
              >
                <div className={`p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-5 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Interactive Studio / Playground Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Interactive Studio</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-2 mb-6">
              Customize Your <span className="text-gradient-secondary">3D Environment</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              Use the floating panel at the bottom right or test preset configurations below to instantly modify the background WebGL canvas parameters in real time.
            </p>

            {/* Tab Controls */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { id: 'visuals', label: 'Visual Style' },
                { id: 'tech', label: 'Tech Stack' },
                { id: 'performance', label: 'Performance' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'visuals' | 'tech' | 'performance')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'glass hover:bg-slate-800 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              {activeTab === 'visuals' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-300">Quickly apply visual presets to the active 3D object:</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setShape('torusKnot')
                        setColor('#6366f1')
                        setSpeed(1.2)
                        setDistort(0.5)
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/30 text-xs font-semibold"
                    >
                      Cyber Kinetic
                    </button>
                    <button
                      onClick={() => {
                        setShape('icosahedron')
                        setColor('#ec4899')
                        setSpeed(0.8)
                        setDistort(0.2)
                      }}
                      className="px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:bg-pink-500/30 text-xs font-semibold"
                    >
                      Neon Crystal
                    </button>
                    <button
                      onClick={() => {
                        setShape('sphere')
                        setColor('#06b6d4')
                        setSpeed(1.8)
                        setDistort(0.8)
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold"
                    >
                      Quantum Fluid
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-slate-500 mb-1">Framework</div>
                    <div className="font-bold text-indigo-400">Next.js 16</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-slate-500 mb-1">Library</div>
                    <div className="font-bold text-indigo-400">React 19</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-slate-500 mb-1">3D Engine</div>
                    <div className="font-bold text-indigo-400">Three.js</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-slate-500 mb-1">Styling</div>
                    <div className="font-bold text-indigo-400">Tailwind v4</div>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span>Frame Rate Target</span>
                    <span className="font-mono text-emerald-400 font-bold">60 FPS</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span>Particle Stars Count</span>
                    <span className="font-mono text-indigo-400 font-bold">1,000 Points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Server Side Rendering</span>
                    <span className="font-mono text-cyan-400 font-bold">Dynamic (Client Only)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Showcase Banner */}
      <section id="metrics" className="relative z-10 max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "99.9%", label: "Uptime & Performance Efficiency", icon: ShieldCheck },
            { value: "10x", label: "Faster Initial WebGL Load Times", icon: Zap },
            { value: "100%", label: "Fully Responsive Across All Devices", icon: Globe }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="p-8 rounded-3xl glass text-center border border-slate-800/80">
                <Icon className="w-8 h-8 mx-auto mb-4 text-indigo-400" />
                <div className="text-4xl font-extrabold text-slate-100 mb-2">{item.value}</div>
                <div className="text-sm text-slate-400 font-medium">{item.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials / Reviews Section */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Loved by <span className="text-gradient-primary">Designers & Developers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See what creators say about building next-level interactive WebGL interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The 3D canvas integration is butter smooth. Creating custom web graphics has never been this effortless.",
              author: "Alex Rivera",
              role: "Lead Creative Technologist"
            },
            {
              quote: "Combining Next.js 16 with Three.js distortion materials gave our landing page an unbeatable competitive edge.",
              author: "Sophia Chen",
              role: "Head of Product Design"
            },
            {
              quote: "Incredible attention to detail with glassmorphism UI cards and spring-driven mouse interactions.",
              author: "Marcus Vance",
              role: "Senior Frontend Architect"
            }
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl glass-card border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">&quot;{review.quote}&quot;</p>
              </div>
              <div className="border-t border-slate-800/80 pt-4">
                <div className="font-bold text-slate-200 text-sm">{review.author}</div>
                <div className="text-xs text-slate-500">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto py-20 px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 w-fit mx-auto mb-6">
            <Send className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Stay Ahead in <span className="text-gradient-secondary">3D Web Innovation</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Subscribe to receive updates on new WebGL shaders, UI kits, and performance optimization guides.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed"} — Welcome to Aura 3D!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="flex-1 px-5 py-3.5 rounded-2xl glass border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>AURA 3D Studio</span>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" /> Documentation
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> WebGL Specs
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Community
            </a>
          </div>

          <p className="text-xs">© 2026 Aura 3D. Crafted with Next.js & Three.js.</p>
        </div>
      </footer>
    </main>
  )
}
