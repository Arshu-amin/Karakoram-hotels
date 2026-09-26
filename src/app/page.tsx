'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Code2,
  Maximize2
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse flex items-center justify-center text-slate-600 text-sm font-mono">Initializing WebGL Scene...</div>
})

export default function Home() {
  // Interactive 3D Control States
  const [shape, setShape] = useState<'torusKnot' | 'icosahedron' | 'dodecahedron' | 'torus'>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [subscribed, setSubscribed] = useState<boolean>(false)

  // Scroll animations
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  const colorOptions = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' }
  ]

  const shapeOptions: Array<{ id: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'torus'; label: string }> = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'dodecahedron', label: 'Dodecahedron' },
    { id: 'torus', label: 'Ring Torus' }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />
      </div>

      {/* Glassmorphism Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">
              AURA<span className="text-indigo-400">3D</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Studio</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#showcase" className="hover:text-indigo-400 transition-colors">Capabilities</a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">Metrics</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-400/30 transition-all hover:scale-105 active:scale-95 shadow-md shadow-indigo-500/20"
            >
              Launch Controls
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-between pt-32 pb-12 px-6">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto"
        >
          {/* Main Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              Next-Generation WebGL Canvas Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Immersive <br />
              <span className="text-gradient-primary">3D Interfaces</span> <br />
              For The Modern Web
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-400 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed font-light"
            >
              Experience seamless, high-performance real-time WebGL graphics powered by React Three Fiber, Next.js 16, and Framer Motion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#customizer"
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
              >
                Customize Mesh
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-xl font-semibold glass hover:bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:scale-105 active:scale-95 transition-all"
              >
                Explore Features
              </a>
            </motion.div>
          </div>

          {/* Interactive Live Controls Box */}
          <motion.div
            id="customizer"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/20 relative backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-slate-100 font-mono tracking-wide">WebGL Controller</h2>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE 60 FPS
              </span>
            </div>

            {/* Shape Selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-400 mb-2 font-mono uppercase tracking-wider">
                Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shapeOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between ${
                      shape === item.id
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30 border border-indigo-400/40'
                        : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {item.label}
                    {shape === item.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-400 mb-2 font-mono uppercase tracking-wider">
                Emissive Color Palette
              </label>
              <div className="flex items-center gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    title={c.name}
                    className={`w-9 h-9 rounded-full transition-all transform hover:scale-110 flex items-center justify-center relative ${
                      color === c.value ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-indigo-400 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.value }}
                  >
                    {color === c.value && <div className="w-2 h-2 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Speed Slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                  Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Scale Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                  Object Scale
                </label>
                <span className="text-xs font-mono text-indigo-400">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-slate-300 font-mono uppercase tracking-wider">
                Wireframe Rendering
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-12 text-slate-500">
          <span className="text-xs font-mono tracking-widest uppercase mb-2">Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-700 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-28 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase font-mono mb-3">
            Engineered For Performance
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Cutting-edge tech stack for modern web applications
          </p>
          <p className="text-slate-400 text-lg">
            Built with zero-compromise principles for visual appeal, fluid motion, and lightning-fast frame rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-400" />,
              title: "60 FPS WebGL Rendering",
              desc: "Smooth GPU-accelerated 3D graphics built on Three.js and React Three Fiber."
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-400" />,
              title: "Glassmorphic Aesthetics",
              desc: "Modern frosted glass visual effects with refined backdrop blur and subtle border highlights."
            },
            {
              icon: <Cpu className="w-6 h-6 text-pink-400" />,
              title: "Next.js 16 App Router",
              desc: "Server-side dynamic rendering paired with optimized client component hydration."
            },
            {
              icon: <Activity className="w-6 h-6 text-cyan-400" />,
              title: "Framer Motion Physics",
              desc: "Spring-animated cursor interactions and fluid scroll-linked viewport transitions."
            },
            {
              icon: <Globe className="w-6 h-6 text-emerald-400" />,
              title: "Responsive Matrix",
              desc: "Fully responsive layouts tailored for modern high-DPI displays and touch devices."
            },
            {
              icon: <Shield className="w-6 h-6 text-amber-400" />,
              title: "TypeScript Native",
              desc: "Strict type safety ensuring robustness and seamless developer workflow."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all group"
            >
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 w-fit mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 font-mono">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section id="showcase" className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-indigo-500/20 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-6">
                <Code2 className="w-3.5 h-3.5" />
                DECLARATIVE 3D SCENE ARCHITECTURE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                Seamless Integration Between DOM and WebGL
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Aura3D bridges traditional HTML elements and WebGL shaders into a unified canvas structure, enabling real-time state synchronization without frame drops.
              </p>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Real-time custom material parameter bindings</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Procedural particle physics simulation</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Dynamic camera OrbitControls with smooth inertia</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-500">
                <span>SceneController.tsx</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-purple-400">import <span className="text-white">{`{ Canvas, useFrame }`}</span> from <span className="text-emerald-400">&apos;@react-three/fiber&apos;</span></p>
              <p className="text-purple-400">import <span className="text-white">{`{ Float }`}</span> from <span className="text-emerald-400">&apos;@react-three/drei&apos;</span></p>
              <br />
              <p className="text-indigo-400">export function <span className="text-yellow-200">MeshObject</span>({`{ shape, color }`}) {`{`}</p>
              <p className="pl-4 text-slate-400">{"// Dynamic frame animation hook"}</p>
              <p className="pl-4"><span className="text-purple-400">useFrame</span>((state) =&gt; {`{`}</p>
              <p className="pl-8 text-indigo-300">meshRef.current.rotation.y += 0.01</p>
              <p className="pl-4">{`})`}</p>
              <br />
              <p className="pl-4 text-purple-400">return (</p>
              <p className="pl-8 text-indigo-300">&lt;<span className="text-blue-400">Float</span> speed={`{2}`}&gt;</p>
              <p className="pl-12 text-indigo-300">&lt;<span className="text-blue-400">mesh</span> ref={`{meshRef}`}&gt;</p>
              <p className="pl-16 text-slate-400">&lt;<span className="text-emerald-400">meshPhysicalMaterial</span> color={`{color}`} roughness={`{0.15}`} /&gt;</p>
              <p className="pl-12 text-indigo-300">&lt;/<span className="text-blue-400">mesh</span>&gt;</p>
              <p className="pl-8 text-indigo-300">&lt;/<span className="text-blue-400">Float</span>&gt;</p>
              <p className="pl-4">)</p>
              <p>{`}`}</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS & STATS SECTION */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { metric: "60+", label: "Target FPS", desc: "Fluid animations" },
            { metric: "< 50ms", label: "Hydration Time", desc: "Instant interactive" },
            { metric: "100%", label: "TypeScript", desc: "Strict type coverage" },
            { metric: "4.8 KB", label: "Custom Styles", desc: "Optimized bundle" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-2xl text-center border border-slate-800"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient-primary font-mono mb-2">
                {stat.metric}
              </div>
              <div className="text-sm font-semibold text-slate-200 font-mono mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE NEWSLETTER SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-6 text-center">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-indigo-500/20 relative">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Stay Ahead in 3D Web Development
            </h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Subscribe to get updates on WebGL techniques, shader tutorials, and interactive design trends.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {"\u2713 Subscribed!"} Thanks for joining our developer community.
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your developer email..."
                  className="px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-300 font-bold">AURA3D STUDIO</span>
          </div>
          <p>© 2026 Aura3D Next.js Experience. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#hero" className="hover:text-indigo-400 transition-colors">Top</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">WebGL Controls</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
