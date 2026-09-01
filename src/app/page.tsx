'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Play, Cpu, ShieldCheck, Zap, Layers, ChevronDown } from 'lucide-react'

import Navbar from '@/components/Navbar'
import Customizer from '@/components/Customizer'
import Features from '@/components/Features'
import Showcase from '@/components/Showcase'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

// Dynamically import WebGL Canvas with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3 text-indigo-400">
      <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
        Initializing WebGL Canvas...
      </span>
    </div>
  ),
})

export default function Home() {
  // 3D Scene configuration state manipulated by Studio Customizer controls
  const [sceneConfig, setSceneConfig] = useState({
    color: '#6366f1',
    speed: 1,
    distortion: 0.4,
    scale: 1,
    shape: 'torusknot' as 'torusknot' | 'icosahedron' | 'sphere' | 'torus',
    wireframe: false,
  })

  // Global window scroll progress for scroll-driven animations
  const { scrollY } = useScroll()
  const sceneOpacity = useTransform(scrollY, [0, 800], [0.85, 0.35])
  const heroY = useTransform(scrollY, [0, 500], [0, -80])

  const handleConfigChange = (key: string, value: string | number | boolean) => {
    setSceneConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetConfig = () => {
    setSceneConfig({
      color: '#6366f1',
      speed: 1,
      distortion: 0.4,
      scale: 1,
      shape: 'torusknot',
      wireframe: false,
    })
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Fixed Background WebGL Scene Container */}
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene {...sceneConfig} />
      </motion.div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center max-w-5xl mx-auto"
      >
        <motion.div style={{ y: heroY }} className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 shadow-lg shadow-indigo-950/40 text-xs font-semibold text-indigo-300"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Introducing Aura 3D v2.5 Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white"
          >
            Immersive Web <br />
            <span className="text-gradient-primary">Reimagined in 3D</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-2xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Combine real-time hardware-accelerated WebGL physics with modern glassmorphism UI components and silky scroll transitions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#customizer"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-all shadow-xl shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
            >
              <Sparkles className="w-5 h-5" />
              Customize 3D Mesh
            </a>

            <a
              href="#showcase"
              className="px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-white font-semibold text-base border border-white/10 transition-all hover:-translate-y-0.5 flex items-center gap-2.5"
            >
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              Watch Live Demos
            </a>
          </motion.div>

          {/* Metrics Pill Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, label: '60+ FPS Target', val: 'WebGL PBR' },
              { icon: Cpu, label: 'Low GPU VRAM', val: '< 24MB' },
              { icon: ShieldCheck, label: 'SSR Isolated', val: 'Next.js 16' },
              { icon: Layers, label: 'Frost Glass', val: 'Tailwind v4' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center text-center"
                >
                  <Icon className="w-5 h-5 text-indigo-400 mb-1.5" />
                  <span className="text-xs font-bold text-white font-mono">{item.val}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.label}</span>
                </div>
              )
            })}
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="pt-8 flex flex-col items-center text-slate-500 text-xs font-mono"
          >
            <span>Scroll to explore studio</span>
            <ChevronDown className="w-4 h-4 text-slate-500 mt-1" />
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Interactive Customizer Studio Section */}
      <section id="customizer" className="py-24 px-4 md:px-8 relative z-10">
        <Customizer
          config={sceneConfig}
          onChange={handleConfigChange}
          onReset={handleResetConfig}
        />
      </section>

      {/* Features Grid Section */}
      <Features />

      {/* Showcase Capabilities Tabs Section */}
      <Showcase />

      {/* Pricing License Plans Section */}
      <Pricing />

      {/* FAQ Accordion Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  )
}
