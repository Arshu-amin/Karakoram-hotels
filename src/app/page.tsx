'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  if (!mounted) return null

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-slate-50">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' as const }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-8">
              Future is <span className="text-gradient">Now</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' as const }}
            className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Experience the next generation of web interfaces with immersive 3D
            animations and glassmorphism design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20 glass border-none">
              Start Your Journey
            </button>
            <button className="px-10 py-5 glass hover:bg-white/5 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95">
              Explore Tech
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Next-Gen Stack",
              desc: "Leveraging Next.js 16 and React 19 for unmatched performance and developer experience.",
              icon: "⚡"
            },
            {
              title: "WebGL Graphics",
              desc: "Stunning 3D visuals rendered in real-time using Three.js and React Three Fiber.",
              icon: "💎"
            },
            {
              title: "Fluid Motion",
              desc: "Silky smooth animations and transitions powered by Framer Motion's physics engine.",
              icon: "🌊"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group p-10 rounded-3xl glass transition-all hover:bg-white/5"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5 text-center">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-sm tracking-widest uppercase mb-4">
            Built with Passion & Innovation
          </p>
          <div className="text-2xl font-bold mb-8">
            <span className="text-gradient">Modern 3D Experience</span>
          </div>
          <p className="text-slate-600">© {new Date().getFullYear()} Innovation Lab. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
