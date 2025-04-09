// src/app/debug/firebase-test/page.tsx
'use client'

import { auth } from '@/lib/firebase/client'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'

export default function DebugPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log('当前 Firebase 用户状态：', firebaseUser)
      setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 bg-bg text-fg">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-semibold text-primary">🔥 Debug 面板</h1>

        <section className="space-y-2">
          <p className="text-sm text-muted">📦 Firebase 实例状态：</p>
          <pre className="text-xs bg-surface border border-border rounded-lg p-4 overflow-auto">
            {JSON.stringify(auth, null, 2)}
          </pre>
        </section>

        <section className="space-y-2">
          <p className="text-sm text-muted">👤 当前用户：</p>
          {user ? (
            <pre className="text-xs bg-surface border border-border rounded-lg p-4 overflow-auto">
              {JSON.stringify(
                {
                  uid: user.uid,
                  email: user.email,
                  emailVerified: user.emailVerified,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                },
                null,
                2
              )}
            </pre>
          ) : (
            <p className="text-sm text-danger">尚未登录用户</p>
          )}
        </section>
      </div>
    </main>
  )
}
