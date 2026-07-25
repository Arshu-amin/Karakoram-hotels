'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamic import of 3D Scene with no SSR to avoid hydration mismatch
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin" />
        <p className="text-indigo-400 font-mono tracking-wider animate-pulse">
          INITIALIZING WEBGL...
        </p>
      </div>
    </div>
  ),
})

export default function Home() {
  // Use global window scroll tracking to avoid Next.js hydration target ref mismatch
  const { scrollYProgress } = useScroll()

  // Transform values for interactive scroll effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9])
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.25], [0, -50])

  // Interactive showcase panel state
  const [activeTab, setActiveTab] = useState<'aether' | 'neural' | 'quantum'>('aether')
  const [ambientIntensity, setAmbientIntensity] = useState<number>(50)
  const [isGlowOn, setIsGlowOn] = useState<boolean>(true)

  const handleTabChange = (tab: 'aether' | 'neural' | 'quantum') => {
    setActiveTab(tab)
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background 3D Scene - fixed to float behind content */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Decorative top ambient glow gradient */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent z-1" />

      {/* HERO SECTION */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroTranslateY }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center max-w-5xl mx-auto pt-20"
      >
        <div className="absolute top-24 md:top-32 px-4 py-1.5 glass rounded-full flex items-center gap-2 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 hover:scale-105 transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest font-semibold">
            v2.0 Premium Upgrade Active
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-none">
          <span className="block text-slate-400 text-2xl md:text-3xl font-mono uppercase tracking-[0.25em] mb-4">
            Welcome to the
          </span>
          <span className="text-gradient-primary drop-shadow-[0_2px_10px_rgba(165,180,252,0.15)]">
            Aetheria Engine
          </span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Step into a high-performance visual workspace. Fusing real-time WebGL micro-interactions, custom fluid dynamics, and beautiful frosted glassmorphism into a spectacular Next.js application.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={() => {
              const el = document.getElementById('interactive-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-9 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20 group flex items-center justify-center gap-2"
          >
            Enter Engine
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('features-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-9 py-4 glass text-indigo-200 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-slate-900/40"
          >
            Explore Tech Specs
          </button>
        </div>
      </motion.section>

      {/* STATS SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "99.9%", label: "Frame Consistency" },
            { value: "0.2ms", label: "Render Latency" },
            { value: "240fps", label: "WebGL Throughput" },
            { value: "100%", label: "Strict Safe Purity" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl glass hover:border-indigo-500/30 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <span className="text-3xl md:text-5xl font-extrabold text-gradient-primary group-hover:scale-110 transition-transform duration-300 mb-2">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-slate-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECH FEATURES SECTION */}
      <section id="features-section" className="relative z-10 max-w-7xl mx-auto py-24 px-4 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Engineered with <span className="text-gradient-secondary">Precision</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Optimized pipeline leveraging React 19 concurrent features and fluid Three.js configurations for silky rendering performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Procedural Orbits",
              badge: "WEBGL & GLSL",
              desc: "Hundreds of mathematically defined cosmic ring vectors running purely on GPU pipelines, matching CSS styles synchronously.",
              color: "from-indigo-400 to-indigo-600",
            },
            {
              title: "Glassmorphic Grid",
              badge: "TAILWIND CSS",
              desc: "Premium glass components dynamically blurring out ambient WebGL star trails to provide crisp readable typography.",
              color: "from-purple-400 to-purple-600",
            },
            {
              title: "Continuous Motion",
              badge: "FRAMER MOTION",
              desc: "Smooth velocity transitions mapped accurately to scroll positions, establishing continuous UI-to-Canvas flow.",
              color: "from-sky-400 to-sky-600",
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-3xl glass border border-slate-800/80 hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest bg-slate-950 border border-slate-800 text-indigo-300 uppercase mb-6">
                  {feature.badge}
                </span>
                <h3 className="text-2xl font-bold mb-4 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                  {feature.desc}
                </p>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-700`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CONTROLS / SHOWCASE SECTION */}
      <section id="interactive-section" className="relative z-10 max-w-7xl mx-auto py-20 px-4 scroll-mt-20">
        <div className="glass rounded-3xl p-8 md:p-12 border border-slate-800/80 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            Engine <span className="text-gradient-primary">Control Center</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-8">
            Interact with the core application workspace below. Toggle configurations dynamically and observe responsive transformations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Select Visual Spectrum
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['aether', 'neural', 'quantum'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border transition-all duration-200 capitalize ${
                        activeTab === tab
                          ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-md shadow-indigo-500/10'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Ambient Core Glow
                  </label>
                  <span className="text-xs font-mono text-indigo-400 font-bold">{ambientIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={ambientIntensity}
                  onChange={(e) => setAmbientIntensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Frost Shield (Glass Effect)
                </span>
                <button
                  onClick={() => setIsGlowOn(!isGlowOn)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    isGlowOn ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      isGlowOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Interactive Preview */}
            <div className={`p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 transition-all duration-300 flex flex-col items-center justify-center text-center h-64 ${isGlowOn ? 'glass glass-glow' : ''}`}>
              <div className="mb-4 relative">
                <div className="w-16 h-16 rounded-full border border-indigo-500/30 flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-purple-500 animate-pulse" />
                </div>
              </div>

              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Preview Terminal</span>
              <h4 className="text-lg font-bold text-indigo-300 capitalize mb-2">{activeTab} Spectrum</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Core energy glow calibrated at <span className="text-indigo-400 font-bold font-mono">{ambientIntensity}%</span> intensity. Responsive modules synced successfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 max-w-5xl mx-auto py-24 px-4">
        <div className="glass rounded-3xl p-8 md:p-16 border border-slate-800/80 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight">
            Ready to <span className="text-gradient-primary">Elevate</span> Your Stack?
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg mb-10 leading-relaxed">
            Experience the combination of high physical detail WebGL render paths and premium, high performance React interfaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => alert('Welcome to Aetheria Engine!')}
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
              Get Started Now
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 glass text-indigo-200 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Read Documentation
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 border-t border-slate-900/60 text-center text-slate-500 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white font-mono text-sm shadow-md shadow-indigo-500/20">
              Æ
            </div>
            <span className="font-bold tracking-wider text-slate-300 font-mono">AETHERIA</span>
          </div>
          <p className="text-sm">© 2026 Aetheria Engine. Built on React 19 & Next.js 16.</p>
          <div className="flex gap-6 text-sm font-mono">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
