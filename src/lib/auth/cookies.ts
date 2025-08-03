// lib/auth/cookie.ts
import { setCookie, deleteCookie } from 'cookies-next'

const COOKIE_NAME = 'firebaseAuthToken'

/**
 * 写入 Firebase Auth 的 ID Token 到 Cookie
 */
export function setAuthTokenCookie(token: string): Promise<void> {
  return new Promise((resolve) => {
    setCookie(COOKIE_NAME, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 一周
      sameSite: 'strict',      // 严格 SameSite 防止 CSRF
      secure: process.env.NODE_ENV === 'production', // 生产环境必须开启 HTTPS 安全传输
      httpOnly: false          // 如果你需要服务端读取可改为 true，但 client 读不到
    })
    
    // 确保 Cookie 设置完成
    setTimeout(resolve, 100)
  })
}

/**
 * 清除 Firebase Auth 的 Cookie
 */
export function clearAuthTokenCookie() {
  deleteCookie(COOKIE_NAME)
}
