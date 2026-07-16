'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-slate-950 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  if (!mounted) return null

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      <Navbar />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 text-gradient-primary">
              BEYOND<br />REALITY
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-2xl text-slate-400 mb-12 font-medium"
          >
            Experience the next generation of web interfaces with immersive 3D
            environments and fluid interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-indigo-100 transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
              Start Your Journey
            </button>
            <button className="px-10 py-5 glass rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Immersive 3D",
                desc: "Powered by Three.js and React Three Fiber for high-performance WebGL rendering.",
                icon: "✨"
              },
              {
                title: "Smooth Motion",
                desc: "Utilizing Framer Motion for buttery-smooth scroll and entrance animations.",
                icon: "🌊"
              },
              {
                title: "Glassmorphism",
                desc: "Modern UI aesthetic with frosted glass effects and crisp typography.",
                icon: "💎"
              },
              {
                title: "Performance",
                desc: "Optimized bundle sizes and efficient rendering for 60fps experiences.",
                icon: "⚡"
              },
              {
                title: "Dark Mode",
                desc: "Beautifully crafted dark interface optimized for OLED displays.",
                icon: "🌙"
              },
              {
                title: "Responsive",
                desc: "Fully adaptive layout that looks stunning on every device and screen size.",
                icon: "📱"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-10 rounded-3xl glass hover:bg-white/10 transition-colors group"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gradient">Architecting the future.</h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              We believe the web should be more than just flat pages. Our mission is to
              create spatial experiences that feel alive, responsive, and truly immersive.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">250ms</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Latency</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">15M+</div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">Users</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full aspect-square glass rounded-3xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-8xl">🚀</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 py-20 px-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">LUMINA</h2>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Pushing the boundaries of what&apos;s possible on the web with cutting-edge
              3D technology and modern design principles.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-slate-500">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Showcase</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-slate-500">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm border-t border-white/5 pt-10">
          <p>© 2026 LUMINA Digital Experiences. Built with passion.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
