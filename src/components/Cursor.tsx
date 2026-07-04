'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)

      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        getComputedStyle(target).cursor === 'pointer'
      )
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none z-[9999] hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0)"
      }}
    >
      <div className="absolute inset-0 m-auto w-1 h-1 bg-indigo-500 rounded-full" />
    </motion.div>
  )
}
