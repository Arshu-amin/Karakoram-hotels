'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
}

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main className="relative min-h-screen text-slate-100 selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-slate-950 animate-pulse" />}>
          <Scene />
        </Suspense>
      </div>

      {/* Hero Section */}
      <section ref={targetRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          style={{ opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-black tracking-tight mb-8"
          >
            <span className="bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
              BEYOND
            </span>
            <br />
            <span className="text-indigo-500">REALITY</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Crafting immersive digital experiences with cutting-edge 3D technology
            and seamless motion design.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6">
            <button className="glass px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1">
              Start Journey
            </button>
            <button className="px-8 py-4 text-slate-400 hover:text-white transition-colors duration-300">
              View Showcase →
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Refractive Visuals",
              desc: "Next-gen glass shaders using MeshTransmissionMaterial for realistic light bending.",
              icon: "✧"
            },
            {
              title: "Fluid Motion",
              desc: "Orchestrated animations with Framer Motion that respond to user interaction.",
              icon: "≋"
            },
            {
              title: "Performance First",
              desc: "Optimized WebGL rendering with smart suspense loading and component-level code splitting.",
              icon: "⚡"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass p-10 rounded-3xl group hover:border-indigo-500/30 transition-colors"
            >
              <div className="text-4xl mb-6 text-indigo-500">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold italic tracking-tighter">
            NEXT<span className="text-indigo-500">GEN</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Developed by Jules.
          </p>
        </div>
      </footer>
    </main>
  )
}
