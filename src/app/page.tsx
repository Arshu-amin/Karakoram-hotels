'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Palette,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
  Activity,
  Flame,
  Check,
  RotateCcw,
  Box,
  Eye,
} from 'lucide-react'
import type { SceneConfig, ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase">Initializing WebGL Engine...</span>
    </div>
  ),
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1,
    distort: 0.35,
    wireframe: false,
    scale: 1,
  })

  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleShapeChange = (shape: ShapeType) => {
    setSceneConfig((prev) => ({ ...prev, shape }))
  }

  const handleColorChange = (color: string) => {
    setSceneConfig((prev) => ({ ...prev, color }))
  }

  const presetColors = [
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Cyan', hex: '#06b6d4' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Amber', hex: '#f59e0b' },
    { name: 'Purple', hex: '#a855f7' },
  ]

  const shapeOptions: { id: ShapeType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'torus', label: 'Torus Ring' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background WebGL Scene Container */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene config={sceneConfig} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-24 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-semibold tracking-wide text-indigo-300 mb-8 shadow-lg shadow-indigo-500/10"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next-Generation 3D Web Framework
          <span className="text-slate-500">|</span>
          <span className="text-white font-mono">React 19 & Next.js 16</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl mb-8 leading-[1.08]"
        >
          Crafting <span className="text-gradient-primary">Immersive 3D</span> Experiences for the Modern Web
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Elevate your user interfaces with real-time WebGL rendering, fluid physics-based motion, and seamless dark-mode glassmorphism aesthetics.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-full font-bold text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            Explore Interactive Studio
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass hover:bg-slate-800/80 rounded-full font-semibold text-slate-200 border border-slate-700/80 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Learn Architecture</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Metric Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS', sub: 'Hardware Accelerated' },
            { label: 'Bundle Size', value: '< 45 KB', sub: 'Optimized Chunking' },
            { label: 'Lighthouse Score', value: '100 / 100', sub: 'Web Vitals Passed' },
            { label: 'Latency', value: '0.2 ms', sub: 'Instant DOM Events' },
          ].map((stat, i) => (
            <div key={i} className="glass p-5 rounded-2xl text-left border border-slate-800/80">
              <div className="text-2xl lg:text-3xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="studio" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-4">
            Real-Time Engine Controls
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Interactive 3D Studio Customizer
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Modify 3D mesh geometry, material colors, speed, distortion parameters, and wireframe views in real-time.
          </p>
        </motion.div>

        {/* Studio Workspace Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-lg text-white">Mesh Parameters</h3>
                </div>
                <button
                  onClick={() =>
                    setSceneConfig({
                      shape: 'torusKnot',
                      color: '#6366f1',
                      speed: 1,
                      distort: 0.35,
                      wireframe: false,
                      scale: 1,
                    })
                  }
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              {/* Geometry Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                  Geometry Mesh
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleShapeChange(opt.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between border ${
                        sceneConfig.shape === opt.id
                          ? 'bg-indigo-600/90 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sceneConfig.shape === opt.id && <Check className="w-3.5 h-3.5 text-indigo-200" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Color Palette */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                  Material Palette
                </label>
                <div className="flex items-center gap-3">
                  {presetColors.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => handleColorChange(c.hex)}
                      className={`w-9 h-9 rounded-full transition-transform flex items-center justify-center border-2 ${
                        sceneConfig.color === c.hex ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {sceneConfig.color === c.hex && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rotation Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300 uppercase tracking-wider">Rotation Speed</span>
                  <span className="text-indigo-400 font-mono">{sceneConfig.speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={sceneConfig.speed}
                  onChange={(e) => setSceneConfig({ ...sceneConfig, speed: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Distortion Intensity Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300 uppercase tracking-wider">Distortion Field</span>
                  <span className="text-indigo-400 font-mono">{sceneConfig.distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={sceneConfig.distort}
                  onChange={(e) => setSceneConfig({ ...sceneConfig, distort: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Wireframe Rendering
                </span>
                <button
                  onClick={() => setSceneConfig({ ...sceneConfig, wireframe: !sceneConfig.wireframe })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    sceneConfig.wireframe ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>

            {/* Live WebGL Stage Display Box */}
            <div className="lg:col-span-7 h-[380px] sm:h-[450px] w-full rounded-2xl bg-slate-950/40 border border-indigo-500/30 relative overflow-hidden flex items-center justify-center group shadow-inner">
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-indigo-300 backdrop-blur-md">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>ACTIVE STAGE: {sceneConfig.shape.toUpperCase()}</span>
              </div>
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-emerald-400 backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>60.0 FPS</span>
              </div>

              {/* Embedded WebGL Canvas */}
              <div className="w-full h-full">
                <Scene config={sceneConfig} />
              </div>

              <div className="text-slate-400 text-xs text-center max-w-xs absolute bottom-4 z-20 pointer-events-none bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                Interactive 3D Stage | Drag to rotate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-block mb-4">
            Built For Enterprise Performance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Engineered for Next-Gen Web Apps
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Combines modern React paradigms with hardware-accelerated 3D graphics for unmatched user engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Turbopack Speed',
              desc: 'Powered by Next.js 16 and Turbopack for instant sub-second hot-reloading and micro-bundle sizes.',
              color: 'from-amber-500 to-orange-500',
            },
            {
              icon: Layers,
              title: 'Glassmorphism UI',
              desc: 'Custom blurred frosted-glass aesthetics built with Tailwind CSS v4 and dynamic CSS backdrop filters.',
              color: 'from-indigo-500 to-purple-500',
            },
            {
              icon: Cpu,
              title: 'Three.js / WebGL',
              desc: 'Direct GPU shaders and lighting via React Three Fiber, supporting physical material distortion.',
              color: 'from-cyan-500 to-blue-500',
            },
            {
              icon: Palette,
              title: 'Dynamic Styling',
              desc: 'Real-time color palettes, wireframes, and parametric state reactivity synchronized across DOM and WebGL.',
              color: 'from-pink-500 to-rose-500',
            },
            {
              icon: ShieldCheck,
              title: 'Type-Safe Architecture',
              desc: 'Strict TypeScript verification and ESLint compliance ensuring zero runtime type errors.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: Globe,
              title: 'Global CDN Ready',
              desc: 'Fully pre-rendered static generation ready for instant deployment on Edge networks worldwide.',
              color: 'from-violet-500 to-fuchsia-500',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-3 flex items-center justify-center text-white mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics & Performance Showcase Section */}
      <section id="metrics" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-slate-800/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-4">
                Benchmarked Efficiency
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Lightweight Execution with Zero GPU Stalls
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Our custom React Three Fiber integration separates the WebGL render pipeline from main-thread UI calculations. This delivers butter-smooth 60fps animations even on mobile devices.
              </p>
              <div className="space-y-4">
                {[
                  'Zero layout thrashing during 3D scroll transitions',
                  'Optimized buffer memory management and automatic disposal',
                  'Framer Motion layout animations synchronized with WebGL camera',
                ].map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats Dashboard Graphic */}
            <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Live Performance Monitor
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  PASSED
                </span>
              </div>

              {/* Progress Bars */}
              {[
                { label: 'GPU Memory Utilization', pct: '24%', color: 'bg-indigo-500' },
                { label: 'Main Thread Processing', pct: '12%', color: 'bg-emerald-500' },
                { label: 'WebGL Draw Calls / Frame', pct: '18 Calls', color: 'bg-purple-500' },
              ].map((bar, bIdx) => (
                <div key={bIdx} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">{bar.label}</span>
                    <span className="text-slate-200 font-mono">{bar.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full ${bar.color} rounded-full`} style={{ width: bar.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Subscription Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block mb-4">
            Flexible Licensing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Plans Designed for Every Developer
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Choose the right tier to kickstart your next-generation 3D interactive projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: 'Starter',
              price: '$0',
              period: 'Forever Free',
              desc: 'Ideal for personal experiments and prototype projects.',
              features: ['Standard 3D Shader Geometries', 'Up to 60 FPS Canvas', 'Community Support', 'MIT License'],
              highlighted: false,
              btnText: 'Get Started Free',
            },
            {
              name: 'Pro Developer',
              price: '$49',
              period: 'per month',
              desc: 'For professional creators needing advanced custom shaders & tools.',
              features: [
                'Unlimited 3D Mesh Geometries',
                'Custom GLSL Shader Import',
                'Advanced Light Rig Presets',
                'Priority Tech Support',
                'Commercial Project License',
              ],
              highlighted: true,
              btnText: 'Upgrade to Pro',
            },
            {
              name: 'Enterprise',
              price: '$199',
              period: 'per month',
              desc: 'Tailored solutions with dedicated WebGL performance tuning.',
              features: [
                'Dedicated 3D Asset Optimization',
                'Custom Scene Controls & API',
                'SLA & 24/7 Dedicated Support',
                'Custom Security & On-Premise',
              ],
              highlighted: false,
              btnText: 'Contact Enterprise',
            },
          ].map((plan, pIdx) => (
            <motion.div
              key={pIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: pIdx * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between border relative transition-all duration-300 ${
                plan.highlighted
                  ? 'glass-card border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10'
                  : 'glass border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800 mb-8">
                  {plan.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-indigo-500/30 text-center relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-2xl">
          <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Stay Ahead in 3D Web Development
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Subscribe to get the latest WebGL shader techniques, React 19 updates, and UI performance tips directly to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setEmailSubmitted(true)
            }}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              className="flex-1 px-5 py-3.5 rounded-full bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-500/25 whitespace-nowrap"
            >
              {emailSubmitted ? "\u2713 Subscribed" : "Join Newsletter"}
            </button>
          </form>
          {emailSubmitted && (
            <p className="text-xs text-emerald-400 mt-3 font-mono">
              Thank you for subscribing! Welcome aboard.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white text-sm">AURA3D Studio</span>
            <span>&copy; 2026. Built with Next.js 16 & Three.js.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
