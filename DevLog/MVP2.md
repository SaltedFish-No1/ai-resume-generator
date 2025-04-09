# ✅MVP 2 

## 🧩 阶段概述

### 🌟 阶段目标：用户认证系统
实现用户登录、注册、邮箱验证流程，并使用 Firebase 完成状态持久化与全局认证上下文封装。通过中间件保护受限页面，实现完整的「用户登录 → 验证邮箱 → 访问受限页面」流转链路。

---

## 1️⃣ 用户注册与邮箱验证

### 🌟 阶段目标
构建 `/auth/register` 页面，完成用户注册及邮箱验证流程。

### 🧠 涉及知识点

#### ✅ Firebase Auth 注册流程

Firebase 提供 `createUserWithEmailAndPassword` 方法用于注册账号：

```ts
import { createUserWithEmailAndPassword } from 'firebase/auth'

const userCredential = await createUserWithEmailAndPassword(auth, email, password)
const user = userCredential.user
await user.sendEmailVerification() // 发送邮箱验证邮件
```

#### ✅ 表单校验：react-hook-form + zod

结合 `zod` 定义 schema，并与 `react-hook-form` 绑定实现类型安全的验证：

```ts
const schema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword']
})
```

#### ✅ 邮箱验证跳转逻辑

```ts
if (!user.emailVerified) {
  router.push('/auth/verify-email')
}
```

注册后跳转至 `/auth/verify-email`，用户点击邮件中的验证链接后可返回站点，通过按钮检查状态并进入系统。

### 🔍 面试常问问题

> **Q: 如何实现邮箱验证注册流程？**  
> A: 注册成功后调用 `user.sendEmailVerification()` 发送邮件，并引导用户前往 `/auth/verify-email` 页面验证。

> **Q: How to implement email verification after signup?**  
> A: After creating the user via `createUserWithEmailAndPassword`, call `user.sendEmailVerification()`, then wait for `user.emailVerified === true` before proceeding.

### ⚠️ 常见错误和最佳实践

| 错误用法 ❌                             | 正确实践 ✅                                      |
|-----------------------------------------|--------------------------------------------------|
| 注册成功立即跳转主页                   | 应跳转 `/auth/verify-email` 等待邮箱验证       |
| 不校验密码是否一致                     | 使用 zod `.refine()` 校验 `password === confirmPassword` |
| 用户未验证邮箱也允许访问受限页面       | 页面中/中间件中添加 `emailVerified` 判断       |

---

## 2️⃣ 登录与身份验证流程

### 🌟 阶段目标
构建 `/auth/login` 页面，实现登录功能，登录成功后设置 Cookie 并跳转页面。

### 🧠 涉及知识点

#### ✅ 登录 + 获取 ID Token + 设置 Cookie

```ts
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'

const userCredential = await signInWithEmailAndPassword(auth, email, password)
const token = await getIdToken(userCredential.user)
setCookie('firebaseAuthToken', token)
```

#### ✅ 登录后判断是否验证邮箱

```ts
if (!user.emailVerified) {
  router.push('/auth/verify-email')
} else {
  router.push('/builder')
}
```

### 🔍 面试常问问题

> **Q: 登录成功后如何保持登录状态？**  
> A: 使用 Firebase 的 `getIdToken` 获取 ID Token 并写入 Cookie，实现跨页面持久化。

> **Q: How do you persist login state across pages?**  
> A: Store the Firebase ID token in cookies after login, and use it for route protection or SSR.

### ⚠️ 常见错误与建议

| 错误用法 ❌                           | 正确实践 ✅                            |
|---------------------------------------|----------------------------------------|
| 登录成功后没有保存 token             | 使用 `getIdToken()` 后写入 Cookie      |
| 直接跳转页面而未判断 `emailVerified` | 加入验证判断确保用户已验证邮箱         |

---

## 3️⃣ 全局认证状态管理

### 🌟 阶段目标
构建 `AuthProvider` 组件，封装当前登录用户并提供 `useUser()` Hook，全局使用。

### 🧠 涉及知识点

#### ✅ React Context 封装用户状态

```tsx
export const AuthContext = createContext<User | null>(null)
export const useUser = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return () => unsub()
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
```

#### ✅ 封装 `Providers.tsx` 使用 AuthProvider + ThemeProvider

### 🔍 面试常问问题

> **Q: 如何在 Next.js 中管理登录状态？**  
> A: 封装 AuthProvider，通过 Context 共享当前用户。

