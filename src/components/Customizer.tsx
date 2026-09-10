'use client'

import React from 'react'
import { SceneConfig } from './Scene'
import { Sparkles, Sliders, Palette, Activity, Eye, Box } from 'lucide-react'

interface CustomizerProps {
  config: SceneConfig
  onChange: (newConfig: Partial<SceneConfig>) => void
}

const SHAPES: { id: SceneConfig['shape']; name: string }[] = [
  { id: 'torus', name: 'Torus Knot' },
  { id: 'icosahedron', name: 'Icosahedron' },
  { id: 'sphere', name: 'Blob Sphere' },
  { id: 'cyberRing', name: 'Cyber Ring' },
]

const COLORS = [
  { name: 'Indigo Aura', hex: '#6366f1' },
  { name: 'Cyber Neon', hex: '#06b6d4' },
  { name: 'Electric Pink', hex: '#ec4899' },
  { name: 'Vibrant Amber', hex: '#f59e0b' },
  { name: 'Emerald Glow', hex: '#10b981' },
  { name: 'Deep Violet', hex: '#8b5cf6' },
]

export default function Customizer({ config, onChange }: CustomizerProps) {
  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 max-w-xl w-full mx-auto space-y-6 text-left border border-indigo-500/20 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              3D Interactive Studio <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">Tweak rendering parameters in real-time</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live WebGL
        </span>
      </div>

      {/* Shape Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-indigo-400" /> Geometry Mesh
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange({ shape: s.id })}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                config.shape === s.id
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-pink-400" /> Material Color Accent
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => onChange({ color: c.hex })}
              title={c.name}
              className={`w-9 h-9 rounded-full transition-all duration-200 flex items-center justify-center border-2 ${
                config.color === c.hex ? 'scale-110 border-white shadow-lg shadow-indigo-500/40' : 'border-transparent opacity-75 hover:opacity-100 hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {config.color === c.hex && <div className="w-2.5 h-2.5 rounded-full bg-white shadow" />}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Speed */}
        <div className="space-y-2 bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Spin Speed
            </span>
            <span className="text-cyan-400 font-mono font-semibold">{config.speed?.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="4"
            step="0.1"
            value={config.speed ?? 1.5}
            onChange={(e) => onChange({ speed: parseFloat(e.target.value) })}
            className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>

        {/* Distortion */}
        <div className="space-y-2 bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Distortion
            </span>
            <span className="text-purple-400 font-mono font-semibold">{config.distort?.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={config.distort ?? 0.35}
            onChange={(e) => onChange({ distort: parseFloat(e.target.value) })}
            className="w-full accent-purple-400 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>
      </div>

      {/* Wireframe toggle */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-400" /> Wireframe Rendering Mode
        </span>
        <button
          onClick={() => onChange({ wireframe: !config.wireframe })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 border border-slate-700 ${
            config.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              config.wireframe ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
