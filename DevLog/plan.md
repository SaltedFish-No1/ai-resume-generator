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
| AI 服务    | **OpenAI API** + **DeepSeek**             |
| PDF 导出   | `@react-pdf/renderer`            |
| 国际化     | `next-intl`（中英文切换）        |
| 认证与守卫 | Middleware + Firebase Token 验证 |

---
## 📦 项目结构（已完成）

当前采用推荐的 `src/` 架构，并使用 App Router：

```bash
src/
├── app/                            # ✅ App Router 主入口，按页面组织路由
│   ├── api/                        # 📡 接口目录（适用于 Server Actions 或 API 路由）
│   │   └── optimize/               # GPT 简历优化接口
│   │       ├── optimizeClient.ts   # 客户端调用封装（封装 fetch 请求）
│   │       └── route.ts            # API 路由处理 GPT 请求
│
│   ├── auth/                       # 🔐 认证相关页面
│   │   ├── login/                  # 登录页
│   │   │   └── page.tsx
│   │   ├── register/               # 注册页
│   │   │   └── page.tsx
│   │   ├── verified-success/       # 邮箱验证成功提示页
│   │   │   └── page.tsx
│   │   └── verify-email/           # 等待邮箱验证页
│       └── page.tsx
│
│   ├── builder/                    # 🛠️ 简历构建页（职位 + JD 输入 + GPT 生成）
│   │   ├── layout.tsx              # 注入 ResumeBuilderContext
│   │   └── page.tsx                # 主体页面：输入 + 预览双栏结构
│
│   ├── dashboard/                  # 🧭 未来用于简历历史或仪表盘
│   │   └── page.tsx
│
│   ├── debug/                      # 🧪 调试页面集合（仅开发使用）
│   │   ├── ai-test/                # GPT 生成测试
│   │   │   ├── mockResume.json
│   │   │   └── page.tsx
│   │   ├── animation-test/         # 动画组件调试
│   │   ├── auth-status/            # 当前用户状态调试
│   │   ├── color-test/             # Tailwind HSL 配色调试
│   │   ├── firebase-test/          # Firebase 基础连接调试
│   │   ├── form-test/              # 表单调试
│   │   ├── logo-test/              # logo 渲染测试
│   │   ├── middleware-test/        # 中间件保护页测试
│   │   └── page.tsx
│
│   ├── HomeHero.tsx                # 首页主视觉组件（可提取成组件）
│   ├── layout.tsx                  # 全局布局（Header + Footer 包裹）
│   ├── page.tsx                    # 首页页面（landing）
│
│   ├── profile/                    # 👤 用户信息管理页面
│   │   ├── account/                # 账户信息页（预留）
│   │   └── edit/                   # 用户简历信息编辑页
│   │       └── page.tsx
│
│   └── [locale]/                   # 🌍 多语言路由支持目录（动态语言切换）
│
├── components/                     # 🧩 所有可复用的 UI 和业务组件
│   ├── auth/                       # 登录注册表单封装组件
│   │   ├── AuthForm.tsx
│   │   └── AuthFormSkeleton.tsx
│
│   ├── builder/                    # 简历构建页面专属组件
│   │   ├── BuilerHeader.tsx        # 顶部操作栏（按钮/保存等）
│   │   ├── JobDescriptionForm.tsx  # JD 输入表单
│   │   ├── preview/                # 简历预览子模块
│   │   │   ├── BasicInfo.tsx       # 个人信息展示
│   │   │   ├── EditableField.tsx   # 可编辑字段（预留）
│   │   │   ├── EducationList.tsx   # 教育经历
│   │   │   ├── ExperienceList.tsx  # 工作经历
│   │   │   ├── OtherInfoList.tsx   # 获奖、证书等
│   │   │   ├── ProjectList.tsx     # 项目经历
│   │   │   ├── Section.tsx         # 分区标题封装
│   │   │   └── SkillsList.tsx      # 技能列表
│   │   ├── ResumePreview.tsx       # 全部预览区组合
│   │   └── skeletons/
│   │       └── ResumePreviewSkeleton.tsx
│
│   ├── icons/                      # 自定义图标集合（如 SVG 组件）
│
│   ├── layout/                     # 全局布局组件
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LocaleSwitcher.tsx     # 多语言切换按钮（占位）
│   │   ├── Providers.tsx          # 注入 Provider（Theme / Auth / Toast）
│   │   └── UserMenu.tsx           # 登录用户菜单
│
│   ├── pdf/                        # PDF 渲染导出组件（MVP7）
│
│   ├── profile/                    # 用户资料页表单组件
│   │   ├── forms/
│   │   │   ├── BasicInfoForm.tsx
│   │   │   ├── EducationFormList.tsx
│   │   │   ├── ExperienceFormList.tsx
│   │   │   ├── OtherInfoForm.tsx
│   │   │   ├── ProjectFormList.tsx
│   │   │   ├── ResumeUpload.tsx
│   │   │   ├── skeletons/
│   │   │   │   └── ProfileEditSkeleton.tsx
│   │   │   └── SkillsForm.tsx
│
│   └── ui/                         # 通用组件（跨模块复用）
│       ├── ActionMenu.tsx
│       ├── animations/
│       │   ├── LoadingIndicator.tsx
│       │   └── MouseSpotlight.tsx
│       ├── Button.tsx
│       ├── FireflyBackground.tsx
│       ├── Logo.tsx
│       ├── LogoWithText.tsx
│       ├── Skeleton.tsx
│       ├── SliderWithLable.tsx
│       ├── TagInput.tsx
│       ├── ThemeToggle.tsx
│       └── UserMenu.tsx            # 与 layout 的重复名，可合并命名
│
├── i18n/                           # 🌍 多语言支持配置
│   ├── cn.json
│   ├── en.json
│   └── config.ts                   # next-intl 配置
│
├── lib/                            # 工具函数 / 服务封装
│   ├── ai/                         # AI 调用封装
│   │   ├── optimizeResume.ts       # GPT 调用逻辑
│   │   └── promptUtils.ts          # prompt 模板工具
│
│   ├── auth/                       # Cookie 设置 / 解析
│   │   └── cookies.ts
│
│   ├── context/                    # 全局状态管理（React Context）
│   │   ├── auth.tsx                # 用户认证上下文
│   │   ├── builder/ResumeBuilderContext.tsx  # 简历构建上下文
│   │   └── ToastProvider.tsx       # 全局通知组件
│
│   ├── firebase/                   # Firebase SDK 初始化
│   │   ├── auth.ts                 # 登录/注册逻辑
│   │   ├── client.ts               # 前端 SDK 初始化
│
│   ├── hooks/                      # 自定义 Hook
│   │   └── useResumeAction.ts      # 简历保存、下载等行为封装
│
│   ├── utils/                      # 通用工具函数
│   │   ├── formUtils.ts
│   │   ├── resumeUtils.ts          # 分解 / 提取简历结构
│   │   └── utils.ts
│
│   └── validators/                 # 表单校验 schema（zod）
│       └── resume.ts
│
├── middleware.ts                   # 🛡️ 中间件：语言切换 + 认证校验
├── styles/
│   └── globals.css                 # 全局 CSS 样式
└── types/                          # 类型定义
    ├── resume.ts
    └── user.ts

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
当前进度非常不错，已经完成了绝大部分功能 🎉。以下是你最新的 ToDo 状态更新：

---

### ✅ MVP 3：用户信息编辑页（`/profile/edit`）

> 🎯 目标：收集用户基本信息，供后续简历生成使用。

#### ✅ 已完成：

- ✅ 创建页面 `app/profile/edit/page.tsx`
- ✅ 使用 `react-hook-form` 构建表单
- ✅ 使用 `zod` 实现字段验证（姓名、职位、个人简介等）
- ✅ 上传 PDF 简历（已实现上传、预留解析接口）
- ✅ 表单提交后写入 Firestore（`users/{uid}/profile`）
- ✅ 表单 Skeleton 加载动画
- ✅ 表单字段组件模块化
- ✅ 使用统一 Button、错误展示、响应式设计

#### 📌 待办：

- [ ] 简历 PDF 文件上传成功后解析（使用 GPT）
- [ ] 设置 Firebase Storage 的 CORS（需 CLI 配置）
- [x] 表单校验规则增强（如电话格式、URL 校验等）
- [ ] 上传文件进度条（优化 UX，可选）

---

📚 学习重点回顾：

| 技术 | 应用示例 |
|------|----------|
| RHF + Zod | `useForm + zodResolver` 实现表单验证 |
| 状态管理 | `useState`, `useEffect`, `useUser` 等管理加载、上传、提交状态 |
| Firestore 数据建模 | `users/{uid}/profile/base` 文档结构 |
| Firebase Storage 上传 | 上传文件、获取下载链接、显示链接 |
| 组件设计 | 表单字段拆分为模块，支持 Skeleton 占位、解耦 |

---


### ✅ MVP 4：AI 简历构建页（`/builder` 页面）

> 🎯 目标：用户输入 Job Description，系统结合已有简历信息，生成个性化简历草稿并实时预览。

#### ✅ 已完成：

- [x] 页面结构：使用 `ResumeBuilderLayout` 注入上下文，`BuilderHeader` + `JobDescriptionForm` + `ResumePreview` 布局完成
- [x] 使用 `ResumeBuilderContext` 实现：
  - 职位输入（jobTitle, jobDesc）
  - 用户简历数据管理（basicInfo, skills, experience...）
- [x] Firestore 加载原始简历：`/users/{uid}/profile/base`
- [x] ResumePreview 完成分区渲染（教育经历、项目、技能等）

---

### ✅ MVP 5：接入 OpenAI GPT 生成简历

> 🎯 目标：调 OpenAI API，根据用户资料 + JD 生成个性化简历内容。

#### ✅ 已完成：

- [x] 构造 prompt：结合 jobTitle、jobDesc、原始简历
- [x] 接入 GPT 请求方法：`callOptimizeAPI()`（调用优化接口）
- [x] 优化触发按钮：`handleOptimize()` 内封装 loading + toast 提示
- [x] 使用 `extractXXX()` 方法分发优化后的数据
- [x] 状态联动更新 UI：更新 ResumePreview 内容

📚 学习重点：

| 项目                      | 说明 |
|---------------------------|------|
| Prompt 构建               | 使用职位名 + JD + 简历结构生成 GPT 输入 |
| 状态管理封装              | 使用 `ResumeBuilderContext` 管理生成数据 |
| API 封装与错误处理        | 使用 `callOptimizeAPI()` 并结合 toast 提示 |
| 异步流程体验              | loading 状态处理、fallback 提示优化 |
| 客户端预览联动渲染        | 数据结构统一更新至 preview 渲染区 |

#### 📌 待办：

- [ ] 更新ResumePreview相关组件，实现对简历的每一部分+prompt精准优化

---

### ⏳ MVP 6：数据持久化到 Firebase Firestore

> 🎯 目标：将生成后的简历保存，支持查看 / 编辑 / 导出。

#### 📝 ToDo List：

- [ ] 封装 `handleSave()` 方法，调用 `firestore.ts` 保存数据
- [ ] 路径设计：`users/{uid}/resumes/{resumeId}`
- [ ] 生成 resumeId（可用 `nanoid()` 或 Firestore auto id）
- [ ] 支持 resume list 接口（预留历史记录展示页）
- [ ] Firestore 规则限制用户仅访问自己的简历

📚 学习重点：

- Firestore 数据写入与更新
- Firestore Rules 权限控制
- 服务端写入建议使用 Admin SDK（或 Server Actions）

---

### ⏳ MVP 7：PDF 导出功能 📄

> 🎯 目标：一键将简历导出为 PDF 文件。

#### 📝 ToDo List：

- [ ] 使用 `@react-pdf/renderer` 构建简历模板
- [ ] 支持导出当前 preview 为 PDF
- [ ] 样式保持一致（配色 + 字体）
- [ ] 可命名保存 + 支持历史下载

---

### ⏳ MVP 8：项目增强与扩展

> 🎯 目标：增强用户体验与国际化能力。

#### 📝 ToDo List：

- [ ] 多语言切换（使用 `next-intl` + `[locale]/`）
- [ ] 响应式细节打磨
- [ ] 用户偏好持久化（语言、主题）

---

## 🧭 项目上线节奏建议

| 阶段    | 上线建议 |
|---------|----------|
| MVP 1~3 | ✅ 基础功能上线 |
| MVP 4~5 | ✅ 内容生成上线 |
| MVP 6   | ✅ 支持保存，推荐上线 |
| MVP 7~8 | 可选功能增强，可持续迭代上线 |

---

## ✅ 当前开发状态小结

| 功能模块 | 状态 | 备注 |
|----------|------|------|
| 用户信息编辑 | ✅ 已完成 | Firestore 存储 + RHF 表单 |
| JD 输入 + 构建页 | ✅ 已完成 | 页面 + 状态联动完成 |
| GPT 内容生成 | ✅ 已完成 | 接入 OpenAI + 优化逻辑 |
| 简历保存 | ⏳ 进行中 | 即将封装 `handleSave` |
| PDF 导出 | ⏳ 未开始 | MVP 7 启动项 |

---

## 🧑‍💻 作者

Created by Haotian Chen  
📧 huntchen00@gmail.com / GitHub / huntchen.me

---

## 📄 License

MIT License