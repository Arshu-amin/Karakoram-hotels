'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
  </div>
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])
  const y = useTransform(smoothProgress, [0, 0.2], [0, -100])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 text-center max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400"
          >
            The Future of Web is 3D
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            Crafting <br />
            <span className="text-gradient italic">Digital</span> Magic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            Immerse your audience in high-performance, interactive 3D environments
            built with Next.js and WebGL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" as const }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              Start Project
              <span className="absolute inset-0 rounded-full bg-white blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
            <button className="px-8 py-4 glass rounded-full font-bold transition-all hover:bg-white/10 hover:scale-105 active:scale-95">
              View Showcase
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-indigo-500 rounded-full" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Next-Gen Rendering",
                desc: "Harnessing the power of WebGL for butter-smooth 60FPS animations.",
                icon: "⚡"
              },
              {
                title: "Glassmorphism UI",
                desc: "Modern aesthetics with frosted glass effects and dynamic blurs.",
                icon: "✨"
              },
              {
                title: "Interactive Camera",
                desc: "Engage users with reactive camera rigs that follow every movement.",
                icon: "🎥"
              },
              {
                title: "Responsive Design",
                desc: "Fully optimized for every screen size, from mobile to ultra-wide.",
                icon: "📱"
              },
              {
                title: "Type Safety",
                desc: "Robust architecture built with TypeScript for maximum reliability.",
                icon: "🛡️"
              },
              {
                title: "Cloud Performance",
                desc: "Global delivery via Vercel Edge Network for instant load times.",
                icon: "🌐"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-10 rounded-3xl glass hover:bg-white/5 transition-colors cursor-default"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[3rem] text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to elevate <br /> your digital presence?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">Join hundreds of brands building the future of the web with us.</p>
          <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-indigo-500/20">
            Let&apos;s Build Together
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter text-gradient mb-4">NEXT.3D</h2>
            <p className="text-slate-500 max-w-xs text-sm">Pushing the boundaries of web experiences with modern technology and creative design.</p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-400">Social</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Github</a>
                <a href="#" className="hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-400">Company</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-500">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} NEXT.3D PLATFORM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  )
}
