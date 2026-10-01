'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Sliders } from 'lucide-react'

import Navbar from '@/components/Navbar'
import CustomizerControlPanel, { CustomizerState } from '@/components/CustomizerControlPanel'
import Features from '@/components/Features'
import ShowcaseGallery from '@/components/ShowcaseGallery'
import TechStack from '@/components/TechStack'
import CodeExportModal from '@/components/CodeExportModal'
import Footer from '@/components/Footer'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      <span className="font-mono text-xs text-indigo-400 animate-pulse">Initializing WebGL Engine...</span>
    </div>
  ),
})

export default function Home() {
  const [customizerState, setCustomizerState] = useState<CustomizerState>({
    shape: 'torusKnot',
    color: '#6366f1',
    speed: 2.0,
    distort: 0.4,
    wireframe: false,
  })

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)

  const { scrollY } = useScroll()
  const sceneOpacity = useTransform(scrollY, [0, 800], [0.85, 0.4])
  const sceneScale = useTransform(scrollY, [0, 800], [1, 1.1])

  const handleStateChange = (newState: Partial<CustomizerState>) => {
    setCustomizerState((prev) => ({ ...prev, ...newState }))
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Fixed Ambient 3D WebGL Canvas Layer */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{ opacity: sceneOpacity, scale: sceneScale }}
      >
        <Scene
          shape={customizerState.shape}
          color={customizerState.color}
          speed={customizerState.speed}
          distort={customizerState.distort}
          wireframe={customizerState.wireframe}
        />
      </motion.div>

      {/* Decorative ambient background glowing light orbs */}
      <div className="glow-orb top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 z-0" />
      <div className="glow-orb top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-600 z-0" />
      <div className="glow-orb bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600 z-0" />

      {/* Top Fixed Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-4 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 backdrop-blur-xl"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200 tracking-wide">
            Next-Gen WebGL 3D Interactive Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight max-w-5xl mb-8 leading-[1.05]"
        >
          Craft Immersive <br className="hidden sm:inline" />
          <span className="text-gradient-primary">3D Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-12 font-normal leading-relaxed"
        >
          Manipulate geometry, material noise, and color shaders in real-time. Built for modern web applications with Next.js, React 19, and Three.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="#customizer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Sliders className="w-5 h-5" /> Explore Interactive Studio
          </a>
          <a
            href="#presets"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-slate-800/80 text-slate-200 font-semibold text-base flex items-center justify-center gap-2 border border-white/10 transition-all hover:scale-105 active:scale-95"
          >
            View Presets <ArrowRight className="w-5 h-5 text-indigo-400" />
          </a>
        </motion.div>

        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          {[
            { label: 'FRAME RATE', value: '60 FPS', sub: 'Hardware Accelerated' },
            { label: 'RENDER TIME', value: '< 16ms', sub: 'Zero Frame Drops' },
            { label: 'SHADER ENGINE', value: 'WebGL 2.0', sub: 'Physical Materials' },
            { label: 'INTERACTION', value: '100% Realtime', sub: 'Synchronized DOM' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass p-5 rounded-2xl border border-white/10 text-left backdrop-blur-xl"
            >
              <div className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Customizer Control Studio Section */}
      <section id="customizer" className="relative z-10 py-16 px-4 max-w-7xl mx-auto">
        <CustomizerControlPanel
          state={customizerState}
          onChange={handleStateChange}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
        />
      </section>

      {/* Features Showcase */}
      <Features />

      {/* Preset Showcase Gallery */}
      <ShowcaseGallery onApplyPreset={handleStateChange} />

      {/* Tech Stack Highlights */}
      <TechStack />

      {/* Code Export Drawer Modal */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        state={customizerState}
      />

      {/* Footer Section */}
      <Footer />
    </main>
  )
}
