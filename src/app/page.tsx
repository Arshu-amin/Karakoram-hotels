'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Sliders,
  Zap,
  Box,
  Layers,
  Palette,
  RotateCcw,
  Check,
  ChevronDown,
  ArrowRight,
  Globe,
  Share2,
  Code2,
  Compass
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-900/60 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-800 text-indigo-400 font-mono text-sm animate-pulse">
      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
      Initializing WebGL Context...
    </div>
  ),
})

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#818cf8')
  const [speed, setSpeed] = useState(1.0)
  const [distort, setDistort] = useState(0.35)
  const [wireframe, setWireframe] = useState(false)
  const [roughness, setRoughness] = useState(0.2)
  const [metalness, setMetalness] = useState(0.8)

  // Presets state
  const applyPreset = (
    presetShape: ShapeType,
    presetColor: string,
    presetDistort: number,
    presetSpeed: number
  ) => {
    setShape(presetShape)
    setColor(presetColor)
    setDistort(presetDistort)
    setSpeed(presetSpeed)
  }

  const resetControls = () => {
    setShape('torusKnot')
    setColor('#818cf8')
    setSpeed(1.0)
    setDistort(0.35)
    setWireframe(false)
    setRoughness(0.2)
    setMetalness(0.8)
  }

  // Feature Showcase Active Tab
  const [activeTab, setActiveTab] = useState(0)

  // Pricing Toggle
  const [annualBilling, setAnnualBilling] = useState(true)

  // FAQ Expanded State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  // Email Subscription State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  const features = [
    {
      id: 'shaders',
      title: 'Real-Time Shader Engine',
      icon: Palette,
      badge: 'WebGL 2.0',
      description: 'Dynamic PBR physical material shaders with instant real-time parameter tweaking and zero build-step overhead.',
      codeSnippet: `<MeshDistortMaterial
  color="${color}"
  speed={${speed.toFixed(1)}}
  distort={${distort.toFixed(2)}}
  wireframe={${wireframe ? 'true' : 'false'}}
/>`,
    },
    {
      id: 'physics',
      title: 'Spatial Physics & Float',
      icon: Sparkles,
      badge: '60+ FPS',
      description: 'Smooth spring-driven float animations integrated seamlessly into Framer Motion scroll and hover timelines.',
      codeSnippet: `<Float
  speed={${(1.8 * speed).toFixed(1)}}
  rotationIntensity={0.8}
  floatIntensity={1.2}
>
  <MeshGeometry />
</Float>`,
    },
    {
      id: 'performance',
      title: 'Adaptive GPU Pipeline',
      icon: Zap,
      badge: '0.2ms Draw',
      description: 'Intelligent viewport detection and dynamic quality scaling ensure high FPS even on low-power mobile devices.',
      codeSnippet: `const gl = useThree((state) => state.gl)
// Automatic antialiasing & frame throttling
gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))`,
    },
    {
      id: 'motion',
      title: 'DOM-to-WebGL Sync',
      icon: Layers,
      badge: 'Reactive State',
      description: 'Direct bi-directional data binding between React UI controls and 3D mesh instances without render lag.',
      codeSnippet: `const [shape, setShape] = useState('${shape}')
// Direct state prop passage to <Scene />
<Scene shape={shape} color="${color}" />`,
    },
  ]

  const faqs = [
    {
      q: 'How does WebGL performance hold up on mobile devices?',
      a: 'Our 3D engine uses adaptive pixel-ratio scaling and dynamic geometry simplification. On mobile displays, resolution automatically throttles without sacrificing visual detail.',
    },
    {
      q: 'Can I customize the 3D geometries and materials?',
      a: 'Absolutely! You can choose between standard physical materials, custom distort shaders, wireframes, metallic reflections, and assign custom HEX color palettes in real-time.',
    },
    {
      q: 'Is this framework compatible with Next.js App Router and React 19?',
      a: 'Yes, full compatibility with Next.js 16 App Router and React 19 server components using client-side dynamic imports with SSR hydration protection.',
    },
    {
      q: 'Does it support interactive mouse and scroll triggers?',
      a: 'Yes! The 3D scene responds smoothly to cursor position, touch drag gestures, and Framer Motion scroll triggers for dynamic parallax effects.',
    },
  ]

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden bg-grid-pattern">
      {/* Background Fixed WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
          roughness={roughness}
          metalness={metalness}
          particleCount={100}
        />
      </div>

      {/* STICKY GLASS NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 w-full glass border-b border-slate-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400 font-mono text-sm ml-1">3D</span>
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          {/* Right Header Status & CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              WebGL 2.0 Active
            </div>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 transition-all transform hover:scale-105"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Floating Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          <span>NEXT-GEN WEBGL EXPERIENCE 3.0</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6"
        >
          Crafting the Future of{' '}
          <span className="text-gradient-primary">3D Web Interfaces</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-normal"
        >
          Empower your web applications with real-time WebGL rendering, custom physical material shaders, interactive state synchronization, and ultra-fluid animations.
        </motion.p>

        {/* Quick Color Presets Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass p-2.5 rounded-full border border-slate-700/80 flex flex-wrap items-center justify-center gap-2 mb-10 shadow-2xl"
        >
          <span className="text-xs font-mono text-slate-400 px-3 uppercase tracking-wider hidden sm:inline">3D Presets:</span>
          <button
            onClick={() => applyPreset('torusKnot', '#8b5cf6', 0.4, 1.2)}
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 transition-all hover:scale-105"
          >
            Violet Flux
          </button>
          <button
            onClick={() => applyPreset('icosahedron', '#06b6d4', 0.15, 0.8)}
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 transition-all hover:scale-105"
          >
            Cyan Prism
          </button>
          <button
            onClick={() => applyPreset('octahedron', '#10b981', 0.25, 1.5)}
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 transition-all hover:scale-105"
          >
            Emerald Core
          </button>
          <button
            onClick={() => applyPreset('torus', '#f59e0b', 0.5, 2.0)}
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 transition-all hover:scale-105"
          >
            Solar Ring
          </button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <Sliders className="w-5 h-5" />
            Explore 3D Studio
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full text-base font-semibold glass glass-hover text-slate-200 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            View Engine Specs
            <ArrowRight className="w-5 h-5 text-indigo-400" />
          </a>
        </motion.div>

        {/* Key Performance Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl"
        >
          {[
            { label: 'Render Frame Rate', value: '120 FPS', sub: 'ProMotion Ready' },
            { label: 'GPU Draw Latency', value: '< 0.2ms', sub: 'Zero Lag' },
            { label: '3D Mesh Objects', value: '100K+', sub: 'Polygons Rendered' },
            { label: 'Shading Pipeline', value: 'PBR 2.0', sub: 'Photorealistic' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-left border border-slate-800 hover:border-indigo-500/40 transition-colors">
              <p className="text-3xl font-extrabold text-white font-mono mb-1 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-slate-300">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* INTERACTIVE 3D CUSTOMIZER STUDIO */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio Panel</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Directly customize material properties, geometric topologies, distortion forces, and rendering modes in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Canvas Preview Window */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-2 relative min-h-[420px] lg:min-h-[520px] flex flex-col justify-between overflow-hidden border border-slate-800 shadow-2xl">
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 glass rounded-2xl mb-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400">Viewport: 3D_Canvas_Main</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/50">
                <Compass className="w-3.5 h-3.5 animate-spin" />
                {shape.toUpperCase()}
              </div>
            </div>

            {/* Canvas Container */}
            <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative">
              <Scene
                shape={shape}
                color={color}
                speed={speed}
                distort={distort}
                wireframe={wireframe}
                roughness={roughness}
                metalness={metalness}
                scale={1.1}
              />
              <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Orbit Controls Active (Drag to Rotate)
              </div>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-xl font-bold text-white">Mesh Controls</h3>
                </div>
                <button
                  onClick={resetControls}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* Geometry Shape Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Geometry Topology
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'torusKnot', label: 'Torus Knot' },
                      { id: 'icosahedron', label: 'Icosahedron' },
                      { id: 'octahedron', label: 'Octahedron' },
                      { id: 'sphere', label: 'Sphere' },
                      { id: 'torus', label: 'Torus' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        shape === s.id
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-semibold'
                          : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Material Color Palette
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: '#818cf8', name: 'Indigo' },
                    { hex: '#c084fc', name: 'Purple' },
                    { hex: '#38bdf8', name: 'Sky' },
                    { hex: '#34d399', name: 'Emerald' },
                    { hex: '#fbbf24', name: 'Amber' },
                    { hex: '#f43f5e', name: 'Rose' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-9 h-9 rounded-full transition-all transform hover:scale-110 ${
                        color === c.hex
                          ? 'ring-4 ring-offset-2 ring-offset-slate-950 ring-white scale-110'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                      title={c.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-9 h-9 rounded-full bg-transparent border-0 cursor-pointer overflow-hidden p-0"
                  />
                </div>
              </div>

              {/* Sliders: Speed & Distortion */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Rotation Velocity</span>
                    <span className="font-mono text-indigo-400">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Mesh Distortion Force</span>
                    <span className="font-mono text-purple-400">{distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.8"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">Metallic Reflection</span>
                    <span className="font-mono text-cyan-400">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Wireframe Topology</p>
                    <p className="text-xs text-slate-400">Display polygon edge vectors</p>
                  </div>
                </div>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      wireframe ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABBED FEATURE SHOWCASE */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Engineered for <span className="text-gradient-cyan">Maximum Visual Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover how our WebGL rendering architecture combines performance, flexibility, and stunning aesthetics.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="glass p-1.5 rounded-2xl border border-slate-800 flex gap-2">
            {features.map((feat, index) => {
              const Icon = feat.icon
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === index
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {feat.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Tab Card Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono text-xs font-semibold">
                {features[activeTab].badge}
              </span>
              <h3 className="text-3xl font-bold text-white">{features[activeTab].title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {features[activeTab].description}
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'Hardware-accelerated shader calculations',
                  'Automatic resolution downscaling on lower-end devices',
                  'Seamless synchronization with Framer Motion timelines',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                      <Check className="w-4 h-4" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass rounded-2xl p-6 border border-slate-800 bg-slate-950/80 font-mono text-xs text-indigo-300 overflow-x-auto shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-slate-500">
                  <span>component_preview.tsx</span>
                  <span className="text-emerald-400">React 19 / JSX</span>
                </div>
                <pre className="leading-relaxed">
                  <code>{features[activeTab].codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* LIVE 3D MODEL SHOWCASE GRID */}
      <section id="showcase" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-primary">Showcase Gallery</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore diverse WebGL material configurations and rendering styles designed for ultra-modern digital landing pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Volumetric Neon Core',
              category: 'PBR Physical Material',
              desc: 'High-index clearcoat reflection with emissive cyan and purple point lights.',
              icon: Sparkles,
              tag: 'Real-time Reflection',
            },
            {
              title: 'Abstract Distortion Mesh',
              category: 'Vertex Shader',
              desc: 'Continuous sine-wave vertex displacement with adjustable speed and frequency.',
              icon: Sliders,
              tag: 'Dynamic Mesh',
            },
            {
              title: 'Wireframe Vector Matrix',
              category: 'Topology Shader',
              desc: 'Clean geometric vector edge rendering for futuristic cyber aesthetic UI.',
              icon: Code2,
              tag: 'Cyber Grid',
            },
            {
              title: 'Particle Cosmos Field',
              category: 'Instanced Points',
              desc: 'Thousands of floating ambient star particles rendered in a single GPU draw call.',
              icon: Globe,
              tag: 'Instanced Points',
            },
            {
              title: 'Organic Torus Sculpt',
              category: 'Smooth Geometry',
              desc: 'Subdivision-surface torus knot with glossy metallic roughness gradients.',
              icon: Box,
              tag: 'Glossy Metallic',
            },
            {
              title: 'Spatial Light Array',
              category: 'Dynamic Lighting',
              desc: 'Multi-point directional lighting setup generating soft realistic rim shadows.',
              icon: Zap,
              tag: 'Multi-Point Light',
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-8 border border-slate-800 glass-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">{item.category}</p>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explore Spec</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, Transparent <span className="text-gradient-secondary">Pricing</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Choose the perfect plan to integrate production-ready 3D experiences into your products.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="w-14 h-8 rounded-full bg-slate-800 border border-slate-700 p-1 relative transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-indigo-500 transition-transform ${
                  annualBilling ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
              Annual
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-900/80 text-purple-200 border border-purple-700">
              Save 20%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: 'Starter',
              price: annualBilling ? '$0' : '$0',
              period: '/month',
              desc: 'Ideal for personal projects and small landing pages.',
              features: [
                'Standard WebGL 3D Geometries',
                'Basic Physical Shaders',
                'Up to 60 FPS cap',
                'Community Support',
              ],
              popular: false,
              cta: 'Get Started Free',
            },
            {
              name: 'Pro Studio',
              price: annualBilling ? '$24' : '$29',
              period: '/month',
              desc: 'Everything you need to craft high-converting interactive web apps.',
              features: [
                'All 3D Geometries & Custom Shader Studio',
                'Real-Time Mesh Distortion & Custom Color Palettes',
                '120+ FPS ProMotion Acceleration',
                'Priority Email & Discord Support',
                'Commercial License Included',
              ],
              popular: true,
              cta: 'Upgrade to Pro Studio',
            },
            {
              name: 'Enterprise',
              price: annualBilling ? '$99' : '$119',
              period: '/month',
              desc: 'Tailored 3D graphics infrastructure for large teams and high-traffic sites.',
              features: [
                'Custom Shader Pipeline Development',
                'Dedicated Performance Optimization',
                'Unlimited 3D Model Rendering',
                '24/7 SLA Support',
                'Custom GLTF/GLB Exporter',
              ],
              popular: false,
              cta: 'Contact Enterprise Team',
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-indigo-500/80 ring-2 ring-indigo-500/40 glow-indigo bg-slate-900/80'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400 flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-95 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/30'
                    : 'glass glass-hover text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked <span className="text-gradient-cyan">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Got questions about our WebGL engine and integration? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-lg text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* INTERACTIVE NEWSLETTER CALLOUT */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/30 glow-purple text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-indigo-400">
            <Sparkles className="w-64 h-64" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Transform Your Frontend Experience?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg mb-8">
            Subscribe to receive new WebGL shaders, 3D interaction patterns, and performance optimizations.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <span>{'\u2713'} Subscribed</span>
                </>
              ) : (
                <>
                  <span>Join Newsletter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white">
                <Box className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">AURA 3D Studio</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pioneering modern WebGL 3D interfaces with Next.js, Three.js, and Framer Motion.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Shader Engine</a></li>
              <li><a href="#showcase" className="hover:text-indigo-400 transition-colors">Mesh Showcase</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">WebGL Examples</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Status Col */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">System Status</h4>
            <div className="glass p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </div>
              <p className="text-slate-400 text-xs">GPU Acceleration: Enabled</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AURA 3D Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300"><Globe className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-300"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-300"><Code2 className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
