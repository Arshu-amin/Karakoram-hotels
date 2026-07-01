'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <div className="glass px-8 py-4 rounded-full flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-gradient">
          NEXUS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
          Contact
        </button>
      </div>
    </motion.nav>
  )
}
