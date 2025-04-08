// src/app/layout.tsx

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from 'next-themes'
//debugger

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Resume Generator',
  description: '使用 AI 快速生成 PDF 简历',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg text-fg`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
