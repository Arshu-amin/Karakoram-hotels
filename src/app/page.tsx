'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Sliders,
  Cpu,
  ChevronRight,
  Globe,
  Code2,
  ArrowRight,
  Palette,
  RotateCw,
  Box,
  CheckCircle2
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm text-indigo-300/70 tracking-widest uppercase font-mono">Loading 3D Engine...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Customizer State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(2.5)
  const [distort, setDistort] = useState<number>(0.4)
  const [scale, setScale] = useState<number>(1.0)
  const [wireframe, setWireframe] = useState<boolean>(false)

  // Interactive Feature Showcase Tab State
  const [activeTab, setActiveTab] = useState<number>(0)

  // Pricing Toggle State
  const [isYearly, setIsYearly] = useState<boolean>(true)

  // Email Subscription State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const presetColors = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyber Magenta', hex: '#ec4899' },
    { name: 'Neon Cyan', hex: '#06b6d4' },
    { name: 'Emerald Spark', hex: '#10b981' },
    { name: 'Solar Amber', hex: '#f59e0b' }
  ]

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'cube', label: 'Cyber Cube' }
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: 'Real-Time 3D Rendering',
      description: 'Ultra-fast WebGL rendering powered by Three.js and React Three Fiber with 60FPS precision.',
      tag: 'Graphics Engine'
    },
    {
      icon: <Sliders className="w-6 h-6 text-purple-400" />,
      title: 'Dynamic Customization',
      description: 'Modify material properties, geometry parameters, distortion waves, and color themes on the fly.',
      tag: 'Interactive State'
    },
    {
      icon: <Cpu className="w-6 h-6 text-pink-400" />,
      title: 'Turbopack Optimized',
      description: 'Built on Next.js 16 with instant hot module replacement, async layouts, and zero-overhead styles.',
      tag: 'Performance'
    },
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'Glassmorphism UI',
      description: 'Modern translucent interfaces, backdrop blurs, ambient lighting gradients, and smooth spring animations.',
      tag: 'UI Framework'
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Enterprise Security',
      description: 'Type-safe architecture with end-to-end TypeScript validation and optimized production bundles.',
      tag: 'Architecture'
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-400" />,
      title: 'Global Delivery',
      description: 'Edge-rendered pages with static asset optimization for sub-millisecond global loading speeds.',
      tag: 'Infrastructure'
    }
  ]

  const featureTabs = [
    {
      id: 'customizer',
      title: '3D Controls',
      description: 'Seamlessly bind state variables to WebGL shaders and physical mesh properties.',
      code: `const [shape, setShape] = useState('torusKnot');\nconst [distort, setDistort] = useState(0.4);\n\n<Canvas>\n  <MeshDistortMaterial distort={distort} />\n</Canvas>`
    },
    {
      id: 'performance',
      title: 'High FPS Guarantee',
      description: 'Hardware accelerated GPU pipelines ensure fluid smooth animations across all desktop and mobile devices.',
      code: `useFrame((state) => {\n  const time = state.clock.getElapsedTime();\n  meshRef.current.rotation.y = time * 0.25;\n});`
    },
    {
      id: 'animations',
      title: 'Fluid Motion Design',
      description: 'Combine Framer Motion layout animations with 3D canvas viewport dynamics for immersive user flow.',
      code: `<motion.div\n  initial={{ opacity: 0, y: 20 }}\n  whileInView={{ opacity: 1, y: 0 }}\n  transition={{ duration: 0.6 }}\n/>`
    }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Dynamic 3D Background */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          color={color}
          speed={speed}
          distort={distort}
          scale={scale}
          wireframe={wireframe}
          shape={shape}
        />
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              Aura 3D
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              v2.0 Live Engine
            </span>
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-indigo-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Next-Gen WebGL Interface
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8"
          >
            Crafting Interactive <br />
            <span className="text-gradient-primary">3D Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-12"
          >
            Elevate your modern web application with real-time responsive 3D graphics, dynamic shader effects, and high-performance glassmorphism design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Customize 3D Object
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold glass hover:bg-slate-800/80 text-slate-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Explore Features
            </a>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {[
              { label: 'Target Frame Rate', value: '60 FPS' },
              { label: 'Bundle Footprint', value: '< 45 KB' },
              { label: 'Shader Presets', value: '12+' },
              { label: 'Global Latency', value: '< 15 ms' }
            ].map((stat, idx) => (
              <div key={idx} className="glass p-5 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-300 font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3D Interactive Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Interactive Workbench
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
            Live 3D Geometry Studio
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Directly manipulate the WebGL viewport properties below to see real-time state synchronization with the 3D scene background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass p-8 rounded-3xl border border-slate-800 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Geometry Controls</h3>
                  <p className="text-xs text-slate-400">Adjust parameters in real-time</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShape('torusKnot')
                  setColor('#6366f1')
                  setSpeed(2.5)
                  setDistort(0.4)
                  setScale(1.0)
                  setWireframe(false)
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Reset Controls
              </button>
            </div>

            {/* Shape Selector */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                1. Select Mesh Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {shapesList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                      shape === item.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>2. Material Color Palette</span>
                <span className="font-mono text-indigo-400 text-xs">{color}</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {presetColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      color === c.hex
                        ? 'border-indigo-400 bg-slate-800/90 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/40">
                  <Palette className="w-4 h-4 text-slate-400" />
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                </div>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Rotation & Wave Speed</span>
                  <span className="font-mono text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Mesh Distortion Wave</span>
                  <span className="font-mono text-indigo-400">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Viewport Scale</span>
                  <span className="font-mono text-indigo-400">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/40">
                <span className="text-xs font-semibold text-slate-300">Wireframe Mode</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
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
          </motion.div>

          {/* Real-time Code & State Output Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass p-8 rounded-3xl border border-slate-800 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Component State</h3>
                  <p className="text-xs text-slate-400">Live JSX snippet</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 font-mono text-xs text-indigo-300 overflow-x-auto space-y-2">
                <p className="text-slate-500">&#47;&#47; Scene.tsx Live Configuration</p>
                <p><span className="text-purple-400">&lt;Scene</span></p>
                <p className="pl-4"><span className="text-slate-400">shape</span>=<span className="text-emerald-400">&quot;{shape}&quot;</span></p>
                <p className="pl-4"><span className="text-slate-400">color</span>=<span className="text-emerald-400">&quot;{color}&quot;</span></p>
                <p className="pl-4"><span className="text-slate-400">speed</span>=&#123;<span className="text-amber-300">{speed}</span>&#125;</p>
                <p className="pl-4"><span className="text-slate-400">distort</span>=&#123;<span className="text-amber-300">{distort}</span>&#125;</p>
                <p className="pl-4"><span className="text-slate-400">scale</span>=&#123;<span className="text-amber-300">{scale}</span>&#125;</p>
                <p className="pl-4"><span className="text-slate-400">wireframe</span>=&#123;<span className="text-pink-400">{wireframe.toString()}</span>&#125;</p>
                <p><span className="text-purple-400">/&gt;</span></p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>WebGL Shaders compiled & synchronized</span>
              </div>
              <a
                href="#features"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                Learn Architecture Details
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Engine Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
            Built for Modern Web Standards
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to create fast, beautiful, and accessible 3D-infused digital platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass p-8 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-800">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Code & Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Developer Integration
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">
                Clean, Type-Safe Architecture
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Easily integrate 3D canvases into Next.js App Router applications with zero hydration mismatches and server component support.
              </p>

              <div className="space-y-3 pt-4">
                {featureTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      activeTab === idx
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{tab.title}</div>
                    <div className="text-xs text-slate-400">{tab.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{featureTabs[activeTab].id}.tsx</span>
                </div>
                <pre className="p-6 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{featureTabs[activeTab].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Flexible Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Choose the right tier to build your next-generation 3D experience.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isYearly ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              desc: 'Perfect for personal portfolios and experimental 3D widgets.',
              priceMonthly: '$0',
              priceYearly: '$0',
              features: ['Up to 3 3D Canvas Scenes', 'Standard Shader Library', 'Community Support', 'Basic Export']
            },
            {
              name: 'Pro Engine',
              desc: 'Ideal for tech startups and immersive agency projects.',
              priceMonthly: '$29',
              priceYearly: '$23',
              popular: true,
              features: ['Unlimited 3D Canvases', 'Custom Shader Pipelines', 'Turbopack Optimization', 'Priority 24/7 Support', 'GLTF / OBJ Exporter']
            },
            {
              name: 'Enterprise',
              desc: 'For high-scale platforms requiring dedicated WebGL engineering.',
              priceMonthly: '$99',
              priceYearly: '$79',
              features: ['Dedicated WebGL Architect', 'Custom Shaders & Materials', 'SLA Guarantee 99.99%', 'On-Premise Deployment', 'Custom Security Audit']
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass p-8 rounded-3xl border flex flex-col justify-between relative ${
                plan.popular ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/10' : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-100">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 min-h-[36px]">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    {isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-slate-400 text-xs">/ month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200'
                }`}
              >
                Get Started Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Newsletter Banner */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="glass p-10 md:p-16 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Build Your 3D App?
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              Subscribe to our developer newsletter for WebGL optimization tips, new shader presets, and feature updates.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{"\u2713 Subscribed"}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300">Aura 3D Studio</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-slate-300 transition-colors">Documentation</a>
          </div>

          <p>© 2026 Aura 3D Engine. Powered by Next.js & WebGL.</p>
        </div>
      </footer>
    </main>
  )
}
