'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ShieldCheck,
  Activity,
  ArrowRight,
  Globe,
  Code2,
  Box,
} from 'lucide-react'
import Customizer from '@/components/Customizer'
import { ShapeType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-indigo-400 animate-pulse">Initializing WebGL Engine...</span>
      </div>
    </div>
  ),
})

export default function Home() {
  const [shape, setShape] = useState<ShapeType>('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [wireframe, setWireframe] = useState(false)
  const [speed, setSpeed] = useState(2)
  const [metalness, setMetalness] = useState(0.8)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const { scrollY } = useScroll()
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0.2])
  const scaleHero = useTransform(scrollY, [0, 400], [1, 0.95])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Dynamic 3D Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          shape={shape}
          color={color}
          wireframe={wireframe}
          speed={speed}
          metalness={metalness}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-8 shadow-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-xs font-semibold tracking-wide uppercase text-indigo-300">
            Aura 3D v2.0 Released
          </span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400 ml-1" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 leading-[1.08]"
        >
          Next Generation <br className="hidden sm:inline" />
          <span className="text-gradient-primary">Interactive 3D</span> Web
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-normal leading-relaxed"
        >
          Experience a fluid, high-performance UI powered by Next.js 16, React Three Fiber,
          and dynamic scroll physics with real-time DOM-to-WebGL reactivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#customizer"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 3D Studio</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/60 font-semibold text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-white/10"
          >
            <span>View Architecture</span>
          </a>
        </motion.div>

        {/* Live Metrics Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl glass p-4 rounded-2xl border border-white/5"
        >
          {[
            { label: 'Frame Rate', value: '60 FPS', sub: 'WebGL 2.0' },
            { label: 'Rendering', value: 'Physics PBR', sub: 'Real-time' },
            { label: 'Load Time', value: '< 0.4s', sub: 'Optimized' },
            { label: 'Responsive', value: '100%', sub: 'Cross-platform' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-2 text-center">
              <span className="text-xl font-bold text-white font-mono">{stat.value}</span>
              <span className="text-xs font-semibold text-indigo-400">{stat.label}</span>
              <span className="text-[10px] text-slate-500">{stat.sub}</span>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Interactive 3D Customizer Studio Section */}
      <section id="customizer" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time WebGL Interaction</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Control the <span className="text-gradient-primary">3D Canvas</span> in Real-Time
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Interact directly with the WebGL rendering pipeline. Toggle wireframe modes, change
              geometry primitives, adjust specular reflections, and tweak rotation dynamics live
              from DOM controls.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: 'Low Latency State Sync',
                  desc: 'React state hooks effortlessly update Three.js mesh parameters without canvas re-creation.',
                },
                {
                  title: 'Physical Material Shaders',
                  desc: 'High-end metalness, roughness, and clearcoat reflection simulation.',
                },
                {
                  title: 'Adaptive Graphics Pipeline',
                  desc: 'Automatic pixel ratio scaling for smooth performance across all devices.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass-card">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 mt-1">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-base">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-6 flex justify-center">
            <Customizer
              shape={shape}
              setShape={setShape}
              color={color}
              setColor={setColor}
              wireframe={wireframe}
              setWireframe={setWireframe}
              speed={speed}
              setSpeed={setSpeed}
              metalness={metalness}
              setMetalness={setMetalness}
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for <span className="text-gradient-secondary">Maximum Impact</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A cohesive integration of modern web technologies crafted for visual elegance and fast performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: 'Lightning Performance',
              desc: 'Next.js App Router with React 19 server optimization and Turbopack fast builds.',
            },
            {
              icon: <Box className="w-6 h-6 text-indigo-400" />,
              title: '3D WebGL Rendering',
              desc: 'Hardware-accelerated Three.js scenes with ambient particles and dynamic lighting.',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-purple-400" />,
              title: 'Smooth Animations',
              desc: 'Framer Motion scroll triggers, spring physics cursor, and entrance transitions.',
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
              title: 'Type-Safe Architecture',
              desc: 'End-to-end TypeScript validation for components, canvas props, and utilities.',
            },
            {
              icon: <Cpu className="w-6 h-6 text-cyan-400" />,
              title: 'Tailwind CSS v4',
              desc: 'Next-gen CSS engine with inline themes, glassmorphism utilities, and native layout support.',
            },
            {
              icon: <Globe className="w-6 h-6 text-pink-400" />,
              title: 'Cross-Device Ready',
              desc: 'Fully responsive layouts designed for mobile, tablet, desktop, and ultra-wide displays.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee Grid */}
      <section id="tech" className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powered by Cutting-Edge <span className="text-gradient-primary">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Built using industry-standard modern frameworks and visual rendering libraries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Next.js 16', tag: 'Framework' },
            { name: 'React 19', tag: 'UI Engine' },
            { name: 'Three.js', tag: '3D Graphics' },
            { name: 'R3F & Drei', tag: 'WebGL Canvas' },
            { name: 'Tailwind v4', tag: 'Styling' },
            { name: 'Framer Motion', tag: 'Animations' },
          ].map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl glass text-center hover:border-indigo-500/40 transition-colors"
            >
              <Code2 className="w-5 h-5 mx-auto mb-2 text-indigo-400" />
              <div className="font-bold text-sm text-white">{tech.name}</div>
              <div className="text-[10px] text-slate-500 font-mono tracking-wider">{tech.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter Subscription Section */}
      <section className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Elevate Your Web Experience?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Subscribe to our newsletter for updates on 3D web design patterns, shader techniques, and performance guides.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
              <span>{"\u2713"} Subscribed! Thank you for joining.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Box className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300">AURA 3D EXPERIENCE</span>
          </div>

          <p>© 2026 Aura 3D Web Engine. Engineered with Next.js & WebGL.</p>

          <div className="flex items-center gap-6">
            <a href="#customizer" className="hover:text-slate-300 transition-colors">Studio</a>
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#tech" className="hover:text-slate-300 transition-colors">Tech Stack</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
