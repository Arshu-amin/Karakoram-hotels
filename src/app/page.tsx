'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  Activity,
  Sliders,
  RotateCw,
  Box,
  Palette,
  Check,
  ArrowRight,
  Globe,
  ChevronRight,
  Code2
} from 'lucide-react'
import type { SceneConfig } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-indigo-300 font-mono tracking-widest uppercase">
          Initializing WebGL Engine...
        </span>
      </div>
    </div>
  )
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 1,
    distort: 0.45,
    scale: 1,
    wireframe: false,
    roughness: 0.2
  })

  const [activeTab, setActiveTab] = useState<'annual' | 'monthly'>('annual')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activePreset, setActivePreset] = useState<string>('cyber')

  const applyPreset = (
    presetName: string,
    config: Partial<SceneConfig>
  ) => {
    setActivePreset(presetName)
    setSceneConfig((prev) => ({ ...prev, ...config }))
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D WebGL Canvas Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-75 transition-opacity duration-700">
        <Scene config={sceneConfig} />
      </div>

      {/* Decorative Subtle Radial Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_40%)]" />

      {/* Modern Glass Navbar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
              Aura3D
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              v2.4 Live
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#studio" className="hover:text-indigo-400 transition-colors">
              3D Studio
            </a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">
              Showcase
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#studio"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Engine</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 md:pt-28 md:pb-36 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-indigo-200">
            Next-Generation WebGL & React Three Fiber Canvas
          </span>
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight max-w-5xl leading-[1.08] mb-8"
        >
          Craft Immersive <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Web Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg sm:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10"
        >
          Seamlessly integrate real-time 3D graphics, dynamic shader distortions,
          and glassmorphism design into modern Next.js web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2"
          >
            <Sliders className="w-5 h-5" />
            <span>Launch Interactive Studio</span>
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 glass hover:bg-slate-800/80 text-slate-200 font-semibold rounded-2xl transition-all duration-200 border border-white/10 text-center"
          >
            Documentation & SDK
          </a>
        </motion.div>

        {/* Live Metrics Counter Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mt-20"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS', sub: 'WebGL 2.0 Optimized' },
            { label: 'Bundle Footprint', value: '< 45KB', sub: 'Zero Layout Shift' },
            { label: 'Active Shaders', value: '128+', sub: 'Real-time Raymarching' },
            { label: 'Satisfaction', value: '99.9%', sub: 'Developer Rating' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl text-left border border-white/5"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-indigo-300">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio Customizer Playground */}
      <section id="studio" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Real-time WebGL Controls</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio Playground</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Adjust shapes, colors, shader distortion, and material parameters in real-time.
            Changes update live on the WebGL canvas behind the page.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto border border-white/10 shadow-2xl">
          {/* Quick Preset Buttons */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block">
              Popular Preset Styles
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                {
                  id: 'cyber',
                  name: '⚡ Cyber Neon',
                  config: { shape: 'torusKnot', color: '#6366f1', speed: 1.2, distort: 0.5, wireframe: false, roughness: 0.1 }
                },
                {
                  id: 'wireframe',
                  name: '🌐 Wireframe Grid',
                  config: { shape: 'icosahedron', color: '#38bdf8', speed: 0.8, distort: 0.2, wireframe: true, roughness: 0.5 }
                },
                {
                  id: 'plasma',
                  name: '🔥 Plasma Sphere',
                  config: { shape: 'sphere', color: '#e879f9', speed: 1.8, distort: 0.7, wireframe: false, roughness: 0.15 }
                },
                {
                  id: 'cube',
                  name: '🧊 Glass Cube',
                  config: { shape: 'box', color: '#34d399', speed: 0.6, distort: 0.1, wireframe: false, roughness: 0.05 }
                }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id, p.config as Partial<SceneConfig>)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    activePreset === p.id
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800/60 text-slate-300 border-white/5 hover:bg-slate-800'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Sliders and Selectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Shape Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                3D Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'torusKnot', label: 'Torus Knot' },
                  { key: 'sphere', label: 'Sphere' },
                  { key: 'icosahedron', label: 'Icosahedron' },
                  { key: 'box', label: 'Cyber Cube' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() =>
                      setSceneConfig((c) => ({
                        ...c,
                        shape: item.key as SceneConfig['shape']
                      }))
                    }
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      sceneConfig.shape === item.key
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                        : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                Material Color
              </label>
              <div className="flex items-center gap-3">
                {[
                  { hex: '#6366f1', name: 'Indigo' },
                  { hex: '#a855f7', name: 'Purple' },
                  { hex: '#38bdf8', name: 'Sky' },
                  { hex: '#e879f9', name: 'Pink' },
                  { hex: '#34d399', name: 'Emerald' },
                  { hex: '#f59e0b', name: 'Amber' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() =>
                      setSceneConfig((c) => ({ ...c, color: color.hex }))
                    }
                    className={`w-8 h-8 rounded-full transition-transform ${
                      sceneConfig.color === color.hex
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950'
                        : 'hover:scale-110 opacity-80'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5 text-indigo-400" />
                  Rotation Speed
                </span>
                <span className="text-indigo-300">{sceneConfig.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={sceneConfig.speed}
                onChange={(e) =>
                  setSceneConfig((c) => ({
                    ...c,
                    speed: parseFloat(e.target.value)
                  }))
                }
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Shader Distortion Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  Shader Distortion
                </span>
                <span className="text-indigo-300">
                  {(sceneConfig.distort * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sceneConfig.distort}
                onChange={(e) =>
                  setSceneConfig((c) => ({
                    ...c,
                    distort: parseFloat(e.target.value)
                  }))
                }
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Wireframe & Reset Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={sceneConfig.wireframe}
                onChange={(e) =>
                  setSceneConfig((c) => ({ ...c, wireframe: e.target.checked }))
                }
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
              />
              <span>Render Wireframe Mode</span>
            </label>

            <button
              onClick={() =>
                applyPreset('cyber', {
                  shape: 'torusKnot',
                  color: '#6366f1',
                  speed: 1,
                  distort: 0.45,
                  scale: 1,
                  wireframe: false,
                  roughness: 0.2
                })
              }
              className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Reset to Default State
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Next-Gen Web</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Cutting-edge architecture built specifically for modern React & Next.js applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: 'Ultra High Performance',
              desc: 'Sub-millisecond frame rendering powered by WebGL 2.0 with automatic hardware acceleration.'
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: 'Seamless DOM Integration',
              desc: 'Layer React UI components smoothly over dynamic 3D scenes without canvas blocking.'
            },
            {
              icon: <Cpu className="w-6 h-6 text-sky-400" />,
              title: 'Custom Shader Pipeline',
              desc: 'Easily extend material properties with GLSL shaders and real-time noise distortions.'
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: 'SSR & Hydration Safe',
              desc: 'Designed for Next.js App Router with safe client-side canvas mounting and zero hydration errors.'
            },
            {
              icon: <Globe className="w-6 h-6 text-amber-400" />,
              title: 'Cross-Device Adaptive',
              desc: 'Dynamically scales particle counts and shadow maps based on user hardware performance.'
            },
            {
              icon: <Sparkles className="w-6 h-6 text-pink-400" />,
              title: 'Smooth Physics & Spring',
              desc: 'Integrated spring physics for natural fluid interactions and scroll-linked camera movement.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl relative group border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Demo Cards */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>Developer First API</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Simple React API, <br />
                Uncompromised Visual Power
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Control complex WebGL scenes with simple React props. State updates automatically synchronize between your UI controls and the 3D rendering pipeline.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Declarative React Three Fiber components',
                  'Framer Motion layout transitions',
                  'Tailwind CSS glassmorphism styling',
                  'Fully TypeScript typed interfaces'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25"
              >
                <span>Get Developer Pass</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/10 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs">App.tsx</span>
                </span>
                <span>TypeScript</span>
              </div>
              <pre className="text-indigo-200">
                <code>{`import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export default function Scene({ config }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.6} />
      <mesh scale={config.scale}>
        <torusKnotGeometry />
        <MeshDistortMaterial
          color={config.color}
          distort={config.distort}
          speed={config.speed}
        />
      </mesh>
    </Canvas>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Flexible <span className="text-gradient-primary">Plans & Pricing</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base mb-8">
            Start free, scale seamlessly as your application graphics demand grows.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 glass rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'monthly'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'annual'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded-md font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Starter',
              desc: 'Perfect for experimental projects and indie developers.',
              price: activeTab === 'annual' ? '$19' : '$24',
              period: '/ month',
              features: [
                'Up to 3 WebGL Canvases',
                'Standard Shader Materials',
                '60 FPS Optimization',
                'Community Support'
              ],
              popular: false,
              cta: 'Get Started'
            },
            {
              name: 'Pro Studio',
              desc: 'Ideal for high-traffic SaaS landing pages & agencies.',
              price: activeTab === 'annual' ? '$49' : '$59',
              period: '/ month',
              features: [
                'Unlimited WebGL Canvases',
                'Custom GLSL Shader Import',
                'Hardware Adaptive Particles',
                'Priority Tech Support',
                'Commercial Licensing'
              ],
              popular: true,
              cta: 'Start Pro Trial'
            },
            {
              name: 'Enterprise',
              desc: 'Custom WebGL rendering pipelines for large scale platforms.',
              price: '$199',
              period: '/ month',
              features: [
                'Dedicated Graphics Engineers',
                'Custom Shader Shader Pipelines',
                'SLA Guarantee 99.99%',
                'On-Premises Shader CDN',
                'Custom 3D Asset Optimization'
              ],
              popular: false,
              cta: 'Contact Sales'
            }
          ].map((plan, i) => (
            <div
              key={i}
              className={`glass-card p-8 rounded-3xl relative flex flex-col justify-between border ${
                plan.popular
                  ? 'border-indigo-500/50 bg-indigo-950/20 shadow-2xl shadow-indigo-500/10'
                  : 'border-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-300">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
                    : 'glass hover:bg-slate-800 text-slate-200 border border-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Banner */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center border border-indigo-500/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to Upgrade Your Web Experience?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Join 10,000+ developers building high-performance 3D interfaces with Next.js and Aura3D.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl glass text-sm text-white placeholder-slate-400 border border-white/10 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 whitespace-nowrap"
              >
                {subscribed ? "\u2713 Subscribed" : "Get Early Access"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 sm:px-6 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-200">Aura3D Engine</span>
            <span className="text-slate-500">
              © {new Date().getFullYear()} Aura3D Inc. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#studio" className="hover:text-slate-200 transition-colors">
              Studio
            </a>
            <a href="#features" className="hover:text-slate-200 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-200 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
