'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShapeType } from '@/components/Scene'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Sliders,
  Check,
  ArrowRight,
  ShieldCheck,
  Flame,
  RefreshCw,
} from 'lucide-react'

// Dynamically import 3D WebGL Scene with ssr: false
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-indigo-400">Loading 3D Canvas Environment...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  // 3D Scene Config State
  const [speed, setSpeed] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [color, setColor] = useState<string>('#6366f1')
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [wireframe, setWireframe] = useState<boolean>(false)

  // Interactive Tech Stack Active Tab
  const [activeTab, setActiveTab] = useState<number>(0)

  // Pricing Billing Toggle State
  const [annualBilling, setAnnualBilling] = useState<boolean>(true)

  const colorOptions = [
    { name: 'Electric Indigo', hex: '#6366f1' },
    { name: 'Neon Purple', hex: '#a855f7' },
    { name: 'Cyan Pulse', hex: '#06b6d4' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Sunset Pink', hex: '#ec4899' },
  ]

  const shapes: { label: string; value: ShapeType }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Octahedron', value: 'octahedron' },
    { label: 'Torus', value: 'torus' },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Ultra Fast WebGL',
      desc: 'Optimized 60 FPS rendering pipeline using Three.js and React Three Fiber with zero layout thrashing.',
      badge: 'Performance',
    },
    {
      icon: Layers,
      title: 'Glassmorphism Design',
      desc: 'Beautiful modern dark aesthetic with multi-layered blur backdrops, vibrant gradients, and glow effects.',
      badge: 'Visuals',
    },
    {
      icon: Sliders,
      title: 'Real-time Canvas Sync',
      desc: 'Manipulate WebGL materials, geometries, and lighting in real time with seamless UI control bindings.',
      badge: 'Interactive',
    },
    {
      icon: Cpu,
      title: 'Next.js 16 Turbo',
      desc: 'Built on Next.js 16 App Router, React 19, and Tailwind v4 for instant server builds and minimal bundle sizes.',
      badge: 'Architecture',
    },
    {
      icon: Sparkles,
      title: 'Dynamic Shading',
      desc: 'Custom MeshPhysicalMaterials featuring metalness, clearcoat reflections, and reactive particle fields.',
      badge: '3D Graphics',
    },
    {
      icon: ShieldCheck,
      title: 'Type Safety & Stability',
      desc: 'Fully typed with TypeScript and React 19 hooks, ensuring stable WebGL context cleanup and hydration.',
      badge: 'Reliability',
    },
  ]

  const showcaseCards = [
    {
      title: 'Quantum Shaders',
      category: 'Procedural Materials',
      imageDesc: 'Interactive procedural mesh distortion shaders with metallic light bounce.',
      stats: '120fps / WebGL 2.0',
    },
    {
      title: 'Particle Morphing',
      category: 'Floating Point Arrays',
      imageDesc: '3D particle cloud systems animating smoothly across multi-axis vectors.',
      stats: '10k Buffer Nodes',
    },
    {
      title: 'Responsive Canvas',
      category: 'Fluid Spatial Layout',
      imageDesc: 'Adaptive camera FOV and viewports configured for ultra-wide and mobile devices.',
      stats: '100% Dynamic Scaling',
    },
  ]

  const techStackDetails = [
    {
      name: 'Next.js 16',
      subtitle: 'React 19 App Architecture',
      description:
        'Leveraging server components, streaming SSR, dynamic imports with zero hydration overhead, and Turbopack for sub-second hot reloading.',
      specs: ['App Router', 'React 19 Concurrent Engine', 'Turbopack Bundler'],
    },
    {
      name: 'React Three Fiber',
      subtitle: 'Declarative WebGL Canvas',
      description:
        'Seamless integration between React component state and Three.js 3D rendering loops, allowing instant reactive property updates.',
      specs: ['Three.js r184+', 'Drei Utility Extensions', 'Spring Physics Hooks'],
    },
    {
      name: 'Framer Motion 12',
      subtitle: 'Fluid UI Motion Engine',
      description:
        'Powering scroll-linked keyframe animations, spring mouse physics, component entrance transitions, and layout morphing.',
      specs: ['Spring Trailing Physics', 'Scroll-linked Motion', 'AnimatePresence Transitions'],
    },
    {
      name: 'Tailwind CSS v4',
      subtitle: 'Modern Inline Utility Engine',
      description:
        'Configured with custom dark theme CSS variables, frosted glass backdrop filters, custom scrollbar tracks, and custom gradient masks.',
      specs: ['@import "tailwindcss"', 'Custom Glass Utilities', 'Fluid Responsive Layouts'],
    },
  ]

  const pricingPlans = [
    {
      name: 'Starter Developer',
      priceMonthly: 0,
      priceAnnual: 0,
      desc: 'Perfect for exploring 3D WebGL interfaces and experimenting with open source components.',
      features: [
        'Full 3D Scene Controls',
        'Standard Geometry Presets',
        'Tailwind v4 Glass Components',
        'Community Support',
      ],
      popular: false,
      cta: 'Get Started Free',
    },
    {
      name: 'Pro Designer',
      priceMonthly: 29,
      priceAnnual: 22,
      desc: 'Ideal for agencies and senior frontend engineers crafting premium immersive web apps.',
      features: [
        'Custom Shader Material Engine',
        'Unlimited WebGL Canvas Controls',
        'Advanced Particle Particle FX',
        'Framer Motion Transition Suite',
        'Priority Technical Support',
      ],
      popular: true,
      cta: 'Start Pro Trial',
    },
    {
      name: 'Enterprise Studio',
      priceMonthly: 89,
      priceAnnual: 69,
      desc: 'Custom WebGL pipelines, dedicated shader consulting, and SLA-backed support.',
      features: [
        'Dedicated Shader Engineers',
        'Custom 3D Model GLTF Integration',
        'Full Source Code Commercial License',
        '24/7 Dedicated Support',
        'Custom WebGL Optimization SLA',
      ],
      popular: false,
      cta: 'Contact Sales',
    },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Fixed Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-75 pointer-events-auto">
        <Scene speed={speed} scale={scale} color={color} shape={shape} wireframe={wireframe} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-xl shadow-indigo-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>INTRODUCING AURA 3D PLATFORM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-slate-400">Next.js 16 + WebGL</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none"
          >
            Immersive 3D <br />
            <span className="text-gradient-primary">Frontend Interfaces</span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Experience next-generation web design. Blend real-time 3D canvas rendering with interactive state controls, high-speed UI animations, and glassmorphism styling.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-full font-semibold transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 group"
            >
              <span>Explore Interactive Controls</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#showcase"
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View 3D Showcase</span>
            </a>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto"
          >
            {[
              { label: 'Frame Rate', val: '60 FPS' },
              { label: 'Bundle Impact', val: '< 25 KB' },
              { label: 'Render Delay', val: '0.2 ms' },
              { label: 'User Rating', val: '4.95 / 5' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl glass-card border border-slate-800/80">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stat.val}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Real-time 3D Customizer / Control Center Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>DOM TO WEBGL BINDING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Live 3D Scene Customizer
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Directly adjust WebGL parameters below and observe instant real-time canvas feedback in the background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Controls Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8"
          >
            {/* Control 1: Geometry Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center justify-between">
                <span>1. Select 3D Mesh Geometry</span>
                <span className="text-slate-400 font-normal">Current: {shape}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {shapes.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setShape(item.value)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border flex items-center justify-between ${
                      shape === item.value
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {shape === item.value && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Color Palette Picker */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center justify-between">
                <span>2. Select Color & Emissive Shader</span>
                <span className="text-slate-400 font-normal">{color}</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                      color === c.hex
                        ? 'bg-slate-800 border-indigo-400 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Speed & Scale Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-300 uppercase">Rotation Speed</span>
                  <span className="font-mono text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-slate-300 uppercase">Mesh Scale</span>
                  <span className="font-mono text-indigo-400 font-bold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Control 4: Render Mode Toggles & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                  wireframe
                    ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>Wireframe Mode: {wireframe ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => {
                  setSpeed(1)
                  setScale(1)
                  setColor('#6366f1')
                  setShape('torusKnot')
                  setWireframe(false)
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            </div>
          </motion.div>

          {/* Customizer Active State Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                Shader Material State
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Synced
              </span>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Geometry"}</span>
                <span className="text-indigo-300">&lt;{shape}Geometry /&gt;</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Material"}</span>
                <span className="text-pink-300">MeshPhysicalMaterial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Emissive Hex"}</span>
                <span style={{ color: color }}>{color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Metalness"}</span>
                <span className="text-indigo-300">0.80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Speed Factor"}</span>
                <span className="text-indigo-300">{speed}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{"// Scale Multiplier"}</span>
                <span className="text-indigo-300">{scale}x</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200/80 leading-relaxed">
              <p>
                <strong>Tip:</strong> Drag left or right anywhere on the background 3D canvas with your mouse or finger to interactively orbit and rotate the perspective view!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/30 text-xs font-mono text-purple-300">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for Modern Web Standards
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            High-performance graphics meeting modern web application architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl glass-card border border-slate-800 group hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 mb-2">
                  {feat.badge}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 3D Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-pink-500/30 text-xs font-mono text-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>VISUAL PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Interactive Showcase
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore sample WebGL component compositions designed for interactive web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-3xl border border-slate-800 overflow-hidden group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-all duration-500" />
                <div className="flex justify-between items-start z-10">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-indigo-300">
                    {card.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{card.stats}</span>
                </div>
                <div className="z-10">
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-slate-400 text-sm">{card.imageDesc}</p>
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Explore Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Capabilities Section */}
      <section id="tech" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass-card rounded-3xl border border-slate-800 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Interactive Tabs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-300">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>ARCHITECTURE STACK</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white">Modern Tech Stack</h2>
              </div>

              <div className="space-y-2">
                {techStackDetails.map((tech, idx) => (
                  <button
                    key={tech.name}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeTab === idx
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm">{tech.name}</div>
                      <div className="text-xs text-slate-400">{tech.subtitle}</div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === idx ? 'text-indigo-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Col: Active Spec Details */}
            <div className="lg:col-span-7 glass bg-slate-950/80 p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-2xl font-bold text-white">
                  {techStackDetails[activeTab].name}
                </span>
                <span className="text-xs font-mono text-indigo-400">
                  {techStackDetails[activeTab].subtitle}
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {techStackDetails[activeTab].description}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Specifications
                </span>
                <div className="space-y-2">
                  {techStackDetails[activeTab].specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-indigo-200"
                    >
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>FLEXIBLE PLANS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Simple Pricing Plans
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Choose the ideal license for your project size and requirements.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span
              className={`text-xs font-medium ${!annualBilling ? 'text-white' : 'text-slate-400'}`}
            >
              Monthly Billing
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center transition-colors"
              aria-label="Toggle billing frequency"
            >
              <div
                className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${
                  annualBilling ? 'translate-x-6 bg-indigo-400' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium flex items-center gap-1.5 ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                Save 25%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                plan.popular
                  ? 'glass-card border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20'
                  : 'glass-card border border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold font-mono tracking-wider uppercase shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    ${annualBilling ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                    Included Features
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  className={`w-full py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'glass hover:bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
