// components/preview/Section.tsx
interface SectionProps {
  title: string
  children: React.ReactNode
  optional?: boolean
  isPrintView?: boolean
}

export default function Section({
  title,
  children,
  optional = false,
  isPrintView = false,
}: SectionProps) {
  if (optional && !children) return null
  return (
    <section className={isPrintView ? 'py-4' : 'py-6'}>
      <h3
        className={`${
          isPrintView ? 'text-base font-semibold' : 'text-lg font-semibold'
        } text-[hsl(var(--fg))] mb-2`}
      >
        {title}
      </h3>
      <div>{children}</div>
    </section>
  )
}