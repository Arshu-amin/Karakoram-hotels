'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const cursorX = useSpring(0, { damping: 25, stiffness: 250 })
  const cursorY = useSpring(0, { damping: 25, stiffness: 250 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/60 bg-indigo-500/20 backdrop-blur-[1px]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: hovered ? 48 : 20,
        height: hovered ? 48 : 20,
        backgroundColor: hovered ? 'rgba(129, 140, 248, 0.3)' : 'rgba(99, 102, 241, 0.15)',
        borderColor: hovered ? 'rgba(165, 180, 252, 0.9)' : 'rgba(129, 140, 248, 0.5)',
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    />
  )
}
