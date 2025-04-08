# 📘 AI Resume Generator 项目开发与前端面试知识总结文档

> 📅 时间：2025/04/08  
> 👨‍💻 项目阶段：MVP 1（首页结构 + 全局样式系统搭建）  
> 🧭 主线主题：Next.js App Router + Tailwind v4 + 语义化配色系统 + 响应式结构 + UI 动效  
> 🧪 文档用途：开发复盘 / 面试准备 / 团队交接文档模板

---

## 🌟 阶段 1：项目初始化与 App Router 结构搭建

### 🌟 阶段目标
- 使用 Next.js App Router 初始化项目
- 建立语义化路由结构：`layout.tsx`, `page.tsx`
- 配置 TypeScript、Tailwind CSS、全局样式结构

---

## 🔚 阶段总结（适合面试自述）

我在首页阶段中构建了完整的组件化结构与配色系统，使用 Tailwind v4 的 HSL 语法构建了语义化主题变量，解决了颜色不生效问题。通过调试页面验证了主题切换能力，并实现了响应式布局与主视觉动画，为后续 resume builder 页面打下基础。

### 🧠 涉及知识点详解

#### ✅ App Router 基础

```bash
src/
└── app/
    ├── layout.tsx    # 全局布局（Header/Footer）
    ├── page.tsx      # 首页内容
    └── color-test/   # 动态路由 = 页面路径
```

**特点：**

- 每个文件夹即代表一个页面路由
- 支持嵌套路由、模板、layout 分离
- App Router 替代旧的 Pages Router，更灵活、更组件化

#### ✅ layout.tsx 示例

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

#### ✅ Tailwind CSS 初始化步骤

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

配置 `tailwind.config.js`：

```js
content: ['./src/**/*.{js,ts,jsx,tsx}']
```

`globals.css` 中必须添加：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 🔍 面试常问问题（App Router 结构）

| 中文问题                                 | 英文问题                                     |
|------------------------------------------|----------------------------------------------|
| layout.tsx 与 page.tsx 有何区别？        | What's the difference between layout and page? |
| App Router 有什么优势？                  | What are the advantages of App Router?        |
| 如何配置全局 CSS？                       | How do you configure global styles in Next.js? |

**标准回答模板：**

> ✅ 中文：`layout.tsx` 是整个页面的外壳，通常包含 Header、Footer；`page.tsx` 是每个页面的具体内容。  
> ✅ English: `layout.tsx` wraps the page layout (e.g., Header/Footer), while `page.tsx` contains page-specific content.

---

## 🌟 阶段 2：组件化首页结构（Header + Hero + Footer）

### 🌟 阶段目标
- 使用 React 函数组件完成首页三个核心模块
- 实现毛玻璃导航栏、渐入主视觉、响应式按钮区
- 完成页面基础动画和结构语义优化

---

### 🧠 涉及知识点详解

#### ✅ React 函数组件 & JSX 规范

```tsx
export default function Header() {
  return <header className="...">...</header>
}
```

- 必须大写组件名开头
- 使用 `className` 替代 HTML 中的 `class`
- 元素必须闭合：如 `<br />`、`<input />`

#### ✅ framer-motion 页面动画

```tsx
<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
>
  <h1>欢迎使用 AI 简历生成器</h1>
</motion.section>
```

#### ✅ 响应式按钮样式

```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button className="bg-primary hover:bg-primary-hover">开始体验</button>
</div>
```

---

### 🔍 面试常问问题（组件与响应式）

| 中文问题                           | 英文问题                                         |
|------------------------------------|--------------------------------------------------|
| React 函数组件和类组件有何区别？   | What's the difference between function and class components? |
| 如何实现响应式按钮？               | How do you make a responsive button layout in Tailwind? |
| JSX 中 class 和 className 的区别？| What's the difference between `class` and `className` in JSX? |

---

### ⚠️ 常见错误与最佳实践

| 错误写法 / 问题                           | 正确做法 / 建议                                          |
|------------------------------------------|----------------------------------------------------------|
| JSX 中写 `<div class="...">`              | ✅ 改为 `className`                                       |
| 忽略移动端布局                           | ✅ 使用 `sm: md:` 断点类实现响应式                        |
| 动画逻辑写在 CSS class 中                | ✅ 使用 `framer-motion` 控制动画生命周期                  |
| 所有样式集中在一个组件                   | ✅ 拆分：Header/Hero/Footer，后期易维护可复用             |

