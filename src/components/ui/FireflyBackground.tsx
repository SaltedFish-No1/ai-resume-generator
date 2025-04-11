// components/ui/FireflyBackground.tsx
'use client'

import React from 'react'
import clsx from 'clsx'

/**
 * Props:
 * - intensity: 0 ~ 1（亮度强度）
 * - count: 萤火虫数量
 * - blur: 光斑模糊程度（默认 blur-sm）
 * - className: 外部自定义类名
 */
export default function FireflyBackground({
  intensity = 0.4, // 亮度强度
  count = 6, // 萤火虫数量
  blur = 'blur-sm', // 光斑模糊程度
  className = '', // 外部自定义类名
}: {
  intensity?: number
  count?: number
  blur?: string
  className?: string
}) {
  const fireflies = Array.from({ length: count })

  return (
    <div className={clsx('absolute inset-0 pointer-events-none z-0 overflow-hidden', className)}>
      {/* 多彩渐变大背景 */}
      <div
        className={clsx('absolute inset-0 animate-pulseSlow mix-blend-screen blur-3xl')}
        style={{
          opacity: intensity,
          background: `
            radial-gradient(circle at 20% 30%, #34d399 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, #818cf8 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, #f472b6 0%, transparent 60%)
          `,
        }}
      />

      {/* 萤火虫粒子 */}
      {fireflies.map((_, i) => {
        const top = Math.random() * 100
        const left = Math.random() * 100
        const size = 1 + Math.random() * 2
        const delay = Math.random() * 3
        // const colors = ['#6EE7B7', '#A78BFA', '#F472B6']
        const colors = ['#FDE68A', '#FCA5A5', '#A5B4FC', '#6EE7B7']
        const color = colors[i % colors.length]

        return (
          <div
            key={i}
            className={clsx(
              'absolute rounded-full animate-firefly',
              blur
            )}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}rem`,
              height: `${size}rem`,
              backgroundColor: color,
              opacity: 0.7,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}