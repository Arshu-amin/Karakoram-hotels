'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Box,
  Sliders,
  Zap,
  Layers,
  Cpu,
  Shield,
  Activity,
  ChevronDown,
  Check,
  RotateCcw,
  ArrowRight,
  Globe,
  Code2,
  Share2
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950 text-indigo-400 font-mono text-sm animate-pulse">
      Initializing 3D Canvas...
    </div>
  )
})

export default function Home() {
  // 3D Scene Config State
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 2,
    distortion: 0.35,
    wireframe: false,
    roughness: 0.2,
    metalness: 0.8
  })

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Newsletter subscription state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const reset3DConfig = () => {
    setSceneConfig({
      shape: 'torusKnot',
      color: '#6366f1',
      speed: 2,
      distortion: 0.35,
      wireframe: false,
      roughness: 0.2,
      metalness: 0.8
    })
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D Scene Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Sticky Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-transform">
              <Box className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
              AURA 3D
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#studio" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Performance</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          {/* Header Action & Engine Status */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>WebGL 2.0 Ready</span>
            </div>
            <a
              href="#studio"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95 flex items-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20 text-center">
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium backdrop-blur-md mb-8 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen WebGL & 3D Interactive Platform</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-6 leading-[1.1]"
        >
          Immersive WebGL <br />
          <span className="text-gradient-primary">3D Visual Interfaces</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-normal"
        >
          Empowering modern web applications with real-time WebGL rendering, custom motion physics, and ultra-fluid interactive 3D components.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <span>Launch 3D Studio</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base transition-all transform hover:scale-105 active:scale-95 border border-slate-700/60"
          >
            Explore Ecosystem
          </a>
        </motion.div>

        {/* Live Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
        >
          {[
            { label: 'Frame Rate', val: '60+ FPS', icon: Activity },
            { label: 'Render Latency', val: '< 2ms', icon: Zap },
            { label: 'GPU Engine', val: 'WebGL 2.0', icon: Cpu },
            { label: 'Hydration Safety', val: '100% Client', icon: Shield }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center">
              <stat.icon className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-xl font-bold text-white mb-1 font-mono">{stat.val}</div>
              <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio Customizer Control Section */}
      <section id="studio" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient-secondary">
            Real-Time 3D Customizer Studio
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Directly manipulate state variables controlling the background WebGL scene in real time.
          </p>
        </div>

        {/* Studio Control Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 max-w-4xl mx-auto shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Canvas Controls</h3>
                <p className="text-xs text-slate-400">Interactive WebGL Material & Geometry Engine</p>
              </div>
            </div>

            <button
              onClick={reset3DConfig}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shape Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">3D Mesh Geometry</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'torus', label: 'Torus' },
                  { id: 'dodecahedron', label: 'Dodeca' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, shape: s.id as SceneConfig['shape'] }))}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                      sceneConfig.shape === s.id
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Presets */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Material Accent Color</label>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Cyber Indigo', color: '#6366f1' },
                  { name: 'Electric Cyan', color: '#06b6d4' },
                  { name: 'Neon Pink', color: '#ec4899' },
                  { name: 'Emerald Fire', color: '#10b981' },
                  { name: 'Amber Glow', color: '#f59e0b' }
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, color: c.color }))}
                    className={`w-10 h-10 rounded-full transition-transform border-2 flex items-center justify-center ${
                      sceneConfig.color === c.color ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  >
                    {sceneConfig.color === c.color && <Check className="w-5 h-5 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">Animation Speed</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{sceneConfig.speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={sceneConfig.speed}
                onChange={(e) => setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg"
              />
            </div>

            {/* Mesh Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">Distortion Factor</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{(sceneConfig.distortion || 0).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneConfig.distortion}
                onChange={(e) => setSceneConfig((prev) => ({ ...prev, distortion: parseFloat(e.target.value) }))}
                className="w-full accent-purple-500 cursor-pointer bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Wireframe Mode Toggle */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Box className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-white">Wireframe Render Mode</div>
                <div className="text-xs text-slate-400">Display geometry structural polygon wireframe</div>
              </div>
            </div>
            <button
              onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Modern Web Apps</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            High performance WebGL rendering combined with modern React server/client paradigms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "60+ FPS Hardware Acceleration",
              desc: "Smooth GPU-driven animations optimized with Three.js physical shaders and requestAnimationFrame loop management."
            },
            {
              icon: Layers,
              title: "Glassmorphism UI System",
              desc: "Frosted glass panels, dynamic backdrop blurs, and polished gradient borders designed for futuristic aesthetic appeal."
            },
            {
              icon: Sliders,
              title: "Real-Time State Binding",
              desc: "Direct bi-directional binding between DOM user interface controls and 3D WebGL material parameters."
            },
            {
              icon: Cpu,
              title: "Zero SSR Hydration Issues",
              desc: "Dynamic client-side lazy loading with non-blocking fallback states ensuring 100% hydration safety."
            },
            {
              icon: Shield,
              title: "Production Ready Architecture",
              desc: "Strict TypeScript type checking, modern ESLint rules, and streamlined Next.js App Router conventions."
            },
            {
              icon: Globe,
              title: "Cross-Device Responsive",
              desc: "Automated WebGL canvas viewport recalculation ensuring fluid frame rates across desktop, tablet, and mobile screens."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Specs & Benchmark Section */}
      <section id="specs" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>Under the Hood</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white leading-tight">
                Built on Next.js 16, React 19 & Three.js
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Combining Next.js Turbopack, Framer Motion motion curves, and React Three Fiber to build ultra-responsive 3D web applications with minimal JavaScript bundle overhead.
              </p>

              <div className="space-y-4">
                {[
                  "Dynamic client-side WebGL canvas initialization",
                  "Physics-driven spring cursor tracking",
                  "Tailwind CSS v4 inline theme customization",
                  "Turbopack optimized production compilation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-700/50 space-y-6">
              <div className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                System Benchmark Analysis
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Frame Stability (60 FPS Goal)</span>
                  <span className="text-emerald-400 font-bold">99.8%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[99.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">WebGL Shader Compilation Speed</span>
                  <span className="text-indigo-400 font-bold">&lt; 15ms</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[95%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Memory Allocation Overhead</span>
                  <span className="text-purple-400 font-bold">Optimal</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[90%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 font-mono flex items-center justify-between">
                <span>Turbopack Build Verified</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">READY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="relative z-10 py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-gradient-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Everything you need to know about integrating 3D WebGL scenes into modern web apps.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does 3D WebGL rendering impact mobile battery life and performance?",
              a: "Our WebGL setup uses optimized physical materials, vertex limits, and intelligent frame updates so the GPU is only actively rendering when required, maintaining high frame rates without excessive power drain."
            },
            {
              q: "Is Next.js Server-Side Rendering (SSR) compatible with Three.js?",
              a: "Yes! By leveraging Next.js dynamic imports with ssr: false, WebGL components render purely on the client side after hydration, preventing standard server-side window or canvas reference errors."
            },
            {
              q: "Can I customize the 3D geometries and shader materials further?",
              a: "Absolutely. You can attach custom React Three Fiber hooks, custom GLSL fragment/vertex shaders, or extend MeshPhysicalMaterial properties directly via state."
            },
            {
              q: "What technologies power this interactive platform?",
              a: "This application is built with Next.js 16, React 19, Three.js, @react-three/fiber, @react-three/drei, Framer Motion, and Tailwind CSS v4."
            }
          ].map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-semibold text-lg text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Newsletter Subscription Box */}
      <section className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
            Stay Updated on 3D Web Innovations
          </h3>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm sm:text-base">
            Subscribe to receive technical breakdowns, WebGL shader tutorials, and interactive design releases.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input px-5 py-3.5 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none flex-grow"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0 flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <span>{"\u2713 Subscribed"}</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Share2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-200">AURA 3D Platform</span>
          </div>

          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#studio" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Specs</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </div>

          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} AURA 3D Experience. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
