'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { name: 'Experience', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Tech Stack', href: '#' },
  { name: 'Contact', href: '#' }
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      <nav className="flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white group-hover:rotate-12 transition-transform duration-300">
            N
          </div>
          <span className="font-bold tracking-tight text-white/90">NEXT_3D</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 rounded-full border border-white/10 transition-all active:scale-95">
          Connect
        </button>
      </nav>
    </motion.header>
  )
}
