'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Sliders,
  ShieldCheck,
  Globe,
  ArrowRight,
  Check,
  ChevronRight,
  Box,
  Palette,
  Activity,
  Send,
  Code2,
  Cpu,
  Menu,
  X,
  RotateCcw,
  Share2
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950/80 animate-pulse" />
})

export default function Home() {
  // Scene Customizer State
  const [sceneColor, setSceneColor] = useState('#6366f1')
  const [sceneSpeed, setSceneSpeed] = useState(2)
  const [sceneDistort, setSceneDistort] = useState(0.4)
  const [sceneWireframe, setSceneWireframe] = useState(false)
  const [sceneShape, setSceneShape] = useState<'torus' | 'sphere' | 'icosahedron'>('torus')
  const [sceneScale, setSceneScale] = useState(1)

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Interactive Demo State
  const [activeTab, setActiveTab] = useState<'design' | 'animation' | 'performance'>('design')

  // Pricing Billing Toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  // Newsletter Form State
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
    }
  }

  const presetColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6']

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          color={sceneColor}
          speed={sceneSpeed}
          distort={sceneDistort}
          wireframe={sceneWireframe}
          shape={sceneShape}
          scale={sceneScale}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white glass"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-4"
            >
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                3D Studio
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Features
              </a>
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Showcase
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-2 font-medium"
              >
                Pricing
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl"
              >
                Launch Studio
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Web Engine</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight max-w-5xl leading-[1.1] mb-8"
        >
          Craft Immersive <br />
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 font-light leading-relaxed"
        >
          Empower your web applications with real-time WebGL rendering, continuous smooth physics, and intuitive DOM-to-3D interactive controls.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            Explore 3D Customizer
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-slate-800/80 text-slate-200 font-semibold rounded-2xl border border-slate-700/60 transition-all hover:scale-105 active:scale-95"
          >
            Live Showcase
          </a>
        </motion.div>

        {/* Stats counter strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl"
        >
          {[
            { label: 'Frame Rate', val: '60 FPS' },
            { label: 'Bundle Size', val: '< 45KB' },
            { label: 'Render Delay', val: '0.2ms' },
            { label: 'User Satisfaction', val: '99.8%' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.val}</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase mb-2">
                <Sliders className="w-4 h-4" /> Live Interactive Controls
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Customize the 3D Canvas
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-1">
                Tweak parameters in real-time and observe the immediate WebGL state mutations.
              </p>
            </div>

            <button
              onClick={() => {
                setSceneColor('#6366f1')
                setSceneSpeed(2)
                setSceneDistort(0.4)
                setSceneWireframe(false)
                setSceneShape('torus')
                setSceneScale(1)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold glass hover:bg-slate-800 text-slate-300 transition-all self-start md:self-auto"
            >
              <RotateCcw className="w-4 h-4" /> Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Shape Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                <span>3D Geometry</span>
                <span className="text-xs text-indigo-400 font-mono capitalize">{sceneShape}</span>
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-900/80 rounded-2xl border border-slate-800">
                {(['torus', 'sphere', 'icosahedron'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSceneShape(s)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all ${
                      sceneShape === s
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                <span>Material Accent</span>
                <span className="text-xs text-indigo-400 font-mono">{sceneColor}</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSceneColor(color)}
                      className={`w-8 h-8 rounded-full transition-transform ${
                        sceneColor === color ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={sceneColor}
                  onChange={(e) => setSceneColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
              </div>
            </div>

            {/* Distort Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Mesh Distortion</span>
                <span className="text-xs text-indigo-400 font-mono">{sceneDistort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneDistort}
                onChange={(e) => setSceneDistort(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Speed Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Animation Speed</span>
                <span className="text-xs text-indigo-400 font-mono">{sceneSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5"
                step="0.2"
                value={sceneSpeed}
                onChange={(e) => setSceneSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Scale Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Object Scale</span>
                <span className="text-xs text-indigo-400 font-mono">{sceneScale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={sceneScale}
                onChange={(e) => setSceneScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="space-y-3 flex flex-col justify-end">
              <label className="text-sm font-medium text-slate-300">Rendering Mode</label>
              <button
                onClick={() => setSceneWireframe(!sceneWireframe)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  sceneWireframe
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                {sceneWireframe ? 'Wireframe Mode Active' : 'Solid Shaded Mesh'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Built for Modern Web Standards
          </h2>
          <p className="text-slate-400 text-lg">
            Architected using cutting-edge rendering technologies and optimized for lightning-fast delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "High Performance WebGL",
              desc: "Direct GPU hardware acceleration delivering smooth 60 FPS visual experiences without main-thread blocking."
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: "Glassmorphism UI System",
              desc: "Deep frosted blur layers and subtle luminous borders crafted with modern Tailwind CSS."
            },
            {
              icon: <Activity className="w-6 h-6 text-pink-400" />,
              title: "Dynamic Physics Engine",
              desc: "Interactive geometry distortion driven by seamless real-time spring physics."
            },
            {
              icon: <Cpu className="w-6 h-6 text-sky-400" />,
              title: "Next.js 16 App Router",
              desc: "Server-driven routing with dynamic WebGL initialization to prevent hydration shifts."
            },
            {
              icon: <Palette className="w-6 h-6 text-amber-400" />,
              title: "DOM-to-WebGL Bridge",
              desc: "Bi-directional reactive state binding allowing UI controls to morph 3D material properties instantly."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: "Type Safety & Security",
              desc: "Fully typed React-Three-Fiber components built on strict TypeScript guidelines."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass p-8 md:p-12 rounded-3xl border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Interactive Capability Showcase</h2>
            <p className="text-slate-400">Explore how our rendering engine adapts across design workflows.</p>

            {/* Tab switch */}
            <div className="flex justify-center gap-2 mt-8 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-fit mx-auto">
              {(['design', 'animation', 'performance'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {activeTab === 'design' && [
                { title: 'Generative Shading', desc: 'Custom GLSL fragment shaders for metallic and iridescent glass effects.' },
                { title: 'Adaptive Lighting', desc: 'Real-time directional and ambient fog blending harmoniously.' },
                { title: 'Responsive Canvas', desc: 'Automatic aspect ratio and perspective camera recalibration.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}

              {activeTab === 'animation' && [
                { title: 'Spring Oscillations', desc: 'Smooth spring dynamics powered by Framer Motion and Three.js clock.' },
                { title: 'Scroll-linked Morphing', desc: 'Mesh vertex distortion responds smoothly to user scroll position.' },
                { title: 'Particle Physics', desc: 'Floating ambient particle fields with subtle continuous motion.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}

              {activeTab === 'performance' && [
                { title: 'Zero GC Overhead', desc: 'Reused geometries and memory buffers prevent garbage collection pauses.' },
                { title: 'Tree-shaken Bundle', desc: 'Optimized imports ensuring slim JS payloads.' },
                { title: 'Dynamic Preloading', desc: 'Non-blocking WebGL loading using Next.js ssr: false deferred mounting.' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-lg font-bold text-indigo-300 mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Simple, Transparent Plans
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Choose the tier that fits your 3D development pipeline.
          </p>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              Annual Billing
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: billingCycle === 'annual' ? '$29' : '$35',
              desc: 'Perfect for small project showcases and personal portfolios.',
              features: ['Up to 3 Active 3D Scenes', 'Standard Shader Material Library', '60 FPS WebGL Engine', 'Community Support'],
              highlight: false,
              btnText: 'Get Started Free'
            },
            {
              name: 'Pro Studio',
              price: billingCycle === 'annual' ? '$79' : '$95',
              desc: 'For professional developers requiring advanced WebGL controls.',
              features: ['Unlimited 3D Scenes', 'Custom GLSL Shader Import', 'Real-time Physics Distortion', 'Priority Rendering Pipeline', '24/7 Dedicated Support'],
              highlight: true,
              btnText: 'Start Pro Trial'
            },
            {
              name: 'Enterprise',
              price: billingCycle === 'annual' ? '$199' : '$239',
              desc: 'Custom WebGL solutions for high-traffic enterprise apps.',
              features: ['Custom 3D Engine Architecture', 'SLA Performance Guarantee', 'Dedicated Graphics Engineer', 'Custom Asset Pipeline Integration'],
              highlight: false,
              btnText: 'Contact Sales'
            }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative ${
                plan.highlight ? 'border-2 border-indigo-500 bg-slate-900/80 shadow-2xl shadow-indigo-500/20' : ''
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-xs">/ month</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'glass hover:bg-slate-800 text-white border border-slate-700'
                }`}
              >
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass p-10 md:p-16 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <Send className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Stay ahead in WebGL & 3D Web Development
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Subscribe to receive new 3D shader templates, physics presets, and performance optimization guides.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm"
              >
                {"\u2713 Subscribed! Check your inbox for exclusive WebGL templates."}
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">AURA 3D</span>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
            © 2026 Aura 3D Inc. Engineered for Next.js & React Three Fiber.
          </p>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors" aria-label="Globe">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors" aria-label="Code">
              <Code2 className="w-5 h-5" />
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors" aria-label="Share">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
