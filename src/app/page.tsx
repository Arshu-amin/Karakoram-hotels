'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  ),
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'design' | 'motion' | 'compute'>('design')
  const [menuOpen, setMenuOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)

  // Pass ref directly, but framer-motion useScroll can safely take the ref object itself.
  // To avoid ref.current during render rule, pass target as ref object instead of ref.current.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Smooth scroll transformations
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.4])

  useEffect(() => {
    // Suppress react-hooks/set-state-in-effect ESLint warning
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* Background 3D Scene Layer */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none opacity-40 md:opacity-50">
        {mounted && <Scene />}
      </div>

      {/* Decorative Gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-1" />

      {/* Sticky Premium Header / Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 w-full glass border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-lg tracking-wider shadow-md shadow-indigo-500/25">
              N
            </div>
            <span className="text-xl font-bold tracking-widest text-white">NEXUS</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            {['Services', 'Core Architecture', 'Tech Stack', 'Showcase'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all">
              Initialize
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-between w-6 h-5 z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-full bg-white rounded-full transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 inset-x-0 glass border-b border-white/5 py-8 px-6 flex flex-col gap-6 md:hidden"
            >
              {['Services', 'Core Architecture', 'Tech Stack', 'Showcase'].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-slate-200 hover:text-indigo-400"
                >
                  {item}
                </a>
              ))}
              <hr className="border-white/5" />
              <div className="flex flex-col gap-4">
                <button className="w-full py-3 rounded-xl border border-white/10 text-center font-medium">
                  Sign In
                </button>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-center">
                  Initialize
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Nexus Engine v2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-8 text-gradient-primary">
            CRAFTING DIGITAL
            <br />
            DIMENSIONS
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Unleash hyper-interactive WebGL scenes and flawless cinematic aesthetics, seamlessly linked with modern scroll technologies.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold tracking-wide shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">
              Launch Console
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-bold tracking-wide hover:bg-white/5 active:scale-95 transition-all">
              Explore Docs
            </button>
          </div>
        </motion.div>

        {/* Floating details badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500 mb-2">Scroll To Explore</span>
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Interactive Tabs Showcases */}
      <section id="services" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-3">Core Modules</h2>
          <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Interactive Systems</p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-full glass border border-white/5 flex gap-2">
            {(['design', 'motion', 'compute'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'design' && (
                  <>
                    <h3 className="text-3xl font-extrabold text-white mb-4">
                      Glassmorphism &amp; Beyond
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      Engineered with multi-layered frost layers, dynamic blur levels, and subtle glowing border reflections. Our interface acts as a semi-transparent canvas highlighting the 3D depth of the backdrop.
                    </p>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        Dynamic real-time blur layers
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        Color-matched emissive gradients
                      </li>
                    </ul>
                  </>
                )}
                {activeTab === 'motion' && (
                  <>
                    <h3 className="text-3xl font-extrabold text-white mb-4">
                      Fluid Scroll-Driven Motion
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      Animate seamlessly with hardware-accelerated animations mapped exactly to your viewport progress. Fluid cursor physics react beautifully to click and hover triggers.
                    </p>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        Spring-dampened custom cursors
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        Scroll-linked transforms &amp; scaling
                      </li>
                    </ul>
                  </>
                )}
                {activeTab === 'compute' && (
                  <>
                    <h3 className="text-3xl font-extrabold text-white mb-4">
                      Optimized 3D Rendering
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                      Utilizes state-of-the-art WebGL configurations with safe, fallback-supported physical materials. Guaranteed stable performance across desktop, mobile, and software-rasterized environments.
                    </p>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        High-reflectivity MeshPhysicalMaterials
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        Adaptive frame-rate controllers
                      </li>
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden min-h-[350px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {activeTab === 'design' && (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                      <span className="text-4xl text-indigo-300">✦</span>
                    </div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Interface Layout</p>
                  </div>
                )}
                {activeTab === 'motion' && (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center animate-bounce">
                      <span className="text-4xl text-purple-300">▲</span>
                    </div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Physics Dynamics</p>
                  </div>
                )}
                {activeTab === 'compute' && (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center animate-pulse">
                      <span className="text-4xl text-pink-300">◆</span>
                    </div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Compute Shaders</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Scroll-Driven Dynamic Features Section */}
      <section
        id="core-architecture"
        ref={sectionRef}
        className="relative z-10 py-32 px-6 bg-slate-950/40 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Core Performance</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                Engineered for Fluidity
              </h2>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Every frame and transition is mathematically precise. Harness the parallel processing power of WebGL seamlessly unified with Next.js client mechanics.
              </p>
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl glass-light border border-white/5 flex-1">
                  <span className="block text-3xl font-black text-indigo-400 mb-1">99%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Render Accuracy</span>
                </div>
                <div className="p-4 rounded-2xl glass-light border border-white/5 flex-1">
                  <span className="block text-3xl font-black text-pink-400 mb-1">60FPS</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Fluid Playback</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Vector Physics',
                  desc: 'Complex mathematical equations calculate rotational vectors to maintain flawless momentum simulations.',
                  icon: '⚡',
                },
                {
                  title: 'Dynamic Lighting',
                  desc: 'Multiple volumetric spots and points of light cast premium reflection levels on physical materials.',
                  icon: '☼',
                },
                {
                  title: 'Smooth Handshakes',
                  desc: 'Asynchronous pre-loading states guarantee smooth page hydration without content jumping.',
                  icon: '⎋',
                },
                {
                  title: 'Advanced Filtering',
                  desc: 'Real-time backdrop filters dynamically blur underlying canvas pixels to guarantee text legibility.',
                  icon: '⚁',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  style={{
                    y: i % 2 === 0 ? yTranslate : undefined,
                    opacity: opacityTransform,
                  }}
                  className="p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between group hover:border-indigo-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section id="tech-stack" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 block">Uncompromised Power</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">The Modern Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: 'Next.js 16',
              desc: 'React server components, fluid dynamic loaders, and optimal routing configurations.',
              accent: 'from-[#000000] to-[#1e293b]',
            },
            {
              title: 'Three.js / Fiber',
              desc: 'Full-fledged WebGL render layers featuring responsive controls and custom lighting.',
              accent: 'from-[#1e1b4b] to-[#311042]',
            },
            {
              title: 'Tailwind CSS v4',
              desc: 'Premium customizable theme systems supporting clean utility structures.',
              accent: 'from-[#0c4a6e] to-[#0f172a]',
            },
            {
              title: 'Framer Motion',
              desc: 'Orchestrate highly premium entrance, tab, hover, and scroll-driven interactions.',
              accent: 'from-[#312e81] to-[#1e1b4b]',
            },
          ].map((stack, i) => (
            <div
              key={i}
              className="relative p-8 rounded-3xl overflow-hidden glass border border-white/5 flex flex-col justify-between min-h-[220px]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stack.accent} opacity-30 -z-1`} />
              <div>
                <h3 className="text-xl font-extrabold text-white mb-3">{stack.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{stack.desc}</p>
              </div>
              <div className="text-xs uppercase tracking-widest text-indigo-300 font-bold mt-4">Verified Module</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Contact / Call-to-Action Card */}
      <section id="showcase" className="relative z-10 py-32 px-6 max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center glass border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-pink-500/10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              READY TO LAUNCH
              <br />
              YOUR SPACE?
            </h2>
            <p className="text-slate-400 leading-relaxed font-light">
              Collaborate on custom 3D web interfaces tailored exactly for your branding and performance specifications.
            </p>
            <div>
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold tracking-wide shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">
                Let&apos;s Build Together
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 text-center text-slate-500 bg-slate-950/60 backdrop-blur-md">
        <p className="text-sm font-light tracking-wide">
          &copy; 2026 NEXUS. Designed for next-generation visual computing.
        </p>
      </footer>
    </main>
  )
}
