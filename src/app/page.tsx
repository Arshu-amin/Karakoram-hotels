'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  Maximize2,
  Sliders,
  Palette,
  RotateCw,
  Box,
  Compass,
  Play,
  Zap,
  Globe,
  Shield,
  Activity,
  Code2,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-400">Loading WebGL Engine...</span>
      </div>
    </div>
  ),
})

const COLOR_PRESETS = [
  { name: 'Neon Indigo', value: '#6366f1' },
  { name: 'Cyber Pink', value: '#ec4899' },
  { name: 'Hyper Cyan', value: '#06b6d4' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Sunset Amber', value: '#f97316' },
]

const GEOMETRY_OPTIONS: { id: GeometryType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Cyber Sphere' },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Hardware Accelerated WebGL',
    desc: 'Harness the full compute power of GPU-driven geometry rendering with zero lag and instant shader pipelines.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Layers,
    title: 'Multi-Pass Post Processing',
    desc: 'Achieve cinematic quality with bloom, depth-of-field, screen-space reflections, and clearcoat physical shaders.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    icon: Cpu,
    title: 'Next.js 16 & React 19 Ready',
    desc: 'Zero-runtime overhead with Turbopack compilation and dynamic client-side hydration for maximum SEO and speed.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Global Edge Distribution',
    desc: 'Distribute assets and 3D experiences worldwide with sub-millisecond edge latency and optimized binary compression.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Activity,
    title: 'Dynamic Reactive Physics',
    desc: 'Seamlessly bind cursor physics, gyro gestures, and viewport scroll velocities to Three.js transforms.',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Robustness',
    desc: 'Battle-tested fallback layers ensure full visual elegance even on low-end or battery-saver mobile devices.',
    color: 'from-violet-400 to-indigo-500',
  },
]

const FAQS = [
  {
    q: 'How does Aura 3D maintain steady 120 FPS performance?',
    a: 'By utilizing optimized buffer geometries, minimal draw calls, high-efficiency physical materials, and off-thread WebGL rendering with requestAnimationFrame synchronization.',
  },
  {
    q: 'Can I integrate my own custom 3D models (GLTF/GLB)?',
    a: 'Absolutely! Aura 3D supports GLTF/GLB formats, custom glsl vertex and fragment shaders, and Drei loader abstractions out of the box.',
  },
  {
    q: 'Is it mobile and touch responsive?',
    a: 'Yes. The canvas gestures respond fluidly to single and multi-touch events, and particle counts automatically optimize according to device GPU tiers.',
  },
  {
    q: 'What stack powers this architecture?',
    a: 'Next.js 16 (Turbopack), React 19, React-Three-Fiber, Three.js, Tailwind CSS v4, and Framer Motion.',
  },
]

