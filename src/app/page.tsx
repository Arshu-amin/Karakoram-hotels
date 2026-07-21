'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

const features = [
  {
    title: "Next-Gen 3D Assets",
    description: "Highly interactive vector-field visual models rendered smoothly using React Three Fiber.",
    icon: "💎",
  },
  {
    title: "Liquid Glassmorphism",
    description: "Elegant frosted surfaces dynamically adapting to responsive device environments.",
    icon: "✨",
  },
  {
    title: "Hyper Performance",
    description: "Optimized asset loads, asset tree-shaking, and hardware-accelerated layouts.",
    icon: "⚡",
  },
  {
    title: "Bespoke Animations",
    description: "Delightful animations triggered continuously by state-driven transitions.",
    icon: "🎨",
  },
  {
    title: "Responsive Grids",
    description: "Perfect layouts adapting to screens from tiny viewports to extreme monitors.",
    icon: "🖥️",
  },
  {
    title: "Premium Security",
    description: "Top-of-the-line encryption practices protecting user data seamlessly.",
    icon: "🔒",
  }
]

const faqs = [
  {
    question: "What makes this interface performant?",
    answer: "We utilize dynamic imports with SSR disabled, React Three Fiber with high-performance physical materials, and Framer Motion for hardware-accelerated animations to maintain high frame rates."
  },
  {
    question: "How do I customize the 3D shapes?",
    answer: "The 3D Scene under src/components/Scene.tsx exposes materials and geometry configurations that can be edited easily using any custom Three.js parameters."
  },
  {
    question: "Can I use this for production apps?",
    answer: "Absolutely! The build outputs clean, fully statically optimized pages using Next.js Turbopack with rigorous typescript and eslint compiler checks."
  }
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  // Motion transitions require 'as const' to satisfy type definitions
  const easeOutTransition = { ease: 'easeOut' as const }

  // Scroll animations driven by useScroll with ref passed directly to comply with react-hooks/refs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Dynamic transformation layers
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9])
  const featuresY = useTransform(scrollYProgress, [0.15, 0.45], [50, 0])
  const featuresOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])

  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm create modern-3d-app@latest')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Absolute fixed 3D Canvas in Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Decorative Radial Gradients */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Header / Navigation Bar */}
      <header className="sticky top-0 w-full z-50 glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/25">
              N
            </div>
            <span className="font-bold tracking-tight text-xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              NEBULA
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#playground" className="hover:text-indigo-400 transition-colors">Interactive</a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-full text-sm font-semibold glass border border-white/10 hover:border-indigo-500/50 hover:bg-white/5 transition-all">
              Log In
            </button>
            <button className="px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform hover:scale-105 active:scale-95">
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 max-w-7xl mx-auto py-16">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ...easeOutTransition }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass border border-indigo-500/30 text-indigo-300 w-fit mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                V2.0 RELEASE &mdash; HIGH PERFORMANCE 3D
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ...easeOutTransition }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none mb-6"
              >
                Bespoke Digital <br />
                <span className="text-gradient-primary">Experiences</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ...easeOutTransition }}
                className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
              >
                An premium interactive portal demonstrating WebGL mesh optimization, liquid glassmorphism surfaces, and stunning scroll physics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ...easeOutTransition }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#features"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold text-center transition-all transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-indigo-500/25"
                >
                  Explore Features
                </a>
                <button
                  onClick={copyToClipboard}
                  className="px-8 py-4 glass border border-slate-700 hover:bg-slate-800/50 rounded-full font-semibold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.03] active:scale-95"
                >
                  <code className="text-indigo-300 text-sm font-mono">
                    {copied ? 'Copied to clipboard!' : 'npm i nebula-3d'}
                  </code>
                  {!copied && (
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Glass Box Info Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ...easeOutTransition }}
                className="w-full max-w-sm p-8 glass-card rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">FPS Rate</p>
                    <h3 className="text-3xl font-extrabold text-white">60.0</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                    Stable
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '95%' }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Performance Rating</span>
                    <span className="text-indigo-300">Outstanding</span>
                  </div>
                </div>
                <hr className="my-6 border-white/5" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/5 flex items-center justify-center text-sm font-bold">
                    🚀
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Interactive Render</h4>
                    <p className="text-xs text-slate-400">Drag background to rotate assets</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div
            style={{ y: featuresY, opacity: featuresOpacity }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">Core Architecture</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-6">
              Stunning Performance. <br />
              <span className="text-gradient-secondary">Fluid Design.</span>
            </h2>
            <p className="text-lg text-slate-400">
              Each module is crafted with meticulous focus on smooth visual transitions and robust modular rendering mechanics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ...easeOutTransition }}
                className="p-8 rounded-2xl glass-card text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-2xl mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  <span>Learn more</span>
                  <span>&rarr;</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE CONTROLS SECTION */}
        <section id="playground" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-500">Live Control Center</span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-6">
                  Fine-tune the 3D Space parameters
                </h2>
                <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                  Interact with custom hardware shaders. Adjust geometry depth, lighting frequency, and surface metalness parameters to suit your brand identity.
                </p>
                <div className="space-y-6 max-w-md">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                      <span>Metalness Coefficient</span>
                      <span>0.85</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                      <span>Refraction Blur Index</span>
                      <span>12px</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-400 font-bold">
                    1
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">Dynamic Fog Adjustment</h4>
                    <p className="text-xs text-slate-400">Syncs canvas depth to page fog thresholds</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/15 flex items-center justify-center text-pink-400 font-bold">
                    2
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">Sub-Mesh Displacement</h4>
                    <p className="text-xs text-slate-400">Controls geometry coordinates inside CPU loops</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACCORDION FAQ SECTION */}
        <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">Everything you need to know about the 3D nebula engine stack.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-white/5 transition-colors">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-200 hover:text-white transition-colors">{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-slate-400">
                    {activeFaq === idx ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER SIGNUP */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stay ahead of the curve</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Join our newsletter to receive the latest updates, developer articles, and premium 3D design templates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-grow px-5 py-3 rounded-full bg-slate-900/60 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-sm transition-all transform hover:scale-[1.03]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Modern Clean Footer */}
      <footer className="relative z-10 border-t border-white/5 py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-white">NEBULA</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Leading the path towards state-of-the-art interactive spatial portals and fluid custom animations.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#playground" className="hover:text-indigo-400 transition-colors">Interactive</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Security</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-slate-500">
          <p>&copy; 2026 Nebula 3D, Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-300">Twitter</a>
            <a href="#" className="hover:text-slate-300">GitHub</a>
            <a href="#" className="hover:text-slate-300">Discord</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
