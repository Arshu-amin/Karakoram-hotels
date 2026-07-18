'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Framer Motion scroll hook bound to ref safely after hydration
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  })

  // Smooth background transformation to simulate deep parallax immersion
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.85, 0.6, 0.35, 0.1])

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const easeOutTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">

      {/* Background 3D Scene */}
      <motion.div
        style={{ opacity: sceneOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Scene />
      </motion.div>

      {/* Decorative Overlay Gradients */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent_40%)]" />

      {/* Header / Navbar */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...easeOutTransition, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-40 h-20 bg-[#020617]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25">
            S
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-indigo-200 bg-clip-text text-transparent">
            Spectra3D
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors duration-200">Experience</a>
          <a href="#specs" className="hover:text-white transition-colors duration-200">Specifications</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full text-sm font-semibold glass hover:bg-white/10 text-white border border-white/10 transition-all duration-300">
            Launch App
          </button>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-28 text-center max-w-5xl mx-auto">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="space-y-6 md:space-y-8"
        >
          {/* Subtle Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...easeOutTransition, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold tracking-wider text-indigo-300 uppercase shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Next Generation WebGL Engine
          </motion.div>

          {/* Epic Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.3 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.05]"
          >
            The New Era of{' '}
            <span className="text-gradient-primary">
              Interactive 3D
            </span>
          </motion.h1>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.4 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            An otherworldly, fully responsive high-fidelity playground. Rendered in real-time with flawless fluid glassmorphism and pointer-responsive lighting.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...easeOutTransition, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl shadow-indigo-500/20 text-center"
            >
              Explore Engine
            </a>
            <a
              href="#specs"
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-slate-100 rounded-full font-semibold border border-white/10 hover:border-white/20 transition-all transform hover:scale-[1.03] active:scale-95 text-center"
            >
              System Specs
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-slate-500 font-medium tracking-widest uppercase pointer-events-none"
        >
          <span>Scroll down</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-700 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" ref={featuresRef} className="relative z-10 max-w-7xl mx-auto py-32 px-6 md:px-12">
        <div className="space-y-4 text-center mb-20">
          <h2 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">Interactive Capabilities</h2>
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight">Designed for Infinite Speed</p>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-base md:text-lg">
            Witness beautiful 3D mechanics that move in lockstep with your device. Interactive pointer physics build a unified spatial playground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Glass Refraction Engine",
              subtitle: "WebGL MeshTransmission",
              desc: "Ultra realistic physical materials rendering real-time light distortion, absorption, and beautiful micro-roughness blur.",
              gradient: "from-indigo-400 to-purple-400"
            },
            {
              title: "Pointer Tracking Rig",
              subtitle: "Spatial Camera Response",
              desc: "Camera perspective bends gently to match mouse tracking coords, mimicking physical screen depth and immersive parallax.",
              gradient: "from-blue-400 to-indigo-400"
            },
            {
              title: "Spring Animations",
              subtitle: "Physically-Based Motion",
              desc: "Interactive UI layers animate on custom spring equations rather than standard linear timers, mimicking physical mass.",
              gradient: "from-purple-400 to-pink-400"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ ...easeOutTransition, delay: i * 0.15 }}
              className="group p-8 rounded-3xl glass hover:bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[320px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <span className={`text-xs font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent uppercase tracking-wider block mb-2`}>
                  {feature.subtitle}
                </span>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">0{i + 1}</span>
                <span className="text-indigo-400 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                  Read specs &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECH SPECS SECTION */}
      <section id="specs" className="relative z-10 max-w-7xl mx-auto py-24 px-6 md:px-12 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-sm font-semibold tracking-widest text-purple-400 uppercase">Engine Architecture</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Built on the Ultimate Stack</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Engineered with advanced modern web technologies for maximum framerate stability, strict type checking, and fast server side compilation.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { label: "Rendering Framework", val: "React Three Fiber & Three.js" },
                { label: "Application Framework", val: "Next.js App Router (v16.2)" },
                { label: "Component Base", val: "React 19 Pure State Components" },
                { label: "Styling Library", val: "Tailwind CSS v4 Inline Theme" }
              ].map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="text-slate-200 font-semibold">{spec.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { num: "120+", unit: "FPS", title: "Target Refresh Rate", desc: "Silky smooth performance on high-refresh desktop and mobile screens." },
              { num: "0ms", unit: "Lags", title: "Instant Hydration", desc: "Dynamic SSR avoidance imports guarantee instant canvas boot." },
              { num: "100%", unit: "TypeSafe", title: "Zero Any Types", desc: "Strict ESLint type contracts ensure extreme architectural safety." },
              { num: "60%", unit: "Lighter", title: "Asset Optimization", desc: "Automated standard polygon geometries reduce memory allocations." }
            ].map((stat, idx) => (
              <div key={idx} className="p-8 rounded-3xl glass border border-white/5 relative overflow-hidden">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{stat.num}</span>
                  <span className="text-indigo-400 font-bold text-sm tracking-wider uppercase">{stat.unit}</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{stat.title}</h4>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODERN FAQ SECTION */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto py-32 px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">Frequently Asked Questions</h2>
          <p className="text-3xl md:text-4xl font-extrabold">Frequently Asked Questions</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does the 3D scene avoid layout shift during initialization?",
              a: "We implement dynamic imports with next/dynamic, disabling SSR for WebGL components. This ensures a lightweight initial DOM load and visual stability during page paint."
            },
            {
              q: "Can the interactive pointer tracking rig be disabled?",
              a: "Yes! While the camera responds beautifully to pointer gestures on desktop, it gently translates to smooth, math-driven rotations on touch devices to conserve battery."
            },
            {
              q: "Does the application comply with React 19 rules?",
              a: "Absolutely. We enforce strict component purity, correct hook boundaries, and prevent unescaped entities within the JSX layout, complying fully with production standards."
            }
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl glass border border-white/5 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                <span>{item.q}</span>
                <span className="text-indigo-400 text-xl font-bold ml-4">
                  {activeFaq === idx ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 text-slate-400 text-sm font-light leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-slate-500 text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} Spectra3D Experience. All rights reserved.</p>
        <p className="text-xs text-slate-600 font-mono">Designed using Next.js &bull; Framer Motion &bull; Three.js</p>
      </footer>

    </div>
  )
}
