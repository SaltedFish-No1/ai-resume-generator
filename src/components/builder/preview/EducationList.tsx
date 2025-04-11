
// components/preview/EducationList.tsx
import { ResumeData } from '@/lib/validators/resume'

export default function EducationList({ data }: { data: ResumeData['education'] }) {
  return (
    <ul className="space-y-4">
      {data.map((edu, idx) => (
        <li key={idx} className="rounded-lg p-4 bg-[hsl(var(--highlight))]">
          <h4 className="font-semibold text-[hsl(var(--fg))]">
            {edu.school} - {edu.degree}
          </h4>
          <div className="text-sm text-muted-foreground">
            {edu.startDate} ~ {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
          </div>
          {edu.description && <p className="mt-1 text-sm text-[hsl(var(--fg))]">{edu.description}</p>}
        </li>
      ))}
    </ul>
  )
}
