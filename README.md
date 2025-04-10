---

# 🧠 AI Resume Generator

---

## 项目简介 / Project Overview
 
AI Resume Generator 是一个基于现代技术栈构建的智能简历生成器项目。项目利用 OpenAI GPT-4 API 实现简历内容生成，支持实时预览与 PDF 导出，并提供中英文界面。当前项目已完成首页结构和用户注册/登录功能，现正开发用户信息编辑页，以便收集用户基本信息并支撑后续简历生成。

AI Resume Generator is an AI-powered resume generator built with a modern tech stack. Leveraging the OpenAI GPT-4 API, the project allows users to generate resume content, supports real-time preview and PDF exporting, and offers bilingual (Chinese/English) interfaces. The homepage structure and user authentication (registration/login) features are completed, and development is now focused on the user profile editing page to collect basic user information for further resume generation.

---

## 技术栈 / Technology Stack

| 类别              | 技术                                                         | Category           | Technology                                |
| ----------------- | ------------------------------------------------------------ | ------------------ | ----------------------------------------- |
| **框架**          | Next.js 13+ App Router                                         | **Framework**      | Next.js 13+ App Router                      |
| **UI 框架**       | Tailwind CSS（支持暗黑模式）                                     | **UI Framework**   | Tailwind CSS (with dark mode support)     |
| **状态管理**      | React 本地状态 + Server Actions                                | **State Management** | React local state + Server Actions        |
| **表单处理**      | react-hook-form + zod                                          | **Form Handling**  | react-hook-form + zod                       |
| **后端服务**      | Firebase（Auth + Firestore）                                   | **Backend**        | Firebase (Auth + Firestore)               |
| **AI 服务**       | OpenAI GPT-4 API                                               | **AI Service**     | OpenAI GPT-4 API                           |
| **PDF 导出**      | @react-pdf/renderer                                            | **PDF Export**     | @react-pdf/renderer                        |
| **国际化**        | next-intl（支持中英切换）                                        | **Internationalization** | next-intl (Chinese & English switching)     |
| **认证与守卫**    | Middleware + Firebase Token 验证                               | **Auth & Security**| Middleware + Firebase Token Verification    |

---

## 当前进度 / Current Progress


- 已完成：主页结构及全局布局、用户注册与登录功能。  
- 正在开发：用户信息编辑页，用于收集用户基本信息，为生成简历做准备。


- Completed: Homepage layout and global structure, as well as user registration and login functionalities.  
- In Progress: Development of the user profile editing page to collect basic user information for resume generation.

---

## 项目结构 / Project Structure

项目采用推荐的 `src/` 目录结构与 Next.js App Router，主要目录如下：

```
ai-resume-generator/
├── src/
│   ├── app/              # 页面与路由
│   ├── components/       # UI 与功能组件
│   ├── lib/              # 工具函数和服务封装（Firebase、OpenAI 等）
│   ├── i18n/             # 国际化资源文件
│   ├── types/            # 类型定义
│   └── styles/           # 全局样式文件
├── public/               # 静态资源
├── middleware.ts         # 路由中间件（语言切换、鉴权等）
├── .env.local            # 环境变量配置（Firebase、OpenAI 等）
├── tailwind.config.js    # Tailwind CSS 配置
├── next.config.js        # Next.js 配置
└── README.md             # 项目说明文档
```

---

## 安装与运行 / Installation and Running

1. 克隆项目 / Clone the repository：
   ```bash
   git clone <repository_url>
   cd ai-resume-generator
   ```

2. 安装依赖 / Install dependencies：
   ```bash
   npm install
   ```

3. 运行开发服务器 / Start the development server：
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000) / Open your browser and visit [http://localhost:3000](http://localhost:3000)

---

## 作者 / Author

Created by Haotian Chen  
📧 [huntchen00@gmail.com](mailto:huntchen00@gmail.com) · [GitHub](https://github.com/huntchen) · [个人主页 / Personal Website](https://huntchen.me)

---

## 许可 / License

This project is licensed under the MIT License.  
本项目采用 MIT 许可协议开源。

---

Happy Coding! / 编码愉快！