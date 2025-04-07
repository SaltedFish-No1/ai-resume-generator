// src/app/layout.tsx
import './globals.css'
import Header from '@/components/layout/Header'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Header />
        {children}
      </body>
    </html>
  )
}
