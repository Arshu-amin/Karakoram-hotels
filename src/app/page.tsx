'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
})

const COLOR_OPTIONS = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Violet', value: '#8b5cf6' }
]

const SHAPE_OPTIONS: { label: string; value: ShapeType }[] = [
  { label: 'Torus Knot', value: 'torusKnot' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Octahedron', value: 'octahedron' },
  { label: 'Sphere', value: 'sphere' },
  { label: 'Torus', value: 'torus' }
]

export default function Home() {
  // 3D Scene Controls State
  const [color, setColor] = useState('#6366f1')
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [speed, setSpeed] = useState(1)
  const [scale, setScale] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [particleCount, setParticleCount] = useState(150)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          color={color}
          shape={shape}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          particleCount={particleCount}
        />
      </div>

      {/* Glass Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 font-extrabold">3D</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#metrics" className="hover:text-white transition-colors">Performance</a>
            <a href="#subscribe" className="hover:text-white transition-colors">Community</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#studio"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-indigo-500/30 text-indigo-300 text-sm font-medium"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          Next-Generation 3D Web Experience
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
        >
          Design Beyond <br />
          <span className="text-gradient-primary">Flat Surfaces.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          Immerse your users with hardware-accelerated WebGL graphics, real-time physics,
          and dynamic 3D visual customization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Customize 3D Object
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass hover:bg-slate-800/80 rounded-full font-semibold text-slate-300 hover:text-white transition-all transform hover:scale-105 active:scale-95 border border-slate-700/60"
          >
            Explore Capabilities
          </a>
        </motion.div>
      </motion.section>

      {/* 3D Customizer Studio Section */}
      <section id="studio" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Directly manipulate real-time WebGL rendering parameters right from the interface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Controls Panel */}
          <div
            className="lg:col-span-1 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800"
          >
            <h3 className="text-xl font-bold mb-6 text-indigo-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Geometry & Shader
            </h3>

            {/* Shape Selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Select Mesh Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SHAPE_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setShape(item.value)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      shape === item.value
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent Picker */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Accent Material Color
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`w-9 h-9 rounded-full transition-transform ${
                      color === c.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110 opacity-80'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>ROTATION SPEED</span>
                <span className="text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Scale Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>OBJECT SCALE</span>
                <span className="text-indigo-400">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Particles Count */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>PARTICLE DENSITY</span>
                <span className="text-indigo-400">{particleCount}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="20"
                value={particleCount}
                onChange={(e) => setParticleCount(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400">Wireframe Mesh</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Info Cards Side-by-Side */}
          <div
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Shader Engine</span>
              <h3 className="text-2xl font-bold mt-2 mb-4">Physical Material Shading</h3>
              <p className="text-slate-400 leading-relaxed">
                Utilizing high-performance metallic roughness clearcoat physical shaders.
                Lighting reacts dynamically to view positions, emissive glowing properties,
                and hardware frame ticks via React Three Fiber hooks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-3xl border border-slate-800">
                <div className="text-3xl font-extrabold text-indigo-400 mb-1">60+ FPS</div>
                <div className="text-sm font-semibold text-slate-200">Hardware Acceleration</div>
                <p className="text-xs text-slate-400 mt-2">Smooth WebGL canvas rendering tuned for low GPU consumption.</p>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-slate-800">
                <div className="text-3xl font-extrabold text-purple-400 mb-1">&lt; 50kb</div>
                <div className="text-sm font-semibold text-slate-200">Lightweight Overhead</div>
                <p className="text-xs text-slate-400 mt-2">Optimized dynamic imports preventing main thread blocking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Built For <span className="text-gradient-primary">Modern Web Apps</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to craft immersive spatial user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              desc: 'Next.js 16 App Router optimized code splitting ensures instant page renders and smooth 3D scene dynamic hydration.',
            },
            {
              icon: '🎨',
              title: 'Tailwind CSS v4 Design',
              desc: 'Custom glassmorphism utilities, reactive gradient text clippings, and dark neon theme tokens.',
            },
            {
              icon: '✨',
              title: 'Framer Motion Dynamics',
              desc: 'Fluid physics-based entrance transitions, scroll-driven transforms, and interactive hover feedback.',
            },
            {
              icon: '🔮',
              title: 'Three.js & R3F',
              desc: 'Flexible 3D canvas pipeline featuring customized mesh geometry, particle buffers, and physical lighting.',
            },
            {
              icon: '🖱️',
              title: 'Custom Spring Cursor',
              desc: 'Interactive spring follower cursor that reacts with magnetic scaling when lingering over interactive elements.',
            },
            {
              icon: '📱',
              title: 'Fully Responsive',
              desc: 'Seamlessly scales across desktop, tablet, and mobile screens without sacrificing 3D scene performance.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section id="metrics" className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="glass-panel p-10 rounded-3xl border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Render Frame Rate', val: '60 FPS' },
            { label: 'WebGL Particle Cap', val: '10,000+' },
            { label: 'Lighthouse Score', val: '99/100' },
            { label: 'Active Developers', val: '25.4K' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-2">{stat.val}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription / Early Access CTA */}
      <section id="subscribe" className="relative z-10 py-24 px-4 max-w-4xl mx-auto text-center">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            Ready to Build <span className="text-gradient-primary">The Future?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Join thousands of designers and developers building Next-Gen 3D web applications today.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 font-semibold max-w-md mx-auto"
            >
              {"\u2713"} You are on the priority access list!
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95"
              >
                Get Early Access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AURA 3D Web Engine v2.0 • Online</span>
          </div>
          <p>© {new Date().getFullYear()} Aura 3D Inc. Built with Next.js & Three.js.</p>
        </div>
      </footer>
    </main>
  )
}
