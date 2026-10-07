'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Settings,
  ArrowRight,
  Menu,
  X,
  Globe,
  Share2,
  Code2,
  CheckCircle2,
  Sliders,
  Palette,
  Eye,
  Activity,
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-widest uppercase animate-pulse">
          Initializing 3D Core...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  // Mobile Nav Toggle State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Interactive 3D Control States
  const [activeShape, setActiveShape] = useState<'torusKnot' | 'sphere' | 'octahedron' | 'cyberRing'>('torusKnot')
  const [activeColor, setActiveColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(2)
  const [wireframe, setWireframe] = useState(false)
  const [distort, setDistort] = useState(0.4)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorOptions = [
    { name: 'Indigo Aura', value: '#6366f1' },
    { name: 'Cyber Purple', value: '#a855f7' },
    { name: 'Neon Pink', value: '#ec4899' },
    { name: 'Electric Cyan', value: '#38bdf8' },
    { name: 'Solar Amber', value: '#f59e0b' },
  ]

  const shapeOptions = [
    { id: 'torusKnot', label: 'Torus Knot', icon: Box },
    { id: 'sphere', label: 'Fluid Sphere', icon: Sparkles },
    { id: 'octahedron', label: 'Octahedron', icon: Layers },
    { id: 'cyberRing', label: 'Cyber Ring', icon: Cpu },
  ] as const

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={activeShape}
          color={activeColor}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/30 to-[#020617] pointer-events-none" />
      </div>

      {/* Floating Header / Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                <Box className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gradient-primary">
                AURA <span className="text-indigo-400 font-mono text-sm">3D</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#hero" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
                Overview
              </a>
              <a href="#customizer" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
                Live Studio
              </a>
              <a href="#features" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
                Metrics
              </a>
              <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">
                Showcase
              </a>
            </div>

            {/* Desktop Action */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#customizer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                Launch Studio
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-b border-slate-800/80 px-4 pt-2 pb-6 space-y-3"
            >
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60"
              >
                Overview
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60"
              >
                Live Studio
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60"
              >
                Features
              </a>
              <a
                href="#stats"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60"
              >
                Metrics
              </a>
              <a
                href="#customizer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-2 px-4 py-2.5 rounded-full bg-indigo-600 text-white font-medium text-center block"
              >
                Launch Studio
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Next-Gen WebGL 3D Interactive Platform</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Crafting <span className="text-gradient-primary">Immersive</span> 3D Digital Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              Transform static web layouts into fluid, high-performance spatial experiences. Powered by Next.js 16, React Three Fiber, and hardware-accelerated shaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#customizer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <span>Try Studio Controls</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 border border-slate-700/80"
              >
                Explore Features
              </a>
            </motion.div>

            {/* Quick Tech Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>60 FPS WebGL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>React 19 & Turbopack</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Tailwind CSS v4</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Control HUD Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-700/50 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Quick Controller</h3>
                  <p className="text-xs text-slate-400">Modify active WebGL object</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-wider font-semibold border border-emerald-500/30">
                LIVE
              </span>
            </div>

            {/* Shape Select Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>GEOMETRY SHAPE</span>
                <span className="text-indigo-400 font-mono">{activeShape}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapeOptions.map((opt) => {
                  const IconComp = opt.icon
                  const isActive = activeShape === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setActiveShape(opt.id)}
                      className={`p-3 rounded-xl border transition-all text-xs font-semibold flex items-center gap-2.5 ${
                        isActive
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-indigo-400' : ''}`} />
                      <span>{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>MATERIAL COLOR</span>
                <span className="font-mono text-xs text-slate-400">{activeColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setActiveColor(c.value)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      activeColor === c.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">ANIMATION SPEED</span>
                <span className="font-mono text-indigo-400 font-bold">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">WIREFRAME SHADER</span>
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
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE 3D STUDIO CONFIGURATOR SECTION */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs font-medium"
          >
            <Settings className="w-3.5 h-3.5 animate-spin" />
            <span>Interactive WebGL Customizer</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Fine-Tune The <span className="text-gradient-cyan">3D Atmosphere</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Adjust mesh distortion, surface reflectivity, and wireframe states in real-time with zero runtime latency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Distortion & Speed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Physics & Distortion</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dynamically warp vertex points across noise frequencies.
            </p>
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Distortion Factor</span>
                <span className="font-mono text-indigo-400">{distort.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </motion.div>

          {/* Card 2: Material Palette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Physical Materials</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Choose from physical glass clearcoats and glowing emission hues.
            </p>
            <div className="flex items-center gap-2 pt-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveColor(c.value)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    activeColor === c.value
                      ? 'border-white text-white font-bold bg-slate-800'
                      : 'border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  style={{ borderBottomColor: c.value, borderBottomWidth: 3 }}
                >
                  {c.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Camera & Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800"
          >
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Viewport Orbit</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Drag anywhere on the 3D canvas to orbit around the model in 360 space.
            </p>
            <div className="pt-2 flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-300 font-medium">Wireframe Mode</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className="text-xs font-bold text-indigo-400 hover:underline"
              >
                {wireframe ? 'Disable' : 'Enable'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Engineered For <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to build next-generation web platforms with visual depth and fluid interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "60 FPS WebGL Rendering",
              desc: "Hardware-accelerated shader pipelines running directly in browser with minimal memory overhead.",
              color: "text-amber-400",
              bg: "bg-amber-500/10"
            },
            {
              icon: ShieldCheck,
              title: "Type-Safe Architecture",
              desc: "Built with React 19, TypeScript, and ESLint flat config ensuring maximum code quality.",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10"
            },
            {
              icon: Sparkles,
              title: "Framer Motion Physics",
              desc: "Fluid scroll animations, spring dynamics, and smooth viewport transitions across device sizes.",
              color: "text-purple-400",
              bg: "bg-purple-500/10"
            },
            {
              icon: Cpu,
              title: "Turbopack Bundling",
              desc: "Instant dev server reloads and optimized production builds powered by Next.js Turbopack engine.",
              color: "text-indigo-400",
              bg: "bg-indigo-500/10"
            },
            {
              icon: Layers,
              title: "Glassmorphism Aesthetics",
              desc: "Frosted glass UI elements with backlighting, glow effects, and modern CSS variable themes.",
              color: "text-pink-400",
              bg: "bg-pink-500/10"
            },
            {
              icon: Activity,
              title: "Responsive Custom Cursor",
              desc: "Interactive spring-follower cursor with hover targeting for clickable elements and buttons.",
              color: "text-cyan-400",
              bg: "bg-cyan-500/10"
            }
          ].map((feature, i) => {
            const IconComp = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/50 transition-all group"
              >
                <div className={`p-3.5 rounded-xl ${feature.bg} ${feature.color} w-fit mb-5 group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* METRICS & STATS SECTION */}
      <section id="stats" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl sm:text-6xl font-extrabold text-gradient-primary">99.9%</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Frame Rate Stability</p>
          </div>
          <div>
            <p className="text-4xl sm:text-6xl font-extrabold text-gradient-cyan">{"<100ms"}</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">First Contentful Paint</p>
          </div>
          <div>
            <p className="text-4xl sm:text-6xl font-extrabold text-gradient-gold">100+</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Custom Shaders</p>
          </div>
          <div>
            <p className="text-4xl sm:text-6xl font-extrabold text-indigo-400">0.0s</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Hydration Delays</p>
          </div>
        </div>
      </section>

      {/* SHOWCASE & TESTIMONIALS */}
      <section id="testimonials" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Trusted By <span className="text-gradient-cyan">Visionary Creators</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            See how developers and designers use Aura 3D to power modern web interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The seamless integration between React Three Fiber and Framer Motion made our product launch standard light-years ahead.",
              author: "Elena Rostova",
              role: "Lead Creative Technologist"
            },
            {
              quote: "Aura 3D delivered effortless 60 FPS performance even on mobile web viewports. Unbelievable smooth feel.",
              author: "Marcus Vance",
              role: "Senior Frontend Engineer"
            },
            {
              quote: "The interactive studio control panel let us rapid prototype 3D geometries directly with our product team.",
              author: "Sophia Chen",
              role: "Head of Product Design"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between"
            >
              <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                &quot;{item.quote}&quot;
              </p>
              <div>
                <p className="font-bold text-slate-100 text-sm">{item.author}</p>
                <p className="text-xs text-indigo-400 font-mono mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA SECTION */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/30 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready To Upgrade Your Frontend Experience?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Subscribe to receive updates on new 3D shader components, layout templates, and performance optimizations.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              {subscribed ? "\u2713 Subscribed" : "Join Community"}
            </button>
          </form>

          {subscribed && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-mono">
              Thank you for subscribing! We&apos;ll keep you updated.
            </motion.p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-400" />
              <span className="font-extrabold text-slate-200">AURA 3D</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Building next-level 3D spatial user interfaces for modern web applications.
            </p>
          </div>

          <div>
            <p className="font-semibold text-slate-300 mb-3 text-xs uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a></li>
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">Live Studio</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#stats" className="hover:text-indigo-400 transition-colors">Metrics</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-300 mb-3 text-xs uppercase tracking-wider">Tech Stack</p>
            <ul className="space-y-2 font-mono text-xs text-slate-400">
              <li>Next.js 16 (Turbopack)</li>
              <li>React 19 & TypeScript</li>
              <li>React Three Fiber / Three.js</li>
              <li>Tailwind CSS v4</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-slate-300 mb-3 text-xs uppercase tracking-wider">Connect</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/60 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aura 3D Platform. Engineered with Next.js & React Three Fiber.</p>
        </div>
      </footer>
    </div>
  )
}
