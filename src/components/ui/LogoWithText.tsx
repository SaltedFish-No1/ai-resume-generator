// components/ui/AppLogo.tsx
'use client'

import Link from 'next/link'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { useEffect, useState } from 'react'


type LogoWithTextProps = {
  href?: string
  hoverEffect?: boolean
  showText?: boolean
  className?: string
}

export default function LogoWithText({
  href = '/',
  hoverEffect = true,
  showText = true,
  className = ''
}: LogoWithTextProps) {
  const { resolvedTheme } = useTheme()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setTheme(resolvedTheme)
    }
  }, [resolvedTheme])

  const logoColorClass = theme === 'dark' ? 'text-white' : 'text-zinc-900'

  return (
    <motion.div
      initial={{ opacity: 0, y: 0}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
    >
      <Link href={href ?? "/"} className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center justify-center"
        >
          <Logo className={clsx('w-8 h-8 transition-transform duration-300', logoColorClass)} hoverEffect={hoverEffect} />
        </motion.div>
        <span className={clsx(' hidden sm:inline text-base font-semibold tracking-tight', theme === 'dark' ? 'text-white' : 'text-zinc-900')}>AI Resume</span>
      </Link>
    </motion.div>
  )
}
