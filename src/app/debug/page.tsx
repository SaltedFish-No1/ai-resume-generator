// app/debug/page.tsx
'use client'
import Link from 'next/link'
import { title } from 'process'

export default function DebugHomePage() {
  const pages = [
    { title: '表单调试', path: '/debug/form-test' },
    { title: '颜色测试', path: '/debug/color-test' },
    { title: 'Firebase 实例调试', path: '/debug/firebase-test' },
    { title: '当前用户状态', path: '/debug/auth-status' },
    { title: 'GPT 调用测试（预留）', path: '/debug/gpt-test' },
    { title: 'Firestore 数据查看（预留）', path: '/debug/firestore-view' },
    { title: 'Logo测试', path: '/debug/logo-test' },
    { title: 'Middleware 测试', path: '/debug/middleware-test' },
    { title: 'Animation 测试', path: '/debug/animation-test' },
    { title: 'AI API 测试', path: '/debug/ai-test' },
  ]

  return (
    <main className="min-h-screen px-6 py-12 bg-bg text-fg">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-primary">🛠 Debug 面板导航</h1>
        <ul className="space-y-3">
          {pages.map((p) => (
            <li key={p.path}>
              <Link
                href={p.path}
                className="block w-full px-4 py-3 bg-surface border border-border rounded-lg hover:bg-highlight transition"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
