'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Globe,
  Sliders,
  RotateCcw,
  Palette,
  Box,
  Share2,
  ArrowRight,
  Check,
  Code2,
  ShieldCheck,
  Cpu
} from 'lucide-react'
import type { SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-indigo-300/70 font-mono tracking-widest uppercase">Initializing 3D Canvas...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // Interactive 3D Customizer State
  const [meshColor, setMeshColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(2.5)
  const [distort, setDistort] = useState(0.4)
  const [shape, setShape] = useState<SceneProps['shape']>('torusKnot')
  const [scale, setScale] = useState(1)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const resetCustomizer = () => {
    setMeshColor('#6366f1')
    setSpeed(2.5)
    setDistort(0.4)
    setShape('torusKnot')
    setScale(1)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Fixed 3D WebGL Canvas Layer */}
      <div className="fixed inset-0 z-0 transition-opacity duration-1000">
        <Scene
          color={meshColor}
          speed={speed}
          distort={distort}
          shape={shape}
          scale={scale}
        />
      </div>

      {/* Fixed Glassmorphism Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA<span className="text-indigo-400 font-mono text-sm ml-1">3D</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-300 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-300 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-300 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-300 transition-colors">Architecture</a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 border border-indigo-400/30 backdrop-blur-md"
            >
              Launch Studio
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Next-Gen WebGL & Interactive Visual Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8"
          >
            Immersive <br className="hidden sm:block" />
            <span className="text-gradient-primary">3D Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Seamlessly blending high-performance WebGL graphics, fluid animations,
            and real-time responsive DOM interaction into a modern interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center gap-2"
            >
              <Sliders className="w-5 h-5" />
              <span>Customize 3D Object</span>
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 border border-slate-700/80 flex items-center gap-2"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'Frame Rate Target', value: '60 FPS' },
              { label: 'Render Pipeline', value: 'Three.js v0.184' },
              { label: 'Animation Engine', value: 'Framer Motion' },
              { label: 'Framework', value: 'Next.js 16' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card text-center">
                <div className="text-xl sm:text-2xl font-bold text-indigo-300 font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Studio / Customizer Panel Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Box className="w-3.5 h-3.5" />
                <span>Live Studio Controller</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Interactive 3D Customizer</h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Modify parameters below to alter geometry, rotation speed, distortion intensity, and material color in real time.
              </p>
            </div>

            <button
              onClick={resetCustomizer}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all border border-slate-700 self-start lg:self-center"
            >
              <RotateCcw className="w-4 h-4 text-indigo-400" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Control 1: Geometry Shape */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span>Geometry Mesh</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'torus', label: 'Torus Ring' },
                  { id: 'octahedron', label: 'Octahedron' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as SceneProps['shape'])}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                      shape === item.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/30'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Color Palette */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Material Color</span>
              </label>
              <div className="flex flex-wrap gap-2.5 items-center">
                {[
                  { color: '#6366f1', label: 'Indigo' },
                  { color: '#ec4899', label: 'Pink' },
                  { color: '#06b6d4', label: 'Cyan' },
                  { color: '#10b981', label: 'Emerald' },
                  { color: '#f59e0b', label: 'Amber' },
                  { color: '#8b5cf6', label: 'Violet' },
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setMeshColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center border-2 ${
                      meshColor === c.color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'
                    }`}
                    title={c.label}
                  />
                ))}
                <input
                  type="color"
                  value={meshColor}
                  onChange={(e) => setMeshColor(e.target.value)}
                  className="w-8 h-8 rounded-full bg-transparent cursor-pointer border-0"
                />
              </div>
            </div>

            {/* Control 3: Speed Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Rotation Speed</span>
                </span>
                <span className="font-mono text-indigo-300">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="6"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.2x</span>
                <span>3.0x</span>
                <span>6.0x</span>
              </div>
            </div>

            {/* Control 4: Distortion & Scale */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Mesh Distortion</span>
                </span>
                <span className="font-mono text-cyan-300">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.2"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />

              <div className="pt-2 flex justify-between items-center text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <span>Scale</span>
                <span className="font-mono text-purple-300">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.6"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Core Pillars</h2>
          <p className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Designed for Modern Visual Storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "60 FPS Performance",
              desc: "Optimized WebGL scene graph execution and lighting materials ensure stable high frame rates across modern desktop and mobile browsers.",
              color: "from-amber-500 to-orange-500"
            },
            {
              icon: Globe,
              title: "Reactive WebGL Canvas",
              desc: "Background Three.js viewport directly synchronized with DOM interaction hooks and custom UI customization state variables.",
              color: "from-indigo-500 to-blue-500"
            },
            {
              icon: Layers,
              title: "Glassmorphic Design",
              desc: "Multi-layered frosted glass UI components crafted with Tailwind CSS v4 backdrop filters, precise border glows, and typography.",
              color: "from-purple-500 to-pink-500"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 transition-all hover:-translate-y-2 group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
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

      {/* Technical Architecture Specs Grid */}
      <section id="specs" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full-Stack Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Cutting-Edge Tech Stack</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Built on Next.js 16 App Router, React 19, React Three Fiber, Framer Motion, and Tailwind CSS v4.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Next.js 16 App Router",
                details: "Turbopack static pre-rendering with client dynamic imports for WebGL components."
              },
              {
                icon: Box,
                title: "React Three Fiber & Drei",
                details: "Declarative Three.js scene architecture using custom physical materials and orbiting controls."
              },
              {
                icon: Sparkles,
                title: "Framer Motion 12",
                details: "Scroll-linked view animations, stagger entrances, and spring-physics custom mouse pointer."
              },
              {
                icon: Cpu,
                title: "Tailwind CSS v4 & PostCSS",
                details: "Inline custom theme definitions, utility glassmorphism classes, and responsive layout primitives."
              },
              {
                icon: Sliders,
                title: "Real-time State Sync",
                details: "Seamless bi-directional React state binding between DOM slider controls and Three.js uniforms."
              },
              {
                icon: Share2,
                title: "Modular Component Design",
                details: "Clean component separation allowing easy extension of 3D shaders, geometries, and UI layers."
              }
            ].map((spec, index) => (
              <div key={index} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <spec.icon className="w-6 h-6 text-indigo-400 mb-3" />
                <h4 className="text-base font-bold text-white mb-1">{spec.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{spec.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Stay Ahead in WebGL Innovation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Subscribe to receive updates on upcoming 3D shader templates, interactive UI kits, and performance optimization guides.
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium text-sm"
              >
                <Check className="w-5 h-5 text-emerald-400" />
                <span>{"\u2713"} You are now subscribed to AURA 3D updates!</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 shrink-0"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-300">AURA 3D Experience</span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#specs" className="hover:text-slate-300 transition-colors">Specs</a>
          </div>

          <p className="text-xs">
            © {new Date().getFullYear()} AURA 3D. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
