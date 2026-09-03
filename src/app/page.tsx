'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Palette,
  Sliders,
  Box,
  RotateCw,
  Eye,
  Check,
  ArrowRight
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      <span className="text-slate-400 text-sm font-medium tracking-wide">Initializing 3D WebGL Scene...</span>
    </div>
  )
})

const presetColors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6']

export default function Home() {
  // 3D Scene Interactive Controls State
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    speed: 1,
    scale: 1,
    color: '#6366f1',
    wireframe: false,
    particleCount: 1500,
    distort: 0.4,
    metalness: 0.8,
    roughness: 0.2,
  })

  // Form state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Hero 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene config={sceneConfig} />
      </div>

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 z-50 glass border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">
              3D Customizer
            </a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">
              Metrics
            </a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">
              Community
            </a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Launch Customizer
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Generation 3D Web Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.1]"
        >
          Elevate Your Digital Space with{' '}
          <span className="text-gradient-primary">Interactive 3D Graphics</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          Build immersive, fluid, high-performance web experiences powered by Next.js 16,
          Three.js, WebGL, and Framer Motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30"
          >
            <span>Try 3D Studio</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-slate-800/80 text-slate-200 font-semibold border border-slate-700/80 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Explore Capabilities</span>
          </a>
        </motion.div>

        {/* Hero Quick Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full"
        >
          {[
            { label: 'WebGL FPS', val: '60 FPS' },
            { label: 'Latency', val: '< 15ms' },
            { label: 'Materials', val: 'Physical PBR' },
            { label: 'Compatibility', val: '100% Modern' }
          ].map((metric, index) => (
            <div key={index} className="p-4 rounded-xl glass border border-slate-800/60">
              <div className="text-2xl font-bold text-indigo-300">{metric.val}</div>
              <div className="text-xs text-slate-400 mt-1">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer / Studio Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Customize 3D geometry, color, metallic attributes, and animation distortion live in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Viewport Box */}
          <div className="lg:col-span-7 h-[450px] lg:h-[580px] rounded-3xl glass border border-slate-800/80 overflow-hidden relative group">
            <Scene config={sceneConfig} />

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-mono text-indigo-300 border border-slate-700/50 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Shape: {sceneConfig.shape}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-2xl border border-slate-700/50 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
              <span>Interactive Orbit Controls Active</span>
              <span className="text-indigo-400">Drag to rotate object</span>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <Sliders className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-slate-100">Control Panel</h3>
              </div>

              {/* Geometry Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Geometry Mesh
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['torusKnot', 'icosahedron', 'sphere', 'box', 'torus'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSceneConfig({ ...sceneConfig, shape })}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                        sceneConfig.shape === shape
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {shape.replace('Knot', ' Knot')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Material Color
                </label>
                <div className="flex items-center gap-3">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSceneConfig({ ...sceneConfig, color })}
                      className={`w-9 h-9 rounded-full transition-transform hover:scale-110 flex items-center justify-center border-2 ${
                        sceneConfig.color === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    value={sceneConfig.color}
                    onChange={(e) => setSceneConfig({ ...sceneConfig, color: e.target.value })}
                    className="w-9 h-9 rounded-full bg-transparent border-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Rotation Speed</span>
                    <span className="text-indigo-400">{sceneConfig.speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={sceneConfig.speed}
                    onChange={(e) => setSceneConfig({ ...sceneConfig, speed: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-500 bg-slate-900 rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Distortion Factor</span>
                    <span className="text-indigo-400">{sceneConfig.distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sceneConfig.distort}
                    onChange={(e) => setSceneConfig({ ...sceneConfig, distort: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-500 bg-slate-900 rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Scale Factor</span>
                    <span className="text-indigo-400">{sceneConfig.scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.1"
                    value={sceneConfig.scale}
                    onChange={(e) => setSceneConfig({ ...sceneConfig, scale: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-500 bg-slate-900 rounded-lg h-2"
                  />
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-sm font-medium text-slate-300">Wireframe View</span>
                <button
                  onClick={() => setSceneConfig({ ...sceneConfig, wireframe: !sceneConfig.wireframe })}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    sceneConfig.wireframe
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {sceneConfig.wireframe ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Preset Actions */}
            <div className="pt-6 border-t border-slate-800/80 flex gap-3">
              <button
                onClick={() =>
                  setSceneConfig({
                    shape: 'torusKnot',
                    speed: 1,
                    scale: 1,
                    color: '#6366f1',
                    wireframe: false,
                    particleCount: 1500,
                    distort: 0.4,
                    metalness: 0.8,
                    roughness: 0.2,
                  })
                }
                className="w-full py-3 rounded-xl glass hover:bg-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700/60"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Built for <span className="text-gradient-primary">Modern Web Standards</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Combining cutting-edge 3D real-time WebGL graphics with seamless component reactivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'WebGL & Three.js Engine',
              desc: 'High-performance real-time 3D rendering optimized for high frame rates across desktop and mobile devices.'
            },
            {
              icon: Layers,
              title: 'Glassmorphism Aesthetics',
              desc: 'Beautiful modern backdrop blur filters, glowing borders, and translucent UI layering.'
            },
            {
              icon: Zap,
              title: 'Framer Motion Physics',
              desc: 'Fluid layout animations, spring cursor transitions, and scroll-linked element reveals.'
            },
            {
              icon: Palette,
              title: 'Real-Time Color & Shaders',
              desc: 'Dynamic PBR material customization with customizable distortion, metalness, and roughness.'
            },
            {
              icon: ShieldCheck,
              title: 'SSR & Turbopack Ready',
              desc: 'Architected for Next.js 16 App Router with zero hydration shifts and dynamic WebGL loading.'
            },
            {
              icon: Sparkles,
              title: 'Interactive Particle Fields',
              desc: 'Ambient starfield particle systems engineered with zero memory leaks.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Stats Showcase */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
        <div className="glass p-12 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-slate-950/90">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-2 block">
                Technology Stack
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Powered by Industry-Leading Frameworks
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Aura3D integrates Next.js 16, React 19, Three.js, React Three Fiber, and Tailwind CSS v4 into a unified, high-octane web platform.
              </p>

              <div className="flex flex-wrap gap-3">
                {['Next.js 16', 'React 19', 'Three.js', 'R3F', 'Tailwind v4', 'Framer Motion', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-indigo-300 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { count: '60+', label: 'Frames Per Second' },
                { count: '100%', label: 'Typescript Coverage' },
                { count: '0.2s', label: 'Initial WebGL Load' },
                { count: '100%', label: 'Responsive Design' }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl glass border border-slate-800/80 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gradient-primary mb-2">
                    {stat.count}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section id="newsletter" className="relative z-10 max-w-4xl mx-auto px-6 py-24 scroll-mt-24">
        <div className="glass p-12 rounded-3xl border border-indigo-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <Eye className="w-10 h-10 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Stay Connected with Aura3D
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Subscribe to receive updates on new 3D shaders, WebGL performance techniques, and releases.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold max-w-md mx-auto flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed! Welcome to Aura3D."}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Box className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-300">Aura3D Experience</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Metrics</a>
            <a href="#newsletter" className="hover:text-indigo-400 transition-colors">Newsletter</a>
          </div>

          <div className="text-xs">
            © {new Date().getFullYear()} Aura3D. All rights reserved. Built with Next.js & WebGL.
          </div>
        </div>
      </footer>
    </main>
  )
}
