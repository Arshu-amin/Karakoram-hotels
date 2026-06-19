'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
}

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main className="relative bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Scene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      </div>

      {/* Hero Section */}
      <section ref={targetRef} className="relative z-10 min-h-[200vh] px-4">
        <motion.div
          style={{ opacity, scale }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400"
            >
              The Future of Web Design
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-7xl md:text-9xl font-bold tracking-tight mb-8"
            >
              Elevate Your <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Immersive 3D experiences meet cutting-edge performance.
              Built for those who demand more from the web.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10">Start Project</span>
                <div className="absolute inset-0 bg-indigo-100 transform translate-y-full transition-transform group-hover:translate-y-0" />
              </button>
              <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 rounded-full font-bold transition-all hover:bg-slate-900/50">
                View Showcase
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Immersive 3D",
              desc: "WebGL powered visuals that react to user interaction in real-time.",
              icon: "✦"
            },
            {
              title: "Next-Gen Perf",
              desc: "Optimized with Turbopack and React 19 for lightning fast interactions.",
              icon: "⚡"
            },
            {
              title: "Glassmorphism",
              desc: "Modern frosted glass effects using advanced CSS and Framer Motion.",
              icon: "◇"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl hover:border-indigo-500/30 transition-colors"
            >
              <div className="text-3xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-indigo-600 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Ready to build?</h2>
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
              Get in Touch
            </button>
          </div>
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-slate-900 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tighter">
            STUDIO<span className="text-indigo-500">.3D</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Crafted with precision. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
