// components/builder/JobDescriptionForm.tsx
'use client'

export default function JobDescriptionForm() {
    return (
        <div className="w-full h-full  space-y-4 bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[hsl(var(--fg))]">
                职位名称
            </h2>
            <input
                className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--highlight))] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition"
                placeholder="请输入职位名称，例如：前端工程师、产品经理等..."
            />
            <h2 className="text-xl font-semibold text-[hsl(var(--fg))]">
                职位描述
            </h2>
            <textarea
                className="w-full min-h-[200px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--highlight))] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition"
                placeholder="请粘贴目标岗位的 JD 内容，例如岗位职责、要求等..."
            />
        </div>
    )
}
