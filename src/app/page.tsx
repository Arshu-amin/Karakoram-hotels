'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamic import of 3D Scene to prevent SSR hydration errors
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-medium tracking-wide">Initializing Aura3D WebGL engine...</p>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene control states
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1)
  const [shapeType, setShapeType] = useState<'torus' | 'sphere' | 'box' | 'icosahedron'>('torus')
  const [scale, setScale] = useState(1.2)
  const [distort, setDistort] = useState(0.5)

  // Subscription states
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Global window-level scroll monitoring to animate foreground UI elements
  const { scrollY } = useScroll()

  // Transitions and transformations based on scroll position
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])
  const studioTranslateY = useTransform(scrollY, [100, 700], [80, 0])
  const showcaseScale = useTransform(scrollY, [800, 1400], [0.9, 1])

  // Framer Motion shared settings
  const easeOutTransition = { duration: 0.8, ease: 'easeOut' as const }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden select-none pb-20">
      {/* Absolute Background WebGL Layer */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
        <Scene
          color={color}
          speed={speed}
          shapeType={shapeType}
          scale={scale}
          distort={distort}
        />
      </div>

      {/* Decorative gradient overlay to fade background in sections */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950/95 pointer-events-none z-0" />

      {/* Modern Frosted Header */}
      <header className="sticky top-0 z-40 w-full glass backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Aura3D</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
          <a href="#features" className="hover:text-white transition-colors">Platform</a>
          <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
        </nav>
        <div>
          <a
            href="#studio"
            className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-md shadow-white/10"
          >
            Launch App
          </a>
        </div>
      </header>

      {/* Content wrapper */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-12 md:pt-24 text-center max-w-5xl mx-auto">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={easeOutTransition}
              className="mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                Next-Gen WebGL Interaction
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...easeOutTransition, delay: 0.15 }}
              className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6"
            >
              Craft Your own <br />
              <span className="text-gradient-primary">Digital Aura</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...easeOutTransition, delay: 0.3 }}
              className="text-base md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
            >
              Control high-fidelity, real-time 3D visual environments on the web.
              Fusing modern reactive interface architectures with ultra-fast GPU acceleration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="#studio"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                Go to 3D Studio
              </a>
              <a
                href="#features"
                className="px-8 py-4 glass hover:bg-white/10 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                Explore Features
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 3D Configurator Studio Dashboard */}
        <section id="studio" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
          <motion.div
            style={{ translateY: studioTranslateY }}
            className="glass rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md border border-slate-800"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Controls Column */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-2 text-gradient-secondary">Aura Customizer</h2>
                  <p className="text-sm text-slate-400 mb-8">
                    Interact directly with the physical properties of the background WebGL shape and view updates in real-time.
                  </p>

                  {/* 3D Control Knobs */}
                  <div className="space-y-6">
                    {/* Shape Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Shape Primitive</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['torus', 'sphere', 'box', 'icosahedron'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setShapeType(type)}
                            className={`py-2 px-1 text-xs font-semibold rounded-lg capitalize border transition-all ${
                              shapeType === type
                                ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200'
                                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Aura Glow Color</label>
                        <span className="text-xs font-mono text-indigo-400">{color}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <div className="flex flex-wrap gap-2">
                          {['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'].map((c) => (
                            <button
                              key={c}
                              onClick={() => setColor(c)}
                              style={{ backgroundColor: c }}
                              className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                                color === c ? 'border-white scale-110' : 'border-transparent'
                              }`}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Scale Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Object Scale</span>
                        <span>{scale.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.2"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Speed Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Orbit Speed</span>
                        <span>{speed.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={speed}
                        onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Distortion Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Physical Distortion</span>
                        <span>{(distort * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1.5"
                        step="0.1"
                        value={distort}
                        onChange={(e) => setDistort(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Status: Render Stream Live</span>
                  <button
                    onClick={() => {
                      setColor('#6366f1')
                      setSpeed(1)
                      setShapeType('torus')
                      setScale(1.2)
                      setDistort(0.5)
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {/* Viewport Column */}
              <div className="lg:col-span-7 h-[300px] lg:h-auto rounded-2xl relative overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col justify-end p-6">
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold">Interactive Preview</h3>
                  <p className="text-xs text-slate-400">
                    Drag the preview space directly with your mouse to rotate and view the shape in full 3D space.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-6xl mx-auto px-4 py-24 scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient-primary">Engine Capabilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Underneath the hood, our customized 3D animation runtime leverages raw hardware-accelerated rendering pipelines to deliver performance at up to 120 FPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "WebGL Hardware GPU Acceleration",
                desc: "Renders mesh physical materials, dynamic lights, and vertex distortions with zero overhead.",
                icon: "⚡"
              },
              {
                title: "Interactive Controls",
                desc: "Direct link from the DOM state directly into WebGL canvas context allowing interactive, lag-free real-time manipulation.",
                icon: "🎮"
              },
              {
                title: "Fully Adaptive Layout",
                desc: "Fluid design configured across desktop, tablets, and phones. The background scene auto-adjusts fov and viewport seamlessly.",
                icon: "📱"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 rounded-2xl glass hover:bg-slate-900/80 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="mt-6 text-xs text-indigo-400 font-bold group-hover:underline cursor-pointer">
                  Learn more &rarr;
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Showcase */}
        <section id="showcase" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24">
          <motion.div
            style={{ scale: showcaseScale }}
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-4">Showcase Gallery</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready-made templates for digital creators</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Unlock specialized materials, clearcoat physics layers, and real-time custom textures designed specifically for futuristic WebGL applications.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-indigo-400 font-bold mb-1 font-mono">01. Pearl</div>
                  <p className="text-xs text-slate-400">Iridescent clearcoat coating mesh</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-indigo-400 font-bold mb-1 font-mono">02. Liquid</div>
                  <p className="text-xs text-slate-400">Distortion and high-frequency wave speed</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-indigo-400 font-bold mb-1 font-mono">03. Chrome</div>
                  <p className="text-xs text-slate-400">High-gloss metallic reflective finish</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setColor('#a855f7')
                  setShapeType('icosahedron')
                  setSpeed(1.8)
                  setScale(1.4)
                  setDistort(0.9)
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-full text-sm font-semibold"
              >
                Apply Liquid Chrome Template
              </button>
            </div>
            {/* Ambient subtle lighting circle overlay */}
            <div className="absolute right-[-10%] top-[-10%] w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>
        </section>

        {/* Subscription Newsletter section */}
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden border border-slate-800">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Stay updated with Aura3D</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
                Join our premium newsletter list to receive tutorials, custom Three.js shaders, and high-performance React tips.
              </p>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-2xl max-w-md mx-auto"
                >
                  <p className="font-bold mb-1">{"\u2713"} You are successfully subscribed!</p>
                  <p className="text-xs opacity-85">Thank you for joining. Keep your eyes on your inbox.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-full bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-white text-slate-950 font-bold rounded-full text-sm hover:bg-slate-200 transition-colors shrink-0"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
            {/* Absolute accent lighting background inside card */}
            <div className="absolute left-[-5%] bottom-[-5%] w-[250px] h-[250px] bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none" />
          </div>
        </section>

        {/* Fine-tuned Footer */}
        <footer className="border-t border-slate-900/80 bg-slate-950/80 py-16 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-extrabold text-xs">A</span>
              </div>
              <span className="font-bold text-slate-300 text-sm">Aura3D Experience</span>
            </div>
            <p className="order-last md:order-none">
              &copy; 2026 Aura3D Space Technologies. All rights reserved.
            </p>
            <div className="flex gap-6 text-slate-400">
              <a href="#studio" className="hover:text-white transition-colors">Studio</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#showcase" className="hover:text-white transition-colors">Gallery</a>
            </div>
          </div>
        </footer>

      </div>
    </main>
  )
}
