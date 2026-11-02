'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Shield,
  Sliders,
  ChevronRight,
  Code2,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
  Eye,
  Activity,
  Terminal,
  Compass,
  Boxes,
  Send
} from 'lucide-react'
import type { GeometryType } from '@/components/Scene'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
        <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Initializing WebGL Engine...</span>
      </div>
    </div>
  )
})

interface ColorTheme {
  id: string
  name: string
  primary: string
  accent: string
  badgeClass: string
}

const COLOR_THEMES: ColorTheme[] = [
  { id: 'indigo', name: 'Cyber Violet', primary: '#6366f1', accent: '#38bdf8', badgeClass: 'from-indigo-500 to-sky-400' },
  { id: 'cyan', name: 'Electric Cyan', primary: '#06b6d4', accent: '#3b82f6', badgeClass: 'from-cyan-400 to-blue-500' },
  { id: 'emerald', name: 'Neo Matrix', primary: '#10b981', accent: '#06b6d4', badgeClass: 'from-emerald-400 to-teal-500' },
  { id: 'rose', name: 'Sunset Blaze', primary: '#f43f5e', accent: '#fb923c', badgeClass: 'from-rose-500 to-amber-400' },
]

const CODE_SNIPPETS = {
  react: `// Seamless Next.js 16 + R3F Integration
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

export function HolographicViewport({ shape, theme }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <Float speed={2} rotationIntensity={1.2}>
        <mesh>
          <torusKnotGeometry args={[1.05, 0.32, 128, 24]} />
          <MeshDistortMaterial
            color={theme.primary}
            distort={0.35}
            metalness={0.85}
          />
        </mesh>
      </Float>
    </Canvas>
  )
}`,
  shader: `// Vertex & Fragment Displacement Shader
uniform float uTime;
uniform float uDistortion;
varying vec3 vNormal;

void main() {
  vNormal = normal;
  vec3 pos = position;
  float wave = sin(pos.y * 3.0 + uTime * 2.0) * uDistortion;
  pos += normal * wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`
}

