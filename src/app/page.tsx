'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617]" />
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-white overflow-hidden">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 text-center z-10">
        <motion.div
          style={{ opacity, scale, y }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient">
              Dimension
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" as const }}
            className="text-xl md:text-3xl text-slate-400 max-w-3xl mb-12 font-light"
          >
            Crafting immersive digital experiences through the intersection of
            art, technology, and interactive 3D design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl">
              Explore Now
            </button>
            <button className="px-10 py-5 border border-slate-700 hover:bg-white/5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md">
              View Work
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            >
              The Next Era of <br />
              <span className="text-indigo-400">Web Interfaces</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 mb-12 max-w-lg"
            >
              Pushing the boundaries of what&apos;s possible in the browser.
              Our stack combines high-performance rendering with fluid
              motion to create unforgettable user journeys.
            </motion.p>

            <div className="space-y-6">
              {[
                "WebGPU & WebGL Performance",
                "Advanced Shader Effects",
                "Kinetic Typography",
                "Physics-based Interactions"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4 text-slate-200"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { title: "Fluid", val: "60fps" },
              { title: "Rapid", val: "100ms" },
              { title: "Smart", val: "AI" },
              { title: "Pure", val: "TS" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Showcase */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Atmospheric", desc: "Volumetric lighting and fog for deep immersion." },
              { title: "Responsive", desc: "Perfect experience across every device and screen." },
              { title: "Accessible", desc: "Modern design that doesn&apos;t compromise on usability." }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[2.5rem] flex flex-col justify-between min-h-[300px]"
              >
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-48 px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-20 rounded-[4rem] max-w-4xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to evolve?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join us in building the next generation of digital experiences.
            The future of the web is three-dimensional.
          </p>
          <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-2xl shadow-indigo-500/20">
            Start Your Project
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tighter">DIMENSION</div>
          <div className="flex gap-12 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-slate-600 text-xs">
            © 2026 DIMENSION STUDIOS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  )
}
