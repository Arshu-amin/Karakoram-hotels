'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Palette,
  RotateCw,
  Eye,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Code2,
  ShieldCheck,
  Box
} from 'lucide-react'

// Dynamically import WebGL 3D Canvas Scene with ssr: false
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Initializing 3D Canvas...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // Real-time 3D Customizer State
  const [shape, setShape] = useState<'torusKnot' | 'crystal' | 'sphere' | 'ring'>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [distort, setDistort] = useState(0.4)
  const [wireframe, setWireframe] = useState(false)
  const [particleCount, setParticleCount] = useState(120)
  const [activeTab, setActiveTab] = useState<'realtime' | 'shaders' | 'analytics'>('realtime')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const presetColors = ['#6366f1', '#ec4899', '#38bdf8', '#10b981', '#f59e0b', '#a855f7']

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Hero Section with Fixed Background 3D Canvas */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
        {/* WebGL 3D Scene Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Scene
            shape={shape}
            color={color}
            rotationSpeed={rotationSpeed}
            distort={distort}
            wireframe={wireframe}
            particleCount={particleCount}
          />
          {/* Subtle vignette gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />
        </div>

        {/* Hero DOM Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pt-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10"
          >
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-wide text-indigo-200 uppercase">
              Next.js 16 + WebGL 3D Platform
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]"
          >
            Spatial Interfaces for <br />
            <span className="text-gradient-primary">Modern Web Apps</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            Transform standard web layouts into immersive 3D digital experiences with seamless
            real-time shader controls, hardware acceleration, and glassmorphism UI.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <a
              href="#visualizer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <Sliders className="w-5 h-5" />
              Customize 3D Object
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-white font-semibold text-lg transition-all border border-slate-700/80 hover:border-slate-500 flex items-center justify-center gap-2"
            >
              Explore Architecture
              <ArrowRight className="w-5 h-5 text-indigo-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D Customizer Section */}
      <section id="visualizer" className="relative z-10 max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Directly manipulate the WebGL viewport in real time. Tweak geometry, surface distortion,
            particle count, and wireframe shaders below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Controls Glass Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-semibold text-lg text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                Parameters
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
                60 FPS GL
              </span>
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Geometry Primitive
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'crystal', label: 'Crystal' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'ring', label: 'Ring' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShape(s.id as 'torusKnot' | 'crystal' | 'sphere' | 'ring')}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      shape === s.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                Surface Color
              </label>
              <div className="flex items-center gap-3">
                {presetColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                      color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Surface Distort
                </label>
                <span className="text-xs font-mono text-indigo-300">{distort.toFixed(2)}</span>
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

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                  Spin Velocity
                </label>
                <span className="text-xs font-mono text-indigo-300">{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={rotationSpeed}
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Particles Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Star Particles
                </label>
                <span className="text-xs font-mono text-indigo-300">{particleCount}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="20"
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full accent-pink-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-300" />
                Wireframe Mesh
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Quick Preview Specs & Code Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between h-full min-h-[420px]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex gap-2">
                  {[
                    { id: 'realtime', label: 'Live Specs' },
                    { id: 'shaders', label: 'JSX Snippet' },
                    { id: 'analytics', label: 'GPU Memory' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'realtime' | 'shaders' | 'analytics')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">Three.js R184</span>
              </div>

              {activeTab === 'realtime' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Active Geometry</span>
                    <span className="text-lg font-bold text-white capitalize">{shape}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Color Hex</span>
                    <span className="text-lg font-bold text-indigo-400 font-mono">{color}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Distort Intensity</span>
                    <span className="text-lg font-bold text-pink-400 font-mono">{distort}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Star Particles</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{particleCount}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Render Mode</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {wireframe ? 'Wireframe' : 'Physical Solid'}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">Framerate</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">60 FPS</span>
                  </div>
                </div>
              )}

              {activeTab === 'shaders' && (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <pre>{`<Scene
  shape="${shape}"
  color="${color}"
  rotationSpeed={${rotationSpeed}}
  distort={${distort}}
  wireframe={${wireframe}}
  particleCount={${particleCount}}
/>`}</pre>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">WebGL Memory Allocated</span>
                    <span className="font-mono text-indigo-400 font-semibold">14.2 MB</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2 rounded-full w-[35%]" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Draw Calls</span>
                    <span className="font-mono text-emerald-400 font-semibold">4 / Frame</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full w-[12%]" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Live WebGL Context Synchronized
              </span>
              <span className="font-mono text-slate-500">React 19 Concurrent Canvas</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Engineered for <span className="text-gradient-primary">High Speed</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Combining the latest React 19 capabilities with custom Three.js shaders for smooth,
            fluid web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "Hardware Accelerated",
              desc: "Direct GPU rendering via WebGL 2.0 with minimal CPU overhead for flawless 60 FPS performance."
            },
            {
              icon: Layers,
              title: "Glassmorphic Layers",
              desc: "Multi-layered depth composition featuring dynamic backdrop blurred panels and reactive cursor glows."
            },
            {
              icon: Zap,
              title: "Instant Hydration",
              desc: "Optimized SSR fallback with dynamic client loading prevents hydration mismatches seamlessly."
            },
            {
              icon: Code2,
              title: "React 19 Ready",
              desc: "Built with standard hooks, strict component purity, and strict state management best practices."
            },
            {
              icon: ShieldCheck,
              title: "Typesafe Design System",
              desc: "Strictly typed props, custom CSS themes, and atomic components for reliable visual consistency."
            },
            {
              icon: Globe,
              title: "Responsive Canvas",
              desc: "Adaptive camera FOV and dynamic particle distribution scales across desktop and mobile screens."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="relative z-10 max-w-7xl mx-auto py-16 px-4">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Target Frame Rate', value: '60 FPS' },
              { label: 'Bundle Footprint', value: '< 120 KB' },
              { label: 'Shader Pass Time', value: '1.2 ms' },
              { label: 'Uptime Reliability', value: '99.9%' },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-5xl font-extrabold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Newsletter Section */}
      <section className="relative z-10 max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="glass-card p-10 md:p-14 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead in WebGL & 3D Web
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get weekly updates on shaders, Three.js techniques, Next.js optimization, and modern UI inspiration.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 font-semibold text-white text-sm transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap"
            >
              {subscribed ? "\u2713 Subscribed" : "Join Studio"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white tracking-wider">AURA 3D</span>
            <span className="text-slate-600">|</span>
            <span>Next-Gen Spatial Frontend</span>
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Components</a>
            <a href="#" className="hover:text-white transition-colors">Shaders</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <p className="text-xs text-slate-600">© 2026 Aura 3D. Crafted for modern web standards.</p>
        </div>
      </footer>
    </main>
  )
}
