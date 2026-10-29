'use client'

import { SceneConfig } from './Scene'
import { Sliders, Palette, Zap, Sparkles, RotateCcw, Box, Circle, Gem, Disc } from 'lucide-react'

interface CustomizerProps {
  config: SceneConfig
  onChange: (newConfig: SceneConfig) => void
}

export default function Customizer({ config, onChange }: CustomizerProps) {
  const colorPresets = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Cyan', value: '#38bdf8' },
  ]

  const shapes = [
    { id: 'torus' as const, label: 'Torus Knot', icon: Box },
    { id: 'sphere' as const, label: 'Orb Sphere', icon: Circle },
    { id: 'crystal' as const, label: 'Crystal', icon: Gem },
    { id: 'ring' as const, label: 'Cyber Ring', icon: Disc },
  ]

  const handleShapeSelect = (shape: SceneConfig['shape']) => {
    onChange({ ...config, shape })
  }

  const handleColorSelect = (color: string) => {
    onChange({ ...config, color })
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, speed: parseFloat(e.target.value) })
  }

  const handleDistortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, distort: parseFloat(e.target.value) })
  }

  const handleWireframeToggle = () => {
    onChange({ ...config, wireframe: !config.wireframe })
  }

  const handleParticlesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...config, particlesCount: parseInt(e.target.value, 10) })
  }

  const handleReset = () => {
    onChange({
      shape: 'torus',
      color: '#6366f1',
      speed: 1.5,
      distort: 0.4,
      wireframe: false,
      particlesCount: 200,
    })
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 backdrop-blur-xl border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">3D Studio Controls</h3>
            <p className="text-xs text-slate-400">Manipulate WebGL shaders in real time</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all text-xs flex items-center gap-1.5"
          title="Reset Parameters"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Geometry Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-indigo-400" /> Geometry Mesh
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {shapes.map((s) => {
            const IconComponent = s.icon
            const isSelected = config.shape === s.id
            return (
              <button
                key={s.id}
                onClick={() => handleShapeSelect(s.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-pink-400" /> Shading Theme
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleColorSelect(preset.value)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                config.color === preset.value
                  ? 'border-white bg-slate-800 text-white shadow-md'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                style={{ backgroundColor: preset.value }}
              />
              <span className="text-xs font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Speed & Distortion Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Rotation Speed
            </span>
            <span className="font-mono text-indigo-400">{config.speed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={config.speed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Distortion Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Mesh Distortion
            </span>
            <span className="font-mono text-indigo-400">{config.distort.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="0.8"
            step="0.05"
            value={config.distort}
            onChange={handleDistortChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Wireframe and Particles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={config.wireframe}
            onChange={handleWireframeToggle}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-xs font-semibold text-slate-300">Wireframe Mesh Mode</span>
        </label>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Particle Field Density:</span>
          <input
            type="range"
            min="50"
            max="400"
            step="50"
            value={config.particlesCount}
            onChange={handleParticlesChange}
            className="w-28 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span className="text-xs font-mono text-purple-400 w-8">{config.particlesCount}</span>
        </div>
      </div>
    </div>
  )
}
