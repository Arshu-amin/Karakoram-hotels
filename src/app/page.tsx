'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
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
    <main ref={containerRef} className="relative bg-[#020617] text-white">
      {/* Fixed 3D Scene Background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient"
          >
            Digital<br />Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            Crafting immersive digital experiences through the intersection of
            3D technology and modern web interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20">
              Explore Now
            </button>
            <button className="px-10 py-4 glass hover:bg-white/10 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95">
              Case Studies
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-indigo-500 rounded-full" />
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Features Section */}
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Next.js 16",
                desc: "Harnessing the power of React 19 and the latest Next.js features for peak performance."
              },
              {
                title: "WebGL Rendering",
                desc: "High-fidelity 3D visuals powered by Three.js and React Three Fiber."
              },
              {
                title: "Motion Engine",
                desc: "Fluid animations and scroll-linked transitions using Framer Motion."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="glass p-10 rounded-3xl"
              >
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl mb-6 flex items-center justify-center text-indigo-400 font-bold text-xl">
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Statement Section */}
        <section className="py-32 px-4 text-center glass border-y border-white/5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Pushing the boundaries of the web.
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              We believe the future of the web is spatial, interactive, and beautifully animated.
              Our stack ensures your application doesn&apos;t just work—it inspires.
            </p>
            <div className="flex justify-center gap-12 text-slate-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm uppercase tracking-widest">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">60FPS</div>
                <div className="text-sm uppercase tracking-widest">Rendering</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-sm uppercase tracking-widest">Modern</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-4 text-center text-slate-500">
          <p className="mb-4">© 2026 Digital Elegance. Built with Next.js & Framer Motion.</p>
          <div className="flex justify-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </footer>
      </div>
    </main>
  )
}
