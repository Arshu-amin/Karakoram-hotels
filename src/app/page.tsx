'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Zap,
  Layers,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Code2,
  Sliders,
  ChevronRight,
  Menu,
  X,
  Radio,
  RotateCcw,
  Terminal,
  Star,
  Globe,
  Share2,
  Check
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-400 font-mono tracking-wider">LOADING 3D SCENE...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Customizer State
  const [speed, setSpeed] = useState<number>(2)
  const [distort, setDistort] = useState<number>(0.35)
  const [color, setColor] = useState<string>('#6366f1')
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [wireframe, setWireframe] = useState<boolean>(false)

  // Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  // Interactive Showcase state
  const [activeTab, setActiveTab] = useState<string>('performance')

  // Pricing state
  const [annualBilling, setAnnualBilling] = useState<boolean>(true)

  // Newsletter state
  const [email, setEmail] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const handleResetCustomizer = () => {
    setSpeed(2)
    setDistort(0.35)
    setColor('#6366f1')
    setGeometry('torusKnot')
    setWireframe(false)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const geometryOptions: { id: GeometryType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'torus', label: 'Torus' },
  ]

  const colorPresets = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyan Neon', hex: '#06b6d4' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Rose Flame', hex: '#f43f5e' },
    { name: 'Amber Burst', hex: '#f59e0b' },
    { name: 'Violet Mesh', hex: '#8b5cf6' },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: 'Real-time WebGL Shader Distortion',
      description: 'Parametric vertex distortion with instant GPU shader compilation and smooth 60fps interaction.',
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'Multi-layer Dynamic Scene Composition',
      description: 'Blend background particle fields, ambient lighting, point lighting, and custom mesh physical materials.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: 'Zero-Lag State Synchrony',
      description: 'React state variables directly drive WebGL frame updates without expensive DOM re-renders.',
    },
    {
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      title: 'Next.js 16 Code-Splitting',
      description: '3D components are dynamically imported client-side only to ensure instant initial page hydration.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'Fully Accessible & Responsive',
      description: 'Fluid layout adjustments for mobile, tablet, and ultra-wide displays with fallback states.',
    },
    {
      icon: <Activity className="w-6 h-6 text-pink-400" />,
      title: 'Precision Micro-Interactions',
      description: 'Spring-animated cursor follow, interactive hover state scaling, and smooth motion transitions.',
    },
  ]

  const showcaseTabs = [
    { id: 'performance', label: '60 FPS Pipeline', icon: <Activity className="w-4 h-4" /> },
    { id: 'shaders', label: 'Custom Shaders', icon: <Terminal className="w-4 h-4" /> },
    { id: 'ecosystem', label: 'React 19 Integration', icon: <Code2 className="w-4 h-4" /> },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          speed={speed}
          distort={distort}
          color={color}
          geometry={geometry}
          wireframe={wireframe}
          particlesCount={140}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gradient-primary">Aura3D</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                v2.0
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> 3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              60 FPS WebGL
            </div>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Launch Studio
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 text-sm font-medium">
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-indigo-400 hover:text-indigo-300"
                >
                  3D Studio
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-slate-300 hover:text-white"
                >
                  Features
                </a>
                <a
                  href="#showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-slate-300 hover:text-white"
                >
                  Showcase
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-slate-300 hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Launch Studio
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Live Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs sm:text-sm font-medium text-indigo-300 mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Gen Interactive WebGL Experience</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Next.js 16 & React 19</span>
          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-center max-w-5xl leading-[1.1] mb-8"
        >
          Craft Immersive <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Interfaces</span> Effortlessly
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 text-center max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Elevate your digital products with fluid WebGL rendering, real-time parametric controls, and modern glassmorphism aesthetics.
        </motion.p>

        {/* Hero CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Customize 3D Scene</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base border border-slate-700/60 flex items-center justify-center gap-2 transition-all"
          >
            <span>Explore Architecture</span>
          </a>
        </motion.div>

        {/* Hero Metric Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
        >
          {[
            { label: 'Render Latency', value: '< 2.4ms', sub: '60fps locked' },
            { label: 'WebGL Engine', value: 'Three.js 184', sub: 'Hardware accelerated' },
            { label: 'Bundle Footprint', value: 'Lightweight', sub: 'Dynamic code-splitting' },
            { label: 'User Rating', value: '4.98 / 5.0', sub: 'Developer approved' }
          ].map((metric, index) => (
            <div
              key={index}
              className="glass-card p-4 sm:p-6 rounded-2xl text-left border border-slate-800/80 backdrop-blur-md"
            >
              <div className="text-2xl sm:text-3xl font-bold text-slate-100 font-mono mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-indigo-400 mb-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-500">
                {metric.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Real-time 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Live <span className="text-gradient-secondary">3D Studio Control</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Interact with the background WebGL canvas directly. Modify parametric parameters in real time and observe instantaneous rendering updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-3xl space-y-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold text-slate-200">Parametric Sliders</span>
              </div>
              <button
                onClick={handleResetCustomizer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            {/* Geometry Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                Geometry Primitive
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {geometryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGeometry(opt.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-medium border transition-all ${
                      geometry === opt.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-400 font-semibold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Distortion Intensity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Distortion Factor
                </label>
                <span className="text-xs font-mono text-indigo-400 font-semibold">{(distort * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                Material Color Theme
              </label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setColor(preset.hex)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      color === preset.hex
                        ? 'border-white/60 bg-slate-800 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow"
                      style={{ backgroundColor: preset.hex }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-sm font-semibold text-slate-200 block">Wireframe Rendering Mode</span>
                <span className="text-xs text-slate-400">Display polygon mesh structure</span>
              </div>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Quick Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
                <span className="font-semibold text-slate-200">Live Telemetry</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Active Mesh:</span>
                  <span className="text-indigo-300 font-bold">{geometry}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Color Hex:</span>
                  <span className="text-indigo-300 font-bold">{color}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Mesh Mode:</span>
                  <span className="text-indigo-300 font-bold">{wireframe ? 'WIREFRAME' : 'SOLID PHYSICAL'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Anti-Aliasing:</span>
                  <span className="text-emerald-400 font-bold">FXAA ENABLED</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300/80">
              💡 Tip: Click and drag anywhere on the canvas to rotate the camera in 3D space.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Engineered for <span className="text-gradient-primary">Peak Performance</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive suite of modern front-end technologies engineered to deliver high framerates and silky smooth visual user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card p-8 rounded-3xl relative group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Developer <span className="text-gradient-secondary">Showcase</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Explore how Aura3D orchestrates WebGL render loops, React Fiber hooks, and Turbopack bundle optimizations.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex justify-center mb-8 border-b border-slate-800 pb-4">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 gap-2">
              {showcaseTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {activeTab === 'performance' && (
              <>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100">Hardware-Accelerated Frame Loop</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    By leveraging standard GPU draw calls and offloading vertex distortion calculations directly to WebGL shader programs, Aura3D maintains a constant 60 FPS frame rate even during heavy user interaction.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300 font-mono pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Zero garbage collection frame spikes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Dynamic LOD (Level of Detail) scaling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Hardware anti-aliasing & post-processing
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                  <div className="text-slate-500">{"// WebGL Render Hook inside React-Three-Fiber"}</div>
                  <div><span className="text-purple-400">useFrame</span>((state) =&gt; &#123;</div>
                  <div className="pl-4"><span className="text-indigo-400">const</span> time = state.clock.getElapsedTime();</div>
                  <div className="pl-4">meshRef.current.rotation.x = time * 0.15;</div>
                  <div className="pl-4">meshRef.current.rotation.y = time * 0.25;</div>
                  <div>&#125;);</div>
                </div>
              </>
            )}

            {activeTab === 'shaders' && (
              <>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100">Parametric Vertex Distortion</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Custom MeshDistortMaterial allows smooth organic mesh movements with customizable noise frequencies and speeds, controlled directly through React prop updates.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300 font-mono pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      Real-time noise amplitude control
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      Seamless metallic & roughness response
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                  <div className="text-slate-500">{"// Shader Material Component"}</div>
                  <div>&lt;<span className="text-indigo-400">MeshDistortMaterial</span></div>
                  <div className="pl-4">color=<span className="text-emerald-300">&quot;{color}&quot;</span></div>
                  <div className="pl-4">speed=&#123;<span className="text-purple-300">{speed}</span>&#125;</div>
                  <div className="pl-4">distort=&#123;<span className="text-purple-300">{distort}</span>&#125;</div>
                  <div className="pl-4">roughness=&#123;<span className="text-purple-300">0.2</span>&#125;</div>
                  <div>/&gt;</div>
                </div>
              </>
            )}

            {activeTab === 'ecosystem' && (
              <>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-100">Next.js 16 App Router Architecture</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Designed from the ground up to take advantage of Turbopack compilation speeds, automatic SSR dynamic imports, and strict TypeScript safety.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300 font-mono pt-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Non-blocking initial hydration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Zero SSR hydration mismatches
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                  <div className="text-slate-500">{"// Client-Only Dynamic Import"}</div>
                  <div><span className="text-indigo-400">const</span> Scene = dynamic(() =&gt; <span className="text-purple-400">import</span>(<span className="text-emerald-300">&apos;@/components/Scene&apos;</span>), &#123;</div>
                  <div className="pl-4">ssr: <span className="text-rose-400">false</span>,</div>
                  <div className="pl-4">loading: () =&gt; &lt;<span className="text-indigo-400">LoadingSpinner</span> /&gt;</div>
                  <div>&#125;);</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, Transparent <span className="text-gradient-primary">Plans</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Choose the perfect plan for your project needs. Scalable 3D visual infrastructure for creators and teams.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                annualBilling ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  annualBilling ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
              Annual <span className="text-xs text-emerald-400 font-mono ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Starter Tier */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Starter Developer</h3>
              <p className="text-slate-400 text-xs mb-6">Essential WebGL components for personal projects.</p>
              <div className="text-4xl font-extrabold text-white font-mono mb-6">
                $0 <span className="text-xs font-sans text-slate-500 font-normal">/ forever free</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Standard 3D Primitives
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Up to 60 FPS WebGL canvas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Community Discord Support
                </li>
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier (Popular) */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border-2 border-indigo-500 relative shadow-2xl shadow-indigo-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase shadow-md">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Studio Pro</h3>
              <p className="text-slate-400 text-xs mb-6">Advanced custom shaders and high-performance WebGL for production apps.</p>
              <div className="text-4xl font-extrabold text-white font-mono mb-6">
                ${annualBilling ? '29' : '39'} <span className="text-xs font-sans text-slate-500 font-normal">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> All Starter Features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Custom Shader Distortions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Unlimited Particle Density
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Priority 24/7 Tech Support
                </li>
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all">
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="glass-card p-8 rounded-3xl flex flex-col justify-between border border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Enterprise Custom</h3>
              <p className="text-slate-400 text-xs mb-6">Tailored 3D engine integration and dedicated graphics optimization.</p>
              <div className="text-4xl font-extrabold text-white font-mono mb-6">
                Custom
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Custom GLTF / WebGL Models
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Dedicated Rendering Pipeline
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> SLA Guarantee & Dedicated Engineer
                </li>
              </ul>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-card p-8 sm:p-14 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-4">
            Stay Updated with 3D Web Innovations
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Subscribe to receive developer tutorials, shader releases, and performance optimization guides.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium inline-flex items-center gap-2"
            >
              <span>{"\u2713"} Subscribed successfully! Thank you.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-16 pb-12 border-t border-slate-800/60 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Box className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient-primary">Aura3D</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering developers to create cutting-edge 3D interactive web experiences with Next.js & WebGL.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio Control</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features & Tech</a></li>
              <li><a href="#showcase" className="hover:text-indigo-400 transition-colors">Developer Showcase</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing Options</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Three.js Guides</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Next.js 16 Starters</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Community Forum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4">Connect</h4>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 transition-colors">
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Aura3D Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
