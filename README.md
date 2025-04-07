# 🧠 AI Resume Generator

AI Resume Generator 是一个基于现代技术栈构建的 AI 简历生成器项目，目标是实现一个支持内容生成、实时预览和 PDF 导出的智能工具。在这个过程中，我将以“边做边学”的方式系统学习 **Next.js（App Router）**、**React**、**Tailwind CSS**、**Firebase** 和 **OpenAI API**。

> 📌 当前进度：**已完成基础项目结构搭建，核心功能开发尚未开始。**

---

## ✨ 技术栈

| 类别       | 技术                             |
| ---------- | -------------------------------- |
| 框架       | **Next.js 13+ App Router**       |
| UI 框架    | **Tailwind CSS**（支持暗黑模式） |
| 状态管理   | React 本地状态 + Server Actions  |
| 表单处理   | `react-hook-form` + `zod`        |
| 后端服务   | **Firebase（Auth + Firestore）** |
| AI 服务    | **OpenAI GPT-4 API**             |
| PDF 导出   | `@react-pdf/renderer`            |
| 国际化     | `next-intl`（中英文切换）        |
| 认证与守卫 | Middleware + Firebase Token 验证 |

---

## 📦 项目结构（已完成）

当前采用推荐的 `src/` 架构，并使用 App Router：

```bash
ai-resume-generator/
├── src/
│   ├── app/                        # App Router 页面和路由
│   │   ├── layout.tsx             # 全局布局
│   │   ├── page.tsx               # 首页（Landing）
│   │   ├── builder/               # 简历生成页面
│   │   │   ├── page.tsx
│   │   │   └── actions.ts         # Server Actions: 保存简历 + 调 GPT
│   │   ├── auth/                  # 登录/注册页面
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── [locale]/              # 动态多语言支持路由
│   │
│   ├── components/                # 所有 UI/功能组件
│   │   ├── layout/                # Header / Footer / ThemeProvider
│   │   ├── forms/                 # 表单组件（用户信息、经历等）
│   │   ├── preview/               # 简历实时预览模块
│   │   ├── pdf/                   # PDF 导出
│   │   ├── ui/                    # 通用按钮、输入框、切换器
│   │   └── icons/                 # 图标（可选）
│   │
│   ├── lib/                       # 工具方法 & Firebase 封装
│   │   ├── firebase/
│   │   │   ├── client.ts         # Firebase SDK 初始化（客户端）
│   │   │   ├── admin.ts          # Firebase Admin SDK（服务端）
│   │   │   ├── auth.ts           # 登录注册逻辑封装
│   │   │   └── firestore.ts      # CRUD 简历数据封装
│   │   ├── openai.ts             # 调用 OpenAI API 方法
│   │   ├── utils.ts              # 工具函数（日期格式化等）
│   │   └── validators.ts         # zod 表单验证 schema
│   │
│   ├── i18n/                      # 多语言配置与资源
│   │   ├── config.ts
│   │   ├── en.json
│   │   └── zh.json
│   │
│   ├── types/                     # 类型定义
│   │   ├── resume.ts
│   │   └── user.ts
│   │
│   └── styles/                    # 全局样式文件
│       ├── globals.css
│       └── theme.css
│
├── public/                        # 静态资源（图片、favicon）
│
├── middleware.ts                  # 中间件：语言切换、auth 检查
├── .env.local                     # 环境变量（Firebase、OpenAI）
├── tailwind.config.js             # Tailwind 配置
├── postcss.config.js              # PostCSS 配置
├── next.config.js                 # Next.js 配置
├── tsconfig.json                  # TypeScript 配置
└── README.md                      # 项目说明文档
```

---

## 🗺️ 学习路线 & 开发任务（MVP + 知识点拓扑排序）

项目开发按模块/知识点进行 **拓扑排序学习**，每一阶段是一个 **可展示的 MVP（最小可行产品）**：

---

### ✅ MVP 0：项目初始化 ✅（已完成）

> 🎯 目标：完成结构化项目初始化，为学习与开发打下良好基础。

