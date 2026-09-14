'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Box,
  Layers,
  Cpu,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  Menu,
  X,
  Code2,
  Maximize2
} from 'lucide-react'
import type { ShapeType, SceneProps } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <Sparkles className="w-6 h-6 text-indigo-400 absolute animate-pulse" />
      </div>
    </div>
  )
})

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 3D Customizer state
  const [sceneConfig, setSceneConfig] = useState<SceneProps>({
    color: '#6366f1',
    shape: 'torusKnot',
    speed: 1,
    distort: 0.35,
    wireframe: false,
  })

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const colorPresets = [
    { label: 'Indigo', value: '#6366f1' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Pink', value: '#ec4899' },
    { label: 'Cyan', value: '#38bdf8' },
    { label: 'Emerald', value: '#10b981' },
  ]

  const shapesList: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'dodecahedron', label: 'Dodecahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'octahedron', label: 'Octahedron' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D Canvas Container */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene {...sceneConfig} />
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
              <Box className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Aura<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-white transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#stats" className="hover:text-white transition-colors">
              Metrics
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Try Studio
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-6"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white py-2"
                >
                  Overview
                </a>
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white py-2"
                >
                  3D Studio
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white py-2"
                >
                  Features
                </a>
                <a
                  href="#stats"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white py-2"
                >
                  Metrics
                </a>
                <a
                  href="#customizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 w-full text-center px-5 py-3 rounded-xl font-semibold bg-indigo-600 text-white"
                >
                  Try Studio
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-16 text-center pointer-events-none"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Interactive WebGL 3D Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Shape the <br />
            <span className="text-gradient-primary">Next Generation</span> <br />
            of Web Design
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-slate-400 max-w-2xl mb-12 font-normal leading-relaxed"
          >
            Experience dynamic real-time WebGL graphics seamlessly unified with
            ultra-responsive modern web interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>Explore 3D Studio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-slate-300 glass hover:bg-slate-800/60 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 border border-slate-800"
            >
              View Capabilities
            </a>
          </motion.div>
        </div>

        {/* Hero Quick Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pointer-events-auto mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-5xl w-full px-4"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS', icon: Zap },
            { label: 'WebGL Engine', value: 'Three.js', icon: Layers },
            { label: 'Physics Engine', value: 'Reactive', icon: Cpu },
            { label: 'Optimization', value: '100%', icon: Globe },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-4 h-4" /> Real-time Studio
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Customize the <span className="text-gradient-secondary">3D Environment</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Interact with live parameters below to tweak the real-time WebGL mesh background in real time.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-10 rounded-3xl max-w-4xl mx-auto border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shape Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-3">
                {shapesList.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() =>
                      setSceneConfig((prev) => ({ ...prev, shape: shape.id }))
                    }
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border text-left flex items-center justify-between ${
                      sceneConfig.shape === shape.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{shape.label}</span>
                    {sceneConfig.shape === shape.id && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Material Color
              </label>
              <div className="flex flex-wrap gap-3 mb-6">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() =>
                      setSceneConfig((prev) => ({ ...prev, color: preset.value }))
                    }
                    className={`group relative w-10 h-10 rounded-full transition-transform duration-200 ${
                      sceneConfig.color === preset.value
                        ? 'scale-110 ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: preset.value }}
                    title={preset.label}
                  />
                ))}
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-sm font-medium text-slate-300">
                  Wireframe Rendering
                </span>
                <button
                  onClick={() =>
                    setSceneConfig((prev) => ({
                      ...prev,
                      wireframe: !prev.wireframe,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Rotation Velocity
                </label>
                <span className="text-xs text-indigo-400 font-mono">
                  {sceneConfig.speed?.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={sceneConfig.speed || 1}
                onChange={(e) =>
                  setSceneConfig((prev) => ({
                    ...prev,
                    speed: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Mesh Distortion
                </label>
                <span className="text-xs text-indigo-400 font-mono">
                  {((sceneConfig.distort || 0) * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneConfig.distort || 0.35}
                onChange={(e) =>
                  setSceneConfig((prev) => ({
                    ...prev,
                    distort: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4" /> Feature Highlights
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Combines cutting-edge frontend tooling with GPU-accelerated graphics for seamless user interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Lightning WebGL Rendering',
              desc: 'Optimized render loop running smoothly at 60 FPS across desktop and mobile devices.',
            },
            {
              icon: Sliders,
              title: 'Dynamic State Sync',
              desc: 'Instant bidirectional reactive state updating 3D physical shaders in real-time.',
            },
            {
              icon: Code2,
              title: 'Modern Stack Built-In',
              desc: 'Architected with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.',
            },
            {
              icon: Maximize2,
              title: 'Responsive & Fluid',
              desc: 'Auto-scaling camera projection and flexible WebGL viewports adapted for all screen sizes.',
            },
            {
              icon: Layers,
              title: 'Glassmorphism Design',
              desc: 'Custom glass translucent UI layers designed over deep space particle fields.',
            },
            {
              icon: Sparkles,
              title: 'Smooth Physics Animations',
              desc: 'Integrated spring-physics mouse followers and fluid Framer Motion scroll triggers.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics / Stats Section */}
      <section id="stats" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-indigo-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { stat: '100%', label: 'Typesafe Codebase' },
              { stat: '0.1s', label: 'Realtime Latency' },
              { stat: '60+', label: 'FPS Smoothness' },
              { stat: '100', label: 'Lighthouse Score' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-4xl sm:text-6xl font-extrabold text-gradient-primary mb-2">
                  {item.stat}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="glass-card p-10 sm:p-14 rounded-3xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base sm:text-lg">
              Get notified about updates, new 3D shader primitives, and interactive UI components.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold">
                  {"\u2713 Subscribed! Thanks for joining."}
                </span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-4 rounded-full bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-600/25 text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-slate-300">Aura3D</span>
          </div>
          <p>© 2026 Aura3D Studio. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              Github
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
