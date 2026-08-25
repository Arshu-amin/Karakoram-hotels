'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Shield,
  ArrowRight,
  Check,
  Palette,
  Sliders,
  Maximize2,
  RefreshCw,
  Globe,
  Code2,
  Share2
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 animate-pulse">
      <div className="flex items-center gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
        <span className="text-sm font-medium tracking-wider">LOADING 3D SCENE...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Customizer State
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(2)
  const [distort, setDistort] = useState<number>(0.4)
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [metalness, setMetalness] = useState<number>(0.7)

  // Showcase Active Tab
  const [activeTab, setActiveTab] = useState<number>(0)

  // Newsletter Email & Subscription State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const colors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Violet', value: '#a855f7' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
  ]

  const geometries: { label: string; value: GeometryType }[] = [
    { label: 'Torus Knot', value: 'torusKnot' },
    { label: 'Icosahedron', value: 'icosahedron' },
    { label: 'Dodecahedron', value: 'dodecahedron' },
    { label: 'Sphere', value: 'sphere' },
  ]

  const showcaseTabs = [
    {
      title: 'Realtime Distortion Shaders',
      desc: 'Dynamic vertex perturbation powered by GPU fragment algorithms for liquid-smooth surface dynamics.',
      badge: 'GPU Accelerated',
      stat: '< 1.2ms',
      statLabel: 'Frame latency'
    },
    {
      title: 'Physically Based Rendering',
      desc: 'Accurate optical reflections, metallic roughness modeling, and synthetic clearcoat scattering.',
      badge: 'PBR Standard',
      stat: '4K Ready',
      statLabel: 'Mesh fidelity'
    },
    {
      title: 'Sub-pixel Particle Dynamics',
      desc: 'Thousands of floating ambient orbital particles synchronized with central scene rotation vectors.',
      badge: '60 FPS Ultra',
      stat: '300+',
      statLabel: 'Active particles'
    }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background 3D Canvas Canvas Layer */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Scene
          geometry={geometry}
          color={color}
          speed={speed}
          distort={distort}
          metalness={metalness}
          wireframe={wireframe}
        />
      </div>

      {/* Glass Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Customizer</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 transition-all transform hover:scale-105 active:scale-95"
            >
              Try Studio
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-24 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-indigo-300 tracking-wide uppercase">
            Next Generation Web Animation Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-8"
        >
          Craft Immersive <br />
          <span className="text-gradient-primary">3D Visual Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-normal leading-relaxed"
        >
          Elevate your digital products with WebGL shader animations, real-time physical materials, and interactive canvas components.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Launch Interactive Customizer
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Live Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'Target Frame Rate', value: '60 FPS' },
            { label: 'Material Presets', value: '100+' },
            { label: 'Bundle Footprint', value: '< 45 KB' },
            { label: 'WebGL Uptime', value: '99.9%' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center">
              <div className="text-2xl md:text-3xl font-bold text-gradient-secondary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Sandbox Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Interactive <span className="text-gradient-primary">3D Control Studio</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Directly manipulate real-time WebGL parameters in the live viewport below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-card p-8 rounded-3xl flex flex-col justify-between space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-bold text-slate-100">Parameters</h3>
            </div>

            {/* Geometry Selector */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 block">
                Mesh Geometry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {geometries.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGeometry(g.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      geometry === g.value
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                        : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 block flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                Color Theme
              </label>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`w-9 h-9 rounded-full transition-transform border-2 ${
                      color === c.value
                        ? 'scale-115 border-white shadow-lg'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-400">{speed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Distortion Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Vertex Distortion
                </label>
                <span className="text-xs font-mono text-indigo-400">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Metalness Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  Metallic Reflectivity
                </label>
                <span className="text-xs font-mono text-indigo-400">{(metalness * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={metalness}
                onChange={(e) => setMetalness(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Toggle Switches */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm font-medium text-slate-300">Wireframe Mode</span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Dedicated Live Viewport */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card rounded-3xl overflow-hidden relative min-h-[450px] flex flex-col border border-indigo-500/20 shadow-2xl"
          >
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">WebGL Viewport — Active</span>
              </div>
              <Maximize2 className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex-1 relative w-full h-full min-h-[380px]">
              <Scene
                geometry={geometry}
                color={color}
                speed={speed}
                distort={distort}
                metalness={metalness}
                wireframe={wireframe}
              />
              <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
                Geometry: <span className="text-indigo-400">{geometry}</span> | Color: <span style={{ color }}>{color}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Engineered for <span className="text-gradient-secondary">Maximum Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            High performance WebGL visual components built to integrate seamlessly with Next.js App Router.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "60 FPS Optimization",
              desc: "Carefully calibrated material passes and low-overhead light sources guarantee fluid frame rates on all devices."
            },
            {
              icon: Layers,
              title: "Component Composition",
              desc: "Modular React Three Fiber components that can be customized, dynamic-imported, and SSR-decoupled effortlessly."
            },
            {
              icon: Cpu,
              title: "GPU Shader Shading",
              desc: "Custom vertex and fragment shader algorithms delivering organic deformation and realistic material physics."
            },
            {
              icon: Shield,
              title: "Strict Type Safety",
              desc: "Fully typed with TypeScript, supporting clean integration across modern full-stack web architectures."
            },
            {
              icon: Box,
              title: "Dynamic Asset Loading",
              desc: "Optimized geometry generation and minimal mesh memory consumption for ultra-fast page initial loads."
            },
            {
              icon: Sparkles,
              title: "Interactive Controls",
              desc: "Seamless bi-directional state coupling between React UI input elements and background WebGL canvas."
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Interactive Showcase / Demo Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-indigo-500/20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
              Feature Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Advanced <span className="text-gradient-primary">Visual Architecture</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 my-8 border-b border-slate-800 pb-4">
            {showcaseTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-xs font-semibold text-indigo-300">
                  {showcaseTabs[activeTab].badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
                  {showcaseTabs[activeTab].title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base">
                  {showcaseTabs[activeTab].desc}
                </p>
              </div>

              <div className="md:col-span-5 glass p-6 rounded-2xl border border-slate-800 text-center">
                <div className="text-4xl md:text-5xl font-black text-gradient-secondary mb-2">
                  {showcaseTabs[activeTab].stat}
                </div>
                <div className="text-xs uppercase font-medium tracking-wider text-slate-400">
                  {showcaseTabs[activeTab].statLabel}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Simple & <span className="text-gradient-primary">Transparent Pricing</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Choose the perfect plan for your project visual needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: "Starter",
              price: "$0",
              period: "Forever free",
              desc: "Ideal for personal projects and small prototypes.",
              features: [
                "Standard 3D Geometries",
                "Basic Material Presets",
                "60 FPS Rendering Engine",
                "Community Support"
              ],
              popular: false,
              cta: "Get Started Free"
            },
            {
              name: "Pro Studio",
              price: "$29",
              period: "per month",
              desc: "For creative developers and production web apps.",
              features: [
                "Custom Shader Distortion",
                "HDR Lighting Presets",
                "Particle Physics Engine",
                "Priority Technical Support",
                "Commercial License"
              ],
              popular: true,
              cta: "Upgrade to Pro"
            },
            {
              name: "Enterprise",
              price: "$99",
              period: "per month",
              desc: "Tailored 3D assets and custom WebGL integration.",
              features: [
                "Bespoke 3D Model Pipeline",
                "Custom WebGL Shaders",
                "Dedicated Solutions Engineer",
                "SLA & Performance Guarantee",
                "Enterprise SLA"
              ],
              popular: false,
              cta: "Contact Enterprise"
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 rounded-3xl flex flex-col justify-between relative ${
                plan.popular ? 'border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-100">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-black text-slate-100">{plan.price}</span>
                  <span className="text-slate-400 text-sm ml-2">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'glass border border-slate-700 hover:border-slate-600 text-slate-200'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
        <div className="glass-card p-10 md:p-16 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Stay Updated with <span className="text-gradient-primary">Next-Gen Visuals</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base md:text-lg">
            Subscribe to our newsletter to receive free 3D shader updates, tutorials, and component releases.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-indigo-600/20 border border-indigo-500 text-indigo-300 font-medium">
              <Check className="w-5 h-5 text-indigo-400" />
              <span>{"\u2713 Subscribed! Check your inbox soon."}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full glass border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-transform active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900 glass text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Box className="w-6 h-6 text-indigo-400" />
              <span className="text-lg font-bold text-white tracking-tight">AURA 3D</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering developers to build the next web with high-performance 3D visual assets and animations.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer Studio</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Feature Grid</a></li>
              <li><a href="#showcase" className="hover:text-indigo-400 transition-colors">Shader Showcase</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Shader Presets</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">React Three Fiber Guide</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Release Notes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 AURA 3D Inc. Built with Next.js, React Three Fiber & Tailwind CSS.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
