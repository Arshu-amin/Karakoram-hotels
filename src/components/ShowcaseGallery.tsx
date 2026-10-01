'use client'

import { motion } from 'framer-motion'
import { Sparkles, Play } from 'lucide-react'
import { CustomizerState } from './CustomizerControlPanel'

interface ShowcaseGalleryProps {
  onApplyPreset: (preset: Partial<CustomizerState>) => void
}

const PRESETS: {
  id: string
  title: string
  subtitle: string
  description: string
  config: CustomizerState
  badge: string
  colorBadge: string
}[] = [
  {
    id: 'quantum-lattice',
    title: 'Quantum Lattice',
    subtitle: 'High-Density Torus Knot',
    description: 'Dynamic vertex noise with high metallic reflectivity and ultra-fluid rotation.',
    config: {
      shape: 'torusKnot',
      color: '#818cf8',
      speed: 2.8,
      distort: 0.5,
      wireframe: false,
    },
    badge: 'INDIGO FLUX',
    colorBadge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'cyber-crystal',
    title: 'Cyber Crystal',
    subtitle: 'Low-Poly Icosahedron Core',
    description: 'Geometric facet symmetry with vibrant cyan shading and rapid spin velocity.',
    config: {
      shape: 'icosahedron',
      color: '#06b6d4',
      speed: 3.8,
      distort: 0.35,
      wireframe: false,
    },
    badge: 'CYAN SHIELD',
    colorBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'holographic-matrix',
    title: 'Holographic Matrix',
    subtitle: 'Wireframe Cyber Cube',
    description: 'Minimalist neon vector cage displaying pure mathematical spatial wireframes.',
    config: {
      shape: 'cube',
      color: '#ec4899',
      speed: 1.8,
      distort: 0.0,
      wireframe: true,
    },
    badge: 'NEON MATRIX',
    colorBadge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  },
  {
    id: 'fluid-plasma',
    title: 'Fluid Plasma Sphere',
    subtitle: 'High-Distortion Orb',
    description: 'Organic molten metal physics with intense surface noise displacement.',
    config: {
      shape: 'sphere',
      color: '#f59e0b',
      speed: 2.2,
      distort: 0.85,
      wireframe: false,
    },
    badge: 'SOLAR PLASMA',
    colorBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
]

export default function ShowcaseGallery({ onApplyPreset }: ShowcaseGalleryProps) {
  return (
    <section id="presets" className="py-24 relative z-10 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" /> Interactive Showcase
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Explore 3D <span className="text-gradient-cyan">Design Archetypes</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg"
        >
          Select any preset card below to instantly inject its shader physics, mesh geometry, and color theme into the live background canvas.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PRESETS.map((preset, idx) => (
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass glass-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${preset.colorBadge}`}
                >
                  {preset.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">PRESET #{idx + 1}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {preset.title}
              </h3>
              <p className="text-xs font-mono text-indigo-400 mb-3">{preset.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{preset.description}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>SPEED: {preset.config.speed}x</span>
                <span>•</span>
                <span>DISTORT: {preset.config.distort}</span>
              </div>

              <button
                onClick={() => onApplyPreset(preset.config)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Apply Live
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
