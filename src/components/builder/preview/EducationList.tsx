// components/preview/EducationList.tsx
'use client'

import { EducationData } from '@/types/resume'
import EditableField from './EditableField'
import { useState } from 'react'

export default function EducationList({ data }: { data: EducationData }) {
  const [items, setItems] = useState(data)

  const handleChange = (idx: number, newDesc: string) => {
    const next = [...items]
    next[idx].description = newDesc
    setItems(next)
  }

  return (
<ul className="space-y-4">
  {items.map((edu, idx) => (
    <li key={idx} className="rounded-lg p-4 bg-[hsl(var(--highlight))] space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-semibold text-[hsl(var(--fg))]">
          {edu.school}
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap text-right">
          {edu.startDate} ~ {edu.endDate}
          
        </div>
      </div>
      <div className="flex flex-row justify-between text-sm text-muted-foreground">
        {edu.degree}
        {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
      </div>

      <EditableField
        value={edu.description || ''}
        onChange={(val) => handleChange(idx, val)}
        onOptimize={() => alert(`优化教育描述 ${idx + 1}`)}
      />
    </li>
  ))}
</ul>

  )
}