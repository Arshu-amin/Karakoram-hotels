'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, { stiffness: 600, damping: 35 })
  const cursorY = useSpring(0, { stiffness: 600, damping: 35 })

  const trailX = useSpring(0, { stiffness: 200, damping: 25 })
  const trailY = useSpring(0, { stiffness: 200, damping: 25 })

  useEffect(() => {
    // Enable custom cursor styling on body
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, trailX, trailY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-500/40 bg-indigo-500/10 backdrop-blur-[1px]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 48 : clicked ? 24 : 32,
          height: hovered ? 48 : clicked ? 24 : 32,
          borderColor: hovered ? 'rgba(168, 85, 247, 0.7)' : 'rgba(99, 102, 241, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 12 : clicked ? 6 : 8,
          height: hovered ? 12 : clicked ? 6 : 8,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </>
  )
}
