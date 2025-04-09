// app/debug/middleware-test/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'

export default function MiddlewareTestPage() {
  const [cookieValue, setCookieValue] = useState<string | null>(null)

  useEffect(() => {
    const val = getCookie('firebaseAuthToken')
    setCookieValue(val?.toString() ?? null)
  }, [])

  const handleSet = () => {
    setCookie('firebaseAuthToken', 'yes', { path: '/' })
    setCookieValue('yes')
  }

  const handleDelete = () => {
    deleteCookie('firebaseAuthToken')
    setCookieValue(null)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-2xl font-bold">🧪 Middleware 测试页</h1>

      <div className="text-sm text-muted">当前 Cookie 状态：</div>
      <pre className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-md border">
        {cookieValue ? `firebaseAuthToken=${cookieValue}` : '未设置'}
      </pre>

      <div className="flex gap-4">
        <button
          onClick={handleSet}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
        >
          设置 Cookie
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-danger text-white rounded-md hover:bg-danger-hover"
        >
          删除 Cookie
        </button>
      </div>

      <p className="text-sm text-muted mt-4">
        你可以设置 Cookie 后访问 <code className="font-mono">/builder</code> 看是否被拦截。
      </p>
    </main>
  )
}