export default function Home() {
  // 3D Visualizer State
  const [geometry, setGeometry] = useState<GeometryType>('torus')
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(COLOR_THEMES[0])
  const [wireframe, setWireframe] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1)
  const [distort, setDistort] = useState<number>(0.35)

  // Interactive UI State
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'shader'>('react')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [emailInput, setEmailInput] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setTimeout(() => {
        setEmailInput('')
      }, 3000)
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Subtle Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Persistent 3D Interactive Canvas in Background & Hero */}
      <div className="fixed inset-0 z-0 opacity-75 transition-opacity duration-700 pointer-events-none">
        <Scene
          geometry={geometry}
          primaryColor={selectedTheme.primary}
          accentColor={selectedTheme.accent}
          wireframe={wireframe}
          speed={speed}
          distort={distort}
        />
      </div>

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-50 glass-nav px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Boxes className="w-5 h-5 text-indigo-400 group-hover:text-sky-300 transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                AURA<span className="text-indigo-400">3D</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  v2.4
                </span>
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#studio" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" /> 3D Studio
            </a>
            <a href="#features" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" /> Features
            </a>
            <a href="#architecture" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Pipeline
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              GPU Active (60fps)
            </div>
            <a
              href="#studio"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50"
            >
              Launch Studio
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-20 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-xs sm:text-sm text-indigo-300 mb-8"
        >
          <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation 3D Web Experiences</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono text-xs">Turbopack & WebGL Ready</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08]"
        >
          Sculpting The Future of <br className="hidden sm:inline" />
          <span className="text-gradient-primary">Digital Space.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Immerse your users in hyper-performant WebGL shaders, real-time procedural geometries,
          and tactile reactive interfaces designed for the modern web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          <a
            href="#studio"
            className="flex-1 min-w-[160px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Live 3D Customizer</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#architecture"
            className="flex-1 min-w-[160px] px-6 py-3.5 rounded-xl glass border border-slate-700/80 hover:bg-slate-800/60 text-slate-200 font-semibold text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Explore Code</span>
          </a>
        </motion.div>

        {/* Real-time Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl"
        >
          {[
            { label: 'Frame Rate', value: '120 FPS', desc: 'Fluid continuous loop', icon: Activity },
            { label: 'Render Latency', value: '< 1.2ms', desc: 'Direct GPU dispatch', icon: Zap },
            { label: 'Procedural Core', value: '4 Geometries', desc: 'Dynamic mesh swapping', icon: Boxes },
            { label: 'Bundle Footprint', value: '0-Lag SSR', desc: 'Turbopack optimized', icon: Cpu },
          ].map((metric, i) => (
            <div key={i} className="glass-card p-4 rounded-xl text-left border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{metric.label}</span>
                <metric.icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">{metric.value}</div>
              <div className="text-[11px] text-slate-400 mt-1">{metric.desc}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* INTERACTIVE 3D CONTROL STUDIO */}
      <section id="studio" className="relative z-10 max-w-6xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
            <Sliders className="w-3.5 h-3.5" /> DOM-TO-WEBGL REALTIME BRIDGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Interactive 3D Control Studio
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Manipulate the live Three.js canvas in real-time. Toggle geometries, adjust fluid surface distortion, and test theme shaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Dock */}
          <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                1. Select Procedural Geometry
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'torus', label: 'Torus Knot', desc: 'Complex topology' },
                  { id: 'icosahedron', label: 'Cyber Core', desc: 'Faceted crystal' },
                  { id: 'sphere', label: 'Fluid Sphere', desc: 'Organic distortion' },
                  { id: 'ring', label: 'Tech Ring', desc: 'Orbital halo' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGeometry(item.id as GeometryType)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      geometry === item.id
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Switcher */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                2. Chromatic Shader Theme
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      selectedTheme.id === theme.id
                        ? 'bg-white/10 border-indigo-400 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-gradient-to-tr ${theme.badgeClass} shadow-sm`}
                    />
                    <span className="text-xs font-medium">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-800/80">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Rotation & Float Speed</span>
                  <span className="text-indigo-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  aria-label="Rotation and Float Speed"
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Surface Distortion</span>
                  <span className="text-sky-400">{distort.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={distort}
                  aria-label="Surface Distortion"
                  onChange={(e) => setDistort(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-400">Wireframe Matrix Mode</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border ${
                    wireframe
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {wireframe ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            </div>

            {/* Reset Defaults button */}
            <button
              onClick={() => {
                setGeometry('torus')
                setSelectedTheme(COLOR_THEMES[0])
                setWireframe(false)
                setSpeed(1)
                setDistort(0.35)
              }}
              className="w-full py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800/50 text-xs font-mono text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Studio Parameters</span>
            </button>
          </div>

          {/* Live Parameter Inspector Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">live_telemetry_stream.gl</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  WebGL 2.0 / GLSL
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Geometry Active:</span>
                  <span className="text-indigo-300 font-semibold uppercase">{geometry}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Shader Uniform Primary:</span>
                  <span className="text-sky-300 font-semibold">{selectedTheme.primary}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Shader Uniform Accent:</span>
                  <span className="text-sky-300 font-semibold">{selectedTheme.accent}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Distortion Factor:</span>
                  <span className="text-emerald-400 font-semibold">{distort}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Simulation Velocity:</span>
                  <span className="text-emerald-400 font-semibold">{speed}x</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Mesh Topology:</span>
                  <span className="text-indigo-400 font-semibold">{wireframe ? 'Tessellated Wireframe' : 'Metallic Distort'}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                <Eye className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <p>
                  The background 3D canvas is synced instantly with this control panel. As you change parameters, Three.js shaders re-evaluate uniforms without interrupting the 120 FPS render loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURE SHOWCASE */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-3">
            <Zap className="w-3.5 h-3.5" /> CUTTING-EDGE ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Engineered For Pure Visual Impact
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            Every layer of this application is calibrated for lightning-fast delivery, micro-interactions, and visual fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large Bento */}
          <div className="md:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all" />
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Hardware-Accelerated WebGL Shaders</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
              Utilizing Three.js and custom GLSL vertex distortion algorithms that run asynchronously on device GPUs. Achieve zero dropped frames even on mobile viewport transitions.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">#MeshPhysicalMaterial</span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">#GLSLNoise</span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">#Turbopack</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Procedural Topologies</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Switch smoothly between Torus Knot math knots, faceted geodesic icosahedrons, and fluid spheres with real-time morphing.
            </p>
            <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
              <span>Pure React 19 Purity</span> <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mb-6">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Zero Layout Shift</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Dynamic Next.js client component hydration guarantees fluid server pre-renders with graceful fallback placeholders.
            </p>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span>Next.js 16 App Router</span> <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Large Bento */}
          <div className="md:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Accessible & Fully Responsive</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
              Engineered with fluid Tailwind CSS v4 primitives, semantic ARIA landmarks, mobile responsive touch targets, and automatic reduced-motion compatibility.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
              <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mobile Gestures
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> WCAG AA Contrast
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> TypeScript Strict
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE CODE & PIPELINE SHOWCASE */}
      <section id="architecture" className="relative z-10 max-w-6xl mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 mb-3">
            <Terminal className="w-3.5 h-3.5" /> DEVELOPER ENGINE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Seamless Developer Experience
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-2 text-sm sm:text-base">
            Inspect the production implementation powering the 3D canvas and dynamic shaders.
          </p>
        </div>

        <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Code Tab Switcher */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/70 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
                {activeCodeTab === 'react' ? 'src/components/Scene.tsx' : 'shaders/displacement.glsl'}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveCodeTab('react')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  activeCodeTab === 'react'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                React-Three-Fiber
              </button>
              <button
                onClick={() => setActiveCodeTab('shader')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  activeCodeTab === 'shader'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                GLSL Shader
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-slate-950/90 overflow-x-auto text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
            <pre>
              <code>{CODE_SNIPPETS[activeCodeTab]}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* PRICING & TIERS */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> TRANSPARENT TIERS
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Accelerate Your App?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            Choose the ideal license for indie developers, scaling startups, and enterprise visual productions.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              aria-label="Toggle Billing Cycle"
              className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 relative p-0.5 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                Save 25%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Starter Plan */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold text-white mb-1">Starter</div>
              <p className="text-xs text-slate-400 mb-6">For personal projects and experimenters</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ${billingCycle === 'annual' ? '19' : '29'}
                </span>
                <span className="text-xs text-slate-400 font-mono">/mo</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Standard 3D Mesh Geometries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> 60 FPS WebGL Optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Next.js App Router Starter
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-white transition-all">
              Start Free Trial
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="glass-card p-8 rounded-2xl relative flex flex-col justify-between border-indigo-500/50 shadow-2xl shadow-indigo-500/20 bg-slate-900/90">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">Studio Pro</div>
              <p className="text-xs text-slate-400 mb-6">For high-traffic products & agencies</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  ${billingCycle === 'annual' ? '49' : '69'}
                </span>
                <span className="text-xs text-slate-400 font-mono">/mo</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" /> All Procedural Shaders & Meshes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" /> 120 FPS High Refresh Engine
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" /> Real-time Parameter Bridge
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" /> Priority Technical Support
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all">
              Get Started with Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-lg font-bold text-white mb-1">Enterprise</div>
              <p className="text-xs text-slate-400 mb-6">Custom 3D shaders and dedicated engineering</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailored GLSL Shader Pipelines
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated WebGL Architect
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom SLA & Contract Terms
                </li>
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-white transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER & COMMUNITY CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="glass-card p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden border border-indigo-500/20">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
            <Compass className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Stay Ahead of the 3D Web Curve
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Receive monthly breakdowns of cutting-edge Three.js shaders, Next.js rendering techniques, and WebGL benchmarks.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your work email..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder-slate-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{"\u2713 Subscribed successfully! Welcome to the insider community."}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Boxes className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-white tracking-tight">
              AURA<span className="text-indigo-400">3D</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-500">Next-Generation WebGL Experience</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#studio" className="hover:text-white transition-colors">3D Studio</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {"\u00A9"} {new Date().getFullYear()} AURA 3D. Crafted for high performance.
          </div>
        </div>
      </footer>
    </main>
  )
}
