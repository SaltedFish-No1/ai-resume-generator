// src/components/layout/Providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import Script from 'next/script'
import { AuthProvider } from '@/lib/context/auth'
import { ToastProvider } from '@/lib/context/ToastProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 确保 next-themes 的主题设置脚本能按顺序加载 */}
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{var e=localStorage.getItem("theme");if(!e)return;document.documentElement.classList.add(e);}catch(e){}})();`}
      </Script>

      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}
