'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Box,
  Palette,
  Activity,
  Check,
  ChevronRight,
  Star,
  Users,
  Compass,
  Code
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic<SceneProps>(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-indigo-400 font-mono">INITIALIZING WEBGL 3D ENVIRONMENT...</span>
      </div>
    </div>
  ),
})

const COLOR_PALETTES = [
  { name: 'Indigo Aura', hex: '#818cf8' },
  { name: 'Cyber Purple', hex: '#c084fc' },
  { name: 'Neon Cyan', hex: '#38bdf8' },
  { name: 'Sunset Crimson', hex: '#f43f5e' },
  { name: 'Emerald Spark', hex: '#34d399' },
]

const SHAPE_OPTIONS: Array<{ id: 'torusKnot' | 'sphere' | 'icosahedron' | 'torus'; name: string }> = [
  { id: 'torusKnot', name: 'Torus Knot' },
  { id: 'sphere', name: 'Sphere Core' },
  { id: 'icosahedron', name: 'Icosahedron' },
  { id: 'torus', name: 'Ring Orbit' },
]

export default function Home() {
  // Configurator Interactive State
  const [shape, setShape] = useState<'torusKnot' | 'sphere' | 'icosahedron' | 'torus'>('torusKnot')
  const [color, setColor] = useState('#818cf8')
  const [speed, setSpeed] = useState(1.2)
  const [scale, setScale] = useState(1.1)
  const [wireframe, setWireframe] = useState(false)

  // Interactive UI States
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [activeTab, setActiveTab] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleResetConfig = () => {
    setShape('torusKnot')
    setColor('#818cf8')
    setSpeed(1.2)
    setScale(1.1)
    setWireframe(false)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              AURA<span className="text-gradient-primary">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Launch Studio <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-medium text-indigo-300 mb-8 glow-purple"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Generation 3D Web Framework</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-cyan-400">v2.5 Release</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.08]"
        >
          Craft Immersive <br />
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          Unleash real-time WebGL graphics, fluid custom animations, and modern glassmorphism UI directly into your web applications with zero friction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full font-semibold text-base bg-indigo-600 hover:bg-indigo-500 text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 flex items-center gap-3"
          >
            Explore 3D Configurator <Sliders className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full font-semibold text-base glass border border-slate-700 hover:bg-slate-800/80 text-slate-200 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            See Architecture <ChevronRight className="w-5 h-5 text-slate-400" />
          </a>
        </motion.div>

        {/* Live Metrics Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl p-6 rounded-2xl glass border border-slate-800/80 shadow-2xl"
        >
          {[
            { label: 'WebGL FPS Performance', value: '120 FPS' },
            { label: 'Render Delay', value: '< 2ms' },
            { label: 'Active Web3 Developers', value: '45,000+' },
            { label: 'UI Component Kits', value: '120+' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-3">
              <span className="text-2xl md:text-3xl font-extrabold text-gradient-primary">{stat.value}</span>
              <span className="text-xs text-slate-400 font-medium mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* INTERACTIVE 3D CUSTOMIZER STUDIO */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Live WebGL Studio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Real-Time <span className="text-gradient-secondary">3D Control Panel</span>
          </h2>
          <p className="text-slate-400 max-w-xl mt-3 text-sm md:text-base">
            Adjust geometry, mesh parameters, color palettes, and rotation dynamics live in the canvas background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Control Panel Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 glass p-6 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-lg text-white">3D Configurator</h3>
              </div>
              <button
                onClick={handleResetConfig}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-indigo-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SHAPE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between ${
                      shape === item.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {item.name}
                    {shape === item.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-purple-400" /> Material Color Accent
              </label>
              <div className="flex items-center justify-between gap-2">
                {COLOR_PALETTES.map((palette) => (
                  <button
                    key={palette.hex}
                    onClick={() => setColor(palette.hex)}
                    className={`w-9 h-9 rounded-full transition-transform transform hover:scale-110 flex items-center justify-center border-2 ${
                      color === palette.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: palette.hex }}
                    title={palette.name}
                  >
                    {color === palette.hex && <Check className="w-4 h-4 text-slate-950 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Rotation Speed</span>
                <span className="text-indigo-300 font-mono">{speed.toFixed(1)}x</span>
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

            {/* Scale Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-cyan-400" /> Object Scale</span>
                <span className="text-cyan-300 font-mono">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" /> Wireframe Shader Mode
              </span>
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
          </motion.div>

          {/* Code Snippet Output Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass p-6 md:p-8 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  JSX GENERATED COMPONENT
                </span>
                <span className="text-xs text-slate-400">React Three Fiber Sync</span>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto shadow-inner">
                <p className="text-purple-400">&lt;<span className="text-indigo-400">Scene3D</span></p>
                <p className="pl-4 text-cyan-300">shape=<span className="text-emerald-300">&quot;{shape}&quot;</span></p>
                <p className="pl-4 text-cyan-300">color=<span className="text-emerald-300">&quot;{color}&quot;</span></p>
                <p className="pl-4 text-cyan-300">speed=&#123;<span className="text-amber-300">{speed}</span>&#125;</p>
                <p className="pl-4 text-cyan-300">scale=&#123;<span className="text-amber-300">{scale}</span>&#125;</p>
                <p className="pl-4 text-cyan-300">wireframe=&#123;<span className="text-indigo-300">{wireframe.toString()}</span>&#125;</p>
                <p className="pl-4 text-cyan-300">material=<span className="text-emerald-300">&quot;meshPhysicalMaterial&quot;</span></p>
                <p className="text-purple-400">/&gt;</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
                <div className="text-indigo-400 text-xs font-bold uppercase mb-1">FPS Target</div>
                <div className="text-slate-200 text-sm font-semibold">Smooth 60-120 Hz</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
                <div className="text-cyan-400 text-xs font-bold uppercase mb-1">Shaders</div>
                <div className="text-slate-200 text-sm font-semibold">Custom Physical</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
                <div className="text-purple-400 text-xs font-bold uppercase mb-1">Bundle Size</div>
                <div className="text-slate-200 text-sm font-semibold">&lt; 28kb Dynamic</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE SHOWCASE GRID */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3 inline-block">
            Architectural Excellence
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Engineered for <span className="text-gradient-primary">Modern Web Apps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Hardware Accelerated",
              desc: "Driven by Three.js and WebGL physical shaders yielding ultra-responsive 120fps interactions.",
              color: "text-amber-400",
              border: "hover:border-amber-500/40"
            },
            {
              icon: Layers,
              title: "Glassmorphism UI",
              desc: "Tailwind v4 theme layers with real-time frosted glass backdrop filters and dynamic lighting.",
              color: "text-indigo-400",
              border: "hover:border-indigo-500/40"
            },
            {
              icon: Cpu,
              title: "Zero GPU Stalls",
              desc: "Carefully architected mesh materials avoid context stalls and heavy memory overhead.",
              color: "text-cyan-400",
              border: "hover:border-cyan-500/40"
            },
            {
              icon: ShieldCheck,
              title: "React 19 & Next 16 Ready",
              desc: "Built with strict compliance to Next.js App Router, Turbopack, and React 19 server primitives.",
              color: "text-emerald-400",
              border: "hover:border-emerald-500/40"
            },
            {
              icon: Sparkles,
              title: "Spring Motion Physics",
              desc: "Smooth cursor tracking and spring physics powered by Framer Motion micro-interactions.",
              color: "text-purple-400",
              border: "hover:border-purple-500/40"
            },
            {
              icon: Globe,
              title: "Responsive Canvas",
              desc: "Automated aspect-ratio scaling and dynamic camera frustum adjustments across all viewports.",
              color: "text-pink-400",
              border: "hover:border-pink-500/40"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`p-8 rounded-3xl glass glass-hover border border-slate-800/80 relative overflow-hidden group ${feature.border}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE EXPERIENCE & TESTIMONIAL TABS */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="glass rounded-3xl border border-slate-800/80 p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Trusted by <span className="text-gradient-secondary">Digital Creators</span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Discover how design teams build spatial landing pages and Web3 applications.
            </p>
          </div>

          {/* Interactive Tab Controls */}
          <div className="flex justify-center gap-2 mb-10 border-b border-slate-800 pb-4">
            {[
              { label: 'Spatial Landing Pages', icon: Compass },
              { label: 'SaaS Platforms', icon: Users },
              { label: 'Interactive Studios', icon: Star },
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="tab0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-2xl"
                >
                  <p className="text-slate-300 text-lg md:text-xl italic font-serif mb-6">
                    &quot;Integrating Aura 3D into our agency landing page elevated our conversion rate by 140%. The 3D WebGL background runs seamlessly without lagging client browsers.&quot;
                  </p>
                  <div className="text-xs font-bold text-indigo-400">ALEX CHEN — DESIGN LEAD @ VERTEX LABS</div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="tab1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-2xl"
                >
                  <p className="text-slate-300 text-lg md:text-xl italic font-serif mb-6">
                    &quot;The modular controls allow our product team to construct interactive 3D configurators in under an hour. It&apos;s the best Three.js wrapper we&apos;ve used.&quot;
                  </p>
                  <div className="text-xs font-bold text-cyan-400">SARAH JENKINS — HEAD OF FRONTEND @ SYNAPSE</div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="tab2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-2xl"
                >
                  <p className="text-slate-300 text-lg md:text-xl italic font-serif mb-6">
                    &quot;Finally, a 3D component library that complies with strict React 19 standards and Turbopack builds out of the box.&quot;
                  </p>
                  <div className="text-xs font-bold text-purple-400">MARCUS VANCE — CTO @ NOVA GRAPHICS</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3 inline-block">
            Flexible Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Simple, Transparent <span className="text-gradient-primary">Pricing</span>
          </h2>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">20% OFF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: 'Starter',
              price: billingCycle === 'annual' ? '$29' : '$35',
              desc: 'Perfect for solo developers and portfolio projects.',
              features: ['3 WebGL Canvas Scenes', 'Standard Shaders', 'Community Support', 'React Components'],
              cta: 'Get Started Free',
              featured: false
            },
            {
              name: 'Pro Studio',
              price: billingCycle === 'annual' ? '$79' : '$99',
              desc: 'Ideal for scaling startups and modern SaaS apps.',
              features: ['Unlimited 3D Scenes', 'Custom Physical Shaders', 'Spring Cursor Interactions', '24/7 Priority Support', 'Commercial License'],
              cta: 'Start Pro Trial',
              featured: true
            },
            {
              name: 'Enterprise',
              price: billingCycle === 'annual' ? '$199' : '$249',
              desc: 'Custom WebGL solutions for enterprise teams.',
              features: ['Custom Shader Engineering', 'Dedicated Account Manager', 'SLA & Uptime Guarantee', 'Team Workspace Seats', 'On-Premise Deployment'],
              cta: 'Contact Sales',
              featured: false
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                plan.featured
                  ? 'glass border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-slate-900/80 scale-105'
                  : 'glass border border-slate-800/80'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3.5 rounded-full text-xs font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  plan.featured
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / NEWSLETTER SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="glass rounded-3xl border border-slate-800/80 p-8 md:p-14 text-center relative overflow-hidden glow-cyan">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to Transform Your <span className="text-gradient-primary">Web Visuals?</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-8">
              Join thousands of developers crafting immersive spatial web apps today.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your developer email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    {"\u2713"} Subscribed
                  </span>
                ) : (
                  <span>Join Early Access</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>— Next-Gen Web Framework</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#customizer" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
          </div>

          <p>© 2026 Aura 3D Inc. Built with Next.js, WebGL & Framer Motion.</p>
        </div>
      </footer>
    </main>
  )
}
