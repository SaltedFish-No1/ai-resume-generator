---
# 🧠 AI Resume Generator
---

## 项目简介 / Project Overview

AI Resume Generator 是一个基于现代技术栈构建的智能简历生成器项目。项目利用 OpenAI GPT-4 API 实现简历内容生成，支持实时预览与 PDF 导出，并提供中英文界面。

- **最新进展**：目前已完成「简历构建页（MVP4）」与「GPT 自动生成简历（MVP5）」，可在 `/builder` 路径下体验。用户可输入职位名称和 JD，一键生成更契合目标岗位的简历，并实时预览。

AI Resume Generator is an AI-powered resume generator built with a modern tech stack. Leveraging the OpenAI GPT-4 API, the project allows users to generate resume content, supports real-time preview and PDF exporting, and offers bilingual (Chinese/English) interfaces.

- **Latest Updates**: We have completed the “Resume Builder Page (MVP4)” and “GPT Resume Optimization (MVP5)”, accessible at `/builder`. Users can input job titles and JDs to generate job-specific resumes with real-time previews.

---

## 技术栈 / Technology Stack

| 类别              | 技术                                                         | Category           | Technology                                |
| ----------------- | ------------------------------------------------------------ | ------------------ | ----------------------------------------- |
| **框架**          | Next.js 13+ App Router                                       | **Framework**      | Next.js 13+ App Router                    |
| **UI 框架**       | Tailwind CSS（支持暗黑模式）                                  | **UI Framework**   | Tailwind CSS (with dark mode support)     |
| **状态管理**      | React 本地状态 + Server Actions                              | **State Management** | React local state + Server Actions        |
| **表单处理**      | react-hook-form + zod                                        | **Form Handling**  | react-hook-form + zod                     |
| **后端服务**      | Firebase（Auth + Firestore）                                 | **Backend**        | Firebase (Auth + Firestore)               |
| **AI 服务**       | OpenAI GPT-4 API                                             | **AI Service**     | OpenAI GPT-4 API                           |
| **PDF 导出**      | @react-pdf/renderer                                          | **PDF Export**     | @react-pdf/renderer                       |
| **国际化**        | next-intl（支持中英切换）                                    | **Intl**           | next-intl (Chinese & English switching)   |
| **认证与守卫**    | Middleware + Firebase Token 验证                             | **Auth & Security**| Middleware + Firebase Token Verification  |

---

## 当前进度 / Current Progress

- **已完成 / Completed**:
  - 主页结构及全局布局
  - 用户注册与登录功能
  - **MVP4：简历构建页**（`/builder` 路由），可输入职位名称和 JD，实时预览用户原始简历
  - **MVP5：接入 GPT 生成简历**，调用 OpenAI API 自动优化简历，实时刷新预览

- **正在开发 / In Progress**:
  - 历史记录与多语言进一步完善
  - 批量职位描述的多次生成与对比
  - 分享与协作模式

---

## 项目结构 / Project Structure

项目采用推荐的 `src/` 目录结构与 Next.js App Router，主要目录如下：

```bash
ai-resume-generator/
├── src/
│   ├── app/              # 页面与路由（包含 /builder 实际实现）
│   ├── components/       # UI 与功能组件（如 BuilderHeader、ResumePreview 等）
│   ├── lib/              # 工具函数和服务封装（Firebase、OpenAI 等）
│   ├── i18n/             # 国际化资源文件
│   ├── types/            # 类型定义（ResumeData、BasicInfo 等）
│   └── styles/           # 全局样式文件
├── public/               # 静态资源
├── middleware.ts         # 路由中间件（语言切换、鉴权等）
├── .env.local            # 环境变量配置（Firebase、OpenAI 等）
├── tailwind.config.js    # Tailwind CSS 配置
├── next.config.js        # Next.js 配置
└── README.md             # 项目说明文档
```

如需查看更详细的 **MVP4 & MVP5** 代码与功能说明，建议阅读 [docs/mvp4-5.md](./docs/mvp4-5.md) 或项目 Wiki。

---

## 安装与运行 / Installation and Running

1. **克隆项目 / Clone the repository**：
   ```bash
   git clone <repository_url>
   cd ai-resume-generator
   ```

2. **安装依赖 / Install dependencies**：
   ```bash
   npm install
   ```

3. **运行开发服务器 / Start the development server**：
   ```bash
   npm run dev
   ```

4. **打开浏览器访问 / Open your browser**:  
   [http://localhost:3000](http://localhost:3000)  

---

## 贡献指南 / Contributing

- **拉取请求 / Pull Requests**: 欢迎提交新功能或修复；请在提交前确保通过所有测试，并遵循本项目的代码风格。
- **问题反馈 / Issues**: 如果遇到 Bug 或有新功能建议，欢迎在 [GitHub Issues](./issues) 提出。

---

## 作者 / Author

Created by **Haotian Chen**  
- 📧 [huntchen00@gmail.com](mailto:huntchen00@gmail.com)  
- [GitHub](https://github.com/huntchen)  
- [个人主页 / Personal Website](https://hchen.me)

---

## 许可 / License

This project is licensed under the MIT License.  
本项目采用 **MIT 许可协议** 开源。

---

**Happy Coding! / 编码愉快！**
