'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, textarea, [data-hover-glow]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Add hover listeners and observe changes in case DOM changes
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
    }
  }, [cursorX, cursorY, visible])

  if (!mounted) return null

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-indigo-500 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-purple-400 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 0.6 : 0,
        }}
        animate={{
          scale: hovered ? 2.0 : 1,
          borderColor: hovered ? '#ec4899' : '#a855f7',
          backgroundColor: hovered ? 'rgba(236, 72, 153, 0.1)' : 'rgba(168, 85, 247, 0)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  )
}
