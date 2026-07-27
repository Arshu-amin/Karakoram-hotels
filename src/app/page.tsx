'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-500 font-mono text-sm">LOADING NEURAL LAYER...</div>
})

export default function Home() {
  const [activeShape, setActiveShape] = useState(0)
  const [colorTheme, setColorTheme] = useState('#6366f1')
  const [colorName, setColorName] = useState('Indigo Spark')

  // Scroll linkages using global scroll tracking to prevent ref hydration errors
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.45, 0.25])

  const shapesList = [
    { name: 'Torus Knot', desc: 'Complex interlocking geometric loop with smooth curves.' },
    { name: 'Geometric Octahedron', desc: 'Eight-sided perfect polyhedral crystal shape.' },
    { name: 'Stellar Icosahedron', desc: 'Symmetrical twenty-sided stellated polyhedron.' },
  ]

  const themesList = [
    { name: 'Indigo Spark', hex: '#6366f1', textClass: 'text-indigo-400', borderClass: 'border-indigo-500/30' },
    { name: 'Purple Nova', hex: '#a855f7', textClass: 'text-purple-400', borderClass: 'border-purple-500/30' },
    { name: 'Neon Cyber', hex: '#0ea5e9', textClass: 'text-sky-400', borderClass: 'border-sky-500/30' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Dynamic 3D Scene Layer */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <Scene activeShapeIndex={activeShape} colorTheme={colorTheme} />
      </motion.div>

      {/* Floating Glass Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full glass glow-indigo">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-ping" />
            <span className="font-mono text-lg font-bold tracking-widest text-gradient-primary uppercase">
              HyperSphere
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-sm text-slate-400">
            <a href="#experience" className="hover:text-white transition-colors duration-200">Experience</a>
            <a href="#showcase" className="hover:text-white transition-colors duration-200">Showcase</a>
            <a href="#metrics" className="hover:text-white transition-colors duration-200">Metrics</a>
            <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>

          <a
            href="#showcase"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95"
          >
            Launch Controls
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="experience" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="mb-4 px-4 py-1.5 rounded-full border border-slate-800/80 bg-slate-900/40 text-xs font-mono tracking-widest text-indigo-300 uppercase"
          >
            React 19 &bull; Next.js 16 &bull; WebGL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6 font-sans leading-none"
          >
            Sculpting the <br />
            <span className="text-gradient-primary">Next Digital</span> Frontier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="text-base md:text-xl text-slate-400 max-w-2xl mb-12 font-sans font-light leading-relaxed"
          >
            Interactive procedural WebGL dimensions merged with a premium Glassmorphism aesthetic. Responsive, fully fluid, and hardware-accelerated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#showcase"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
            >
              Control the 3D Sphere
            </a>
            <a
              href="#metrics"
              className="px-8 py-4 border border-slate-800 bg-slate-900/30 backdrop-blur-md hover:bg-slate-800/50 hover:border-slate-700 text-slate-300 hover:text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Explore Telemetry
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">Scroll to Orbit</span>
          <span className="w-5 h-9 rounded-full border-2 border-slate-800 flex justify-center p-1.5">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
          </span>
        </motion.div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-sans">
            Engineered with Precision
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light">
            Every layer is meticulously balanced for peak execution speeds and stunning physical micro-interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Procedural Geometries",
              desc: "Mathematical representations generated in real-time on the GPU. Sharp, precise, and infinitely scalable.",
              icon: "◇",
              color: "text-indigo-400",
              glow: "hover:shadow-indigo-500/10"
            },
            {
              title: "Frictionless Physics",
              desc: "Spring-animated cursor tracks and physical lighting variables provide zero-latency tactile interface feedback.",
              icon: "⚡",
              color: "text-purple-400",
              glow: "hover:shadow-purple-500/10"
            },
            {
              title: "Responsive Lighting",
              desc: "Studio lights dynamically shift position and cast specular reflections on responsive clearcoat finishes.",
              icon: "☼",
              color: "text-sky-400",
              glow: "hover:shadow-sky-500/10"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`p-8 rounded-3xl glass transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-900/60 group hover:border-slate-700 ${feature.glow}`}
            >
              <div className={`text-3xl mb-6 font-mono ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans text-slate-100 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-light text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Section (Controls the 3D Sphere!) */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <div className="rounded-3xl glass-indigo p-8 md:p-16 glow-indigo relative overflow-hidden">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-semibold">Interactive Laboratory</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6 font-sans">
                Manipulate the WebGL Core
              </h2>
              <p className="text-slate-300 font-light mb-8 leading-relaxed">
                Interact with the control matrix below to manipulate the background mesh structure and chromatic resonance in real-time. Feel the custom cursor scale as you adjust settings.
              </p>

              {/* Geometry Shape Controller */}
              <div className="mb-8">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">Select Crystal Geometry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shapesList.map((shape, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveShape(i)}
                      className={`px-4 py-3 rounded-2xl border text-left transition-all duration-300 ${
                        activeShape === i
                          ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200 font-medium'
                          : 'border-slate-800/80 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-mono opacity-60 mb-1">0{i + 1}</div>
                      <div className="text-sm font-semibold">{shape.name}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-500 font-mono italic">
                  Active structural state: {shapesList[activeShape].desc}
                </div>
              </div>

              {/* Color Theme Controller */}
              <div>
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-4">Select Spectrum Resonance</h4>
                <div className="flex flex-wrap gap-3">
                  {themesList.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        setColorTheme(theme.hex)
                        setColorName(theme.name)
                      }}
                      className={`px-5 py-3 rounded-full border text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 ${
                        colorName === theme.name
                          ? `${theme.borderClass} bg-slate-900/80 ${theme.textClass}`
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.hex }} />
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Aesthetic Tech Status Screen */}
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs leading-relaxed text-slate-400 max-w-md mx-auto w-full">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                <span className="text-slate-500">SYSTEM STATUS: <span className="text-emerald-400 font-bold">ONLINE</span></span>
                <span className="text-slate-500 animate-pulse">RESONATING...</span>
              </div>
              <div className="space-y-2">
                <p><span className="text-slate-600">&gt;</span> <span className="text-indigo-400">active_geometry:</span> {shapesList[activeShape].name.toUpperCase().replace(' ', '_')}</p>
                <p><span className="text-slate-600">&gt;</span> <span className="text-indigo-400">chroma_hex:</span> {colorTheme}</p>
                <p><span className="text-slate-600">&gt;</span> <span className="text-indigo-400">vertex_shader:</span> COMPILED_SUCCESSFULLY</p>
                <p><span className="text-slate-600">&gt;</span> <span className="text-indigo-400">mesh_phys_material:</span> ROUGHNESS=0.15 METALNESS=0.9</p>
                <p><span className="text-slate-600">&gt;</span> <span className="text-indigo-400">clearcoat_layer:</span> ACTIVE (THICKNESS=1.0)</p>
                <p className="border-t border-slate-800/80 pt-3 mt-4 text-[10px] text-slate-500">
                  Click options to update the GPU pipeline dynamically. WebGL renders at the system maximum frame rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Metrics telemetry Section */}
      <section id="metrics" className="relative z-10 max-w-7xl mx-auto py-24 px-6 border-t border-b border-slate-900 bg-slate-950/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "120 FPS", label: "Render Target Speed", desc: "Optimized multi-threaded WebGL animation pipeline" },
            { value: "0.15ms", label: "Draw Call Latency", desc: "Minimal vertex overhead and asset footprint" },
            { value: "100%", label: "Responsive Scale", desc: "Fluid CSS variables linked directly with 3D canvas" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6"
            >
              <div className="text-4xl md:text-6xl font-extrabold text-gradient-primary mb-2 font-mono">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-200 mb-1 font-sans">{stat.label}</div>
              <div className="text-xs text-slate-500 font-light max-w-[240px] mx-auto">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto py-32 px-6 text-center">
        <div className="rounded-3xl glass p-8 md:p-16 glow-purple">
          <span className="font-mono text-xs tracking-widest text-purple-400 uppercase font-semibold">Join the Nexus</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6 font-sans">
            Ready to Build Your Space?
          </h2>
          <p className="text-slate-400 font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Get in touch to collaborate on high-end interactive interfaces, custom 3D web graphics, or next-generation software development.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-purple-500/20 active:scale-95 hover:scale-105"
            >
              Get Connected
            </button>
          </form>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-12 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            &copy; 2026 HYPERSPHERE INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#experience" className="hover:text-indigo-400 transition-colors">EXPERIENCE</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">SHOWCASE</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">METRICS</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