- [x] 使用 `create-next-app` 创建 App Router 项目
- [x] 启用 TypeScript 支持
- [x] 安装并配置 Tailwind CSS
- [x] 搭建推荐的 `src/` 目录结构
- [x] 添加 `layout.tsx` 全局布局入口
- [x] 准备 README 文档作为路线图

📚 学习内容：
- Next.js App Router 结构与路由机制
- 项目结构化组织原则
- Tailwind CSS 初步配置
- React 组件布局基础

---

### 🔧 MVP 1：首页结构 + 全局布局（Hero Section）

> 🎯 目标：构建一个具有现代科技感的首页，包含导航栏、Hero 主视觉区块（标题 + 副标题 + CTA），并具备响应式、语义化和完整的用户体验结构。

---

#### ✅ 主任务列表（核心功能）

- [x] 创建 `Header.tsx`，包含 Logo、登录按钮、语言切换按钮（占位）
- [x] 完成 `Hero.tsx`：主标题、副标题、CTA 按钮区
- [x] 使用 Tailwind 完成响应式布局（断点适配 + 自适应按钮排列）
- [x] 在 `layout.tsx` 中正确引入 `globals.css` 并渲染 Header + children
- [ ] 添加 `Footer.tsx`（版权 + GitHub 链接等信息）
- [ ] 使用语义化标签组织结构（`<header>` / `<main>` / `<footer>`）
- [ ] 为 Hero 页面添加基础过渡动效（如 fade-in，提升质感）
- [ ] 添加 Loading Skeleton 组件并使用 `React.Suspense` 包裹首页内容

---

#### ⏳ 延迟处理的任务（将拆分为后续独立子任务）

- [ ] 引入 `next-themes` 完成暗黑模式切换（推荐放在 MVP 4：表单体验完善 后完成）
- [ ] 引入 `next-intl` 实现多语言切换（推荐放在 MVP 3 表单完成后单独执行）

> ✅ 当前 UI 中已提供语言切换按钮，占位未接入功能逻辑。

---

#### 📚 本阶段学习内容（含常见面试考点）

| 技术点 | 说明 | 面试高频问法 |
|--------|------|----------------|
| App Router 基础结构 | layout.tsx + page.tsx 分工明确 | layout 和 page 的区别？ |
| 函数组件编写与组合 | Header、Hero 模块封装 | 如何组织页面组件？ |
| Tailwind 样式系统 | utility-first + 响应式断点 | 如何用 Tailwind 实现响应式？ |
| Flex 布局 + Button 交互设计 | `flex gap justify-between` 结构控制 | 如何实现按钮横排换行？ |
| 响应式设计技巧 | `md: lg:` 控制字体、间距等 | Tailwind 中断点适配怎么写？ |
| 结构语义化 | 使用 `<header>`, `<main>` 等标签 | 如何提高页面语义性？ |
| 动效与交互反馈 | hover、transition、动画渐显 | 如何提升交互质感？ |

---

#### 💡 备注：为什么暗黑模式和多语言延后？

这两个功能涉及：

- 全局状态管理（如 `ThemeProvider`, `IntlProvider`）
- 动态路由 (`[locale]/`)、服务端数据传递（SSR 支持）
- 用户偏好持久化（本地存储、cookie）

🚀 推荐在你掌握了表单、页面间跳转、基本状态管理后，再进入这些系统性的增强功能：

| 功能         | 推荐实现时间 | 所属 MVP |
|--------------|----------------|----------|
| 暗黑模式     | 完成表单、初步布局逻辑后 | MVP 4 或 MVP 7 |
| 多语言支持   | 完成静态文案集中整理后 | MVP 3 之后，作为单独任务 |


---

### 🧑‍💼 MVP 2：简历构建页页面搭建

> 🎯 目标：创建简历构建页 `/builder`，搭建页面结构（表单 + 预览）

- [ ] `app/builder/page.tsx` 页面骨架：两栏布局
- [ ] 左侧用于表单，右侧实时显示预览组件
- [ ] 使用 React state 管理表单与预览同步

📚 学习内容：
- 页面布局分栏技巧
- `useState` / props 传值结构
- 动态组件结构管理

---

### 📝 MVP 3：表单模块构建（用户基本信息）

