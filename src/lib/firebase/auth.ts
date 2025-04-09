// src/lib/firebase/auth.ts
import { auth } from './client'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  User,
} from 'firebase/auth'

// 注册并发送邮箱验证
export async function registerWithEmail(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  
  const continueUrl = `${window.location.origin}/auth/verified-success`// 指定验证成功后跳转地址

  await sendEmailVerification(result.user, {
    url: continueUrl,
    handleCodeInApp: true
  })

  return result.user
}

// 登录
export async function loginWithEmail(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

// 登出
export async function logout(): Promise<void> {
  return await signOut(auth)
}
