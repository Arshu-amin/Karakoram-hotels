'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Sparkles,
  Cpu,
  Zap,
  Shield,
  Layers,
  Globe,
  Sliders,
  Check,
  Plus,
  Minus,
  ArrowRight,
  Play,
  Share2,
  Code2
} from 'lucide-react'
import type { GeometryShape } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950 text-indigo-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium tracking-wide">Initializing 3D Engine...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls State
  const [sceneColor, setSceneColor] = useState('#6366f1')
  const [sceneSpeed, setSceneSpeed] = useState(1)
  const [sceneScale, setSceneScale] = useState(1)
  const [sceneShape, setSceneShape] = useState<GeometryShape>('torusKnot')
  const [wireframe, setWireframe] = useState(false)

  // Interactive FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Newsletter Subscription State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  const presetColors = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyan Neon', hex: '#06b6d4' },
    { name: 'Emerald Glow', hex: '#10b981' },
    { name: 'Rose Burst', hex: '#f43f5e' },
    { name: 'Amber Solar', hex: '#f59e0b' },
    { name: 'Violet Cyber', hex: '#a855f7' }
  ]

  const shapes: { id: GeometryShape; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'sphere', label: 'Sphere' },
    { id: 'torus', label: 'Ring Torus' }
  ]

  const faqs = [
    {
      q: 'How does Aura3D deliver high performance 3D animations?',
      a: 'Aura3D leverages WebGL with Three.js and React Three Fiber, utilizing offscreen hardware acceleration, custom shaders, and physical rendering pipelines optimized for 60+ FPS on mobile and desktop.'
    },
    {
      q: 'Is Aura3D compatible with Next.js App Router and React 19?',
      a: 'Yes, full compatibility with Next.js 16 App Router, React 19, Turbopack, and Tailwind CSS v4 is built right into the framework architecture.'
    },
    {
      q: 'Can I customize the 3D meshes and shader properties programmatically?',
      a: 'Absolutely. Every parameter—including geometry types, surface roughness, clearcoat reflection, metalness, scale, rotation speed, and dynamic material wireframe modes—can be reactive via DOM state.'
    },
    {
      q: 'What visual custom cursor features are included?',
      a: 'Aura3D ships with a built-in spring-physics magnetic custom cursor that automatically scales, adapts, and highlights interactive elements across the user interface.'
    }
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background 3D Canvas */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene
          color={sceneColor}
          speed={sceneSpeed}
          scale={sceneScale}
          shape={sceneShape}
          wireframe={wireframe}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-xl font-extrabold tracking-tight"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Box className="w-5 h-5 text-white" />
            </div>
            <span className="text-gradient-primary text-2xl font-black">Aura3D</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-cyan-400 transition-colors">
              3D Studio
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </a>
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold glass hover:bg-slate-800/80 transition-all border border-slate-700/60 shadow-sm"
            >
              Open Studio
            </a>
            <a
              href="#pricing"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-24 md:pt-48 md:pb-36 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Gen WebGL & Modern Interface Design</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-tight mb-8"
        >
          Immersive Web <br className="hidden md:inline" />
          <span className="text-gradient-primary">3D Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-slate-300 text-lg md:text-2xl max-w-3xl font-light leading-relaxed mb-12"
        >
          A cutting-edge frontend architecture combining fluid 3D graphics, spring physics cursor dynamics, glassmorphism aesthetics, and real-time canvas interaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-indigo-500/40 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 group"
          >
            <span>Explore Live Studio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full text-base font-bold glass hover:bg-slate-800/80 transition-all flex items-center gap-2 border border-slate-700/80"
          >
            <Play className="w-4 h-4 fill-indigo-400 text-indigo-400" />
            <span>Watch Overview</span>
          </a>
        </motion.div>

        {/* Floating Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 w-full max-w-4xl"
        >
          {[
            { label: 'Frame Rate', val: '60+ FPS' },
            { label: 'WebGL Engine', val: 'Three.js' },
            { label: 'React Version', val: 'v19.2' },
            { label: 'Latency', val: '< 16ms' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card text-center border border-slate-800/80"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-gradient-primary mb-1">
                {stat.val}
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive 3D Studio Customizer Section */}
      <section id="customizer" className="relative z-10 py-24 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5" /> Live Control Panel
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Interactive <span className="text-gradient-primary">3D Canvas Studio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Adjust the controls below to dynamically transform the background WebGL physical material, shape geometry, rotation velocity, and scale in real time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Control 1: Geometry Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center justify-between">
                <span>Select Mesh Geometry</span>
                <span className="text-xs text-indigo-400 font-mono uppercase">{sceneShape}</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneShape(s.id)}
                    className={`px-4 py-3 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      sceneShape === s.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Box className="w-4 h-4" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Color Palette Preset */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center justify-between">
                <span>Emissive Color Palette</span>
                <span className="text-xs font-mono text-cyan-400">{sceneColor}</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {presetColors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setSceneColor(c.hex)}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                      sceneColor === c.hex
                        ? 'bg-slate-800 ring-2 ring-cyan-400 text-white'
                        : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Rotation Velocity
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={sceneSpeed}
                onChange={(e) => setSceneSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Control 4: Scale Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Mesh Scale Factor
                </label>
                <span className="text-xs font-mono text-indigo-400">{sceneScale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={sceneScale}
                onChange={(e) => setSceneScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          {/* Wireframe Toggle */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-slate-200">Wireframe Mesh Overlay</div>
                <div className="text-xs text-slate-400">Toggle physical polygon surface wireframe render</div>
              </div>
            </div>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                wireframe ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  wireframe ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" /> Next-Gen Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Designed for <span className="text-gradient-primary">High-Speed Performance</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Combining state-of-the-art frontend utilities to build immersive 3D web applications with seamless UX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-7 h-7 text-cyan-400" />,
              title: 'Hardware Accelerated',
              desc: 'High-efficiency WebGL pipeline built with React Three Fiber delivering stable 60 FPS across desktop and mobile devices.'
            },
            {
              icon: <Layers className="w-7 h-7 text-indigo-400" />,
              title: 'Glassmorphism Design',
              desc: 'Modern frosted glass UI interfaces layered cleanly over background 3D WebGL scenes for a sleek futuristic depth.'
            },
            {
              icon: <Sparkles className="w-7 h-7 text-purple-400" />,
              title: 'Dynamic Spring Cursor',
              desc: 'Integrated custom spring cursor following cursor physics and scaling dynamically on interactive elements.'
            },
            {
              icon: <Shield className="w-7 h-7 text-emerald-400" />,
              title: 'TypeScript & React 19',
              desc: 'Strictly typed component state management compatible with Next.js 16 App Router and Turbopack bundler.'
            },
            {
              icon: <Globe className="w-7 h-7 text-rose-400" />,
              title: 'Global Smooth Scroll',
              desc: 'Fluid CSS scroll-behavior paired with native viewport animations managed by Framer Motion.'
            },
            {
              icon: <Share2 className="w-7 h-7 text-amber-400" />,
              title: 'Reactive DOM State',
              desc: 'Instant state synchronization between standard HTML user inputs and Three.js physical material properties.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-8 rounded-3xl glass-card border border-slate-800/80 hover:border-slate-700/80 transition-all group"
            >
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 w-fit mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Flexible Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Simple, Transparent <span className="text-gradient-primary">Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your production build requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Starter',
              price: '$0',
              desc: 'Ideal for rapid prototyping and personal experimental 3D websites.',
              features: ['Standard 3D Geometries', '60 FPS Basic Shader Engine', 'Community Support', 'Single Project Export']
            },
            {
              name: 'Pro Studio',
              price: '$49',
              popular: true,
              desc: 'For professional web designers creating high-performance commercial websites.',
              features: [
                'All Physical Material Presets',
                'Custom Particle Shaders',
                'Spring Motion Cursor Pack',
                'Next.js 16 & React 19 Starter Kit',
                'Priority Tech Support'
              ]
            },
            {
              name: 'Enterprise',
              price: '$199',
              desc: 'Custom WebGL rendering pipelines and dedicated optimization engineering.',
              features: [
                'Custom Shader Pipeline Development',
                'Unlimited Commercial Projects',
                'SLA & High Concurrency Performance',
                'Dedicated 3D Graphics Engineer'
              ]
            }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 md:p-10 rounded-3xl relative flex flex-col justify-between ${
                plan.popular
                  ? 'glass-card border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20'
                  : 'glass-card border border-slate-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-slate-100">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-4 rounded-full text-sm font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-indigo-500/30'
                    : 'glass hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="relative z-10 py-24 max-w-4xl mx-auto px-6 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about Aura3D technology stack.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <div className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400">
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/40 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription CTA */}
      <section className="relative z-10 py-20 max-w-5xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center border border-indigo-500/30 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Join the <span className="text-gradient-primary">3D Web Revolution</span>
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base mb-8">
              Subscribe to get access to advanced WebGL shader templates, 3D asset libraries, and release updates.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/50 text-cyan-300 font-semibold max-w-md mx-auto flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5 text-cyan-400" />
                <span>{"\u2713 Subscribed! Welcome to Aura3D."}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-4 rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 grow"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all shrink-0 shadow-lg shadow-indigo-500/30"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 glass-nav">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-slate-200">Aura3D Engine</span>
          </div>

          <div className="flex gap-8 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-slate-200 transition-colors">
              Features
            </a>
            <a href="#customizer" className="hover:text-slate-200 transition-colors">
              3D Studio
            </a>
            <a href="#pricing" className="hover:text-slate-200 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-slate-200 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-slate-600 mt-8">
          © {new Date().getFullYear()} Aura3D Experience. All rights reserved. Built with Next.js & Three.js.
        </div>
      </footer>
    </main>
  )
}
