'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Cursor from '@/components/Cursor'
import { SceneConfig, ShapeType } from '@/components/Scene'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Share2,
  Code2,
  Box,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Sliders,
  Eye,
  Palette,
  Activity,
  Terminal,
  ShieldCheck,
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />,
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [activeTab, setActiveTab] = useState<'shaders' | 'geometry' | 'animation'>('shaders')

  // Live 3D Scene Controls State
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1.5,
    scale: 1.2,
    wireframe: false,
    distort: 0.35,
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { name: 'Indigo Aura', value: '#6366f1' },
    { name: 'Cyber Neon', value: '#a855f7' },
    { name: 'Electric Cyan', value: '#38bdf8' },
    { name: 'Sunset Crimson', value: '#f43f5e' },
    { name: 'Solar Amber', value: '#f59e0b' },
  ]

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'cube', label: 'Cyber Cube' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Interactive Custom Cursor */}
      <Cursor />

      {/* Background WebGL 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene config={sceneConfig} />
      </div>

      {/* Top Glassmorphism Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[2px] transition-transform duration-300 group-hover:scale-110">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                AURA<span className="text-indigo-500 font-light">3D</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
              <a href="#features" className="hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#customizer" className="hover:text-indigo-400 transition-colors">
                3D Studio
              </a>
              <a href="#specs" className="hover:text-indigo-400 transition-colors">
                Tech Specs
              </a>
              <a href="#testimonials" className="hover:text-indigo-400 transition-colors">
                Showcase
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#customizer"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
              >
                Launch Customizer
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-b border-slate-800/80 px-4 pt-2 pb-6 space-y-3"
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Features
            </a>
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              3D Studio
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Tech Specs
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Showcase
            </a>
            <a
              href="#customizer"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full px-5 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-full"
            >
              Launch Customizer
            </a>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-28 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Web Engine &amp; Design System</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight max-w-5xl mb-6"
        >
          Immersive Web Experiences Built For The{' '}
          <span className="text-gradient-primary">3D Future</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
          className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Elevate your Web application with GPU-accelerated 3D WebGL graphics, real-time lighting,
          glassmorphism aesthetics, and ultra-smooth motion hooks.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#customizer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-base transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95"
          >
            <span>Try 3D Studio Live</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore Architecture
          </a>
        </motion.div>

        {/* Realtime Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl p-6 rounded-2xl glass-card border border-slate-800/80"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gradient-secondary">60 FPS</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">WebGL Render Engine</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gradient-primary">React 19</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Next.js 16 App Router</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gradient-accent">&lt;10ms</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Input Response Latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Responsive &amp; Dynamic</div>
          </div>
        </motion.div>
      </section>

      {/* LIVE 3D SCENE CUSTOMIZER STUDIO SECTION */}
      <section id="customizer" className="relative z-10 py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" /> Interactive Playground
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Real-Time <span className="text-gradient-primary">3D Canvas Studio</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Interact with live parameters below to modify the background WebGL scene mesh,
            materials, geometry, and deformation on the fly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
            {/* Geometry Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shapesList.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSceneConfig({ ...sceneConfig, shape: shape.id })}
                    className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                      sceneConfig.shape === shape.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" /> Material Color Presets
              </label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setSceneConfig({ ...sceneConfig, color: preset.value })}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 ${
                      sceneConfig.color === preset.value
                        ? 'bg-slate-800 border-indigo-400 text-white ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" /> Speed
                  </span>
                  <span className="text-cyan-400 font-mono">{sceneConfig.speed?.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.5"
                  step="0.1"
                  value={sceneConfig.speed || 1.5}
                  onChange={(e) =>
                    setSceneConfig({ ...sceneConfig, speed: parseFloat(e.target.value) })
                  }
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Material Distortion
                  </span>
                  <span className="text-amber-400 font-mono">
                    {sceneConfig.distort?.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.9"
                  step="0.05"
                  value={sceneConfig.distort || 0.35}
                  onChange={(e) =>
                    setSceneConfig({ ...sceneConfig, distort: parseFloat(e.target.value) })
                  }
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Wireframe & Scale Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <button
                onClick={() =>
                  setSceneConfig({ ...sceneConfig, wireframe: !sceneConfig.wireframe })
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  sceneConfig.wireframe
                    ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-lg shadow-purple-600/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Wireframe Mode: {sceneConfig.wireframe ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() =>
                  setSceneConfig({
                    shape: 'torusKnot',
                    color: '#6366f1',
                    speed: 1.5,
                    scale: 1.2,
                    wireframe: false,
                    distort: 0.35,
                  })
                }
                className="text-xs text-slate-400 hover:text-indigo-400 underline underline-offset-4 transition-colors"
              >
                Reset to Default Presets
              </button>
            </div>
          </div>

          {/* Quick Config Summary Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-4">
                <Terminal className="w-4 h-4" /> Config State Output
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Real-time JSON object passed directly to the Three.js Canvas container:
              </p>
              <pre className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                {JSON.stringify(sceneConfig, null, 2)}
              </pre>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero runtime frame drops during parameter updates</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WebGL 2.0 Hardware Shader Acceleration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" /> Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Engineered For <span className="text-gradient-secondary">Speed &amp; Visual Elegance</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Built from the ground up with Next.js 16 Turbopack, React Three Fiber, and Framer Motion
            for seamless fluid interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="w-7 h-7 text-indigo-400" />,
              title: 'Hardware GPU Shaders',
              desc: 'Custom MeshDistort & Physical materials calculated directly on the graphics card for high frame-rate rendering.',
            },
            {
              icon: <Layers className="w-7 h-7 text-purple-400" />,
              title: 'Glassmorphism Design System',
              desc: 'Layered frosted glass cards, dynamic light borders, ambient glows, and clean dark mode hierarchy.',
            },
            {
              icon: <Globe className="w-7 h-7 text-cyan-400" />,
              title: 'Responsive & Accessible',
              desc: 'Fully optimized for mobile touch interaction, smooth cursor fallback, and responsive viewport scaling.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-3xl glass-card border border-slate-800 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECH SPECS & CODE SHOWCASE TABBED SECTION */}
      <section id="specs" className="relative z-10 py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Developer Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Modular Architecture Built on Modern Standards
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Combining Next.js App Router, React 19, Three.js, Tailwind CSS v4, and Framer Motion
                into a seamless developer experience.
              </p>

              {/* Tab Selector */}
              <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                {(['shaders', 'geometry', 'animation'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Code Box */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800 text-slate-500 text-xs">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400">
                    {activeTab === 'shaders'
                      ? 'SceneShaderPipeline.tsx'
                      : activeTab === 'geometry'
                      ? 'MeshGeometryFactory.ts'
                      : 'ScrollAnimationHooks.ts'}
                  </span>
                </div>

                {activeTab === 'shaders' && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-indigo-400">{"// 3D Shader Setup"}</p>
                    <p>
                      <span className="text-purple-400">import</span> {'{ MeshDistortMaterial }'}{' '}
                      <span className="text-purple-400">from</span>{' '}
                      <span className="text-emerald-300">&apos;@react-three/drei&apos;</span>
                    </p>
                    <p className="pt-2 text-cyan-300">&lt;MeshDistortMaterial</p>
                    <p className="pl-4 text-slate-300">
                      color={<span className="text-amber-300">&apos;{sceneConfig.color}&apos;</span>}
                    </p>
                    <p className="pl-4 text-slate-300">
                      speed={<span className="text-amber-300">{sceneConfig.speed}</span>}
                    </p>
                    <p className="pl-4 text-slate-300">
                      distort={<span className="text-amber-300">{sceneConfig.distort}</span>}
                    </p>
                    <p className="pl-4 text-slate-300">
                      wireframe={sceneConfig.wireframe ? 'true' : 'false'}
                    </p>
                    <p className="text-cyan-300">/&gt;</p>
                  </div>
                )}

                {activeTab === 'geometry' && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-indigo-400">{"// Geometry Switcher"}</p>
                    <p>
                      <span className="text-purple-400">const</span> geometry = useMemo(() =&gt;
                      &#123;
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-400">switch</span>(shape) &#123;
                    </p>
                    <p className="pl-8">
                      <span className="text-purple-400">case</span>{' '}
                      <span className="text-emerald-300">&apos;icosahedron&apos;</span>: return &lt;
                      <span className="text-cyan-300">icosahedronGeometry</span> args=&#91;1.2,
                      3&#93; /&gt;
                    </p>
                    <p className="pl-8">
                      <span className="text-purple-400">default</span>: return &lt;
                      <span className="text-cyan-300">torusKnotGeometry</span> args=&#91;1, 0.32,
                      128, 32&#93; /&gt;
                    </p>
                    <p className="pl-4">&#125;</p>
                    <p>&#125;, &#91;shape&#93;)</p>
                  </div>
                )}

                {activeTab === 'animation' && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-indigo-400">{"// Frame Animation Hook"}</p>
                    <p>
                      useFrame((state) =&gt; &#123;
                    </p>
                    <p className="pl-4 text-slate-300">
                      <span className="text-purple-400">const</span> time =
                      state.clock.getElapsedTime()
                    </p>
                    <p className="pl-4 text-slate-300">meshRef.current.rotation.x = time * 0.4</p>
                    <p className="pl-4 text-slate-300">meshRef.current.rotation.y = time * 0.6</p>
                    <p>&#125;)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / USER REVIEWS SECTION */}
      <section id="testimonials" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Trusted By <span className="text-gradient-primary">Modern Web Creators</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Here is what designers and software engineers are saying about AURA3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                'The dynamic WebGL customizer and glassmorphic UI layout elevated our product launch page to a whole new level.',
              author: 'Elena Rostova',
              role: 'Lead Creative Director at Synthetix',
            },
            {
              quote:
                'Exceptional performance! 60 FPS 3D animations rendered smoothly with no runtime stutter.',
              author: 'Marcus Vance',
              role: 'Principal Frontend Architect',
            },
            {
              quote:
                'Combining React 19, Next.js 16 Turbopack, and R3F creates the most pleasant 3D web stack I have used.',
              author: 'Sarah Chen',
              role: 'Senior UI/UX Designer',
            },
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Sparkles key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">&quot;{item.quote}&quot;</p>
              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-bold text-slate-100 text-sm">{item.author}</div>
                <div className="text-xs text-indigo-400 mt-0.5">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA SECTION */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl glass-card border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Stay Ahead of <span className="text-gradient-secondary">3D Web Trends</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Subscribe to our developer dispatch for latest shader techniques, performance tips, and
            UI kit updates.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed! Check your inbox soon."}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-200">AURA3D Next.js Platform</span>
          </div>

          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              Studio
            </a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">
              Specs
            </a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">
              Showcase
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="p-2 hover:text-indigo-400 transition-colors" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:text-indigo-400 transition-colors" aria-label="Share">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 hover:text-indigo-400 transition-colors" aria-label="Code">
              <Code2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-slate-600 mt-8">
          &copy; {new Date().getFullYear()} AURA3D Engine. Built with Next.js 16, Tailwind CSS &amp;
          Three.js.
        </div>
      </footer>
    </main>
  )
}
