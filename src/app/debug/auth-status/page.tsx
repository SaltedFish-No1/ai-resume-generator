'use client'

import { useUser } from '@/lib/context/auth'

export default function AuthStatusDebugPage() {
  const { user, loading } = useUser()

  return (
    <main className="min-h-screen px-6 py-12 bg-bg text-fg">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-primary">当前用户状态</h1>

        {loading ? (
          <p className="text-sm text-muted">加载中...</p>
        ) : user ? (
          <pre className="text-xs bg-surface border border-border rounded-lg p-4 overflow-auto">
            {JSON.stringify(
              {
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                displayName: user.displayName,
              },
              null,
              2
            )}
          </pre>
        ) : (
          <p className="text-sm text-danger">当前未登录用户</p>
        )}
      </div>
    </main>
  )
}
