// components/preview/ProjectList.tsx
import { ResumeData } from '@/types/resume'
import { ExternalLink } from 'lucide-react'

export default function ProjectList({ data }: { data: ResumeData['projects'] }) {
  return (
    <ul className="space-y-4">
      {data?.map((proj, idx) => (
        <li key={idx} className="rounded-lg p-4 bg-[hsl(var(--highlight))]">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-[hsl(var(--fg))]">
              {proj.name}
            </h4>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors"
              >
                <ExternalLink size={14} /> 
              </a>
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            技术栈：{proj.techStack.join(', ')}
          </div>
          <p className="mt-2 text-sm text-[hsl(var(--fg))] leading-relaxed">
            {proj.description}
          </p>
        </li>
      ))}
    </ul>
  )
}