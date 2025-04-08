// src /components/layout/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="min-h-screen w-full pt-36 pb-24 px-6 text-center bg-bg text-fg flex flex-col justify-center"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-snug mb-6">
        让 AI 帮你生成
        <br />
        更优秀的 <span className="text-primary font-bold">简历</span>
      </h1>

      <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
        快速构建，智能定制，实时预览，一键导出 PDF。
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Button href="/builder">开始体验</Button>
        <Button variant="secondary" href="#features">查看功能</Button>

      </div>
    </motion.section>
  )
}
