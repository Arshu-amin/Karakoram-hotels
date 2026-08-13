'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

// Dynamically import the 3D scene to prevent hydration/SSR mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#020617] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  // Use scroll for entrance/parallax animations
  const { scrollY } = useScroll()
  const opacityScene = useTransform(scrollY, [0, 800], [0.8, 0.2])
  const scaleScene = useTransform(scrollY, [0, 800], [1, 0.85])

  // Customizer state controls
  const [shape, setShape] = useState('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.2)
  const [scale, setScale] = useState(1.0)
  const [roughness, setRoughness] = useState(0.15)
  const [metalness, setMetalness] = useState(0.85)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-[#f8fafc] overflow-x-hidden">
      {/* Fixed Background 3D Canvas with Scroll-based scale & opacity modulation */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: opacityScene, scale: scaleScene }}
      >
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          roughness={roughness}
          metalness={metalness}
          wireframe={wireframe}
        />
      </motion.div>

      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Aura3D
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#customizer" className="hover:text-white transition-colors">Customizer</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all"
          >
            Launch Builder
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-6"
          >
            <span>✨ Introducing the Next-Gen 3D Render Engine</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6"
          >
            Create Infinite <br />
            <span className="text-gradient-primary">Dimensional Aura</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            An interactive, high-fidelity experience utilizing hardware-accelerated WebGL materials, smooth custom physics, and modern glassmorphism.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full font-semibold transition-all transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-indigo-500/25 text-center"
            >
              Explore Sandbox
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-white/5 rounded-full font-semibold transition-all transform hover:scale-[1.03] active:scale-[0.98] text-center"
            >
              Discover Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Customizer Section */}
      <section id="customizer" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Sandbox <span className="text-gradient-secondary">Customizer</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Interact with the WebGL canvas in real-time. Adjust geometry structure, reflective surfaces, and physics properties instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Virtual Canvas Box (visual feedback helper) */}
          <div className="lg:col-span-7 aspect-[4/3] glass rounded-3xl overflow-hidden relative border border-white/10 flex items-center justify-center p-6 shadow-2xl">
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-xs text-indigo-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              WebGL Active: {shape.toUpperCase()}
            </div>
            <div className="text-center max-w-md pointer-events-none z-10">
              <p className="text-sm font-semibold text-slate-300 mb-2">3D Component Rendered in Background</p>
              <p className="text-xs text-slate-500">
                Rotate, pan, and interact directly with the main screen backdrop. Toggle controls on the panel to witness structural changes instantly.
              </p>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 glass rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-indigo-300 flex items-center gap-2">
              <span>🎛️</span> Engine Control Unit
            </h3>

            {/* Shape Select */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Geometry Base</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'box', label: 'Cube' },
                  { id: 'octahedron', label: 'Octahedron' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold border transition-all ${
                      shape === item.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/25'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customizer Color Picker */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Chroma Material Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-14 h-14 rounded-xl border border-white/10 bg-transparent cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={color.toUpperCase()}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/40 border border-white/5 text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Parameter Sliders */}
            <div className="space-y-5 mb-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Scale Factor</span>
                  <span className="text-indigo-400 font-mono">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <span>Roughness</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <span>Metalness</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-white/5 rounded-xl">
              <div>
                <h4 className="text-sm font-bold">Wireframe Mode</h4>
                <p className="text-xs text-slate-500">Render structural vertices & polygon vectors</p>
              </div>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                    wireframe ? 'left-6.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-32 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              Advanced <span className="text-gradient-primary">3D Architecture</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Engineered with physical materials that react beautifully in high-definition viewport environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'High Frame Rates',
                desc: 'Completely hardware-accelerated rendering utilizing WebGL shaders for buttery smooth 60fps interaction.',
              },
              {
                icon: '🎨',
                title: 'Micro-Interactions',
                desc: 'Every element reacts organically. Drag, scroll, and watch physics update materials in real-time.',
              },
              {
                icon: '🔒',
                title: 'Clean Architecture',
                desc: 'Satisfies standard Next.js constraints and React hooks rules. Zero-hydration mismatch or frame drops.',
              },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl glass glass-card-hover border border-white/5 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl mb-6 border border-indigo-500/20">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-indigo-300">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tier Matrix */}
      <section id="pricing" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Simple, Transparent <span className="text-gradient-secondary">Plans</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Elevate your rendering game with advanced professional controls, hosting options, and customized workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              title: 'Starter',
              price: '0',
              desc: 'For hobbyists exploring interactive 3D components on modern frameworks.',
              features: ['Standard geometries', 'Local canvas configurations', 'Basic preset themes', 'Community assistance'],
              buttonText: 'Get Started Free',
              highlight: false,
            },
            {
              title: 'Professional',
              price: '29',
              desc: 'For studios and freelance developers building state-of-the-art visual apps.',
              features: ['All customized shapes', 'Custom shader imports', 'Advanced physics parameters', 'Priority email support', 'React 19 build templates'],
              buttonText: 'Upgrade to Pro',
              highlight: true,
            },
            {
              title: 'Enterprise',
              price: '99',
              desc: 'Scale infinite rendering instances across globally-distributed web portals.',
              features: ['Infinite configurations', 'Dedicated GPU rendering instances', 'Custom branding customization', 'Dedicated 24/7 Slack assistance', 'SLA guaranteed uptime'],
              buttonText: 'Contact Enterprise',
              highlight: false,
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl glass border transition-all flex flex-col justify-between ${
                tier.highlight
                  ? 'border-indigo-500/50 bg-indigo-950/20 shadow-xl shadow-indigo-500/10 relative overflow-hidden'
                  : 'border-white/5 bg-slate-900/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">{tier.title}</h3>
                <p className="text-xs text-slate-500 mb-6">{tier.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl md:text-5xl font-black">${tier.price}</span>
                  <span className="text-xs text-slate-400">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-indigo-400">\u2713</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  tier.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-32 px-4 max-w-5xl mx-auto text-center">
        <div className="glass rounded-3xl p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-pink-500/10 opacity-30 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black mb-4">Stay Synchronized</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Get early access to weekly interactive shaders, modern R3F components, and cutting-edge frontend tutorials.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl max-w-md mx-auto"
            >
              <h4 className="font-bold text-indigo-300 mb-1">🎉 You are subscribed!</h4>
              <p className="text-xs text-slate-400">Welcome to the Aura3D private development group.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-slate-200 active:scale-[0.98] transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-slate-950/60 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© 2026 Aura3D WebGL Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
