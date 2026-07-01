'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#030712] animate-pulse" />
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#030712] text-white">
      {/* Background 3D Scene */}
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section id="about" className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-tight"
          >
            Digital <br />
            <span className="text-gradient">Evolution</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium"
          >
            Crafting immersive digital experiences through advanced 3D
            interactivity and modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all hover:scale-105 active:scale-95">
              Explore Now
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-white" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="experience" className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Immersive 3D",
              desc: "Pushing boundaries with WebGL and React Three Fiber for interactive experiences.",
              icon: "✧"
            },
            {
              title: "Next.js 16",
              desc: "Leveraging the latest App Router features for peak performance and SEO.",
              icon: "✦"
            },
            {
              title: "Motion Design",
              desc: "Fluid, physics-based animations that respond to every interaction.",
              icon: "✸"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-10 rounded-[32px] group hover:bg-white/[0.08] transition-colors"
            >
              <div className="text-4xl mb-6 text-primary">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Showcase Section */}
      <section id="projects" className="relative z-10 py-32 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              Crafting <br /> <span className="text-secondary">Precision</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-lg">
              We blend engineering excellence with creative vision to build products
              that feel as good as they look.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <div className="h-1 w-12 bg-accent rounded-full" />
            </div>
          </motion.div>

          <div className="flex-1 relative aspect-square w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 glass rounded-[48px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-8 -bottom-8 glass p-8 rounded-3xl"
            >
              <p className="text-4xl font-bold">99.9%</p>
              <p className="text-sm uppercase tracking-widest text-slate-500 font-bold">Reliability</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 text-gradient">NEXUS</h2>
            <p className="text-slate-500 max-w-xs">
              Designing the future of the web, one frame at a time.
            </p>
          </div>

          <div className="flex gap-12 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>

          <p className="text-slate-600 text-sm">
            © 2026 NEXUS Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
