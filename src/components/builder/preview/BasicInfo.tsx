// @/components/builder/preview/BasicInfo.tsx

import { BasicInfoData } from '@/types/resume'
import { Phone, Globe, Mail } from 'lucide-react'

export default function BasicInfo({ data }: { data: BasicInfoData }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--fg))]">
        {data.fullName}
      </h2>
      {data.jobTitle && (
        <p className="text-base text-muted-foreground mt-1">{data.jobTitle}</p>
      )}
      {data.summary && (
        <p className="mt-2 text-sm text-[hsl(var(--fg))]">{data.summary}</p>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {/* 邮箱 */}
        {data.email && (
          <a
            href={`mailto:${data.email}`}
            className="hover:underline flex items-center gap-1"
          >
            <Mail className="inline-block mr-1" size={16} />
            {data.email}
          </a>
        )}

        {/* 电话 */}
        {data.phone && (
          <a
            href={`tel:${data.phone}`}
            className="hover:underline flex items-center gap-1"
          >
            <Phone className="inline-block mr-1" size={16} />
            {data.phone}
          </a>
        )}

        {/* 社交链接统一渲染 */}
        {data.socialLinks?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            <Globe size={14} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
