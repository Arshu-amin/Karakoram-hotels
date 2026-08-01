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
    // Flag set state in effect suppression if needed
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.closest('[role="button"]'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Toggle body class to hide standard cursor
    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY, visible])

  if (!mounted || !visible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        backgroundColor: '#fff',
        scale: hovered ? 2.2 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  )
}
