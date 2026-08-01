'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamic import of WebGL Scene with ssr: false to prevent hydration errors
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center animate-pulse">
      <span className="text-indigo-400 font-semibold tracking-wide text-sm">INITIALIZING WEBGL ENVIRONMENT...</span>
    </div>
  )
})

export default function Home() {
  // Real-time customization states for 3D components
  const [shape, setShape] = useState('torusKnot')
  const [color, setColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(1.0)
  const [scale, setScale] = useState(1.0)

  // Newsletter email state
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* Background Fixed WebGL Canvas Container */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none opacity-70">
        <Scene shape={shape} color={color} speed={speed} scale={scale} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Subtle Tag */}
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-6 backdrop-blur-sm"
          >
            Experience Next-Generation UI
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-none"
          >
            Meet <span className="text-gradient-primary">Aura3D</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            A high-performance modern dashboard and interactive 3D playground. Adjust parameters below to transform the background environment in real-time.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#dashboard"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20 text-center"
            >
              Enter Playground
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-slate-700/80 hover:bg-slate-800/60 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 text-center backdrop-blur-sm"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Customize & Controls Dashboard Section */}
      <section id="dashboard" className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Real-Time <span className="text-gradient-secondary">Playground</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Take command of the physical material and geometry of the background WebGL shape in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Parameter Controls Glass Card */}
          <div className="lg:col-span-5 glass p-8 rounded-3xl flex flex-col gap-8">
            <h3 className="text-xl font-bold border-b border-slate-800/80 pb-4 text-indigo-300">
              Control Panel
            </h3>

            {/* Shape Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold tracking-wide text-slate-300">Choose Geometry</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                  { id: 'sphere', label: 'Sphere' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all border ${
                      shape === item.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                        : 'border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold tracking-wide text-slate-300">Material Hue Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border border-slate-800 outline-none"
                />
                <span className="font-mono text-sm uppercase text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                  {color}
                </span>
                <div className="flex gap-2 ml-auto">
                  {['#6366f1', '#ec4899', '#10b981', '#f59e0b'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setColor(preset)}
                      className="w-6 h-6 rounded-full border border-white/20 transition-transform hover:scale-110"
                      style={{ backgroundColor: preset }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Speed Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Rotation Speed</span>
                <span className="font-mono text-xs text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Scale Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-300">
                <span>Spatial Scale</span>
                <span className="font-mono text-xs text-indigo-400">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Material Specs Details Glass Card */}
          <div className="lg:col-span-7 glass p-8 rounded-3xl flex flex-col gap-6 self-stretch justify-between">
            <div>
              <h3 className="text-xl font-bold border-b border-slate-800/80 pb-4 text-indigo-300 mb-6">
                Material Specifications
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our graphics pipeline relies on a highly-optimized WebGL physical material shader (<code>MeshPhysicalMaterial</code>). Adjusting the configuration sliders sends values directly into the active render loop, dynamically recalculating the clearcoat, metallic gloss reflection intensity, and light scattering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Geometry Shader</span>
                  <p className="text-sm font-bold text-slate-300 mt-1 uppercase">{shape === 'torusKnot' ? 'Torus Knot (3D Loop)' : shape}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Metallic Reflectivity</span>
                  <p className="text-sm font-bold text-slate-300 mt-1">90% Glossy Metallic</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Clearcoat Roughness</span>
                  <p className="text-sm font-bold text-slate-300 mt-1">10% Silk Acrylic</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Spatial Depth</span>
                  <p className="text-sm font-bold text-slate-300 mt-1">Interactive Fog Bound</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">Ready to deploy with your pipeline?</span>
              <button
                onClick={() => {
                  setShape('torusKnot')
                  setColor('#6366f1')
                  setSpeed(1.0)
                  setScale(1.0)
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-semibold tracking-wide transition-all"
              >
                Reset Default State
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Designed for <span className="text-gradient-primary">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Leverage robust rendering frameworks combined with Next.js page performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "60 FPS Render Loop",
              desc: "Engineered with React Three Fiber, utilizing lightweight components and spatial fog for immersive frame rates.",
              stat: "Optimized"
            },
            {
              title: "Responsive Glassmorphism",
              desc: "Frosted-glass components render beautifully across mobile and desktop. Elegant styling built entirely with Tailwind CSS.",
              stat: "Fluid"
            },
            {
              title: "Framer Motion Springs",
              desc: "Dynamic layout animations and a custom pointer cursor provide continuous, responsive tactile interactions.",
              stat: "Smooth"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass glass-hover p-8 rounded-3xl flex flex-col justify-between h-full group transition-all duration-300"
            >
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
                  {feature.stat}
                </span>
                <h3 className="text-2xl font-bold mt-6 mb-4 text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Specifications Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-24 border-t border-slate-900">
        <div className="glass p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
              Interactive WebGL <br />
              <span className="text-gradient-secondary">Architecture</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our 3D scene sits in a fixed-position WebGL overlay beneath our DOM layout. Rather than blocking main-thread responsiveness, user settings seamlessly propagate to WebGL shaders, resulting in high-performance interactions.
            </p>
            <ul className="space-y-4">
              {[
                "Hardware-accelerated rendering inside Next.js App Router",
                "Dynamic WebGL imports to eliminate Hydration mismatches",
                "Fluid clearcoat physical material with responsive color binding",
                "Integrated spring custom cursor for a fully immersive environment"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-3xl font-black text-indigo-400">19+</span>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-2">React v19 Powered</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-3xl font-black text-indigo-400">16+</span>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-2">Next.js Turbopack</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-3xl font-black text-indigo-400">4.0</span>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-2">Tailwind CSS Theme</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-3xl font-black text-indigo-400">&lt;10ms</span>
              <p className="text-xs text-slate-500 font-semibold uppercase mt-2">Dynamic Reactive Bound</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-100">
            Subscribe for Product Updates
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Stay updated with our latest components, custom materials, and interactive pipeline releases.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-indigo-500 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md shadow-indigo-500/10"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl max-w-md mx-auto"
            >
              <p className="text-sm font-semibold text-indigo-300">
                🎉 Thank you! You&apos;ve subscribed successfully.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500 text-xs">
        <p className="mb-2">© 2026 Aura3D Environment. All rights reserved.</p>
        <p>Built with Next.js, Three.js, React Three Fiber, and Framer Motion.</p>
      </footer>
    </main>
  )
}
