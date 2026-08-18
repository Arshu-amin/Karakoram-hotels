'use client'

import { Box, Globe, Share2, Code2, Heart, Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-xl text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Box className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                AURA<span className="text-gradient-primary">3D</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crafting immersive, real-time 3D web experiences with Next.js, Three.js, and modern shader technology.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#hero"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="Code Repository"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="Global Network"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#hero"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="Share Network"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Technology Stack
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">React 19 & Next.js 16</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Three.js & WebGL</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">React Three Fiber</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Framer Motion</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Tailwind CSS v4</span></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#hero" className="hover:text-indigo-400 transition-colors">Overview</a></li>
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Customizer</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Architecture</a></li>
              <li><a href="#cta" className="hover:text-indigo-400 transition-colors">Newsletter</a></li>
            </ul>
          </div>

          {/* System Status Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                WebGL Engine Active
              </div>
              <h5 className="text-white text-sm font-medium mb-1">System Operational</h5>
              <p className="text-xs text-slate-400">Rendering at target 60+ FPS with dynamic hardware acceleration.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>LATENCY: 12ms</span>
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aura 3D Studio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" /> for modern web performance
          </p>
        </div>
      </div>
    </footer>
  )
}
