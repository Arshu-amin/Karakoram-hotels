'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar />

      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Scene />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.div variants={item} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase">
            The Future is Here
          </motion.div>

          <motion.h1
            variants={item}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-tight"
          >
            NEON<br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              VIRTUAL
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Experience the next generation of web interactivity. Immerse yourself in a world where design meets technology in perfect harmony.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-2xl shadow-indigo-600/20 group relative overflow-hidden">
              <span className="relative z-10">Start Exploring</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-10 py-4 border border-slate-700 hover:border-slate-500 rounded-xl font-bold transition-all backdrop-blur-sm">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features section (re-implemented with better styling) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Immersive 3D",
              desc: "WebGL powered experiences that respond to your movement and interaction.",
              icon: "💠"
            },
            {
              title: "Next.js 16",
              desc: "Built on the cutting edge of React and Next.js for ultimate performance.",
              icon: "⚡"
            },
            {
              title: "Fluid Design",
              desc: "A design system focused on motion, clarity, and visual impact.",
              icon: "✨"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group p-10 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl hover:border-indigo-500/50 transition-all hover:bg-slate-900/60"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-32 px-4 bg-slate-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide cutting-edge solutions for the modern web, focusing on high-performance and interactive experiences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "3D Web Development",
                description: "Creating interactive 3D environments using Three.js and React Three Fiber.",
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Motion Design",
                description: "Fluid animations and transitions that bring interfaces to life using Framer Motion.",
                color: "from-purple-500 to-pink-600"
              },
              {
                title: "UI/UX Architecture",
                description: "Building scalable and performant design systems with Tailwind CSS.",
                color: "from-emerald-500 to-teal-600"
              },
              {
                title: "Performance Optimization",
                description: "Lightning fast load times and smooth framerates for complex applications.",
                color: "from-orange-500 to-red-600"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative overflow-hidden group p-1 rounded-3xl bg-slate-800/50"
              >
                <div className="relative z-10 p-8 h-full rounded-[calc(1.5rem-1px)] bg-slate-900 group-hover:bg-slate-900/40 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} mb-6 shadow-lg`} />
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-400 mb-8">{service.description}</p>
                  <button className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                    LEARN MORE <span>→</span>
                  </button>
                </div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${service.color} transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
