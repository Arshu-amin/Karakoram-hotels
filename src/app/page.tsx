'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { Suspense, useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
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

  const features = [
    {
      title: "Real-time 3D Rendering",
      description: "Interactive environments powered by Three.js and React Three Fiber for immersive user experiences.",
      icon: "✨"
    },
    {
      title: "Glassmorphism UI",
      description: "Modern frosted glass aesthetics with high performance backdrop blurs and subtle reflections.",
      icon: "💎"
    },
    {
      title: "Fluid Animations",
      description: "Silky smooth transitions and scroll-linked effects orchestrated with Framer Motion.",
      icon: "🌊"
    },
    {
      title: "Next.js 16 Power",
      description: "Leveraging the latest App Router features, server components, and streaming for ultimate speed.",
      icon: "⚡"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="h-full w-full bg-slate-950" />}>
            <Scene />
          </Suspense>
        </div>

        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-[0.9]">
              FUTURE OF<br />INTERFACES
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Experience the next generation of web design with real-time 3D interactions and fluid, glassmorphic layouts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20">
              Explore Now
            </button>
            <button className="px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              Watch Demo
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={itemVariants} className="md:col-span-2 mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              REDEFINING <span className="text-indigo-400">DIGITAL</span> STANDARDS
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              We combine cutting-edge technology with minimalist aesthetics to create unforgettable digital journeys.
            </p>
          </motion.div>

          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group transition-all hover:bg-white/[0.06] hover:border-white/10"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4 text-indigo-400">QUANTUM</h2>
            <p className="text-slate-500 max-w-sm">
              Pushing the boundaries of what&apos;s possible on the web, one frame at a time.
            </p>
          </div>

          <div className="flex gap-12 text-sm font-medium text-slate-400">
            <div className="flex flex-col gap-4">
              <span className="text-slate-200 uppercase tracking-widest text-[10px]">Company</span>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Vision</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-slate-200 uppercase tracking-widest text-[10px]">Social</span>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-center text-xs text-slate-600">
          <p>© 2026 QUANTUM Digital. All rights reserved. Next.js 16 + React 19 + Three.js</p>
        </div>
      </footer>
    </main>
  )
}
