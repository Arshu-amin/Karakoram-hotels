'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      style={{
        translateX: x,
        translateY: y,
        left: -12,
        top: -12,
      }}
      className="fixed pointer-events-none z-[9999] w-6 h-6 rounded-full border-2 border-indigo-500/50 mix-blend-difference"
    >
      <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full" />
    </motion.div>
  )
}
