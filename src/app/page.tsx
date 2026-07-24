'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />,
})

type ShapeType = 'torusKnot' | 'sphere' | 'box' | 'octahedron'

export default function Home() {
  const [shapeType, setShapeType] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.0)
  const [metalness, setMetalness] = useState(0.9)
  const [roughness, setRoughness] = useState(0.1)
  const [clearcoat, setClearcoat] = useState(1.0)

  // Scroll monitoring at the window-level to avoid hydration errors
  const { scrollYProgress } = useScroll()

  // Map scroll position to 3D object size and shape behavior smoothly
  const shapeScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.4, 0.9, 1.2])

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Persistent Background WebGL Scene Layer */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <Scene
          shapeType={shapeType}
          color={color}
          speed={speed}
          metalness={metalness}
          roughness={roughness}
          clearcoat={clearcoat}
          scale={shapeScale.get()}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              Δ
            </span>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Aetheris
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          </nav>

          <a
            href="#playground"
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-300 border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-950/40 hover:border-indigo-500/60 transition-all"
          >
            Launch Playground
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/10 to-[#020617] pointer-events-none" />

        <div className="max-w-3xl space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
          >
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-purple-300 border border-purple-500/20 bg-purple-950/20 backdrop-blur-sm">
              The Next-Gen Web Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
          >
            Shape Your <br />
            <span className="text-gradient-primary">Digital Space</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            An immersive interactive playground blending custom-tailored 3D WebGL assets, scroll-linked kinetics, and modern glassmorphism design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a
              href="#playground"
              className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all text-white text-center shadow-lg shadow-indigo-500/20"
            >
              Interactive Playground
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl font-medium border border-slate-800 bg-slate-950/40 backdrop-blur-sm hover:bg-slate-900/60 hover:border-slate-700 transition-all text-center"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-60">
          <span className="text-xs tracking-widest uppercase text-slate-500 font-mono">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const }}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Interactive 3D Playground Section */}
      <section id="playground" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left panel: Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">01 / Real-time WebGL Control</span>
            <h2 className="text-4xl font-bold tracking-tight">
              Interactive <br />
              <span className="text-gradient-secondary">3D Lab</span>
            </h2>
            <p className="text-slate-400 leading-relaxed font-light">
              Manipulate the floating 3D canvas behind this interface. Toggle base geometries, scale parameters, surface reflectivity, and rotational spin speeds.
            </p>
            <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-950/10 backdrop-blur-md">
              <span className="text-xs font-semibold text-indigo-300 block mb-1">Scroll-linked Scale:</span>
              <p className="text-xs text-slate-400">
                Notice how the WebGL shape organically contracts and expands as you scroll through the page.
              </p>
            </div>
          </div>

          {/* Right panel: Controls */}
          <div className="lg:col-span-7 glass rounded-2xl p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-lg font-semibold mb-6 border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Control Panel</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20 font-mono">Active</span>
            </h3>

            <div className="space-y-6">
              {/* Geometry Type */}
              <div>
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-3">Geometry Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['torusKnot', 'sphere', 'box', 'octahedron'] as ShapeType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setShapeType(type)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-all capitalize ${
                        shapeType === type
                          ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/15'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {type === 'torusKnot' ? 'Torus Knot' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Color Hue</span>
                    <span className="text-indigo-300 font-mono">{color}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                    />
                    <div className="flex-1 flex gap-1.5">
                      {['#6366f1', '#a855f7', '#ec4899', '#38bdf8', '#10b981'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className="w-6 h-6 rounded-full border border-slate-900 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Rotation Speed</span>
                    <span className="text-indigo-300 font-mono">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Metalness</span>
                    <span className="text-indigo-300 font-mono">{(metalness * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Roughness</span>
                    <span className="text-indigo-300 font-mono">{(roughness * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Clearcoat Finish</span>
                    <span className="text-indigo-300 font-mono">{(clearcoat * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={clearcoat}
                    onChange={(e) => setClearcoat(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400">02 / High-End Architecture</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Engineered for Performance</h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Every feature is fine-tuned to deliver visual excellence without compromising standard accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Adaptive Shader Flow",
              desc: "Engineered using high-performance MeshPhysicalMaterial models to prevent WebGL GPU stalls and software rendering bottlenecks.",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              num: "02",
              title: "Glassmorphism UI",
              desc: "Strictly calculated backdrop filters layered over fixed physical depth, providing unmatched screen blend states.",
              gradient: "from-indigo-500 to-purple-500"
            },
            {
              num: "03",
              title: "Micro-interactions",
              desc: "Dynamic layout animations driven by Framer Motion featuring spring-based custom cursor elements and hover states.",
              gradient: "from-purple-500 to-pink-500"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass glass-hover p-8 rounded-2xl relative overflow-hidden transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-6">
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800`}>
                  {feature.num}
                </span>
                <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`} />
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Stats Section */}
      <section id="stats" className="relative z-10 py-24 glass">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "60 FPS", desc: "Silky Smooth Rendering" },
              { val: "100%", desc: "Responsive Framework" },
              { val: "4.5kb", desc: "Tailwind Optimization" },
              { val: "Instant", desc: "No Hydration Bottlenecks" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <span className="block text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                  {stat.val}
                </span>
                <span className="block text-xs uppercase tracking-widest text-slate-400 font-mono">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="relative z-10 max-w-5xl mx-auto py-28 px-6 text-center">
        <div className="glass rounded-3xl p-12 relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to Elevate Your Web?</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Leverage premium 3D experiences, robust physics models, and fluid transitions to keep your users captivated.
          </p>
          <div className="pt-4">
            <a
              href="#playground"
              className="px-8 py-4 rounded-xl font-medium bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-lg shadow-white/10"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500">
        <p className="text-sm">© 2026 Aetheris Lab. Crafted with React, Tailwind CSS, & Three.js.</p>
      </footer>
    </main>
  )
}
