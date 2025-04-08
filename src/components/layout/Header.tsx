'use client'

import Link from 'next/link'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full px-8 py-4 flex justify-between items-center bg-surface/70 backdrop-blur-md border-b border-border supports-backdrop-blur">
      {/* 左侧 Logo */}
      <Link href="/" className="text-base font-semibold tracking-tight text-fg">
        AI Resume
      </Link>

      {/* 右侧操作区 */}
      <div className="flex items-center gap-4 text-sm font-medium text-fg">
        {/* 语言按钮 */}
        <button
          className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-highlight transition"
          aria-label="切换语言"
        >
          <GlobeAltIcon className="w-5 h-5" />
          EN / 中文
        </button>

        {/* 主题切换按钮 */}
        <ThemeToggle />

        {/* 登录按钮 */}
        <Link
          href="/auth/login"
          className="px-3 py-2 rounded-md hover:bg-highlight transition"
        >
          登录 / 注册
        </Link>
      </div>
    </header>
  )
}
