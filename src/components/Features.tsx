'use client'

import { motion } from 'framer-motion'
import { Cpu, Zap, Layers, ShieldCheck, Sparkles, Code2 } from 'lucide-react'

const FEATURES = [
  {
    icon: Cpu,
    title: 'Hardware Accelerated WebGL',
    description: 'High-performance 3D rendering pipeline powered by WebGL & React Three Fiber at silky smooth 60+ FPS.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Zero Latency State Sync',
    description: 'Instant reactive bindings between DOM interface controls and 3D mesh uniforms for fluid real-time tweaking.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Layers,
    title: 'Glassmorphism Design System',
    description: 'Modern translucent frost UI components with dynamic blur filters and subtle ambient lighting reflections.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Sparkles,
    title: 'Framer Motion Physics',
    description: 'Physics-based scroll animations, layout transitions, spring physics, and interactive pointer effects.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Code2,
    title: 'Next.js App Router Architecture',
    description: 'Built with React 19, TypeScript, dynamic WebGL component isolation, and zero-layout-shift hydration.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: ShieldCheck,
    title: 'Production-Grade Performance',
    description: 'Optimized vertex buffers, automated memory disposal, and responsive viewport canvas resize handlers.',
    color: 'from-emerald-500 to-teal-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen Architecture
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
        >
          Engineered for <span className="text-gradient-primary">Unrivaled Visuals</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg"
        >
          Explore the technology behind our immersive web experience, combining cutting-edge WebGL graphics with seamless user interaction.
        </motion.p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 transition-all group flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn technical spec</span>
                <span>→</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