> **Q: How to globally provide authenticated user in React?**  
> A: Create a context and use Firebase `onAuthStateChanged` to listen to auth state.

### ⚠️ 常见错误与最佳实践

| 错误用法 ❌                         | 正确做法 ✅                                       |
|-------------------------------------|--------------------------------------------------|
| 每个页面单独调用 Firebase 获取用户 | 用 AuthProvider 在 `_app.tsx` 或 layout.tsx 包裹 |

---

## 4️⃣ 页面保护：中间件与邮箱验证分流

### 🌟 阶段目标
使用 `middleware.ts` 拦截未登录用户，保护 `/profile/edit` 和 `/builder` 等页面。

### 🧠 涉及知识点

#### ✅ middleware.ts 简单判断 Cookie 是否存在

```ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseAuthToken')?.value
  if (!token && protectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect('/auth/login')
  }
  return NextResponse.next()
}
```

#### ❌ Edge Runtime 无法使用 firebase-admin
Firebase Admin SDK 会引入 `node:process`，Edge Middleware 构建报错。

✅ 推荐：
- middleware.ts 判断是否登录
- 页面中判断是否验证邮箱（`user.emailVerified`）

### 🔍 面试常问问题

> **Q: Next.js 中如何保护受限页面？**  
> A: 使用 `middleware.ts` 读取 Cookie 中的 token，未登录跳转 `/auth/login`。

> **Q: Why can't you use firebase-admin in Edge Middleware?**  
> A: Because Edge Runtime doesn't support Node built-in modules like `fs`, `crypto`, or `process`, which firebase-admin depends on.

### ⚠️ 常见错误与最佳实践

| 错误用法 ❌                               | 推荐做法 ✅                                           |
|-------------------------------------------|--------------------------------------------------------|
| 在 middleware 使用 firebase-admin SDK     | 中间件只判断 token，email 验证放在页面逻辑中           |
| 直接访问 `/builder` 页面不判断验证状态    | 页面中主动判断 `user.emailVerified` 再跳转              |

---

## 🧪 推荐封装方案（附加）

```ts
// lib/auth/cookies.ts
import { setCookie } from 'cookies-next'
export function setAuthTokenCookie(token: string) {
  setCookie('firebaseAuthToken', token, { path: '/', sameSite: 'lax' })
}
```

```ts
// /auth/verify-email/page.tsx 中点击“我已完成验证”时
await auth.currentUser?.reload()
if (auth.currentUser?.emailVerified) {
  const token = await getIdToken(auth.currentUser, true)
  setAuthTokenCookie(token)
  router.push('/builder')
}
```

---

## 📚 面试题汇总（基于 MVP 2 全部内容）

### ✅ HTML / CSS / JavaScript 基础
- `cookie` 和 `localStorage` 的区别？
- 什么是 HttpOnly Cookie，有什么作用？
- `useEffect` 中如何处理订阅与清理？
- 如何在浏览器中安全存储 token？

### ✅ React / Next.js / 框架机制
- 如何在 React 中封装全局状态？（Context + Hook）
- `useContext` 和 prop drilling 的区别？
- Next.js 的 middleware 机制是如何工作的？
- App Router 下如何组织 Provider、layout、page？
- 如何使用 react-hook-form 处理复杂嵌套表单？

### ✅ 性能优化与浏览器原理
- Firebase 的 token 是如何自动刷新与缓存的？
- 跨标签页如何共享登录状态？
- 为什么 `firebase-admin` 无法运行在 Edge Runtime？

### ✅ 工程化与部署流程
- `.env.local` 中 `NEXT_PUBLIC_` 与普通变量区别？
- 如何在服务端安全使用 Firebase 私钥？
- Vercel 中如何配置私密环境变量？

### ✅ 安全与协议相关
- Firebase ID Token 是什么？是否可信？
- 什么是 email verification？为什么需要？
- 如何防止 cookie 被 XSS 攻击窃取？
- Secure、HttpOnly、SameSite 各属性含义？

---

## ✅ 总结

MVP 2 阶段完成了一个现代化应用的最核心认证系统：注册 + 登录 + 验证 + 路由保护。整个过程不仅涵盖了表单、状态管理、中间件控制、Cookie 安全等基础技能，还引入了边界探索（如 firebase-admin 在 Edge 失败），是前端工程师成长非常重要的一环。
