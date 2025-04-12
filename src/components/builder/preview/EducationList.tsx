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
        <li key={idx} className="rounded-lg p-4 bg-[hsl(var(--highlight))]">
          <h4 className="font-semibold text-[hsl(var(--fg))]">
            {edu.school} - {edu.degree}
          </h4>
          <div className="text-sm text-muted-foreground">
            {edu.startDate} ~ {edu.endDate} {edu.gpa && `| GPA: ${edu.gpa}`}
          </div>

          <EditableField
            value={edu.description || ''}
            onChange={(val) => handleChange(idx, val)}
            onOptimize={() => {
              // TODO: 集成字段优化逻辑
              alert(`优化教育描述 ${idx + 1}`)
            }}
          />
        </li>
      ))}
    </ul>
  )
}