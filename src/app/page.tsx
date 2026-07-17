'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'perf' | 'sec' | 'scal'>('perf')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Safely hook useScroll with dynamic target initialization to prevent hydration issues
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  // Transforms linked to page scroll progress
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9])
  const featuresTranslateY = useTransform(scrollYProgress, [0.15, 0.55], [60, 0])
  const showcaseOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1])

  const tabData = {
    perf: {
      metric: "0.2ms",
      desc: "Instantaneous state evaluation and 3D frames processed per millisecond. Fully parallel GPU rendering path.",
      color: "from-indigo-400 to-cyan-400"
    },
    sec: {
      metric: "99.99%",
      desc: "Fully end-to-end encrypted sessions and cryptographic validation using client-side WebAssembly.",
      color: "from-pink-400 to-purple-400"
    },
    scal: {
      metric: "12.5M+",
      desc: "Effortlessly scales to handle millions of simultaneous socket connections without latency degradation.",
      color: "from-amber-400 to-orange-400"
    }
  }

  return (
    <div ref={containerRef} className="relative bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Immersive 3D Canvas Background Layer */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Scene />
      </div>

      {/* Modern Floating Header Bar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl px-6 py-4 rounded-full glass flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-sm tracking-widest shadow-md">
            V
          </div>
          <span className="font-bold tracking-wider text-lg text-gradient-primary">
            VORTEX
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#features" className="hover:text-white transition-colors">Architecture</a>
          <a href="#showcase" className="hover:text-white transition-colors">Analytics</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <button className="px-5 py-2 text-xs font-semibold rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-md shadow-white/10 active:scale-95">
          Launch App
        </button>
      </header>

      {/* HERO SECTION */}
      <section id="overview" className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-24 text-center max-w-5xl mx-auto pointer-events-none">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="flex flex-col items-center justify-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 tracking-wider uppercase backdrop-blur-sm"
          >
            React 19 &amp; Next.js 16 Powered
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none"
          >
            The Next Era of <br />
            <span className="text-gradient-secondary">Digital Interaction</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed"
          >
            Unlock seamless immersive design with high-performance 3D shaders, real-time particle simulations, and ultra-fluid transitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' as const }}
            className="flex flex-wrap gap-4 justify-center items-center pt-4 pointer-events-auto"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
              Explore Platform
            </button>
            <button className="px-8 py-4 border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 backdrop-blur-sm">
              Read Docs
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll to explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase">Engineered Architecture</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-gradient-primary">Designed to be Beautiful. Engineered to last.</p>
        </div>

        <motion.div
          style={{ translateY: featuresTranslateY }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Glassmorphic Refraction",
              desc: "Immersive MeshTransmission shader with realistic index of refraction, chromatic aberration, and clearcoat layers.",
              num: "01",
              icon: "✦"
            },
            {
              title: "Fluid Motion Path",
              desc: "Smoothly integrated custom cursor feedback loops and camera-responsive depth rigs matching user interaction.",
              num: "02",
              icon: "⚡"
            },
            {
              title: "Reactive Fluidity",
              desc: "Optimized scroll progress tracking linked strictly into WebGL and CSS state layers for continuous 120FPS performance.",
              num: "03",
              icon: "⚛"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: "rgba(129, 140, 248, 0.3)" }}
              className="p-8 rounded-2xl glass border border-slate-800 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
              <div>
                <div className="text-3xl mb-6 text-indigo-400">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800/60 flex justify-between items-center text-xs">
                <span className="text-indigo-400 font-mono font-bold">{feature.num}</span>
                <span className="text-slate-600 font-mono">STABLE COMPONENT</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SHOWCASE / INTERACTIVE ANALYTICS SECTION */}
      <section id="showcase" className="relative z-10 py-32 px-4 max-w-6xl mx-auto">
        <motion.div style={{ opacity: showcaseOpacity }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information & Tab Selection */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Live Metrics Analytics</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gradient-primary">Monitor Everything in Real-Time</h2>
              <p className="text-slate-400 leading-relaxed font-light">
                Interact with the dynamic tabs to view system performance metrics. Our 3D platform is synchronized with the live stream of real-time server telemetry.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {(Object.keys(tabData) as Array<keyof typeof tabData>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                    activeTab === key
                      ? "glass border-indigo-500/50 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                  }`}
                >
                  <span className="font-semibold capitalize text-sm">{key === 'perf' ? 'System Speed' : key === 'sec' ? 'Cryptographic Security' : 'Active Scalability'}</span>
                  <div className={`w-2 h-2 rounded-full ${activeTab === key ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Metric Preview Box */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass border border-slate-800 p-8 md:p-12 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-indigo-500/5 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-6">
                <span className="text-xs font-mono text-indigo-400">METRIC ANALYSIS REPORT</span>
                <span className="text-xs font-mono text-slate-500">SESSION ID: #VTX-7749</span>
              </div>

              <div className="my-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <span className={`text-6xl md:text-8xl font-black bg-gradient-to-r ${tabData[activeTab].color} bg-clip-text text-transparent tracking-tighter`}>
                      {tabData[activeTab].metric}
                    </span>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                      {tabData[activeTab].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-4 justify-between items-center border-t border-slate-800/80 pt-6 text-xs text-slate-500 font-mono">
                <span>UPDATED: SECONDS AGO</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYSTEMS NOMINAL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE CALL TO ACTION */}
      <section id="contact" className="relative z-10 py-32 px-4 max-w-5xl mx-auto">
        <div className="rounded-3xl glass border border-slate-800 p-12 text-center relative overflow-hidden space-y-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-6xl font-black tracking-tight text-gradient-primary">Ready to Elevate Your Interface?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Begin designing immersive next-generation products using our open architecture, high fidelity Three.js assets, and modular frameworks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-full bg-slate-900/60 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button className="w-full sm:w-auto shrink-0 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-500/20 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 border-t border-slate-900/80 text-center text-slate-500 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs text-white">V</div>
            <span className="font-bold tracking-wider text-white">VORTEX</span>
          </div>
          <p className="text-slate-500 text-xs">© 2026 Vortex Platform. Open sourced under MIT License.</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
