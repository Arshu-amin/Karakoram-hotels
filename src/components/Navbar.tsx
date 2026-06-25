'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#features' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex items-center justify-between shadow-2xl shadow-black/20">
        <Link href="/" className="text-xl font-bold tracking-tighter text-indigo-400 hover:text-indigo-300 transition-colors">
          QUANTUM
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
          Get Started
        </button>
      </div>
    </motion.nav>
  )
}
