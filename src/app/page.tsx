'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

export default function Home() {
  // Global window-level scroll tracking to avoid Hydration target ref mismatch
  const { scrollYProgress } = useScroll()

  // Elegant scroll-linked transformations
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.25])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.65, 0.8, 0.2])

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Background 3D Scene - fixed and responsive layout */}
      <motion.div
        style={{ scale: sceneScale, opacity: sceneOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-1" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-5xl mx-auto">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">
              Next-Gen Interface v2.0
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tight leading-none"
          >
            <span className="block text-white mb-2">Immersive</span>
            <span className="text-gradient-primary">Dimensions</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.25 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            An exceptionally polished, fluid visual playground built with Next.js 16,
            Framer Motion, and React Three Fiber.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button className="relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-500/20 w-full sm:w-auto">
              <span className="relative z-10">Launch App</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/40 text-slate-300 hover:text-white rounded-full font-semibold transition-all transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm w-full sm:w-auto">
              Explore Tech Stack
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Scroll</span>
          <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
          >
            Cutting Edge Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Leveraging highly customized modern tech primitives to establish new standards in interactive web engineering.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Reactive 3D Rendering",
              desc: "WebGL powered canvas mapping hardware accelerated, glossy metallic physical objects directly into your browser layout seamlessly.",
              icon: "💎"
            },
            {
              title: "Glassmorphism UI",
              desc: "Deep frosted-glass backdrops combined with thin borders and saturated sub-glows creating high-fidelity visual structures.",
              icon: "✨"
            },
            {
              title: "Spring Animations",
              desc: "Zero-latency mouse-linked animations and smooth scroll progress transitions powered by physical spring systems.",
              icon: "⚡"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' as const }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl glass hover:border-indigo-500/40 transition-all flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-2xl font-bold tracking-tight text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Glassmorphism Showcase / Dashboard Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl glass p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-purple-300 border border-purple-500/30 bg-purple-500/10 rounded-full uppercase">
                Real-Time Diagnostics
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Refining digital fidelity down to the frame.
              </h3>
              <p className="text-slate-400 leading-relaxed font-light">
                Our architecture operates at an ultra-low overhead, sustaining fluid rendering and responsive layout updates on both standard and extreme screens.
              </p>
              <div className="flex gap-8 pt-4">
                <div>
                  <h4 className="text-3xl font-black text-indigo-400">120 FPS</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Render Target</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-purple-400">0ms</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Hydration Latency</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-pink-400">100%</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Accessible</p>
                </div>
              </div>
            </div>

            {/* Simulated UI dashboard widget */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono text-slate-500">canvas_geometry.json</span>
              </div>
              <pre className="text-xs md:text-sm font-mono text-indigo-300 overflow-x-auto space-y-1">
                <code>{`{
  "scene": {
    "type": "TorusKnotGeometry",
    "params": [0.7, 0.22, 160, 24],
    "material": {
      "roughness": 0.1,
      "metalness": 0.9,
      "clearcoat": 1.0,
      "reflectivity": 0.9
    }
  },
  "performance": {
    "fps_target": 120,
    "interpolation": "spring"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-32 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Ready to design the future?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Embark on a magnificent, premium design endeavor today. Experience layouts rendered with absolute elegance.
          </p>
          <div>
            <button className="px-10 py-5 bg-white text-slate-950 font-bold hover:bg-slate-100 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-slate-900/80 bg-slate-950/20 text-center text-slate-500 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-light">© 2026 Next.js 3D App. All rights reserved.</p>
          <div className="flex gap-6 text-xs font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
