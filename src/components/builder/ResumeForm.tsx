// components/builder/ResumeForm.tsx
"use client"

type ResumeData = {
  name: string
  title: string
  summary: string
}

type Props = {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: Props) {
  const handleChange = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted mb-1">姓名 / Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="张三 / John Doe"
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">职位标题 / Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="前端工程师 / Frontend Developer"
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-1">个人简介 / Summary</label>
        <textarea
          rows={4}
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="请输入一段简要介绍..."
          className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
    </div>
  )
}
