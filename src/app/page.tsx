'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Box,
  Layers,
  Palette,
  Sliders,
  Check,
  ArrowRight,
  ShieldCheck,
  Globe,
  Cpu,
  RefreshCw,
  Eye,
  Send
} from 'lucide-react'

// Dynamically import Scene to prevent SSR hydration mismatch
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-xs text-indigo-300 font-mono tracking-widest uppercase">
          Initializing 3D Environment
        </p>
      </div>
    </div>
  )
})

export default function Home() {
  // 3D Scene Controls state
  const [sceneConfig, setSceneConfig] = useState({
    color: '#6366f1',
    speed: 1,
    scale: 1,
    wireframe: false,
    shape: 'torus' as 'torus' | 'icosahedron' | 'sphere' | 'box',
    distort: 0.4
  })

  // Email form state
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Quick preset colors
  const colorPresets = [
    { name: 'Indigo Aura', hex: '#6366f1' },
    { name: 'Cyber Neon', hex: '#38bdf8' },
    { name: 'Cosmic Purple', hex: '#c084fc' },
    { name: 'Emerald Spark', hex: '#34d399' },
    { name: 'Flame Pink', hex: '#f43f5e' }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Dynamic Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene
          color={sceneConfig.color}
          speed={sceneConfig.speed}
          scale={sceneConfig.scale}
          wireframe={sceneConfig.wireframe}
          shape={sceneConfig.shape}
          distort={sceneConfig.distort}
        />
      </div>

      {/* Background Radial Glow Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(99,102,241,0.1),rgba(255,255,255,0))]" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all">
        <nav className="max-w-7xl mx-auto glass-nav rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              Aura <span className="text-indigo-400 font-mono text-sm font-semibold ml-0.5">3D</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">3D Studio</a>
            <a href="#specs" className="hover:text-indigo-400 transition-colors">Specs</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a
              href="#customizer"
              className="px-5 py-2.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-indigo-400/30 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Studio</span>
            </a>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6 shadow-xl"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 -ml-4" />
              <span>Next-Gen WebGL Engine v2.5 Released</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Immersive <span className="text-gradient-primary">3D Visuals</span> for Modern Web
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed mb-8"
            >
              Elevate your web interface with real-time WebGL rendering, fluid physics animations, and custom reactive shaders built seamlessly into Next.js.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#customizer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <span>Customize 3D Canvas</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-slate-800/60 text-slate-200 font-semibold transition-all border border-slate-700/60 flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-indigo-400" />
                <span>Explore Features</span>
              </a>
            </motion.div>

            {/* Quick Metrics Badge Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-slate-800/80 w-full"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">60 FPS</p>
                <p className="text-xs text-slate-400 font-medium">Ultra Smooth</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">100%</p>
                <p className="text-xs text-slate-400 font-medium">WebGL Native</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">&lt; 15kb</p>
                <p className="text-xs text-slate-400 font-medium">Light Bundle</p>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Quick Control Card */}
          <div className="lg:col-span-5 relative" id="customizer">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle card lighting effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-100 text-base">Live 3D Controller</h2>
                    <p className="text-xs text-slate-400">Modify WebGL parameters in real-time</p>
                  </div>
                </div>
                <button
                  onClick={() => setSceneConfig({
                    color: '#6366f1',
                    speed: 1,
                    scale: 1,
                    wireframe: false,
                    shape: 'torus',
                    distort: 0.4
                  })}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  title="Reset Parameters"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Geometry Selector */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                    3D Mesh Geometry
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'torus', label: 'Torus' },
                        { id: 'icosahedron', label: 'Icosa' },
                        { id: 'sphere', label: 'Sphere' },
                        { id: 'box', label: 'Cube' }
                      ] as const
                    ).map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setSceneConfig(prev => ({ ...prev, shape: shape.id }))}
                        className={`py-2 px-3 rounded-xl text-xs font-medium transition-all border ${
                          sceneConfig.shape === shape.id
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Preset Palette */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2 flex justify-between">
                    <span>Aura Color Accent</span>
                    <span className="font-mono text-indigo-400">{sceneConfig.color}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => setSceneConfig(prev => ({ ...prev, color: preset.hex }))}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          sceneConfig.color === preset.hex ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: preset.hex }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Speed Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-300 uppercase tracking-wider">Rotation Speed</span>
                    <span className="text-indigo-400 font-mono">{sceneConfig.speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={sceneConfig.speed}
                    onChange={(e) => setSceneConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                {/* Distortion Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-300 uppercase tracking-wider">Surface Distortion</span>
                    <span className="text-indigo-400 font-mono">{Math.round(sceneConfig.distort * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={sceneConfig.distort}
                    onChange={(e) => setSceneConfig(prev => ({ ...prev, distort: parseFloat(e.target.value) }))}
                    className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                {/* Wireframe Mode Toggle */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Wireframe Render</span>
                  <button
                    onClick={() => setSceneConfig(prev => ({ ...prev, wireframe: !prev.wireframe }))}
                    className={`relative w-12 h-6 rounded-full transition-colors p-1 ${
                      sceneConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        sceneConfig.wireframe ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Architected for Modern Web
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            High Performance Meets Stunning Visuals
          </p>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Engineered with React Three Fiber, Three.js, and Framer Motion for buttery-smooth 60fps animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "Hardware Accelerated",
              desc: "Fully optimized WebGL shaders running directly on GPU for maximum frame rates and low CPU usage.",
              badge: "GPU Native"
            },
            {
              icon: Layers,
              title: "Reactive State Sync",
              desc: "Seamlessly bind React state to 3D mesh transforms, lighting, materials, and camera perspectives.",
              badge: "React 19"
            },
            {
              icon: Palette,
              title: "Glassmorphic Aesthetics",
              desc: "Modern translucent UI cards with frosted blur overlays and dynamic neon border highlights.",
              badge: "Tailwind v4"
            },
            {
              icon: Box,
              title: "Multi-Geometry Support",
              desc: "Switch dynamically between complex procedural shapes, parametric curves, and custom GLTF models.",
              badge: "Flexible"
            },
            {
              icon: ShieldCheck,
              title: "SSR & Hydration Safe",
              desc: "Dynamic client-side hydration wrappers prevent layout shifts and WebGL canvas double-mounts.",
              badge: "Next.js 16"
            },
            {
              icon: Globe,
              title: "Responsive Canvas",
              desc: "Automatic aspect-ratio scaling and dynamic DPR management for crisp rendering on retina displays.",
              badge: "Retina Ready"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl relative group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specifications Showcase Section */}
      <section id="specs" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-indigo-500/20 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest block mb-2">
                Tech Stack Specifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
                Built on the Edge of Modern Web Tech
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Next.js 16 App Router", desc: "Powered by Turbopack and React 19 Server Components" },
                  { title: "React Three Fiber & Drei", desc: "Declarative 3D scene construction with camera & light controls" },
                  { title: "Framer Motion 12", desc: "Smooth scroll-linked physics and spring custom cursor" },
                  { title: "Tailwind CSS v4", desc: "Utility-first glassmorphism styling and theme variables" }
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-1.5 rounded-full bg-indigo-500/20 text-indigo-400 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200 text-base">{spec.title}</h4>
                      <p className="text-slate-400 text-sm">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-slate-800 bg-slate-900/80 font-mono text-xs text-indigo-300 leading-relaxed overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-500">
                <span>SceneController.tsx</span>
                <span>TypeScript</span>
              </div>
              <pre className="text-slate-300">
                <code>
{`// 3D Shader & Mesh Dynamic Binding
const meshRef = useRef<THREE.Mesh>(null!);

useFrame((state) => {
  const time = state.clock.getElapsedTime();
  meshRef.current.rotation.x = time * 0.15 * speed;
  meshRef.current.rotation.y = time * 0.25 * speed;
});

return (
  <Float speed={speed * 1.5} rotationIntensity={1.2}>
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <MeshDistortMaterial
        color="${sceneConfig.color}"
        speed={${sceneConfig.speed}}
        distort={${sceneConfig.distort}}
        wireframe={${sceneConfig.wireframe}}
      />
    </mesh>
  </Float>
);`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Flexible Plans
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Choose Your Experience Level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$0",
              period: "free forever",
              desc: "Essential WebGL components for lightweight interactive landing pages.",
              features: ["Standard 3D Geometries", "Ambient & Point Lighting", "Community Support", "Basic Shaders"],
              cta: "Get Started Free",
              popular: false
            },
            {
              name: "Pro Studio",
              price: "$29",
              period: "per month",
              desc: "Complete 3D visual suite with custom shaders and particle systems.",
              features: ["Custom Mesh Distort Shaders", "Procedural Particle Fields", "Interactive UI Binding", "High-DPI Retina Support", "Priority Support"],
              cta: "Start Free Trial",
              popular: true
            },
            {
              name: "Enterprise",
              price: "$99",
              period: "per month",
              desc: "Tailored WebGL pipelines and dedicated 3D optimization consulting.",
              features: ["Custom GLTF Model Pipeline", "Dedicated Shader Engineer", "99.9% Uptime SLA", "Custom Canvas Controls", "24/7 Priority Support"],
              cta: "Contact Sales",
              popular: false
            }
          ].map((plan, i) => (
            <div
              key={i}
              className={`glass-card p-8 rounded-3xl relative flex flex-col justify-between ${
                plan.popular ? 'border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-slate-900/80' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-xs ml-2">/ {plan.period}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-10 sm:p-16 text-center border border-indigo-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Ready to Transform Your Web Experience?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg mb-8">
            Join thousands of developers building next-generation 3D interactive web applications today.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              <span>{subscribed ? "\u2713 Subscribed" : "Subscribe"}</span>
              {!subscribed && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-200 text-sm">
              Aura <span className="text-indigo-400 font-mono">3D Engine</span>
            </span>
          </div>

          <p className="text-xs text-slate-500">
            © 2026 Aura 3D Inc. Built with Next.js & React Three Fiber.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#customizer" className="hover:text-indigo-400 transition-colors">Studio</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
