'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
      <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 0.8, 0.8, 0.6])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Fixed background 3D scene */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-5xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300 backdrop-blur-sm"
          >
            The Future of Web Interfaces
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            MODERN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              EXPERIENCE
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Crafting immersive digital journeys with Next.js 16, Framer Motion, and high-performance 3D rendering.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 cursor-pointer">
              Explore Now
            </button>
            <button className="px-8 py-4 border border-slate-800 hover:bg-slate-900 rounded-full font-semibold transition-all active:scale-95 cursor-pointer backdrop-blur-sm">
              View Showcase
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-800 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-indigo-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen py-32 px-4 flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Pushing the boundaries <br /> of what&apos;s possible.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We leverage the latest advancements in WebGL and React to deliver
              unparalleled user experiences. Our interfaces aren&apos;t just
              functional—they&apos;re alive.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">99.9%</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest">Performance</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">60 FPS</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest">Animation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass rounded-3xl p-1 aspect-square relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative h-full w-full rounded-[22px] overflow-hidden flex items-center justify-center">
               <div className="text-center p-12">
                  <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <div className="w-10 h-10 border-2 border-indigo-400 rounded-lg animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-300">Immersive Tech</h3>
                  <p className="text-slate-400">Our core engine utilizes React Three Fiber for seamless WebGL integration.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Engineered for Excellence</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every detail is meticulously crafted to ensure the highest quality interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Next.js 16",
                desc: "Harnessing the power of the App Router and React Server Components for ultimate speed.",
                icon: "🚀"
              },
              {
                title: "R3F Graphics",
                desc: "High-end 3D graphics that respond to user input and scroll behavior in real-time.",
                icon: "💎"
              },
              {
                title: "Framer Motion",
                desc: "Fluid, production-ready animations that bring static interfaces to life.",
                icon: "✨"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl hover:bg-white/[0.05] transition-colors group cursor-default"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-indigo-300">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 border-t border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ready to build the future?
          </h3>
          <p className="text-slate-500 mb-12">© 2026 Next.js 3D Showcase. Built with passion and code.</p>
          <div className="flex justify-center gap-8 text-slate-600">
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Twitter</span>
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">GitHub</span>
            <span className="hover:text-indigo-400 transition-colors cursor-pointer">Dribbble</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
