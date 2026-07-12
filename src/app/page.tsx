'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

export default function Home() {
  const containerRef = useRef(null)
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

  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 100 })
  const springScale = useSpring(scale, { damping: 20, stiffness: 100 })
  const springY = useSpring(y, { damping: 20, stiffness: 100 })

  const featureItems = [
    {
      title: "Ray Tracing",
      desc: "Real-time refractive glass materials using MeshTransmissionMaterial.",
      icon: "✨"
    },
    {
      title: "Spring Physics",
      desc: "Fluid interactions powered by Framer Motion's spring animations.",
      icon: "🌊"
    },
    {
      title: "Interactive Rig",
      desc: "Perspective-shifting camera rig that follows your every move.",
      icon: "🎥"
    },
    {
      title: "Next.js 16",
      desc: "Leveraging the latest App Router features and Turbopack performance.",
      icon: "🚀"
    },
    {
      title: "Glassmorphism",
      desc: "Elegant frosted glass UI with backdrop filters and subtle borders.",
      icon: "💎"
    },
    {
      title: "Custom Cursor",
      desc: "Responsive custom pointer with intelligent hover detection.",
      icon: "🖱️"
    }
  ]

  return (
    <main ref={containerRef} className="relative min-h-[200vh] bg-[#020617] text-white">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{
            opacity: springOpacity,
            scale: springScale,
            y: springY
          }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300">
              The Future of Web
            </span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Next Gen <br />
              <span className="text-gradient">Interfaces.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light"
          >
            A high-fidelity digital experience crafted with 3D WebGL,
            interactive physics, and modern aesthetics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-5 bg-white text-slate-950 hover:bg-indigo-100 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95">
              Explore Now
            </button>
            <button className="px-10 py-5 glass hover:bg-white/10 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95">
              Documentation
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featureItems.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl glass group transition-colors hover:border-indigo-500/40"
            >
              <div className="text-4xl mb-6 transform transition-transform group-hover:scale-125 duration-500 origin-left">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-20 rounded-[3rem] glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-600/10 pointer-events-none" />
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to build?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers creating immersive experiences
            with our modern toolkit.
          </p>
          <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-600/20">
            Get Started Free
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-4 border-t border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black tracking-tighter">
            MODERN<span className="text-indigo-500">.3D</span>
          </div>
          <div className="flex gap-12 text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Modern 3D Experience. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
