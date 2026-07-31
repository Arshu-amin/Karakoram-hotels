'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

// Dynamic import for WebGL scene to avoid SSR hydration mismatches
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex items-center justify-center">
      <div className="text-indigo-400 text-lg font-medium animate-pulse">Initializing WebGL Engine...</div>
    </div>
  ),
})

export default function Home() {
  // Config state synced with WebGL background
  const [shapeType, setShapeType] = useState<string>('torusKnot')
  const [color, setColor] = useState<string>('#6366f1')
  const [speed, setSpeed] = useState<number>(1.0)
  const [distortion, setDistortion] = useState<number>(0.4)
  const [scale, setScale] = useState<number>(1.1)

  // Newsletter email state
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Use window-level scroll monitoring to animate elements seamlessly as user scrolls
  const { scrollY } = useScroll()

  // Transform background element opacity & scaling based on scroll
  const backgroundOpacity = useTransform(scrollY, [0, 600], [0.65, 0.25])
  const backgroundScale = useTransform(scrollY, [0, 600], [1, 0.85])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#020617] text-[#f8fafc] overflow-hidden">
      {/* 1. Background 3D Scene Layer (Fixed position for immersive backdrop) */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          opacity: backgroundOpacity,
          scale: backgroundScale,
        }}
      >
        <Scene
          shapeType={shapeType}
          color={color}
          speed={speed}
          distortion={distortion}
          scale={scale}
        />
      </motion.div>

      {/* Decorative background radial glows for premium vibe */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* 2. Top Glassmorphic Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 border-b border-slate-800/50 bg-slate-950/40 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white text-lg">A3</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Aura 3D Lab
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#lab" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Interactive Lab
          </a>
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Core Features
          </a>
          <a href="#tech" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Our Tech
          </a>
        </div>
        <a
          href="#lab"
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300 hover:text-white transition-all shadow-sm"
        >
          Enter Workspace
        </a>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' as const }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-slate-800/80 mb-6 text-sm text-indigo-300 font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            Interactive WebGL Customizer Live
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8">
            <span className="text-gradient-primary">Craft Your Aura</span>
            <br />
            <span className="text-gradient-secondary">With 3D WebGL</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Unleash the power of high-performance physical rendering directly inside your browser. Control geometries, metallic values, colors, and motion in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#lab"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              Start Customizing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 backdrop-blur-sm text-slate-300 hover:text-white"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-slate-500"
        >
          <span>Scroll to customize</span>
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-indigo-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 4. INTERACTIVE CUSTOMIZER LAB SECTION */}
      <section id="lab" className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            The Interactive <span className="text-indigo-400">3D Workspace</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Interact with the background entity by tuning the configurations below. Experience zero-latency state synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Workspace Preview (Left side) */}
          <div className="lg:col-span-7 rounded-3xl glass-premium p-1 md:p-2 min-h-[400px] flex flex-col relative overflow-hidden group">
            {/* Soft backdrop glow inside the card */}
            <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

            <div className="p-6 pb-2 flex items-center justify-between border-b border-slate-800/50 z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-sm font-semibold tracking-wider text-slate-300 uppercase">Live Canvas Feed</span>
              </div>
              <span className="text-xs text-slate-500">Left-click & drag to rotate shape</span>
            </div>

            {/* Simulated 3D viewport indicator */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative">
              <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[10px] text-slate-400">
                <span className="font-mono text-indigo-300">GPU Material:</span> MeshPhysicalMaterial
              </div>
            </div>
          </div>

          {/* Controls Panel (Right side) */}
          <div className="lg:col-span-5 rounded-3xl glass-premium p-8 flex flex-col justify-between relative">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                Control Studio
              </h3>

              {/* Shape Selection */}
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Geometry Type</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'torusKnot', label: 'Torus Knot' },
                    { id: 'sphere', label: 'Hyper Sphere' },
                    { id: 'torus', label: 'Infinity Torus' },
                    { id: 'box', label: 'Quantum Box' }
                  ].map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setShapeType(shape.id)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                        shapeType === shape.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Customization */}
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Aura Color Palette</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 rounded-xl bg-transparent border-2 border-slate-800 cursor-pointer overflow-hidden p-0"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800/80 rounded-xl font-mono text-sm text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    <span>Rotation Velocity</span>
                    <span className="text-indigo-400 font-mono">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    <span>Metallic Intensity</span>
                    <span className="text-indigo-400 font-mono">{distortion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={distortion}
                    onChange={(e) => setDistortion(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                    <span>Shape Scale</span>
                    <span className="text-indigo-400 font-mono">{scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons inside customizer */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3">
              <button
                onClick={() => {
                  setShapeType('torusKnot')
                  setColor('#6366f1')
                  setSpeed(1.0)
                  setDistortion(0.4)
                  setScale(1.1)
                }}
                className="flex-1 py-3 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-all"
              >
                Reset Studio
              </button>
              <a
                href="#subscribe"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-center rounded-xl text-sm font-bold text-white transition-all shadow-md shadow-indigo-600/10"
              >
                Save Settings
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE FEATURES SECTION */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto py-32 px-4">
        <div className="text-center mb-20">
          <div className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Engineering Showcase</div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Designed for High Performance</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Experience next-generation rendering capabilities utilizing contemporary WebGL standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Optimum Performance",
              desc: "Engineered specifically to minimize GPU draw calls. Smooth, high frame-rates are sustained on both desktops and mobile processors.",
              icon: "⚡",
              tag: "Real-time"
            },
            {
              title: "Aesthetic Glassmorphism",
              desc: "Premium, frosted background layers created using hardware-accelerated CSS backdrop filters paired with rich shadow dynamics.",
              icon: "✨",
              tag: "Premium"
            },
            {
              title: "Next.js Core Stack",
              desc: "Leveraging full App Router architectures, dynamic imports, async stream processing, and server-side static prerendering setups.",
              icon: "🚀",
              tag: "Modern"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group rounded-2xl glass p-8 flex flex-col justify-between hover:border-slate-700/80 transition-all relative overflow-hidden"
            >
              {/* Card top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-4xl">{feature.icon}</span>
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-indigo-300 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>

              <div className="mt-8 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-all">
                <span>Discover more</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TECHNOLOGY LAB METRICS SECTION */}
      <section id="tech" className="relative z-10 py-32 border-y border-slate-900 bg-slate-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Description side */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Framework Architecture</span>
              <h2 className="text-3xl md:text-5xl font-extrabold mt-2 mb-6 tracking-tight">The Modern Creative Workspace</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                By pairing Next.js with React Three Fiber, WebGL animations feel completely integrated into the DOM context. Scroll and click parameters transform raw mathematics into fine-tuned visual animations.
              </p>

              <div className="space-y-4">
                {[
                  "Framer Motion spring calculations for inertia",
                  "MeshPhysicalMaterial reflecting environmental light",
                  "Hardware-accelerated rendering inside full DOM layers"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs">✓</span>
                    <span className="text-sm font-semibold text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Large Glass Card metrics side */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { metric: "60 FPS", label: "Render Target Speed", desc: "Optimized component updates prevent thread locking." },
                { metric: "React 19", label: "Concurrent Engine", desc: "Full synergy using React 19 concurrent and async streaming states." },
                { metric: "Tailwind v4", label: "Dynamic Styles", desc: "CSS performance boost with utility variable processing." },
                { metric: "Web-GL 2", label: "Rendering Standard", desc: "Native shader pipelines render physical metallic parameters." }
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl glass-premium p-6 hover:translate-y-[-4px] transition-transform">
                  <div className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-1">{stat.metric}</div>
                  <div className="text-xs font-bold text-slate-300 tracking-wide uppercase mb-3">{stat.label}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA / NEWSLETTER SECTION */}
      <section id="subscribe" className="relative z-10 max-w-4xl mx-auto py-32 px-4 text-center">
        <div className="rounded-3xl glass-premium p-8 md:p-16 relative overflow-hidden">
          {/* Internal gradient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full filter blur-[80px] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Stay Connected</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed text-sm md:text-base">
            Get early beta access to new WebGL templates, advanced geometric shader sets, and responsive custom code examples.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/40 text-indigo-300 font-semibold inline-block"
            >
              🎉 Success! You&apos;ve subscribed to the Aura newsletter.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white transition-all transform hover:scale-102 active:scale-98 shadow-md"
              >
                Join Beta
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative z-10 py-16 border-t border-slate-900/60 bg-slate-950 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-400">AURA 3D LAB</span>
            <span>|</span>
            <span>Next-gen WebGL experiences</span>
          </div>
          <p className="font-medium text-slate-600">
            © 2026 Next.js 3D App. Designed & crafted for modern browsers.
          </p>
        </div>
      </footer>
    </main>
  )
}
