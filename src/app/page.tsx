'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Box,
  Cpu,
  Zap,
  Layers,
  Shield,
  Globe,
  Sliders,
  RotateCw,
  Palette,
  Check,
  ChevronRight,
  Code2,
  Activity,
  ArrowRight
} from 'lucide-react'
import type { ShapeType, SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-indigo-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase">Initializing 3D Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyber Purple', value: '#a855f7' },
  { name: 'Neon Pink', value: '#ec4899' },
  { name: 'Electric Cyan', value: '#06b6d4' },
  { name: 'Emerald Wave', value: '#10b981' },
  { name: 'Solar Amber', value: '#f59e0b' },
]

const SHAPE_OPTIONS: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'box', label: 'Cube Box' },
]

export default function Home() {
  // 3D Scene Interactive Controls
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(2)
  const [scale, setScale] = useState(1)
  const [distort, setDistort] = useState(0.35)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Active Tech Tab
  const [activeTab, setActiveTab] = useState(0)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const resetScene = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setSpeed(2)
    setScale(1)
    setDistort(0.35)
    setWireframe(false)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D Canvas Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          wireframe={wireframe}
          scale={scale}
          distort={distort}
        />
        {/* Subtle dark gradient overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90 pointer-events-none" />
      </div>

      {/* Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-wider text-gradient-primary">
              AURA <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 ml-1">3D</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#overview" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#studio" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 pt-28">

        {/* Hero Section */}
        <section id="overview" className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto py-16 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>WebGL 3D Engine &bull; Next.js 16 &bull; Framer Motion</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-gradient-primary leading-[1.1]"
          >
            Interactive 3D Visuals For The Next Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Create rich, high-performance spatial interfaces with real-time WebGL shader customization, dynamic lighting, and fluid spring animations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <a
              href="#studio"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25"
            >
              <Sliders className="w-5 h-5" />
              <span>Explore 3D Studio</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold border border-slate-700/80 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <span>View Features</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
          >
            {[
              { val: '120 FPS', label: 'WebGL Shader Rate' },
              { val: '< 16ms', label: 'Frame Motion Delay' },
              { val: '100%', label: 'Type-Safe Stack' },
              { val: '0.0s', label: 'SSR Hydration Overhead' },
            ].map((stat, i) => (
              <div key={i} className="glass p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-gradient-secondary mb-1">{stat.val}</span>
                <span className="text-xs text-slate-400 font-mono">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 3D Customizer Studio Section */}
        <section id="studio" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-primary">3D Engine Studio</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Experiment with geometry types, material colors, spin speeds, shader distortion, and wireframe rendering in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Viewport Frame Box */}
            <div className="lg:col-span-7 h-[450px] md:h-[550px] rounded-3xl border border-indigo-500/30 glass relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-indigo-300">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                  <span>LIVE WEBGL VIEWPORT</span>
                </div>
                <button
                  onClick={resetScene}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
                  title="Reset 3D Settings"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Viewport Specs Badge */}
              <div className="z-10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-md">
                <span>GEOMETRY: <strong className="text-indigo-300 uppercase">{shape}</strong></span>
                <span>&bull;</span>
                <span>COLOR: <strong className="text-indigo-300">{color}</strong></span>
                <span>&bull;</span>
                <span>SPEED: <strong className="text-indigo-300">{speed}x</strong></span>
                <span>&bull;</span>
                <span>WIREFRAME: <strong className="text-indigo-300">{wireframe ? 'ON' : 'OFF'}</strong></span>
              </div>
            </div>

            {/* Interactive Control Panel */}
            <div className="lg:col-span-5 glass p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col gap-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">Render Controls</h3>
              </div>

              {/* Geometry Selection */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  1. Geometry Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SHAPE_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                        shape === item.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400'
                          : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  2. Material Theme
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setColor(preset.value)}
                      className={`w-9 h-9 rounded-full transition-transform flex items-center justify-center ${
                        color === preset.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: preset.value }}
                      title={preset.name}
                    >
                      {color === preset.value && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders: Speed & Scale & Distortion */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>ROTATION SPEED</span>
                    <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>GEOMETRY SCALE</span>
                    <span className="text-indigo-400 font-bold">{scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>SHADER DISTORTION</span>
                    <span className="text-indigo-400 font-bold">{distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.8"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase">Wireframe Mode</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    wireframe
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {wireframe ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-primary">Engineered For Performance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolkit constructed on modern web standards, delivering smooth 3D visuals without sacrificing speed or accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'GPU Accelerated Shaders',
                desc: 'Custom MeshDistort & physical materials powered by Three.js and WebGL for realistic specular reflections.'
              },
              {
                icon: Zap,
                title: 'Turbopack & React 19',
                desc: 'Blazing fast instant hot reloading, optimized static generation, and asynchronous layout capabilities.'
              },
              {
                icon: Layers,
                title: 'Glassmorphism UI',
                desc: 'Sleek translucent glass surfaces with backdrop blur, custom gradients, and responsive Tailwind CSS v4 layout.'
              },
              {
                icon: Sparkles,
                title: 'Spring Motion Physics',
                desc: 'Fluid, natural cursor interactions and scroll-triggered animations powered by Framer Motion.'
              },
              {
                icon: Shield,
                title: 'Strict TypeScript Stack',
                desc: 'Fully typed component tree and strict compile-time checks guaranteeing software stability.'
              },
              {
                icon: Globe,
                title: 'Edge Runtime Ready',
                desc: 'Lightweight WebGL bundles pre-optimized for fast global distribution and high visual performance.'
              }
            ].map((feat, i) => {
              const IconComp = feat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-8 rounded-3xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Tech Stack Interactive Tabs Section */}
        <section id="tech" className="max-w-5xl mx-auto px-4 py-24 scroll-mt-20">
          <div className="glass p-8 md:p-12 rounded-3xl border border-slate-800">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-gradient-primary">Built With Modern Stack</h2>
              <p className="text-slate-400 text-sm">Explore how our technological building blocks work in harmony.</p>
            </div>

            {/* Tab Selectors */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { title: 'Three.js & R3F', icon: Box },
                { title: 'Framer Motion', icon: Sparkles },
                { title: 'Next.js 16', icon: Code2 },
                { title: 'Tailwind v4', icon: Palette }
              ].map((tab, idx) => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                      activeTab === idx
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content Display */}
            <div className="min-h-[160px] p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="tab-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-bold text-indigo-300">3D WebGL Canvas Engine</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Utilizes Three.js, @react-three/fiber, and @react-three/drei to render realistic geometries, procedural distortion shaders, ambient particle fields, and smooth orbit controls.
                    </p>
                  </motion.div>
                )}
                {activeTab === 1 && (
                  <motion.div
                    key="tab-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-bold text-indigo-300">Fluid Motion & Physics</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Drives UI animations with spring physics, interactive cursor tracking, tab view transitions, and scroll-linked entrance reveals for an effortless user experience.
                    </p>
                  </motion.div>
                )}
                {activeTab === 2 && (
                  <motion.div
                    key="tab-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-bold text-indigo-300">Next.js 16 & React 19 Architecture</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Constructed on Next.js 16 App Router with dynamic client-side imports for WebGL components, avoiding server-side hydration mismatches while ensuring optimal performance.
                    </p>
                  </motion.div>
                )}
                {activeTab === 3 && (
                  <motion.div
                    key="tab-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-bold text-indigo-300">Tailwind CSS v4 Inline Theme Engine</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Combines high-performance utility styles with custom glassmorphism, radial lighting gradients, and smooth transition properties for a modern dark interface.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="glass p-10 md:p-14 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gradient-primary">
              Experience The Future of Web Visuals
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm md:text-base">
              Stay updated with new 3D graphics components, WebGL shader presets, and design system updates.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 inline-flex items-center gap-2 font-medium">
                <Check className="w-5 h-5 text-indigo-400" />
                <span>{"\u2713"} Thank you! You are subscribed to updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-900 glass-nav text-center text-slate-500 text-xs font-mono relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-slate-300">AURA 3D</span>
              <span>&bull; &copy; 2026 All rights reserved.</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All WebGL 3D Systems Operational</span>
            </div>

            <div className="flex gap-6 text-slate-400">
              <a href="#overview" className="hover:text-indigo-400 transition-colors">Overview</a>
              <a href="#studio" className="hover:text-indigo-400 transition-colors">Studio</a>
              <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
              <a href="#tech" className="hover:text-indigo-400 transition-colors">Tech</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}
