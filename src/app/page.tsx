'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 animate-pulse" />
})

export default function Home() {
  // 3D Scene Control States
  const [shapeType, setShapeType] = useState('torusKnot')
  const [speed, setSpeed] = useState(1.0)
  const [scale, setScale] = useState(1.1)
  const [color, setColor] = useState('#6366f1')
  const [distortion, setDistortion] = useState(0.4)
  const [roughness, setRoughness] = useState(0.15)
  const [metalness, setMetalness] = useState(0.85)

  // Newsletter Subscribed State
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() !== '') {
      setSubscribed(true)
      setEmail('')
    }
  }

  // Preset Colors List
  const colorsList = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
  ]

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background 3D Scene with full dimensions */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <Scene
          shapeType={shapeType}
          speed={speed}
          scale={scale}
          color={color}
          distortion={distortion}
          roughness={roughness}
          metalness={metalness}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 text-center">
        {/* Decorative subtle backdrop glowing spot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' as const }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
              Interactive WebGL Interface
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6">
            Meet the Next Gen <br />
            <span className="text-gradient-primary">Aura3D Space</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            An immersive interactive visualizer that bridging the gap between flat HTML documents and beautiful, high-performance physical material meshes.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#visualizer-studio"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold tracking-wide transition-all duration-300 shadow-lg shadow-indigo-500/25 transform hover:-translate-y-1 active:scale-95 z-20"
            >
              Configure Aura
            </a>
            <a
              href="#features-explore"
              className="px-8 py-4 border border-slate-700 hover:border-slate-500 hover:bg-slate-900/40 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 z-20"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Floating instruction pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Scroll down to customize</span>
            <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Visualizer Studio Control Dashboard */}
      <section id="visualizer-studio" className="relative z-10 max-w-7xl mx-auto py-24 px-4 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            Visualizer <span className="text-gradient-secondary">Studio</span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-light">
            Directly mutate the rendering canvas behind this layout. Switch shapes, paint materials, and adjust speed dynamically.
          </p>
        </div>

        {/* Controls Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Shape Selector & Color Presets */}
          <div className="p-8 rounded-3xl glass flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3 text-indigo-300">1. Geometry Shape</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'torusKnot', label: 'Torus Knot' },
                  { id: 'sphere', label: 'Sphere' },
                  { id: 'icosahedron', label: 'Icosahedron' },
                ].map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setShapeType(shape.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                      shapeType === shape.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-800/80" />

            <div>
              <h3 className="text-lg font-bold mb-3 text-indigo-300">2. Palette Color</h3>
              <div className="grid grid-cols-3 gap-3">
                {colorsList.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setColor(preset.value)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                      color === preset.value
                        ? 'border-indigo-400 bg-slate-800'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                    }`}
                  >
                    <span
                      className="w-4.5 h-4.5 rounded-full shrink-0 shadow-inner"
                      style={{ backgroundColor: preset.value }}
                    />
                    <span className="text-xs font-medium text-slate-300">{preset.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                <span className="text-xs font-medium text-slate-400">Custom hex:</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-transparent border-none text-xs text-slate-200 outline-none w-20 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Physical Material Settings & Dynamics */}
          <div className="p-8 rounded-3xl glass flex flex-col gap-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-indigo-300">3. Physical & Dynamic Parameters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Animation Speed */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Rotation Speed</span>
                  <span className="text-indigo-400 font-bold font-mono">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Object Scale */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Uniform Scale</span>
                  <span className="text-indigo-400 font-bold font-mono">{scale.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Distortion Oscillation */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Elastic Distortion</span>
                  <span className="text-indigo-400 font-bold font-mono">{distortion.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={distortion}
                  onChange={(e) => setDistortion(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Metalness */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Metallic Feel</span>
                  <span className="text-indigo-400 font-bold font-mono">{metalness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Roughness */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Material Roughness</span>
                  <span className="text-indigo-400 font-bold font-mono">{roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={roughness}
                  onChange={(e) => setRoughness(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800/80 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <span className="text-xl">✨</span>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Notice how changing the values updates the lighting reflections, clearcoat shininess, and mesh dimensions on the background scene immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features-explore" className="relative z-10 max-w-7xl mx-auto py-24 px-4 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Advanced <span className="text-gradient-primary">Features</span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-light">
            Bringing high-performance 3D visual graphics straight to your lightweight browser layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "GPU-Accelerated Rendering",
              desc: "Harnesses raw hardware power with standard WebGL, offering smooth 60fps animations at maximum monitor refresh rates.",
              icon: "⚡",
            },
            {
              title: "Physical Mesh Lighting",
              desc: "Equipped with specialized materials that simulate exact real-world lighting reflections, roughness, and metal coatings.",
              icon: "💎",
            },
            {
              title: "Flexible State Bridging",
              desc: "Direct link between HTML state management and Three.js environments, ensuring instantly visual feedback upon parameter modifications.",
              icon: "🔄",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-3xl glass-interactive"
            >
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center rounded-2xl text-2xl mb-6 shadow-lg shadow-indigo-500/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription Newsletter Section */}
      <section className="relative z-10 max-w-4xl mx-auto py-24 px-4">
        <div className="p-8 md:p-16 rounded-3xl glass text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Stay in <span className="text-gradient-primary">The Orbit</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed font-light">
            Subscribe to our newsletter and stay up to date with the latest 3D layout templates, material libraries, and shader updates.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-20"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-full bg-slate-900/80 border border-slate-800 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none placeholder-slate-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-indigo-600/30 transform active:scale-95"
                >
                  Join Now
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 max-w-md mx-auto"
              >
                <span className="text-3xl block mb-2">🎉</span>
                <h4 className="font-bold text-lg text-indigo-300">Welcome aboard!</h4>
                <p className="text-slate-400 text-xs mt-1">
                  You are now successfully subscribed. Get ready for premium 3D releases right in your inbox!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-900 text-center text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2026 Aura3D Space. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
