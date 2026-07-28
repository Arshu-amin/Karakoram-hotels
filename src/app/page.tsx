'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3 font-mono">
      <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <span className="text-sm tracking-wider uppercase animate-pulse">Initializing 3D Engine...</span>
    </div>
  ),
})

export default function Home() {
  // Framer Motion Scroll Animations - declared right at the top, before any return
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40])

  const navbarBg = useTransform(scrollYProgress, [0, 0.1], ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.75)'])

  // 3D Customizer states
  const [shape, setShape] = useState<'torusKnot' | 'torus' | 'sphere' | 'octahedron'>('torusKnot')
  const [color, setColor] = useState('#818cf8')
  const [roughness, setRoughness] = useState(0.1)
  const [metalness, setMetalness] = useState(0.85)
  const [clearcoat, setClearcoat] = useState(1.0)
  const [speed, setSpeed] = useState(1.2)
  const [wireframe, setWireframe] = useState(false)

  // Subscription states
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail('')
      }, 3000)
    }
  }

  const shapesList = [
    { id: 'torusKnot', name: 'Torus Knot' },
    { id: 'torus', name: 'Torus' },
    { id: 'sphere', name: 'Sphere' },
    { id: 'octahedron', name: 'Octahedron' },
  ] as const

  const colorsList = [
    { hex: '#818cf8', name: 'Indigo' },
    { hex: '#c084fc', name: 'Purple' },
    { hex: '#f472b6', name: 'Rose' },
    { hex: '#38bdf8', name: 'Sky' },
    { hex: '#34d399', name: 'Emerald' },
    { hex: '#fbbf24', name: 'Amber' },
  ]

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 glow-grid overflow-hidden">

      {/* Immersive Full-Screen 3D Hero Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none h-[110vh]">
        <div className="sticky top-0 h-screen w-full opacity-40 md:opacity-50">
          <Scene
            shape={shape}
            color={color}
            roughness={roughness}
            metalness={metalness}
            clearcoat={clearcoat}
            speed={speed}
            wireframe={wireframe}
          />
        </div>
      </div>

      {/* Floating Header/Navbar */}
      <motion.header
        style={{ backgroundColor: navbarBg }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              A
            </div>
            <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#customizer" className="hover:text-white transition-colors">Customizer</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#newsletter" className="hover:text-white transition-colors">Updates</a>
          </nav>

          <button className="px-5 py-2.5 bg-white text-slate-950 font-semibold rounded-full text-sm hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-md">
            Launch Engine
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-36 min-h-screen flex flex-col justify-between">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-3xl text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            Next-Generation Web3D Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6"
          >
            Immersive <span className="text-gradient-primary">Digital</span> Artistry
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10"
          >
            Experience a reactive, high-performance physical 3D environment crafted with Next.js, React Three Fiber, and physical shader mechanics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
            >
              Interactive Customizer
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-slate-800 bg-slate-950/40 backdrop-blur-sm hover:bg-slate-900 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 hover:border-slate-700"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-2 self-center mt-12 cursor-pointer"
          onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Scroll to Interact</span>
          <div className="w-6 h-10 rounded-full border border-slate-700 p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Customizer Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">Live Customization</div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Design Your Space</h2>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Tweak parameters in real-time to control the physical attributes, colors, geometries, and momentum of the 3D canvas element.
              </p>
            </div>

            <div className="glass-premium p-6 md:p-8 rounded-3xl flex flex-col gap-6">

              {/* Shape Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  Geometry Structure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapesList.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setShape(s.id)}
                      className={`py-3 px-4 rounded-xl font-medium text-sm border transition-all ${
                        shape === s.id
                          ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-lg shadow-indigo-500/10'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  Physical Color Accent
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorsList.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`w-10 h-10 rounded-full transition-all flex items-center justify-center border-2 ${
                        color === c.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/5 my-2" />

              {/* Material Sliders */}
              <div className="flex flex-col gap-5">

                {/* Roughness */}
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">
                    <span>Roughness (Matte vs Shiny)</span>
                    <span className="font-mono text-indigo-400">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Metalness */}
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">
                    <span>Metalness (Dielectric vs Chrome)</span>
                    <span className="font-mono text-indigo-400">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Clearcoat */}
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">
                    <span>Clearcoat Layer</span>
                    <span className="font-mono text-indigo-400">{clearcoat.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={clearcoat}
                    onChange={(e) => setClearcoat(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Speed */}
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400 mb-2 uppercase">
                    <span>Momentum Speed</span>
                    <span className="font-mono text-indigo-400">{speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Wireframe Skeleton</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    wireframe ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <motion.div
                    animate={{ x: wireframe ? 24 : 4 }}
                    className="w-4 h-4 rounded-full bg-white absolute top-1 left-0"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* 3D Preview Frame */}
          <div className="lg:col-span-7 h-[400px] md:h-[600px] w-full relative">
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-sm">
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full backdrop-blur">
                  WebGL Interactive Active
                </span>
              </div>
              <Scene
                shape={shape}
                color={color}
                roughness={roughness}
                metalness={metalness}
                clearcoat={clearcoat}
                speed={speed}
                wireframe={wireframe}
              />
            </div>
            {/* Ambient decorative glowing balls */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">Technical Capabilities</div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Built on Advanced Web Tech</h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Unleashing the limits of modern web development using high-fidelity rendering Pipelines, CSS custom layouts, and highly optimized modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Next.js & Turbopack Core",
              desc: "Engineered on modern Next.js server optimization, yielding extreme rendering velocity, flawless initial delivery, and near-zero compilation latencies.",
              tag: "Turbopack Ready"
            },
            {
              title: "MeshPhysical Shader",
              desc: "Crafted on high-performance glossy physics materials. Leverages physical parameters such as metalness, specular layers, and clearcoats, with complete software safe fallbacks.",
              tag: "WebGL Engine"
            },
            {
              title: "Reactive Interactivity",
              desc: "Features real-time bi-directional binding between standard React declarative states and canvas render cycles, granting immediate controls over complex meshes.",
              tag: "React 19 & Three"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-4 block">
                  {feature.tag}
                </span>
                <h3 className="text-xl font-extrabold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200 cursor-pointer">
                Learn more and explore doc &rarr;
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-36">
        <div className="glass-premium p-8 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-3 block">
              Keep in touch
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Stay Synchronized</h2>
            <p className="text-slate-300 text-sm md:text-base mb-8">
              Subscribe to receive updates on future shader features, advanced interactive customization systems, and creative design tools.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                disabled={subscribed}
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 transition-all font-semibold rounded-full text-sm hover:scale-105 active:scale-95 disabled:bg-slate-700 disabled:text-slate-400 disabled:scale-100"
              >
                {subscribed ? 'Subscribed ✅' : 'Subscribe'}
              </button>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-indigo-400 text-xs font-mono mt-4"
              >
                Thank you! We&apos;ve added you to our mailing list.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow">
              A
            </div>
            <span className="font-bold tracking-tight text-lg text-white">
              AURA 3D
            </span>
          </div>

          <p className="text-slate-500 text-sm">
            &copy; 2026 AURA 3D Experience Platform. All rights reserved. Built with passion and physics.
          </p>

          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">License</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
