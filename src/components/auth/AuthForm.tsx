// components/auth/AuthForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { registerWithEmail, loginWithEmail } from '@/lib/firebase/auth'
import { setAuthTokenCookie } from '@/lib/auth/cookies'
import { Button } from '@/components/ui/Button'
import { useSearchParams } from 'next/navigation'
import { auth } from '@/lib/firebase/client'
import { getIdToken, sendEmailVerification } from 'firebase/auth'
import { useToast } from '@/lib/context/ToastProvider'



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
  const { showToast } = useToast()
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
        console.log('🚀 Starting login process...')
        
        // 登录
        const userCredential = await loginWithEmail(data.email, data.password)
        const user = userCredential
        console.log('Login successful, user:', user?.email)

        // 校验邮箱是否已验证
        if (!user.emailVerified) {
          console.log('Email not verified, redirecting to verify page')
          router.push('/auth/verify-email')
          return
        }

        console.log('Email verified')

        // 获取 token，并写入 Cookie
        const token = await getIdToken(user, true)
        console.log('🎫 Got token, length:', token?.length)
        
        await setAuthTokenCookie(token)
        console.log('🍪 Cookie set successfully')

        showToast({
          type: 'success',
          title: '登录成功',
          description: '正在跳转...'
        })

        console.log(' Redirecting to:', redirectPath)
        // 登录成功后重定向
        router.push(redirectPath)

      } else {
        // 注册 + 
        const user = await registerWithEmail(data.email, data.password)

        showToast({
          type: 'success',
          title: '注册成功',
          description: '请查看邮箱验证链接'
        })

        // 跳转到提示页面
        router.push('/auth/verify-email')
      }
    } catch (err: any) {
      console.error('❌ Auth error:', err)
      showToast({
        type: 'error',
        title: '操作失败',
        description: err.message || '发生错误，请稍后再试。'
      })

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
