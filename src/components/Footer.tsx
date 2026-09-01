'use client'

import { useState, FormEvent } from 'react'
import { Box, Send, Globe, Share2, Code2, Heart } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Summary */}
        <div className="md:col-span-5 space-y-6">
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              Aura <span className="text-gradient-primary">3D</span>
            </span>
          </a>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Pushing the boundaries of modern web user interfaces with real-time WebGL physical rendering, smooth scroll animations, and interactive 3D physics.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Global Network"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Share App"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Developer Docs"
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-400">
            <li><a href="#hero" className="hover:text-indigo-300 transition-colors">Overview</a></li>
            <li><a href="#customizer" className="hover:text-indigo-300 transition-colors">3D Studio</a></li>
            <li><a href="#features" className="hover:text-indigo-300 transition-colors">Engine Specs</a></li>
            <li><a href="#showcase" className="hover:text-indigo-300 transition-colors">Demos</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
          <ul className="space-y-2.5 text-xs font-medium text-slate-400">
            <li><a href="#pricing" className="hover:text-indigo-300 transition-colors">Pricing & Plans</a></li>
            <li><a href="#faq" className="hover:text-indigo-300 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition-colors">GLSL Shaders</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription Form */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Stay Updated</h4>
          <p className="text-xs text-slate-400">
            Subscribe to receive release notes, new 3D shader updates, and performance optimization guides.
          </p>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center glass rounded-xl border border-white/10 p-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="bg-transparent px-3 py-2 text-xs text-white focus:outline-none w-full placeholder:text-slate-500"
                required
              />
              <button
                type="submit"
                className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                {"\u2713 Subscribed to release newsletter!"}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Aura 3D Platform. Built with Next.js 16, R3F & Framer Motion.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for modern web interfaces.
        </p>
      </div>
    </footer>
  )
}
