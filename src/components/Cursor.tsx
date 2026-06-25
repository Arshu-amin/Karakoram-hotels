'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

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
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-indigo-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: -16,
          y: -16,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-500 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: -3,
          y: -3,
        }}
      />
    </>
  )
}
