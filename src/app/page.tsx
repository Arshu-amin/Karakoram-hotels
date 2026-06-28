'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <main ref={containerRef} className="relative min-h-[300vh] bg-slate-950 text-white overflow-x-hidden">
      {/* Background 3D Scene - Fixed */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0"
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          style={{ opacity, scale }}
          className="flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
          >
            FUTURE <br /> IS HERE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' as const }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mb-12 uppercase tracking-[0.3em]"
          >
            Next-Generation Web Experiences
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: 'easeOut' as const }}
          >
            <button className="glass px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
              Discover More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </section>

      {/* Content Section 1 */}
      <section className="relative z-10 h-screen flex items-center px-4 md:px-24">
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Immersive <br />
            <span className="text-indigo-500">Visualization</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl"
          >
            We push the boundaries of what&apos;s possible on the web by integrating
            high-fidelity 3D graphics with seamless interactive components.
          </motion.p>
        </div>
      </section>

      {/* Content Section 2 (Cards) */}
      <section className="relative z-10 min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Performance",
              desc: "Leveraging GPU acceleration for silky smooth 60fps animations.",
              color: "bg-indigo-500/10"
            },
            {
              title: "Architecture",
              desc: "Built with the latest Next.js App Router and React 19 features.",
              color: "bg-purple-500/10"
            },
            {
              title: "Experience",
              desc: "Intuitive interfaces designed with user engagement in mind.",
              color: "bg-blue-500/10"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass p-12 rounded-3xl group hover:border-indigo-500/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.color} mb-8 flex items-center justify-center`}>
                <div className="w-6 h-6 border-2 border-indigo-400 rounded-lg group-hover:rotate-45 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="text-2xl font-bold tracking-tighter">NEXT GEN APP</h2>
          <div className="flex gap-12 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
            <a href="#" className="hover:text-white transition-colors">GITHUB</a>
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>
          <p className="text-slate-600 text-sm">
            &copy; 2026 DIGITAL EXPERIENCE LAB.
          </p>
        </div>
      </footer>
    </main>
  )
}
