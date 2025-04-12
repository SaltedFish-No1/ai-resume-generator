// src/components/layout/HomeHero.tsx
'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import FireflyBackground from '@/components/ui/FireflyBackground'
import { useTheme } from 'next-themes'
import { MouseSpotlight } from '@/components/ui/animations/MouseSpotlight'

export default function HomeHero() {

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* 🌌 多彩萤火虫背景（亮度自动根据主题调整） */}
      {/* <FireflyBackground
        intensity={resolvedTheme === 'dark' ? 0.05 : 0.08}
        count={5}
        blur={resolvedTheme === 'dark' ? 'blur-xl' : 'blur-md'}
      /> */}

      <MouseSpotlight />


      {/* 🧠 Hero 文案 */}
      <div className="relative z-20 w-full max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-snug mb-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block"
          >
            让 AI 帮你生成
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="block"
          >
            更优秀的 <span className="text-primary font-bold">简历</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
        >
          快速构建，智能定制，实时预览，一键导出 PDF。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button href="/builder">开始体验</Button>
          <Button variant="secondary" href="#features">查看功能</Button>
        </motion.div>
      </div>
    </section>
  )
}
