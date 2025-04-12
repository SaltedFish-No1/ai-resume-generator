'use client'

import { ProjectData } from '@/types/resume'
import { ExternalLink } from 'lucide-react'

interface Props {
  data: ProjectData
  isPrintView?: boolean
}

export default function ProjectList({ data, isPrintView = false }: Props) {
  const titleClass = isPrintView
    ? 'text-base font-semibold'
    : 'text-lg font-semibold'
  const textClass = isPrintView
    ? 'text-[13px] leading-relaxed'
    : 'text-sm leading-relaxed'

  return (
    <ul className="space-y-4">
      {data?.map((proj, idx) => (
        <li
          key={idx}
          className="rounded-lg p-4 bg-[hsl(var(--highlight))]"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            {/* 标题和链接 */}
            <div className="flex items-center gap-2">
              <h4 className={`${titleClass} text-[hsl(var(--fg))]`}>
                {proj.name}
              </h4>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* 时间范围 */}
            {(proj.startDate || proj.endDate) && (
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {proj.startDate || '开始时间未填'} ~ {proj.endDate || '结束时间未填'}
              </div>
            )}
          </div>

          {/* 技术栈 */}
          <div className="text-muted-foreground mt-1 text-xs sm:text-sm">
            技术栈：{proj.techStack.join(', ')}
          </div>

          {/* 描述 */}
          <p className={`mt-2 ${textClass} text-[hsl(var(--fg))]`}>
            {proj.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
