'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Cpu,
  Globe,
  Sliders,
  RotateCcw,
  Box,
  Circle,
  Disc,
  Hexagon,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

// Dynamically import 3D Scene with ssr: false
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-sm animate-pulse">
      [ Initializing WebGL Canvas... ]
    </div>
  ),
})

type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'box'

export default function Home() {
  // Customizer State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(1.5)
  const [scale, setScale] = useState<number>(1.1)
  const [distort, setDistort] = useState<number>(0.35)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [emailInput, setEmailInput] = useState<string>('')

  const handleResetCustomizer = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setSpeed(1.5)
    setScale(1.1)
    setDistort(0.35)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
    }
  }

  const colorPresets = [
    { name: 'Indigo Aura', value: '#6366f1' },
    { name: 'Neon Purple', value: '#a855f7' },
    { name: 'Cyber Cyan', value: '#38bdf8' },
    { name: 'Rose Glow', value: '#f43f5e' },
    { name: 'Emerald Flux', value: '#10b981' },
    { name: 'Amber Burst', value: '#f59e0b' },
  ]

  const shapes: { id: ShapeType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'torusKnot', label: 'Torus Knot', icon: Disc },
    { id: 'icosahedron', label: 'Icosahedron', icon: Hexagon },
    { id: 'sphere', label: 'Sphere', icon: Circle },
    { id: 'box', label: 'Cube Box', icon: Box },
  ]

  const features = [
    {
      icon: Zap,
      title: '60+ FPS Rendering',
      description: 'Leveraging WebGL and Three.js for hardware-accelerated fluid 3D transformations.',
    },
    {
      icon: Sparkles,
      title: 'Glassmorphism UI',
      description: 'Layered visual clarity with blur filters, subtle borders, and gradient highlights.',
    },
    {
      icon: Sliders,
      title: 'Real-time Controls',
      description: 'Directly modify geometry parameters and visual attributes live in the DOM viewport.',
    },
    {
      icon: Shield,
      title: 'Type-Safe Architecture',
      description: 'Built on Next.js 16 App Router, React 19, and TypeScript for stability.',
    },
    {
      icon: Cpu,
      title: 'Optimized Shaders',
      description: 'Custom lighting models and physical materials tuned for high performance.',
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Responsive layout and fluid animations tailored for modern cross-platform displays.',
    },
  ]

  const faqs = [
    {
      q: 'How does real-time WebGL rendering affect browser performance?',
      a: 'The 3D scene uses optimized low-poly geometries and native requestAnimationFrame loops, ensuring smooth 60 FPS performance while consuming minimal CPU/GPU power.',
    },
    {
      q: 'Can the 3D model properties be configured programmatically?',
      a: 'Yes, all parameters (color, speed, scale, distortion, and roughness) are reactively bound to state props and can be controlled via user input or standard API hooks.',
    },
    {
      q: 'Is this interface fully responsive on mobile devices?',
      a: 'Absolutely. The glassmorphism layout, navigation drawers, and WebGL viewports adapt seamlessly across screens of all sizes.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Dynamic 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          distort={distort}
        />
      </div>

      {/* Ambient Radial Gradients */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Floating Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 max-w-7xl mx-auto">
        <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 font-mono text-xs ml-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">3D</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">
              Showcase
            </a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 active:scale-95"
            >
              Customize Scene
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4 text-center"
            >
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2"
              >
                3D Studio
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2"
              >
                Features
              </a>
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2"
              >
                Showcase
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-indigo-400 py-2"
              >
                FAQ
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm"
              >
                Customize Scene
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen WebGL & Modern UI Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]"
          >
            Experience the <br />
            <span className="text-gradient-primary">Interactive Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            An immersive digital environment blending reactive 3D WebGL visuals with sleek glassmorphism UI components and customizable parameter controls.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Launch 3D Studio <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-slate-800/80 font-semibold text-slate-300 border border-white/10 transition-all transform hover:scale-105 active:scale-95"
            >
              Explore Features
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-indigo-400 font-mono">60 FPS</span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Smooth WebGL</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-purple-400 font-mono">100%</span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Interactive</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-sky-400 font-mono">0ms</span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Latency Mesh</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">React 19</span>
              <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Powered</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Interactive <span className="text-gradient-primary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Directly manipulate the WebGL viewport attributes in real time using the controls below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-lg">Mesh Parameters</h3>
              </div>
              <button
                onClick={handleResetCustomizer}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {shapes.map((s) => {
                  const Icon = s.icon
                  const isSelected = shape === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : ''}`} />
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Material Color
                </label>
                <span className="text-xs font-mono text-indigo-300">{color}</span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setColor(preset.value)}
                    title={preset.name}
                    className={`w-9 h-9 rounded-full transition-transform flex items-center justify-center shrink-0 ${
                      color === preset.value ? 'scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950' : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: preset.value }}
                  >
                    {color === preset.value && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <span>Rotation Velocity</span>
                <span className="font-mono text-indigo-300">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="4.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Mesh Scale Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <span>Model Scale</span>
                <span className="font-mono text-indigo-300">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Distortion Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <span>Distortion Noise</span>
                <span className="font-mono text-indigo-300">{(distort * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Preview Viewport Details */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2">
                Live Viewport Status
              </span>
              <h3 className="text-2xl font-bold mb-4">Dynamic Real-Time WebGL Stream</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">
                The 3D model positioned in the background is linked to this control panel. Rotate, click, or hover over the 3D canvas directly using your cursor or touch controls to inspect the geometry from any angle.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block mb-1">GEOMETRY</span>
                  <span className="text-indigo-300 font-semibold capitalize">{shape}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block mb-1">HEX COLOR</span>
                  <span className="text-indigo-300 font-semibold">{color}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block mb-1">DISTORTION</span>
                  <span className="text-indigo-300 font-semibold">{(distort * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Tip */}
            <div className="glass rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Orbit Controls Enabled</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click and drag anywhere on the canvas background to rotate the 3D model seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block"
          >
            Engineering Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Architected for <span className="text-gradient-secondary">Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            A high-grade stack crafted for maximum visual fidelity and effortless user responsiveness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-slate-400">Everything you need to know about the architecture and performance.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index
            return (
              <div
                key={index}
                className="glass rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-200 hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-400 text-sm leading-relaxed"
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

      {/* Newsletter Subscription Banner */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-indigo-500/30 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Stay Ahead with Modern UI Tech</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Subscribe to receive updates on WebGL 3D component updates, Next.js optimization strategies, and UI design systems.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713"} Subscribed successfully! Welcome aboard.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all text-sm shadow-lg shadow-indigo-600/30 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>— Next.js 16 & WebGL Showcase</span>
          </div>
          <p>© 2026 AURA 3D Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
