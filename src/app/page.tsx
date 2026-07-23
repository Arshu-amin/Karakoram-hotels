'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const FEATURES = [
  {
    title: 'High-Performance 3D',
    desc: 'Breathtaking 3D visual experiences rendered directly in your browser with hardware acceleration.',
    icon: '⚡',
    gradient: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    title: 'Silky Smooth Animations',
    desc: 'Powered by Framer Motion for natural, delightful physics-based animations and micro-interactions.',
    icon: '✨',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'Premium Glassmorphism',
    desc: 'Ultra-modern frosted glass visual layers blending seamlessly with dynamic background lights.',
    icon: '💎',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Responsive & Accessible',
    desc: 'Designed first-class for every device size, providing a consistent high-fidelity experience.',
    icon: '📱',
    gradient: 'from-orange-500/20 to-amber-500/20'
  },
  {
    title: 'Optimized Next.js Stack',
    desc: 'Leverages Turbopack, App Router, and server component optimizations for blazing-fast performance.',
    icon: '🚀',
    gradient: 'from-rose-500/20 to-red-500/20'
  },
  {
    title: 'Physical Materials',
    desc: 'Simulates photorealistic reflections and clearcoat finishes for gorgeous metallic styles.',
    icon: '🎨',
    gradient: 'from-cyan-500/20 to-sky-500/20'
  }
]

const STATS = [
  { value: '144fps', label: 'Refresh Rate' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50ms', label: 'Response Time' },
  { value: '25M+', label: 'Global Users' }
]

const INTERACTIVE_TABS = [
  {
    id: 'torus',
    title: 'Indigo Torus',
    desc: 'A gorgeous complex 3D knot representing interconnected systems and complex datasets, rendering with physical metallic reflectivity.',
    color: 'border-indigo-500/50 text-indigo-400'
  },
  {
    id: 'sphere',
    title: 'Purple Sphere',
    desc: 'A perfectly smooth, highly polished mathematical sphere representing unity, completeness, and core application states.',
    color: 'border-purple-500/50 text-purple-400'
  },
  {
    id: 'octahedron',
    title: 'Teal Octahedron',
    desc: 'A sharp, double-pyramid polyhedron reflecting modern architectural design, crystalline order, and low-poly aesthetic.',
    color: 'border-sky-500/50 text-sky-400'
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('torus')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Framer motion scroll values defined at the root level of the component
  const { scrollY } = useScroll()
  const opacityScene = useTransform(scrollY, [0, 800], [0.75, 0.25])
  const scaleScene = useTransform(scrollY, [0, 800], [1, 0.85])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  const selectedTabData = INTERACTIVE_TABS.find(t => t.id === activeTab) || INTERACTIVE_TABS[0]

  return (
    <main className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Scene with Scroll Link */}
      <motion.div
        style={{ opacity: opacityScene, scale: scaleScene }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Decorative gradient glowing orb */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px] z-0 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[150px] z-0 pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/25">
              N
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Nexus3D
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Interactive', 'Stats', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            <a
              href="#interactive"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all duration-300 shadow-md hover:shadow-lg shadow-white/5 active:scale-95"
            >
              Launch Portal
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          The Next Dimension is Here
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            Unleashing Elegant
            <span className="block text-gradient-primary">Digital Horizons</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 font-light leading-relaxed"
        >
          An immersive WebGL interactive experience designed for high-end digital applications. Built using Next.js 16, Tailwind CSS v4, and Three.js physical material layers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#features"
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20"
          >
            Explore Features
          </a>
          <a
            href="#interactive"
            className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            Play with 3D Objects
          </a>
        </motion.div>

        {/* Floating instruction reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-slate-500 uppercase tracking-widest pointer-events-none hidden md:block"
        >
          Scroll to explore ↓
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Engineered For Excellence
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience our ultra-polished high performance modular architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' as const }}
              className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md hover:border-slate-700/80 hover:bg-slate-900/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-400 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive 3D Showcase Description Tab-System */}
      <section id="interactive" className="relative z-10 max-w-5xl mx-auto py-24 px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-950/75 border border-slate-800/60 backdrop-blur-xl">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold block mb-2">
              Interactive WebGL Component
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Control the Geometric Space
            </h2>
            <p className="text-slate-400 mt-2">
              The floating 3D shapes on the screen are fully dynamic. Select one below to explore its details:
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {INTERACTIVE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Details */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 md:p-8 rounded-2xl border bg-slate-900/20 backdrop-blur-sm ${selectedTabData.color}`}
          >
            <h3 className="text-2xl font-bold mb-3">{selectedTabData.title}</h3>
            <p className="text-slate-300 leading-relaxed text-base">
              {selectedTabData.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto py-20 px-6 border-y border-slate-900 bg-slate-950/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
            >
              <div className="text-4xl md:text-6xl font-black text-gradient-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Contact / Newsletter Signup */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto py-32 px-6 text-center">
        <div className="p-8 md:p-16 rounded-3xl bg-gradient-to-b from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 backdrop-blur-xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Join the Nexus Network
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Subscribe to our newsletter and receive updates, feature drops, and 3D design resources.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold"
            >
              🎉 Thank you for subscribing! Welcome aboard the Nexus.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 bg-slate-950 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-sm">
              N
            </div>
            <span className="font-bold text-slate-400">Nexus3D</span>
          </div>
          <p className="text-center md:text-left text-xs">
            &copy; 2026 Nexus3D Inc. Designed and programmed for modern interactive interfaces. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
