'use client'

import { motion } from 'framer-motion'
import { Sparkles, Cpu, Layers, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react'

const FEATURES = [
  {
    icon: Cpu,
    title: 'WebGL 2.0 Shading Engine',
    description: 'Hardware-accelerated 3D graphics rendering directly inside the browser using Three.js and React Three Fiber.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Sparkles,
    title: 'Dynamic Noise & Distortion',
    description: 'Custom vertex distort algorithms creating smooth organic fluid movement and futuristic geometric forms.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: SlidersHorizontal,
    title: 'Real-Time State Synchronization',
    description: 'DOM controls seamlessly synchronize parameter changes directly with WebGL canvas loop at 60 FPS.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Layers,
    title: 'Glassmorphism Design System',
    description: 'Multi-layered backdrop blur surfaces, subtle border gradients, and responsive glass structural cards.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Optimized Frame Rates',
    description: 'Lightweight asset footprint and non-blocking background render threads ensure buttery smooth animations.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: ShieldCheck,
    title: 'Next.js 16 & React 19 Stack',
    description: 'Built on Next.js Turbopack and React 19 Server/Client architecture for ultra-fast page load metrics.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10 px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" /> Capabilities & Tech
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Engineered for <span className="text-gradient-primary">Visual Excellence</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg"
        >
          Combine the power of modern WebGL canvas rendering with ultra-responsive DOM interfaces for next-generation web apps.
        </motion.p>
      </div>

      {/* Feature Cards Grid */}
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
              className="glass glass-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Background gradient blur on hover */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} blur-2xl group-hover:scale-150 transition-transform duration-500`}
              />

              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-inner group-hover:border-indigo-500/50 transition-colors">
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>MODULE // 0{idx + 1}</span>
                <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
