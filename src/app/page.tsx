'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="text-indigo-400 font-mono tracking-wider animate-pulse">
        LOADING NEURAL NET...
      </div>
    </div>
  )
})

type ShapeType = 'torusKnot' | 'sphere' | 'box' | 'icosahedron'

export default function Home() {
  // WebGL Interactive state controls
  const [speed, setSpeed] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [color, setColor] = useState<string>('#6366f1')
  const [shape, setShape] = useState<ShapeType>('torusKnot')

  // Newsletter submission feedback
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  // Pre-configured custom presets for 3D state
  const presets = [
    { name: 'Supernova', speed: 2, scale: 1.2, color: '#f43f5e', shape: 'icosahedron' as const },
    { name: 'Nebula', speed: 0.8, scale: 1, color: '#a855f7', shape: 'torusKnot' as const },
    { name: 'Quantum', speed: 1.5, scale: 0.85, color: '#06b6d4', shape: 'sphere' as const },
    { name: 'Monolith', speed: 0.4, scale: 1.1, color: '#10b981', shape: 'box' as const }
  ]

  const applyPreset = (p: typeof presets[0]) => {
    setSpeed(p.speed)
    setScale(p.scale)
    setColor(p.color)
    setShape(p.shape)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-indigo-500/30">

      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0 h-full w-full">
        <Scene speed={speed} scale={scale} color={color} shape={shape} />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-1" />

      {/* Main Content Layout */}
      <div className="relative z-10">

        {/* Floating Navbar */}
        <header className="fixed top-0 inset-x-0 h-20 glass border-b border-white/5 flex items-center justify-between px-6 md:px-12 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/50">
              A
            </div>
            <span className="font-bold tracking-wider text-xl font-mono text-gradient-primary">
              AURA3D
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-300">
            <a href="#playground" className="hover:text-indigo-400 transition-colors">Playground</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#stack" className="hover:text-indigo-400 transition-colors">Stack</a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">Connect</a>
          </nav>
          <a
            href="#playground"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Launch Console
          </a>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              NEXT-GEN 3D IMMERSIVE SUITE
            </div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-none">
              Crafting Digital{' '}
              <span className="text-gradient-primary block md:inline">
                Atmospheres
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Experience responsive, fluid WebGL elements that dance and morph under your complete control. Explore customizable physics, lighting gradients, and sleek glass interfaces.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#playground"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 text-center"
              >
                Control Center
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 text-center"
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </section>

        {/* Interactive Playground Control Console */}
        <section id="playground" className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Visualizer Frame */}
            <div className="lg:col-span-7 h-[450px] md:h-[550px] relative rounded-3xl overflow-hidden glass border border-white/10 flex flex-col justify-end p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Live Viewport</span>
                <h3 className="text-2xl font-bold mt-1 text-white">Active Object Matrix</h3>
                <p className="text-sm text-slate-400 mt-2 max-w-md">
                  Click and drag inside the viewport to rotate the viewport camera. Real-time physical metrics are mapped instantly below.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="px-3 py-1.5 rounded-md bg-slate-900/80 border border-white/5 text-xs font-mono text-slate-300">
                    SPEED: <span className="text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-md bg-slate-900/80 border border-white/5 text-xs font-mono text-slate-300">
                    SCALE: <span className="text-indigo-400 font-bold">{scale.toFixed(2)}x</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-md bg-slate-900/80 border border-white/5 text-xs font-mono text-slate-300">
                    SHAPE: <span className="text-indigo-400 font-bold">{shape.toUpperCase()}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-md bg-slate-900/80 border border-white/5 text-xs font-mono text-slate-300">
                    COLOR: <span className="text-indigo-400 font-bold" style={{ color }}>{color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Control Deck */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Playground Console</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-1">
                  Sculpt Your Scene
                </h2>
                <p className="text-slate-400 mt-3">
                  Tweak parameters, select geometries, and inject unique colors dynamically to see the backdrop adapt in real-time.
                </p>
              </div>

              {/* Preset Selectors */}
              <div className="p-6 rounded-2xl glass-card">
                <h4 className="text-sm font-bold tracking-wider text-slate-300 mb-4 uppercase font-mono">
                  Environment Presets
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => applyPreset(p)}
                      className="px-4 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 border border-white/5 hover:border-indigo-500/50 text-sm font-medium transition-all text-left flex flex-col justify-between"
                    >
                      <span className="font-bold text-slate-200">{p.name}</span>
                      <span className="text-xs text-slate-500 font-mono mt-1">{p.shape}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Controls */}
              <div className="p-6 rounded-2xl glass-card space-y-6">

                {/* Shape Selector */}
                <div>
                  <label className="text-xs font-mono text-slate-400 tracking-wider uppercase block mb-3">
                    Geometry Configuration
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['torusKnot', 'sphere', 'box', 'icosahedron'] as ShapeType[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold font-mono transition-all border ${
                          shape === s
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-900/60 border-white/5 hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {s === 'torusKnot' ? 'Torus' : s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-300">Warp Speed</span>
                      <span className="font-mono text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-300">Target Scale</span>
                      <span className="font-mono text-indigo-400 font-bold">{scale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.8"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>

                {/* Material Color Palette */}
                <div>
                  <label className="text-xs font-mono text-slate-400 tracking-wider uppercase block mb-3">
                    Material Pigmentation
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={color.toUpperCase()}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full bg-slate-900/60 border border-white/5 rounded-lg px-3 py-2 text-sm font-mono text-slate-300 uppercase focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Features Showcase Grid */}
        <section id="features" className="py-24 px-4 bg-slate-950/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Performance Architecture</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
                Cutting-Edge Features
              </h2>
              <p className="text-slate-400 mt-4 font-light">
                Leveraging the combined powers of React 19, Next.js 16, and WebGL to construct high-fidelity spatial visual systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Responsive WebGL',
                  desc: 'Utilizes high-performance physical shader materials dynamically updating in real-time, built directly for headless/software environments.',
                  icon: '⚡'
                },
                {
                  title: 'Glassmorphism Design',
                  desc: 'Features luxurious frosted background blurs, subtle glowing shadows, and micro-border aesthetics matching modern UI expectations.',
                  icon: '✨'
                },
                {
                  title: 'Framer Motion Spring',
                  desc: 'Interactive smooth animations and Spring-governed custom cursor paths that tracking with low-latency responsiveness.',
                  icon: '💫'
                }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="p-8 rounded-3xl glass-card hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-6">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed text-sm">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Component */}
        <section id="stack" className="py-24 px-4 max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">The Engine</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Powering the Interface
            </h2>
            <p className="text-slate-400 mt-4 font-light">
              Built on a foundation of the best modern frameworks, optimized to achieve blazing-fast frame rates and exceptional usability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 16', role: 'Server / Routing', desc: 'App Router & Async Param processing' },
              { name: 'Three.js / Fiber', role: '3D Graphics Engine', desc: 'Advanced WebGL rendering matrix' },
              { name: 'Tailwind CSS v4', role: 'Modern Layouts', desc: 'Utility classes & custom CSS variables' },
              { name: 'Framer Motion', role: 'Fluid Layout Physics', desc: 'Cursor physics & scroll animations' }
            ].map((tech, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card text-left flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-lg text-white">{tech.name}</h4>
                  <span className="text-xs text-indigo-400 font-mono mt-1 block">{tech.role}</span>
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed font-light">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Newsletter Form */}
        <section id="newsletter" className="py-24 px-4 bg-slate-950/40 border-t border-white/5">
          <div className="max-w-3xl mx-auto glass-card p-8 md:p-16 rounded-3xl text-center relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">
              Join the Space Matrix
            </h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm font-light leading-relaxed">
              Receive advanced tech writeups, premium shaders, and beautiful design patterns delivered directly to your node.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-sm max-w-md mx-auto"
              >
                ✓ Subscription initialized. Welcome to Aura3D!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your system email..."
                  className="flex-1 bg-slate-900/80 border border-white/10 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-indigo-500 text-white placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer Area */}
        <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm font-mono tracking-wide">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 AURA3D EXPERIENCE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#playground" className="hover:text-indigo-400 transition-colors">Playground</a>
              <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
              <a href="#stack" className="hover:text-indigo-400 transition-colors">Stack</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}
