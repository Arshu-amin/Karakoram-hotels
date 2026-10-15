'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Globe,
  ArrowRight,
  Check,
  Menu,
  X,
  HelpCircle,
  MessageSquare,
  Terminal,
  Box,
  Palette,
  Activity,
  Maximize2,
  RefreshCw,
  Eye,
  ChevronDown,
  Mail,
  CheckCircle2,
  Lock,
  Layers3
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase">
          Initializing WebGL Engine...
        </span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'rendering' | 'turbopack' | 'shaders' | 'motion'>('rendering')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 2,
    scale: 1.2,
    wireframe: false,
    distortion: 0.4,
    roughness: 0.2,
    metalness: 0.8,
    particleCount: 800,
  })

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: '3D Studio', href: '#studio' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ]

  const colorPresets = [
    { name: 'Indigo Core', hex: '#6366f1' },
    { name: 'Cyber Violet', hex: '#a855f7' },
    { name: 'Neon Cyan', hex: '#06b6d4' },
    { name: 'Electric Pink', hex: '#ec4899' },
    { name: 'Emerald Flux', hex: '#10b981' },
  ]

  const shapes = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'cube', label: 'Cyber Cube' },
    { id: 'sphere', label: 'Orb Sphere' },
  ]

  const architectureDetails = {
    rendering: {
      title: 'WebGL & React Three Fiber Pipeline',
      desc: 'High-throughput declarative 3D canvas management using React Three Fiber. Encapsulates Three.js geometries into reactive component trees.',
      code: `import { Canvas, useFrame } from '@react-three/fiber'\n\nfunction Scene() {\n  useFrame((state) => {\n    // Matrix updates\n  })\n  return <mesh geometry={knot} />\n}`,
    },
    turbopack: {
      title: 'Next.js 16 Turbopack Engine',
      desc: 'Sub-millisecond dynamic module replacement and fast incremental builds optimized for SSR dynamic imports.',
      code: `const Scene = dynamic(\n  () => import('@/components/Scene'),\n  { ssr: false }\n)`,
    },
    shaders: {
      title: 'Custom Shader Vertex & Noise Passes',
      desc: 'Custom MeshDistortMaterial and noise-driven displacement formulas calculated directly on GPU texture buffers.',
      code: `const distortShader = {\n  uniforms: { uTime: { value: 0 } },\n  vertexShader: '... wave noise calc ...'\n}`,
    },
    motion: {
      title: 'Framer Motion Spring Physics Engine',
      desc: 'Synchronized DOM element transitions powered by physics-based springs (`stiffness: 500, damping: 28`).',
      code: `<motion.div\n  animate={{ scale: hovered ? 2.2 : 1 }}\n  transition={{ type: 'spring', stiffness: 400 }}\n/>`,
    },
  }

  const pricingPlans = [
    {
      name: 'Starter Developer',
      priceMonthly: '$29',
      priceYearly: '$24',
      desc: 'Ideal for indie developers building fast 3D landing experiences.',
      features: [
        'Single WebGL Canvas Instance',
        'Standard Geometry Library',
        '60 FPS Target Frame Rate',
        'Basic Customizer Controls',
        'Community Support',
      ],
      popular: false,
    },
    {
      name: 'Pro Studio Engine',
      priceMonthly: '$79',
      priceYearly: '$65',
      desc: 'Built for enterprise platforms requiring dynamic real-time WebGL customization.',
      features: [
        'Unlimited Canvas Instances',
        'Full Shader Distortion Suite',
        'Particle Field Engine (Up to 5k)',
        'Spring Cursor Interaction API',
        'Priority Technical Support',
        'Custom Material Shaders',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Matrix',
      priceMonthly: '$199',
      priceYearly: '$160',
      desc: 'Dedicated GPU acceleration, custom shader development, and SLA guarantees.',
      features: [
        'Custom Shader Pass Engine',
        'Dedicated WebGL Performance Architect',
        'White-label License Rights',
        '99.99% SLA Guarantee',
        'Custom 3D Asset Optimization',
        '24/7 Priority Support',
      ],
      popular: false,
    },
  ]

  const faqs = [
    {
      q: 'How does WebGL performance remain high on mobile devices?',
      a: 'Aura 3D dynamically detects screen DPR and scales particle counts and shadow resolution down on mobile GPUs while preserving silky 60 FPS animations.',
    },
    {
      q: 'Can I integrate custom 3D models (GLTF / OBJ)?',
      a: 'Yes! The React Three Fiber engine supports standard `@react-three/drei` loaders such as `useGLTF` and `useFBX` seamlessly.',
    },
    {
      q: 'Is it fully compatible with Next.js App Router?',
      a: 'Absolutely. All WebGL components are dynamically imported with `ssr: false` to ensure server-side rendering hydration remains 100% clean and fast.',
    },
    {
      q: 'Does it support dark and light theme switching?',
      a: 'The WebGL background fog and lighting automatically sync with CSS variables defined in your global theme file.',
    },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Background 3D Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneConfig} />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                AURA<span className="text-indigo-400">3D</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-indigo-300/70 font-mono">
                WebGL Engine v2.5
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-indigo-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              WebGL Active
            </span>
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Launch Studio
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card border-t border-slate-800/80 px-4 pt-4 pb-6 space-y-3"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800/60 hover:text-white font-medium text-base"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="#studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm"
                >
                  Launch Studio
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 md:pt-48 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Next-Generation Interactive 3D Interface</span>
          <span className="text-slate-500">|</span>
          <span className="text-purple-300">v2.5 Release</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-8"
        >
          Unleash The Future of <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Transform your digital application with high-performance WebGL graphics,
          fluid physics animations, and real-time customizer controls built for modern web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <a
            href="#studio"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 group"
          >
            <span>Try 3D Studio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#architecture"
            className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 border border-slate-700/80"
          >
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Explore Stack</span>
          </a>
        </motion.div>

        {/* Live Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
        >
          {[
            { label: 'WebGL Frame Rate', value: '60 FPS', sub: 'Ultra Smooth', icon: Zap },
            { label: 'Render Latency', value: '< 8ms', sub: 'Real-time Shading', icon: Cpu },
            { label: 'Interactive Controls', value: 'Full Mesh', sub: 'Dynamic Physics', icon: Sliders },
            { label: 'Global Availability', value: '99.99%', sub: 'Edge Accelerated', icon: Globe },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl glass-card flex flex-col items-start text-left hover:border-indigo-500/40 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-indigo-400 mb-3" />
              <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
              <span className="text-xs font-semibold text-slate-300 mt-1">{stat.label}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Section 2: Interactive 3D Configurator Studio */}
      <section id="studio" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Studio Controls</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Customize the 3D Engine in Real-Time
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Directly manipulate geometry properties, mesh distortion, colors, and motion physics in the live canvas background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-sm font-semibold font-mono text-indigo-300 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                GEOMETRY CONFIGURATOR
              </span>
              <button
                onClick={() =>
                  setSceneConfig({
                    shape: 'torusKnot',
                    color: '#6366f1',
                    speed: 2,
                    scale: 1.2,
                    wireframe: false,
                    distortion: 0.4,
                    roughness: 0.2,
                    metalness: 0.8,
                    particleCount: 800,
                  })
                }
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
              </button>
            </div>

            {/* Shape Select */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 block">
                3D Mesh Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() =>
                      setSceneConfig((prev) => ({
                        ...prev,
                        shape: s.id as SceneConfig['shape'],
                      }))
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between border ${
                      sceneConfig.shape === s.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold shadow-sm'
                        : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{s.label}</span>
                    {sceneConfig.shape === s.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Preset
              </label>
              <div className="flex gap-3">
                {colorPresets.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, color: c.hex }))}
                    className={`w-9 h-9 rounded-xl transition-all relative border-2 ${
                      sceneConfig.color === c.hex ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" /> Rotation Speed
                </label>
                <span className="text-xs font-mono text-indigo-300">{sceneConfig.speed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5"
                step="0.2"
                value={sceneConfig.speed || 2}
                onChange={(e) =>
                  setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                }
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Mesh Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-400" /> Mesh Scale
                </label>
                <span className="text-xs font-mono text-indigo-300">{sceneConfig.scale}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.0"
                step="0.1"
                value={sceneConfig.scale || 1.2}
                onChange={(e) =>
                  setSceneConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
                }
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" /> Wave Distortion
                </label>
                <span className="text-xs font-mono text-indigo-300">{sceneConfig.distortion}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneConfig.distortion ?? 0.4}
                onChange={(e) =>
                  setSceneConfig((prev) => ({ ...prev, distortion: parseFloat(e.target.value) }))
                }
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Wireframe Mode Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-indigo-400" /> Wireframe Overlay
              </span>
              <button
                onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                  sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Feature Showcase Grid (Bento Style) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'High-Performance WebGL',
                desc: 'Accelerated 3D rendering pipeline powered by React Three Fiber and Three.js with sub-10ms frame latency.',
                tag: 'Performance',
                icon: Cpu,
              },
              {
                title: 'Dynamic Distortion Physics',
                desc: 'Custom vertex shader calculations for organic wave distortions and metallic reflections.',
                tag: 'Shaders',
                icon: Zap,
              },
              {
                title: 'Responsive Canvas Scaling',
                desc: 'Seamless viewports adaptation across desktop, tablet, and high-DPI retina display devices.',
                tag: 'Cross-Platform',
                icon: Globe,
              },
              {
                title: 'Spring Physics Animations',
                desc: 'Framer Motion integration for fluid interaction feedback, hover reactions, and scroll syncing.',
                tag: 'Motion',
                icon: Layers,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl glass-card flex flex-col justify-between hover:border-indigo-500/30 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {f.tag}
                    </span>
                    <f.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold text-indigo-400 gap-1 hover:gap-2 transition-all">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Bento Grid Features */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered For Next-Gen Applications
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Combine modern web standards with GPU-accelerated graphics for unforgettable digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl glass-card relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
                Core WebGL Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3">
                Zero-Lag GPU Web Rendering Architecture
              </h3>
              <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed">
                Utilizing Three.js mesh buffers, custom shader passes, and offscreen canvas worker handling to deliver maximum frame rates without blocking UI main thread user interactions.
              </p>
            </div>
            <div className="mt-8 flex gap-3 text-xs font-mono text-slate-400">
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">React 19</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Next.js 16 Turbopack</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">R3F Engine</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">TypeScript First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fully typed WebGL configurations, prop interfaces, and animation state pipelines for robust developer experience.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-indigo-400">
              100% Type-Safe Config
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Architecture Showcase Tabs */}
      <section id="architecture" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Architecture Stack
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Inspect the underlying code modules and rendering pipeline powering Aura 3D.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-800">
            {[
              { id: 'rendering', label: 'WebGL Engine', icon: Box },
              { id: 'turbopack', label: 'Next.js 16 Bundler', icon: Zap },
              { id: 'shaders', label: 'Shader Noise Passes', icon: Cpu },
              { id: 'motion', label: 'Spring Motion Engine', icon: Layers3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-2xl font-bold text-white">
                {architectureDetails[activeTab].title}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {architectureDetails[activeTab].desc}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-indigo-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Non-Blocking UI Thread Execution</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 font-mono text-xs overflow-x-auto text-indigo-200">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-900 text-slate-500 text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono">architecture-{activeTab}.ts</span>
                </span>
                <span>TypeScript 5.0</span>
              </div>
              <pre className="leading-relaxed">
                <code>{architectureDetails[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tiered Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Transparent Developer Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Flexible Plans For Every Scale
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg mb-8">
            Choose the subscription tier that best fits your WebGL application requirements.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-3 glass p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'glass-card border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10'
                  : 'glass-card border border-slate-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold font-mono uppercase tracking-wider shadow-lg">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6 min-h-[36px]">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                    {billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-sm text-slate-400 font-mono">/ month</span>
                </div>

                <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#studio"
                className={`w-full py-3.5 rounded-xl text-center font-medium text-sm transition-all shadow-md ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25'
                    : 'glass text-slate-200 hover:text-white hover:bg-slate-800'
                }`}
              >
                Get Started Plan
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: FAQ Accordion */}
      <section id="faq" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 max-w-xl text-base">
            Everything you need to know about integrating Aura 3D into your web application stack.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 transition-colors"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-base sm:text-lg font-semibold text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 pt-0 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Newsletter & CTA Banner */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-14 relative overflow-hidden text-center flex flex-col items-center border border-indigo-500/30">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mb-4">
            Stay Ahead With Future WebGL Releases
          </h2>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg mb-8">
            Subscribe to our developer newsletter for performance benchmarks, custom shader presets, and updates.
          </p>

          {emailSubmitted ? (
            <div className="glass px-8 py-4 rounded-2xl border border-emerald-500/40 text-emerald-300 flex items-center gap-3 font-mono text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed!"} Thank you for joining the Aura 3D network.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 shrink-0"
              >
                Join Network
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white font-mono">AURA 3D</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{"// All WebGL Nodes Operational"}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900/80 text-center text-xs text-slate-600">
          © 2026 Aura 3D Web Engine. All rights reserved. Built with Next.js 16 & React Three Fiber.
        </div>
      </footer>
    </main>
  )
}
