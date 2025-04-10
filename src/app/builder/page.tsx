'use client'

import { useState } from 'react'
import ResumePreview from '@/components/builder/ResumePreview'

export default function ResumeBuilderPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  // TODO: 从 Firestore 拉取用户资料
  const userProfile = null // TODO: 替换为真实数据
  if (!userProfile) {
    // TODO: redirect('/profile/edit')
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-12 lg:px-24 bg-bg text-fg">
      <div className="flex flex-col md:flex-row gap-10">
        {/* 左侧：职位输入区 */}
        <section className="w-full md:w-1/2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-primary">生成个性化简历</h1>
            <p className="text-sm text-muted">
              系统将结合你的个人资料和职位要求生成最优匹配的简历内容。
            </p>
          </div>

          <div className="space-y-6">
            {/* 目标岗位（可选） */}
            <div>
              <label className="block text-sm font-medium text-muted mb-1">目标岗位（可选）</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="如：Senior Frontend Developer"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* JD 输入 */}
            <div>
              <label className="block text-sm font-medium text-muted mb-1">职位描述</label>
              <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="请粘贴你要申请的职位描述..."
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* 生成按钮 */}
            <button
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium transition disabled:opacity-50"
              disabled={!jobDescription}
            >
              生成简历
            </button>
          </div>
        </section>

        {/* 右侧：实时预览 */}
        <section className="w-full md:w-1/2 bg-surface rounded-2xl shadow-md p-6 border border-border">
          <ResumePreview
            data={{
              // name: userProfile?.name || "张三",
              // title: jobTitle || userProfile?.title || "前端工程师",
              name: "张三",
              title: "前端工程师"
              summary: "这里会展示系统生成的简历内容...",
            }}
          />
        </section>
      </div>
    </main>
  )
}
