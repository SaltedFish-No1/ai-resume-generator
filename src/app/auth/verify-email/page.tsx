'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { getIdToken } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { setAuthTokenCookie } from '@/lib/auth/cookies'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(false)
  const [verified, setVerified] = useState(false)

  const checkVerification = async () => {
    setChecking(true)
    await auth.currentUser?.reload()
    const user = auth.currentUser

    if (user?.emailVerified) {
      const token = await getIdToken(user, true)
      await setAuthTokenCookie(token)

      setVerified(true)
      router.push('/builder')
    } else {
      alert('邮箱尚未验证，请检查你的邮箱并点击验证链接')
    }

    setChecking(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
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
