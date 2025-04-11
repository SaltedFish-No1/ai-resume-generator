// src/app/layout.tsx

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/layout/Providers'



//debugger

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Resume Generator',
  description: '使用 AI 快速生成 PDF 简历',
  icons: {
    icon: '/favicon.svg',
  },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg text-fg`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

