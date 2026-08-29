'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Sliders,
  ChevronRight,
  Shield,
  Palette,
  Eye,
  Send,
  Globe,
  Share2,
  Code2,
  Terminal,
  Activity,
  Cpu
} from 'lucide-react'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  // 3D Scene Interactive Controls State
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(2.5)
  const [distort, setDistort] = useState(0.4)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Global scroll motion values
  const { scrollY } = useScroll()
  const sceneOpacity = useTransform(scrollY, [0, 800], [0.85, 0.4])
  const sceneScale = useTransform(scrollY, [0, 800], [1, 1.15])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'box', label: 'Cube' },
    { id: 'octahedron', label: 'Octahedron' },
  ]

  const colorOptions = ['#6366f1', '#ec4899', '#38bdf8', '#10b981', '#f59e0b', '#a855f7']

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background 3D Scene Layer */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ opacity: sceneOpacity, scale: sceneScale }}
      >
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          distort={distort}
          wireframe={wireframe}
        />
      </motion.div>

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/60">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">
              Aura3D
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Capabilities
            </a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">
              Performance
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-6 text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 tracking-wide uppercase shadow-lg shadow-indigo-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Frontend Interface</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight max-w-5xl mb-8 leading-[1.08]"
        >
          Transform Web Apps with{' '}
          <span className="text-gradient-primary">Real-Time 3D</span> & Interactive Motion
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Craft immersive, high-frequency digital experiences combining WebGL shaders, Three.js dynamics, and effortless fluid UI reactivity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold flex items-center justify-center space-x-2 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Explore 3D Customizer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold border border-slate-700/80 hover:border-slate-600 transition-all hover:scale-[1.02] active:scale-95"
          >
            View Specs
          </a>
        </motion.div>

        {/* Quick Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono"
        >
          <span className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>WebGL 2.0 Ready</span>
          </span>
          <span className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 rounded-md">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>60 FPS Optimized</span>
          </span>
          <span className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 rounded-md">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>Next.js App Router</span>
          </span>
        </motion.div>
      </section>

      {/* 3D Studio / Interactive Controls Playground */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-28 px-6">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Controls</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Customize WebGL Geometry in Real-Time
              </h2>

              <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
                Directly manipulate 3D parameters on the client thread. Modify mesh topology, distortion intensity, color spectrum, and wireframe views seamlessly.
              </p>

              {/* Controls Form */}
              <div className="space-y-6 pt-4 border-t border-slate-800">
                {/* Shape Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Geometry Mesh
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {shapesList.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setShape(item.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          shape === item.id
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 border border-indigo-400'
                            : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Color Spectrum
                  </label>
                  <div className="flex items-center space-x-3">
                    {colorOptions.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-8 h-8 rounded-full transition-transform ${
                          color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110 opacity-80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Speed Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Rotation Speed</span>
                    <span className="text-indigo-400">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Distort Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Vertex Distortion</span>
                    <span className="text-indigo-400">{distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Wireframe Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Wireframe Render
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
              </div>
            </div>

            {/* Right Preview Card Info */}
            <div className="lg:col-span-7 flex flex-col justify-end items-end h-full">
              <div className="w-full max-w-md glass p-6 rounded-2xl space-y-4 border border-indigo-500/20 shadow-2xl">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-mono">
                  <span className="flex items-center space-x-1.5">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Live WebGL Canvas</span>
                  </span>
                  <span>Active Mesh: {shape}</span>
                </div>
                <div className="h-40 rounded-xl bg-slate-950/80 border border-slate-800/80 p-4 font-mono text-xs text-slate-400 overflow-hidden relative">
                  <div className="absolute top-2 right-2 text-[10px] text-slate-600 uppercase">Matrix Stats</div>
                  <p className="text-emerald-400">&gt; WebGL2Context: Active</p>
                  <p className="text-slate-300">&gt; Shader Material: MeshDistortMaterial</p>
                  <p>&gt; Target FPS: 60.0</p>
                  <p>&gt; Uniforms updated:</p>
                  <p className="pl-4 text-indigo-400">speed: {speed.toFixed(1)}</p>
                  <p className="pl-4 text-indigo-400">distort: {distort.toFixed(2)}</p>
                  <p className="pl-4 text-indigo-400">color: {color}</p>
                  <p className="pl-4 text-indigo-400">wireframe: {wireframe ? 'true' : 'false'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built for High-Impact <span className="text-gradient-primary">Digital Experiences</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Engineered with modern architecture principles to deliver maximum aesthetic appeal without sacrificing frame rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-7 h-7 text-amber-400" />,
              title: 'GPU Accelerated Rendering',
              desc: 'Leverages hardware-accelerated WebGL pipelines with custom Fragment Shaders for smooth 60FPS visuals.'
            },
            {
              icon: <Layers className="w-7 h-7 text-indigo-400" />,
              title: 'Glassmorphism UI System',
              desc: 'Ultra-modern frosted glass interface panels featuring layered backdrops and reactive light gradients.'
            },
            {
              icon: <Palette className="w-7 h-7 text-pink-400" />,
              title: 'Fluid Motion Design',
              desc: 'Spring-physics micro-interactions and scroll-driven page transformations crafted with Framer Motion.'
            },
            {
              icon: <Shield className="w-7 h-7 text-emerald-400" />,
              title: 'Responsive & Accessible',
              desc: 'Fully optimized across all screen breakpoints with smooth fallback states for low-powered devices.'
            },
            {
              icon: <Code2 className="w-7 h-7 text-cyan-400" />,
              title: 'Next.js & React 19',
              desc: 'Built on Next.js App Router for optimal server rendering, static pre-generation, and instantaneous loads.'
            },
            {
              icon: <Eye className="w-7 h-7 text-purple-400" />,
              title: 'Interactive Customizer',
              desc: 'Real-time DOM state reflection directly in WebGL buffer objects for live scene dynamic customization.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:border-indigo-500/40 transition-all hover:translate-y-[-4px] group"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats & Metric Showcase */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        <div className="glass rounded-3xl p-10 border border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-2 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient-primary">60 FPS</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">Fluid Frame Rate</div>
            </div>
            <div className="space-y-2 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient-secondary">100%</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">WebGL Compliant</div>
            </div>
            <div className="space-y-2 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient-primary">&lt; 0.2s</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">Interaction Latency</div>
            </div>
            <div className="space-y-2 p-4">
              <div className="text-4xl sm:text-5xl font-extrabold text-gradient-secondary">Zero</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">Hydration Mismatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="relative z-10 max-w-5xl mx-auto py-24 px-6 text-center">
        <div className="glass-card rounded-3xl p-10 sm:p-16 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Upgrade Your Frontend Stack?
            </h2>
            <p className="text-slate-400 text-base">
              Join thousands of developers and creators building next-generation 3D web interfaces.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold"
              >
                {"\u2713"} Thank you for subscribing! We will send you updates soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center space-x-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-300">Aura3D Experience</span>
          </div>

          <div className="flex space-x-6 text-xs font-medium">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-slate-300 transition-colors">Documentation</a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-slate-600 mt-8">
          © {new Date().getFullYear()} Aura3D. Built with Next.js, Three.js & Framer Motion.
        </div>
      </footer>
    </main>
  )
}
