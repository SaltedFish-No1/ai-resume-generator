// components/builder/ResumePreview.tsx
type ResumeData = {
    name: string
    title: string
    summary: string
  }
  
  type Props = {
    data: ResumeData
  }
  
  export default function ResumePreview({ data }: Props) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-primary">{data.name || "姓名未填写"}</h1>
        <h2 className="text-lg font-medium text-muted">{data.title || "职位未填写"}</h2>
        <p className="text-sm leading-relaxed text-fg/80 whitespace-pre-line">
          {data.summary || "这里会展示你的个人简介。"}
        </p>
      </div>
    )
  }
  