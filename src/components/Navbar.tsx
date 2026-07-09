'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4 rounded-2xl">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-gradient">
          NEXT.3D
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Showcase', 'Features', 'Technology', 'About'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="px-5 py-2 bg-white text-slate-950 rounded-full text-sm font-semibold hover:scale-105 transition-transform active:scale-95">
          Get Started
        </button>
      </div>
    </motion.nav>
  )
}
