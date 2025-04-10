'use client'

import Link from 'next/link'
import UserMenu from '@/components/layout/UserMenu'
import { useUser } from '@/lib/context/auth'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import AppLogo from '@/components/ui/AppLogo'
import { Button } from '@/components/ui/Button'

export default function Header() {
  const { user, loading } = useUser()

  return (
    <header className="fixed top-0 z-50 w-full px-8 py-4 flex justify-between items-center bg-surface/70 backdrop-blur-lg border-b border-border supports-backdrop-blur">
      <AppLogo />

      {/* 右侧操作区 */}
      <div className="flex items-center gap-4 text-sm font-medium text-fg">
        {/* 语言按钮 */}
        <Button
          variant='ghost'
          className="gap-2 px-3 py-2"
          aria-label="切换语言"
          size='sm'
        >
          <GlobeAltIcon className="w-5 h-5" />
          EN / 中文
        </Button>

        {/* 主题切换按钮 */}
        <ThemeToggle />


        {!loading && (user ? <UserMenu /> : (
          <Link href="/auth/login" className="no-underline">
            <Button
              variant="ghost"
              className="gap-2 px-3 py-2 w-full"
              aria-label="登录"
              size="sm"
            >
              登录 / 注册
            </Button>
          </Link>

        ))}

      </div>
    </header>
  )
}
