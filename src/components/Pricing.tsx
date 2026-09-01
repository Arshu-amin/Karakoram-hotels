'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter 3D',
    description: 'Essential WebGL rendering tools for individual creators and experimental projects.',
    monthlyPrice: '$29',
    annualPrice: '$24',
    popular: false,
    icon: Zap,
    features: [
      'Up to 5 active WebGL scenes',
      'Standard PBR Shader Library',
      'Community Discord Support',
      '60 FPS Target Engine',
      'Next.js 16 Compatible Exports',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Studio Pro',
    description: 'Full-featured suite with custom physical shaders, raytracing, and real-time state sync.',
    monthlyPrice: '$79',
    annualPrice: '$65',
    popular: true,
    icon: Sparkles,
    features: [
      'Unlimited WebGL scenes',
      'Advanced Custom Shaders & Uniforms',
      'Priority 24/7 Engineer Support',
      'Instanced Particle Physics Engine',
      'Full TypeScript SDK & Source Code',
      'Commercial License Included',
    ],
    cta: 'Start Free Pro Trial',
  },
  {
    name: 'Enterprise WebGL',
    description: 'Dedicated WebGL GPU acceleration pipelines, custom GLTF pipelines, and SLA.',
    monthlyPrice: '$249',
    annualPrice: '$199',
    popular: false,
    icon: Shield,
    features: [
      'Custom WebGL Shaders & GLSL',
      'Dedicated GPU Optimization Team',
      '1-on-1 Architecture Reviews',
      'Custom SLA & Uptime Guarantee',
      'On-Premise Deployment Options',
      'Custom Asset Compression Engine',
    ],
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
  const [annualBilling, setAnnualBilling] = useState(true)

  return (
    <section id="pricing" className="py-24 px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Flexible License Plans
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
        >
          Simple Pricing for <span className="text-gradient-primary">Powerful 3D</span>
        </motion.h2>

        <p className="text-slate-400 text-base md:text-lg">
          Choose the right plan to bring interactive WebGL graphics and modern UI to your product.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className={`text-xs font-semibold ${!annualBilling ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 relative border border-white/10 transition-colors focus:outline-none"
          >
            <motion.div
              animate={{ x: annualBilling ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-indigo-500 shadow-md"
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${annualBilling ? 'text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PLANS.map((plan, idx) => {
          const Icon = plan.icon
          const price = annualBilling ? plan.annualPrice : plan.monthlyPrice

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? 'glass-card border-2 border-indigo-500/60 shadow-2xl shadow-indigo-600/20 scale-105 z-20 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950/90'
                  : 'glass-card border border-white/10 z-10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{plan.name}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-white/10">
                  <span className="text-4xl font-extrabold text-white font-mono">{price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ month</span>
                </div>

                {/* Feature List */}
                <div className="space-y-3.5 mb-8">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Included Features:
                  </div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
