'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Customizer from '@/components/Customizer'
import { SceneConfig } from '@/components/Scene'
import {
  Zap,
  Cpu,
  Layers,
  Palette,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  Send,
  Star,
  Activity,
  Terminal,
  Box,
  Circle,
  Gem,
  Disc
} from 'lucide-react'

// Dynamically import Scene to prevent WebGL hydration mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      <span className="text-xs font-mono text-indigo-400 animate-pulse">Initializing WebGL Canvas...</span>
    </div>
  ),
})

export default function Home() {
  const [sceneConfig, setSceneConfig] = useState<SceneConfig>({
    shape: 'torus',
    color: '#6366f1',
    speed: 1.5,
    distort: 0.4,
    wireframe: false,
    particlesCount: 200,
  })

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Pricing Billing cycle toggle
  const [isAnnual, setIsAnnual] = useState(true)

  // Newsletter state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const applyPreset = (presetConfig: Partial<SceneConfig>) => {
    setSceneConfig((prev) => ({ ...prev, ...presetConfig }))
    const el = document.getElementById('customizer')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    {
      icon: Zap,
      title: 'Real-Time WebGL Shader Pipeline',
      desc: 'Hardware-accelerated physical rendering with dynamic mesh distortion, clearcoat reflections, and interactive particle field effects.',
      tag: 'WebGL 2.0',
    },
    {
      icon: Cpu,
      title: 'React 19 & Next.js 16 Core',
      desc: 'Built on the absolute bleeding edge of fullstack React, leveraging Server Components and Turbopack optimizations.',
      tag: 'Architecture',
    },
    {
      icon: Layers,
      title: 'Fluid 60 FPS Physics Engine',
      desc: 'Silky smooth spring physics and scroll-driven motion animations calibrated for frame-perfect responsiveness.',
      tag: 'Performance',
    },
    {
      icon: Palette,
      title: 'Glassmorphic Design System',
      desc: 'Custom frosted glass utilities, dynamic background glows, and high-contrast typography crafted for modern dark UI aesthetics.',
      tag: 'Design System',
    },
    {
      icon: Globe,
      title: 'Cross-Device Responsiveness',
      desc: 'Seamlessly adapts from high-resolution multi-monitor desktop setups down to touch-enabled mobile screens.',
      tag: 'Compatibility',
    },
    {
      icon: Shield,
      title: 'Production Ready & Robust',
      desc: 'Fully typed TypeScript codebase, zero hydration overhead, and strict accessibility standards built in from day one.',
      tag: 'Enterprise',
    },
  ]

  const showcasePresets = [
    {
      title: 'Cybernetic Knot',
      shape: 'torus' as const,
      color: '#6366f1',
      distort: 0.45,
      wireframe: false,
      speed: 1.8,
      icon: Box,
      desc: 'Dynamic torus topology with high-frequency surface wave distortion.',
    },
    {
      title: 'Aurora Crystal',
      shape: 'crystal' as const,
      color: '#ec4899',
      distort: 0.1,
      wireframe: false,
      speed: 1.2,
      icon: Gem,
      desc: 'Refractory icosahedron geometry featuring vibrant magenta clearcoat.',
    },
    {
      title: 'Wireframe Orb',
      shape: 'sphere' as const,
      color: '#38bdf8',
      distort: 0.3,
      wireframe: true,
      speed: 2.0,
      icon: Circle,
      desc: 'Cyan vector wireframe mesh pulsing at high angular frequency.',
    },
    {
      title: 'Emerald Cyber Ring',
      shape: 'ring' as const,
      color: '#10b981',
      distort: 0.0,
      wireframe: false,
      speed: 1.0,
      icon: Disc,
      desc: 'Sleek metallic ring with deep specular reflections and subtle float.',
    },
  ]

  const faqs = [
    {
      q: 'What powers the 3D graphics in AURA 3D?',
      a: 'AURA 3D utilizes Three.js integrated via React Three Fiber and Drei. It uses hardware-accelerated WebGL 2.0 shaders and physical lighting models for ultra-smooth 60 FPS performance.',
    },
    {
      q: 'Can I customize the 3D shapes and lighting programmatically?',
      a: 'Yes! The 3D scene parameters (mesh geometry, color palette, rotation speed, distortion, and wireframe mode) are exposed via reactive React state and can be updated dynamically from any component.',
    },
    {
      q: 'Is it compatible with mobile browsers?',
      a: 'Absolutely. The WebGL context automatically optimizes particle counts and pixel ratios to guarantee smooth performance across iOS Safari, Android Chrome, and desktop platforms.',
    },
    {
      q: 'How does AURA 3D integrate with Next.js 16?',
      a: 'The 3D Scene is loaded client-side via Next.js dynamic imports (`ssr: false`) to avoid server-side WebGL hydration mismatches while ensuring fast initial page loads.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Custom Mouse Cursor */}
      <Cursor />

      {/* Navigation Bar */}
      <Navbar />

      {/* Fixed Background 3D Canvas Viewport */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <Scene config={sceneConfig} />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-radial from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />

      {/* MAIN CONTENT LAYER */}
      <div className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto py-16">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-lg shadow-indigo-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Next-Gen WebGL Engine v2.0 Released</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="font-mono text-slate-400">Next.js 16</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.08]"
          >
            Elevate Your Web Experience with{' '}
            <span className="text-gradient-primary">3D Immersion</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="text-lg sm:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-normal"
          >
            An ultra-modern, high-performance web template combining dynamic 3D shaders,
            glassmorphism UI, and interactive parameter controls.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#customizer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Interactive 3D</span>
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base glass border border-slate-700/80 hover:bg-slate-800/80 text-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <span>View Features</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Live Engine Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl glass border border-slate-800"
          >
            {[
              { label: 'WebGL Frame Rate', value: '60 FPS', sub: 'Smooth Rendering' },
              { label: 'Render Latency', value: '< 10ms', sub: 'Zero Lag' },
              { label: 'Active Particles', value: `${sceneConfig.particlesCount}`, sub: 'Dynamic Physics' },
              { label: 'Shader Mode', value: sceneConfig.wireframe ? 'Wireframe' : 'Physical', sub: 'Real-Time Shading' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 text-center border-r last:border-r-0 border-slate-800/80">
                <span className="text-2xl font-extrabold text-white font-mono">{stat.value}</span>
                <span className="text-xs font-semibold text-indigo-400 mt-1">{stat.label}</span>
                <span className="text-[10px] text-slate-500">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Cutting-Edge Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Engineered for <span className="text-gradient-secondary">Speed & Elegance</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Explore the core building blocks that make AURA 3D the ultimate frontend template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const IconComp = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-8 transition-all hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* INTERACTIVE 3D CUSTOMIZER SECTION */}
        <section id="customizer" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold">
              Live WebGL Playground
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Interactive <span className="text-gradient-primary">3D Studio</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Tweak parameters in the DOM panel below and watch the background WebGL scene update instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel Column */}
            <div className="lg:col-span-7">
              <Customizer config={sceneConfig} onChange={setSceneConfig} />
            </div>

            {/* Quick Presets / Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Active Parameters State</h3>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Geometry:</span>
                    <span className="text-indigo-400 font-bold uppercase">{sceneConfig.shape}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Theme Hex:</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sceneConfig.color }} />
                      <span className="text-pink-400 font-bold">{sceneConfig.color}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Speed Multiplier:</span>
                    <span className="text-amber-400 font-bold">{sceneConfig.speed}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Surface Distortion:</span>
                    <span className="text-cyan-400 font-bold">{sceneConfig.distort}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wireframe Active:</span>
                    <span className={sceneConfig.wireframe ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {sceneConfig.wireframe ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Developer Code Snippet Box */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span>React Three Fiber Code Integration</span>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950/90 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                  <code>{`<Scene
  shape="${sceneConfig.shape}"
  color="${sceneConfig.color}"
  speed={${sceneConfig.speed}}
  wireframe={${sceneConfig.wireframe}}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SHOWCASE GALLERY SECTION */}
        <section id="showcase" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Curated WebGL Styles
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Preset <span className="text-gradient-secondary">Showcase Gallery</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Click any style preset below to apply its geometry and shading directly to the live 3D Scene.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcasePresets.map((preset, idx) => {
              const IconComp = preset.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.color }}
                      />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">{preset.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">{preset.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      applyPreset({
                        shape: preset.shape,
                        color: preset.color,
                        distort: preset.distort,
                        wireframe: preset.wireframe,
                        speed: preset.speed,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all shadow-md group-hover:scale-[1.02]"
                  >
                    <span>Apply Preset</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Flexible Plans
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Simple, Transparent <span className="text-gradient-gold">Pricing</span>
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Unlock complete source access, custom shaders, and commercial licenses.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full glass border border-slate-800">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  !isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                name: 'Starter',
                price: isAnnual ? '$19' : '$24',
                desc: 'Perfect for individual creators and personal portfolio projects.',
                features: ['Full Next.js 16 Source Code', 'Standard 3D WebGL Shapes', 'Community Discord Support', 'Personal License'],
                highlighted: false,
                buttonText: 'Get Started',
              },
              {
                name: 'Pro Studio',
                price: isAnnual ? '$49' : '$59',
                desc: 'Ideal for agencies and indie developers building commercial apps.',
                features: [
                  'Everything in Starter',
                  'Custom Physical Materials & Shaders',
                  'Unlimited Commercial License',
                  'High-Density Particle Fields',
                  'Priority Technical Support',
                ],
                highlighted: true,
                buttonText: 'Launch Pro Studio',
              },
              {
                name: 'Enterprise',
                price: isAnnual ? '$149' : '$179',
                desc: 'Dedicated support, custom WebGL shader engineering, and SLA.',
                features: [
                  'Everything in Pro Studio',
                  'Custom 3D Model Optimization',
                  'Dedicated WebGL Engineer',
                  '24/7 Priority Support SLA',
                  'Custom Security & Onboarding',
                ],
                highlighted: false,
                buttonText: 'Contact Enterprise',
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                  plan.highlighted
                    ? 'border-2 border-indigo-500/80 shadow-2xl shadow-indigo-500/20 bg-slate-900/80 scale-105 z-20'
                    : 'border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{plan.price}</span>
                    <span className="text-slate-400 text-xs">/ month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-slate-300">
                        <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400 flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/30 hover:scale-[1.02]'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="scroll-mt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-base text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* NEWSLETTER CTA SECTION */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-indigo-500/30 text-center relative overflow-hidden bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 inline-block">
                Stay Ahead of the Curve
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Subscribe for WebGL Updates & Shader Presets
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Join 10,000+ developers receiving monthly 3D web tutorials, performance tips, and shader releases.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold inline-flex items-center gap-2"
                >
                  <span>{"\u2713"} Subscribed! Thank you for joining AURA 3D.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                  >
                    <span>Join Free</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-900 bg-slate-950/90 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">AURA 3D</span>
              <span className="text-xs text-slate-500">© 2026 All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#customizer" className="hover:text-white transition-colors">
                Studio Controls
              </a>
              <a href="#showcase" className="hover:text-white transition-colors">
                Showcase
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All WebGL Systems Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
