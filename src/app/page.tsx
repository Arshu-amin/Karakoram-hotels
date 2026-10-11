'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Shield,
  Palette,
  Sliders,
  Check,
  ArrowRight,
  Globe,
  Share2,
  Code2,
  Terminal,
  Activity,
  ChevronRight
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [speed, setSpeed] = useState(1.5)
  const [scale, setScale] = useState(1)
  const [distort, setDistort] = useState(0.45)
  const [color, setColor] = useState('#6366f1')
  const [wireframe, setWireframe] = useState(false)

  // Pricing State
  const [isAnnual, setIsAnnual] = useState(true)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Architecture Tabs State
  const [activeTab, setActiveTab] = useState<'pipeline' | 'shaders' | 'performance'>('pipeline')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <Scene
          shape={shape}
          speed={speed}
          scale={scale}
          distort={distort}
          color={color}
          wireframe={wireframe}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-white transition-colors">3D Customizer</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Generation WebGL Experience</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.div>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-8"
          >
            Immersive <br />
            <span className="text-gradient-primary">3D Realtime</span> Interfaces
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 leading-relaxed mb-10 max-w-2xl"
          >
            Experience lightning-fast WebGL rendering combined with modern glassmorphism UI, fluid physics, and interactive customization controls.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:opacity-95 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 active:scale-95"
            >
              <span>Try Interactive Demo</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-white font-semibold text-lg transition-all border border-slate-700/60 flex items-center gap-2 active:scale-95"
            >
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>System Features</span>
            </a>
          </motion.div>
        </div>

        {/* Realtime Metrics Banner */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 p-6 rounded-3xl glass border border-slate-800/80"
        >
          {[
            { label: 'FPS Target', value: '120 Hz', icon: Zap },
            { label: 'WebGL Shader', value: 'Physically Based', icon: Cpu },
            { label: 'Bundle Footprint', value: '< 45 KB', icon: Layers },
            { label: 'Global Latency', value: '< 15 ms', icon: Activity },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="flex flex-col p-4 rounded-2xl hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-1">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{stat.label}</span>
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
              </div>
            )
          })}
        </motion.div>
      </section>

      {/* Interactive 3D Studio / Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Live <span className="text-gradient-secondary">3D Studio</span> Controls
          </h2>
          <p className="text-slate-400 text-lg">
            Directly manipulate WebGL parameters in real-time. Experience dynamic shader distortion, lighting modes, and procedural geometries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Control Panel */}
          <div className="lg:col-span-1 p-8 rounded-3xl glass border border-slate-800 flex flex-col gap-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Parameters</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Active Shader
              </span>
            </div>

            {/* Geometry Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                Geometry Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'dodecahedron', label: 'Dodecahedron' },
                  { id: 'torus', label: 'Ring Torus' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as ShapeType)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      shape === item.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Preset Palette */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                Material Color
              </label>
              <div className="flex items-center gap-3">
                {[
                  { color: '#6366f1', name: 'Indigo' },
                  { color: '#38bdf8', name: 'Cyan' },
                  { color: '#ec4899', name: 'Pink' },
                  { color: '#10b981', name: 'Emerald' },
                  { color: '#f59e0b', name: 'Amber' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => setColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className={`w-9 h-9 rounded-full transition-transform border-2 ${
                      color === item.color ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    title={item.name}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Rotation Speed</span>
                  <span className="text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Shader Distortion</span>
                  <span className="text-purple-400">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Object Scale</span>
                  <span className="text-pink-400">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Wireframe Mode</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                  wireframe ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

          {/* Preset Showcase Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Quantum Torus',
                shape: 'torusKnot',
                speed: 2.5,
                distort: 0.6,
                color: '#6366f1',
                desc: 'High distortion vertex displacement with fast spin frequency.',
              },
              {
                title: 'Crystal Icosahedron',
                shape: 'icosahedron',
                speed: 1.0,
                distort: 0.1,
                color: '#38bdf8',
                desc: 'Reflective crystal geometry with low roughness and crisp facets.',
              },
              {
                title: 'Neon Mesh Ring',
                shape: 'torus',
                speed: 1.8,
                distort: 0,
                color: '#ec4899',
                wireframe: true,
                desc: 'Pure wireframe structural topology rendered with full depth buffer.',
              },
              {
                title: 'Organic Dodecahedron',
                shape: 'dodecahedron',
                speed: 3.0,
                distort: 0.85,
                color: '#10b981',
                desc: 'Fluid dynamic wave distortion simulating living organic matter.',
              },
            ].map((preset, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl glass border border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{preset.title}</h4>
                  <p className="text-slate-400 text-sm mb-6">{preset.desc}</p>
                </div>

                <button
                  onClick={() => {
                    setShape(preset.shape as ShapeType)
                    setSpeed(preset.speed)
                    setDistort(preset.distort)
                    setColor(preset.color)
                    setWireframe(preset.wireframe || false)
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900/80 hover:bg-indigo-600 hover:text-white text-slate-300 font-semibold text-xs border border-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply State Preset</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A comprehensive suite of modern web capabilities crafted with performance, accessibility, and visual excellence at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Dynamic WebGL Shaders',
              desc: 'Custom vertex and fragment shader processing running directly on the GPU for maximum frame rates.',
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Multi-layer frosted backdrop blur with reactive border glow and subtle light transport effects.',
            },
            {
              icon: Cpu,
              title: 'Zero Hydration Lag',
              desc: 'Dynamic dynamic SSR isolation prevents client-side react tree blocking during canvas startup.',
            },
            {
              icon: Shield,
              title: 'Type-Safe Architecture',
              desc: 'Full TypeScript coverage across React components, Three.js scenes, and state hooks.',
            },
            {
              icon: Globe,
              title: 'Responsive Spatial Scale',
              desc: 'Adaptive field-of-view and lighting adjustments tailored across mobile, tablet, and ultra-wide screens.',
            },
            {
              icon: Share2,
              title: 'Fluid Spring Physics',
              desc: 'Cursor tracking and scroll animations driven by spring stiffness and dampening equations.',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl glass border border-slate-800/80 hover:border-indigo-500/40 transition-all hover:translate-y-[-4px] shadow-xl group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 3D Architecture Showcase */}
      <section id="architecture" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="p-8 md:p-12 rounded-3xl glass border border-slate-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase mb-2 block">
                Technical Stack Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Under the Hood: Architecture
              </h2>
            </div>

            {/* Architecture Tabs */}
            <div className="flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 gap-1">
              {[
                { id: 'pipeline', label: 'Rendering Pipeline' },
                { id: 'shaders', label: 'Shader Engine' },
                { id: 'performance', label: 'Optimization' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div>
                {activeTab === 'pipeline' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Hybrid DOM & Canvas Synchronization</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Our framework decouples heavy WebGL math onto isolated animation frames while preserving real-time React state hooks. UI controls in the DOM update canvas props seamlessly without causing React render locks.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Next.js App Router dynamic ssr:false canvas loading
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        React Three Fiber custom event dispatcher
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Framer Motion layout projection
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'shaders' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">MeshDistort & Custom Materials</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Utilizes per-vertex noise functions for fluid, organic deformation. Combined with physically based clearcoat and metalness properties, scenes achieve hyper-realistic light refraction and soft specular glints.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Simplex noise vertex displacement equations
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Dynamic roughness and clearcoat reflection uniforms
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Full wireframe topology debugging layer
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">60 FPS Memory Optimization</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Buffers and particle geometry arrays are generated using deterministic pseudo-random seeds and cached with standard React memoization patterns to avoid runtime garbage collection pauses during scroll actions.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Zero GC allocations inside frame render loops
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Automated GPU context cleanup on component unmount
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Tailwind CSS v4 inline theme optimization
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto shadow-inner">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-slate-500 mb-4">
                  <Terminal className="w-4 h-4" />
                  <span>SceneGraph.tsx</span>
                </div>
                <pre className="space-y-1">
                  <code>
                    <span className="text-purple-400">const</span> {'{'} speed, distort {'}'} = <span className="text-blue-400">useControls</span>();
                    <br />
                    <span className="text-purple-400">useFrame</span>((state) =&gt; {'{'}
                    <br />
                    {'  '}<span className="text-slate-500">{"// Non-blocking clock evaluation"}</span>
                    <br />
                    {'  '}<span className="text-purple-400">const</span> t = state.clock.<span className="text-blue-400">getElapsedTime</span>();
                    <br />
                    {'  '}mesh.current.rotation.x = t * 0.2 * speed;
                    <br />
                    {'}'});
                  </code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Simple, Transparent <span className="text-gradient-secondary">Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Choose the ideal plan to scale your 3D digital experiences.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass border border-slate-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                !isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: isAnnual ? '$29' : '$35',
              desc: 'Ideal for indie creators and lightweight 3D portfolios.',
              features: [
                'Standard WebGL Canvas',
                'Up to 5 Preset Geometries',
                'Community Shader Library',
                'Standard 60 FPS Cap',
              ],
              featured: false,
            },
            {
              name: 'Pro Studio',
              price: isAnnual ? '$79' : '$95',
              desc: 'Built for high-performance creative agencies and studios.',
              features: [
                'Unlimited Custom Shaders',
                'Full Physics & Particle Engine',
                'Real-time Canvas Syncing',
                'Priority Rendering Pipeline',
                'Dedicated Technical Support',
              ],
              featured: true,
            },
            {
              name: 'Enterprise',
              price: isAnnual ? '$249' : '$299',
              desc: 'For large-scale enterprise spatial web solutions.',
              features: [
                'Custom WebGL Shaders & Materials',
                'Multi-user State Broadcast',
                'Dedicated Server Nodes',
                'Custom SLA & 24/7 Phone Support',
                'On-premise Infrastructure Support',
              ],
              featured: false,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl glass flex flex-col justify-between transition-all relative ${
                plan.featured
                  ? 'border-2 border-indigo-500 bg-slate-900/80 shadow-2xl scale-105 z-10'
                  : 'border border-slate-800'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                  plan.featured
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800'
                }`}
              >
                Get Started Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <div className="p-10 md:p-16 rounded-3xl glass border border-slate-800 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Stay Updated on 3D Innovations
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Subscribe to our developer dispatch for weekly WebGL shader techniques, performance tips, and spatial UI guides.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-emerald-400 font-medium text-sm"
            >
              {"\u2713 Subscribed"}
            </motion.p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 py-16 border-t border-slate-900 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Box className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-lg text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-medium">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">3D Customizer</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-slate-300 transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
          </div>

          <p className="text-xs">
            © 2026 Aura3D Web Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
