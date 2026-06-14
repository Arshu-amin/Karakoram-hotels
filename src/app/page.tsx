'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" />
})

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Modern Experience
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-10"
        >
          An interactive, high-performance interface built with Next.js,
          Tailwind CSS, and 3D animations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4"
        >
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
            Get Started
          </button>
          <button className="px-8 py-4 border border-slate-700 hover:bg-slate-800 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {[
            { title: "Performance", desc: "Optimized for speed and high frame rates." },
            { title: "3D Visuals", desc: "Stunning 3D components rendered with WebGL." },
            { title: "Modern Stack", desc: "Built with the latest technologies and best practices." },
            { title: "Interactive", desc: "Engage users with immersive experiences." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" as const }}
              className={`p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                i === 0 ? 'md:col-span-2' : i === 1 ? 'md:row-span-2' : ''
              }`}
            >
              <h3 className="text-xl font-bold mb-3 text-indigo-300">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500">
        <p>© 2026 Next.js 3D App. All rights reserved.</p>
      </footer>
    </main>
  )
}
