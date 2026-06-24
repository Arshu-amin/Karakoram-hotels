'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" />
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const
    }
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <Scene />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent">
            Modern Experience
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          An interactive, high-performance interface built with Next.js,
          Tailwind CSS, and immersive 3D animations.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4"
        >
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
            Get Started
          </button>
          <button className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95">
            Learn More
          </button>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {[
            { title: "Performance", desc: "Optimized for speed and high frame rates with Turbopack." },
            { title: "3D Visuals", desc: "Stunning 3D components rendered with WebGL and Three.js." },
            { title: "Modern Stack", desc: "Built with React 19, Next.js 16, and Tailwind CSS v4." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="w-6 h-6 rounded-full bg-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center text-slate-500">
        <p className="text-sm tracking-widest uppercase opacity-50">© 2026 Next.js 3D App. All rights reserved.</p>
      </footer>
    </main>
  )
}
