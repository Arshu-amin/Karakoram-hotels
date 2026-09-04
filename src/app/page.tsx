'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Shield,
  Activity,
  ChevronRight,
  Globe,
  Share2,
  Code2,
  Box,
  Sliders,
  Eye,
  Star,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Palette,
  CheckCircle2,
  Send,
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-wider">
          INITIALIZING WEBGL 3D...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<'torus' | 'icosahedron' | 'ring' | 'sphere'>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(2)
  const [distortion, setDistortion] = useState(0.4)
  const [scale, setScale] = useState(1)
  const [showParticles, setShowParticles] = useState(true)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Preset Handlers
  const applyPreset = (preset: 'cyber' | 'cosmic' | 'emerald' | 'sunset') => {
    switch (preset) {
      case 'cyber':
        setShape('torus')
        setColor('#6366f1')
        setSpeed(2.5)
        setDistortion(0.5)
        setScale(1.1)
        setShowParticles(true)
        break
      case 'cosmic':
        setShape('ring')
        setColor('#06b6d4')
        setSpeed(1.5)
        setDistortion(0.3)
        setScale(1.2)
        setShowParticles(true)
        break
      case 'emerald':
        setShape('icosahedron')
        setColor('#10b981')
        setSpeed(3)
        setDistortion(0.6)
        setScale(1)
        setShowParticles(true)
        break
      case 'sunset':
        setShape('sphere')
        setColor('#f43f5e')
        setSpeed(1.8)
        setDistortion(0.4)
        setScale(1.15)
        setShowParticles(true)
        break
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubscribed(true)
    }, 800)
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-70">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distortion={distortion}
          scale={scale}
          showParticles={showParticles}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-slate-800/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gradient-primary">
                AURA 3D
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                Studio Platform
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" /> Studio Config
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> Capabilities
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" /> Metrics
            </a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400" /> Reviews
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              WebGL 2.0 • 60 FPS
            </div>

            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-medium text-sm transition-all duration-300 shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
            >
              Launch Studio <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 text-xs sm:text-sm font-medium text-indigo-300 shadow-xl shadow-indigo-950/50"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Gen WebGL & Interactive 3D Framework</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.1]"
        >
          Architect the Future of{' '}
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Empower your web applications with real-time WebGL rendering,
          hardware-accelerated materials, and dynamic DOM-to-3D interaction logic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3"
          >
            <Sliders className="w-5 h-5" />
            Customize 3D Object
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 border border-slate-700/60 flex items-center justify-center gap-3"
          >
            <Eye className="w-5 h-5 text-indigo-400" />
            Explore Features
          </a>
        </motion.div>

        {/* Live Metric Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Render Rate', value: '60 FPS', sub: 'Smooth WebGL pipeline' },
            { label: 'Frame Latency', value: '< 0.2ms', sub: 'Zero GPU bottleneck' },
            { label: 'Standard', value: 'WebGL 2.0', sub: 'Cross-browser native' },
            { label: 'CPU Load', value: '< 1.5%', sub: 'Optimized thread ops' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass p-5 rounded-2xl border border-slate-800/80 text-left flex flex-col justify-between"
            >
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-gradient-primary my-1">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500">{stat.sub}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio Configurator Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full glass text-xs font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/30">
            Real-time Interactive Studio
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4">
            Customize the <span className="text-gradient-primary">3D Canvas</span> in Real-Time
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Modify geometric topology, material shaders, rotation speed, and particle density directly from this DOM control panel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg">Geometry & Material</h3>
              </div>
              <button
                onClick={() => applyPreset('cyber')}
                className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default
              </button>
            </div>

            {/* Presets Quick Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Style Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'cyber', name: 'Cyber Indigo', color: '#6366f1' },
                  { id: 'cosmic', name: 'Cosmic Cyan', color: '#06b6d4' },
                  { id: 'emerald', name: 'Emerald Pulse', color: '#10b981' },
                  { id: 'sunset', name: 'Sunset Ember', color: '#f43f5e' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id as 'cyber' | 'cosmic' | 'emerald' | 'sunset')}
                    className="px-3 py-2 rounded-xl text-xs font-medium glass hover:bg-slate-800 transition-all text-left flex items-center gap-2 border border-slate-800"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Geometry Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Mesh Topology
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'torus', label: 'Torus' },
                  { id: 'icosahedron', label: 'Icosa' },
                  { id: 'ring', label: 'Ring' },
                  { id: 'sphere', label: 'Sphere' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as 'torus' | 'icosahedron' | 'ring' | 'sphere')}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      shape === item.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'glass text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Color Palette */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Color Accent
              </label>
              <div className="flex gap-3">
                {['#6366f1', '#06b6d4', '#10b981', '#f43f5e', '#a855f7', '#eab308'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-transform transform active:scale-95 ${
                      color === c ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-105 opacity-80'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Rotation Speed</span>
                  <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Shader Distortion</span>
                  <span className="text-cyan-400 font-mono">{distortion.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={distortion}
                  onChange={(e) => setDistortion(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Mesh Scale</span>
                  <span className="text-purple-400 font-mono">{scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Particle Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm font-medium text-slate-300">GPU Particle Field</span>
              <button
                onClick={() => setShowParticles(!showParticles)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  showParticles ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    showParticles ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Interactive Viewport Info Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-indigo-300">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-400" /> Interactive Viewport
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Orbit: Drag • Zoom: Fixed
                </span>
              </div>

              <div className="my-auto py-12 text-center z-10 pointer-events-none">
                <div className="inline-block p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 backdrop-blur-md">
                  <Box className="w-12 h-12 text-indigo-400 animate-pulse" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Live WebGL Canvas Active</h4>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Drag with your mouse anywhere on screen to rotate the 3D model in real time.
                </p>
              </div>

              {/* Status Readout Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 z-10 text-xs font-mono">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-500">Geometry</div>
                  <div className="text-indigo-300 font-bold capitalize">{shape}</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-500">Speed</div>
                  <div className="text-cyan-300 font-bold">{speed.toFixed(1)}x</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-500">Distortion</div>
                  <div className="text-purple-300 font-bold">{distortion.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-slate-500">Particles</div>
                  <div className="text-emerald-300 font-bold">{showParticles ? '150 Active' : 'Off'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full glass text-xs font-mono text-indigo-400 uppercase tracking-widest border border-indigo-500/30">
            Engine Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4">
            Built for High-Performance <span className="text-gradient-primary">Visual Computing</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Designed from the ground up using React Three Fiber, Framer Motion, and Tailwind CSS v4.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Hardware Acceleration',
              desc: 'Direct WebGL pipeline leveraging desktop and mobile GPU hardware for silky smooth frame rendering.',
              glow: 'border-indigo-500/30',
              badge: 'WebGL 2.0',
            },
            {
              icon: Sliders,
              title: 'Reactive DOM State',
              desc: 'Seamless bidirectional state updates between DOM inputs and 3D mesh shader uniforms.',
              glow: 'border-cyan-500/30',
              badge: 'React 19',
            },
            {
              icon: Layers,
              title: 'Physical Materials',
              desc: 'Physically based rendering (PBR) featuring realistic roughness, metalness, and lighting reflections.',
              glow: 'border-purple-500/30',
              badge: 'PBR Shading',
            },
            {
              icon: Cpu,
              title: 'GPU Particle Engine',
              desc: 'High-density floating particle field rendered efficiently using buffer geometry attribute arrays.',
              glow: 'border-emerald-500/30',
              badge: '150+ Particles',
            },
            {
              icon: Shield,
              title: 'Hydration & SSR Safe',
              desc: 'Zero server-side hydration mismatches with dynamic import isolation and WebGL fallback handling.',
              glow: 'border-amber-500/30',
              badge: 'Next.js 16',
            },
            {
              icon: Sparkles,
              title: 'Glassmorphism Design',
              desc: 'Ultra-modern frosted glass UI overlays combined with subtle ambient background lighting.',
              glow: 'border-rose-500/30',
              badge: 'Tailwind v4',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card p-8 rounded-3xl flex flex-col justify-between border ${feature.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer">
                  Learn technical specs <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Showcase & Metrics Section */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-4 py-1.5 rounded-full glass text-xs font-mono text-emerald-400 uppercase tracking-widest border border-emerald-500/30">
                Performance Benchmark
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-6">
                Engineered for <span className="text-gradient-primary">Zero Latency</span> and Maximum Impact
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                By combining Three.js matrix calculations with React&apos;s state model, AURA 3D delivers high visual fidelity without compromising page load speeds or memory footprint.
              </p>

              <div className="space-y-4">
                {[
                  'Instant WebGL shader compilation and material initialization',
                  'Adaptive resolution scaling for low-power mobile devices',
                  'Zero layout shifts with fluid CSS glass container overlays',
                  'Fully accessible keyboard and screen-reader DOM controls',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Frame Rate', stat: '60.0 FPS', desc: 'Sustained throughput' },
                { title: 'Draw Calls', stat: '12 Calls', desc: 'Hyper-optimized geometry' },
                { title: 'Bundle Impact', stat: '< 45 KB', desc: 'Gzipped core module' },
                { title: 'Uptime', stat: '99.99%', desc: 'Tested cross-platform' },
              ].map((card, index) => (
                <div
                  key={index}
                  className="glass p-6 rounded-2xl border border-slate-800 text-center flex flex-col justify-center"
                >
                  <span className="text-xs text-slate-400 uppercase font-mono mb-2">{card.title}</span>
                  <span className="text-2xl sm:text-3xl font-black text-gradient-primary mb-1">{card.stat}</span>
                  <span className="text-[11px] text-slate-500">{card.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Wall */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full glass text-xs font-mono text-amber-400 uppercase tracking-widest border border-amber-500/30">
            Community Feedback
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-4">
            Trusted by <span className="text-gradient-primary">Frontend Creators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                'Integrating interactive 3D with Next.js used to feel sluggish. AURA 3D solved latency completely with incredible 60fps responsiveness.',
              author: 'Elena Rostova',
              role: 'Lead Frontend Architect',
            },
            {
              quote:
                'The real-time DOM-to-WebGL control panel allowed our design team to prototype interactive product landing pages in minutes.',
              author: 'Marcus Vance',
              role: 'Design Engineer at Synth',
            },
            {
              quote:
                'Clean code structure, zero SSR hydration bugs, and stunning glassmorphic UI. This is the template for modern web apps.',
              author: 'Sarah Lin',
              role: 'Creative Developer',
            },
          ].map((t, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  &quot;{t.quote}&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Newsletter CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl text-center relative overflow-hidden border border-indigo-500/30">
          <div className="max-w-2xl mx-auto">
            <span className="px-4 py-1.5 rounded-full glass text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/30">
              Stay Connected
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 mb-4">
              Ready to Upgrade Your <span className="text-gradient-primary">Web Experiences?</span>
            </h2>
            <p className="text-slate-300 text-base mb-8">
              Join thousands of developers receiving our monthly updates on WebGL techniques, shader optimization, and Next.js 16 best practices.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{"\u2713 Subscribed! Check your inbox for updates."}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-2xl glass border border-slate-700/80 bg-slate-900/60 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-grow text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 glass border-t border-slate-800/80 py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              A3D
            </div>
            <span className="font-bold text-slate-200">AURA 3D Studio</span>
            <span className="text-xs text-slate-500 font-mono">v2.4.0</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Configurator</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Metrics</a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Globe className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
            <Share2 className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
            <Code2 className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
            <Box className="w-5 h-5 hover:text-indigo-400 cursor-pointer transition-colors" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-xs text-slate-500 border-t border-slate-900 pt-6">
          © 2026 AURA 3D Studio. Built with Next.js 16, React Three Fiber, and Tailwind CSS v4.
        </div>
      </footer>
    </main>
  )
}
