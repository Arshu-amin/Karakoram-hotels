'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" />
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
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            FUTURE<br />BOUND
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10"
          >
            Redefining the digital landscape with immersive 3D experiences
            and cutting-edge interface design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
          >
            <button className="px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 cursor-pointer">
              Explore Project
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">The Next Dimension of Web.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We leverage the power of WebGL and modern animation engines to create interfaces that don&apos;t just display data, but tell a story through movement and depth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Performance", value: "60 FPS" },
                { label: "Interactivity", value: "Immersive" }
              ].map((stat, i) => (
                <div key={i} className="glass p-6 rounded-2xl">
                  <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-square glass rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
            <div className="h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white/10 animate-spin-slow flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 blur-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 px-4 bg-slate-950/50 backdrop-blur-3xl border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Principles</h2>
            <p className="text-slate-500">Design systems built for the modern era.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fluidity",
                desc: "Every interaction is carefully orchestrated to feel natural and responsive.",
                icon: "✦"
              },
              {
                title: "Clarity",
                desc: "Complexity simplified through intuitive hierarchy and spatial awareness.",
                icon: "✧"
              },
              {
                title: "Impact",
                desc: "Visual storytelling that leaves a lasting impression on your audience.",
                icon: "✴"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass p-10 rounded-3xl group hover:border-white/20 transition-colors"
              >
                <div className="text-3xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to build the future?</h2>
          <p className="text-slate-400 text-lg mb-12">
            Join us in creating the next generation of digital experiences.
          </p>
          <button className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/20 cursor-pointer">
            Get in Touch
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500">
          <div className="text-2xl font-bold text-white tracking-tighter">FUTURE.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p>© 2026 Future Bound Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
