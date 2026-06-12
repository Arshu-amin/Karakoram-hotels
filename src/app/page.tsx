'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />

      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
          >
            Evolution of Interface
          </motion.span>

          <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[0.9]">
            FUTURE <br /> VISUALS
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-12 font-medium"
          >
            Elevate your digital presence with immersive 3D experiences
            crafted for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
              View Showcase
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </div>

      {/* Modern Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Core Capabilities</h2>
          <div className="w-20 h-1.5 bg-indigo-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Immersive 3D",
              desc: "Deep integration with Three.js for interactive, real-time rendering that captivates users.",
              icon: "01"
            },
            {
              title: "Fluid Motion",
              desc: "Physics-based animations using Framer Motion for a natural, high-end feel throughout.",
              icon: "02"
            },
            {
              title: "Performance",
              desc: "Optimized for high refresh rates and minimal layout shifts using Next.js core features.",
              icon: "03"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] transition-all duration-500"
            >
              <span className="block text-4xl font-black text-white/10 mb-6 group-hover:text-indigo-500/50 transition-colors duration-500">
                {feature.icon}
              </span>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Horizontal Scroll or Grid */}
      <section className="relative z-10 py-32 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-12">
            Powered By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-2xl font-black tracking-tighter">NEXT.JS 16</div>
             <div className="text-2xl font-black tracking-tighter">REACT 19</div>
             <div className="text-2xl font-black tracking-tighter">THREE.JS</div>
             <div className="text-2xl font-black tracking-tighter">TAILWIND</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[10px]">N</div>
            <span>© 2026 NEXT_3D EXPERIENCE</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
