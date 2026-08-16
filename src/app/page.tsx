'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-600 text-sm">Initializing 3D Engine...</div>
})

export default function Home() {
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [distort, setDistort] = useState(0.4)
  const [scale, setScale] = useState(1)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const { scrollY } = useScroll()
  const sceneOpacity = useTransform(scrollY, [0, 800], [0.8, 0.25])
  const sceneScale = useTransform(scrollY, [0, 800], [1, 0.85])

  const colorOptions = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Cyan', value: '#06b6d4' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Emerald', value: '#10b981' }
  ]

  const geometryOptions: { label: string; value: GeometryType }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Octahedron', value: 'octahedron' }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic 3D Scene Background */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="fixed inset-0 z-0 pointer-events-auto"
      >
        <Scene
          geometry={geometry}
          color={color}
          speed={speed}
          distort={distort}
          scale={scale}
        />
      </motion.div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              A
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA 3D
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#configurator" className="hover:text-indigo-400 transition-colors">Configurator</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Metrics</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#configurator"
              className="px-5 py-2 text-xs font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-500/20 active:scale-95"
            >
              Customize 3D
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          WebGL 3D Engine v2.0 Released
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.1]"
        >
          Elevate Your Web With <br />
          <span className="text-gradient-primary">Interactive 3D Visuals</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light"
        >
          Experience real-time WebGL rendering, organic fluid distortions, and responsive motion physics integrated into modern web architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#configurator"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 border border-indigo-400/30"
          >
            Launch Interactive Demo
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-semibold text-slate-200 hover:bg-white/10 transition-all border border-white/10"
          >
            Explore Tech Stack
          </a>
        </motion.div>
      </section>

      {/* Real-time 3D Scene Configurator Toolbar */}
      <section id="configurator" className="relative z-10 max-w-5xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-gradient-secondary">Real-Time 3D Studio Configurator</h2>
              <p className="text-sm text-slate-400">Manipulate the background WebGL shader parameters live</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              60 FPS Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Shape Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Geometry Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {geometryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGeometry(opt.value)}
                    className={`px-3 py-2 text-xs rounded-xl transition-all border ${
                      geometry === opt.value
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Material Tint</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      color === c.value ? 'border-white scale-110 ring-2 ring-indigo-500/50' : 'border-transparent hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="uppercase tracking-wider">Rotation Speed</span>
                <span className="text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Distortion / Mesh Scale */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span className="uppercase tracking-wider">Fluid Distortion</span>
                <span className="text-indigo-400">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <button onClick={() => setScale(scale === 1 ? 1.2 : 1)} className="hover:text-indigo-400 underline">
                  Toggle Size: {scale}x
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-gradient-primary">
            Engineered For Next-Gen Performance
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Combines server-side rendering advantages with hardware-accelerated 3D graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Turbopack & Next 16',
              desc: 'Sub-second module replacement and hyper-optimized server component rendering architecture.'
            },
            {
              icon: '🎨',
              title: 'Shaders & React Three Fiber',
              desc: 'High-performance WebGL graphics pipeline with reactive custom materials and float dynamics.'
            },
            {
              icon: '✨',
              title: 'Framer Motion Physics',
              desc: 'Fluid layout transitions, scroll-driven animations, and responsive spring physics.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
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

      {/* Metrics Section */}
      <section id="metrics" className="relative z-10 max-w-6xl mx-auto py-16 px-4">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Target Frame Rate', value: '60 FPS' },
            { label: 'WebGL Geometry Load', value: '< 20ms' },
            { label: 'Animation Smoothness', value: '100%' },
            { label: 'Lighthouse Score', value: '99+' }
          ].map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-secondary">{metric.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-4 text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready To Transform Your Application?</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
            Join thousands of developers creating immersive 3D web experiences today.
          </p>

          {emailSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-medium text-sm max-w-md mx-auto"
            >
              {"\u2713"} You are subscribed! We will send updates to your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">AURA 3D</span>
            <span>— Next-Gen Interface</span>
          </div>
          <p>© 2026 Modern 3D Web App. Built with Next.js & Three.js.</p>
        </div>
      </footer>
    </main>
  )
}
