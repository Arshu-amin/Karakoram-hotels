'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  Shield,
  Globe,
  Code2,
  ArrowRight,
  Sliders,
  Palette,
  Box,
  CheckCircle2,
  Share2,
  Play
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950/80 animate-pulse" />
})

const colorOptions = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Neon Purple', value: '#a855f7' },
  { name: 'Cyber Pink', value: '#ec4899' },
  { name: 'Ocean Cyan', value: '#06b6d4' },
  { name: 'Emerald Glow', value: '#10b981' },
]

const shapeOptions: Array<{ name: string; value: 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron' }> = [
  { name: 'Torus Knot', value: 'torusKnot' },
  { name: 'Icosahedron', value: 'icosahedron' },
  { name: 'Torus', value: 'torus' },
  { name: 'Octahedron', value: 'octahedron' },
]

export default function Home() {
  // 3D Scene Interactive State
  const [sceneParams, setSceneParams] = useState({
    color: '#6366f1',
    speed: 1,
    shape: 'torusKnot' as 'torusKnot' | 'icosahedron' | 'torus' | 'octahedron',
    wireframe: false,
    scale: 1,
    distort: 0.4,
  })

  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene {...sceneParams} />
      </div>

      {/* Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Box className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Architecture</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Subscribe</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next Generation 3D Web Framework</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Immersive Digital <br className="hidden sm:inline" />
            <span className="text-gradient-primary">Realities Redefined</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
          >
            Experience fluid WebGL graphics, glassmorphic interfaces, and real-time interactive 3D elements powered by modern Web APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#customizer"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full font-semibold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25 flex items-center gap-3 text-lg"
            >
              <span>Explore Studio</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-slate-800/60 rounded-full font-semibold text-slate-200 transition-all transform hover:scale-105 active:scale-95 border border-slate-700/80 text-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span>See Features</span>
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { label: 'Frame Rate', value: '120 FPS' },
              { label: 'Latency', value: '< 16ms' },
              { label: 'Lighting Engine', value: 'Physical PBR' },
              { label: 'Responsiveness', value: '100% Adaptive' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-bold text-indigo-300">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 3D Customizer Studio Section */}
        <section id="customizer" className="scroll-mt-20 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Palette className="w-3.5 h-3.5" />
              <span>Real-Time WebGL Control</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary mb-4">
              Interactive 3D Studio
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Modify WebGL canvas parameters in real-time. Watch geometry, shaders, and material dynamics update live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <span>Geometry & Material</span>
              </h3>

              {/* Shape Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-3">
                  Select Mesh Geometry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSceneParams((prev) => ({ ...prev, shape: option.value }))}
                      className={`px-3 py-2.5 text-xs font-medium rounded-xl border transition-all ${
                        sceneParams.shape === option.value
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                          : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-3">
                  Material Palette
                </label>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setSceneParams((prev) => ({ ...prev, color: c.value }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
                        sceneParams.color === c.value ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Animation Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400">{sceneParams.speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={sceneParams.speed}
                  onChange={(e) => setSceneParams((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Distortion Intensity Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Mesh Distortion</span>
                  <span className="text-indigo-400">{sceneParams.distort}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sceneParams.distort}
                  onChange={(e) => setSceneParams((prev) => ({ ...prev, distort: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold uppercase text-slate-400">
                  Wireframe Render Mode
                </span>
                <button
                  onClick={() => setSceneParams((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    sceneParams.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      sceneParams.wireframe ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Visualizer Status Display */}
            <div className="lg:col-span-2 glass-card p-8 rounded-3xl border border-slate-800 min-h-[380px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest">
                      WebGL Canvas Active
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{"// THREE.MeshDistortMaterial"}</span>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  The background WebGL canvas renders in real-time, responding dynamically to user interactions, scroll velocity, and parameter toggles.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-500 block mb-1">GEOMETRY</span>
                    <span className="text-indigo-300 font-bold uppercase">{sceneParams.shape}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-500 block mb-1">COLOR HEX</span>
                    <span className="text-indigo-300 font-bold">{sceneParams.color}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-500 block mb-1">WIREFRAME</span>
                    <span className="text-indigo-300 font-bold">{sceneParams.wireframe ? 'ENABLED' : 'DISABLED'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>FPS: 120 Stable</span>
                <span>Shader Compiler: WebGL2 / GLSL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="scroll-mt-20 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient-primary mb-4">
              Engineered for Modern Web Performance
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Combining cutting-edge rendering technologies with seamless component design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'High Performance GPU Rendering',
                desc: 'Utilizes React Three Fiber and Three.js for hardware-accelerated 3D visual effects rendered at high refresh rates.',
              },
              {
                icon: Layers,
                title: 'Glassmorphism Design System',
                desc: 'Tailwind CSS v4 inline themes with custom frosted glass layers, dynamic backdrop blur, and text gradients.',
              },
              {
                icon: Zap,
                title: 'Spring Animated Micro-interactions',
                desc: 'Powered by Framer Motion for responsive gestures, hover physics, and interactive custom spring cursor.',
              },
              {
                icon: Shield,
                title: 'Next.js 16 App Router',
                desc: 'Server-side pre-rendering with dynamic WebGL components loaded on demand for minimal layout shift.',
              },
              {
                icon: Globe,
                title: 'Cross-Device Adaptive Visuals',
                desc: 'Optimized camera viewports and geometry scales ensuring fluid playback on desktop and mobile screens.',
              },
              {
                icon: Code2,
                title: 'Clean Modular Architecture',
                desc: 'Fully typed with TypeScript, modular component structure, and compliant with modern ESLint standards.',
              },
            ].map((feature, i) => {
              const IconComp = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all group hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Architecture Specs Section */}
        <section id="specs" className="scroll-mt-20 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl border border-slate-800 p-8 sm:p-12 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Tech Stack Details</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6">
                  Built on Modern Industry Standards
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Aura 3D combines Next.js 16, React 19, Three.js, and Framer Motion into an integrated web framework built for visual richness.
                </p>

                <div className="space-y-4">
                  {[
                    'Next.js 16 Turbopack build engine',
                    'React 19 Concurrent Rendering features',
                    'Three.js PBR physical materials with fog & distortion',
                    'Framer Motion smooth scroll spring physics',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 font-mono text-xs text-slate-300 space-y-4">
                <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-3">
                  <span>package.json</span>
                  <Share2 className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <span className="text-purple-400">&quot;dependencies&quot;</span>: &#123;
                </div>
                <div className="pl-4 space-y-1 text-slate-400">
                  <p><span className="text-indigo-300">&quot;next&quot;</span>: <span className="text-emerald-400">&quot;^16.2.9&quot;</span>,</p>
                  <p><span className="text-indigo-300">&quot;react&quot;</span>: <span className="text-emerald-400">&quot;^19.2.4&quot;</span>,</p>
                  <p><span className="text-indigo-300">&quot;three&quot;</span>: <span className="text-emerald-400">&quot;^0.184.0&quot;</span>,</p>
                  <p><span className="text-indigo-300">&quot;@react-three/fiber&quot;</span>: <span className="text-emerald-400">&quot;^9.6.1&quot;</span>,</p>
                  <p><span className="text-indigo-300">&quot;framer-motion&quot;</span>: <span className="text-emerald-400">&quot;^12.40.0&quot;</span></p>
                </div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="contact" className="scroll-mt-20 max-w-4xl mx-auto py-20 px-4 text-center">
          <div className="glass-card p-10 sm:p-14 rounded-3xl border border-slate-800 relative glow-box">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-primary mb-4">
              Stay Connected
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Join our newsletter for updates on modern frontend engineering, WebGL, and interactive UI design.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-200 font-semibold text-base inline-flex items-center gap-2"
              >
                <span>{"\u2713 Subscribed! Thank you for joining."}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 font-semibold text-white rounded-full text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-900 py-12 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-slate-400">AURA 3D</span>
              <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Systems Operational
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
