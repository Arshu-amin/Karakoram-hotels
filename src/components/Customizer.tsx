'use client'

import { Sliders, Palette, Activity, Grid, RotateCcw, Box } from 'lucide-react'

export interface CustomizerProps {
  config: {
    color: string
    speed: number
    distortion: number
    scale: number
    shape: 'torusknot' | 'icosahedron' | 'sphere' | 'torus'
    wireframe: boolean
  }
  onChange: (key: string, value: string | number | boolean) => void
  onReset: () => void
}

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Neon Pink', value: '#ec4899' },
  { name: 'Cyan Glow', value: '#06b6d4' },
  { name: 'Emerald Spark', value: '#10b981' },
  { name: 'Amber Glow', value: '#f59e0b' },
  { name: 'Violet Nebula', value: '#a855f7' },
]

const SHAPE_OPTIONS: { id: 'torusknot' | 'icosahedron' | 'sphere' | 'torus'; label: string }[] = [
  { id: 'torusknot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'torus', label: 'Torus' },
]

export default function Customizer({ config, onChange, onReset }: CustomizerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Background Accent Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Interactive 3D Studio
            </h2>
            <p className="text-sm text-slate-400">
              Customize real-time WebGL mesh properties and physical material parameters.
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Parameters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shape & Geometry Selection */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Box className="w-4 h-4 text-indigo-400" />
              Mesh Geometry
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {SHAPE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChange('shape', s.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-2 ${
                    config.shape === s.id
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900/50 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <label className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              Physical Material Color
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => onChange('color', p.value)}
                  title={p.name}
                  className={`h-10 rounded-xl transition-all border-2 relative flex items-center justify-center ${
                    config.color === p.value
                      ? 'scale-110 border-white shadow-lg'
                      : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: p.value }}
                />
              ))}
            </div>
            {/* Custom Hex Picker Input */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-2 rounded-xl border border-white/5">
              <input
                type="color"
                value={config.color}
                onChange={(e) => onChange('color', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Hex: {config.color}
              </span>
            </div>
          </div>
        </div>

        {/* Sliders and Toggles */}
        <div className="space-y-6">
          {/* Animation Speed */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Rotation Speed
              </label>
              <span className="text-xs font-mono text-indigo-400 font-semibold">
                {config.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={config.speed}
              onChange={(e) => onChange('speed', parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pulse Distortion */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Pulse Distortion
              </label>
              <span className="text-xs font-mono text-purple-400 font-semibold">
                {config.distortion.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1.0"
              step="0.05"
              value={config.distortion}
              onChange={(e) => onChange('distortion', parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Scale */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Box className="w-4 h-4 text-pink-400" />
                Object Scale
              </label>
              <span className="text-xs font-mono text-pink-400 font-semibold">
                {config.scale.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.05"
              value={config.scale}
              onChange={(e) => onChange('scale', parseFloat(e.target.value))}
              className="w-full accent-pink-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Wireframe Toggle */}
          <div className="pt-2">
            <button
              onClick={() => onChange('wireframe', !config.wireframe)}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                config.wireframe
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow-md'
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                Wireframe Overlay Mode
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                  config.wireframe ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {config.wireframe ? 'Enabled' : 'Disabled'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
