// components/ui/animations/Loading.tsx
'use client'

import Logo from '@/components/ui/Logo'
import clsx from 'clsx'

interface Props {
  text?: string
  size?: number
  variant?: 'spin' | 'pulse' | 'orbit'
  colorClass?: string // ✅ 可控颜色类名，例如 'text-primary' 或 'text-blue-500'
}

export default function LoadingIndicator({
  text = '加载中...',
  size = 32,
  variant = 'spin',
  colorClass = 'text-primary dark:text-white',
}: Props) {
  const logoSize = `${size}px`

  const logoClasses = clsx(
    colorClass,
    {
      'animate-spin': variant === 'spin',
      'animate-pulse-slow': variant === 'pulse',
      'animate-orbit': variant === 'orbit',
    }
  )

  return (
    <div className="flex items-center gap-3 text-muted">
      <Logo
        className={logoClasses}
        style={{ width: logoSize, height: logoSize }}
        hoverEffect={false}
      />
      <span
        className="text-sm font-medium animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        {text}
      </span>
    </div>
  )
}
