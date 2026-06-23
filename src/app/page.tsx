'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' as const }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent uppercase">
              Future<br />Visions
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto font-light tracking-widest uppercase mb-12"
          >
            Crafting immersive digital experiences through 3D art and modern technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300">
              Explore Now
            </button>
            <button className="px-10 py-4 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors duration-300">
              Our Story
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950">
        <section className="max-w-7xl mx-auto py-32 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Immersive <span className="text-indigo-500">Realism</span> in Every Pixel
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We push the boundaries of what&apos;s possible on the web. By leveraging WebGL and modern React frameworks, we create interfaces that feel alive and responsive.
              </p>
              <div className="h-1 w-20 bg-indigo-500" />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="aspect-square rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center"
                >
                  <div className="text-indigo-500 font-black text-4xl">0{i}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-32 px-4">
          <div className="p-12 md:p-24 rounded-[3rem] bg-indigo-600 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready to start your journey?</h2>
              <p className="text-indigo-100 text-xl mb-12 opacity-80">
                Join hundreds of creators building the next generation of the web with our advanced toolset.
              </p>
              <button className="px-12 py-6 bg-white text-indigo-600 text-xl font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                Get Started Today
              </button>
            </div>
          </div>
        </section>

        <footer className="py-24 px-4 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black tracking-tighter">FUTURE.</div>
            <div className="flex gap-12 text-slate-500 uppercase tracking-widest text-xs">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
            <p className="text-slate-600 text-sm">© 2026 Future Visions. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
