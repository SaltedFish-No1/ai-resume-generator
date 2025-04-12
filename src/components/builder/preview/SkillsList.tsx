// components/preview/SkillsList.tsx
import { ResumeData } from '@/types/resume'

const levelToText = (level: number): string => {
  if (level >= 9) return '专家';
  if (level >= 7) return '熟练';
  if (level >= 5) return '掌握';
  if (level >= 3) return '了解';
  return '初学';
}

export default function SkillsList({ data, isPrintView = false }: { data: ResumeData['skills'], isPrintView?: boolean }) {
  if (!data || data.length === 0)
    return <p className="text-sm text-muted-foreground">暂无技能信息</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((skill, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-sm font-medium">
            <span className="truncate" title={skill.name}>{skill.name}</span>
            {isPrintView ? (
              <span className="text-muted-foreground">{levelToText(skill.level)}</span>
            ) : (
              <span className="text-muted-foreground">{skill.level}/10</span>
            )}
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
