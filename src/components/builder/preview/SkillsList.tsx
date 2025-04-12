// components/preview/SkillsList.tsx
import { ResumeData } from '@/types/resume'

export default function SkillsList({ data }: { data: ResumeData['skills'] }) {
  if (!data || data.length === 0)
    return <p className="text-sm text-muted-foreground">暂无技能信息</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((skill, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span className="truncate" title={skill.name}>{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}/10</span>
          </div>
          <div className="w-full h-2 bg-[hsl(var(--border))] rounded-full overflow-hidden">
            <div
              className="h-full bg-[hsl(var(--primary))] rounded-full transition-all duration-500"
              style={{ width: `${(skill.level / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
