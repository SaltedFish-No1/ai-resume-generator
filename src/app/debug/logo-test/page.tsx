// app/debug/logo-test/page.tsx
import Logo from '@/components/ui/Logo'

export default function LogoTestPage() {
  return (
    <main className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center space-y-8 px-4">
      <h1 className="text-2xl font-semibold text-primary">🎨 Logo 测试页面</h1>

      <div className="flex flex-col items-center space-y-6">
        <div className="p-6 bg-surface rounded-lg shadow border border-border">
          <Logo className="w-24 h-24" />
        </div>

        <p className="text-sm text-muted">鼠标悬停 Logo 查看动画</p>
      </div>
    </main>
  )
}
