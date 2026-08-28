'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Gauge, Eye, Zap, RefreshCw, CircleDot } from 'lucide-react'
import { ShapeType } from './Scene'

interface CustomizerProps {
  shape: ShapeType
  setShape: (shape: ShapeType) => void
  color: string
  setColor: (color: string) => void
  wireframe: boolean
  setWireframe: (wireframe: boolean) => void
  speed: number
  setSpeed: (speed: number) => void
  metalness: number
  setMetalness: (metalness: number) => void
}

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Sphere' },
]

const COLOR_PRESETS = [
  { name: 'Indigo Nebula', value: '#6366f1' },
  { name: 'Cyber Purple', value: '#a855f7' },
  { name: 'Neon Cyan', value: '#06b6d4' },
  { name: 'Emerald Glow', value: '#10b981' },
  { name: 'Rose Quartz', value: '#f43f5e' },
  { name: 'Solar Gold', value: '#f59e0b' },
]

export default function Customizer({
  shape,
  setShape,
  color,
  setColor,
  wireframe,
  setWireframe,
  speed,
  setSpeed,
  metalness,
  setMetalness,
}: CustomizerProps) {
  const handleReset = () => {
    setShape('torusKnot')
    setColor('#6366f1')
    setWireframe(false)
    setSpeed(2)
    setMetalness(0.8)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">3D Studio Controller</h3>
            <p className="text-xs text-slate-400">Manipulate real-time WebGL parameters</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
          title="Reset Controls"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Geometry Selection */}
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-indigo-400" />
            Geometry Mesh
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setShape(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between border ${
                  shape === s.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/50 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900/50 hover:bg-slate-800/50 border-white/5 text-slate-300'
                }`}
              >
                <span>{s.label}</span>
                {shape === s.id && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" />
            Material Accent Color
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 overflow-x-auto pb-1">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setColor(preset.value)}
                  className={`w-8 h-8 rounded-full flex-shrink-0 transition-transform ${
                    color === preset.value ? 'scale-125 ring-2 ring-white shadow-lg' : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-9 h-9 rounded-xl bg-transparent border border-white/10 cursor-pointer overflow-hidden p-0"
              title="Custom Color"
            />
          </div>
        </div>

        {/* Sliders: Speed & Metalness */}
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" /> Rotation Speed
              </span>
              <span className="font-mono text-cyan-400">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" /> Metallic Reflection
              </span>
              <span className="font-mono text-indigo-400">{Math.round(metalness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={metalness}
              onChange={(e) => setMetalness(parseFloat(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer bg-slate-800 rounded-lg h-2"
            />
          </div>
        </div>

        {/* Wireframe Toggle */}
        <div className="pt-2 flex items-center justify-between bg-slate-900/40 p-3.5 rounded-xl border border-white/5">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            Wireframe Render Mode
          </span>
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
              wireframe ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                wireframe ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
