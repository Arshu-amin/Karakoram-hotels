'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import type { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
    </div>
  ),
})

export default function Home() {
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [distort, setDistort] = useState(0.4)
  const [speed, setSpeed] = useState(2)
  const [wireframe, setWireframe] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background 3D Canvas Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <Scene
          shape={shape}
          color={color}
          distort={distort}
          speed={speed}
          wireframe={wireframe}
        />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-40 glass border-b border-slate-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
              A
            </div>
            <span className="font-bold text-xl tracking-tight text-gradient-primary">
              AURA 3D
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#hero" className="hover:text-purple-400 transition-colors">
              Overview
            </a>
            <a href="#customizer" className="hover:text-purple-400 transition-colors">
              3D Customizer
            </a>
            <a href="#features" className="hover:text-purple-400 transition-colors">
              Features
            </a>
            <a href="#metrics" className="hover:text-purple-400 transition-colors">
              Performance
            </a>
          </nav>

          <a
            href="#customizer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all hover:scale-105 active:scale-95"
          >
            Launch Studio
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-xs font-semibold text-purple-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Next-Gen WebGL & WebGPU Render Engine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' as const }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl leading-none"
        >
          Crafting Next-Gen <br />
          <span className="text-gradient-primary">Interactive 3D Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          Elevate your visual interface with smooth WebGL shaders, real-time parametric distortion, and fluid glassmorphism design system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Customize 3D Object
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/50 font-semibold text-slate-200 border border-slate-700/80 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            Explore Tech Stack
          </a>
        </motion.div>
      </section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Interactive <span className="text-gradient-secondary">3D Studio</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Directly manipulate real-time WebGL mesh properties including geometry type, material color, distortion intensity, and spin rate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Controls Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 flex flex-col gap-6 lg:col-span-1"
          >
            <h3 className="text-xl font-bold text-slate-200 border-b border-slate-800 pb-4">
              Object Parameters
            </h3>

            {/* Shape Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Geometry Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosa' },
                  { id: 'sphere', label: 'Sphere' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as ShapeType)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      shape === item.id
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Material Color Accent
              </label>
              <div className="flex gap-3">
                {['#6366f1', '#c084fc', '#38bdf8', '#10b981', '#f43f5e'].map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-9 h-9 rounded-full transition-transform ${
                      color === hex ? 'ring-4 ring-purple-400/50 scale-110' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Distort Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Distortion Factor</span>
                <span className="text-purple-400">{distort.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={distort}
                onChange={(e) => setDistort(parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Animation Speed</span>
                <span className="text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5"
                step="0.2"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Wireframe Overlay
              </span>
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  wireframe ? 'bg-purple-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    wireframe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Interactive Visual Studio Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between lg:col-span-2 relative overflow-hidden min-h-[380px]"
          >
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                Viewport Preview
              </span>
              <span className="text-xs font-mono text-slate-400">
                Renderer: WebGL / R3F
              </span>
            </div>

            <div className="z-10 bg-slate-950/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl max-w-md mt-auto">
              <h4 className="font-bold text-slate-200 mb-1">Live Shading Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                MeshDistortMaterial dynamically recalculates vertex positions on every animation tick, yielding organic motion without static mesh assets.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Engineered for <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built with modern web standards to deliver smooth frame rates, responsive interactions, and accessible code architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'High FPS Rendering',
              desc: 'Optimized lighting pipelines and GPU fragment shaders deliver fluid 60+ FPS visuals across desktop and mobile browsers.',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              ),
              title: 'Dynamic Shading',
              desc: 'Parametric materials dynamically adapt distortion vectors, roughness, and metalness with near zero CPU overhead.',
            },
            {
              icon: (
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              ),
              title: 'Glassmorphism UI',
              desc: 'Layered frosted glass components with backdrop filters create deep visual hierarchy and seamless content integration.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card rounded-3xl p-8 hover:border-purple-500/40 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real-Time Metrics & Tech Showcase Section */}
      <section id="metrics" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-10 md:p-16 border border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { metric: '60 FPS', label: 'Smooth Animation Target' },
              { metric: '100%', label: 'Typescript & React 19' },
              { metric: '< 50ms', label: 'WebGL Shader Initialization' },
              { metric: '0KB', label: 'Static Heavy Assets' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-5xl font-black text-gradient-secondary mb-2">
                  {stat.metric}
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-10 md:p-16 border border-purple-500/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with <span className="text-gradient-primary">Aura 3D</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Get early access to our upcoming 3D shader library, particle preset controls, and interactive WebGL components.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold inline-block">
              {'\u2713'} Thank you! You&apos;re subscribed to Aura 3D updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 focus:outline-none focus:border-purple-500 text-slate-200 flex-1 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition-all hover:scale-105 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-xs text-slate-500 glass">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <span className="font-semibold text-slate-300">Aura 3D Engine</span>
          </div>
          <p>© 2026 Aura 3D App. Crafted with Next.js & React Three Fiber.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#hero" className="hover:text-purple-400">Privacy</a>
            <a href="#hero" className="hover:text-purple-400">Terms</a>
            <a href="#hero" className="hover:text-purple-400">Docs</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
