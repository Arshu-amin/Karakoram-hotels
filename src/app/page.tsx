'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const features = [
  {
    title: "Infinite Motion",
    description: "Seamless 3D animations that respond to your presence and interaction.",
    icon: "✦"
  },
  {
    title: "Next-Gen UI",
    description: "Interfaces built for the future, prioritizing speed and aesthetic precision.",
    icon: "✧"
  },
  {
    title: "Creative Tech",
    description: "Merging art and technology to create unforgettable digital landscapes.",
    icon: "❂"
  }
]

export default function Home() {
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3">
          <div className="text-xl font-bold tracking-tighter">FUTURE.</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Experience</a>
            <a href="#" className="hover:text-white transition-colors">Showcase</a>
            <a href="#" className="hover:text-white transition-colors">Labs</a>
          </div>
          <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
            Connect
          </button>
        </div>
      </nav>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8"
          >
            BEYOND <br />
            <span className="text-gradient">REALITY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            A new dimension of digital experiences crafted with precision,
            motion, and cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-10 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              Explore Now
            </button>
            <button className="px-10 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all">
              Our Vision
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
          <div className="w-px h-12 bg-white" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="glass p-10 rounded-3xl group hover:border-white/20 transition-all"
              >
                <div className="text-4xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">FUTURE.</h2>
            <p className="text-slate-500 max-w-xs">
              Designing tomorrow, today. Join us in our journey through the digital frontier.
            </p>
          </div>

          <div className="flex gap-12 text-sm font-medium text-slate-400">
            <div className="flex flex-col gap-4">
              <span className="text-white">Social</span>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white">Legal</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-24 text-center text-xs text-slate-600 tracking-widest uppercase">
          © 2026 Future Experiences. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
