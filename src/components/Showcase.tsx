'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Eye, CheckCircle2, ArrowUpRight, Gauge, Shield, Lightbulb } from 'lucide-react'

const SHOWCASE_TABS = [
  {
    id: 'materials',
    title: 'Physical Materials',
    subtitle: 'Raytraced Reflection & Clearcoat Physics',
    icon: Lightbulb,
    description: 'Advanced PBR (Physically Based Rendering) materials featuring metallic sheen, roughness maps, and specular reflections that react dynamically to environment lighting.',
    metrics: [
      { label: 'Clearcoat Level', value: '0.80' },
      { label: 'Reflectivity', value: '90%' },
      { label: 'Roughness Scale', value: '0.20' },
    ],
    tags: ['WebGL PBR', 'Physical Materials', 'Environment Maps'],
  },
  {
    id: 'performance',
    title: '60 FPS Pipeline',
    subtitle: 'Zero Frame Drops & Memory Disposal',
    icon: Gauge,
    description: 'Engineered for high frame rates across all devices. Uses instanced buffer attributes and dynamic particle pooling for minimal GPU overhead.',
    metrics: [
      { label: 'Frame Rate', value: '60+ FPS' },
      { label: 'Particle Capacity', value: '180 Points' },
      { label: 'GPU VRAM', value: '< 24MB' },
    ],
    tags: ['Instanced Mesh', 'GPU Buffer', 'FPS Optimized'],
  },
  {
    id: 'security',
    title: 'Client-Side Safety',
    subtitle: 'Isolated WebGL Context & SSR Safe',
    icon: Shield,
    description: 'Dynamic Client Component isolation prevents SSR hydration mismatches and guarantees robust fallback state handling during WebGL context loss.',
    metrics: [
      { label: 'Hydration Lag', value: '0ms' },
      { label: 'Fallback Pulse', value: 'Instant' },
      { label: 'SSR Isolation', value: '100%' },
    ],
    tags: ['Next.js 16', 'Context Shield', 'Zero Layout Shift'],
  },
]

export default function Showcase() {
  const [activeTab, setActiveTab] = useState('materials')

  const currentTab = SHOWCASE_TABS.find((t) => t.id === activeTab) || SHOWCASE_TABS[0]

  return (
    <section id="showcase" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
            <Eye className="w-3.5 h-3.5" />
            Live Capabilities Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            See the Engine <span className="text-gradient-secondary">In Action</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-md">
          Switch between capability modules to inspect real-time performance benchmarks and material properties.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-white/10">
        {SHOWCASE_TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 border ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'glass text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {tab.title}
            </button>
          )
        })}
      </div>

      {/* Tab Content Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Description Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
              {currentTab.subtitle}
            </span>

            <h3 className="text-2xl md:text-4xl font-bold text-white">
              {currentTab.title}
            </h3>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {currentTab.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {currentTab.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#customizer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/25"
              >
                Test in 3D Studio
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Metrics Cards Column */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {currentTab.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-black text-white font-mono tracking-tight text-gradient-primary">
                    {metric.value}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
