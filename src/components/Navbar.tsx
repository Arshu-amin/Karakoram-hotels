'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Box, Sparkles, Layers, Cpu, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 ${
            scrolled ? 'glass shadow-2xl shadow-indigo-950/20' : 'bg-slate-900/40 backdrop-blur-md border border-white/5'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                AURA <span className="text-gradient-primary font-extrabold">3D</span>
              </span>
              <span className="text-[10px] text-indigo-300/70 font-mono tracking-widest uppercase">Next Generation</span>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#customizer" className="hover:text-white flex items-center gap-1.5 transition-colors group">
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              Studio
            </a>
            <a href="#features" className="hover:text-white flex items-center gap-1.5 transition-colors group">
              <Layers className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              Features
            </a>
            <a href="#tech" className="hover:text-white flex items-center gap-1.5 transition-colors group">
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              Tech Stack
            </a>
          </div>

          {/* CTA Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 text-white font-semibold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Launch Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.nav>
      </div>
    </header>
  )
}
