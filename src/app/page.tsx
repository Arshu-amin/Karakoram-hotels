'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Sliders,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Share2,
  Code2,
  Box,
  RefreshCw,
  Palette
} from 'lucide-react'
import type { GeometryShape, SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-sm animate-pulse">
      Loading 3D WebGL Engine...
    </div>
  )
})

const colorPresets = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Cyber Rose', value: '#f43f5e' },
  { name: 'Amber Glow', value: '#f59e0b' },
  { name: 'Neon Cyan', value: '#06b6d4' },
  { name: 'Violet Shift', value: '#8b5cf6' }
]

const shapeOptions: { id: GeometryShape; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'dodecahedron', label: 'Dodecahedron' },
  { id: 'sphere', label: 'Sphere' }
]

export default function Home() {
  // 3D Scene Controls State
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 2,
    distort: 0.4,
    wireframe: false,
    scale: 1.25
  })

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Pricing State
  const [isAnnual, setIsAnnual] = useState(true)

  // Subscription State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const resetConfig = () => {
    setSceneConfig({
      shape: 'torusKnot',
      color: '#6366f1',
      speed: 2,
      distort: 0.4,
      wireframe: false,
      scale: 1.25
    })
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Glassmorphic Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav px-4 lg:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span>Aura <span className="text-gradient-primary">3D</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Content Container (z-10 overlay) */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="scroll-mt-20 min-h-screen flex flex-col justify-center items-center px-4 pt-28 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium shadow-inner">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Next-Gen WebGL Engine v2.0 Released</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Craft Immersive <br />
              <span className="text-gradient-primary">3D Web Experiences</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-10 font-normal leading-relaxed">
              Empower your frontend with real-time WebGL customization, glassmorphic UI components, and fluid animations built for Next.js 16.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
              <a
                href="#studio"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Customize 3D Object</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass text-slate-200 hover:text-white font-semibold text-base hover:bg-slate-800/60 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Explore Capabilities</span>
              </a>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                { value: "60 FPS", label: "Silky Smooth WebGL" },
                { value: "< 50ms", label: "Interactive Latency" },
                { value: "100%", label: "Responsive & Modern" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl text-center border border-slate-800/80">
                  <div className="text-2xl md:text-3xl font-extrabold text-gradient-secondary mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3D CUSTOMIZER STUDIO SECTION */}
        <section id="studio" className="scroll-mt-20 py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Real-Time <span className="text-gradient-primary">3D Studio</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Manipulate geometry, material textures, distortion levels, and animation physics directly in real time.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row items-stretch gap-8">
              {/* Studio Info Panel */}
              <div className="lg:w-1/3 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-3">
                    <Sliders className="w-4 h-4" /> Live WebGL Controller
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Interactive Parameters</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Select a base 3D mesh geometry, adjust distortion shaders, toggle wireframe view, or modify rotation physics.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Mesh:</span>
                    <span className="text-indigo-300 capitalize">{sceneConfig.shape}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Material Hex:</span>
                    <span className="text-pink-300 uppercase">{sceneConfig.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rotation Speed:</span>
                    <span className="text-emerald-300">{sceneConfig.speed}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mesh Distortion:</span>
                    <span className="text-amber-300">{sceneConfig.distort}</span>
                  </div>
                </div>

                <button
                  onClick={resetConfig}
                  className="w-full py-3 px-4 rounded-xl glass hover:bg-slate-800/80 text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <RefreshCw className="w-4 h-4 text-indigo-400" />
                  <span>Reset Default Scene</span>
                </button>
              </div>

              {/* Studio Controls Matrix */}
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/60">
                {/* 1. Geometry Mesh Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-400" /> Geometry Mesh
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {shapeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSceneConfig((prev) => ({ ...prev, shape: option.id }))}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                          sceneConfig.shape === option.id
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Color Preset Palette */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-400" /> Material Color Presets
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setSceneConfig((prev) => ({ ...prev, color: preset.value }))}
                        className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                          sceneConfig.color === preset.value
                            ? 'border-white bg-slate-800 shadow-md'
                            : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: preset.value }} />
                        <span className="text-[10px] text-slate-300 font-medium truncate">{preset.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Animation Speed Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-semibold text-slate-200 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Rotation Speed
                    </label>
                    <span className="text-xs text-amber-400 font-mono font-bold">{sceneConfig.speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={sceneConfig.speed}
                    onChange={(e) => setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 4. Distortion Shader Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-semibold text-slate-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" /> Mesh Distortion
                    </label>
                    <span className="text-xs text-purple-400 font-mono font-bold">{sceneConfig.distort}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.0"
                    step="0.05"
                    value={sceneConfig.distort}
                    onChange={(e) => setSceneConfig((prev) => ({ ...prev, distort: parseFloat(e.target.value) }))}
                    className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 5. Wireframe Mode Toggle */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Wireframe Polygon View</div>
                    <div className="text-xs text-slate-400">Display geometry underlying wireframe structure</div>
                  </div>
                  <button
                    onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      sceneConfig.wireframe
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sceneConfig.wireframe ? 'Wireframe Enabled' : 'Solid Material'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="scroll-mt-20 py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Built for <span className="text-gradient-secondary">Modern Performance</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Combining Three.js, React Three Fiber, Framer Motion, and Tailwind CSS v4 into an elite architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                color: "text-indigo-400",
                title: "Hardware Accelerated 3D",
                desc: "Powered by WebGL and Three.js for liquid-smooth framerates with optimized GPU shader pipelines."
              },
              {
                icon: Sparkles,
                color: "text-purple-400",
                title: "Glassmorphism UI",
                desc: "Frosted glass aesthetic with backdrop filters, subtle border reflections, and vibrant neon gradients."
              },
              {
                icon: Zap,
                color: "text-amber-400",
                title: "Instant React 19 State",
                desc: "Seamless synchronization between DOM UI controls and background 3D canvas render loops."
              },
              {
                icon: Layers,
                color: "text-emerald-400",
                title: "Modular Component Architecture",
                desc: "Clean component boundaries designed for dynamic SSR importing and Next.js App Router."
              },
              {
                icon: Sliders,
                color: "text-pink-400",
                title: "Full Physical Materials",
                desc: "Realistic physical rendering with metallic reflection, roughness, clearcoat, and distortion controls."
              },
              {
                icon: ShieldCheck,
                color: "text-cyan-400",
                title: "Production Ready & Typed",
                desc: "Strict TypeScript definitions and ESLint compliance ensuring solid maintainability."
              }
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="glass-card p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="scroll-mt-20 py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Flexible <span className="text-gradient-primary">Plans & Pricing</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Choose the plan that best fits your design and application requirements.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass border border-slate-800">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  !isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px]">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                name: "Starter",
                price: isAnnual ? "$19" : "$24",
                period: "per month",
                desc: "Ideal for indie developers and personal portfolio projects.",
                features: ["5 3D Scene presets", "WebGL shader controls", "Basic mesh export", "Community support"],
                popular: false,
                buttonText: "Start Free Trial"
              },
              {
                name: "Pro Studio",
                price: isAnnual ? "$49" : "$59",
                period: "per month",
                desc: "For creative agencies and frontend engineering teams.",
                features: ["Unlimited 3D Mesh presets", "Custom GLTF/OBJ Imports", "Physics distortion engine", "Priority 24/7 Support", "Commercial license"],
                popular: true,
                buttonText: "Get Started Now"
              },
              {
                name: "Enterprise",
                price: isAnnual ? "$149" : "$179",
                period: "per month",
                desc: "High volume enterprise applications with dedicated SLA.",
                features: ["Custom Shader development", "Dedicated WebGL optimization", "Whitelabel embedding", "SLA & 1-on-1 support", "Custom contracts"],
                popular: false,
                buttonText: "Contact Sales"
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl flex flex-col justify-between border relative ${
                  plan.popular
                    ? 'border-indigo-500/80 bg-slate-900/80 shadow-2xl shadow-indigo-500/20 scale-105 z-20'
                    : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3.5 px-6 rounded-2xl text-xs font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="scroll-mt-20 py-24 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked <span className="text-gradient-secondary">Questions</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to know about integrating 3D WebGL scenes into your app.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does 3D WebGL rendering affect page load performance?",
                a: "Aura 3D utilizes dynamically lazy-loaded canvas modules with SSR disabled. This guarantees fast initial page loads and core web vitals performance while WebGL assets load asynchronously in the background."
              },
              {
                q: "Is Next.js 16 App Router supported?",
                a: "Yes! Aura 3D is engineered specifically for Next.js 16 and React 19, adhering strictly to server component boundaries and hydration practices."
              },
              {
                q: "Can I customize color gradients and lighting dynamically?",
                a: "Absolutely. All lighting, particle fields, physical materials, and distortion mesh properties are connected directly to React state variables, allowing real-time interaction."
              },
              {
                q: "What browsers are supported?",
                a: "All modern evergreen browsers with WebGL 2.0 enabled, including Chrome, Safari, Firefox, Edge, and mobile browsers on iOS/Android."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-semibold text-white flex items-center justify-between gap-4 text-sm md:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-800/60 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / NEWSLETTER SECTION */}
        <section id="subscribe" className="py-20 px-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-14 text-center border border-indigo-500/30 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Stay Ahead in WebGL & 3D Engineering
              </h2>
              <p className="text-slate-400 text-sm md:text-base mb-8">
                Subscribe to receive exclusive shader presets, performance tips, and quarterly component updates.
              </p>

              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{"\u2713 Subscribed"}! Check your inbox for exclusive WebGL updates.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-slate-900 glass text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Box className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-300">Aura 3D Engine</span>
              <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#hero" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Global
              </a>
              <a href="#features" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> Components
              </a>
              <a href="#studio" className="hover:text-slate-300 transition-colors flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Studio
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">All Systems Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
