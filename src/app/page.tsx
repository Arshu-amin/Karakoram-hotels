'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Sliders,
  Globe,
  ArrowRight,
  RotateCcw,
  Palette,
  Box,
  Activity,
  ShieldCheck
} from 'lucide-react'
import { SceneConfig, defaultConfig, ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-indigo-400">
        <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium tracking-wide">Initializing 3D Engine...</span>
      </div>
    </div>
  )
})

const colorOptions = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Neon Rose', value: '#ec4899' },
  { name: 'Emerald Cyber', value: '#10b981' },
  { name: 'Amber Glow', value: '#f59e0b' },
  { name: 'Ocean Cyan', value: '#38bdf8' }
]

const shapeOptions: { label: string; value: ShapeType }[] = [
  { label: 'Torus Knot', value: 'torusKnot' },
  { label: 'Icosahedron', value: 'icosahedron' },
  { label: 'Dodecahedron', value: 'dodecahedron' },
  { label: 'Sphere', value: 'sphere' }
]

export default function Home() {
  const [config, setConfig] = useState<SceneConfig>(defaultConfig)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const { scrollY } = useScroll()
  const opacityScene = useTransform(scrollY, [0, 800], [0.85, 0.25])
  const scaleScene = useTransform(scrollY, [0, 800], [1, 0.85])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const resetConfig = () => setConfig(defaultConfig)

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background Fixed 3D Canvas */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ opacity: opacityScene, scale: scaleScene }}
      >
        <Scene config={config} />
      </motion.div>

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full border border-slate-800/80 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#tech" className="hover:text-indigo-400 transition-colors">Technology</a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2 text-xs md:text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all shadow-md shadow-indigo-500/20"
          >
            Launch Studio
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation Interactive 3D Frontend</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight"
        >
          Immersive Web Visuals <br />
          <span className="text-gradient-primary">Engineered in 3D</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-slate-400 text-lg md:text-2xl max-w-2xl mb-12 font-light leading-relaxed"
        >
          Experience real-time WebGL customization, fluid motion interactions,
          and glassmorphism design crafted with Next.js and Three.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Customize 3D Object</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 font-semibold text-slate-300 transition-all border border-slate-700/60"
          >
            Explore Platform
          </a>
        </motion.div>

        {/* Floating Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS' },
            { label: 'Bundle Footprint', value: '< 150 KB' },
            { label: 'WebGL Shader', value: 'Physical Material' },
            { label: 'Animations', value: 'Fluid Spring' }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-4 rounded-2xl text-center">
              <div className="text-xl md:text-2xl font-bold text-indigo-300">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-28 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real-Time <span className="text-gradient-secondary">3D Studio Control</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
            Directly adjust WebGL parameters below and watch the background scene morph instantly.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-10 rounded-3xl max-w-3xl mx-auto shadow-2xl border border-slate-800"
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-lg text-white">Scene Parameters</span>
            </div>
            <button
              onClick={resetConfig}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg glass"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>

          <div className="space-y-6">
            {/* Shape Switcher */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Select Geometry Shape
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {shapeOptions.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setConfig((prev) => ({ ...prev, shape: item.value }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                      config.shape === item.value
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <Palette className="w-4 h-4 text-indigo-400" />
                Material Hue & Accent
              </label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setConfig((prev) => ({ ...prev, color: c.value }))}
                    className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
                      config.color === c.value
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Rotation Speed</span>
                  <span className="text-indigo-400">{config.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                  <span>Scale Factor</span>
                  <span className="text-indigo-400">{config.scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={config.scale}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-800/80">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.distort}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, distort: e.target.checked }))
                  }
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300">Organic Mesh Distortion</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.wireframe}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, wireframe: e.target.checked }))
                  }
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300">Wireframe Mesh Mode</span>
              </label>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient-primary">Modern Web Apps</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Leveraging state-of-the-art WebGL techniques with reactive UI components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Ultra High Performance',
              desc: 'Leveraging React Three Fiber & WebGL shaders to deliver smooth 60 FPS animations across modern devices.'
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Frosted glass effects, glowing borders, and reactive hover interactions designed for clean aesthetics.'
            },
            {
              icon: Activity,
              title: 'Dynamic State Sync',
              desc: 'Seamless real-time synchronization between standard DOM input controls and complex WebGL materials.'
            },
            {
              icon: Globe,
              title: 'Responsive & Accessible',
              desc: 'Fully fluid layout supporting mobile viewports, high DPI screens, and custom pointer spring animations.'
            },
            {
              icon: ShieldCheck,
              title: 'SSR & Turbopack Ready',
              desc: 'Optimized dynamic loading with Next.js App Router for instant load times and zero SSR hydration errors.'
            },
            {
              icon: Sparkles,
              title: 'Custom Spring Cursor',
              desc: 'Interactive smooth spring cursor tracking that scales when hovering interactive elements and buttons.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl group transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Banner Section */}
      <section id="tech" className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
        <div className="glass-card p-10 rounded-3xl text-center border border-slate-800">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Powered by Modern Frontend Architecture</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-slate-400 font-semibold text-sm md:text-base">
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">Next.js 16</span>
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">React 19</span>
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">Three.js</span>
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">React Three Fiber</span>
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">Tailwind CSS v4</span>
            <span className="px-4 py-2 rounded-xl glass hover:text-indigo-400 transition-colors">Framer Motion</span>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-24 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-16 rounded-3xl border border-indigo-500/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Stay Updated with <span className="text-gradient-primary">Aura3D</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 text-base md:text-lg">
            Join our developer newsletter to receive updates on 3D WebGL components, performance techniques, and design systems.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              {subscribed ? "\u2713 Subscribed" : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">Aura3D Studio</span>
          </div>
          <p>© 2026 Aura3D. Built with Next.js, Three.js & Tailwind CSS.</p>
          <div className="flex gap-4 text-xs">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#tech" className="hover:text-slate-300 transition-colors">Tech</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
