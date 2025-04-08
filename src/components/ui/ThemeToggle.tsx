'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 避免 SSR 时出现水合差异
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-2 rounded-md hover:bg-highlight transition text-fg flex items-center gap-1"
      aria-label="切换主题模式"
    >
      {theme === 'dark' ? (
        <>
          <SunIcon className="w-5 h-5" />
          日间
        </>
      ) : (
        <>
          <MoonIcon className="w-5 h-5" />
          夜间
        </>
      )}
    </button>
  )
}
