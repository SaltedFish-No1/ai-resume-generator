'use client'

import { useUser } from '@/lib/context/auth'
import Link from 'next/link'

export default function DashboardPage() {
    const { user } = useUser()

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4">👋 欢迎回来，{(user?.displayName || user?.email || '用户')}！</h1>
            </div>
            <p className="mb-6 text-muted-foreground">你可以在下方选择操作：</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    title="编辑个人资料"
                    description="完善个人信息，准备生成内容"
                    href="/profile/account"
                />
                <DashboardCard
                    title="编辑简历资料"
                    description="完善个人信息，准备生成内容"
                    href="/profile/edit"
                />
                <DashboardCard
                    title="AI 构建简历(未实现)"
                    description="输入 JD，一键生成个性化简历"
                    href="/builder"
                />
                <DashboardCard
                    title="历史简历管理(未实现)"
                    description="查看 / 编辑 / 导出已生成内容"
                    href="/resumes"
                />
                <DashboardCard
                    title="简历模板市场(未实现)"
                    description="选择你喜欢的简历模板"
                    href="/templates"
                />
            </div>
        </div>
    )
}

function DashboardCard({ title, description, href }: { title: string; description: string; href: string; }) {
    return (
        <Link
            href={href}
            className="p-6 rounded-xl border hover:bg-muted transition-shadow shadow-sm hover:shadow-md"
        >
            <h2 className="font-semibold text-lg mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </Link>
    )
}
