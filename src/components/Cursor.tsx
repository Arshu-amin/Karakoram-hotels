'use client'

import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const springConfig = { stiffness: 150, damping: 20 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 16)
      y.set(e.clientY - 16)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        x,
        y,
      }}
    />
  )
}
