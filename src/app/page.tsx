'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617]" />
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  // Only initialize useScroll when mounted to ensure ref is attached
  const { scrollYProgress } = useScroll({
    target: mounted ? (containerRef as React.RefObject<HTMLElement>) : undefined,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-slate-200">
      {/* Fixed Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]" />
      </div>

      {mounted && (
        <>
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            <motion.div
              style={{ opacity, scale }}
              className="relative z-10 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-indigo-400 uppercase glass rounded-full">
                  The Future of Web
                </span>
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient">
                  Dimension
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Experience a new era of digital interfaces where 3D depth meets
                seamless performance and immersive interaction.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <button className="group relative px-10 py-4 bg-indigo-600 rounded-full font-bold text-white transition-all overflow-hidden">
                  <span className="relative z-10">Start Exploring</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button className="px-10 py-4 glass rounded-full font-bold hover:bg-white/5 transition-all">
                  View Showcase
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Hyper-Reality",
                  desc: "Physics-based rendering using the latest WebGL standards for lifelike materials.",
                  icon: "✧"
                },
                {
                  title: "Reactive Motion",
                  desc: "Interfaces that respond to your touch and movement with spring-based fluid physics.",
                  icon: "✦"
                },
                {
                  title: "Edge Performance",
                  desc: "Optimized delivery for smooth 60fps animations even on mobile devices.",
                  icon: "★"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group p-10 rounded-3xl glass hover:bg-white/[0.05] transition-colors"
                >
                  <div className="text-3xl mb-6 text-indigo-400">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="relative z-10 py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="p-12 md:p-20 rounded-[3rem] glass relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/10 blur-[120px] -z-10" />
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to transcend?</h2>
                <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
                  Join 10,000+ creators building the next generation of the web.
                </p>
                <button className="px-12 py-5 bg-white text-black rounded-full font-black text-lg hover:scale-105 transition-transform">
                  Get Full Access
                </button>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative z-10 pt-20 pb-10 px-4 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-black tracking-tighter text-gradient">DIMENSION</div>
              <div className="flex gap-8 text-sm font-medium text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </div>
              <div className="text-sm text-slate-600 font-medium">
                © 2026 Dimension Labs. All rights reserved.
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  )
}
