'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from 'next-themes'

export function MouseSpotlight() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { resolvedTheme } = useTheme()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  // 🚨 修复关键点：等客户端挂载再判断主题 & 渲染动画
  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <motion.div
      style={{ left: smoothX, top: smoothY }}
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-3xl opacity-40 w-96 h-96 z-10"
    />
  )
}
