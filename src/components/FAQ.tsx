'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'How does the 3D WebGL background impact mobile device performance?',
    a: 'Aura 3D uses adaptive viewport resolution and instanced buffer geometries. On lower-end mobile devices, the WebGL pipeline automatically throttles frame updates and lowers particle counts to preserve high performance and battery life.',
  },
  {
    q: 'Can I integrate custom 3D models (GLTF/GLB) into the scene?',
    a: 'Yes! The Three.js / React Three Fiber layer fully supports useGLTF and custom shader uniforms, allowing you to easily replace or overlay custom 3D assets into the background environment.',
  },
  {
    q: 'Is this application fully SSR-compatible with Next.js 16?',
    a: 'Absolutely. WebGL canvas components are isolated using Next.js dynamic client component imports (ssr: false), eliminating hydration mismatches while maintaining maximum SEO readability for text and content sections.',
  },
  {
    q: 'How do DOM UI controls manipulate 3D graphics in real time?',
    a: 'State variables defined in React page components are passed directly as props to the 3D Scene canvas. React Three Fiber seamlessly updates mesh materials, uniforms, and frame loops without requiring canvas re-initialization.',
  },
  {
    q: 'Does Aura 3D support custom color themes or dark mode?',
    a: 'Yes, the physical material shaders and glassmorphic UI elements are styled using Tailwind CSS theme variables, making it straightforward to match your brand colors or color scheme preferences.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 px-4 md:px-8 relative z-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Frequently Asked <span className="text-gradient-secondary">Questions</span>
        </h2>
        <p className="text-slate-400 text-base">
          Everything you need to know about integrating Aura 3D graphics into your web app.
        </p>
      </div>

      {/* Accordion Stack */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-300 transition-colors"
              >
                <span className="text-base md:text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
