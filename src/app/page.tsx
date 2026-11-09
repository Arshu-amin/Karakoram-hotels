'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Globe,
  Sliders,
  Code2,
  Box,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  RefreshCw,
  Terminal,
  Activity,
  Send,
  Star
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  )
})

interface ColorTheme {
  name: string
  value: string
  bgClass: string
}

const COLOR_THEMES: ColorTheme[] = [
  { name: 'Indigo Aura', value: '#6366f1', bgClass: 'bg-indigo-500' },
  { name: 'Cyan Flux', value: '#06b6d4', bgClass: 'bg-cyan-500' },
  { name: 'Violet Neon', value: '#a855f7', bgClass: 'bg-purple-500' },
  { name: 'Emerald Wave', value: '#10b981', bgClass: 'bg-emerald-500' },
  { name: 'Amber Core', value: '#f59e0b', bgClass: 'bg-amber-500' }
]

const GEOMETRIES: { id: GeometryType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Cyber Sphere' }
]

export default function Home() {
  // 3D Scene Interactive Controls
  const [activeGeometry, setActiveGeometry] = useState<GeometryType>('torusKnot')
  const [activeColor, setActiveColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1.8)
  const [distortion, setDistortion] = useState<number>(0.45)

  // Interactive UI States
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'shader' | 'pipeline'>('react')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setNewsletterStatus('success')
    }
  }

  const reset3DControls = () => {
    setActiveGeometry('torusKnot')
    setActiveColor('#6366f1')
    setWireframe(false)
    setSpeed(1.8)
    setDistortion(0.45)
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Grid Accent */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Ambient Lighting Orbs */}
      <div className="glow-orb top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/30" />
      <div className="glow-orb top-[40%] right-[-150px] w-[600px] h-[600px] bg-cyan-600/20" />
      <div className="glow-orb bottom-[-100px] left-[20%] w-[550px] h-[550px] bg-purple-600/20" />

      {/* Fixed Interactive 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          geometry={activeGeometry}
          color={activeColor}
          wireframe={wireframe}
          speed={speed}
          distort={distortion}
        />
      </div>

      {/* Glassmorphic Navbar */}
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Aura<span className="text-cyan-400">3D</span>
              </span>
              <span className="text-[10px] text-slate-400 block tracking-wider uppercase font-mono">Spatial Engine</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine v2.4 Active
            </div>
            <a
              href="#studio"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>Explore Studio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Overlay */}
      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-5rem)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-indigo-300 mb-8 border border-indigo-500/30 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Generation Spatial Computing & WebGL Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl text-gradient-vibrant mb-6 leading-[1.08]"
          >
            Sculpting the Modern Spatial Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            Immersive 3D generative visuals integrated seamlessly into responsive, high-performance web applications with React 19, Three.js, and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#studio"
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sliders className="w-5 h-5" />
              <span>Launch 3D Controller</span>
            </a>
            <a
              href="#architecture"
              className="px-8 py-4 rounded-xl font-semibold glass-panel glass-panel-hover text-slate-200 border border-slate-700/80 flex items-center gap-2"
            >
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>View Architecture</span>
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { label: 'Frame Rate', value: '60+ FPS', icon: Zap },
              { label: 'Bundle Footprint', value: '< 120 KB', icon: Cpu },
              { label: 'Engine Latency', value: '< 4.2 ms', icon: Activity },
              { label: 'Browser Support', value: '100% WebGL2', icon: Globe }
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-mono mb-1">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{stat.label}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">{stat.value}</div>
                </div>
              )
            })}
          </motion.div>
        </section>

        {/* 3D Studio Live Controller Section */}
        <section id="studio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-4">
              <Sliders className="w-3.5 h-3.5" />
              Real-time WebGL Studio
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Manipulate 3D Space in Real Time
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Adjust geometry primitives, distortion tension, wireframe meshes, and chromatic shaders directly from the DOM control dock below.
            </p>
          </div>

          {/* Interactive Floating Control Deck */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white tracking-wide">Live Scene Parameters</span>
              </div>
              <button
                onClick={reset3DControls}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/60 transition-colors"
                title="Reset to defaults"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Geometry Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">
                  Geometry Primitive
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GEOMETRIES.map((geom) => (
                    <button
                      key={geom.id}
                      onClick={() => setActiveGeometry(geom.id)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between border ${
                        activeGeometry === geom.id
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      <span>{geom.label}</span>
                      {activeGeometry === geom.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette Theme */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-3">
                  Chromatic Accent & Fog Light
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => setActiveColor(theme.value)}
                      title={theme.name}
                      className={`h-11 rounded-xl flex items-center justify-center transition-transform ${theme.bgClass} ${
                        activeColor === theme.value
                          ? 'ring-2 ring-white scale-105 shadow-lg shadow-indigo-500/30'
                          : 'opacity-70 hover:opacity-100 hover:scale-100'
                      }`}
                    >
                      {activeColor === theme.value && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-right">
                  <span className="text-xs font-mono text-slate-400">
                    Selected: {COLOR_THEMES.find(t => t.value === activeColor)?.name}
                  </span>
                </div>
              </div>

              {/* Distortion Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono uppercase text-slate-300 mb-2">
                  <span>Distortion Velocity</span>
                  <span className="text-cyan-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>0.5x (Ambient)</span>
                  <span>4.0x (Hyper)</span>
                </div>
              </div>

              {/* Surface Tension / Distort Amplitude */}
              <div>
                <div className="flex justify-between text-xs font-mono uppercase text-slate-300 mb-2">
                  <span>Surface Tension (Distort)</span>
                  <span className="text-cyan-400 font-bold">{(distortion * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={distortion}
                  onChange={(e) => setDistortion(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>0% (Rigid)</span>
                  <span>100% (Fluid)</span>
                </div>
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      wireframe ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-slate-200">
                  Toggle Wireframe Mesh Architecture
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Drag background to rotate perspective</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Capabilities Grid */}
        <section id="features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-4">
              <Layers className="w-3.5 h-3.5" />
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Engineered for Speed, Scale & Immersion
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Every detail is engineered with GPU hardware acceleration, zero layout thrashing, and crisp micro-interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: 'High-Fidelity WebGL 2.0',
                desc: 'Built upon Three.js & React-Three-Fiber with custom PBR materials and procedural noise displacement.',
                tag: 'GPU Accelerated'
              },
              {
                icon: Zap,
                title: 'Sub-Millisecond Pipeline',
                desc: 'Zero main-thread blocking with optimized draw calls, instanced meshes, and frustum culling.',
                tag: '60 FPS Target'
              },
              {
                icon: Cpu,
                title: 'Turbopack Bundling',
                desc: 'Fast Next.js 16 incremental compilation powering instantaneous hot reload and ultra-lean production builds.',
                tag: 'Turbopack Engine'
              },
              {
                icon: Sliders,
                title: 'Declarative State Sync',
                desc: 'DOM state hooks reactively modulate 3D materials, camera positioning, and lighting vectors instantaneously.',
                tag: 'Two-Way Binding'
              },
              {
                icon: ShieldCheck,
                title: 'Purity & Reliability',
                desc: 'Strict React 19 component purity guidelines with deterministic procedural generation for SSR consistency.',
                tag: 'React 19 Safe'
              },
              {
                icon: Globe,
                title: 'Universal Responsiveness',
                desc: 'Adaptive pixel ratio and dynamic resolution scaling ensure smooth performance across mobiles, tablets, and 4K displays.',
                tag: 'Responsive WebGL'
              }
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="glass-panel glass-panel-hover p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/60">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                    <span>Learn technical specs</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Technical Showcase & Architecture Preview */}
        <section id="architecture" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300 mb-4">
                  <Terminal className="w-3.5 h-3.5" />
                  Clean Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                  Declarative 3D Meets Modern React
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  Experience seamless synchronization between stateful React application code and the Three.js rendering loop. Inspect the interactive architectural snippet to see how simple yet expressive our component abstractions are.
                </p>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Deterministic seed generator prevents SSR hydration drift</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Asynchronous dynamic import with fallback loader</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero layout shift with full-bleed viewport layering</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-2xl">
                  {/* Tab Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs text-slate-400 font-mono ml-2">Scene.tsx</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setActiveCodeTab('react')}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          activeCodeTab === 'react' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        React
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('shader')}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          activeCodeTab === 'shader' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Material
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('pipeline')}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                          activeCodeTab === 'pipeline' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Pipeline
                      </button>
                    </div>
                  </div>

                  {/* Code Body */}
                  <div className="p-6 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                    {activeCodeTab === 'react' && (
                      <pre>
                        <code>{`export default function Scene({ geometry, color, speed }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <fog attach="fog" args={['#020617', 5, 20]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 5]} color={color} />

      {/* Dynamic 3D Geometry Hook */}
      <Float speed={speed} rotationIntensity={1.2}>
        <MainGeometry shape={geometry} color={color} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}`}</code>
                      </pre>
                    )}
                    {activeCodeTab === 'shader' && (
                      <pre>
                        <code>{`<MeshDistortMaterial
  color="${activeColor}"
  speed={${speed.toFixed(1)}}
  distort={${distortion.toFixed(2)}}
  roughness={0.2}
  metalness={0.8}
  wireframe={${wireframe ? 'true' : 'false'}}
/>`}</code>
                      </pre>
                    )}
                    {activeCodeTab === 'pipeline' && (
                      <pre>
                        <code>{`// WebGL Pipeline Telemetry
Renderer: WebGL 2.0 (Three.js r184)
Draw Calls: 4 per frame
Vertices: 4,096 | Triangles: 8,192
VRAM Usage: ~ 14.8 MB
Target Frame Rate: 60 FPS (VSync Locked)`}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Membership Tiers */}
        <section id="pricing" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Transparent Pricing
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Scalable Plans for Any Creative Team
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mb-8">
              From standalone prototypes to multi-region global WebGL deployment pipelines.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-slate-900/80 border border-slate-800">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] bg-cyan-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                desc: 'Perfect for independent creators and experimental portfolios.',
                monthlyPrice: '$0',
                yearlyPrice: '$0',
                features: ['Unlimited 3D viewer components', 'Basic shader distortion library', 'Community Discord access', 'Standard WebGL2 support'],
                cta: 'Start Free',
                popular: false
              },
              {
                name: 'Studio Pro',
                desc: 'Tailored for creative agencies delivering custom interactive web applications.',
                monthlyPrice: '$39',
                yearlyPrice: '$29',
                features: ['All Starter features included', 'Advanced PBR & GLTF model loader', 'Custom procedural noise shaders', 'Priority Turbopack asset pipeline', 'Exportable component presets'],
                cta: 'Get Studio Pro',
                popular: true
              },
              {
                name: 'Enterprise',
                desc: 'Dedicated infrastructure, custom WebGL engines, and enterprise SLAs.',
                monthlyPrice: '$129',
                yearlyPrice: '$99',
                features: ['Dedicated WebGL GPU clusters', 'Custom shader pipeline engineering', '99.99% uptime SLA guarantee', 'SOC2 certified cloud infrastructure', 'Dedicated solutions architect'],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass-panel p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20 md:-translate-y-2'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[11px] font-bold tracking-wide uppercase shadow-md">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white">
                      {billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials / Community Showcase */}
        <section id="community" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-4">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              Creator Endorsements
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Loved by Creative Developers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Elena Rostova',
                role: 'Head of Creative Engineering @ VoxelLab',
                quote: 'The integration between React 19 state and Three.js materials is buttery smooth. We slashed our web 3D prototyping cycle by 70% in our first sprint.'
              },
              {
                name: 'Marcus Chen',
                role: 'Lead Interactive Architect @ Studio Nova',
                quote: 'Deploying GPU-accelerated spatial landing pages without tanking mobile battery life or lighthouse performance scores felt impossible until we used Aura 3D.'
              },
              {
                name: 'Sarah Lindqvist',
                role: 'Product Designer @ HyperSpace',
                quote: 'The real-time studio controls allowed our design team to tune distortion curves and chromatic shaders directly without hand-off friction.'
              }
            ].map((item, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-800/60">
                  <div className="font-semibold text-white text-sm">{item.name}</div>
                  <div className="text-xs text-indigo-400 font-mono mt-0.5">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="glow-orb top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-500/25" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Stay Ahead of Spatial Web Evolution
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8">
                Receive weekly breakdowns on WebGL shaders, Three.js performance tuning, and interactive design inspiration directly to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full sm:w-80 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </form>

              <AnimatePresence>
                {newsletterStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{"\u2713 Subscribed! Check your inbox for your first shader guide."}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Modern Footer */}
        <footer className="w-full border-t border-slate-900 bg-slate-950/80 backdrop-blur-md pt-16 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                    <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                      <Box className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Aura<span className="text-cyan-400">3D</span>
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
                  Open-source experimental 3D spatial interface engineered with Next.js 16, React 19, Three.js, and Tailwind CSS.
                </p>
                <div className="text-xs font-mono text-slate-500">
                  WebGL 2.0 Compliant • Designed for High-Performance Displays
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">Product</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#studio" className="hover:text-white transition-colors">3D Studio</a></li>
                  <li><a href="#features" className="hover:text-white transition-colors">Shader Library</a></li>
                  <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">Resources</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#architecture" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#features" className="hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#community" className="hover:text-white transition-colors">Case Studies</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">System Status</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4">Company</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
              <p>© {new Date().getFullYear()} Aura 3D Spatial Systems Inc. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