> 🎯 目标：实现用户基本信息输入表单模块，包含表单验证

- [ ] 使用 `react-hook-form` 构建输入字段
- [ ] 使用 `zod` 进行字段验证
- [ ] 封装通用 `Input.tsx`、`Label.tsx` 等 UI 组件

📚 学习内容：
- `react-hook-form` 控制表单生命周期
- `zod` + `resolver` 联动校验机制
- 表单数据结构与类型定义

---

### 📚 MVP 4：动态项目经历输入（数组字段）

> 🎯 目标：支持添加多个项目经历，字段可增删

- [ ] 使用 `useFieldArray` 实现动态字段
- [ ] 添加/删除按钮交互
- [ ] 将经历列表实时传入简历预览模块

📚 学习内容：
- 动态列表表单处理技巧
- 深层嵌套表单对象管理
- 表单与预览联动逻辑设计

---

### 🤖 MVP 5：接入 OpenAI API，生成简历内容

> 🎯 目标：接入 GPT 接口，生成个性化简历文案

- [ ] 在 `lib/openai.ts` 封装 GPT 请求函数
- [ ] 使用 Server Action (`app/builder/actions.ts`) 实现服务端请求
- [ ] 处理 loading/error 状态，生成结果展示

📚 学习内容：
- Server Actions 基础用法
- 调用 OpenAI 接口（GPT-4）
- 服务器端与客户端状态管理配合

---

### ☁️ MVP 6：将数据存入 Firebase Firestore

> 🎯 目标：将用户简历数据持久化到 Firebase 数据库中

- [ ] 初始化 Firebase 客户端 SDK
- [ ] 使用 Admin SDK 在 Server Action 中写入数据
- [ ] 将用户每次生成记录保存在 `users/{uid}/resumes`

📚 学习内容：
- Firebase 权限配置与数据结构设计
- Server 端安全访问 Firebase（Admin SDK）
- 数据与用户关联建模

---

### 🔐 MVP 7：用户登录 / 注册（Firebase Auth）

> 🎯 目标：实现基础登录注册功能（邮箱/密码）

- [ ] 构建登录/注册 UI 页面
- [ ] 使用 `firebase/auth` 实现登录注册
- [ ] 将用户状态传入全局 Provider
- [ ] 使用 `middleware.ts` 保护需要登录的页面（如 `/builder`）

📚 学习内容：
- Firebase 客户端登录流程
- 用户上下文管理（`useUser()`）
- 页面访问权限控制

---

### 📄 MVP 8：简历 PDF 导出功能

> 🎯 目标：将简历预览一键导出为 PDF 文件

- [ ] 使用 `@react-pdf/renderer` 创建 PDF 模板
- [ ] 添加 “导出 PDF” 按钮
- [ ] 支持命名保存、自动下载功能

📚 学习内容：
- PDF 渲染组件使用方法
- 动态渲染数据并导出为文件
- 性能优化（懒加载、预编译）

---

## 📈 项目目标总结

| 阶段  | 目标            | 技术收益                 |
| ----- | --------------- | ------------------------ |
| MVP 1 | 首页展示        | 布局 + 响应式 + Tailwind |
| MVP 2 | 页面结构        | 路由机制 + 状态提升      |
| MVP 3 | 表单模块        | 表单处理 + 表单验证      |
| MVP 4 | 动态输入        | 列表动态表单 + 数据映射  |
| MVP 5 | AI 生成         | API 调用 + Server Action |
| MVP 6 | Firebase 持久化 | 数据建模 + 权限控制      |
| MVP 7 | 用户认证        | 登录注册流程             |
| MVP 8 | PDF 导出        | 第三方工具集成能力       |

---

## 🧭 开发提示

- 每完成一个 MVP，建议写一份 dev log 或 issue 小结 ✅
- 尝试部署到 Vercel，持续集成测试自己的产品上线流程
- 保持模块化、组件化开发，写小组件，常封装，注重复用
- 不要“等会再学”，每一步尽量 **边做边理解边输出**

---

## 🧑‍💻 作者

Created by Haotian Chen 
📧 huntchen00@gmail.com / GitHub / huntchen.me

---

## 📄 License

MIT License