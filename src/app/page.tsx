'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const Navbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3">
      <div className="text-xl font-bold tracking-tighter">FUTURE.IO</div>
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#hero" className="hover:text-indigo-400 transition-colors">Home</a>
        <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
        <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
      </div>
      <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-semibold transition-all">
        Contact
      </button>
    </div>
  </motion.nav>
)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <main ref={containerRef} className="relative bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
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
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
          >
            BEYOND THE <br /> VISUAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10"
          >
            Crafting immersive digital experiences through 3D motion and high-performance interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
              Start Exploring
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-700 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Core Technology</h2>
            <p className="text-slate-500">Pushing the boundaries of what&apos;s possible on the web.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "WebGL Rendering",
                desc: "High-performance 3D graphics rendered directly in the browser using Three.js.",
                icon: "✦"
              },
              {
                title: "Fluid Animations",
                desc: "Buttery smooth transitions and scroll-linked effects powered by Framer Motion.",
                icon: "≋"
              },
              {
                title: "Optimized Stack",
                desc: "Built with the latest Next.js and Tailwind CSS v4 for ultimate speed and scalability.",
                icon: "⚡"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group p-10 rounded-3xl glass hover:bg-white/10 transition-all duration-500"
              >
                <div className="text-4xl mb-6 text-indigo-500 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6 bg-white text-black rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
              REDEFINING THE <br /> DIGITAL FRONT
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              We believe that the web should be more than just static pages.
              It should be an experience that engages, inspires, and connects.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold mb-1">99%</div>
                <div className="text-sm text-slate-500 font-medium">PERFORMANCE</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-1">120+</div>
                <div className="text-sm text-slate-500 font-medium">FPS TARGET</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute inset-0 flex items-center justify-center p-20">
              <div className="w-full h-full border-8 border-slate-200 rounded-full animate-spin-slow" />
              <div className="absolute w-1/2 h-1/2 bg-indigo-600 rounded-full blur-[80px] opacity-20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 bg-white text-black border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-black">FUTURE.IO</div>
          <div className="flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-black">TWITTER</a>
            <a href="#" className="hover:text-black">INSTAGRAM</a>
            <a href="#" className="hover:text-black">DRIBBBLE</a>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            © 2026 DESIGNED BY JULES.
          </div>
        </div>
      </footer>
    </main>
  )
}
