// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-white shadow-sm">
      {/* 左侧 Logo */}
      <Link href="/" className="text-2xl font-bold text-cyan-600 hover:opacity-80">
        AI Resume
      </Link>

      {/* 右侧操作区 */}
      <div className="flex items-center gap-4">
        <button className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition">
          🌐 EN / 中文
        </button>
        <Link href="/auth/login">
          <button className="text-sm px-4 py-1.5 rounded border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition">
            登录 / 注册
          </button>
        </Link>
      </div>
    </header>
  )
}

