'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  Share2,
  Code2
} from 'lucide-react'
import CustomizerControls from '@/components/CustomizerControls'
import { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs tracking-wider uppercase">Loading WebGL Scene...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 2,
    distort: 0.4,
    scale: 1.2,
    wireframe: false,
  })

  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  const handleReset = () => {
    setSceneConfig({
      shape: 'torusKnot',
      color: '#6366f1',
      speed: 2,
      distort: 0.4,
      scale: 1.2,
      wireframe: false,
    })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
      {/* Dynamic Ambient Background Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene config={sceneConfig} enableControls={false} />
      </div>

      {/* Modern Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/60 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#performance" className="hover:text-indigo-400 transition-colors">
              Metrics
            </a>
            <a href="#subscribe" className="hover:text-indigo-400 transition-colors">
              Community
            </a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            Launch Studio
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 text-center pt-12 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" /> Next-Generation 3D Frontend Architecture
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight"
        >
          Immersive Web Visuals <br className="hidden md:inline" />
          <span className="text-gradient-primary">Engineered in 3D</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Experience fluid WebGL graphics, dynamic shader distortion, and instant visual customizations powered by Next.js, Three.js, and Tailwind CSS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm group"
          >
            Customize Geometry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 glass hover:bg-slate-800/80 text-slate-200 rounded-full font-semibold transition-all text-sm border border-slate-700/60 flex items-center justify-center gap-2"
          >
            Explore Tech Stack
          </a>
        </motion.div>
      </motion.section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest">Real-time WebGL Engine</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Interactive 3D Studio</h2>
          <p className="text-slate-400 text-sm md:text-base">
            Tweak shape geometries, mesh surface distortion, ambient material colors, and motion parameters live in the browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Viewport Canvas Frame */}
          <div className="lg:col-span-7 h-[450px] md:h-[550px] rounded-3xl glass-panel relative overflow-hidden border border-slate-700/60 shadow-2xl group">
            <Scene config={sceneConfig} enableControls={true} />
            <div className="absolute top-4 left-4 pointer-events-none glass px-3.5 py-1.5 rounded-full text-xs font-mono text-indigo-300 flex items-center gap-2 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE RENDER</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-between items-center text-xs text-slate-400 glass px-4 py-2 rounded-xl">
              <span>Drag to rotate 3D canvas</span>
              <span className="font-mono text-indigo-400">{sceneConfig.shape}</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5">
            <CustomizerControls
              config={sceneConfig}
              onChange={setSceneConfig}
              onReset={handleReset}
            />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-widest">Architectural Edge</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Designed for Modern Web</h2>
          <p className="text-slate-400 text-sm md:text-base">
            Combining ultra-responsive 3D shaders with crisp micro-interactions for next-level visual experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "60 FPS WebGL Performance",
              desc: "Engineered with optimized geometry instancing and hardware-accelerated shaders for silky smooth framerates.",
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: "Glassmorphism & Depth",
              desc: "Multi-layered frosted glass panels, ambient shadows, and translucent backdrop filters.",
            },
            {
              icon: <Sliders className="w-6 h-6 text-pink-400" />,
              title: "Reactive State Binding",
              desc: "Seamless synchronization between DOM user input controls and 3D WebGL material parameters.",
            },
            {
              icon: <Cpu className="w-6 h-6 text-cyan-400" />,
              title: "Next.js 16 App Router",
              desc: "Leveraging Server Components, dynamic client imports, and optimized Turbopack bundle delivery.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: "Zero Layout Shift",
              desc: "Fully responsive viewports and progressive hydration strategies to keep layout shifts to zero.",
            },
            {
              icon: <Code2 className="w-6 h-6 text-amber-400" />,
              title: "TypeScript Native",
              desc: "Strict type safety across Three.js geometry definitions, Framer Motion properties, and state components.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative flex flex-col justify-between h-full"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance Statistics Metrics */}
      <section id="performance" className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: "Render Frame Target", value: "60 FPS" },
              { label: "Lighthouse Score", value: "99+" },
              { label: "Shader Complexity", value: "Ultra-Low" },
              { label: "Interaction Latency", value: "< 16ms" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl md:text-5xl font-extrabold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section id="subscribe" className="relative z-10 max-w-4xl mx-auto py-24 px-4 text-center">
        <div className="glass-panel p-10 md:p-16 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-2">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Stay Ahead of Web 3D Trends</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Subscribe to receive regular updates on shader algorithms, WebGL performance optimizations, and Next.js frontend design.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={subscribed}
              className="px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm flex-1 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-emerald-600 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              {subscribed ? '{"\\u2713"} Subscribed' : 'Get Updates'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">Aura3D Architecture</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Aura3D Platform. Built with Next.js, Three.js & Framer Motion.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="hover:text-slate-300 transition-colors"><Globe className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </main>
  )
}
