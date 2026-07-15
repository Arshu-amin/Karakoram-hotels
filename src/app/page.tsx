'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
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
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%'])

  return (
    <main ref={containerRef} className="relative min-h-[400vh] bg-[#020617] text-white">
      {/* 3D Background */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 text-center z-10">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient"
          >
            Digital <br /> Evolution
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' as const }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting immersive digital experiences through the intersection of
            art and bleeding-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold transition-all hover:bg-indigo-400 hover:text-white transform hover:scale-105 active:scale-95 shadow-2xl">
              Explore Work
            </button>
            <button className="px-10 py-5 glass rounded-full font-bold transition-all hover:bg-white/10 transform hover:scale-105 active:scale-95">
              Contact Us
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Immersive 3D",
              desc: "WebGL-powered experiences that bridge the gap between imagination and reality.",
              icon: "✧"
            },
            {
              title: "Next-Gen UI",
              desc: "Fluid interfaces built with the latest design systems and motion principles.",
              icon: "✦"
            },
            {
              title: "Extreme Speed",
              desc: "Highly optimized architectures for instantaneous loading and 60fps animations.",
              icon: "✺"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group glass p-10 rounded-3xl hover:bg-white/10 transition-colors duration-500"
            >
              <div className="text-4xl mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[3rem] border-indigo-500/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-accent-gradient">
              The Future of Web
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              We don&apos;t just build websites; we create digital ecosystems that captivate,
              engage, and convert. Our approach combines technical excellence with
              creative storytelling.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Users", val: "2.4M+" },
                { label: "Performance", val: "99.9%" },
                { label: "Global Reach", val: "140+" },
                { label: "Award Wins", val: "24" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-4 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold mb-6 text-gradient">EVOLVE</h3>
            <p className="text-slate-500 max-w-sm">
              Pushing the boundaries of what&apos;s possible on the web, one pixel at a time.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Social</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-slate-600 text-sm flex justify-between items-center">
          <p>© 2026 EVOLVE. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
