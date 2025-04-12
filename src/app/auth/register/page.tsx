// app/auth/register/page.tsx
import AuthForm from '@/components/auth/AuthForm'
import AuthFormSkeleton from '@/components/auth/AuthFormSkeleton'
import { MouseSpotlight } from '@/components/ui/animations/MouseSpotlight'
import Link from 'next/link'
import { Suspense } from 'react'

export default function RegisterPage() {
  return (
    <main className="min-h-screen px-4 py-4 flex items-center justify-center bg-bg text-fg">
      <MouseSpotlight />
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-primary">注册新账号</h1>
        <p className="text-sm text-muted">创建账号以开始生成你的 AI 简历。</p>
        <Suspense fallback={<AuthFormSkeleton/>}>
          <AuthForm mode="register" />
        </Suspense>
        <p className="text-sm text-muted text-center">
          已有账号？
          <Link href="/auth/login" className="text-primary hover:text-primary-hover font-medium ml-1">
            登录
          </Link>
        </p>
      </div>
    </main>
  )
}
