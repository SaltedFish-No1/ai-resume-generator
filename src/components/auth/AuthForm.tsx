// components/auth/AuthForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { registerWithEmail, loginWithEmail } from '@/lib/firebase/auth'
import { setAuthTokenCookie } from '@/lib/auth/cookies'
import { Button } from '@/components/ui/Button'
import { useSearchParams } from 'next/navigation'



type AuthMode = 'login' | 'register'

type AuthFormProps = {
  mode: AuthMode
}

type FormValues = {
  email: string
  password: string
  confirmPassword?: string
}

export default function AuthForm({ mode }: AuthFormProps) {

  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/dashboard'

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>()

  const router = useRouter()


  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      if (mode === 'login') {
        // TODO: 登录逻辑 - Firebase signInWithEmailAndPassword
        const user = await loginWithEmail(data.email, data.password)

        await user.reload()
        if (!user.emailVerified) {
          router.push('/auth/verify-email')
          return
        }
        // 登录成功后设置 Cookie
        setAuthTokenCookie(user)

        setTimeout(() => {
          router.push(redirectPath)
        }
          , 1000) // 延迟 1 秒跳转到仪表盘

        console.log('登录中...', data)
      } else {
        // TODO: 注册逻辑 - Firebase createUserWithEmailAndPassword
        const user = await registerWithEmail(data.email, data.password)
        router.push('/auth/verify-email') // 发送邮箱验证邮件


        console.log('注册中...', data)
      }
    } catch (err: any) {
      // TODO: 错误处理
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 邮箱 */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">邮箱</label>
        <input
          type="email"
          placeholder="your@email.com"
          {...register('email', { required: '请输入邮箱' })}
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="text-sm text-danger mt-1">{errors.email.message}</p>}
      </div>

      {/* 密码 */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">密码</label>
        <input
          type="password"
          {...register('password', { required: '请输入密码' })}
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.password && <p className="text-sm text-danger mt-1">{errors.password.message}</p>}
      </div>

      {/* 注册模式下显示确认密码 */}
      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium text-muted mb-1">确认密码</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: '请再次输入密码',
              validate: (val) => val === watch('password') || '两次输入的密码不一致'
            })}
            className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-danger mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (mode === 'login' ? '登录中...' : '注册中...') : mode === 'login' ? '登录' : '注册'}
      </Button>
    </form>
  )
}
