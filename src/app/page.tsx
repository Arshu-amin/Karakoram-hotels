'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  return (
    <main ref={containerRef} className="relative min-h-[300vh] bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Fixed Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-none">
              FUTURE <br />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                INTERFACES
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-xl mx-auto mb-12"
          >
            Next-generation digital experiences powered by WebGL and advanced motion systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative px-10 py-5 bg-white text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              Explore Now
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-10 py-5 glass rounded-full font-bold transition-all hover:bg-white/5 active:scale-95">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 min-h-screen py-32 px-4 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                Immersive <br />
                Dimensions.
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                We merge creative design with cutting-edge technology to build interfaces that aren&apos;t just seen, but felt. Every interaction is an opportunity for wonder.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">120+</h4>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">FPS Performance</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">0.5s</h4>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Load Time</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Fluidity", desc: "Silky smooth transitions and animations." },
                { title: "Clarity", desc: "Pixel-perfect refractive glass materials." },
                { title: "Depth", desc: "Dynamic lighting and spatial environments." },
                { title: "Impact", desc: "Memorable experiences that stand out." }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 glass rounded-3xl group hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Section */}
      <section className="relative z-10 h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">
            Ready to build the <br />
            <span className="italic font-serif text-indigo-400">extraordinary</span>?
          </h2>
          <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-2xl shadow-indigo-500/40">
            Let&apos;s Collaborate
          </button>
        </motion.div>
      </section>

      <footer className="relative z-10 py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-medium">© 2026 EXPERIMENTAL STUDIOS</p>
          <div className="flex gap-12 text-sm font-bold tracking-widest text-slate-400 uppercase">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