export default function Home() {
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.2)
  const [wireframe, setWireframe] = useState(false)
  const [scale, setScale] = useState(1.3)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Interactive 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-75">
        <Scene
          geometry={geometry}
          color={color}
          speed={speed}
          wireframe={wireframe}
          scale={scale}
        />
      </div>

      {/* Decorative Gradient Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[#030712]/60 to-[#030712]" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950/80 backdrop-blur rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Aura<span className="text-gradient-primary">3D</span>
              </span>
              <span className="text-[10px] block uppercase font-mono tracking-widest text-indigo-400/80 -mt-1">
                Spatial Engine v2.4
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#lab" className="hover:text-white transition-colors duration-200">
              Interactive Lab
            </a>
            <a href="#features" className="hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#stats" className="hover:text-white transition-colors duration-200">
              Performance
            </a>
            <a href="#faq" className="hover:text-white transition-colors duration-200">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#lab"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all backdrop-blur-sm"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Tune 3D
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Next-Generation WebGL Spatial Experience</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] text-emerald-300 font-mono">120 FPS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight max-w-5xl leading-[1.08] mb-8"
        >
          Elevate Your Web into a{' '}
          <span className="text-gradient-primary">3D Dimension</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300/90 max-w-3xl mb-12 font-light leading-relaxed"
        >
          Immerse your users with fluid real-time WebGL graphics, physical
          shaders, and dynamic interactions directly in modern Next.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#lab"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-white" />
            Explore 3D Lab
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-200 glass hover:bg-slate-800/80 transition-all border border-slate-700/60 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            Explore Capabilities
          </a>
        </motion.div>

        {/* Live interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center gap-3 text-xs text-slate-400/80 font-mono uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Interactive 3D Canvas Active &bull; Drag mouse to rotate</span>
        </motion.div>
      </section>

      {/* Interactive Spatial Lab / Customizer Deck */}
      <section id="lab" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-24">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-1">
                  <Sliders className="w-4 h-4" />
                  <span>Real-Time Controller</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Interactive Spatial Lab
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Customize the 3D WebGL viewport parameters in real time.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
                <button
                  onClick={() => {
                    setGeometry('torusKnot')
                    setColor('#6366f1')
                    setSpeed(1.2)
                    setWireframe(false)
                    setScale(1.3)
                  }}
                  className="px-3 py-1.5 rounded-lg glass hover:bg-slate-800 text-xs font-mono text-slate-300 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {/* Geometry Picker */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-indigo-400" />
                  Shape Geometry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GEOMETRY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setGeometry(opt.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                        geometry === opt.id
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                          : 'glass text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-pink-400" />
                  Color Spectrum
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setColor(preset.value)}
                      title={preset.name}
                      className={`w-9 h-9 rounded-xl transition-transform ${
                        color === preset.value
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: preset.value }}
                    />
                  ))}
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-1">
                  Active Hex: <span className="text-white font-bold">{color}</span>
                </div>
              </div>

              {/* Rotation Speed Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                    Kinetic Velocity
                  </label>
                  <span className="font-mono text-cyan-300 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Slow (0.2x)</span>
                  <span>Normal</span>
                  <span>Hyper (3.0x)</span>
                </div>
              </div>

              {/* Scale & Wireframe */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    Geometry Scale
                  </label>
                  <span className="font-mono text-emerald-300 font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="pt-2">
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      wireframe
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                        : 'glass border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Wireframe Mode: {wireframe ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4">
            Engine Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Engineered for High-Fidelity 3D Web
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A comprehensive WebGL spatial toolchain built seamlessly into Next.js.
            Everything you need for cutting-edge interactive graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-8 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-[1px] mb-6 group-hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full bg-slate-950/90 rounded-[11px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Performance & Metrics Showcase */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 overflow-hidden relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
            <div className="pt-4 lg:pt-0">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2 text-gradient-primary">
                120 FPS
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Sustained Framerate
              </div>
              <p className="text-[11px] text-slate-500 mt-1">GPU accelerated rendering</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-8">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2 text-gradient-secondary">
                &lt; 16ms
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Draw Call Latency
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Zero frame stuttering</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-8">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2 text-gradient-gold">
                99.9%
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                WebGL Compatibility
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Universal cross-browser</p>
            </div>

            <div className="pt-4 lg:pt-0 lg:pl-8">
              <div className="text-4xl sm:text-5xl font-black text-white font-mono mb-2 text-emerald-400">
                0 kB
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                SSR Bundle Leak
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Turbopack tree-shaken</p>
            </div>
          </div>
        </div>

        {/* Code preview snippet */}
        <div className="mt-12 glass rounded-2xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span className="font-mono text-sm text-slate-300">Declarative 3D Canvas Usage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto p-2 leading-relaxed">
            <code>{`// Effortless Next.js 16 WebGL Scene integration
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

export default function SpatialScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <Float speed={2} rotationIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshPhysicalMaterial roughness={0.15} metalness={0.85} color="#6366f1" />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}`}</code>
          </pre>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about spatial 3D architecture on the web.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={faq.q}
                className="glass-card rounded-xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left text-base font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section id="cta" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-6">
              Early Developer Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              Ready to Build the Spatial Web?
            </h2>
            <p className="text-slate-300 mb-8 text-base sm:text-lg">
              Join thousands of innovative creators crafting next-generation 3D
              interfaces with Next.js and WebGL.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                {"\u2713 You're on the early access list! Check your inbox soon."}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Join Preview
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Box className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Aura<span className="text-gradient-primary">3D</span>
              </span>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-400">
              <a href="#lab" className="hover:text-white transition-colors">
                Interactive Lab
              </a>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#stats" className="hover:text-white transition-colors">
                Performance
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                Architecture
              </a>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} Aura 3D Technologies. Next.js 16 WebGL Spatial Platform.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
