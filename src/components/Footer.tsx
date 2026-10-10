'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Send, CheckCircle2, ArrowUpRight, Globe, Share2, Code2 } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gradient-primary">
                Aura 3D
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Crafting immersive digital experiences with interactive WebGL 3D canvas rendering, dynamic user controls, and high-performance React Next.js architectures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Share2, href: '#', label: 'Share' },
                { icon: Code2, href: '#', label: 'Code' },
              ].map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl glass border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {['Features', '3D Customizer', 'Showcase', 'Tech Stack', 'Pricing'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-slate-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {['Documentation', 'API Reference', 'GitHub Repo', 'WebGL Shader Guide', 'Release Notes'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Stay Updated</h4>
            <p className="text-slate-400 text-xs">
              Subscribe to get updates on new 3D components and framework upgrades.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 flex items-center gap-3 text-xs"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>{"\u2713 Subscribed! Check your inbox soon."}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email..."
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-200 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Aura 3D Platform. Built with Next.js 16 & Three.js.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
