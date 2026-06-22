'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <main className="relative bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <Suspense fallback={<div className="h-full w-full bg-slate-900 animate-pulse" />}>
            <Scene />
          </Suspense>
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
              FUTURE<br />BOUND
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light tracking-widest uppercase"
          >
            Defining the next generation of digital interfaces through 3D immersion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="glass px-12 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-500 tracking-widest">
              EXPLORE ARCHIVE
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] text-slate-500 uppercase">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 py-32 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Crafting experiences that transcend the screen.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We believe that the future of the web isn&apos;t flat. By leveraging WebGL and modern animation principles, we build interfaces that feel alive, responsive, and tactile.
            </p>
            <div className="flex gap-8">
              <div>
                <h4 className="text-indigo-400 font-bold text-2xl mb-1">99.9%</h4>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Performance</p>
              </div>
              <div>
                <h4 className="text-indigo-400 font-bold text-2xl mb-1">60FPS</h4>
                <p className="text-slate-500 text-sm uppercase tracking-wider">Fluidity</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-square glass-card rounded-3xl flex items-center justify-center"
          >
            <div className="text-6xl">✧</div>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="relative z-10 py-32 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Immersive Design",
                desc: "Blurring the lines between physical and digital worlds.",
                icon: "01"
              },
              {
                title: "Kinetic Motion",
                desc: "Every interaction should feel natural and weighted.",
                icon: "02"
              },
              {
                title: "Spatial UI",
                desc: "Interfaces that exist in three-dimensional space.",
                icon: "03"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-card p-12 rounded-3xl group hover:border-indigo-500/50 transition-colors duration-500"
              >
                <span className="text-indigo-500 font-mono text-sm mb-8 block">{item.icon}</span>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-48 text-center px-4">
        <motion.div {...fadeInUp}>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">
            Ready to build the future?
          </h2>
          <button className="bg-white text-black px-16 py-6 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
            CONTACT US
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-bold text-xl tracking-tighter">FUTURE BOUND</div>
          <div className="flex gap-8 text-slate-500 text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-slate-600 text-xs tracking-widest uppercase">
            © 2026 BY JULES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  )
}
