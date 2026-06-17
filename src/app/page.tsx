'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" />
})

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-300">
              Future of Web Design
            </span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-tight">
              Design <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beyond Limits
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Crafting immersive digital experiences where creativity meets cutting-edge technology.
            Built with Next.js 16 and Three.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="group relative px-10 py-5 bg-indigo-600 rounded-full font-bold transition-all hover:bg-indigo-700 shadow-2xl shadow-indigo-500/40 overflow-hidden">
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-10 py-5 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-900/50 rounded-full font-bold transition-all backdrop-blur-sm">
              View Showcase
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-indigo-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h2>
          <div className="h-1.5 w-24 bg-indigo-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "3D Visuals",
              desc: "High-end WebGL experiences that captivate your audience and tell your story.",
              icon: "✨"
            },
            {
              title: "Modern UI/UX",
              desc: "Intuitive interfaces designed with a focus on usability and aesthetic excellence.",
              icon: "🎨"
            },
            {
              title: "Creative Tech",
              desc: "Leveraging the latest frameworks to build scalable, high-performance applications.",
              icon: "🚀"
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:border-indigo-500/50 transition-colors"
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-32 px-4 bg-indigo-600/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Crafting Digital Excellence</h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              We believe that the web should be an experience, not just a tool.
              Our team combines technical expertise with creative vision to build
              websites that leave a lasting impression.
            </p>
            <ul className="space-y-4">
              {["Performance first architecture", "Immersive 3D environments", "Pixel-perfect design execution"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 backdrop-blur-3xl relative overflow-hidden"
          >
             {/* Decorative element */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section className="relative z-10 py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto p-16 md:p-24 rounded-[3rem] bg-gradient-to-b from-indigo-600 to-indigo-900 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready to elevate your <br /> digital presence?</h2>
            <p className="text-xl text-indigo-100/70 mb-12 max-w-2xl mx-auto">
              Let&apos;s build something extraordinary together. Our team is ready to turn your vision into reality.
            </p>
            <button className="px-12 py-6 bg-white text-indigo-900 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
              Get in Touch
            </button>
          </div>
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MODERN.3D
          </div>
          <div className="flex gap-12 text-slate-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-slate-600">
            © 2026 Next.js 3D App. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
