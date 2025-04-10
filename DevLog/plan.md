# 🧠 AI Resume Generator

AI Resume Generator 是一个基于现代技术栈构建的 AI 简历生成器项目，目标是实现一个支持内容生成、实时预览和 PDF 导出的智能工具。在这个过程中，我将以“边做边学”的方式系统学习 **Next.js（App Router）**、**React**、**Tailwind CSS**、**Firebase** 和 **OpenAI API**。


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

- [x] 添加 `Footer.tsx`（版权 + GitHub 链接等信息）

- [x] 使用语义化标签组织结构（`<header>` / `<main>` / `<footer>`）

- [x] 为 Hero 页面添加基础过渡动效（如 fade-in，提升质感）

- [ ] ~~添加 Loading Skeleton 组件并使用 `React.Suspense` 包裹首页内容~~

  > Hero组件是静态组件，不需要
---

#### ⏳ 延迟处理的任务（将拆分为后续独立子任务）

- [x] 引入 `next-themes` 完成暗黑模式切换（推荐放在 MVP 4：表单体验完善 后完成）
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

### ✅ MVP 2：用户认证系统 🔐

> 🎯 目标：实现基础登录 / 注册功能，构建用户上下文。

#### ✅ 实现成果：

- [x] 登录/注册页面：`/auth/login`、`/auth/register` ✅
- [x] 注册后发送邮箱验证 ✅
- [x] 登录成功判断是否验证 ✅
- [x] 全局用户上下文：`useUser()` + `AuthProvider` ✅
- [x] 用户状态持久化（使用 Firebase 默认机制）✅
- [x] 页面访问保护：middleware.ts 保护 `/builder`、`/profile/edit` ⏳

#### 📚 学习重点：

- Firebase Auth 登录机制与 SDK 使用
- `react-hook-form` + `zod` 表单构建 + 校验
- 用户状态封装（Context + Hook）
- 邮箱验证流程 + 重定向逻辑
- 基于登录状态的跳转控制（如未验证跳转）


------

### ✅ MVP 3：用户信息编辑页（`/profile/edit`）

> 🎯 目标：收集用户基本信息，供后续简历生成使用。

#### 📝 ToDo List：

- [ ] 创建页面 `app/profile/edit/page.tsx`
- [ ] 使用 `react-hook-form` 构建表单
- [ ] 使用 `zod` 实现字段验证（姓名、职位、个人简介等）
- [ ] 上传 PDF 简历（组件预留，未来支持解析）
- [ ] 表单提交后写入 Firestore（`users/{uid}/profile`）

📚 学习重点：

- RHF + zod 联动验证
- 表单状态管理
- Firestore 数据建模 & 写入

------

### ✅ MVP 4：简历构建页（`/builder` 页面）

> 🎯 目标：用户输入 Job Description → 实时预览生成的简历。

#### 📝 ToDo List：

- [ ] 页面布局为双栏结构（输入 + 预览）
- [ ] 输入字段：职位名称（可选）、职位描述（必填）
- [ ] 状态管理：`useState` 管理 JD + 职位名
- [ ] 预览模块：根据用户资料 + 输入展示生成内容（模拟数据即可）

📚 学习重点：

- 响应式双栏结构（`flex-col md:flex-row`）
- props 状态同步
- 表单输入联动渲染

------

### ✅ MVP 5：接入 OpenAI GPT 生成简历

> 🎯 目标：调 OpenAI API，根据用户资料 + JD 生成个性化简历内容。

#### 📝 ToDo List：

- [ ] 封装 `lib/openai.ts`，构造 prompt + 请求
- [ ] 创建 `app/builder/actions.ts` 中 Server Action 进行服务端请求
- [ ] 接收内容后更新 preview 内容
- [ ] 处理 loading 状态 / 报错提示

📚 学习重点：

- GPT prompt 构建技巧
- Server Actions 基本用法
- 服务端异步数据请求 + 客户端渲染反馈

------

### ✅ MVP 6：数据持久化到 Firebase Firestore

> 🎯 目标：将生成后的简历保存，支持查看 / 编辑 / 导出。

#### 📝 ToDo List：

- [ ] 初始化 Firebase Admin SDK（用于 Server Action 写入）
- [ ] 创建简历保存接口，路径为：`users/{uid}/resumes/{resumeId}`
- [ ] 预留 resume 列表接口（可用于历史简历管理）
- [ ] 确保用户只能访问自己数据（Firestore Rules）

📚 学习重点：

- Admin SDK 使用（服务端安全访问）
- Firestore 数据结构设计
- 权限验证 & 用户绑定数据策略

------

### ✅ MVP 7：PDF 导出功能 📄

> 🎯 目标：一键将简历导出为 PDF 文件。

#### 📝 ToDo List：

- [ ] 使用 `@react-pdf/renderer` 构建 resume PDF 模板
- [ ] 添加「导出 PDF」按钮
- [ ] 下载生成的 PDF，支持命名
- [ ] 保持样式一致（主题色 + 字体）

📚 学习重点：

- 动态数据渲染 PDF
- `@react-pdf/renderer` 使用方法
- PDF 性能优化（懒加载、组件拆分）

------

### ✅ MVP 8：项目增强与扩展（暗黑模式 / 多语言 / 响应式优化）

> 🎯 目标：提升产品完整性与可国际化能力。

#### 📝 ToDo List：

- [ ] 使用 `next-themes` 实现主题切换
- [ ] 接入 `next-intl` 管理中英文翻译文件
- [ ] 响应式优化各表单 / 卡片 / 预览组件
- [ ] 多语言切换按钮接入实际逻辑（语言记忆）

📚 学习重点：

- 主题切换与 CSS 变量联动
- i18n 路由结构 & 文案管理
- 多语言布局适配 & 用户偏好处理

------

### 🧭 最终建议开发节奏

| 阶段  | 任务概括              | 是否可上线演示 |
| ----- | --------------------- | -------------- |
| MVP 1 | 首页 + 配色系统       | ✅ 是           |
| MVP 2 | 登录注册              | ✅ 是           |
| MVP 3 | 用户资料填写          | ✅ 是           |
| MVP 4 | 简历构建页面          | ✅ 是           |
| MVP 5 | GPT 内容生成          | ✅ 是           |
| MVP 6 | Firestore 保存记录    | ✅ 是           |
| MVP 7 | PDF 导出              | ✅ 是           |
| MVP 8 | 多语言 / 暗黑模式增强 | ✅ 可选         |


#### 🧭 开发提示

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
