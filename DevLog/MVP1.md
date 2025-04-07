# 📚 技术总结文档：MVP 1 学习内容回顾

> 文档结构参考官方文档写法，分模块、分段落，内容循序渐进、重点明确。

------

## 📘 模块一：Next.js App Router 基础概念

### 📌 核心文件结构

| 文件          | 作用                                     |
| ------------- | ---------------------------------------- |
| `layout.tsx`  | 全局布局容器（布局结构、Header、Footer） |
| `page.tsx`    | 每个路由下的实际内容渲染                 |
| `head.tsx`    | 页面 `<head>` 内容配置，如 title、meta   |
| `loading.tsx` | 页面加载时的状态（可配合 `Suspense`）    |
| `[locale]/`   | 动态国际化路由目录，支持多语言           |

### ✅ 使用方式

```tsx
// layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
```

------

## 📘 模块二：React 函数组件 & JSX 基础

### 📌 函数组件定义

```tsx
function Header() {
  return <header>内容</header>
}
```

- 必须使用大写字母开头（React 才识别为组件）
- 返回 JSX 结构（类 HTML）

### 📌 JSX 语法注意事项

| 项目       | JSX 写法                    |
| ---------- | --------------------------- |
| HTML class | `className="..."`           |
| 子元素     | 必须用闭合标签，如 `<br />` |
| 事件绑定   | `onClick={() => ...}`       |
| 多元素返回 | 必须用 `<>...</>` 包裹      |

------

## 📘 模块三：Tailwind CSS 实用类系统

### 📌 引入步骤

1. 安装 Tailwind：

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. 配置 `tailwind.config.js`：

   ```js
   content: ['./src/**/*.{js,ts,jsx,tsx}'],
   ```

3. 在 `globals.css` 引入：

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. 在 `layout.tsx` 引入全局样式：

   ```tsx
   import './globals.css'
   ```

### 📌 常见 Utility 类（实用类）

| 类名                  | 作用                |
| --------------------- | ------------------- |
| `flex`                | 设置为 Flexbox 布局 |
| `justify-between`     | 主轴两端对齐        |
| `items-center`        | 交叉轴居中          |
| `text-xl` `font-bold` | 字体大小/粗细       |
| `px-4 py-2`           | 内边距设置          |
| `hover:bg-gray-100`   | 悬停变色            |
| `transition`          | 添加过渡动画        |

### 📌 响应式断点类

| 类名          | 表示含义                 |
| ------------- | ------------------------ |
| `md:text-xl`  | ≥768px 时应用 text-xl    |
| `lg:flex-row` | ≥1024px 时设置为横向排列 |

------

## 📘 模块四：页面结构与用户体验增强点

### ✅ 已完成结构组件

- Header（导航栏）
- Hero（主视觉标题、按钮）
- 响应式布局（移动端按钮自动换行）

### ⏳ 推迟处理的结构优化（将于后续 MVP 实现）

| 模块                | 说明                                                      |
| ------------------- | --------------------------------------------------------- |
| 暗黑模式            | 使用 `next-themes` 实现（放在 MVP 4）                     |
| 多语言切换          | 使用 `next-intl` + `[locale]` 动态路由（放在 MVP 3 之后） |
| Suspense + Skeleton | 首页加载状态优化（可放在 MVP 2.5）                        |
| Footer 组件         | 页面完整性和 SEO（推荐立即补全）                          |
| 动效动画            | Hero 渐显、按钮动效增强科技感                             |

------

# 🎯 面试高频考点汇总（全面覆盖）

------

## ✅ Next.js 部分

| 面试问题                                | 简明回答                                                     |
| --------------------------------------- | ------------------------------------------------------------ |
| `layout.tsx` 和 `page.tsx` 有什么区别？ | `layout.tsx` 是布局容器，`page.tsx` 是页面内容               |
| App Router 的文件结构是怎样的？         | 每个文件夹是一个路由，内部有 `page.tsx` / `layout.tsx` 等    |
| 如何处理页面加载状态？                  | 使用 `React.Suspense` 搭配 `loading.tsx` 或 `Skeleton` 组件  |
| 如何配置全局样式？                      | 在 `layout.tsx` 引入 `globals.css`，内容中包含 Tailwind 指令 |

------

## ✅ React 部分

| 面试问题                   | 简明回答                                           |
| -------------------------- | -------------------------------------------------- |
| 函数组件的定义方式？       | 使用 `function` 或箭头函数返回 JSX                 |
| JSX 和 HTML 有什么区别？   | 使用 `className`，事件是 camelCase                 |
| 如何实现组件复用？         | 把相同结构/逻辑封装为独立组件，通过 props 控制行为 |
| React 组件必须大写开头吗？ | 是的，小写会被解析为原生标签而非组件               |

------

## ✅ Tailwind CSS 部分

| 面试问题                     | 简明回答                                         |
| ---------------------------- | ------------------------------------------------ |
| Tailwind CSS 是什么？        | 一个实用类优先的 CSS 框架，直接在 JSX 写样式类名 |
| Tailwind 的优点？            | 快速开发、样式集中、支持响应式和主题             |
| 如何实现响应式？             | 使用前缀：`md:`, `lg:` 控制不同屏幕下样式        |
| 如何提升 Tailwind 可维护性？ | 使用组件封装 + 类名条件组合（推荐 clsx）         |

------

## ✅ 用户体验优化部分

| 面试问题               | 简明回答                                         |
| ---------------------- | ------------------------------------------------ |
| 如何提升页面加载体验？ | 添加 Skeleton + Suspense 处理异步数据加载        |
| 如何设计科技感首页？   | 渐变背景、大字体主标题、CTA 动效、滚动动画       |
| 如何提升移动端体验？   | 断点优化按钮大小、布局改为垂直、内容缩放适配     |
| 结构语义化为什么重要？ | 提高 SEO、无障碍支持、可维护性，利于搜索引擎索引 |

------

## 🧠 进阶思考题（进大厂建议准备）

| 面试问题                                       | 回答建议                                                     |
| ---------------------------------------------- | ------------------------------------------------------------ |
| 如果 Tailwind 项目越来越大，样式会不会难管理？ | 使用组件封装、`clsx` 组合类名、配置 `tailwind-variants` 做语义抽象 |
| 如何处理暗黑模式的主题状态？                   | 推荐用 `next-themes` 自动根据系统/手动切换并使用 `class="dark"` 控制全局样式 |
| SSR 页面如何实现国际化？                       | 使用 `next-intl` 的 App Router 方案，结合 `middleware.ts` 控制路由跳转和 locale context |
| 页面动效过多影响性能怎么办？                   | 使用 IntersectionObserver 控制加载，或使用 `framer-motion` 的懒加载动画，保持动效“轻量级” |

------

## ✅ 总结一句话版本（适合面试自我介绍时提）

> 在项目的首页模块中，我使用 Next.js App Router 搭建了全局布局结构，采用 Tailwind CSS 构建响应式页面，并通过组件化方式封装了 Header、Hero 等模块。过程中掌握了 layout/page 的职责划分、实用类 CSS 使用方式、语义化结构组织等要点，同时为后续暗黑模式、国际化、多端适配等功能预留了良好扩展点。

