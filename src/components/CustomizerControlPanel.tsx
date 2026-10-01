'use client'

import { motion } from 'framer-motion'
import { Sliders, Palette, Zap, Box, Eye, Code, RefreshCw } from 'lucide-react'

export interface CustomizerState {
  shape: 'torusKnot' | 'icosahedron' | 'sphere' | 'cube'
  color: string
  speed: number
  distort: number
  wireframe: boolean
}

interface CustomizerControlPanelProps {
  state: CustomizerState
  onChange: (newState: Partial<CustomizerState>) => void
  onOpenCodeModal: () => void
}

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyber Cyan', value: '#06b6d4' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Sunset Amber', value: '#f59e0b' },
  { name: 'Neon Magenta', value: '#ec4899' },
  { name: 'Electric Violet', value: '#8b5cf6' },
]

const SHAPES: { id: CustomizerState['shape']; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'cube', label: 'Cyber Cube' },
]

export default function CustomizerControlPanel({
  state,
  onChange,
  onOpenCodeModal,
}: CustomizerControlPanelProps) {
  const handlePresetApply = (preset: Partial<CustomizerState>) => {
    onChange(preset)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">3D Canvas Studio Controls</h3>
            <p className="text-xs text-slate-400">Tune WebGL geometry, material, and physics shaders in real-time</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onChange({
                shape: 'torusKnot',
                color: '#6366f1',
                speed: 2,
                distort: 0.4,
                wireframe: false,
              })
            }
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Reset to Default"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenCodeModal}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 transition-colors text-xs font-mono flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Geometry Shape */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-indigo-400" /> Geometry Mesh
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => onChange({ shape: s.id })}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between border ${
                  state.shape === s.id
                    ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span>{s.label}</span>
                {state.shape === s.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Color Palette */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-purple-400" /> Shader Theme
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => onChange({ color: p.value })}
                className={`w-8 h-8 rounded-full transition-transform border-2 relative ${
                  state.color.toLowerCase() === p.value.toLowerCase()
                    ? 'scale-110 border-white shadow-lg'
                    : 'border-transparent hover:scale-105 opacity-80'
                }`}
                style={{ backgroundColor: p.value }}
                title={p.name}
              />
            ))}
            <input
              type="color"
              value={state.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="w-8 h-8 rounded-full border-0 bg-transparent cursor-pointer p-0 opacity-80 hover:opacity-100"
              title="Custom Hex Color"
            />
          </div>
        </div>

        {/* 3. Dynamic Controls: Speed & Distort */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Rotation Speed
              </span>
              <span className="font-mono text-indigo-400 font-semibold">{state.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={state.speed}
              onChange={(e) => onChange({ speed: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300 uppercase tracking-wider">Distortion Noise</span>
              <span className="font-mono text-indigo-400 font-semibold">{state.distort.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.2"
              step="0.05"
              value={state.distort}
              onChange={(e) => onChange({ distort: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* 4. Render Modes & Preset Quick-Select */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-pink-400" /> Wireframe & Presets
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onChange({ wireframe: !state.wireframe })}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                state.wireframe
                  ? 'bg-pink-600/30 border-pink-500 text-pink-200 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              {state.wireframe ? 'Wireframe ON' : 'Solid Shader'}
            </button>
          </div>

          <div className="flex gap-1.5 pt-1">
            <button
              onClick={() =>
                handlePresetApply({
                  shape: 'icosahedron',
                  color: '#06b6d4',
                  speed: 3.5,
                  distort: 0.6,
                  wireframe: false,
                })
              }
              className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-[11px] text-cyan-300 hover:bg-cyan-900/50 transition-colors"
            >
              Cyber Pulse
            </button>
            <button
              onClick={() =>
                handlePresetApply({
                  shape: 'torusKnot',
                  color: '#ec4899',
                  speed: 1.5,
                  distort: 0.8,
                  wireframe: false,
                })
              }
              className="px-2.5 py-1 rounded-lg bg-pink-950/40 border border-pink-800/50 text-[11px] text-pink-300 hover:bg-pink-900/50 transition-colors"
            >
              Neon Wave
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
