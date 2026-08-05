'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

type ShapeType = 'torusKnot' | 'sphere' | 'box' | 'octahedron'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  // 3D Scene Interactive Parameters
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.0)
  const [distort, setDistort] = useState(0.4)
  const [scale, setScale] = useState(1.1)

  // Newsletter & Form state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', message: '' })
  const [submittedContact, setSubmittedContact] = useState(false)

  // Scroll Animations using Framer Motion
  const { scrollY } = useScroll()
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0])
  const yHero = useTransform(scrollY, [0, 400], [0, -50])
  const bgOpacity = useTransform(scrollY, [0, 300], [0.45, 0.85])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contactForm.name && contactForm.message) {
      setSubmittedContact(true)
      setContactForm({ name: '', message: '' })
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene - Fixed and synced with controls */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <Scene shape={shape} color={color} speed={speed} distort={distort} scale={scale} />
      </div>

      {/* Floating Header */}
      <motion.header
        style={{ backgroundColor: `rgba(15, 23, 42, ${bgOpacity.get()})` }}
        className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              A
            </span>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AURA3D
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#metrics" className="hover:text-white transition-colors">Analytics</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div>
            <a
              href="#playground"
              className="px-5 py-2.5 rounded-full text-sm font-semibold glass glass-hover border border-indigo-500/30 text-indigo-300 hover:text-white transition-all shadow-md"
            >
              Try Playground
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <motion.div
          style={{ opacity: opacityHero, y: yHero }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-indigo-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Empowering Modern Interfaces
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-gradient-primary"
          >
            The Next Dimension of E-Commerce & Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Experience a breathtaking, fluid interface powered by immersive 3D graphics, dynamic lighting, and modern interactive elements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <a
              href="#playground"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 text-center"
            >
              Explore Playground
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 glass glass-hover text-slate-200 hover:text-white rounded-full font-semibold transition-all border border-white/10 text-center"
            >
              Discover Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Dynamic 3D Controls Playground Section */}
      <section id="playground" className="relative z-10 py-28 px-6 bg-slate-950/40 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-primary mb-4">
              Interactive 3D Playground
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Tailor the background 3D canvas in real time. Manipulate geometries, shaders, speeds, and dimensions below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Control Panel */}
            <div className="lg:col-span-5 glass p-8 rounded-3xl flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />

              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Visual Configurator
                </h3>

                {/* Shape Selector */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Shape Geometry</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['torusKnot', 'sphere', 'box', 'octahedron'] as ShapeType[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl capitalize transition-all border ${
                          shape === s
                            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/25'
                            : 'glass border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                        }`}
                      >
                        {s.replace('Knot', ' Knot')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Material Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 bg-transparent border-0 rounded-xl cursor-pointer"
                    />
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      {['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#2dd4bf'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-full h-8 rounded-lg transition-all ${
                            color === c ? 'scale-110 ring-2 ring-white/50' : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Speed Slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Rotation Speed</label>
                    <span className="text-xs font-mono text-indigo-300">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Distort Slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Deform & Distort</label>
                    <span className="text-xs font-mono text-indigo-300">{(distort * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.1"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Scale Slider */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Render Scale</label>
                    <span className="text-xs font-mono text-indigo-300">{scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8 text-xs text-slate-500">
                Adjust sliders to dynamically command WebGL MeshPhysicalMaterial shaders, lighting variables, and physics.
              </div>
            </div>

            {/* Sandbox Visual Showcase */}
            <div className="lg:col-span-7 glass p-8 rounded-3xl flex flex-col justify-between border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />

              <div>
                <span className="px-3 py-1 rounded-full glass border border-white/5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                  Live Preview Details
                </span>
                <h3 className="text-3xl font-black text-white mt-4 mb-3">Interactive Engine</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Experience instantaneous parameters updates. Our framework integrates seamless React state bindings that manipulate the GPU and Three.js canvas buffer arrays without performance degradation or main thread blocking.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {[
                    { label: 'Active Geometry', val: shape },
                    { label: 'Hex Code', val: color },
                    { label: 'Speed Index', val: `${speed}x` },
                    { label: 'Elastic Scale', val: `${scale}x` },
                  ].map((stat, i) => (
                    <div key={i} className="glass p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-sm font-semibold text-white capitalize">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xs text-slate-400">Rendering Status: <span className="text-emerald-400 font-bold">Active (60FPS)</span></span>
                <span className="text-xs text-slate-500">WebGL 2.0 Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="relative z-10 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-primary mb-4">
              Pioneering Web Technologies
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Engineered with modern practices to ensure hyper-efficient visual components alongside premium, search-engine-friendly performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Fidelity 3D Visuals',
                desc: 'Breathtaking 3D components rendered natively on the GPU via React Three Fiber & WebGL, using high-performance physical materials with zero lag.',
                icon: '📐',
                tag: 'WebGL'
              },
              {
                title: 'Fluid Spring Animations',
                desc: 'Advanced UI transition orchestrations powered by Framer Motion. Fully continuous, interruption-safe springs and scroll-driven kinematics.',
                icon: '✨',
                tag: 'Framer Motion'
              },
              {
                title: 'Optimized Architecture',
                desc: 'Rendered in React 19 and Next.js 16 with fully static page optimizations and dynamic lazy loading. Experience instant, seamless transitions.',
                icon: '⚡',
                tag: 'Next.js 16'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-3xl glass glass-hover border border-white/5 flex flex-col justify-between h-full transition-all group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                  <span className="font-semibold text-indigo-400">{feature.tag}</span>
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Learn More &rarr;</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics / Stats Section */}
      <section id="metrics" className="relative z-10 py-24 px-6 bg-slate-950/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Uptime SLA' },
              { number: '120+', label: 'Countries Supported' },
              { number: '60 FPS', label: 'Continuous Rendering' },
              { number: '0.1s', label: 'Average Interaction Lag' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl glass border border-white/5 text-center"
              >
                <h3 className="text-4xl md:text-5xl font-black text-gradient-secondary mb-2">{stat.number}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Subscriptions Section */}
      <section id="pricing" className="relative z-10 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gradient-primary mb-4">
              Flexible Plan Tiers
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Start configuring your experiences today. Scale seamlessly with full visual flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Standard Tier */}
            <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between h-full relative overflow-hidden">
              <div>
                <h4 className="text-lg font-bold text-slate-400 mb-2">Standard</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Excellent entry-level option for creating single 3D configurations and testing standard parameters.
                </p>
                <ul className="space-y-3.5 text-sm text-slate-400 mb-8 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Single Active 3D Geometry
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Basic Slider Controls
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Community Forum Access
                  </li>
                </ul>
              </div>
              <button className="w-full py-3.5 px-4 glass glass-hover text-white rounded-xl text-sm font-semibold transition-all border border-white/10">
                Choose Standard
              </button>
            </div>

            {/* Premium Tier - Featured */}
            <div className="p-8 rounded-3xl glass border-2 border-indigo-500 flex flex-col justify-between h-full relative overflow-hidden shadow-2xl shadow-indigo-500/10">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] uppercase tracking-widest font-black py-1 px-4 rounded-bl-xl">
                Best Value
              </div>
              <div>
                <h4 className="text-lg font-bold text-indigo-300 mb-2">Premium</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">$79</span>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Best configuration tailored for professional developers seeking fully dynamic shaders and multi-shape controllers.
                </p>
                <ul className="space-y-3.5 text-sm text-slate-400 mb-8 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2.5">
                    <span className="text-indigo-400">&bull;</span> Multiple Active 3D Geometries
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-indigo-400">&bull;</span> Custom Material Inputs
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-indigo-400">&bull;</span> Real-time Custom Color Pickers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-indigo-400">&bull;</span> Priority E-Mail Support (24h)
                  </li>
                </ul>
              </div>
              <button className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25">
                Choose Premium
              </button>
            </div>

            {/* Custom / Enterprise Tier */}
            <div className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between h-full relative overflow-hidden">
              <div>
                <h4 className="text-lg font-bold text-slate-400 mb-2">Enterprise</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">$199</span>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Ultimate package for enterprise clients. Fully customizable shaders, custom 3D model loaders, and dedicated nodes.
                </p>
                <ul className="space-y-3.5 text-sm text-slate-400 mb-8 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Infinite Active Geometries
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Dedicated WebGL Shaders
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Custom 3D Object Loader (.gltf)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-emerald-400">&bull;</span> Dedicated Account Executive
                  </li>
                </ul>
              </div>
              <button className="w-full py-3.5 px-4 glass glass-hover text-white rounded-xl text-sm font-semibold transition-all border border-white/10">
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form Newsletter Section */}
      <section className="relative z-10 py-20 px-6 bg-slate-950/40 backdrop-blur-md border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Stay Synchronized</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Keep up with our latest performance optimizations, 3D templates, custom material shaders, and React tutorials.
          </p>
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl max-w-md mx-auto"
            >
              <p className="text-sm font-bold text-indigo-300">✓ Subscription Successful!</p>
              <p className="text-xs text-slate-400 mt-1">Thank you for subscribing to Aura3D newsletter.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full text-sm font-medium glass-input text-white border border-white/10 bg-slate-900/40 backdrop-blur-md"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Dynamic Interaction Details & Contact Form */}
      <section id="contact" className="relative z-10 py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Have Questions? Get in Touch</h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base mb-8">
              Want to see if we can support your specific 3D custom model types, or need help implementing continuous framer animations? Let us know.
            </p>

            {submittedContact ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-center"
              >
                <p className="text-base font-bold text-purple-300">&check; Message Transmitted Successfully!</p>
                <p className="text-xs text-slate-400 mt-1">We will review your submission and respond within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name..."
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium glass-input text-white border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Your email..."
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium glass-input text-white border border-white/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium glass-input text-white border border-white/10 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-slate-950/60 backdrop-blur-md text-slate-500 text-center text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-sm">
              A
            </span>
            <span className="font-bold text-slate-400">AURA3D</span>
          </div>
          <p>&copy; 2026 Aura3D Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
