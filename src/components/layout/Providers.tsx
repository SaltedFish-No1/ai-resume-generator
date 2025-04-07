// src/components/layout/Providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import Script from 'next/script'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 确保 next-themes 的主题设置脚本能按顺序加载 */}
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{var e=localStorage.getItem("theme");if(!e)return;document.documentElement.classList.add(e);}catch(e){}})();`}
      </Script>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  )
}
