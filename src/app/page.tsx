'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Sliders,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Shield,
  Box,
  Compass,
  Activity,
  Code2,
  Share2,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-indigo-300">Initializing WebGL Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PRESETS = [
  { name: 'Indigo Nebula', value: '#6366f1' },
  { name: 'Electric Cyan', value: '#06b6d4' },
  { name: 'Cyber Pink', value: '#ec4899' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Amber Sunset', value: '#f59e0b' },
]

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Bio Sphere' },
  { id: 'torus', label: 'Cyber Ring' },
]

const FEATURES = [
  {
    icon: Box,
    title: 'Spatial WebGL Engine',
    desc: 'Render high-fidelity procedural 3D geometries with Three.js and React Three Fiber at silky smooth 60fps.',
    badge: 'Hardware Accelerated'
  },
  {
    icon: Sliders,
    title: 'Reactive Parameter Mesh',
    desc: 'Bi-directional live communication between React UI inputs and real-time GPU material shaders.',
    badge: 'Live Interactive'
  },
  {
    icon: Zap,
    title: 'Turbopack Optimized',
    desc: 'Instant zero-lag server hydration and blazingly fast modern compilation pipeline.',
    badge: 'Ultra Fast'
  },
  {
    icon: Layers,
    title: 'Glassmorphic Design',
    desc: 'Layered frosted glass aesthetic with backdrop blur filters and dynamic chromatic gradients.',
    badge: 'Modern UI'
  },
  {
    icon: Activity,
    title: 'Dynamic Float & Physics',
    desc: 'Procedural oscillating floating harmonics with customizable angular velocity and distortion dampening.',
    badge: 'Procedural'
  },
  {
    icon: Shield,
    title: 'Enterprise Architecture',
    desc: 'Strict type safety with TypeScript, pure rendering compliance, and modern responsive layouts.',
    badge: 'Production Ready'
  }
]

const FAQS = [
  {
    q: 'How does the 3D scene synchronize with the frontend controls?',
    a: 'The 3D canvas leverages React Three Fiber reactive props. As you toggle geometries, adjust distortion rates, or modify color themes via the UI controller, state updates propagate directly to the WebGL shader uniforms without costly canvas re-instantiations.'
  },
  {
    q: 'Is this 3D interface mobile and tablet friendly?',
    a: 'Yes. The canvas and UI layouts are engineered to be fully responsive. Touch gestures are mapped cleanly, scroll interactions remain unhindered via disabled wheel capture, and GPU shaders adapt dynamically.'
  },
  {
    q: 'Can I export custom 3D models into this framework?',
    a: 'Absolutely. The architecture is configured to seamlessly support GLTF, OBJ, or custom procedural geometries with standard Drei loaders alongside the procedural materials.'
  },
  {
    q: 'What is the performance overhead of the WebGL layer?',
    a: 'Minimal. The scene utilizes optimized physical materials, vertex-based distortion shaders, and instanced starfield points, consistently maintaining 60 FPS across modern browsers.'
  }
]

