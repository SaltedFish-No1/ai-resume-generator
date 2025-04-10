// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
      className="gap-2 px-3 py-2"
      aria-label="切换主题模式"
      size='sm'
    >
      {theme === 'dark' ? (
        <>
          <SunIcon className="w-5 h-5" />
          <span className="hidden sm:inline">浅色模式</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5" />
          <span className="hidden sm:inline">深色模式</span>
        </>
      )}
    </Button>
  )
}
