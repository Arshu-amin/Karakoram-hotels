'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
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

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      {/* Fixed 3D Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: sceneOpacity, scale: sceneScale }}
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          style={{ y: heroY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300">
            Next Generation Web
          </span>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
            <span className="text-gradient">Digital</span><br />
            <span>Excellence</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-12 font-light leading-relaxed"
        >
          Pushing the boundaries of what&apos;s possible on the web with
          immersive 3D environments and seamless interactions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button className="group relative px-10 py-5 bg-indigo-600 rounded-full font-semibold transition-all overflow-hidden shadow-2xl shadow-indigo-500/40">
            <span className="relative z-10">Explore Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="px-10 py-5 border border-slate-700 hover:bg-white/5 rounded-full font-semibold transition-all backdrop-blur-sm">
            View Source
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "High Performance",
              desc: "Engineered for 60FPS fluid animations and instant interactions using the latest Next.js 16 features.",
              icon: "⚡"
            },
            {
              title: "Immersive 3D",
              desc: "Experience real-time WebGL rendering with physics-based materials and interactive camera systems.",
              icon: "💎"
            },
            {
              title: "Glassmorphism",
              desc: "A clean, modern aesthetic utilizing advanced CSS backdrop filters and frosted glass effects.",
              icon: "✨"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" as const }}
              className="glass p-10 rounded-3xl group hover:border-indigo-500/50 transition-colors"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto glass p-16 rounded-[3rem] text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 blur-[120px] -z-10" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to build the future?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
            Join thousands of developers creating incredible digital experiences.
          </p>
          <button className="px-12 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform active:scale-95">
            Start Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-slate-900/50 text-center">
        <div className="flex justify-center gap-8 mb-8 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
        <p className="text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Modern 3D App. Crafted with passion.
        </p>
      </footer>
    </main>
  )
}