export default function Home() {
  // 3D Scene Interactive State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(2.0)
  const [distort, setDistort] = useState<number>(0.45)

  // Interactive UI State
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [newsletterEmail, setNewsletterEmail] = useState<string>('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false)
  const [copiedCode, setCopiedCode] = useState<boolean>(false)

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('npx create-next-app@latest -e aura-3d')
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleResetControls = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setWireframe(false)
    setSpeed(2.0)
    setDistort(0.45)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene Layer */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
      </div>

      {/* Subtle ambient lighting gradients */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 glow-bg z-0" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 glow-bg z-0" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                AURA 3D
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.5 Next-Gen
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#controls" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors">Architecture</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#controls"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-indigo-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative max-w-5xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-indigo-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-indigo-300 font-semibold">
              Live WebGL 3D Interactive Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]"
          >
            Spatial Design Meets{' '}
            <span className="text-gradient-primary">Modern Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-12 font-normal leading-relaxed"
          >
            Immerse your users in an ultra-modern aesthetic powered by Next.js 16, React Three Fiber, and hardware-accelerated shaders with real-time controls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#controls"
              className="px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sliders className="w-5 h-5" />
              Customize 3D Object
            </a>

            <button
              onClick={handleCopyCode}
              className="px-6 py-4 rounded-xl font-medium text-base glass-panel hover:bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 text-slate-200 transition-all flex items-center gap-2"
            >
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>{copiedCode ? 'Copied to clipboard!' : 'npx create-aura-app'}</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { val: '60 FPS', label: 'Shader Performance' },
              { val: '< 0.1ms', label: 'Input Latency' },
              { val: '4 Shapes', label: 'Procedural Geometries' },
              { val: '100%', label: 'Responsive Design' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-xl text-center border border-white/5">
                <div className="text-2xl font-black text-gradient-secondary">{stat.val}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 3D STUDIO INTERACTIVE CONTROLLER SECTION */}
        <section id="controls" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Real-Time WebGL Control Deck
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Interactive 3D Customizer
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Test live shader interactions. Change the geometry, tweak the distortion harmonics, dial in rotation velocities, and watch the background canvas react in real-time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-indigo-500/20 backdrop-blur-xl">
            {/* Shapes selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                Select 3D Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                      shape === s.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-[1.02]'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Material Palette & Hue
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      color === c.value
                        ? 'border-white bg-slate-800 shadow-md ring-2 ring-indigo-500'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: c.value }}
                    />
                    {c.name}
                  </button>
                ))}

                {/* Custom Color Input */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs text-slate-400">Custom:</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-6 h-6 bg-transparent border-0 cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>

            {/* Sliders: Speed & Distortion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Rotation Velocity
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    {speed.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="6.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>Slow (0.2x)</span>
                  <span>Default (2.0x)</span>
                  <span>Hyper (6.0x)</span>
                </div>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-purple-400" />
                    Distortion Amplitude
                  </span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                    {distort.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.2"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>Rigid (0.0)</span>
                  <span>Balanced (0.45)</span>
                  <span>Liquid (1.2)</span>
                </div>
              </div>
            </div>

            {/* Toggle wireframe & reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={wireframe}
                  onChange={(e) => setWireframe(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  Enable Holographic Wireframe Shader
                </span>
              </label>

              <button
                onClick={handleResetControls}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Parameters
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Capabilities & Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Crafted for High Performance
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every detail is engineered for optimal visual fidelity, minimal bundle footprint, and silky smooth user interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={i}
                  className="glass-card p-8 rounded-3xl relative overflow-hidden group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400/80 mb-2 block">
                    {feat.badge}
                  </span>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ARCHITECTURE / SHOWCASE SECTION */}
        <section id="showcase" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                  Under the Hood
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-6 leading-tight">
                  Modern Reactive 3D Web Pipeline
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  Unlike traditional static websites, Aura 3D harmonizes the Document Object Model with an active WebGL rendering thread. Canvas renders run asynchronously while React maintains instantaneous user state updates.
                </p>

                <div className="space-y-4">
                  {[
                    'Dynamic chunk code splitting with next/dynamic (zero SSR WebGL penalties)',
                    'Custom GLSL vertex deformation shaders with configurable noise frequencies',
                    'Zero layout shift hydration with smooth fallback spinners',
                    'Tailwind CSS v4 modern utility system with glassmorphism blending'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-slate-500 ml-2">ScenePipeline.tsx</span>
                </div>
                <pre className="text-indigo-300">
{`// Real-time Material Shader Uniforms
const sceneState = {
  activeGeometry: "${shape}",
  materialColor: "${color}",
  wireframeActive: ${wireframe},
  oscillationRate: ${speed.toFixed(1)},
  distortionAmplitude: ${distort.toFixed(2)},
  starfieldParticles: 350,
  targetFPS: 60
};

export default function renderLoop() {
  requestAnimationFrame(render);
  updateShaderHarmonics(sceneState);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Everything you need to know about the 3D pipeline and spatial interface.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-semibold text-slate-200 hover:text-white"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* CALL TO ACTION & NEWSLETTER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                Get Connected
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 mb-4 tracking-tight">
                Ready to Upgrade Your Web Experience?
              </h2>
              <p className="text-slate-300 text-base mb-8">
                Subscribe to our spatial web insights and receive interactive Three.js animation templates directly in your inbox.
              </p>

              {newsletterSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>{"\u2713 Subscribed! We have sent a confirmation packet to your inbox."}</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newsletterEmail) setNewsletterSubmitted(true)
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 focus:outline-none text-white text-sm placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 glass-nav py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">AURA 3D</span>
            <span className="text-xs text-slate-500 ml-2">Next.js 16 + React Three Fiber</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Hero</a>
            <a href="#controls" className="hover:text-white transition-colors">3D Controls</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} Aura 3D Interactive. Built with precision & modern aesthetics.
          </div>
        </div>
      </footer>
    </div>
  )
}
