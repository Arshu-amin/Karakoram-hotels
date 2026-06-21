'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Cursor from '@/components/Cursor'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <Cursor />
      <Navbar />

      {/* Hero Section */}
      <section id="features" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-70">
          <Scene />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              The Future of Web Design
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              Elevate Your <br />
              <span className="text-gradient">Digital Presence</span>
            </h1>
          </motion.div>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience a new dimension of web interactivity. We blend cutting-edge 3D
            animations with high-performance modern interfaces.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25">
              Start Your Project
            </button>
            <button className="px-8 py-4 glass-morphism hover:bg-slate-800/50 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95">
              View Showcase
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 px-6 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Expertise</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "3D Interaction",
                desc: "Immersive WebGL experiences that respond to user behavior and movement.",
                icon: "✨"
              },
              {
                title: "Next-Gen Performance",
                desc: "Lightning fast load times and smooth 60fps animations for optimal UX.",
                icon: "🚀"
              },
              {
                title: "Visual Identity",
                desc: "Crafting unique digital aesthetics that make your brand stand out from the noise.",
                icon: "🎨"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group p-10 rounded-3xl glass-morphism hover:bg-slate-900/80 transition-all duration-500"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-32 px-6 bg-slate-900/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Works</h2>
              <p className="text-slate-400 max-w-lg">
                Explore our recent collaborations and experimental projects pushing the boundaries of web tech.
              </p>
            </div>
            <button className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors flex items-center gap-2">
              Browse All Projects <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-video rounded-3xl overflow-hidden bg-slate-800 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <span className="px-6 py-3 bg-white text-slate-950 rounded-full font-bold">View Project</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-2xl font-bold mb-2">Project Velocity {item}</h4>
                  <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Interactive Experience / 3D Visualization</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 px-6 border-t border-slate-900 text-center relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 tracking-tighter">NEXT.GEN</h2>
          <div className="flex justify-center gap-8 mb-12 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Next.js 3D Agency. Built with passion and code.
          </p>
        </div>
      </footer>
    </main>
  )
}
