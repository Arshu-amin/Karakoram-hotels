'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' as const }
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const features = [
    {
      title: "Real-time 3D Rendering",
      description: "Harness the power of WebGL with React Three Fiber for immersive experiences.",
      icon: "⚡",
      className: "md:col-span-2 md:row-span-2 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      title: "Smooth Motion",
      description: "Silky smooth animations powered by Framer Motion.",
      icon: "✨",
      className: "bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Next.js 16",
      description: "Built on the bleeding edge of React and Next.js.",
      icon: "🚀",
      className: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Responsive Design",
      description: "Perfectly optimized for every device and screen size.",
      icon: "📱",
      className: "md:col-span-2 bg-slate-500/10 border-slate-500/20"
    }
  ]

  return (
    <main ref={containerRef} className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <Scene />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
          >
            FUTURE<br />BOUND
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-10 font-light tracking-wide"
          >
            Elevate your digital presence with cutting-edge 3D interactions and modern aesthetics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-white text-slate-950 rounded-full font-medium hover:scale-105 transition-transform">
              Explore Experience
            </button>
            <button className="px-8 py-4 border border-slate-800 rounded-full font-medium hover:bg-slate-900 transition-colors">
              Our Process
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Stack</h2>
          <p className="text-slate-400 max-w-xl">We use the most advanced tools to build performant and beautiful web applications.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-8 rounded-3xl border backdrop-blur-xl flex flex-col justify-between group hover:border-slate-600 transition-colors ${feature.className}`}
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center border-t border-slate-900">
        <motion.div {...fadeInUp}>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">
            READY TO<br />BEGIN?
          </h2>
          <button className="px-12 py-6 bg-indigo-600 rounded-full font-bold text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20">
            Get in Touch
          </button>
        </motion.div>
      </section>

      <footer className="py-12 px-4 border-t border-slate-900 text-slate-500 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <p>© 2026 NEXT GEN INTERFACE</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}
