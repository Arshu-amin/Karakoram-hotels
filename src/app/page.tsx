'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Boxes,
  Gauge,
  ShieldCheck,
  Workflow,
  Zap,
  Globe,
  Sliders,
  Palette,
  RotateCcw,
  Check,
  ArrowRight,
  ChevronRight,
  Play,
  Layers,
  Code2,
  Share2
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950 text-indigo-400 font-mono text-sm">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        Initializing 3D Canvas...
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<ShapeType>('torus')
  const [speed, setSpeed] = useState<number>(1)
  const [color, setColor] = useState<string>('#6366f1')
  const [distort, setDistort] = useState<number>(0.35)
  const [wireframe, setWireframe] = useState<boolean>(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Showcase active tab
  const [activeTab, setActiveTab] = useState<'engine' | 'physics' | 'shaders'>('engine')

  const colorPresets = [
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Cyan', hex: '#06b6d4' },
    { name: 'Amber', hex: '#f59e0b' }
  ]

  const shapesList: { id: ShapeType; label: string; icon: typeof Boxes }[] = [
    { id: 'torus', label: 'Torus Knot', icon: Layers },
    { id: 'icosahedron', label: 'Icosahedron', icon: Boxes },
    { id: 'octahedron', label: 'Octahedron', icon: Zap },
    { id: 'sphere', label: 'Sphere', icon: Globe }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  const handleResetControls = () => {
    setShape('torus')
    setSpeed(1)
    setColor('#6366f1')
    setDistort(0.35)
    setWireframe(false)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D Scene Container */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          shape={shape}
          speed={speed}
          color={color}
          distort={distort}
          wireframe={wireframe}
        />
      </div>

      {/* Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3.5 flex items-center justify-between border border-white/10 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              v2.5 Live
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#studio" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#community" className="hover:text-indigo-400 transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#studio"
              className="interactive px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center gap-2"
            >
              <span>Launch Studio</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Next-Gen Spatial Visual Experience Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
        >
          Immersive <span className="text-gradient-primary">3D Visuals</span> <br className="hidden sm:inline" />
          for Modern Interfaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Bring web applications to life with real-time WebGL graphics, dynamic lighting,
          customizable materials, and ultra-smooth 60 FPS animations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#studio"
            className="interactive px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-indigo-500/30 flex items-center gap-3 text-base"
          >
            <Sliders className="w-5 h-5" />
            <span>Customize 3D Object</span>
          </a>
          <a
            href="#features"
            className="interactive px-8 py-4 rounded-2xl glass hover:bg-slate-800/60 font-semibold text-slate-200 border border-slate-700/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-base"
          >
            <Play className="w-4 h-4 fill-current text-indigo-400" />
            <span>Explore Features</span>
          </a>
        </motion.div>

        {/* Stats ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS' },
            { label: 'Render Latency', value: '< 15ms' },
            { label: 'WebGL Core', value: 'Three.js' },
            { label: 'Responsiveness', value: '100%' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-2xl text-center border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio Customizer Panel */}
      <section id="studio" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Interact with real-time parameters below to dynamically manipulate the background 3D WebGL scene.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Live Scene Parameters</h3>
                <p className="text-xs text-slate-400">Updates rendered geometry instantly</p>
              </div>
            </div>

            <button
              onClick={handleResetControls}
              className="interactive px-4 py-2 rounded-xl glass hover:bg-slate-800/80 text-xs font-semibold text-slate-300 flex items-center gap-2 border border-slate-700/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Geometry Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapesList.map((item) => {
                  const IconComponent = item.icon
                  const isActive = shape === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id)}
                      className={`interactive p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/50'
                          : 'glass hover:bg-slate-800 text-slate-300 border border-slate-700/40'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Color Palette */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Material Color Accent
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                {colorPresets.map((preset) => {
                  const isActive = color === preset.hex
                  return (
                    <button
                      key={preset.hex}
                      onClick={() => setColor(preset.hex)}
                      style={{ backgroundColor: preset.hex }}
                      className={`interactive w-10 h-10 rounded-xl transition-all transform hover:scale-110 flex items-center justify-center ${
                        isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      {isActive && <Check className="w-5 h-5 text-white stroke-[3]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Speed & Distortion Sliders */}
            <div>
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-300 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  <span>Mesh Distortion</span>
                  <span className="text-indigo-300 font-mono">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.05"
                  value={distort}
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* 4. Material Display Mode */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Material Render Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setWireframe(false)}
                  className={`interactive flex-1 py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    !wireframe
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'glass text-slate-400 hover:text-white border border-slate-700/40'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Physical</span>
                </button>
                <button
                  onClick={() => setWireframe(true)}
                  className={`interactive flex-1 py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    wireframe
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'glass text-slate-400 hover:text-white border border-slate-700/40'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Wireframe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-indigo-300 text-xs font-semibold mb-4"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built for Performance</span>
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Powerful Features for Modern Web Apps
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Engineered with modern web standards, lightweight bundles, and seamless R3F integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "GPU Accelerated",
              desc: "Leverages WebGL hardware acceleration for silky-smooth 60 FPS renders across desktop and mobile devices."
            },
            {
              icon: Boxes,
              title: "React Three Fiber",
              desc: "Declarative, reusable 3D components built with the power of React 19 and Three.js ecosystem."
            },
            {
              icon: Gauge,
              title: "Ultra-Fast Load",
              desc: "Dynamic SSR hydration and optimized asset pipelines ensure lightning fast initial page loads."
            },
            {
              icon: ShieldCheck,
              title: "Type Safety",
              desc: "Fully typed components and props ensuring smooth developer ergonomics and zero runtime glitches."
            },
            {
              icon: Workflow,
              title: "Framer Motion",
              desc: "Scroll-linked visual animations synchronized perfectly with background 3D canvas movements."
            },
            {
              icon: Share2,
              title: "Seamless Integration",
              desc: "Drop-in components compatible with Next.js App Router, Tailwind CSS v4, and modern web frameworks."
            }
          ].map((feature, i) => {
            const IconComp = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-8 rounded-3xl group transition-all duration-300 hover:border-indigo-500/40 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Tech Showcase Tabs Section */}
      <section id="showcase" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Technical Deep Dive</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Interactive Tech Showcase</h2>
            </div>

            {/* Tab navigation */}
            <div className="flex glass p-1.5 rounded-2xl border border-slate-700/50">
              {(['engine', 'physics', 'shaders'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`interactive px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                {activeTab === 'engine' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-indigo-300">Next.js 16 & React 19 Architecture</h3>
                    <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                      Utilizes dynamic client-side imports with `ssr: false` to ensure zero hydration mismatches during server-side rendering while delivering instant WebGL canvas loading.
                    </p>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Turbopack optimized bundle compilation
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">✓</span>
                        React 19 Hooks purity compliance
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Tailwind CSS v4 utility architecture
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'physics' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Real-Time Spring Dynamics</h3>
                    <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                      Framer Motion spring physics drive smooth custom cursor movements and UI interactions, creating tactile feedback on interactive buttons and controls.
                    </p>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Spring stiffness and damping calibration
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Element hover detection & scale transforms
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Zero layout shift UI feedback
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'shaders' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-pink-300">Physical Mesh Materials & Lighting</h3>
                    <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                      High-performance physical shaders (`MeshPhysicalMaterial`) featuring metalness, clearcoat, and procedural vertex distortion.
                    </p>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Dynamic directional lighting with specular reflection
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Wireframe and physical render mode toggling
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">✓</span>
                        Background starfield particle system
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Code snippet block */}
              <div className="glass p-6 rounded-2xl font-mono text-xs text-slate-300 border border-slate-700/60 shadow-inner">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-500">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span>SceneConfig.tsx</span>
                </div>

                <pre className="overflow-x-auto text-indigo-200">
                  {activeTab === 'engine' && `import dynamic from 'next/dynamic'

const Scene = dynamic(
  () => import('@/components/Scene'),
  { ssr: false }
)

export default function App() {
  return <Scene shape="torus" speed={1.2} />
}`}
                  {activeTab === 'physics' && `import { useSpring, motion } from 'framer-motion'

const cursorX = useSpring(0, {
  damping: 28,
  stiffness: 350
})`}
                  {activeTab === 'shaders' && `<MeshDistortMaterial
  color="${color}"
  speed={${speed.toFixed(1)}}
  distort={${distort.toFixed(2)}}
  metalness={0.8}
  clearcoat={0.6}
/>`}
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="community" className="relative z-10 py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="glass-card p-10 sm:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Stay Updated with Aura<span className="text-indigo-400">3D</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Subscribe to get the latest updates on WebGL graphics, 3D UI patterns, and component releases.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:flex-1 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
            <button
              type="submit"
              className="interactive w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {subscribed ? (
                <span>{"\u2713 Subscribed"}</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-900/80 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300 text-base">Aura3D Studio</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All 3D WebGL Systems Operational</span>
          </div>

          <p className="text-xs">© 2026 Aura3D Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
