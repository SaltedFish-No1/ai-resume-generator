// app/auth/verified-success/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Logo from '@/components/ui/Logo'
import { motion } from 'framer-motion'

export default function VerifiedSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/profile/edit')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-bg text-fg">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative w-20 h-20">
          {/* <Logo className="absolute inset-0 w-full h-full animate-pulse text-primary" /> */}
          <CheckCircleIcon className="w-20 h-20 text-success animate-in fade-in zoom-in" />
        </div>

        <h1 className="text-2xl font-semibold text-success">邮箱验证成功</h1>
        <p className="text-sm text-muted">你已完成邮箱验证，3 秒后将跳转至资料填写页面。</p>
      </motion.div>
    </main>
  )
}
