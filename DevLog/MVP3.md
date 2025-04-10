# 📘 Mvp3 Frontend Interview Guide

本指南以项目 MVP3 开发流程为主线，系统梳理 React + Next.js + Tailwind CSS + Firebase 等现代前端技术在实际开发中的应用。适用于复习、备考和知识巩固。

---

## 📌 阶段一：用户信息编辑页基础搭建

### 🌟 阶段目标
构建用户简历编辑页 `/profile/edit`，支持基本信息编辑、项目经验填写、技能列表维护等功能。

### 🧠 涉及知识点

#### 1. `react-hook-form` + `zod` 联动验证
```tsx
const form = useForm<ResumeData>({
  resolver: zodResolver(resumeSchema),
  defaultValues: { fullName: '', email: '', skills: [] },
});
```

- `react-hook-form` 是高性能、零依赖的表单管理库。
- `zod` 是运行时类型安全工具，用于表单校验。
- `zodResolver` 允许两者无缝集成。

#### 2. 用户认证状态管理
```ts
const { user, loading } = useUser();
```

通过 Context 封装 Firebase 的 `onAuthStateChanged`，实现全局用户状态共享。

#### 3. Firestore 数据读取与写入
```ts
const ref = doc(db, 'users', uid, 'profile', 'base');
await setDoc(ref, { ...cleanedData, updatedAt: serverTimestamp() }, { merge: true });
```

Firestore 使用文档层级结构构建用户信息，推荐 `merge: true` 合并更新，避免数据覆盖。

#### 4. Skeleton UI 提升 UX
```tsx
if (loading) return <ProfileEditSkeleton />;
```

在等待数据期间使用占位组件替代空白内容，提升用户感知。

#### 5. 上传 PDF 简历（组件预留）

用户可选择上传 PDF 简历，上传后保存至 `Firebase Storage`，后续预留 GPT 自动解析功能。

```ts
const fileRef = ref(storage, `resumes/${uid}/${file.name}`);
await uploadBytes(fileRef, file);
```

---

## 📌 阶段二：项目与技能动态列表实现

### 🌟 阶段目标
支持用户动态添加、删除项目经验，输入技能关键字。

### 🧠 知识点

#### 1. useFieldArray 实现表单数组
```ts
const { fields, append, remove } = useFieldArray({
  control,
  name: 'projects',
});
```

#### 2. 技能 tag 表单 UI 优化
```tsx
<input onChange={e => field.onChange(e.target.value.split(',').map(s => s.trim()))} />
```
- 支持技能自动分隔（例如用逗号、空格）
- 可扩展为 tag 输入（chips）组件

#### 3. 上传 PDF 时的进度控制
```ts
const [uploading, setUploading] = useState(false);
```
- 控制上传状态
- 上传完成后显示预览链接和解析按钮

---

## 📌 本轮开发涉及面试题分类总表

| 分类 | 面试题 | 回答要点 | 参考答案 | 频率 |
|------|--------|----------|----------|-------|
| React | useEffect 的依赖数组作用？| 控制副作用执行时机 | 空数组表示只执行一次 | ⭐⭐⭐⭐⭐ |
| React | React 状态提升是什么？| 将子组件共享状态提升至父组件 | 用于兄弟组件通信 | ⭐⭐⭐⭐⭐ |
| Next.js | `app` 目录和 `pages` 目录区别？| `app/` 是新路由系统，支持 Layout、Streaming | `app/` 支持 SSR/Suspense/RSC，推荐使用 | ⭐⭐⭐⭐⭐ |
| React | 如何避免 useEffect 死循环？| 精确填写依赖项，避免函数引用变化 | 使用 `useCallback` 或 `useMemo` 包装依赖函数 | ⭐⭐⭐⭐ |
| JavaScript | Promise 与 async/await 区别？| async 是 Promise 的语法糖，支持 try/catch | async 函数返回 Promise，await 暂停执行直到 resolve | ⭐⭐⭐⭐ |
| Firebase | Firestore 和 Realtime Database 区别？| Firestore 支持文档结构与查询更强 | Firestore 更现代、适合结构化数据 | ⭐⭐⭐⭐ |
| Firebase | 如何实现权限控制？| 使用 Firestore Rules + Auth | `match /users/{uid} if request.auth.uid == uid` | ⭐⭐⭐⭐ |
| React | 如何管理复杂表单？| 使用 `react-hook-form` 结合 schema 校验 | RHF + zod 联动，表单性能佳 | ⭐⭐⭐⭐ |
| React | React 中如何处理数组型字段？| 使用 `useFieldArray` 动态增删 | RHF 提供 API 处理数组字段 | ⭐⭐⭐⭐ |
| Next.js | `use client` 的作用？| 标记组件为客户端渲染组件 | 必须显式声明，才能使用 hooks 等功能 | ⭐⭐⭐⭐ |
| HTML/CSS | 如何实现 Skeleton UI？ | 使用 `animate-pulse`、`rounded` 等 Tailwind 类 | `<div className="h-4 w-32 bg-muted animate-pulse rounded" />` | ⭐⭐⭐⭐ |
| React | 如何上传文件并反馈进度？| 维护 `uploading` 状态 + 成功后提示 | 设置 loading 状态，上传后展示文件链接 | ⭐⭐⭐ |
| 安全 | 如何防止 CORS 问题？| 设置 Firebase Storage 的 CORS 配置或使用代理 | 使用 `gsutil cors set` 设置 CORS JSON | ⭐⭐⭐ |
| 工程化 | 如何配置 Tailwind 响应式设计？| 使用 `sm:`、`md:` 等断点 | Tailwind 内置断点系统 | ⭐⭐⭐ |
| 表单验证 | 如何确保字段类型安全？ | 使用 `zod` schema 和 `resolver` | RHF + zod 联动校验类型一致性 | ⭐⭐⭐ |
| Firebase | 上传文件应注意哪些限制？| 控制类型（如 PDF）和大小（2MB） | 使用 `input accept` 和 JS 限制 size | ⭐⭐ |

---

