'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#020617]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  ),
})

type ShapeType = 'torusKnot' | 'sphere' | 'box' | 'icosahedron'

export default function Home() {
  // Scene Customizer States
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [scale, setScale] = useState(1.0)
  const [shape, setShape] = useState<ShapeType>('torusKnot')

  // Newsletter Form State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animations via Framer Motion
  // Using global window-level scroll monitoring to avoid passing unstable ref objects to useScroll
  const { scrollYProgress } = useScroll()

  // Transforms for parallax/scroll fading
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const customizerY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  // Animation constants with 'as const' to satisfy TypeScript rules
  const springTransition = { type: 'spring' as const, stiffness: 100, damping: 15 }
  const easeOutTransition = { duration: 0.8, ease: 'easeOut' as const }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background 3D Canvas container */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <Scene color={color} speed={speed} scale={scale} shape={shape} />
      </div>

      {/* Decorative ambient gradient glow */}
      <div className="fixed top-[-10%] left-[-10%] z-0 h-[50%] w-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] z-0 h-[50%] w-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* Modern Top Header / Navigation */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={easeOutTransition}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
            <div className="h-full w-full rounded-[6px] bg-[#020617] flex items-center justify-center">
              <span className="text-sm font-black text-indigo-400">A</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Aura<span className="text-indigo-400">3D</span>
          </span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...easeOutTransition, delay: 0.1 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
        >
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#customizer" className="hover:text-white transition-colors">Workspace</a>
          <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...easeOutTransition, delay: 0.2 }}
        >
          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full text-sm font-semibold glass glass-interactive text-indigo-300 border-indigo-500/30"
          >
            Launch Builder
          </a>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center max-w-4xl mx-auto">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springTransition}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs font-semibold text-indigo-300"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Empowering Modern Interfaces
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-none"
          >
            Craft Immersive{' '}
            <span className="text-gradient-primary">3D Realities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Experience a new frontier of interaction. Aura3D merges dynamic WebGL scenes, interactive design nodes, and responsive animations into one beautiful, fluid user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start Customizing
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass glass-interactive rounded-full font-semibold"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Engineered for <span className="text-gradient-secondary">Precision</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Combining Next.js with state-of-the-art animation libraries, Aura3D provides stellar performance with a glassmorphism style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "Turbopack Optimization",
              desc: "Engineered specifically to support real-time Next.js updates and rapid rendering."
            },
            {
              icon: "🎨",
              title: "Dynamic Customizer",
              desc: "Instantly control Three.js material physical properties, scaling, shapes, and motion speed."
            },
            {
              icon: "📱",
              title: "Responsive Adaptability",
              desc: "Fluidly adapts down to mobile viewports while keeping high-framerate WebGL interactive components."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-2xl glass glass-interactive flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-black mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-6 flex items-center text-indigo-400 font-semibold text-sm">
                Learn more <span className="ml-1">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3D Real-Time Customizer Panel Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <motion.div style={{ y: customizerY }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Customizer Panel Controls (Glassmorphism container) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs font-semibold text-purple-300">
                Workspace
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
                WebGL Material <span className="text-gradient-primary">Studio</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Interact with the scene in real-time. Change physical geometries, alter speeds, and pick your custom theme colors below.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass space-y-6">
              {/* Shape Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Geometry Shape</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['torusKnot', 'sphere', 'box', 'icosahedron'] as ShapeType[]).map((shapeOpt) => (
                    <button
                      key={shapeOpt}
                      onClick={() => setShape(shapeOpt)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        shape === shapeOpt
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-[#0f172a]/50 hover:bg-[#0f172a] text-slate-300'
                      }`}
                    >
                      {shapeOpt.charAt(0).toUpperCase() + shapeOpt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Color Palette</label>
                <div className="flex gap-3">
                  {[
                    { hex: '#6366f1', label: 'indigo' },
                    { hex: '#ec4899', label: 'pink' },
                    { hex: '#06b6d4', label: 'cyan' },
                    { hex: '#10b981', label: 'emerald' },
                    { hex: '#f59e0b', label: 'amber' },
                  ].map((colorOpt) => (
                    <button
                      key={colorOpt.hex}
                      onClick={() => setColor(colorOpt.hex)}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        color === colorOpt.hex ? 'border-white scale-110' : 'border-transparent opacity-80'
                      }`}
                      style={{ backgroundColor: colorOpt.hex }}
                      title={colorOpt.label}
                    />
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rotation Speed</label>
                  <span className="text-xs text-indigo-400 font-semibold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Geometry Scale</label>
                  <span className="text-xs text-indigo-400 font-semibold">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* WebGL viewport preview block description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl glass border-indigo-500/15 flex flex-col justify-between h-[360px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Active State Monitor</span>
                <h3 className="text-2xl font-black text-white">Dynamic 3D Syncing</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Notice how the background mesh responds immediately to your style inputs. We achieve this by mapping React state variables directly into custom WebGL properties inside Three.js and Redux-free render-frame handlers.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-800">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                  Shape: <span className="text-indigo-400 font-bold">{shape}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                  Color: <span className="text-indigo-400 font-bold">{color}</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                  Speed: <span className="text-indigo-400 font-bold">{speed}x</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                  Scale: <span className="text-indigo-400 font-bold">{scale}x</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Checkmarks / Information Section */}
      <section id="benefits" className="relative z-10 max-w-7xl mx-auto py-24 px-6 border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
              A New Era of <br />
              <span className="text-gradient-secondary">User Engagement</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Why stick to plain flat vector images when you can bring your product pages to life with high performance WebGL shaders? Aura3D guarantees a flawless execution layout.
            </p>
            <div className="space-y-4 pt-4">
              {[
                "Enhanced retention with active WebGL interactions",
                "Fully reactive styles matching Tailwind's theme system",
                "Optimized asset sizes using Next.js async chunk compilation",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-xs">
                    {/* Render raw Unicode character instead of HTML entities */}
                    {'\u2713'}
                  </div>
                  <span className="text-slate-300 text-sm md:text-base font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl glass space-y-3">
              <span className="text-4xl font-extrabold text-indigo-400">95%</span>
              <h4 className="font-bold text-white text-sm">Engagement Rise</h4>
              <p className="text-xs text-slate-400">Users actively interact with custom high fidelity elements.</p>
            </div>
            <div className="p-6 rounded-2xl glass space-y-3 mt-4">
              <span className="text-4xl font-extrabold text-purple-400">0ms</span>
              <h4 className="font-bold text-white text-sm">Lighthouse Penalty</h4>
              <p className="text-xs text-slate-400">Lazy-loaded canvas preserves performance budgets.</p>
            </div>
            <div className="p-6 rounded-2xl glass space-y-3">
              <span className="text-4xl font-extrabold text-cyan-400">4.9/5</span>
              <h4 className="font-bold text-white text-sm">Satisfaction Rate</h4>
              <p className="text-xs text-slate-400">Developers praise layout flexibility and simplicity.</p>
            </div>
            <div className="p-6 rounded-2xl glass space-y-3 mt-4">
              <span className="text-4xl font-extrabold text-emerald-400">120+</span>
              <h4 className="font-bold text-white text-sm">Interactive Nodes</h4>
              <p className="text-xs text-slate-400">Countless geometric modifications available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Call-to-action Section with Subscription Form */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto py-24 px-6 text-center">
        <div className="p-10 md:p-16 rounded-3xl glass border-indigo-500/20 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Stay Ahead of the Curve</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
              Get notified immediately when we launch new physical materials, geometry nodes, and performance presets.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springTransition}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 max-w-md mx-auto"
            >
              <span className="text-2xl mr-2">🎉</span> Thank you! You have successfully subscribed to Aura3D updates.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-full bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-full font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="text-xs text-slate-500 relative z-10 pt-4">
            No spam. Unsubscribe at any time. We respect your developer privacy.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900/80 text-center text-slate-500 bg-[#010410]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>
          <p className="text-xs md:text-sm">© 2026 Aura3D Space Systems. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-semibold">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
