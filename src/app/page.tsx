'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const FadeInView = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" as const }}
  >
    {children}
  </motion.div>
)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY, opacity }}
          className="absolute inset-0 z-0"
        >
          <Scene />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400">
              Future of Web Design
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-indigo-400/50 bg-clip-text text-transparent leading-none">
              DIMENSIONAL<br />INTERFACES
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Pushing the boundaries of digital expression through immersive 3D experiences and fluid motion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group relative px-10 py-4 bg-white text-slate-950 rounded-full font-bold overflow-hidden transition-all hover:pr-14 active:scale-95">
              <span className="relative z-10">Start Exploring</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 group-hover:right-6">
                →
              </span>
            </button>
            <button className="px-10 py-4 border border-slate-800 hover:bg-slate-900 rounded-full font-bold transition-all active:scale-95">
              View Showcase
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <FadeInView>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
                Crafting <span className="text-indigo-500 italic">unforgettable</span> digital journeys.
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                We combine technical excellence with artistic vision to create interfaces that don&apos;t just work—they inspire.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Real-time Rendering", desc: "Silky smooth 60FPS animations using WebGL and Three.js." },
                  { title: "Adaptive Motion", desc: "Physics-based interactions that respond to user intent." },
                  { title: "Modern Architecture", desc: "Built on Next.js 16 for ultimate performance and SEO." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>

            <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-indigo-500/20 blur-[100px] group-hover:bg-indigo-500/30 transition-colors" />
              </div>
              {/* Visual placeholder for more complex 3D or images */}
              <div className="relative h-full w-full flex items-center justify-center text-slate-700 font-mono text-xs uppercase tracking-[0.2em]">
                Interactive Matrix Visualization
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">NEXT_3D</h3>
            <p className="text-slate-500 max-w-xs">
              Redefining the web, one dimension at a time.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>

          <div className="text-slate-500 text-sm">
            © 2026 Dimensional Interfaces.
          </div>
        </div>
      </footer>
    </main>
  )
}
