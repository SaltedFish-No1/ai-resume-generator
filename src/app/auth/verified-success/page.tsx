'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { auth } from '@/lib/firebase/client'
import { getIdToken } from 'firebase/auth'
import { setAuthTokenCookie } from '@/lib/auth/cookies'
import { motion } from 'framer-motion'
import { MouseSpotlight } from '@/components/ui/animations/MouseSpotlight'

export default function VerifiedSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const verifyAndRedirect = async () => {
      await auth.currentUser?.reload()
      const user = auth.currentUser

      if (user?.emailVerified) {
        const token = await getIdToken(user, true)
        await setAuthTokenCookie(token)

        setTimeout(() => {
          router.push('/profile/edit')
        }, 2000)
      } else {
        router.push('/auth/verify-email')
      }
    }

    verifyAndRedirect()
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-bg text-fg">
      <MouseSpotlight />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center space-y-4"
      >
        <CheckCircleIcon className="w-20 h-20 text-success animate-in fade-in zoom-in" />
        <h1 className="text-2xl font-semibold text-success">邮箱验证成功</h1>
        <p className="text-sm text-muted">即将跳转至资料填写页面，请稍候...</p>
      </motion.div>
    </main>
  )
}
