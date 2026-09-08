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
  Sliders,
  RotateCcw,
  Box,
  Check,
  ArrowRight,
  ChevronDown,
  Play
} from 'lucide-react'
import type { SceneConfig, ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-indigo-400 font-mono text-sm animate-pulse">
      Loading 3D WebGL Engine...
    </div>
  )
})

const defaultSceneConfig: SceneConfig = {
  shape: 'torusKnot',
  color: '#6366f1',
  speed: 1.5,
  distort: 0.45,
  wireframe: false,
  roughness: 0.2,
  metalness: 0.8,
  rotationSpeed: 1,
}

const presetThemes = [
  {
    name: 'Cosmic Nebula',
    config: {
      shape: 'torusKnot' as ShapeType,
      color: '#8b5cf6',
      speed: 1.8,
      distort: 0.55,
      wireframe: false,
      roughness: 0.15,
      metalness: 0.9,
      rotationSpeed: 1.2,
    }
  },
  {
    name: 'Cyber Core',
    config: {
      shape: 'icosahedron' as ShapeType,
      color: '#06b6d4',
      speed: 2.2,
      distort: 0.3,
      wireframe: true,
      roughness: 0.1,
      metalness: 1.0,
      rotationSpeed: 1.8,
    }
  },
  {
    name: 'Liquid Gold',
    config: {
      shape: 'sphere' as ShapeType,
      color: '#f59e0b',
      speed: 1.0,
      distort: 0.65,
      wireframe: false,
      roughness: 0.25,
      metalness: 0.85,
      rotationSpeed: 0.8,
    }
  },
  {
    name: 'Neon Matrix',
    config: {
      shape: 'octahedron' as ShapeType,
      color: '#10b981',
      speed: 1.6,
      distort: 0.2,
      wireframe: false,
      roughness: 0.3,
      metalness: 0.7,
      rotationSpeed: 1.5,
    }
  }
]

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>(defaultSceneConfig)
  const [activeTab, setActiveTab] = useState<'customizer' | 'presets'>('customizer')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const handleShapeChange = (shape: ShapeType) => {
    setSceneConfig((prev) => ({ ...prev, shape }))
  }

  const handleColorChange = (color: string) => {
    setSceneConfig((prev) => ({ ...prev, color }))
  }

  const handleSliderChange = (field: keyof SceneConfig, value: number) => {
    setSceneConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleToggleWireframe = () => {
    setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))
  }

  const resetConfig = () => {
    setSceneConfig(defaultSceneConfig)
  }

  const applyPreset = (presetConfig: SceneConfig) => {
    setSceneConfig(presetConfig)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setEmailSubmitted(true)
      setTimeout(() => setEmailSubmitted(false), 4000)
      setEmailInput('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Hero 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene config={sceneConfig} interactive={false} />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              AURA <span className="text-indigo-400 font-mono">3D</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#metrics" className="hover:text-indigo-400 transition-colors">Performance</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Presets</a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Launch Studio
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Gen WebGL 3D & Real-Time Shader FX</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.08]"
        >
          Elevate Your Web Experience With{' '}
          <span className="text-gradient-primary">Immersive 3D Motion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 leading-relaxed"
        >
          An ultra-modern, high-performance interface driven by Three.js WebGL rendering, silky Framer Motion transitions, and interactive visual customization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-base transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Interactive Customizer</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full glass hover:bg-slate-800/80 font-semibold text-base transition-all border border-slate-700/80 hover:border-slate-600 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current text-slate-300" />
            <span>Explore Architecture</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-slate-500 animate-bounce"
        >
          <a href="#customizer" className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest font-mono">
            Scroll to customize
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            3D <span className="text-gradient-secondary">Real-Time Studio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Interact with the WebGL viewport directly. Tweak parameters in real-time to preview dynamic lighting, geometry morphing, and material distortions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Viewport Box */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-2 relative h-[450px] sm:h-[550px] overflow-hidden border border-slate-800 flex flex-col">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>WebGL 2.0 Canvas — Active</span>
            </div>

            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={resetConfig}
                className="p-2 rounded-xl glass hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700"
                title="Reset to default config"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <Scene config={sceneConfig} interactive={true} />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 glass rounded-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 border border-slate-800">
              <span className="font-mono">Orbit: Drag to Rotate</span>
              <span className="font-mono text-indigo-400 capitalize">Shape: {sceneConfig.shape}</span>
            </div>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <span>Geometry Controls</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('customizer')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'customizer'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Custom
                  </button>
                  <button
                    onClick={() => setActiveTab('presets')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'presets'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Presets
                  </button>
                </div>
              </div>

              {activeTab === 'customizer' ? (
                <div className="space-y-6">
                  {/* Geometry Shape Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                      Select Geometry
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'torusKnot', label: 'Knot' },
                        { id: 'icosahedron', label: 'Icosa' },
                        { id: 'sphere', label: 'Sphere' },
                        { id: 'torus', label: 'Torus' },
                        { id: 'octahedron', label: 'Octa' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleShapeChange(item.id as ShapeType)}
                          className={`px-2 py-2 rounded-xl text-xs font-medium border transition-all ${
                            sceneConfig.shape === item.id
                              ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material Color Presets */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                      Material Theme
                    </label>
                    <div className="flex items-center gap-3">
                      {[
                        '#6366f1',
                        '#ec4899',
                        '#06b6d4',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                      ].map((c) => (
                        <button
                          key={c}
                          onClick={() => handleColorChange(c)}
                          className={`w-8 h-8 rounded-full transition-transform ${
                            sceneConfig.color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                      <input
                        type="color"
                        value={sceneConfig.color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        title="Custom Color"
                      />
                    </div>
                  </div>

                  {/* Distortion Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>Distortion Level</span>
                      <span>{(sceneConfig.distort * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={sceneConfig.distort}
                      onChange={(e) => handleSliderChange('distort', parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Speed Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>Float Speed</span>
                      <span>{sceneConfig.speed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="4"
                      step="0.2"
                      value={sceneConfig.speed}
                      onChange={(e) => handleSliderChange('speed', parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                    />
                  </div>

                  {/* Metallic & Wireframe */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                        <span>Metalness</span>
                        <span>{(sceneConfig.metalness * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={sceneConfig.metalness}
                        onChange={(e) => handleSliderChange('metalness', parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <button
                        onClick={handleToggleWireframe}
                        className={`w-full py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                          sceneConfig.wireframe
                            ? 'bg-purple-600/30 border-purple-500 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Wireframe: {sceneConfig.wireframe ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 mb-4">
                    Choose from curated color schemes and 3D geometric states:
                  </p>
                  {presetThemes.map((preset, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyPreset(preset.config)}
                      className="w-full p-4 rounded-2xl glass hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">{preset.name}</div>
                        <div className="text-xs text-slate-400 capitalize">
                          {preset.config.shape} • {preset.config.wireframe ? 'Wireframe' : 'Solid'}
                        </div>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full border border-slate-700"
                        style={{ backgroundColor: preset.config.color }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Updated Live</span>
              <span className="font-mono text-indigo-400">Three.js + React Three Fiber</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-mono text-indigo-400 tracking-wider uppercase mb-3"
          >
            Engineering Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Built for <span className="text-gradient-primary">Speed & Immersion</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Leveraging modern frontend technology stacks to deliver uninterrupted 60+ FPS visual experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: 'Hardware Acceleration',
              desc: 'Direct GPU shader pipeline execution via Three.js WebGL 2.0 rendering engine.'
            },
            {
              icon: Sparkles,
              title: 'Custom Shader FX',
              desc: 'Real-time noise distortion, particle field simulations, and dynamic glass reflections.'
            },
            {
              icon: Layers,
              title: 'Modular Layout',
              desc: 'Built with Next.js 16 App Router, React 19 Server Components, and smooth client hydrations.'
            },
            {
              icon: Zap,
              title: '60+ FPS Performance',
              desc: 'Optimized render loops and minimal garbage collection pauses for silky fluid interactions.'
            },
            {
              icon: Shield,
              title: 'Type-Safe Architecture',
              desc: 'Strict TypeScript interfaces and strict ESLint rule checks for bulletproof code quality.'
            },
            {
              icon: Globe,
              title: 'Global Accessibility',
              desc: 'Responsive layouts designed gracefully for desktops, tablets, and mobile devices.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-slate-800/80 bg-gradient-to-br from-slate-900/80 via-slate-950 to-indigo-950/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {[
              { stat: '120 FPS', label: 'Peak Refresh Rate' },
              { stat: '< 15ms', label: 'Render Latency' },
              { stat: '100%', label: 'WebGL Compatibility' },
              { stat: '0.0s', label: 'Layout Shift' }
            ].map((metric, idx) => (
              <div key={idx} className={`pt-6 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''}`}>
                <div className="text-4xl sm:text-5xl font-black text-gradient-primary tracking-tight mb-2">
                  {metric.stat}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-mono">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-16 border border-slate-800 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Stay ahead with <span className="text-gradient-secondary">AURA 3D</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Subscribe to receive developer updates, new WebGL shaders, and 3D visual component templates.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              {emailSubmitted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <span>Get Updates</span>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 glass py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-slate-300">AURA 3D Studio</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#metrics" className="hover:text-slate-300 transition-colors">Metrics</a>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
