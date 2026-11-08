'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Palette,
  Maximize2,
  ChevronRight,
  ShieldCheck,
  Compass,
  ChevronDown,
  ArrowUpRight,
  Check,
  Sliders,
  RotateCw,
  Box,
  Monitor
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950/80">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400 tracking-wider uppercase">Loading 3D Engine...</span>
      </div>
    </div>
  ),
})

const COLOR_PRESETS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Cyan Neon', value: '#06b6d4' },
  { name: 'Emerald Flux', value: '#10b981' },
  { name: 'Rose Cyber', value: '#f43f5e' },
  { name: 'Violet Dusk', value: '#a855f7' },
]

const GEOMETRIES: { id: GeometryType; label: string }[] = [
  { id: 'torus', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'octahedron', label: 'Octahedron' },
  { id: 'sphere', label: 'Sphere' },
]

export default function Home() {
  // 3D scene controls
  const [geometry, setGeometry] = useState<GeometryType>('torus')
  const [speed, setSpeed] = useState<number>(2)
  const [distort, setDistort] = useState<number>(0.4)
  const [color, setColor] = useState<string>('#6366f1')
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)

  // UI state
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState<'architecture' | 'materials' | 'shaders'>('architecture')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setNewsletterEmail('')
      }, 4000)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 3D WebGL Canvas Layer - Fixed Background with interactive pass-through */}
      <div className="fixed inset-0 z-0 pointer-events-auto opacity-75">
        <Scene
          geometry={geometry}
          speed={speed}
          distort={distort}
          color={color}
          wireframe={wireframe}
          autoRotate={autoRotate}
        />
      </div>

      {/* Ambient gradient overlay */}
      <div className="fixed inset-0 z-0 bg-mesh-glow pointer-events-none opacity-60" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-nav px-4 md:px-8 py-3.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                AURA<span className="text-indigo-400">3D</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                v2.4 WebGL
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#lab" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Architecture</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#lab"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white glass-pill hover:bg-white/10 transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Configure 3D
            </a>
            <a
              href="#newsletter"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-8 pt-12 pb-20 text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-6 text-xs font-medium text-indigo-300 border border-indigo-500/20 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Next-Generation Reactive WebGL Engine</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight max-w-5xl mb-6"
        >
          Dynamic 3D Interfaces <br />
          <span className="text-gradient-primary">Crafted for Tomorrow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-normal drop-shadow-md"
        >
          Elevate modern web apps with real-time hardware-accelerated WebGL visuals,
          procedural physical shaders, and responsive UI controls.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#lab"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sliders className="w-4 h-4" />
            Launch 3D Configurator
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold transition-all transform hover:-translate-y-0.5"
          >
            Explore Capabilities
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </a>
        </motion.div>

        {/* Quick Hero Floating Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          {[
            { label: 'Framerate Target', value: '120 FPS', sub: 'Adaptive GPU Sync' },
            { label: 'Bundle Overhead', value: '< 38 KB', sub: 'Zero bloat dynamic import' },
            { label: 'Render Pipeline', value: 'Three.js R184', sub: 'Modern WebGL2 API' },
            { label: 'Browser Support', value: '99.4%', sub: 'Hardware Fallbacks' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl text-left border border-white/5">
              <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs font-semibold text-indigo-300 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 3D Studio / Configurator Section */}
      <section id="lab" className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
        <div className="glass-panel-glow rounded-3xl p-6 md:p-10 border border-indigo-500/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-2">
                <Sliders className="w-4 h-4" />
                Live 3D Studio Dock
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Customize 3D Visualizer in Real-Time
              </h2>
              <p className="text-sm md:text-base text-slate-300 mt-1">
                Interact with the background 3D canvas directly using the live controls below.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setGeometry('torus')
                  setSpeed(2)
                  setDistort(0.4)
                  setColor('#6366f1')
                  setWireframe(false)
                  setAutoRotate(true)
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 glass-pill hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Control 1: Geometry Selector */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Box className="w-4 h-4 text-indigo-400" />
                  Mesh Geometry
                </span>
                <span className="text-xs font-mono text-indigo-300 capitalize">{geometry}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GEOMETRIES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGeometry(g.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center ${
                      geometry === g.id
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/40 border border-indigo-400/40'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-white/5'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Color Palette */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-purple-400" />
                  Material Tint
                </span>
                <span className="text-xs font-mono" style={{ color }}>{color}</span>
              </div>
              <div className="flex items-center justify-between gap-1.5 mb-3">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    title={preset.name}
                    onClick={() => setColor(preset.value)}
                    style={{ backgroundColor: preset.value }}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      color === preset.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110 opacity-80'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>

            {/* Control 3: Speed & Distortion */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Physics & Distortion
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Speed: {speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Distortion: {(distort * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Control 4: Toggles */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-3">
                <Monitor className="w-4 h-4 text-emerald-400" />
                Render Mode
              </span>
              <div className="space-y-2">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                    wireframe
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  <span>Wireframe Mode</span>
                  <span className={`w-2 h-2 rounded-full ${wireframe ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                    autoRotate
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  <span>Continuous Orbit</span>
                  <span className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-3">
            <Cpu className="w-4 h-4" />
            Cutting-Edge Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for Uncompromised Visuals
          </h2>
          <p className="text-slate-300 text-base md:text-lg">
            Harness the full power of modern graphics hardware right in the browser with silky-smooth frame pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "Procedural Shaders",
              desc: "Dynamic Perlin vertex displacement, high-gloss clearcoat reflections, and customizable metallic roughness.",
              color: "from-indigo-500 to-purple-500",
              tag: "GPU Optimized"
            },
            {
              icon: Zap,
              title: "Instant Hydration",
              desc: "Dynamic SSR-safe loading prevents hydration mismatches and guarantees zero layout shift on initial page visit.",
              color: "from-amber-500 to-orange-500",
              tag: "Zero Delay"
            },
            {
              icon: Layers,
              title: "Multi-Mesh Geometries",
              desc: "Seamless switching between complex mathematical shapes including Torus Knots, Platonic solids, and geodesic spheres.",
              color: "from-cyan-500 to-blue-500",
              tag: "High Fidelity"
            },
            {
              icon: Maximize2,
              title: "Depth Starfields",
              desc: "Additive-blended spatial particle field offering infinite cosmic depth with sub-millisecond CPU draw overhead.",
              color: "from-pink-500 to-rose-500",
              tag: "Volumetric"
            },
            {
              icon: ShieldCheck,
              title: "Bulletproof Fallbacks",
              desc: "Robust WebGL context recovery and progressive degradation for lower-power mobile hardware and battery-saving modes.",
              color: "from-emerald-500 to-teal-500",
              tag: "Universal"
            },
            {
              icon: Compass,
              title: "Interactive Orbit Control",
              desc: "Tactile pointer and touch orbital controls with natural inertia, polar clamps, and responsive drag handling.",
              color: "from-purple-500 to-indigo-500",
              tag: "Interactive"
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Architecture & Pipeline Section */}
      <section id="pipeline" className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">
                Technical Stack
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                How the 3D Rendering Pipeline Works
              </h2>
            </div>
            <div className="flex p-1 rounded-xl bg-slate-900/80 border border-white/10">
              {(['architecture', 'materials', 'shaders'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTab === 'architecture' && (
              <>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-indigo-400 font-mono text-sm mb-2">01 / Scenegraph</div>
                  <h4 className="text-lg font-semibold text-white mb-2">React Three Fiber Canvas</h4>
                  <p className="text-sm text-slate-300">
                    Declarative Three.js scenegraph managed via React reconciliation, running on a dedicated requestAnimationFrame loop.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-indigo-400 font-mono text-sm mb-2">02 / Dynamic Chunking</div>
                  <h4 className="text-lg font-semibold text-white mb-2">SSR Boundary & Next.js</h4>
                  <p className="text-sm text-slate-300">
                    Dynamic imports prevent window context crashes during Node.js server compilation and reduce initial bundle payload.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-indigo-400 font-mono text-sm mb-2">03 / State Bridge</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Reactive DOM-to-GL Sync</h4>
                  <p className="text-sm text-slate-300">
                    React state variables drive uniforms and geometry buffers with zero perceptible input latency.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'materials' && (
              <>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-purple-400 font-mono text-sm mb-2">01 / Microfacet BRDF</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Physical Clearcoat</h4>
                  <p className="text-sm text-slate-300">
                    Dual-layer specular reflections simulate high-gloss automotive enamel with realistic fresnel falloff.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-purple-400 font-mono text-sm mb-2">02 / Metallic Reflection</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Energy Conservation</h4>
                  <p className="text-sm text-slate-300">
                    Standard PBR metallic workflow preserving photon energy balances between diffuse absorption and specular bounce.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-purple-400 font-mono text-sm mb-2">03 / Depth Culling</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Z-Buffer Optimization</h4>
                  <p className="text-sm text-slate-300">
                    Non-blocking translucent particle passes ensure starfields render without expensive overdraw penalties.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'shaders' && (
              <>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-2">01 / Vertex Displacement</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Simplex Noise Field</h4>
                  <p className="text-sm text-slate-300">
                    High-speed procedural noise calculation evaluated on vertex stages for liquid-like organic morphing.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-2">02 / Fragment Glow</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Additive Point Lights</h4>
                  <p className="text-sm text-slate-300">
                    Multi-source colored illumination adds volumetric glow highlights across vertices and geometry edges.
                  </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-2">03 / Wireframe Interpolation</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Barycentric Coordinates</h4>
                  <p className="text-sm text-slate-300">
                    Crisp anti-aliased wireframe lattice mode providing instant structural insight into mesh density.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 block">
            Common Inquiries
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Everything you need to know about integrating modern 3D graphics in modern web stacks.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Does running WebGL drain battery on mobile devices?",
              a: "Our scene is optimized with requestAnimationFrame throttling, lightweight geometry buffers, and hardware-accelerated shaders that drop CPU consumption to near zero when idling."
            },
            {
              q: "How does this coordinate with Next.js 16 and React 19?",
              a: "We leverage dynamic imports with SSR disabled for the WebGL canvas, strictly preventing hydration mismatches while maintaining deterministic rendering and fast first-contentful paint."
            },
            {
              q: "Can I customize the 3D models with my own GLTF or OBJ assets?",
              a: "Yes! React Three Fiber and @react-three/drei include useGLTF hooks that allow you to drop in any 3D model, Draco-compressed mesh, or custom animations effortlessly."
            },
            {
              q: "Is mouse or touch orbit interaction supported?",
              a: "OrbitControls is actively integrated with touch dampening, allowing visitors on both mobile touchscreens and desktop trackpads to orbit and tilt the scene seamlessly."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    activeFaq === index ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-slate-300 border-t border-white/5 pt-3 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action & Newsletter */}
      <section id="newsletter" className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-20 scroll-mt-20">
        <div className="glass-panel-glow rounded-3xl p-8 md:p-12 text-center border border-indigo-500/30 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto mb-4 text-indigo-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to Build the Future of the Web?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
              Stay ahead with weekly 3D web design tips, open-source shader templates, and WebGL optimization techniques.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all shrink-0 flex items-center justify-center gap-2"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{"\u2713 Subscribed"}</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-4 md:px-8 mt-12 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-200">Aura3D Interactive</span>
            <span className="text-slate-400">| Powered by Next.js & Three.js</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#lab" className="hover:text-white transition-colors">Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Architecture</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Aura3D. Engineered for modern web experiences.
          </div>
        </div>
      </footer>
    </main>
  )
}
