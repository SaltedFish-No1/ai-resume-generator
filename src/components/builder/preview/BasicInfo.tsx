// components/preview/BasicInfo.tsx
import { ResumeData } from '@/lib/validators/resume'

export default function BasicInfo({ data }: { data: ResumeData }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--fg))]">
        {data.fullName}
      </h2>
      {data.jobTitle && (
        <p className="text-base text-muted-foreground mt-1">{data.jobTitle}</p>
      )}
      {data.summary && <p className="mt-2 text-sm text-[hsl(var(--fg))]">{data.summary}</p>}

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <span>📧 {data.email}</span>
        {data.phone && <span>📞 {data.phone}</span>}
        {data.github && <span>🌐 GitHub: {data.github}</span>}
        {data.linkedin && <span>💼 LinkedIn: {data.linkedin}</span>}
      </div>
    </div>
  )
}