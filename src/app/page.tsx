'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  Sliders,
  Eye,
  Palette,
  RotateCw,
  Check,
  Globe,
  Share2,
  Code2,
  Box,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Activity,
  Flame,
  ArrowRight
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<'torus' | 'icosahedron' | 'sphere' | 'cyber'>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [distort, setDistort] = useState(0.4)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  const colorOptions = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Rose', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' }
  ]

  const applyPreset = (preset: {
    shape: 'torus' | 'icosahedron' | 'sphere' | 'cyber'
    color: string
    speed: number
    distort: number
    wireframe: boolean
  }) => {
    setShape(preset.shape)
    setColor(preset.color)
    setSpeed(preset.speed)
    setDistort(preset.distort)
    setWireframe(preset.wireframe)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background 3D Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
      </div>

      {/* Floating Ambient Glow Overlays */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                AURA<span className="text-gradient-primary">3D</span>
              </span>
              <span className="text-[10px] tracking-widest text-indigo-400 font-mono uppercase">
                WebGL Engine
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#architecture" className="hover:text-indigo-400 transition-colors">
              Architecture
            </a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">
              Performance
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-44 md:pb-28 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-indigo-300 tracking-wide uppercase font-semibold">
            Next-Gen WebGL Engine v2.0
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight max-w-5xl leading-[1.1] mb-8"
        >
          Experience the Next Era of{' '}
          <span className="text-gradient-primary block sm:inline">3D Interactive Web</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Transforming digital products with real-time WebGL shaders, zero-latency physical distortion,
          and seamless React 19 integration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mb-16"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Sliders className="w-5 h-5" />
            <span>Customize 3D Canvas</span>
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/60 font-semibold text-slate-200 border border-slate-700/80 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore Tech Specs</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Hero Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Target Frame Rate', val: '60 FPS', sub: 'Ultra Smooth' },
            { label: 'Render Latency', val: '< 12ms', sub: 'Zero Lag' },
            { label: 'Technology Stack', val: 'WebGL 2.0', sub: 'Native Shaders' },
            { label: 'Bundle Footprint', val: 'Optimized', sub: 'Dynamic SSR' }
          ].map((metric, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl text-center border border-slate-800/80">
              <div className="text-2xl font-extrabold text-white mb-1 font-mono">{metric.val}</div>
              <div className="text-xs text-indigo-400 font-medium mb-1">{metric.label}</div>
              <div className="text-[11px] text-slate-500 font-mono">{metric.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4 border border-indigo-500/20">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Playground</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Real-Time <span className="text-gradient-secondary">3D Studio</span> Controls
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Interact with the controls below to manipulate the WebGL 3D environment rendered in real-time behind this application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-slate-800 space-y-8"
          >
            {/* Shape Switcher */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>3D Geometry Mesh</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'torus' as const, label: 'Torus Knot' },
                  { id: 'icosahedron' as const, label: 'Icosahedron' },
                  { id: 'sphere' as const, label: 'Sphere' },
                  { id: 'cyber' as const, label: 'Cyber Orbit' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
                      shape === s.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                <span>Material Hue Accent</span>
              </label>
              <div className="flex flex-wrap gap-4 items-center">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`w-10 h-10 rounded-full transition-transform flex items-center justify-center ${
                      color === c.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  >
                    {color === c.value && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed & Distortion Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Spin Velocity</span>
                  </span>
                  <span className="text-xs font-mono text-indigo-300">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Fluid Distortion</span>
                  </span>
                  <span className="text-xs font-mono text-indigo-300">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Wireframe Mode</span>
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-14 h-8 rounded-full transition-colors relative p-1 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Presets Grid */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
                Quick Preset Schemes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    name: 'Cyberpunk',
                    preset: { shape: 'cyber' as const, color: '#ec4899', speed: 1.5, distort: 0.6, wireframe: false }
                  },
                  {
                    name: 'Deep Space',
                    preset: { shape: 'torus' as const, color: '#6366f1', speed: 1.0, distort: 0.4, wireframe: false }
                  },
                  {
                    name: 'Emerald',
                    preset: { shape: 'icosahedron' as const, color: '#10b981', speed: 1.2, distort: 0.5, wireframe: false }
                  },
                  {
                    name: 'Matrix Wire',
                    preset: { shape: 'sphere' as const, color: '#06b6d4', speed: 0.8, distort: 0.2, wireframe: true }
                  }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p.preset)}
                    className="py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 text-[11px] font-medium text-slate-300 hover:text-white transition-all text-center"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Real-time State Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                  <Terminal className="w-4 h-4" />
                  <span>LIVE_CANVAS_CONFIG.json</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              <pre className="font-mono text-xs text-indigo-200 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 overflow-x-auto leading-relaxed">
{`{
  "engine": "AURA_3D_v2",
  "geometry": "${shape}",
  "materialColor": "${color}",
  "rotationSpeed": ${speed.toFixed(1)},
  "distortionFactor": ${distort.toFixed(2)},
  "wireframeActive": ${wireframe},
  "renderBackend": "WebGL2"
}`}
              </pre>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Active Dynamic Binding</span>
              </span>
              <span className="font-mono text-slate-500">GPU Accelerated</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Showcase */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono uppercase tracking-wider mb-4 border border-purple-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Engine Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Built for <span className="text-gradient-primary">Unrivaled Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            An enterprise-grade 3D graphics architecture engineered for rapid web integration and fluid visual interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Real-Time Mesh Shaders',
              desc: 'Custom vertex and fragment shader pipelines rendered smoothly with WebGL hardware acceleration.'
            },
            {
              icon: Activity,
              title: 'Fluid Mesh Distortion',
              desc: 'Simulate procedural organic motion and dynamic liquid-like surface distortions effortlessly.'
            },
            {
              icon: Layers,
              title: 'Glassmorphic UI Layers',
              desc: 'Seamless multi-layered UI depth with backdrop blur filters and frosted transparency effects.'
            },
            {
              icon: Sparkles,
              title: 'Interactive Physics',
              desc: 'Fluid cursor tracking, camera parallax, and scroll-linked 3D rotations in synchronized harmony.'
            },
            {
              icon: Code2,
              title: 'React 19 & Next.js 16',
              desc: 'Leverages Turbopack compilation, dynamic client-side SSR isolation, and strict component purity.'
            },
            {
              icon: ShieldCheck,
              title: '60 FPS Frame Lock',
              desc: 'Adaptive detail scaling ensures locked frame rates across mobile, desktop, and low-power GPUs.'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Tech Stack / Architecture Breakdown */}
      <section id="architecture" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass-card p-8 md:p-14 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-wider border border-cyan-500/20">
                <Code2 className="w-3.5 h-3.5" />
                <span>Modern Stack Architecture</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Crafted with the Cutting Edge of <span className="text-gradient-secondary">Frontend Tech</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-base">
                Engineered from the ground up to utilize standard web standards with zero compromise on graphics quality or loading performance.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Next.js 16 & Turbopack', text: 'Lightning fast compilation and static route pre-rendering.' },
                  { title: 'Three.js & React Three Fiber', text: 'Declarative 3D scene graphs with GPU hardware access.' },
                  { title: 'Tailwind CSS v4 & Framer Motion', text: 'Fluid spring micro-interactions and modern utility styling.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0 mt-0.5 text-indigo-300 text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-950/70 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-2">
                Engine Execution Flow
              </div>
              {[
                { step: '01. DOM Hydration', desc: 'Isolates WebGL canvas from main layout tree' },
                { step: '02. Shader Compilation', desc: 'Pre-compiles vertex and fragment matrices' },
                { step: '03. Frame Sync Loop', desc: 'Runs GPU clock at synchronized native refresh rates' },
                { step: '04. Reactive Props', desc: 'State updates trigger instant material uniform tweaks' }
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                  <span className="font-mono text-xs font-semibold text-indigo-300">{step.step}</span>
                  <span className="text-xs text-slate-400">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Performance Metric Section */}
      <section id="testimonials" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Developer Feedback</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Loved by <span className="text-gradient-primary">Creative Engineers</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            See how developers and designers use AURA 3D to construct immersive digital web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: 'The 3D interactive customizer binding to WebGL canvas state is insanely responsive and easy to integrate into Next.js.',
              author: 'Alex Rivera',
              role: 'Creative Technologist'
            },
            {
              quote: 'Achieving 60 FPS in browser with complex distorted meshes used to require heavy custom shaders. AURA 3D makes it effortless.',
              author: 'Elena Rostova',
              role: 'Frontend Architect'
            },
            {
              quote: 'The aesthetic glassmorphism UI combined with background 3D particles gives our product landing page an unmatched high-tech look.',
              author: 'Marcus Chen',
              role: 'Design Director'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between"
            >
              <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                &quot;{item.quote}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">{item.author}</h4>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription CTA */}
      <section id="subscribe" className="relative z-10 py-24 px-4 max-w-5xl mx-auto scroll-mt-20">
        <div className="glass-card p-10 md:p-16 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Stay Ahead with <span className="text-gradient-primary">3D Web Updates</span>
            </h2>
            <p className="text-slate-400 text-base mb-8">
              Join thousands of creative developers receiving monthly shader guides, performance updates, and early access.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-center flex items-center justify-center gap-2">
                <span>{"\u2713"} Subscribed to AURA 3D Updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  Get Updates
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300 text-sm">AURA 3D Engine</span>
          </div>

          <p>© 2026 AURA 3D. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>Web</span>
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
