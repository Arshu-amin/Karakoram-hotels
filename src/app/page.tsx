'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamic import for WebGL Scene to prevent SSR compilation errors
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-500 font-mono">INITIALIZING AURA 3D CANVAS...</div>
})

type ShapeType = 'torus' | 'sphere' | 'box' | 'icosahedron'

export default function Home() {
  // Configurator states
  const [shape, setShape] = useState<ShapeType>('torus')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.2)
  const [scale, setScale] = useState(1.1)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Scroll animation values
  const { scrollY } = useScroll()
  const yHeroText = useTransform(scrollY, [0, 500], [0, 100])
  const opacityHeroText = useTransform(scrollY, [0, 400], [1, 0])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const presetColors = ['#6366f1', '#f43f5e', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']

  return (
    <main className="relative min-h-screen text-slate-100 overflow-hidden bg-[#020617]">
      {/* Absolute Fullscreen 3D WebGL Canvas background layer */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />
      </div>

      {/* Modern top-level glass header navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            A
          </div>
          <span className="font-bold tracking-tight text-xl text-gradient-primary">Aura3D</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="#configurator" className="hover:text-indigo-400 transition-colors">Configurator</a>
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#metrics" className="hover:text-indigo-400 transition-colors">Metrics</a>
        </nav>
        <div>
          <a
            href="#configurator"
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300"
          >
            Launch Studio
          </a>
        </div>
      </header>

      {/* SECTION 1: HERO CONTAINER */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24 pointer-events-none">
        <motion.div
          style={{ y: yHeroText, opacity: opacityHeroText }}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="mb-6 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            NEXT-GEN WEBGL IMMERSIVE INTERFACE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-tight mb-8"
          >
            Sculpting the <br />
            <span className="text-gradient-primary">3D Web Ecosystem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 font-light leading-relaxed pointer-events-auto"
          >
            A high-fidelity dashboard built with Next.js, React Three Fiber,
            and Tailwind CSS. Customize the environment in real-time below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <a
              href="#configurator"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300"
            >
              Start Customizing
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-white/10 text-slate-100 font-semibold rounded-full transition-all duration-300"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: 3D REAL-TIME CONFIGURATOR DASHBOARD */}
      <section id="configurator" className="relative z-10 max-w-6xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Descriptive Copy */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Real-time <span className="text-gradient-secondary">Interactive Engine</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
              Manipulate geometry parameters, metallic surface shaders, and physics speeds. The WebGL rendering loop updates on-the-fly dynamically.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Zero Frame Drops</h4>
                  <p className="text-sm text-slate-400">Rendered with pure WebGL pipelines.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Synchronized Shaders</h4>
                  <p className="text-sm text-slate-400">Physically-based materials with physical metalness presets.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Configurator Box Controls (glassmorphic) */}
          <div className="lg:col-span-3 glass-premium rounded-3xl p-8 border border-white/10 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full filter blur-3xl" />

            <h3 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              Aura Controls
            </h3>

            {/* Shape selection buttons */}
            <div className="mb-6">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Geometry Base</span>
              <div className="grid grid-cols-4 gap-2">
                {(['torus', 'sphere', 'box', 'icosahedron'] as ShapeType[]).map((shp) => (
                  <button
                    key={shp}
                    onClick={() => setShape(shp)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                      shape === shp
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    {shp}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection presets */}
            <div className="mb-6">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Physical Layer Color</span>
              <div className="flex flex-wrap gap-3 items-center">
                {presetColors.map((cl) => (
                  <button
                    key={cl}
                    onClick={() => setColor(cl)}
                    className="w-8 h-8 rounded-full border-2 transition-transform duration-300 hover:scale-110 active:scale-95 shadow-md"
                    style={{
                      backgroundColor: cl,
                      borderColor: color === cl ? '#ffffff' : 'transparent',
                    }}
                  />
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Numeric sliders */}
            <div className="space-y-6 mb-6">
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Orbit Speed multiplier</span>
                  <span className="text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Geometry Scale</span>
                  <span className="text-indigo-400">{scale.toFixed(2)}x</span>
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

            {/* Toggle wireframe switch */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Wireframe Mode</h4>
                <p className="text-xs text-slate-400">View structure lines and vector geometries.</p>
              </div>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-700'
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
      </section>

      {/* SECTION 3: FEATURES GRID CARDS */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Interactive Architecture</span>
          <h2 className="text-4xl font-extrabold mt-3 mb-6">Stunning Engineering Built In</h2>
          <p className="text-slate-400 font-light text-lg">
            A state-of-the-art framework leveraging high-performance 3D graphics and responsive design patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Adaptive Framerate",
              desc: "Engineered with React Three Fiber to optimize rendering workloads and automatically stabilize framerates.",
              gradient: "text-gradient-primary",
              border: "border-indigo-500/20"
            },
            {
              title: "Unified Shaders",
              desc: "Built with standard Physical Shading models using clearcoats and metallic maps for photo-realistics aesthetics.",
              gradient: "text-gradient-secondary",
              border: "border-cyan-500/20"
            },
            {
              title: "Responsive Matrix",
              desc: "Responsive flexbox grids, glassmorphism layouts, and animated interaction cards that adapt perfectly.",
              gradient: "text-gradient-premium",
              border: "border-pink-500/20"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const }}
              className={`p-8 rounded-2xl bg-slate-900/40 border ${feature.border} backdrop-blur-md relative overflow-hidden group hover:bg-slate-900/60 transition-all duration-500`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500" />
              <h3 className={`text-2xl font-bold mb-4 ${feature.gradient}`}>{feature.title}</h3>
              <p className="text-slate-300 font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: METRICS & STATS BLOCK */}
      <section id="metrics" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="glass-premium rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "60 FPS", label: "Render Target" },
              { value: "4K+", label: "Resolution Scaling" },
              { value: "< 2.0s", label: "Initial Hydration" },
              { value: "100%", label: "TypeScript Safety" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: NEWSLETTER & CTA ACTION */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-6 text-center">
        <div className="glass rounded-3xl p-12 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Stay tuned in our <span className="text-gradient-primary">creative universe</span>
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8 font-light">
            Subscribe to our newsletter for early access releases, 3D web shader updates, and development stories.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold max-w-md mx-auto"
            >
              ✓ Thank you! You have successfully subscribed to Aura3D.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your professional email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-light transition-all duration-300"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full text-sm shadow-md transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-slate-950/40 backdrop-blur-md text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <span className="font-bold tracking-tight text-white">Aura3D Studio</span>
          </div>
          <p>© 2026 Aura3D Studio. Built for immersive, high-speed interfaces.</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
