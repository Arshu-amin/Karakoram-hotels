'use client'

import { Box, Globe, Share2, Code2, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Box className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Aura3D</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering next-generation web platforms with real-time WebGL rendering and interactive 3D motion graphics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors" aria-label="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors" aria-label="Source Code">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors" aria-label="Share App">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a></li>
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Real-Time Engine</a></li>
              <li><a href="#architecture" className="hover:text-indigo-400 transition-colors">Architecture</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Updates & Access</a></li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Technology Stack</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Next.js 16 (Turbopack)</li>
              <li>React 19 Server Components</li>
              <li>Three.js & React Three Fiber</li>
              <li>Tailwind CSS v4 & Framer Motion</li>
            </ul>
          </div>

          {/* Engine Status */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">System Status</h4>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400">WebGL Renderer Active</span>
              </div>
              <p className="text-xs text-slate-400">Targeting 60 FPS hardware acceleration on current display device.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Aura3D Engine. Designed for modern web applications.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built with Next.js 16 & React 19</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
