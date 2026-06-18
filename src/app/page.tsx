'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, Suspense } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-slate-900 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      {/* Fixed Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-slate-950" />}>
          <Scene />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-br from-white via-indigo-200 to-indigo-500 bg-clip-text text-transparent"
          >
            Elevate Your <br /> Reality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Immerse yourself in a world where cutting-edge 3D technology
            meets seamless glassmorphic design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.7)]">
              Launch Experience
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl font-bold text-lg transition-all duration-300">
              Documentation
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-indigo-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Glassmorphism",
              desc: "Modern frosted glass effects that react to the 3D environment behind.",
              icon: "✨"
            },
            {
              title: "Interactive 3D",
              desc: "Fully responsive 3D scenes that follow your movement and interactions.",
              icon: "🌐"
            },
            {
              title: "Motion Engine",
              desc: "Silky smooth animations powered by Framer Motion and WebGL.",
              icon: "⚡"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-200">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-32 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Performance", value: "99%" },
            { label: "Frame Rate", value: "120" },
            { label: "Precision", value: "0.1ms" },
            { label: "Satisfaction", value: "100%" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black text-indigo-400 mb-2">{stat.value}</div>
              <div className="text-slate-500 uppercase tracking-widest text-sm font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-4 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Build the Future?
          </h2>
          <div className="flex justify-center gap-8 mb-12">
            {['Twitter', 'GitHub', 'Discord', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-slate-400 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-slate-600">© 2026 NextGen 3D Interface. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
