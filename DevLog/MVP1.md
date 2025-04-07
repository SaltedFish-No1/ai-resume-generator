太好了，我们现在正式进入 **MVP 1 的开发阶段**！我会像官方文档一样，手把手、循序渐进地带你从零构建一个现代化的首页界面，并在过程中帮助你理解 React + Next.js App Router 的核心原理，同时为面试积累知识。

---

# 🔧 MVP 1：构建首页结构 + 全局布局（Hero Section）

## 📌 本节目标

我们要构建这样一个首页：

- ✅ 顶部导航栏（Header）包含：
  - 左侧 Logo
  - 右侧按钮区：语言切换 🌐、主题切换 ☀️/🌙、登录按钮 🔒
- ✅ 中部 Hero 区域（大标题、副标题、按钮）
- ✅ 响应式布局，支持暗黑模式
- ✅ 多语言显示（支持中/英文切换）

---

## 🧠 Step 1：认识 `layout.tsx`（App Router 的全局布局）

在 Next.js App Router（即使用 `app/` 目录）中，每一个页面都会被包裹在 `app/layout.tsx` 中，这就是我们设置**全局导航栏、主题、Provider 的地方**。

### ✅ 文件结构示意（MVP 1 中用到的部分）

```
src/
├── app/
│   ├── layout.tsx         ← 全局 Layout（包含 <html>, <body>, Providers）
│   ├── page.tsx           ← 首页内容（Hero Section）
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx     ← 顶部导航栏组件
│   │   ├── ThemeSwitcher.tsx ← 主题切换按钮
│   │   └── LocaleSwitcher.tsx ← 语言切换按钮
│
├── styles/
│   └── globals.css
```

---

## 📚 知识点讲解：`layout.tsx` 是什么？

### ✅ Next.js 官方定义（App Router）

> Every route segment can have its own `layout.tsx`, which wraps its children.  
> Think of it like a persistent shell that surrounds your pages.

### 📌 面试高频点：`layout.tsx` vs `page.tsx`

| 概念        | 含义 |
|-------------|------|
| `layout.tsx` | 页面骨架，用于共享 UI（如导航栏、侧边栏、全局 Provider） |
| `page.tsx`   | 具体内容页，放的是当前页面的实际 UI 结构 |

---

## 🛠 Step 2：编写 layout.tsx（设置全局结构）

我们从 `src/app/layout.tsx` 开始：

```tsx
// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Resume Generator',
  description: 'Generate resumes using AI + PDF export',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* 后续加入 Header */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 💡 Step 3：引入 `next-themes`（暗黑模式）

### ✅ 安装依赖

```bash
npm install next-themes
```

这个库会自动根据系统/用户设置切换 `class="dark"`，我们只需在 Tailwind 中使用 `dark:` 前缀即可。

---

## 🧱 Step 4：创建 `Header.tsx`（全局导航栏组件）

路径：`src/components/layout/Header.tsx`

```tsx
'use client'

import Link from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-cyan-500 hover:opacity-80">
        AI Resume
      </Link>

      {/* 控制按钮区 */}
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <ThemeSwitcher />
        <Link href="/auth/login" className="px-4 py-2 rounded-xl border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition">
          登录 / 注册
        </Link>
      </div>
    </header>
  )
}
```

---

## 🌓 Step 5：创建 ThemeSwitcher（主题切换按钮）

路径：`src/components/layout/ThemeSwitcher.tsx`

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="text-sm border rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

---

## 🌍 Step 6：创建 LocaleSwitcher（语言切换按钮）

你打算使用 `next-intl` 对吗？那我们将在下一阶段（单独讲），这部分可以暂时放一个按钮占位或使用静态跳转：

```tsx
export default function LocaleSwitcher() {
  return (
    <button className="border rounded px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
      🌐 EN / 中文
    </button>
  )
}
```

---

## ✅ Step 7：在 layout.tsx 中加入 Header

更新你的 `layout.tsx`：

```tsx
import Header from '@/components/layout/Header'

//...

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <Header />
  {children}
</ThemeProvider>
```

---

## ✅ 到这里你完成了：

- 全局布局结构 ✅
- Header 导航栏 ✅
- 主题切换 ✅
- 语言切换按钮（基础）✅

---

下一步我们将进入 **Hero Section** 开发（首页大标题 + CTA 按钮），同时学习：
- 如何使用 Tailwind 编写响应式布局
- 如何设计高对比、现代感的首页

---

你想我现在直接带你写 Hero.tsx 并讲解 Tailwind 响应式设计吗？还是你先尝试复现 Header，我帮你 Review？🙂