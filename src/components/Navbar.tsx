'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
          LUMINA
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'About', 'Showcase', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Login
          </button>
          <button className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-indigo-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
