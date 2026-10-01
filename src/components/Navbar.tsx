'use client'

import { motion } from 'framer-motion'
import { Sparkles, Box, ArrowUpRight, Cpu } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 glass-nav px-4 lg:px-8 py-3.5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            AURA<span className="text-indigo-400 font-mono text-sm">3D</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#customizer" className="hover:text-white transition-colors flex items-center gap-1">
            Canvas <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#presets" className="hover:text-white transition-colors">
            Showcase
          </a>
          <a href="#tech" className="hover:text-white transition-colors">
            Tech Stack
          </a>
        </nav>

        {/* Actions & WebGL Status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>WebGL 2.0</span>
          </div>

          <a
            href="#customizer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            Launch Studio <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
