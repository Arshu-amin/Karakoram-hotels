'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      {/* Fixed Background Scene */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 h-screen w-full pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="z-10 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6 text-gradient uppercase"
          >
            Digital<br />Frontier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
            className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10"
          >
            Crafting immersive digital experiences with cutting-edge technology and 3D design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" as const }}
            className="flex gap-4 justify-center"
          >
            <button className="px-10 py-4 bg-white text-slate-950 rounded-full font-bold hover:scale-105 transition-transform">
              Explore Now
            </button>
            <button className="px-10 py-4 border border-white/20 glass rounded-full font-bold hover:bg-white/10 transition-colors">
              Our Vision
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Next-Gen Performance",
              description: "Optimized for the modern web with lightning-fast load times and smooth 60FPS animations.",
              icon: "⚡"
            },
            {
              title: "Immersive 3D",
              description: "High-fidelity WebGL environments that respond to user interaction in real-time.",
              icon: "🧊"
            },
            {
              title: "Modern Aesthetics",
              description: "Clean, minimalist design combined with sophisticated glassmorphism and motion.",
              icon: "✨"
            },
            {
              title: "Responsive Design",
              description: "Flawless experience across all devices, from mobile phones to high-resolution desktops.",
              icon: "📱"
            },
            {
              title: "Interactive Cursor",
              description: "Custom animated cursor that bridges the gap between the user and the interface.",
              icon: "🎯"
            },
            {
              title: "Scroll Experience",
              description: "Smooth, parallax-driven layouts that tell a story as you navigate the page.",
              icon: "🌊"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 rounded-3xl glass group hover:bg-white/[0.05] transition-colors"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Pushing the<br />
              <span className="text-gradient">Boundaries</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              We believe that the future of the web is three-dimensional. Our mission is to create experiences that don&apos;t just provide information, but evoke emotion and wonder.
            </p>
            <div className="space-y-4">
              {['WebGL Integration', 'Framerate Optimization', 'UX Motion Design'].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-mono text-sm tracking-tighter uppercase">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square glass rounded-3xl relative overflow-hidden flex items-center justify-center p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10" />
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear" as const
              }}
              className="w-full h-full border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="w-3/4 h-3/4 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 border border-white/20 rounded-full" />
              </div>
            </motion.div>
            <h4 className="absolute text-2xl font-bold tracking-[0.5em] uppercase text-center">Core<br />Tech</h4>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass p-16 rounded-[3rem]"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Build?</h2>
          <p className="text-slate-400 text-lg mb-12">
            Join us in defining the next era of digital interaction.
          </p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-colors">
              Get Started
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/5 text-slate-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
        <div className="text-xl font-black text-white tracking-tighter">MODERN.3D</div>
        <div className="flex gap-8 text-sm font-mono uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
          <a href="#" className="hover:text-white transition-colors">Dribbble</a>
        </div>
        <p className="text-sm">© 2026 Digital Frontier. All rights reserved.</p>
      </footer>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />
    </main>
  )
}
