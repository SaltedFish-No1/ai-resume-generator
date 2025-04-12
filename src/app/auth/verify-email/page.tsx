// src/app/auth/verify-email/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/client'
import { getIdToken } from 'firebase/auth'
import { setAuthTokenCookie } from '@/lib/auth/cookies'
import { MouseSpotlight } from '@/components/ui/animations/MouseSpotlight'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  const checkVerification = async () => {
    setChecking(true)

    try {
      await auth.currentUser?.reload()
      const user = auth.currentUser

      if (user?.emailVerified) {
        const token = await getIdToken(user, true)
        await setAuthTokenCookie(token)

        // ✅ 已验证邮箱，跳转到 dashboard（或 redirect 参数）
        router.push('/dashboard')
      } else {
        alert('❗邮箱尚未验证，请打开邮箱点击链接后再试一次')
      }
    } catch (err) {
      console.error('验证检查失败:', err)
      alert('检查邮箱验证状态时出错')
    } finally {
      setChecking(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">

      <MouseSpotlight />
      <h1 className="text-2xl font-bold">📨 请验证你的邮箱</h1>
      <p className="text-muted max-w-md">
        我们已经向你注册的邮箱发送了一封验证邮件。请打开邮件并点击链接以完成验证。
      </p>

      <button
        onClick={checkVerification}
        disabled={checking}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition"
      >
        {checking ? '检查中...' : '我已完成验证'}
      </button>
    </main>
  )
}
