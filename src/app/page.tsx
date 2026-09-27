'use client'

import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Globe,
  Sliders,
  Play,
  Pause,
  Box,
  Circle,
  Eye,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Palette,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'
import { GeometryType, SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-slate-400 font-medium animate-pulse">Initializing WebGL 3D Canvas...</p>
    </div>
  )
})

export default function Home() {
  // Interactive 3D Control States
  const [geometryShape, setGeometryShape] = useState<GeometryType>('torusKnot')
  const [speed, setSpeed] = useState<number>(2)
  const [distort, setDistort] = useState<number>(0.35)
  const [scale, setScale] = useState<number>(1)
  const [color, setColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Target ref for Framer Motion scroll
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  const colorPresets = [
    { label: 'Indigo Neon', hex: '#6366f1' },
    { label: 'Cyan Cyber', hex: '#06b6d4' },
    { label: 'Purple Aura', hex: '#a855f7' },
    { label: 'Emerald Tech', hex: '#10b981' },
    { label: 'Amber Flare', hex: '#f59e0b' },
    { label: 'Rose Prism', hex: '#f43f5e' }
  ]

  const shapes: { id: GeometryType; name: string }[] = [
    { id: 'torusKnot', name: 'Torus Knot' },
    { id: 'sphere', name: 'Orb Sphere' },
    { id: 'icosahedron', name: 'Icosahedron' },
    { id: 'octahedron', name: 'Octahedron' },
    { id: 'box', name: 'Cube Matrix' },
    { id: 'cylinder', name: 'Cylinder' }
  ]

  const presetShowcases = [
    {
      title: 'Quantum Lattice',
      shape: 'torusKnot' as GeometryType,
      color: '#6366f1',
      speed: 3,
      distort: 0.5,
      desc: 'High-frequency topological mesh generated with real-time parametric distort shaders.'
    },
    {
      title: 'Neon Cyber Orb',
      shape: 'sphere' as GeometryType,
      color: '#06b6d4',
      speed: 1.5,
      distort: 0.6,
      desc: 'Dynamic fluid sphere with organic surface displacement physics and ambient glow.'
    },
    {
      title: 'Crystalline Prism',
      shape: 'icosahedron' as GeometryType,
      color: '#a855f7',
      speed: 2.2,
      distort: 0.2,
      desc: 'Precision polyhedral geometry featuring metallic physics and specular light highlights.'
    }
  ]

  const applyPreset = (preset: typeof presetShowcases[0]) => {
    setGeometryShape(preset.shape)
    setColor(preset.color)
    setSpeed(preset.speed)
    setDistort(preset.distort)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div ref={targetRef} className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Fixed 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          geometryShape={geometryShape}
          speed={speed}
          distort={distort}
          scale={scale}
          color={color}
          wireframe={wireframe}
          isPaused={isPaused}
        />
      </div>

      {/* Radial Gradient Vignette overlay for visual depth */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />

      {/* Fixed Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gradient-primary">AURA 3D</span>
              <span className="text-[10px] tracking-widest text-indigo-300 font-mono uppercase">WebGL Experience</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> Customizer
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> Features
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Presets
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>60 FPS WebGL</span>
            </div>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen Interactive 3D Web Environment</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl mb-8 leading-[1.1]"
        >
          Immersive <span className="text-gradient-primary">3D Canvas</span> for Modern Interfaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-light leading-relaxed"
        >
          Experience real-time WebGL graphics, customizable geometry shaders, smooth fluid motion, and glassmorphic UI design tailored for next-level visual experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sliders className="w-5 h-5" /> Customize 3D Scene
          </a>
          <a
            href="#showcase"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-slate-800/60 border border-slate-700 font-semibold text-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 text-slate-200"
          >
            Explore Showcase <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Dynamic Metric Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mt-20 pt-10 border-t border-slate-800/60 max-w-4xl w-full"
        >
          {[
            { label: 'Render Engine', value: 'WebGL 2.0' },
            { label: 'Frame Rate', value: '60+ FPS' },
            { label: 'Geometries', value: '6 Presets' },
            { label: 'Shader Physics', value: 'Realtime' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-gradient-secondary font-mono">{stat.value}</span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Interactive 3D Customizer Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Interactive Studio</span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2 text-gradient-primary">Real-Time WebGL Control Studio</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Interact with the 3D scene in real-time. Adjust geometry, speed, mesh distortion, scale, color, and wireframe settings below.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/80 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Shape Selector & Playback */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-300">
                <Box className="w-5 h-5" /> Select 3D Mesh Geometry
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setGeometryShape(s.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center gap-2 ${
                      geometryShape === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Circle className={`w-3 h-3 ${geometryShape === s.id ? 'fill-indigo-400 text-indigo-400' : 'text-slate-600'}`} />
                    {s.name}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Animation State</span>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isPaused
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {isPaused ? 'Resume Motion' : 'Pause Motion'}
                </button>
              </div>
            </div>

            {/* Range Sliders (Speed, Distort, Scale) */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-300">
                <Sliders className="w-5 h-5" /> Shader & Physics Controls
              </h3>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Rotation Speed</span>
                  <span className="text-indigo-400 font-mono font-bold">{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Mesh Distortion Intensity</span>
                  <span className="text-indigo-400 font-mono font-bold">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.2"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Geometry Scale</span>
                  <span className="text-indigo-400 font-mono font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* Material Color & Mode Controls */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-300">
                <Palette className="w-5 h-5" /> Surface & Material
              </h3>

              {/* Color Presets */}
              <div className="space-y-2">
                <span className="text-sm text-slate-300 block">Material Color Palette</span>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => setColor(p.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${
                        color === p.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.label}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-full border-none cursor-pointer bg-transparent"
                    title="Custom Color Picker"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    wireframe
                      ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {wireframe ? 'Wireframe Mode: Active' : 'Enable Wireframe Mode'}
                </button>
              </div>

              {/* Reset Control */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setGeometryShape('torusKnot')
                    setSpeed(2)
                    setDistort(0.35)
                    setScale(1)
                    setColor('#6366f1')
                    setWireframe(false)
                    setIsPaused(false)
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Default Settings
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Engine Features</span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2 text-gradient-primary">Engineered for Performance</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Built using industry-standard WebGL abstraction libraries and Next.js modern architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "GPU Hardware Accelerated",
              desc: "Render complex 3D meshes and shader distortions smoothly with direct WebGL hardware execution."
            },
            {
              icon: <Palette className="w-6 h-6 text-purple-400" />,
              title: "Dynamic Parametric Shaders",
              desc: "Custom physical materials with real-time vertex displacement, specular roughness, and reflection parameters."
            },
            {
              icon: <Layers className="w-6 h-6 text-cyan-400" />,
              title: "Glassmorphism UI System",
              desc: "Frosted glass overlays with backdrop blur filters engineered for seamless contrast over 3D canvases."
            },
            {
              icon: <Cpu className="w-6 h-6 text-emerald-400" />,
              title: "React Three Fiber Stack",
              desc: "Declarative React 19 component hierarchy managing WebGL lifecycles and frame execution rates."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
              title: "TypeScript & Next.js 16",
              desc: "Strict type safety, Turbopack optimizations, and zero hydration layout shifts."
            },
            {
              icon: <Globe className="w-6 h-6 text-rose-400" />,
              title: "Responsive Viewports",
              desc: "Adaptive camera perspectives and canvas scaling optimized across all desktop and mobile displays."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preset Showcase / Demo Tabs */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Pre-configured Presets</span>
            <h2 className="text-3xl font-bold mt-2">Instant Visual Styles</h2>
            <p className="text-slate-400 mt-2">Click any preset below to instantly transform the background WebGL scene.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {presetShowcases.map((preset, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Preset #{idx + 1}</span>
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-300">{preset.title}</h3>
                  <p className="text-slate-400 text-sm mb-6">{preset.desc}</p>
                </div>
                <button
                  onClick={() => applyPreset(preset)}
                  className="w-full py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Apply Preset <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA / Newsletter Section */}
      <section className="relative z-10 max-w-5xl mx-auto py-20 px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gradient-primary">
            Ready to Build Next-Level WebGL Interfaces?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Join developers and designers pushing the boundaries of 3D graphics on the web.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-5 py-3.5 rounded-2xl glass-input text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              Get Updates
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 font-medium text-sm mt-4 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> {"\u2713 Subscribed! Welcome to AURA 3D."}
            </motion.p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-200">AURA 3D</span>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AURA 3D Studio. Built with Next.js 16, Three.js, and Tailwind CSS v4.
          </p>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              <Sliders className="w-5 h-5" />
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              <Zap className="w-5 h-5" />
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">
              <Layers className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
