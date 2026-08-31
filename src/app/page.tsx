'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#020617] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs tracking-widest uppercase text-indigo-400 font-mono">Initializing WebGL Canvas...</span>
      </div>
    </div>
  )
})

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyber Neon', value: '#ec4899' },
  { name: 'Electric Cyan', value: '#38bdf8' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Solar Flare', value: '#f59e0b' },
  { name: 'Amethyst', value: '#a855f7' },
]

const SHAPES: Array<{ id: SceneConfig['shape']; label: string; polyCount: string }> = [
  { id: 'torus', label: 'Torus Knot', polyCount: '8,192 Polys' },
  { id: 'sphere', label: 'Sphere', polyCount: '4,096 Polys' },
  { id: 'icosahedron', label: 'Icosahedron', polyCount: '1,280 Polys' },
  { id: 'octahedron', label: 'Octahedron', polyCount: '128 Polys' },
]

export default function Home() {
  const [config, setConfig] = useState<SceneConfig>({
    shape: 'torus',
    color: '#6366f1',
    speed: 1,
    wireframe: false,
    scale: 1,
    distort: 0.4,
  })

  const [activeTab, setActiveTab] = useState<'customizer' | 'specs'>('customizer')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [customizerOpen, setCustomizerOpen] = useState(true)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={config} />
      </div>

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8">
        <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 text-base">A3D</span>
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Aura3D
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              WebGL 2.0
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Engine Specs</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('customizer')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-500/20 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Engine
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-indigo-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono tracking-wide text-indigo-300 uppercase">
              Next-Gen Realtime 3D Engine
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08]">
            Immersive <br />
            <span className="text-gradient-primary">3D Digital Realms</span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Craft high-performance, real-time WebGL interactive experiences with Next.js 16, React Three Fiber, and hardware-accelerated shaders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 rounded-2xl font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Launch 3D Studio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-2xl font-semibold text-slate-200 border border-white/10 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              View System Specs
            </a>
          </div>

          {/* Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Target FPS', value: '60 FPS' },
              { label: 'Render Pipeline', value: 'WebGL 2.0' },
              { label: 'Interaction Delay', value: '< 2ms' },
              { label: 'Shader Presets', value: 'Dynamic' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2">Live WebGL Control Center</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Interactive 3D Studio</h2>
          <p className="text-slate-400 max-w-xl mt-3 text-sm sm:text-base">
            Modify shader properties, geometry topology, wireframes, and rendering physics in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Controls Card */}
          <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="font-bold text-lg text-slate-100">Parameters</h3>
              </div>
              <button
                onClick={() => setCustomizerOpen(!customizerOpen)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10"
              >
                {customizerOpen ? 'Minimize' : 'Expand'}
              </button>
            </div>

            <AnimatePresence>
              {customizerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  {/* Shape Selector */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                      Geometry Topology
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SHAPES.map((shape) => (
                        <button
                          key={shape.id}
                          onClick={() => setConfig((prev) => ({ ...prev, shape: shape.id }))}
                          className={`p-3 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer ${
                            config.shape === shape.id
                              ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                              : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                          }`}
                        >
                          <div className="font-bold text-white mb-0.5">{shape.label}</div>
                          <div className="text-[10px] font-mono text-slate-400">{shape.polyCount}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Presets */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                      Material Hue & Color
                    </label>
                    <div className="flex items-center gap-2 mb-3">
                      {COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => setConfig((prev) => ({ ...prev, color: preset.value }))}
                          title={preset.name}
                          className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                            config.color === preset.value ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: preset.value }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900/60 p-2 rounded-xl border border-white/5">
                      <span className="text-xs text-slate-400 font-mono">Custom Picker:</span>
                      <input
                        type="color"
                        value={config.color}
                        onChange={(e) => setConfig((prev) => ({ ...prev, color: e.target.value }))}
                        className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-indigo-300 uppercase">{config.color}</span>
                    </div>
                  </div>

                  {/* Rotation Speed Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <label className="font-semibold text-slate-300 uppercase tracking-wider">Rotation Velocity</label>
                      <span className="font-mono text-indigo-400">{config.speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={config.speed}
                      onChange={(e) => setConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Scale Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <label className="font-semibold text-slate-300 uppercase tracking-wider">Object Scale</label>
                      <span className="font-mono text-indigo-400">{config.scale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.05"
                      value={config.scale}
                      onChange={(e) => setConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Wireframe Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Wireframe Mesh</div>
                      <div className="text-[10px] text-slate-400">Display polygon edge vertices</div>
                    </div>
                    <button
                      onClick={() => setConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                      className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                        config.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          config.wireframe ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Info Canvas Guide Card */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-mono">
                  Active Shader Material
                </span>
                <span className="text-xs text-slate-400 font-mono">MeshPhysicalMaterial</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Direct WebGL Shader Manipulation</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Drag on the canvas to rotate the camera view in 3D space. The particle starfield dynamically reacts to system time, and physical light sources create metallic clearcoat refractions across the surface.
              </p>
            </div>

            {/* Quick Actions & Reset */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setConfig({
                      shape: 'torus',
                      color: '#6366f1',
                      speed: 1,
                      wireframe: false,
                      scale: 1,
                      distort: 0.4,
                    })
                  }
                  className="px-4 py-2 text-xs font-medium glass hover:bg-white/10 rounded-xl text-slate-300 transition-colors border border-white/10 cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={() => {
                    const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)].id
                    const randomColor = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].value
                    setConfig({
                      shape: randomShape,
                      color: randomColor,
                      speed: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
                      wireframe: Math.random() > 0.5,
                      scale: parseFloat((Math.random() * 0.8 + 0.8).toFixed(2)),
                      distort: 0.4,
                    })
                  }}
                  className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Randomize Matrix
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Mode: <span className="text-indigo-400 uppercase font-bold">{config.shape}</span> | Color: <span className="text-pink-400 font-bold">{config.color}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2">Engine Architecture</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Built for Next-Gen Web</h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Seamlessly blending 3D WebGL scenes with reactive DOM UI controls and smooth Framer Motion transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              badge: 'Performance',
              title: 'Hardware Acceleration',
              desc: '60 FPS rendering pipeline using Three.js and custom GLSL vertex materials with instanced particle systems.',
              icon: (
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
            {
              badge: 'Shaders',
              title: 'Physical Materials',
              desc: 'PBR lighting with realistic metallic roughness, clearcoat reflections, and reactive ambient occlusion.',
              icon: (
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
            },
            {
              badge: 'React 19',
              title: 'App Router Optimized',
              desc: 'Dynamic dynamic SSR component loading prevents hydration mismatch while delivering instant page interactivity.',
              icon: (
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              ),
            },
            {
              badge: 'Interactivity',
              title: 'Realtime State Linkage',
              desc: 'Bi-directional state sync between DOM controls and WebGL render loops in zero frame overhead.',
              icon: (
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              ),
            },
            {
              badge: 'Design',
              title: 'Glassmorphism UI',
              desc: 'Frosted backdrop blurs, luminous gradient borders, and custom spring cursor interaction feedback.',
              icon: (
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
            },
            {
              badge: 'Responsive',
              title: 'Cross-Device Adaptability',
              desc: 'Fully fluid layout adapted for touch screens, high DPI mobile displays, and multi-monitor setups.',
              icon: (
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all group hover:-translate-y-1 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engine Specs & Live Telemetry Section */}
      <section id="specs" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2 block">
                System Diagnostics
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold">Realtime Engine Specs</h2>
            </div>

            {/* Tab switch */}
            <div className="flex p-1 bg-slate-900/80 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('customizer')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'customizer' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Render Telemetry
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'specs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Technology Stack
              </button>
            </div>
          </div>

          {activeTab === 'customizer' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'FPS Target', value: '60.0 FPS', status: 'Optimal', detail: 'VSync Synchronized' },
                { title: 'Frame Render Time', value: '16.6 ms', status: 'Realtime', detail: 'Zero GPU bottleneck' },
                { title: 'Starfield Count', value: '1,200 Particles', status: 'Active', detail: 'Dynamic Instancing' },
                { title: 'Active Topology', value: config.shape.toUpperCase(), status: 'Loaded', detail: `${config.wireframe ? 'Wireframe' : 'Solid PBR'}` },
              ].map((metric, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5">
                  <div className="text-xs font-mono text-slate-400 mb-1">{metric.title}</div>
                  <div className="text-2xl font-bold font-mono text-indigo-300 mb-2">{metric.value}</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-medium text-emerald-400">{metric.status}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({metric.detail})</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Next.js 16 (Turbopack)', desc: 'App router architecture with React Server Components & fast refresh.' },
                { name: 'React Three Fiber & Drei', desc: 'Declarative Three.js abstraction with optimized render loop hooks.' },
                { name: 'Tailwind CSS v4 & Framer', desc: 'Inline theme variables with fluid spring physics animations.' },
              ].map((tech, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-white/5">
                  <h4 className="font-bold text-white mb-2">{tech.name}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="glass-card p-8 sm:p-14 rounded-3xl border border-white/10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase mb-2 block">
            Stay Updated
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Join the 3D Web Revolution
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Subscribe to receive updates on high-performance WebGL techniques, shader tutorials, and news.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscribed! Thank you for joining Aura3D.
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-200 text-sm">Aura3D</span>
            <span className="text-slate-600">|</span>
            <span>Next.js 16 WebGL Experience</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-200 transition-colors">Overview</a>
            <a href="#customizer" className="hover:text-slate-200 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#specs" className="hover:text-slate-200 transition-colors">Specs</a>
          </div>

          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} Aura3D. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
