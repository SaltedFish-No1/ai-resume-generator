// app/auth/login/page.tsx
import AuthForm from '@/components/auth/AuthForm'
import Link from 'next/link'
import { MouseSpotlight } from '@/components/ui/animations/MouseSpotlight'

export default function LoginPage() {
  return (
    <div className="min-h-screen px-4 py-4 flex items-center justify-center bg-bg text-fg">
      <MouseSpotlight />
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-primary">登录账号</h1>
        <p className="text-sm text-muted">欢迎回来，请使用邮箱和密码登录。</p>
        <AuthForm mode="login" />
        <p className="text-sm text-muted text-center">
          还没有账号？
          <Link href="/auth/register" className="text-primary hover:text-primary-hover font-medium ml-1">
            注册新账号
          </Link>
        </p>
      </div>
    </div>
  )
}
