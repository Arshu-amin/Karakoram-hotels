'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const backgroundOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 0.3, 0.3, 0.6])
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8])
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-white">
      {/* Background 3D Scene */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="z-10 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient"
          >
            Digital<br />Artistry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            Crafting immersive digital experiences where technology meets creativity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform active:scale-95">
              Explore Now
            </button>
            <button className="px-10 py-5 glass rounded-full font-bold hover:bg-white/10 transition-all active:scale-95">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Immersive 3D",
                desc: "Real-time WebGL rendering with advanced materials and lighting.",
                icon: "✦"
              },
              {
                title: "Fluid Motion",
                desc: "Smooth, physics-based animations driven by Framer Motion.",
                icon: "≋"
              },
              {
                title: "Glassmorphism",
                desc: "Modern frosted glass effects with dynamic backdrop filters.",
                icon: "◍"
              },
              {
                title: "Responsive Design",
                desc: "Flawless experience across all devices and screen sizes.",
                icon: "□"
              },
              {
                title: "Performance First",
                desc: "Optimized delivery with Next.js and modern build tools.",
                icon: "⚡"
              },
              {
                title: "Custom Cursors",
                desc: "Interactive cursor states that enhance user engagement.",
                icon: "↗"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="glass p-10 rounded-3xl group hover:border-indigo-500/30 transition-colors"
              >
                <div className="text-4xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Showcase Section */}
      <section className="relative z-10 py-32 px-4 bg-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
              Pioneering the <span className="text-indigo-400">Next Frontier</span> of Web Experiences
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              We combine technical excellence with artistic vision to create websites that don&apos;t just work—they inspire. Every pixel and every polygon is crafted with purpose.
            </p>
            <ul className="space-y-4">
              {['Next-gen Visuals', 'Cutting-edge Performance', 'Intuitive Interactions'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-square glass rounded-full flex items-center justify-center relative"
          >
            <div className="absolute inset-0 animate-pulse bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="text-8xl">🚀</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-48 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-tighter">
            Ready to <span className="text-gradient">Transform?</span>
          </h2>
          <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 rounded-full text-xl font-bold transition-all hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] active:scale-95">
            Start Your Journey
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center text-slate-500">
        <p>© 2026 Digital Artistry Lab. Built with passion &amp; pixels.</p>
      </footer>
    </main>
  )
}
