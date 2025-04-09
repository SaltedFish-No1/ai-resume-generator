// lib/auth/cookie.ts
import { setCookie, deleteCookie } from 'cookies-next'

export async function setAuthTokenCookie(user: any) {
    const token = await user.getIdToken()
    setCookie(
        'firebaseAuthToken',
        token,
        {
            path: '/',
            secure: false, // Set to false in production
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict', // Adjust as needed
        })
}

export function clearAuthTokenCookie() {
    deleteCookie('firebaseAuthToken')
}
