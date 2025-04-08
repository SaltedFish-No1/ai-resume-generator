// src/app/color-test/page.tsx

import ColorTest from '@/components/debug/ColorTest'

export default function ColorTestPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-bg text-fg">
      <h1 className="text-2xl font-bold mb-4">Color Test</h1>
      <ColorTest />
      <div className="text-red-500 bg-yellow-100 p-6 rounded shadow-md">
        ✅ Tailwind 样式已加载！
      </div>
    </main>

  )
}
