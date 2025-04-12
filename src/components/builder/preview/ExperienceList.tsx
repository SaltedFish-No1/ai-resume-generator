// components/preview/ExperienceList.tsx
import { ResumeData } from '@/types/resume'

export default function ExperienceList({ data }: { data: ResumeData['experience'] }) {
  return (
    <ul className="space-y-4">
      {(data ?? []).map((exp, idx) => (
        <li key={idx} className="rounded-lg p-4 bg-[hsl(var(--highlight))]">
          <h4 className="font-semibold text-[hsl(var(--fg))]">
            {exp.company} - {exp.title}
          </h4>
          <div className="text-sm text-muted-foreground">
            {exp.startDate} ~ {exp.endDate}
          </div>
          <p className="mt-1 text-sm text-[hsl(var(--fg))]">{exp.description}</p>
        </li>
      ))}
    </ul>
  )
}
