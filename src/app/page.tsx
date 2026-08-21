'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Sliders,
  Check,
  ArrowRight,
  ShieldCheck,
  Activity,
  Box,
  Compass,
  Code2,
  Share2
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-widest uppercase">Initializing WebGL Engine...</span>
      </div>
    </div>
  )
})

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyber Purple', value: '#a855f7' },
  { name: 'Neon Teal', value: '#14b8a6' },
  { name: 'Sunset Rose', value: '#f43f5e' },
  { name: 'Solar Amber', value: '#f59e0b' }
]

const GEOMETRY_OPTIONS: { id: GeometryType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'torus', label: 'Torus' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'cube', label: 'Hypercube' }
]

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [selectedShape, setSelectedShape] = useState<GeometryType>('torusKnot')
  const [speed, setSpeed] = useState(1.5)
  const [scale, setScale] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput) {
      setNewsletterSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background WebGL Scene Layer */}
      <div className="fixed inset-0 z-0 opacity-75 pointer-events-none">
        <Scene
          color={selectedColor}
          geometry={selectedShape}
          speed={speed}
          wireframe={wireframe}
          scale={scale}
        />
      </div>

      {/* Glassmorphism Header / Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/60 border-b border-slate-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 font-mono text-sm tracking-normal">3D v2.0</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#studio" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> WebGL 2.0 Active
            </span>
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-[90vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Next-Gen WebGL Interface</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight mb-8"
          >
            Spatial UI Built For <br />
            <span className="text-gradient-primary">The Modern Web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
          >
            Transform user engagement with real-time 3D graphics, spring-physics controls,
            and reactive WebGL shaders crafted with Next.js 16 and Three.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="#studio"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3"
            >
              Explore 3D Studio <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-2xl glass glass-hover text-slate-200 font-semibold text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View Capabilities
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl"
          >
            {[
              { label: 'Target Frame Rate', val: '60 FPS' },
              { label: 'Render Latency', val: '< 14ms' },
              { label: 'Shader Pass Time', val: '0.8ms' },
              { label: 'GPU Memory Load', val: 'Lightweight' }
            ].map((metric, i) => (
              <div key={i} className="glass p-5 rounded-2xl text-center border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono mb-1">{metric.val}</div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Studio / Customizer Section */}
      <section id="studio" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Realtime WebGL Control Center
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 mb-4">
            Interactive 3D Studio
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Customize materials, geometries, and animation parameters in real-time. Watch the canvas adapt seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Panel */}
          <div className="glass p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-8">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" /> Select Geometry
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {GEOMETRY_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedShape(g.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${
                      selectedShape === g.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {g.label}
                    {selectedShape === g.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" /> Material Hue
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-10 h-10 rounded-full transition-transform border-2 flex items-center justify-center ${
                      selectedColor === c.value ? 'scale-110 border-white ring-2 ring-indigo-500' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  >
                    {selectedColor === c.value && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Object Scale</span>
                  <span className="text-purple-400 font-bold">{scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">Wireframe Shader Mode</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-14 h-8 rounded-full transition-colors p-1 flex items-center ${
                  wireframe ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-6 h-6 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          </div>

          {/* Interactive Info Display Banner */}
          <div className="lg:col-span-2 glass p-8 rounded-3xl border border-slate-800 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  Active Configuration
                </span>
                <span className="text-xs font-mono text-slate-500">Live WebGL Context</span>
              </div>

              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Dynamic Mesh Specification
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Geometry Type</div>
                  <div className="text-sm font-bold text-indigo-300 font-mono capitalize">{selectedShape}</div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Material Color</div>
                  <div className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: selectedColor }} />
                    {selectedColor}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Shader Pass</div>
                  <div className="text-sm font-bold text-indigo-300 font-mono">
                    {wireframe ? 'Wireframe Mode' : 'Physical Clearcoat'}
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                The 3D canvas updates in real-time as state flows down into the WebGL scene.
                Materials feature physical roughness, metalness reflection, and smooth floating physics driven by Frame loops.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Status: Operational</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> GPU Synchronized
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-purple-400 tracking-widest uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Core Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 mb-4">
            Engineered For Next-Gen Interfaces
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive suite of performance optimizations and cutting-edge web visual capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Hardware Acceleration",
              desc: "Direct WebGL 2.0 rendering pipeline ensuring 60+ FPS performance across modern desktop and mobile browsers.",
              badge: "Low Overhead"
            },
            {
              icon: Layers,
              title: "Glassmorphism UI",
              desc: "Multi-layered translucent interfaces with real-time backdrop blur filter passes and reactive depth effects.",
              badge: "Modern Aesthetic"
            },
            {
              icon: Cpu,
              title: "React 19 & Next.js 16",
              desc: "Built on the bleeding edge of the React ecosystem with Turbopack acceleration and async server components.",
              badge: "Latest Stack"
            },
            {
              icon: Compass,
              title: "Spatial Interactive Cursor",
              desc: "Custom spring-physics custom cursor that dynamically reacts to interactive controls, links, and buttons.",
              badge: "Physics Driven"
            },
            {
              icon: Globe,
              title: "Parallax & Scroll Motion",
              desc: "Scroll-linked animation curves synchronized between the DOM hierarchy and WebGL viewport camera matrices.",
              badge: "Seamless Sync"
            },
            {
              icon: ShieldCheck,
              title: "TypeScript Native",
              desc: "Fully type-safe architecture with strict ESLint validation and zero runtime type errors.",
              badge: "Type Safe"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border border-slate-800 glass-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Architecture Section */}
      <section id="tech" className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        <div className="glass p-10 sm:p-16 rounded-3xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Technology Stack
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 mb-6">
                Built With The Modern Web Stack
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                Combining Three.js WebGL shaders with React 19 component structures and Tailwind CSS v4 design primitives.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Next.js 16 App Router", text: "Optimal server rendering, instant Turbopack builds, and route management." },
                  { title: "Three.js & React Three Fiber", text: "Declarative 3D scene graphs with continuous frame-rate scheduling." },
                  { title: "Framer Motion", text: "Spring-physics layout transitions and gesture-driven UI state." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Next.js 16", tag: "Framework", icon: Code2 },
                { name: "Three.js", tag: "3D Engine", icon: Box },
                { name: "Framer Motion", tag: "Animation", icon: Activity },
                { name: "Tailwind v4", tag: "Styling", icon: Share2 }
              ].map((tech, i) => (
                <div key={i} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                  <tech.icon className="w-8 h-8 text-indigo-400 mb-3" />
                  <span className="text-sm font-bold text-slate-200 mb-1">{tech.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{tech.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tier Cards */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Flexible Licensing
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-4 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Choose the plan that fits your interactive 3D web production needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$29",
              period: "/month",
              desc: "Ideal for individual developers & experimental projects.",
              features: ["1 Active 3D WebGL Canvas", "Standard Shaders", "60 FPS Target", "Community Support"],
              cta: "Get Started",
              popular: false
            },
            {
              name: "Pro Studio",
              price: "$79",
              period: "/month",
              desc: "For production websites requiring custom shaders and physics.",
              features: ["Unlimited 3D Canvases", "Custom Shader Imports", "Spring Physics Custom Cursor", "Priority GPU Acceleration", "24/7 Developer Support"],
              cta: "Launch Pro Studio",
              popular: true
            },
            {
              name: "Enterprise",
              price: "$199",
              period: "/month",
              desc: "For large enterprise teams building immersive brand platforms.",
              features: ["Full Source Code Access", "Custom WebGL Pipeline", "Dedicated Graphics Engineer", "SLA & Uptime Guarantee"],
              cta: "Contact Enterprise",
              popular: false
            }
          ].map((plan, i) => (
            <div
              key={i}
              className={`glass p-8 rounded-3xl border flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-indigo-500 shadow-2xl shadow-indigo-600/20 bg-slate-900/80'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-mono font-bold uppercase px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Newsletter / Updates CTA */}
      <section className="relative z-10 max-w-5xl mx-auto py-16 px-6 mb-16">
        <div className="glass p-10 sm:p-14 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Stay Updated On WebGL Innovations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8">
              Subscribe to get notified about new shader packs, 3D components, and performance benchmarks.
            </p>

            <AnimatePresence mode="wait">
              {newsletterSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5 text-emerald-400" />
                  Thank you! You are subscribed to Aura 3D updates.
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md transition-all shrink-0"
                  >
                    Subscribe
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-6 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-300">AURA 3D Experience</span>
            <span className="text-xs text-slate-600 font-mono">| Powered by Next.js & Three.js</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Overview</a>
            <a href="#studio" className="hover:text-slate-300 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
          </div>

          <div className="text-xs text-slate-600">
            © 2026 Aura 3D Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
