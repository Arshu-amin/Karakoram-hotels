'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Sliders,
  Palette,
  RotateCw,
  Box,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  Share2,
  Code2,
} from 'lucide-react'
import type { ShapeType, SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />,
})

export default function Home() {
  // Global 3D State customization
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(2)
  const [distort, setDistort] = useState<number>(0.4)
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'annual'>('annual')

  // Scroll animations setup
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'torus', label: 'Ring Torus' },
    { id: 'octahedron', label: 'Octahedron' },
  ]

  const colorOptions = [
    { name: 'Indigo Aura', value: '#6366f1' },
    { name: 'Cyber Purple', value: '#a855f7' },
    { name: 'Neon Cyan', value: '#06b6d4' },
    { name: 'Vibrant Pink', value: '#ec4899' },
    { name: 'Emerald Glow', value: '#10b981' },
    { name: 'Amber Gold', value: '#f59e0b' },
  ]

  const features = [
    {
      icon: Cpu,
      title: 'GPU Accelerated Shaders',
      description: 'Leveraging WebGL 2.0 with custom GLSL fragment and vertex shaders for maximum computational efficiency.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: '60 FPS Frame Locks',
      description: 'Optimized render loop ensures silky smooth animation frames without layout jank or UI freezing.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Layers,
      title: 'Glassmorphism Design',
      description: 'frosted glass UI cards featuring dynamic backdrop filters and multi-layered specular borders.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Globe,
      title: 'Universal Compatibility',
      description: 'Fully responsive dynamic viewport adaptations across mobile, tablet, desktop, and spatial devices.',
      gradient: 'from-cyan-500 to-indigo-500',
    },
    {
      icon: ShieldCheck,
      title: 'Type-Safe React 19 Stack',
      description: 'Built with Next.js 16, TypeScript 5, and React 19 strict hooks architecture for reliability.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Sliders,
      title: 'Direct DOM-to-3D Linking',
      description: 'Seamless two-way state synchronization connecting standard HTML range sliders directly to WebGL state.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ]

  const showcaseItems = [
    {
      title: 'Aura Interactive Engine',
      category: 'Core System',
      description: 'Real-time raymarching and physical light dynamic scattering engine.',
      stat: '99.9% Uptime',
    },
    {
      title: 'Cybernetic Shader Pipeline',
      category: 'Graphics Processing',
      description: 'Instant vertex distortion and multi-pass post-processing pipeline.',
      stat: '< 2ms Render',
    },
    {
      title: 'Adaptive Particle Stream',
      category: 'Environment',
      description: 'Floating particle field synchronized to user scroll speed and cursor position.',
      stat: '500+ Nodes',
    },
  ]

  const faqs = [
    {
      q: 'How does Aura 3D perform on mobile browsers?',
      a: 'Aura 3D automatically scales shader complexity, particle count, and pixel ratio according to the device GPU performance tier, guaranteeing locked 60fps on mobile smartphones.',
    },
    {
      q: 'Is this component library compatible with Next.js App Router?',
      a: 'Yes, all 3D canvas primitives are client-isolated while keeping page layouts fully SEO server-side rendered with dynamic hydration boundaries.',
    },
    {
      q: 'Can I import custom 3D GLTF / GLB models?',
      a: 'Absolutely! Aura 3D integrates seamlessly with Three.js loaders and `@react-three/drei` `useGLTF` hooks for complex asset importing.',
    },
    {
      q: 'What styling frameworks are supported?',
      a: 'The design system is engineered around Tailwind CSS v4 and Framer Motion, making theme customizing and utility modification effortless.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background WebGL Canvas Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Hero</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-36 pb-24 md:pt-48 md:pb-36 min-h-screen flex items-center justify-center px-4">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>Next-Generation 3D Web UI Framework</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8"
          >
            Craft Modern <br />
            <span className="text-gradient-primary">Interactive Interfaces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-normal"
          >
            Elevate web applications with real-time WebGL rendering, continuous fluid 3D motion, glassmorphism UI components, and instant state reactivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sliders className="w-5 h-5" />
              Customize 3D Object
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base glass border border-slate-700 hover:bg-slate-800/80 text-slate-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-5 h-5" />
              Explore Capabilities
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-card p-6 rounded-2xl border border-slate-800"
          >
            <div>
              <div className="text-3xl font-extrabold text-gradient-secondary">60 FPS</div>
              <div className="text-xs text-slate-400 mt-1">Silky Smooth WebGL</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gradient-primary">100%</div>
              <div className="text-xs text-slate-400 mt-1">Reactive DOM Controls</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gradient-secondary">&lt; 15KB</div>
              <div className="text-xs text-slate-400 mt-1">Optimized Shaders</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gradient-primary">Next.js 16</div>
              <div className="text-xs text-slate-400 mt-1">Turbopack Powered</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-section">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" /> Studio Playground
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Interactive <span className="text-gradient-primary">3D Controls</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Modify shape geometry, color palettes, deformation intensity, and animation speeds in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-1 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
              <Box className="w-5 h-5 text-indigo-400" /> Mesh Geometry
            </h3>

            {/* Shape Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Select Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapesList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                      shape === item.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {shape === item.id && <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3 flex items-center justify-between">
                <span>Material Accent</span>
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setColor(item.value)}
                    className={`p-2 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${
                      color === item.value
                        ? 'border-white/80 bg-slate-800/80 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shadow-inner"
                      style={{ backgroundColor: item.value }}
                    />
                    <span className="truncate">{item.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-indigo-400" /> Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-300">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-pink-400" /> Vertex Noise / Distort
                </label>
                <span className="text-xs font-mono text-pink-300">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.2"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-pink-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Info Display */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live WebGL Context Active
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Buffer Resolution: Native 4K
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Dynamic Parameter Synchronization
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The parameters configured on the left stream state updates directly to `@react-three/fiber` frame loops, updating shader parameters with zero frame drop or layout shift.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs">
                <div>
                  <div className="text-slate-500 mb-1">Active Mesh</div>
                  <div className="text-indigo-400 font-bold capitalize">{shape}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Hex Color</div>
                  <div className="text-slate-200 font-bold">{color}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Rot Speed</div>
                  <div className="text-indigo-400 font-bold">{speed}x</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Noise Value</div>
                  <div className="text-pink-400 font-bold">{distort}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Drag screen to scroll or interact with page elements</span>
              <button
                onClick={() => {
                  setShape('torusKnot')
                  setColor('#6366f1')
                  setSpeed(2)
                  setDistort(0.4)
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Reset Defaults
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-section">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" /> Technical Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Engineered for <span className="text-gradient-secondary">High Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Combining state-of-the-art WebGL capabilities with modern UI component paradigms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const IconComp = feat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-slate-100" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-section">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/90">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 block">
                Feature Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
                Interactive Rendering Ecosystem
              </h2>
            </div>
            <a
              href="#customizer"
              className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center gap-2"
            >
              Open Interactive Playground <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.stat}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-indigo-400 font-medium">
                  <span>Explore Shader</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-section">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Flexible Plans for <span className="text-gradient-primary">Every Creator</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your project scope. Scale up or down anytime.
          </p>

          {/* Pricing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-slate-800">
            <button
              onClick={() => setPricingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                pricingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setPricingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pricingCycle === 'annual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full border border-pink-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Starter</h3>
              <p className="text-slate-400 text-xs mb-6">Ideal for personal portfolios and experimental sites.</p>
              <div className="text-4xl font-extrabold text-slate-100 mb-6">
                {pricingCycle === 'annual' ? '$19' : '$24'}
                <span className="text-xs font-normal text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Standard Shader Library</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to 3 WebGL Canvases</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Community Support</li>
              </ul>
            </div>
            <button className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all">
              Get Started
            </button>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="glass-card p-8 rounded-3xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/30 to-slate-900/80 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Pro Studio</h3>
              <p className="text-slate-400 text-xs mb-6">For production web apps requiring full WebGL customizability.</p>
              <div className="text-4xl font-extrabold text-indigo-400 mb-6">
                {pricingCycle === 'annual' ? '$49' : '$59'}
                <span className="text-xs font-normal text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Full Custom GLSL Shaders</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited WebGL Canvases</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dynamic DOM Reaction Linking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority 24/7 Developer Support</li>
              </ul>
            </div>
            <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-500/25">
              Subscribe to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Enterprise</h3>
              <p className="text-slate-400 text-xs mb-6">Custom GPU shader optimization and dedicated engineering.</p>
              <div className="text-4xl font-extrabold text-slate-100 mb-6">
                {pricingCycle === 'annual' ? '$149' : '$179'}
                <span className="text-xs font-normal text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Bespoke 3D Mesh Development</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated Technical Account Lead</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Enterprise SLA & Security Compliance</li>
              </ul>
            </div>
            <button className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all">
              Contact Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="relative z-10 py-24 px-4 max-w-4xl mx-auto scroll-mt-section">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-gradient-secondary">Questions</span>
          </h2>
          <p className="text-slate-400">
            Got questions regarding 3D integration or system architecture? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-semibold text-slate-100 text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Box */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="glass-card p-8 sm:p-14 rounded-3xl border border-slate-800 bg-gradient-to-tr from-indigo-950/40 via-purple-950/20 to-slate-900/60 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <Mail className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Stay Ahead of WebGL Innovations</h2>
            <p className="text-slate-400 text-sm mb-8">
              Subscribe to receive monthly updates on 3D shader techniques, performance tips, and major releases.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{"\u2713"} Subscribed! Thank you for joining our community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">AURA 3D</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Building next-generation WebGL and interactive 3D frontend experiences with Next.js and React 19.
              </p>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2.5">
                <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer Studio</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Technical Features</a></li>
                <li><a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase Ecosystem</a></li>
                <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Tier Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">GLSL Shader Guide</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">React Three Fiber Docs</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Framer Motion Preset</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">API Reference</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-4 text-sm">Connect</h4>
              <div className="flex items-center gap-3 text-slate-300">
                <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500 transition-colors">
                  <Code2 className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 hover:border-indigo-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500">
            <p>© 2026 Aura 3D Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