---

## 🌟 阶段 3：Tailwind v4 配色系统构建与调试

### 🌟 阶段目标
- 使用 HSL + CSS Variables 实现统一主题系统
- 创建 `.dark` 类支持暗黑模式预设
- 使用 `/color-test` 页面调试所有颜色变量是否生效

---

### 🧠 涉及知识点详解

#### ✅ `tailwind.config.js` 配置示例

```js
colors: {
  bg: "hsl(var(--bg) / <alpha-value>)",
  fg: "hsl(var(--fg) / <alpha-value>)",
  primary: {
    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
    hover:   "hsl(var(--primary-hover) / <alpha-value>)",
  },
}
```

#### ✅ `globals.css` 中 CSS 变量写法

```css
:root {
  --bg: 0 0% 97%;
  --fg: 0 0% 10%;
  --primary: 211 100% 45%;
}

.dark {
  --bg: 0 0% 7%;
  --fg: 0 0% 95%;
  --primary: 210 100% 56%;
}
```

#### ✅ 正确加载方式（v4 专属）

```css
@config "../../tailwind.config.js";
@import "tailwindcss";
```

#### ✅ PostCSS 插件正确顺序

```js
// postcss.config.mjs
export default {
  plugins: {
    autoprefixer: {},
    "@tailwindcss/postcss": {}, // ✅ 必须有
  },
}
```

---

### 🔍 面试常问问题（Tailwind 配置）

| 中文问题                                     | 英文问题                                                |
|----------------------------------------------|----------------------------------------------------------|
| Tailwind v4 配色变量不生效可能原因？         | Why might color variables not work in Tailwind v4?       |
| `@config` 有什么作用？                        | What does `@config` do in Tailwind v4?                   |
| `<alpha-value>` 是什么？                     | What is `<alpha-value>` in Tailwind's color system?      |
| 如何支持暗黑模式？                           | How to implement dark mode with Tailwind and CSS vars?   |

---

### ⚠️ 常见错误与建议

| 问题                          | 解决方案                                                  |
|-------------------------------|------------------------------------------------------------|
| Tailwind 类名写了但样式无效   | 检查变量是否挂载到 `:root`，或类名是否被 purge 掉         |
| 使用了 `bg-white text-black` | ✅ 改用语义类 `bg-bg text-fg`，统一主题切换控制             |
| 忘记在 layout.tsx 中引入 `globals.css` | ✅ 必须引入，否则颜色系统无法生效                         |

---

# 🧠 相关面试题整理：全面覆盖（必刷）

### ✅ HTML / CSS / JS 基础

- `class` 和 `className` 的区别
- flex 与 grid 区别
- HSL 和 RGB 有什么区别？
- 常见响应式布局方法
- Tailwind 为何推荐 utility-first？
- `let`、`var`、`const` 区别
- 箭头函数和普通函数区别

---

### ✅ React / Next.js 框架

- 什么是 JSX？
- React 组件命名规范？
- 什么是 props 和 state？
- React 中状态提升是什么？
- `useEffect` 何时触发？
- layout.tsx 和 page.tsx 有什么区别？
- 如何配置全局样式？
- Next.js 中如何做 SSR？
- 如何实现暗黑模式？
- 如何支持多语言？

---

### ✅ 性能优化与浏览器原理

- 什么是懒加载？
- React 如何避免重复渲染？
- 如何压缩最终构建体积？
- 浏览器渲染流程：Reflow vs Repaint
- IntersectionObserver 应用场景？

---

### ✅ 工程化与部署流程

- 如何配置 PostCSS？
- Tailwind v4 的构建优化方式？
- Tree-shaking 原理？
- Vercel / Netlify 的部署方式
- `.env.local` 文件的作用？

---

### ✅ 网络安全与协议相关

- 什么是 XSS / CSRF？
- 如何保护用户登录状态？
- 浏览器的 SameSite Cookie 策略？
- 如何通过中间件校验 Token？

---

### ✅ 手写代码 / 算法题

- 实现节流 / 防抖函数
- 实现一个深拷贝函数
- 用 JS 实现 queryString 转对象
- 实现一个类名合并函数（类似 `clsx`）
