// components/ui/LoadingIndicator.tsx
'use client'

import Logo from './Logo'

export default function LoadingIndicator({ text = '加载中...', size = 32 }: { text?: string; size?: number }) {
  return (
    <div className="flex items-center gap-3 text-muted">
      <div className="animate-spin">
        <Logo className={`w-[${size}px] h-[${size}px] text-primary dark:text-white`} />
      </div>
      <span className="text-sm font-medium animate-pulse" style={{ animationDelay: '0.3s' }}>{text}</span>
    </div>
  )
}
