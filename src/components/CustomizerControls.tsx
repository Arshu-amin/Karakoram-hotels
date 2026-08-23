'use client'

import { SceneConfig, ShapeType } from './Scene'
import { Sparkles, Palette, Zap, Layers, Eye, RefreshCw } from 'lucide-react'

interface CustomizerControlsProps {
  config: SceneConfig
  onChange: (newConfig: SceneConfig) => void
  onReset: () => void
}

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'octahedron', label: 'Octahedron' },
]

const COLORS = [
  '#6366f1', // Indigo
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
]

export default function CustomizerControls({
  config,
  onChange,
  onReset,
}: CustomizerControlsProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 text-white space-y-6 border border-slate-700/50 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h3 className="text-lg font-bold tracking-wide">3D Studio Controls</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Geometry Shape Selection */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-400" /> Geometry Shape
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              onClick={() => onChange({ ...config, shape: s.id })}
              className={`px-3 py-2 text-xs font-medium rounded-xl transition-all border ${
                config.shape === s.id
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Selection */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Palette className="w-4 h-4 text-indigo-400" /> Material Color
        </label>
        <div className="flex items-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...config, color: c })}
              className={`w-7 h-7 rounded-full transition-transform border-2 ${
                config.color === c ? 'scale-125 border-white shadow-lg' : 'border-transparent hover:scale-110 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      {/* Sliders: Speed & Distortion */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-indigo-400" /> Rotation Speed
            </span>
            <span className="font-mono text-indigo-400">{config.speed ?? 2}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="5"
            step="0.2"
            value={config.speed ?? 2}
            onChange={(e) => onChange({ ...config, speed: parseFloat(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Distortion
            </span>
            <span className="font-mono text-indigo-400">{Math.round((config.distort ?? 0.4) * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={config.distort ?? 0.4}
            onChange={(e) => onChange({ ...config, distort: parseFloat(e.target.value) })}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <Eye className="w-4 h-4 text-indigo-400" /> Wireframe Mode
        </span>
        <button
          onClick={() => onChange({ ...config, wireframe: !config.wireframe })}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
            config.wireframe ? 'bg-indigo-600' : 'bg-slate-700'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              config.wireframe ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
