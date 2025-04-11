'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { deleteCookie } from 'cookies-next'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '@/lib/firebase/client'
import { useUser } from '@/lib/context/auth'
import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/Button'

export default function UserMenu() {
  const { user } = useUser()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    await signOut(auth)
    deleteCookie('firebaseAuthToken')
    router.push('/auth/login')
  }

  // 关闭菜单点击外部区域
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        className="gap-2 px-3 py-2"
        aria-label="用户菜单"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {(user.displayName || user.email || '')}
      </Button>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <Link
              href="/profile/account"
              className="block px-4 py-2 text-sm hover:bg-highlight transition"
              onClick={() => setOpen(false)}
            >
              账户设置
            </Link>
            <Link
              href="/profile/edit"
              className="block px-4 py-2 text-sm hover:bg-highlight transition"
              onClick={() => setOpen(false)}
            >
              编辑简历
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-highlight transition"
            >
              退出登录
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
