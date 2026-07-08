'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617]" />
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

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <main ref={containerRef} className="relative bg-[#020617] text-white selection:bg-indigo-500/30">
      {/* Fixed 3D Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <Scene />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient">
              Dimension
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-slate-400 mb-12 font-light leading-relaxed"
          >
            Crafting immersive digital experiences with <span className="text-white">Next.js</span> and <span className="text-white">Three.js</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="px-10 py-4 bg-white text-black hover:bg-slate-200 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95">
              Explore Now
            </button>
            <button className="px-10 py-4 glass rounded-full font-medium transition-all transform hover:scale-105 active:scale-95">
              Case Studies
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Spatial UI",
              description: "Interfaces that respond to your environment and movement.",
              tag: "Innovation"
            },
            {
              title: "Performance",
              description: "Optimized WebGL rendering for butter-smooth frame rates.",
              tag: "Engineering"
            },
            {
              title: "Interactivity",
              description: "Direct manipulation and intuitive motion physics.",
              tag: "Design"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 rounded-3xl glass hover:bg-white/5 transition-colors cursor-default"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 block">
                {feature.tag}
              </span>
              <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Redefining the <br />
              <span className="text-indigo-500">Modern Web</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              We push the boundaries of what&apos;s possible in the browser. By combining technical excellence with artistic vision, we create digital products that leave a lasting impression.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-slate-500 uppercase text-xs tracking-widest">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-slate-500 uppercase text-xs tracking-widest">Support</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-square glass rounded-full flex items-center justify-center p-12 relative"
          >
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="text-center relative z-10">
              <div className="text-8xl mb-4">✨</div>
              <div className="text-2xl font-bold">Premium Experience</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tighter">DIMENSION</div>
          <div className="flex gap-8 text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; 2026 Dimension Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
