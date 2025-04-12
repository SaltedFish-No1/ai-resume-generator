import { OtherInfoData } from '@/types/resume'
import { ExternalLink } from 'lucide-react'

interface Props {
  data: OtherInfoData
  isPrintView?: boolean
}

export default function OtherInfoList({ data, isPrintView = false }: Props) {
  const { publications, awards, certifications } = data

  if (
    (!publications || publications.length === 0) &&
    (!awards || awards.length === 0) &&
    (!certifications || certifications.length === 0)
  ) {
    return null
  }

  const baseTextClass = isPrintView
    ? 'text-[13px] leading-relaxed'
    : 'text-sm leading-relaxed'
  const headingClass = isPrintView
    ? 'text-base font-semibold mb-2'
    : 'text-lg font-semibold mb-3'

  return (
    <>
      <h3 className={`${headingClass} text-[hsl(var(--fg))]`}>其他信息</h3>
      <ul className={`space-y-5 ${baseTextClass} text-[hsl(var(--fg))]`}>
        {/* 学术出版物 */}
        {publications?.map((pub, idx) => (
          <li key={`pub-${idx}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <p className="font-medium">
                {pub.title}
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-block text-muted-foreground hover:text-[hsl(var(--primary))]"
                  >
                    <ExternalLink size={14} className="inline" />
                  </a>
                )}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                {pub.journal} {pub.authors && `| ${pub.authors}`} {pub.date && `| ${pub.date}`}
              </p>
            </div>
            {pub.summary && (
              <p className="mt-1 text-[hsl(var(--fg))]">{pub.summary}</p>
            )}
          </li>
        ))}

        {/* 奖项 */}
        {awards?.map((award, idx) => (
          <li key={`award-${idx}`}>
            <span className="font-medium">{award.title}</span>
            {award.issuer && <span className="ml-2 text-muted-foreground">{award.issuer}</span>}
            {award.date && <span className="ml-2 text-muted-foreground">{award.date}</span>}
          </li>
        ))}

        {/* 证书 */}
        {certifications?.map((cert, idx) => (
          <li key={`cert-${idx}`}>
            <span className="font-medium">{cert.name}</span>
            {cert.issuer && <span className="ml-2 text-muted-foreground">{cert.issuer}</span>}
            {cert.date && <span className="ml-2 text-muted-foreground">{cert.date}</span>}
          </li>
        ))}
      </ul>
    </>
  )
}
