'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

type ShapeType = 'torus' | 'sphere' | 'box' | 'icosahedron'

export default function Home() {
  // 3D Scene Interactive Parameters state
  const [shape, setShape] = useState<ShapeType>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.2)
  const [scale, setScale] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [roughness, setRoughness] = useState(0.1)

  // Newsletter subscription mock state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Framer Motion scroll hooks monitoring global window scroll (safely without target ref to avoid hydration errors)
  const { scrollY } = useScroll()
  const opacityScene = useTransform(scrollY, [0, 400], [0.85, 0.3])
  const scaleScene = useTransform(scrollY, [0, 600], [1, 0.85])
  const yScene = useTransform(scrollY, [0, 800], [0, 100])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-[#f8fafc] overflow-hidden font-sans select-none">
      {/* Absolute fixed Background 3D Scene */}
      <motion.div
        style={{ opacity: opacityScene, scale: scaleScene, y: yScene }}
        className="fixed inset-0 z-0 w-full h-full pointer-events-auto"
      >
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
          roughness={roughness}
        />
      </motion.div>

      {/* Decorative Gradient Overlays */}
      <div className="fixed inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950/10 to-[#020617]/50" />

      {/* Header / Navbar */}
      <header className="relative z-20 w-full px-6 py-5 flex items-center justify-between border-b border-slate-900/60 backdrop-blur-md bg-slate-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="font-extrabold text-xl text-white">A</span>
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Aura3D
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#playground" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Playground
          </a>
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Analytics
          </a>
          <a href="#subscribe" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Newsletter
          </a>
        </nav>
        <a
          href="#playground"
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[#020617] hover:bg-slate-100 transition-all shadow-md shadow-white/10 hover:shadow-white/20 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Launch Studio
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] px-4 text-center max-w-5xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' as const }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-300 tracking-wider uppercase">
              Introducing Version 2.0
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight">
            Design Beyond
            <br />
            <span className="text-gradient-primary">Dimensions</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unleash the power of real-time GPU-accelerated interactive 3D WebGL on the modern web. Customizable, ultra-smooth, and built for next-generation platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-wrap gap-4 justify-center mt-12 pointer-events-auto"
        >
          <a
            href="#playground"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/35"
          >
            Customize 3D Object
          </a>
          <a
            href="#features"
            className="px-8 py-4 bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Floating Mouse indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex justify-center p-1">
            <div className="w-1.5 h-3 bg-indigo-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Section: Customizer Playground */}
      <section id="playground" className="relative z-10 max-w-6xl mx-auto py-24 px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Interactive <span className="text-gradient-secondary">Design Lab</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Interact with the 3D element in real time. Use the parameters control panel below to alter geometry, color, roughness, and velocity instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Active Parameters</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The visual updates are rendered using physical shaders that respond instantly to changes in coordinates, lighting settings, and material properties.
              </p>
              <div className="divide-y divide-slate-800/80">
                <div className="py-3 flex justify-between text-sm">
                  <span className="text-slate-400">Current Geometry:</span>
                  <span className="font-semibold text-pink-400 capitalize">{shape}</span>
                </div>
                <div className="py-3 flex justify-between text-sm">
                  <span className="text-slate-400">Rotation Speed:</span>
                  <span className="font-semibold text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <div className="py-3 flex justify-between text-sm">
                  <span className="text-slate-400">Color Hex:</span>
                  <span className="font-semibold text-emerald-400 uppercase">{color}</span>
                </div>
                <div className="py-3 flex justify-between text-sm">
                  <span className="text-slate-400">Material Style:</span>
                  <span className="font-semibold text-amber-400">
                    {wireframe ? 'Wireframe Grid' : 'Glossy Solid'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Controls Column (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-premium p-8 sm:p-10 rounded-3xl space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-300">Choose Shape</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['torus', 'sphere', 'box', 'icosahedron'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        shape === s
                          ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 text-white border-transparent shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-300">Select Tint Color</label>
                <div className="flex flex-wrap gap-4 items-center">
                  {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center shadow-md"
                      style={{
                        backgroundColor: c,
                        borderColor: color === c ? '#ffffff' : 'transparent',
                      }}
                    >
                      {color === c && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-300">Simulation Velocity</span>
                    <span className="text-xs text-indigo-400 font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-300">Volume Scale</span>
                    <span className="text-xs text-pink-400 font-bold">{scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-pink-500 bg-slate-900 h-2 rounded-lg appearance-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-slate-300">Surface Roughness</span>
                    <span className="text-xs text-emerald-400 font-bold">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg appearance-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="block text-sm font-semibold text-slate-200">Wireframe Mesh</span>
                    <span className="block text-xs text-slate-500">View skeletal geometry</span>
                  </div>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                      wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                        wireframe ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Engineered For the <span className="text-gradient-primary">Next Generation</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Experience ultra-smooth framerates, robust developer API tooling, and lightweight responsive architectures out of the box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Sub-millisecond Performance',
              desc: 'Leverage native hardware acceleration utilizing React Three Fiber and custom-compiled physical vertex fragment shaders.',
              icon: '⚡',
              gradient: 'from-blue-500 to-indigo-500',
            },
            {
              title: 'Fully Parameterized Visuals',
              desc: 'Tweak physical attributes, coordinate configurations, metalness reflections, and shapes instantly on-the-fly.',
              icon: '🎨',
              gradient: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Clean Modern Ecosystem',
              desc: 'Engineered safely using Next.js, Framer Motion, and Tailwind CSS. Built to enforce type-safety and best design patterns.',
              icon: '💎',
              gradient: 'from-emerald-500 to-cyan-500',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5"
            >
              {/* Feature Accent Glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-3xl mb-6 border border-slate-800">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Statistics Section */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto py-20 px-4">
        <div className="glass-premium p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '60fps', desc: 'Constant Frame Rate' },
              { val: '14kb', desc: 'Gzipped Shaders Size' },
              { val: '2.5x', desc: 'Faster Render Time' },
              { val: '100%', desc: 'Typescript Support' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-gradient-primary tracking-tight">
                  {stat.val}
                </div>
                <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section id="subscribe" className="relative z-10 max-w-4xl mx-auto py-24 px-4">
        <div className="glass p-10 sm:p-14 rounded-3xl text-center space-y-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Stay in the <span className="text-gradient-secondary">Aura Loop</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join our weekly digital newsletter for early updates, custom interactive Three.js templates, and modern performance optimizations.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-5 py-4 rounded-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-full font-bold text-sm tracking-wide transition-all transform active:scale-95 shadow-md shadow-indigo-500/20"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 font-semibold text-sm"
            >
              Subscription complete! Welcome to the modern dimension.
            </motion.p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 bg-slate-950/40 backdrop-blur-md text-center text-slate-500 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center">
            <span className="font-extrabold text-sm text-white">A</span>
          </div>
          <span className="font-bold text-lg text-slate-200">Aura3D Studio</span>
        </div>
        <p className="text-sm">© 2026 Aura3D Technologies Inc. All rights reserved.</p>
        <p className="text-xs text-slate-600">Built with Next.js, Framer Motion, and React-Three-Fiber.</p>
      </footer>
    </main>
  )
}
