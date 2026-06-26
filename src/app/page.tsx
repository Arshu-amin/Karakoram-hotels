'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
)

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2])
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300">
              The Future of Web Design
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
          >
            Experience <br /> Dimension.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Crafting immersive digital experiences with cutting-edge 3D animations,
            Next.js 16, and React 19 performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              Start Building
            </button>
            <button className="px-10 py-5 glass hover:bg-white/10 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95">
              View Showcase
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-indigo-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Built for Speed.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Our architecture ensures your 3D experiences load instantly and run at 60fps on any device.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Next.js 16",
              desc: "Leveraging the latest App Router features and server components for ultimate performance.",
              icon: "⚡"
            },
            {
              title: "Three.js & R3F",
              desc: "Powerful 3D rendering engine integrated seamlessly with the React ecosystem.",
              icon: "📦"
            },
            {
              title: "Tailwind v4",
              desc: "Modern CSS framework for rapid UI development with a focus on utility-first design.",
              icon: "🎨"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-3xl glass group hover:bg-indigo-500/5 transition-colors"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] -z-10" />

          <FadeIn>
            <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready to evolve?</h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              Join thousands of creators building the next generation of the web.
              Get started for free today and see the difference.
            </p>
            <button className="px-12 py-6 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl">
              Get Started Now
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">MODERN.3D</div>
          <p className="text-slate-500 text-sm">© 2025 Modern Digital Lab. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map((link) => (
              <a key={link} href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
