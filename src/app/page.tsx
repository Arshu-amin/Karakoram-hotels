'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import {
  Sparkles,
  Sliders,
  Box,
  Layers,
  ArrowRight,
  RotateCw,
  Eye,
  Zap,
  ShieldCheck,
  Cpu,
  Palette,
  CheckCircle2,
  ChevronDown,
  Globe,
  Share2,
  Code2
} from 'lucide-react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Initializing WebGL Canvas...</span>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls State
  const [shape, setShape] = useState<'torusKnot' | 'icosahedron' | 'sphere' | 'octahedron'>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.5)
  const [scale, setScale] = useState(1.2)
  const [wireframe, setWireframe] = useState(false)

  // Newsletter State
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Active FAQ Accordion index
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Fixed Background 3D WebGL Canvas */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          shape={shape}
          color={color}
          speed={speed}
          scale={scale}
          wireframe={wireframe}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-slate-200">
            Next-Generation WebGL Experience
          </span>
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">
            v2.0 Live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08] max-w-5xl"
        >
          Craft Stunning <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Interactive</span> Interfaces
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
        >
          Elevate your digital products with fluid 60FPS WebGL shaders, realtime controls, and glassmorphic aesthetic engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <a
            href="#studio"
            className="px-8 py-4 rounded-full font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>Explore 3D Studio</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full font-semibold glass hover:bg-slate-800/80 text-slate-200 transition-all border border-slate-700/80 hover:border-slate-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-base"
          >
            <span>Capabilities</span>
          </a>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="studio" className="relative z-10 py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Take full control of the real-time background shader canvas. Adjust geometries, motion speed, colors, and rendering modes below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-6 md:p-10 border border-slate-700/60 shadow-2xl backdrop-blur-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Control Panel Settings */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <Sliders className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">Shader Parameters</h3>
              </div>

              {/* Geometry Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                  <Box className="w-4 h-4 text-purple-400" />
                  Select Geometry Mesh
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'torusKnot', label: 'Torus Knot' },
                    { id: 'icosahedron', label: 'Icosahedron' },
                    { id: 'sphere', label: 'Sphere' },
                    { id: 'octahedron', label: 'Octahedron' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setShape(item.id as typeof shape)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 border ${
                        shape === item.id
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Preset Palette */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 block flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-400" />
                  Material Color Theme
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { hex: '#6366f1', name: 'Indigo Aura' },
                    { hex: '#a855f7', name: 'Purple Neon' },
                    { hex: '#ec4899', name: 'Hot Pink' },
                    { hex: '#06b6d4', name: 'Cyber Cyan' },
                    { hex: '#10b981', name: 'Emerald' },
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setColor(c.hex)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        color === c.hex
                          ? 'border-indigo-400 bg-indigo-500/20 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders: Speed & Scale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5"><RotateCw className="w-3.5 h-3.5 text-cyan-400" /> Motion Speed</span>
                    <span className="text-indigo-300 font-mono">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-indigo-400" /> Scale Factor</span>
                    <span className="text-indigo-300 font-mono">{scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />
                </div>
              </div>

              {/* Render Mode Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full py-3.5 px-4 rounded-xl font-medium border text-sm transition-all flex items-center justify-center gap-2.5 ${
                    wireframe
                      ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Eye className="w-4 h-4 text-pink-400" />
                  <span>Wireframe Mode: {wireframe ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            </div>

            {/* Studio Info / Output Box */}
            <div className="lg:col-span-5 glass rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between h-full min-h-[300px]">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Live Telemetry</span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    WebGL Active
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300">
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-500">Geometry Type:</span>
                    <span className="text-indigo-300 capitalize">{shape}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-500">Material Hex:</span>
                    <span className="text-pink-300">{color}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-500">Target Frame Rate:</span>
                    <span className="text-emerald-300">60.0 FPS</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-500">Shading Pipeline:</span>
                    <span className="text-cyan-300">MeshPhysicalMaterial</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6">
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Drag with your primary pointer over the canvas to orbit and rotate the geometry in 3D space.
                </p>
                <button
                  onClick={() => {
                    setShape('torusKnot')
                    setColor('#6366f1')
                    setSpeed(1.5)
                    setScale(1.2)
                    setWireframe(false)
                  }}
                  className="w-full py-2.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                >
                  Reset Parameters
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Engineered for <span className="text-gradient-primary">Performance</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Built from the ground up with cutting-edge tools to deliver uncompromised graphics performance and seamless interactivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              color: 'from-amber-500 to-orange-500',
              title: 'Ultra-Fast Rendering',
              desc: 'Optimized WebGL pipelines powered by Three.js and React Three Fiber to maintain high frame rates.'
            },
            {
              icon: ShieldCheck,
              color: 'from-indigo-500 to-purple-500',
              title: 'Next.js 16 Ready',
              desc: 'Full compatibility with React 19, Turbopack, and Next.js App Router for server rendering.'
            },
            {
              icon: Cpu,
              color: 'from-cyan-500 to-blue-500',
              title: 'Hardware Accelerated',
              desc: 'Leverages GPU hardware acceleration for smooth particle effects, physical materials, and lighting.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-2xl p-8 hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} p-[1px] mb-6 shadow-lg`}>
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Showcase Cards Section */}
      <section id="showcase" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            Creative <span className="text-gradient-secondary">Showcase</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover how Aura 3D transforms digital product presentations into immersive storytelling experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              tag: 'WebGL Shader',
              title: 'Dynamic Lighting',
              desc: 'Multi-point directional lighting and ambient shadows cast realistic specular highlights onto 3D meshes.',
              icon: Globe
            },
            {
              tag: 'Interaction',
              title: 'Smooth Camera Orbit',
              desc: 'Intuitive orbit controls enable 360-degree interactive exploration of digital assets.',
              icon: Share2
            },
            {
              tag: 'Architecture',
              title: 'Modular Components',
              desc: 'Easily plug and play custom 3D components into existing Next.js landing pages.',
              icon: Code2
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {item.tag}
                  </span>
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing" className="relative z-10 py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Flexible <span className="text-gradient-primary">Plans</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Scale your web application with our simple, transparent pricing structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '$0',
              period: 'Forever Free',
              desc: 'Perfect for personal projects and experimentation.',
              features: ['Standard 3D Geometries', '60FPS WebGL Renderer', 'Community Support', 'Basic Controls'],
              popular: false,
              cta: 'Get Started Free'
            },
            {
              name: 'Pro Studio',
              price: '$29',
              period: 'per month',
              desc: 'Ideal for creative agencies and professional developers.',
              features: ['Custom Shader Materials', 'Advanced Particles Cloud', 'Priority GPU Acceleration', '24/7 Dedicated Support', 'Commercial License'],
              popular: true,
              cta: 'Upgrade to Pro'
            },
            {
              name: 'Enterprise',
              price: '$99',
              period: 'per month',
              desc: 'Tailored solutions for high-traffic enterprise platforms.',
              features: ['Unlimited 3D Canvas Instances', 'Custom Asset Pipelines', 'SLA Guarantee', 'Dedicated Solutions Engineer', 'White-label Embeds'],
              popular: false,
              cta: 'Contact Sales'
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative ${
                plan.popular ? 'border-2 border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.25)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{plan.desc}</p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm font-medium">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="relative z-10 py-24 px-4 max-w-4xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked <span className="text-gradient-secondary">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about setting up 3D graphics in modern web applications.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does 3D rendering perform on mobile devices?',
              a: 'Aura 3D automatically adjusts viewport resolution and geometry density depending on hardware capabilities, ensuring a smooth 60FPS experience across mobile and desktop browser engines.'
            },
            {
              q: 'Can I integrate my own 3D GLTF/GLB models?',
              a: 'Yes! You can load custom 3D models using React Three Fiber standard useGLTF hooks and pass them directly into the background Scene container.'
            },
            {
              q: 'Is standard Server Side Rendering (SSR) supported?',
              a: 'Yes. The WebGL Canvas is dynamically imported with SSR disabled, preventing hydration mismatches and guaranteeing instant static HTML load times.'
            },
            {
              q: 'Which browsers support WebGL2 graphics?',
              a: 'All modern browser engines including Chrome, Safari, Firefox, and Edge fully support WebGL2 out of the box.'
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-6 text-left font-semibold text-white flex justify-between items-center gap-4 hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 sm:p-14 text-center border border-indigo-500/30 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Ready to Transform Your <br />
              <span className="text-gradient-primary">Digital Web Presence?</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Join thousands of innovative creators building next-gen web applications with interactive 3D elements.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3.5 rounded-xl glass-input text-white placeholder-slate-400 text-sm flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap shadow-lg shadow-indigo-500/25"
              >
                {subscribed ? "\u2713 Subscribed" : 'Get Access Now'}
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 pt-16 pb-12 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Box className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Aura <span className="text-gradient-primary">3D</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting immersive, high-performance web experiences through modern 3D graphics and responsive UI design.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#studio" className="hover:text-white transition-colors">3D Studio</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Showcase</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shader Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Aura 3D Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js 16, React 19, Tailwind CSS & Three.js
          </p>
        </div>
      </footer>
    </main>
  )
}
