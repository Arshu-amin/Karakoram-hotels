'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Box,
  Globe,
  Layers,
  Sliders,
  ChevronRight,
  ArrowRight,
  Code2,
  Share2,
  Menu,
  X,
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-slate-500 gap-3">
      <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      <span className="text-xs font-mono tracking-widest uppercase">Loading 3D Canvas...</span>
    </div>
  )
})

export default function Home() {
  // 3D Customizer State
  const [sceneConfig, setSceneConfig] = useState<SceneProps>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1.5,
    scale: 1.2,
    wireframe: false,
    distort: 0.3,
  })

  // Showcase Active Tab State
  const [activeTab, setActiveTab] = useState<'3d' | 'tech' | 'perf'>('3d')

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { label: 'Indigo', hex: '#6366f1' },
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
  ]

  const shapes: Array<{ id: SceneProps['shape']; label: string }> = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'torus', label: 'Torus' },
    { id: 'sphere', label: 'Sphere' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Background WebGL Scene Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneConfig} />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                AURA <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">3D</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-cyan-400 transition-colors">Studio</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-cyan-400 transition-colors">Showcase</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">Architecture</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              60 FPS WebGL
            </div>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Launch Studio
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-6 py-6 space-y-4"
            >
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-cyan-400 text-lg font-medium"
              >
                Studio
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-cyan-400 text-lg font-medium"
              >
                Features
              </a>
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-cyan-400 text-lg font-medium"
              >
                Showcase
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-cyan-400 text-lg font-medium"
              >
                Architecture
              </a>
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold"
                >
                  Launch Studio
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-300 text-sm mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Next-Generation Interactive 3D Web UI</span>
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          Crafting <span className="text-gradient-primary">Immersive</span> Visual Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          Combine high-performance WebGL 3D graphics with fluid DOM controls. Built with Next.js 16, Three.js, and Tailwind CSS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            Customize 3D Canvas
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all border border-slate-700/80 flex items-center justify-center gap-2"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-700 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Real-time 3D Customizer Panel Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Interactive <span className="text-gradient-primary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Directly manipulate the WebGL viewport in real-time. Choose geometries, customize materials, and tweak motion physics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl lg:col-span-1"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-white">
                <Sliders className="w-5 h-5 text-cyan-400" />
                Geometry & Motion
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">LIVE</span>
            </div>

            {/* Shape Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Geometry Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, shape: s.id }))}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between border ${
                      sceneConfig.shape === s.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                    {sceneConfig.shape === s.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Material Hue</label>
              <div className="flex items-center gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, color: preset.hex }))}
                    className={`w-9 h-9 rounded-full transition-all flex items-center justify-center p-0.5 border-2 ${
                      sceneConfig.color === preset.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    title={preset.label}
                  >
                    <span className="w-full h-full rounded-full" style={{ backgroundColor: preset.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Rotation Velocity</label>
                <span className="font-mono text-cyan-400 text-xs">{sceneConfig.speed?.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4"
                step="0.1"
                value={sceneConfig.speed}
                onChange={(e) => setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Scale Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Mesh Scale</label>
                <span className="font-mono text-cyan-400 text-xs">{sceneConfig.scale?.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={sceneConfig.scale}
                onChange={(e) => setSceneConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Mesh Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm font-medium text-slate-300">Wireframe View</span>
              <button
                onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  sceneConfig.wireframe ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Interactive Preview Canvas Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass rounded-3xl p-8 border border-slate-800 min-h-[420px] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-500">WebGL Canvas Render Engine</span>
            </div>

            <div className="my-auto py-12 text-center z-10">
              <div className="inline-block p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl">
                <p className="text-xs font-mono text-cyan-400 mb-1">REALTIME PARAMS</p>
                <div className="flex items-center gap-4 text-slate-300 text-sm font-mono">
                  <span>Shape: <strong className="text-white">{sceneConfig.shape}</strong></span>
                  <span>Speed: <strong className="text-white">{sceneConfig.speed}x</strong></span>
                  <span>Scale: <strong className="text-white">{sceneConfig.scale}x</strong></span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 font-mono z-10 border-t border-slate-800/80 pt-4">
              <span>Renderer: Three.js r184</span>
              <span>Shader: Physical Metalness Material</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Built for <span className="text-gradient-primary">High Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Architected using cutting-edge WebGL graphics techniques, reactive state synchronisation, and fluid motion design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Hardware Accelerated",
              desc: "Optimized WebGL vertex and fragment shaders running seamlessly at 60 FPS on desktop and mobile browsers."
            },
            {
              icon: Globe,
              title: "Next.js 16 App Router",
              desc: "Full React Server Components support with smooth client-side WebGL canvas integration."
            },
            {
              icon: Shield,
              title: "Type-Safe Architecture",
              desc: "Strict TypeScript interfaces across 3D state controllers and DOM animation bindings."
            },
            {
              icon: Box,
              title: "Dynamic Geometry",
              desc: "Modular mesh generators supporting custom parametric distortions, lighting, and reflections."
            },
            {
              icon: Sparkles,
              title: "Framer Motion Physics",
              desc: "Spring-based entrance transitions, scroll-driven triggers, and smooth layout changes."
            },
            {
              icon: Layers,
              title: "Glassmorphism UI",
              desc: "Modern translucent frosted-glass styling styled cleanly using Tailwind CSS v4."
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase & Architecture Section */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">System Showcase</h2>
              <p className="text-slate-400 text-sm">Explore how WebGL 3D layers pair with modern web architecture.</p>
            </div>

            {/* Showcase Tabs */}
            <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start">
              {[
                { id: '3d', label: '3D Engine' },
                { id: 'tech', label: 'Tech Stack' },
                { id: 'perf', label: 'Performance' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as '3d' | 'tech' | 'perf')}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {activeTab === '3d' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">01 / WEBGL PIPELINE</span>
                  <h3 className="text-2xl font-bold text-white">React Three Fiber & Drei</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Declarative 3D scene creation powered by Three.js. Includes float physics, physical lighting shaders, and particle field generation with zero frame drops.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Dynamic lighting with spot and directional shadows
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Custom MeshDistortMaterial distortion animations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Star particle cloud using buffer geometries
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-cyan-400" /> Scene.tsx</span>
                    <span>TypeScript</span>
                  </div>
                  <pre className="text-cyan-300 overflow-x-auto p-2">
{`<Canvas camera={{ position: [0, 0, 5] }}>
  <ambientLight intensity={0.6} />
  <StarParticles count={200} />
  <AnimatedShape
    shape="${sceneConfig.shape}"
    color="${sceneConfig.color}"
    speed={${sceneConfig.speed}}
  />
</Canvas>`}
                  </pre>
                </div>
              </>
            )}

            {activeTab === 'tech' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">02 / CORE FRAMEWORK</span>
                  <h3 className="text-2xl font-bold text-white">Next.js 16 & React 19</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Built on the latest release of Next.js with Turbopack compilation, React 19 concurrent features, and Tailwind CSS v4 styling engine.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Turbopack fast-refresh development cycle
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Dynamic client-side hydration for 3D canvases
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Inline CSS theme declarations with Tailwind v4
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <span className="text-white font-bold">Stack Specifications</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">FRAMEWORK</p>
                      <p className="text-white font-semibold">Next.js 16.2</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">LIBRARY</p>
                      <p className="text-white font-semibold">React 19.2</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">STYLING</p>
                      <p className="text-white font-semibold">Tailwind CSS v4</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">GRAPHICS</p>
                      <p className="text-white font-semibold">Three.js 0.184</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'perf' && (
              <>
                <div className="space-y-4">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">03 / METRICS</span>
                  <h3 className="text-2xl font-bold text-white">Ultra-Low Overhead</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Designed to render high poly geometries without blocking the main browser thread or delaying DOM accessibility interactive events.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Lighthouse Performance Score &gt; 95
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Zero Layout Shifts (CLS &lt; 0.01)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Dynamic chunk loading for WebGL bundles
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /> Target FPS</span>
                    <span className="text-sm font-mono text-emerald-400 font-bold">60.0 FPS</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[98%]" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">Bundle First Load JS</span>
                    <span className="text-sm font-mono text-cyan-400 font-bold">~84 kB</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-cyan-500 h-full w-[25%]" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section id="about" className="relative z-10 max-w-5xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="relative rounded-3xl bg-gradient-to-tr from-indigo-900/50 via-slate-900/80 to-cyan-950/50 p-8 sm:p-16 border border-slate-800 text-center overflow-hidden glass shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Ready to Upgrade Your <span className="text-gradient-primary">Digital Web App</span>?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Subscribe to stay updated on modern 3D UI templates, component libraries, and performance insights.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 flex-1 text-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed' : 'Get Access'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>&mdash; Modern Interactive Web Interface</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-slate-300 transition-colors">Showcase</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button className="p-2 rounded-full hover:bg-slate-900 hover:text-white transition-colors" aria-label="Website">
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-900 hover:text-white transition-colors" aria-label="Share">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-900 hover:text-white transition-colors" aria-label="Source code">
              <Code2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}
