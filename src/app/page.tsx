'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Sliders,
  Zap,
  Layers,
  Cpu,
  Shield,
  ArrowRight,
  Code2,
  CheckCircle2,
  ChevronDown,
  RotateCw,
  Maximize2,
  Eye,
  Check,
  Box
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-indigo-400">Loading WebGL Scene...</span>
      </div>
    </div>
  )
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torus',
    color: '#6366f1',
    speed: 1.5,
    scale: 1.2,
    wireframe: false,
    metalness: 0.8,
    roughness: 0.2,
  })

  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [activeTab, setActiveTab] = useState<'rendering' | 'materials' | 'shaders'>('rendering')

  const colorPresets = [
    { name: 'Neon Indigo', value: '#6366f1' },
    { name: 'Cyber Cyan', value: '#06b6d4' },
    { name: 'Emerald Pulse', value: '#10b981' },
    { name: 'Sunset Crimson', value: '#f43f5e' },
    { name: 'Solar Gold', value: '#f59e0b' },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
            Next-Gen Interactive Web Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.1]"
        >
          Craft Immersive{' '}
          <span className="text-gradient-primary">3D Digital</span> Experiences
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-12 font-normal leading-relaxed text-slate-300/90"
        >
          A high-performance WebGL platform combining React 19, Three.js, and modern glassmorphism UI for effortless interactive rendering.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#customizer"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-full font-bold text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95"
          >
            <Sliders className="w-5 h-5" />
            Launch 3D Studio
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-4 glass hover:bg-slate-800/80 rounded-full font-semibold text-slate-200 hover:text-white border border-slate-700/60 transition-all transform hover:scale-105 active:scale-95"
          >
            Explore Capabilities
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Quick Tweak Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-3 rounded-full flex items-center gap-3 max-w-md w-full border border-slate-800/80 shadow-2xl"
        >
          <span className="text-xs font-mono text-slate-400 pl-3">Presets:</span>
          <div className="flex items-center gap-2 flex-1 justify-center">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSceneConfig((prev) => ({ ...prev, color: preset.value }))}
                style={{ backgroundColor: preset.value }}
                className={`w-6 h-6 rounded-full transition-transform hover:scale-125 ${
                  sceneConfig.color === preset.value ? 'ring-2 ring-white scale-110' : 'opacity-80'
                }`}
                title={preset.name}
              />
            ))}
          </div>
          <button
            onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
            className={`px-3 py-1 rounded-full text-xs font-mono font-medium border transition-colors ${
              sceneConfig.wireframe
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Wireframe
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#customizer"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-slate-500">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-indigo-400" />
        </motion.a>
      </section>

      {/* Interactive 3D Studio / Customizer Section */}
      <section id="customizer" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" /> Real-Time Engine Studio
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Interactive 3D Scene Controls
          </h2>
          <p className="text-slate-400 text-lg">
            Tweak mesh geometries, material parameters, and rotation dynamics live in the browser context.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-8">
            {/* Shape Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
                3D Geometry Shape
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'torus', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'box', label: 'Cyber Box' },
                  { id: 'ring', label: 'Torus Ring' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, shape: s.id as SceneConfig['shape'] }))}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                      sceneConfig.shape === s.id
                        ? 'bg-indigo-600/90 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
                Surface Color Preset
              </label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSceneConfig((prev) => ({ ...prev, color: preset.value }))}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all ${
                      sceneConfig.color === preset.value
                        ? 'bg-slate-800 text-white border-indigo-400 ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.value }} />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/60">
              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300 flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-indigo-400" /> Rotation Speed
                  </span>
                  <span className="font-mono text-indigo-400">{sceneConfig.speed?.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={sceneConfig.speed || 1.5}
                  onChange={(e) => setSceneConfig((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-purple-400" /> Mesh Scale
                  </span>
                  <span className="font-mono text-purple-400">{sceneConfig.scale?.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="2.0"
                  step="0.1"
                  value={sceneConfig.scale || 1.2}
                  onChange={(e) => setSceneConfig((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Metalness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" /> Metalness
                  </span>
                  <span className="font-mono text-pink-400">{((sceneConfig.metalness || 0.8) * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sceneConfig.metalness ?? 0.8}
                  onChange={(e) => setSceneConfig((prev) => ({ ...prev, metalness: parseFloat(e.target.value) }))}
                  className="w-full accent-pink-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" /> Wireframe Render
                </span>
                <button
                  onClick={() => setSceneConfig((prev) => ({ ...prev, wireframe: !prev.wireframe }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
          </div>

          {/* Engine Specs Card */}
          <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-slate-800/80 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <Cpu className="w-5 h-5 text-indigo-400" /> Live WebGL Specs
            </h3>

            <div className="space-y-4 text-sm font-mono">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-400">Target Frame Rate</span>
                <span className="text-emerald-400 font-semibold">60.0 FPS</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-400">Geometry Type</span>
                <span className="text-indigo-300 capitalize">{sceneConfig.shape}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-400">Shading Model</span>
                <span className="text-purple-300">MeshPhysical</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/40">
                <span className="text-slate-400">Wireframe</span>
                <span className={sceneConfig.wireframe ? 'text-indigo-400' : 'text-slate-500'}>
                  {sceneConfig.wireframe ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Particle Buffers</span>
                <span className="text-cyan-400">1,200 Nodes</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
              <p>
                <strong>Hardware Acceleration:</strong> Using GPU fragment shaders and physical material clearcoats for real-time metallic reflections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Platform Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for Modern Web Visuals
          </h2>
          <p className="text-slate-400 text-lg">
            Built on a cutting-edge technical architecture optimized for high performance, smooth animation, and accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              color: 'text-amber-400',
              title: '60 FPS Hardware Acceleration',
              desc: 'Leverages WebGL and GPU hardware acceleration for smooth 60 FPS 3D mesh rendering.',
            },
            {
              icon: Sparkles,
              color: 'text-indigo-400',
              title: 'Physical Material Shading',
              desc: 'High-fidelity MeshPhysicalMaterial support with clearcoat, reflectivity, and metalness controls.',
            },
            {
              icon: Layers,
              color: 'text-purple-400',
              title: 'Particle Field Architecture',
              desc: 'Custom buffer geometry particle fields running in background layers for visual depth.',
            },
            {
              icon: Sliders,
              color: 'text-pink-400',
              title: 'DOM-to-WebGL State Pipeline',
              desc: 'Seamless real-time synchronization between DOM controls and WebGL canvas components.',
            },
            {
              icon: Shield,
              color: 'text-emerald-400',
              title: 'Next.js 16 & Turbopack',
              desc: 'Optimized SSR hydration boundary and Turbopack builds for instant page loading.',
            },
            {
              icon: Code2,
              color: 'text-cyan-400',
              title: 'Modern Glassmorphism UI',
              desc: 'Polished glass backdrop filters, spring cursor animations, and glowing text gradients.',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700/80 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Architecture & Code Showcase Section */}
      <section id="architecture" className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" /> Developer Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Modular React 19 & Three.js Integration
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Clean component separation between SSR layout layers and client-side WebGL canvas contexts allows for robust SEO and optimal frame rates.
              </p>

              {/* Interactive Tabs */}
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: 'rendering', label: 'Rendering' },
                  { id: 'materials', label: 'Materials' },
                  { id: 'shaders', label: 'Shaders' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                {activeTab === 'rendering' && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-indigo-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      Dynamic SSR-free dynamic import with fallback skeleton.
                    </p>
                    <p className="flex items-center gap-2 text-indigo-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      Single continuous render loop powered by React Three Fiber clock.
                    </p>
                  </div>
                )}
                {activeTab === 'materials' && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-purple-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      MeshPhysicalMaterial with clearcoat reflection and emissive glow.
                    </p>
                    <p className="flex items-center gap-2 text-purple-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      Live wireframe toggle for debug inspections.
                    </p>
                  </div>
                )}
                {activeTab === 'shaders' && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-cyan-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Particle buffer geometry with additive alpha blending.
                    </p>
                    <p className="flex items-center gap-2 text-cyan-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Orbital satellites with independent rotation vectors.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-950 border border-slate-800 p-6 font-mono text-xs text-slate-300 overflow-x-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-slate-500 ml-2 font-sans text-xs">Scene.tsx</span>
                </div>
                <span className="text-indigo-400">TypeScript</span>
              </div>
              <pre className="text-slate-300 leading-relaxed">
                <code>
                  {`// Interactive WebGL Engine
export default function Scene({ config }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} />
      <ParticleField count={1200} />
      <MainMesh config={config} />
      <OrbitControls autoRotate rotateSpeed={0.5} />
    </Canvas>
  )
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Access CTA Section */}
      <section id="contact" className="relative z-10 max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Stay Updated with Aura3D
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Subscribe to receive developer updates, new 3D mesh shaders, and release notes.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center justify-center gap-3 max-w-md mx-auto"
            >
              <Check className="w-5 h-5 text-emerald-400" />
              <span>{"\u2713 Subscribed successfully! Welcome to Aura3D."}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white text-sm shadow-lg shadow-indigo-500/25 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
