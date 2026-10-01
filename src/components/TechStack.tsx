'use client'

import { motion } from 'framer-motion'
import { Code2, Box, Layers, Cpu, ShieldCheck, Sparkles } from 'lucide-react'

const TECH = [
  {
    name: 'Next.js 16',
    role: 'Framework & Turbopack',
    icon: Code2,
    desc: 'App Router architecture with lightning-fast static and dynamic build optimizations.',
  },
  {
    name: 'React 19',
    role: 'Core UI Engine',
    icon: Sparkles,
    desc: 'Concurrent mode rendering, server components, and granular hook updates.',
  },
  {
    name: 'Three.js & R3F',
    role: 'WebGL Visualizer',
    icon: Box,
    desc: 'Declarative 3D scene construction with hardware-accelerated WebGL pipelines.',
  },
  {
    name: 'Tailwind CSS v4',
    role: 'Styling Engine',
    icon: Layers,
    desc: 'Utility-first CSS styling powered by inline CSS variable theme extensions.',
  },
  {
    name: 'Framer Motion',
    role: 'Animation Engine',
    icon: Cpu,
    desc: 'Fluid spring physics, scroll progress drivers, and responsive layout transitions.',
  },
  {
    name: 'TypeScript',
    role: 'Type Safety',
    icon: ShieldCheck,
    desc: 'Strict end-to-end type safety for WebGL material properties and UI props.',
  },
]

export default function TechStack() {
  return (
    <section id="tech" className="py-20 relative z-10 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Code2 className="w-3.5 h-3.5" /> Stack Architecture
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Powered by <span className="text-gradient-gold">Cutting-Edge Tech</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg"
        >
          Built from the ground up with industry-standard frameworks designed for peak performance and visual perfection.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH.map((t, idx) => {
          const Icon = t.icon
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass glass-hover p-6 rounded-2xl border border-white/10 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-0.5">{t.name}</h3>
                <p className="text-xs font-mono text-indigo-400 mb-2">{t.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
