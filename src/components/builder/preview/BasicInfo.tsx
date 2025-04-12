// @/components/builder/preview/BasicInfo.tsx

import { BasicInfoData } from '@/types/resume'
import { Phone, Globe, Mail } from 'lucide-react'

interface Props {
  data: BasicInfoData
  isPrintView?: boolean
}

export default function BasicInfo({ data, isPrintView = false }: Props) {
  return (
    <div className={`mb-8 ${isPrintView ? 'text-left' : 'text-center'}`}>
      <h2
        className={`${
          isPrintView ? 'text-2xl' : 'text-3xl'
        } font-bold tracking-tight text-[hsl(var(--fg))]`}
      >
        {data.fullName}
      </h2>

      {data.jobTitle && (
        <p className={`mt-1 ${isPrintView ? 'text-sm' : 'text-base'} text-muted-foreground`}>
          {data.jobTitle}
        </p>
      )}

      {data.summary && (
        <p className={`mt-2 ${isPrintView ? 'text-sm' : 'text-base'} text-[hsl(var(--fg))] leading-snug`}>
          {data.summary}
        </p>
      )}

      <div
        className={`mt-4 flex flex-wrap ${
          isPrintView ? 'justify-start gap-2' : 'justify-center gap-4'
        } text-sm text-muted-foreground`}
      >
        {/* 邮箱 */}
        {data.email && (
          <a
            href={`mailto:${data.email}`}
            className="hover:underline flex items-center gap-1"
          >
            <Mail className="inline-block" size={14} />
            {data.email}
          </a>
        )}

        {/* 电话 */}
        {data.phone && (
          <a
            href={`tel:${data.phone}`}
            className="hover:underline flex items-center gap-1"
          >
            <Phone className="inline-block" size={14} />
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
