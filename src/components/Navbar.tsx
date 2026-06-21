'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' as const }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl mt-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
          N
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">NEXT.GEN</span>
      </div>

      <nav className="flex items-center gap-1 p-1 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md">
        {['Features', 'Expertise', 'Projects', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full transition-colors"
          >
            {item}
          </Link>
        ))}
      </nav>

      <button className="px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
        Launch App
      </button>
    </motion.header>
  )
}
